
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface MigrationProgress {
  total: number;
  completed: number;
  failed: number;
  current: string;
  status: 'idle' | 'running' | 'paused' | 'completed' | 'error';
}

export const useImageMigration = () => {
  const [migrating, setMigrating] = useState(false);
  const [progress, setProgress] = useState<MigrationProgress>({
    total: 0,
    completed: 0,
    failed: 0,
    current: '',
    status: 'idle'
  });
  const [isPaused, setIsPaused] = useState(false);
  const { toast } = useToast();

  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  const uploadImageWithRetry = async (
    base64Data: string, 
    mimeType: string, 
    storagePath: string, 
    maxRetries = 3
  ): Promise<boolean> => {
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        // Konvertera base64 till blob
        const byteCharacters = atob(base64Data);
        const byteNumbers = new Array(byteCharacters.length);
        
        for (let j = 0; j < byteCharacters.length; j++) {
          byteNumbers[j] = byteCharacters.charCodeAt(j);
        }
        
        const byteArray = new Uint8Array(byteNumbers);
        const blob = new Blob([byteArray], { type: mimeType });

        // Ladda upp till Storage med längre timeout
        const { error: uploadError } = await supabase.storage
          .from('project-images')
          .upload(storagePath, blob, {
            contentType: mimeType,
            upsert: false
          });

        if (uploadError) {
          console.error(`Uppladdningsfel (försök ${attempt}/${maxRetries}):`, uploadError);
          if (attempt === maxRetries) return false;
          await delay(1000 * attempt); // Exponential backoff
          continue;
        }

        return true;
      } catch (error) {
        console.error(`Fel vid uppladdning (försök ${attempt}/${maxRetries}):`, error);
        if (attempt === maxRetries) return false;
        await delay(1000 * attempt);
      }
    }
    return false;
  };

  const updateProjectWithRetry = async (
    projectId: number, 
    storagePath: string, 
    maxRetries = 3
  ): Promise<boolean> => {
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        const { error: updateError } = await supabase
          .from('projects')
          .update({ storage_path: storagePath })
          .eq('id', projectId);

        if (updateError) {
          console.error(`Databasuppdateringsfel (försök ${attempt}/${maxRetries}):`, updateError);
          if (attempt === maxRetries) return false;
          await delay(500 * attempt);
          continue;
        }

        return true;
      } catch (error) {
        console.error(`Fel vid databasuppdatering (försök ${attempt}/${maxRetries}):`, error);
        if (attempt === maxRetries) return false;
        await delay(500 * attempt);
      }
    }
    return false;
  };

  const verifyUploadedImage = async (storagePath: string): Promise<boolean> => {
    try {
      const { data: { publicUrl } } = supabase.storage
        .from('project-images')
        .getPublicUrl(storagePath);
      
      // Testa att ladda bilden
      const response = await fetch(publicUrl, { method: 'HEAD' });
      return response.ok;
    } catch (error) {
      console.error('Fel vid verifiering av uppladdad bild:', error);
      return false;
    }
  };

  const migrateProjectImages = async (batchSize = 2) => {
    try {
      setMigrating(true);
      setIsPaused(false);
      setProgress(prev => ({ ...prev, status: 'running', completed: 0, failed: 0 }));

      // Hämta alla projekt med base64-bilder som inte redan har storage_path
      const { data: projects, error: fetchError } = await supabase
        .from('projects')
        .select('id, title, image_url, storage_path')
        .like('image_url', 'data:%')
        .is('storage_path', null);

      if (fetchError) {
        throw fetchError;
      }

      if (!projects || projects.length === 0) {
        setProgress(prev => ({ ...prev, status: 'completed' }));
        toast({
          title: "Inga bilder att migrera",
          description: "Alla bilder är redan migrerade till Storage.",
        });
        return;
      }

      setProgress(prev => ({ 
        ...prev, 
        total: projects.length,
        status: 'running'
      }));

      console.log(`Startar migrering av ${projects.length} bilder i batches om ${batchSize}...`);

      // Bearbeta i batches
      for (let i = 0; i < projects.length; i += batchSize) {
        if (isPaused) {
          setProgress(prev => ({ ...prev, status: 'paused' }));
          break;
        }

        const batch = projects.slice(i, i + batchSize);
        console.log(`Bearbetar batch ${Math.floor(i / batchSize) + 1}/${Math.ceil(projects.length / batchSize)}`);

        for (const project of batch) {
          if (isPaused) break;

          setProgress(prev => ({ 
            ...prev, 
            current: project.title 
          }));

          try {
            const base64Data = project.image_url.split(',')[1];
            const mimeType = project.image_url.split(';')[0].split(':')[1];
            
            // Kontrollera bildstorlek
            const imageSizeKB = Math.round((base64Data.length * 3) / 4 / 1024);
            console.log(`Migrerar "${project.title}" (${imageSizeKB} KB)`);

            // Bestäm filtyp
            const fileExtension = mimeType.includes('jpeg') ? '.jpg' :
                                 mimeType.includes('png') ? '.png' :
                                 mimeType.includes('gif') ? '.gif' :
                                 mimeType.includes('webp') ? '.webp' : '.jpg';

            const fileName = `project-${project.id}-${Date.now()}${fileExtension}`;
            const storagePath = `projects/${fileName}`;

            // Ladda upp med retry
            const uploadSuccess = await uploadImageWithRetry(base64Data, mimeType, storagePath);
            
            if (!uploadSuccess) {
              console.error(`Misslyckades att ladda upp bild för projekt ${project.id}`);
              setProgress(prev => ({ ...prev, failed: prev.failed + 1 }));
              continue;
            }

            // Verifiera att bilden laddades upp korrekt
            const verifySuccess = await verifyUploadedImage(storagePath);
            if (!verifySuccess) {
              console.error(`Misslyckades att verifiera uppladdad bild för projekt ${project.id}`);
              // Ta bort den misslyckade uppladdningen
              await supabase.storage.from('project-images').remove([storagePath]);
              setProgress(prev => ({ ...prev, failed: prev.failed + 1 }));
              continue;
            }

            // Uppdatera projektet med retry
            const updateSuccess = await updateProjectWithRetry(project.id, storagePath);
            
            if (!updateSuccess) {
              console.error(`Misslyckades att uppdatera projekt ${project.id} i databasen`);
              // Ta bort den uppladdade filen om databasuppdateringen misslyckades
              await supabase.storage.from('project-images').remove([storagePath]);
              setProgress(prev => ({ ...prev, failed: prev.failed + 1 }));
              continue;
            }

            setProgress(prev => ({ 
              ...prev, 
              completed: prev.completed + 1 
            }));

            console.log(`✅ Migrerade projekt ${project.id}: ${storagePath}`);

          } catch (error) {
            console.error(`Fel vid migrering av projekt ${project.id}:`, error);
            setProgress(prev => ({ ...prev, failed: prev.failed + 1 }));
          }
        }

        // Paus mellan batches för att undvika överbelastning
        if (i + batchSize < projects.length && !isPaused) {
          console.log('Pausar 2 sekunder mellan batches...');
          await delay(2000);
        }
      }

      const finalProgress = progress.completed + progress.failed;
      const isCompleted = finalProgress >= projects.length && !isPaused;
      
      setProgress(prev => ({ 
        ...prev, 
        status: isPaused ? 'paused' : 'completed',
        current: ''
      }));

      if (isCompleted) {
        toast({
          title: "Migration slutförd",
          description: `${progress.completed} bilder migrerade framgångsrikt. ${progress.failed > 0 ? `${progress.failed} misslyckades.` : ''}`,
          variant: progress.failed > 0 ? "destructive" : "default"
        });
      }

    } catch (error) {
      console.error('Fel vid bildmigrering:', error);
      setProgress(prev => ({ ...prev, status: 'error' }));
      toast({
        title: "Migreringsfel",
        description: "Något gick fel under migreringen. Kontrollera konsolen för detaljer.",
        variant: "destructive",
      });
    } finally {
      setMigrating(false);
    }
  };

  const pauseMigration = () => {
    setIsPaused(true);
  };

  const resumeMigration = () => {
    if (progress.status === 'paused') {
      setIsPaused(false);
      migrateProjectImages();
    }
  };

  const resetMigration = () => {
    setProgress({
      total: 0,
      completed: 0,
      failed: 0,
      current: '',
      status: 'idle'
    });
    setIsPaused(false);
  };

  return {
    migrating,
    progress,
    isPaused,
    migrateProjectImages,
    pauseMigration,
    resumeMigration,
    resetMigration
  };
};
