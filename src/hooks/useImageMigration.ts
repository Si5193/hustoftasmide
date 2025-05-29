
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export const useImageMigration = () => {
  const [migrating, setMigrating] = useState(false);
  const [progress, setProgress] = useState(0);
  const { toast } = useToast();

  const migrateProjectImages = async () => {
    try {
      setMigrating(true);
      setProgress(0);

      // Hämta alla projekt med base64-bilder (hantera fall där storage_path inte finns)
      const { data: projects, error: fetchError } = await supabase
        .from('projects')
        .select('id, title, image_url')
        .like('image_url', 'data:%');

      if (fetchError) {
        throw fetchError;
      }

      if (!projects || projects.length === 0) {
        toast({
          title: "Inga bilder att migrera",
          description: "Alla bilder är redan migrerade till Storage.",
        });
        return;
      }

      // Filtrera bort projekt som redan har storage_path (om kolumnen finns)
      let projectsToMigrate = projects;
      try {
        const { data: projectsWithStorage } = await supabase
          .from('projects')
          .select('id, storage_path')
          .not('storage_path', 'is', null);
        
        if (projectsWithStorage) {
          const migratedIds = new Set(projectsWithStorage.map(p => p.id));
          projectsToMigrate = projects.filter(p => !migratedIds.has(p.id));
        }
      } catch (error) {
        // storage_path kolumn finns inte än, migrera alla base64 bilder
        console.log('storage_path column does not exist yet, migrating all base64 images');
      }

      if (projectsToMigrate.length === 0) {
        toast({
          title: "Inga bilder att migrera",
          description: "Alla bilder är redan migrerade till Storage.",
        });
        return;
      }

      console.log(`Migrerar ${projectsToMigrate.length} bilder till Storage...`);

      for (let i = 0; i < projectsToMigrate.length; i++) {
        const project = projectsToMigrate[i];
        setProgress(((i + 1) / projectsToMigrate.length) * 100);

        try {
          // Konvertera base64 till blob
          const base64Data = project.image_url.split(',')[1];
          const mimeType = project.image_url.split(';')[0].split(':')[1];
          const byteCharacters = atob(base64Data);
          const byteNumbers = new Array(byteCharacters.length);
          
          for (let j = 0; j < byteCharacters.length; j++) {
            byteNumbers[j] = byteCharacters.charCodeAt(j);
          }
          
          const byteArray = new Uint8Array(byteNumbers);
          const blob = new Blob([byteArray], { type: mimeType });

          // Bestäm filtyp
          const fileExtension = mimeType.includes('jpeg') ? '.jpg' :
                               mimeType.includes('png') ? '.png' :
                               mimeType.includes('gif') ? '.gif' :
                               mimeType.includes('webp') ? '.webp' : '.jpg';

          // Skapa unikt filnamn
          const fileName = `project-${project.id}-${Date.now()}${fileExtension}`;
          const storagePath = `projects/${fileName}`;

          // Ladda upp till Storage
          const { error: uploadError } = await supabase.storage
            .from('project-images')
            .upload(storagePath, blob, {
              contentType: mimeType,
              upsert: false
            });

          if (uploadError) {
            console.error(`Fel vid uppladdning av bild för projekt ${project.id}:`, uploadError);
            continue;
          }

          // Försök uppdatera projekt med storage_path (hantera fall där kolumnen inte finns)
          try {
            const { error: updateError } = await supabase
              .from('projects')
              .update({ storage_path: storagePath } as any)
              .eq('id', project.id);

            if (updateError) {
              console.error(`Fel vid uppdatering av projekt ${project.id}:`, updateError);
              continue;
            }
          } catch (error) {
            console.log(`storage_path column does not exist for project ${project.id}, but image uploaded successfully`);
          }

          console.log(`Migrerade bild för projekt ${project.id}: ${storagePath}`);

        } catch (error) {
          console.error(`Fel vid migrering av projekt ${project.id}:`, error);
          continue;
        }
      }

      toast({
        title: "Migration slutförd",
        description: `${projectsToMigrate.length} bilder har migrerats till Storage.`,
      });

    } catch (error) {
      console.error('Fel vid bildmigrering:', error);
      toast({
        title: "Migreringsfel",
        description: "Något gick fel under migreringen.",
        variant: "destructive",
      });
    } finally {
      setMigrating(false);
      setProgress(0);
    }
  };

  return {
    migrating,
    progress,
    migrateProjectImages
  };
};
