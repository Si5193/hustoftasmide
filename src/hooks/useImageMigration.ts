
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface MigrationProgress {
  total: number;
  completed: number;
  failed: number;
  skipped: number;
  current: string;
  status: 'idle' | 'running' | 'paused' | 'completed' | 'error';
}

export const useImageMigration = () => {
  const [migrating, setMigrating] = useState(false);
  const [progress, setProgress] = useState<MigrationProgress>({
    total: 0,
    completed: 0,
    failed: 0,
    skipped: 0,
    current: '',
    status: 'idle'
  });
  const [isPaused, setIsPaused] = useState(false);
  const { toast } = useToast();

  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  const calculateImageSize = (base64Data: string): number => {
    // Calculate approximate size in bytes from base64
    return Math.round((base64Data.length * 3) / 4);
  };

  const uploadImageWithRetry = async (
    base64Data: string, 
    mimeType: string, 
    storagePath: string, 
    maxRetries = 2
  ): Promise<boolean> => {
    // Check image size first (skip if over 8MB to prevent timeouts)
    const imageSizeBytes = calculateImageSize(base64Data);
    const maxSizeBytes = 8 * 1024 * 1024; // 8MB limit
    
    if (imageSizeBytes > maxSizeBytes) {
      console.log(`Skipping oversized image: ${Math.round(imageSizeBytes / 1024 / 1024)}MB`);
      return false;
    }

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        // Convert base64 to blob with smaller chunks for large images
        const byteCharacters = atob(base64Data);
        const chunkSize = 1024 * 512; // 512KB chunks
        const chunks = [];
        
        for (let offset = 0; offset < byteCharacters.length; offset += chunkSize) {
          const chunk = byteCharacters.slice(offset, offset + chunkSize);
          const byteNumbers = new Array(chunk.length);
          for (let i = 0; i < chunk.length; i++) {
            byteNumbers[i] = chunk.charCodeAt(i);
          }
          chunks.push(new Uint8Array(byteNumbers));
        }
        
        const blob = new Blob(chunks, { type: mimeType });

        // Upload to Storage with optimized settings
        const { error: uploadError } = await supabase.storage
          .from('project-images')
          .upload(storagePath, blob, {
            contentType: mimeType,
            upsert: false,
            duplex: 'half' // Optimize for upload performance
          });

        if (uploadError) {
          console.error(`Upload error (attempt ${attempt}/${maxRetries}):`, uploadError);
          if (attempt === maxRetries) return false;
          await delay(2000 * attempt); // Progressive backoff
          continue;
        }

        return true;
      } catch (error) {
        console.error(`Upload exception (attempt ${attempt}/${maxRetries}):`, error);
        if (attempt === maxRetries) return false;
        await delay(2000 * attempt);
      }
    }
    return false;
  };

  const updateProjectWithRetry = async (
    projectId: number, 
    storagePath: string, 
    maxRetries = 2
  ): Promise<boolean> => {
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        const { error: updateError } = await supabase
          .from('projects')
          .update({ storage_path: storagePath })
          .eq('id', projectId);

        if (updateError) {
          console.error(`Database update error (attempt ${attempt}/${maxRetries}):`, updateError);
          if (attempt === maxRetries) return false;
          await delay(1000 * attempt);
          continue;
        }

        return true;
      } catch (error) {
        console.error(`Database update exception (attempt ${attempt}/${maxRetries}):`, error);
        if (attempt === maxRetries) return false;
        await delay(1000 * attempt);
      }
    }
    return false;
  };

  const verifyUploadedImage = async (storagePath: string): Promise<boolean> => {
    try {
      const { data: { publicUrl } } = supabase.storage
        .from('project-images')
        .getPublicUrl(storagePath);
      
      // Quick HEAD request to verify file exists
      const response = await fetch(publicUrl, { 
        method: 'HEAD',
        cache: 'no-cache'
      });
      return response.ok;
    } catch (error) {
      console.error('Error verifying uploaded image:', error);
      return false;
    }
  };

  const migrateProjectImages = async () => {
    try {
      setMigrating(true);
      setIsPaused(false);
      setProgress(prev => ({ 
        ...prev, 
        status: 'running', 
        completed: 0, 
        failed: 0, 
        skipped: 0 
      }));

      // Fetch projects with base64 images that need migration
      const { data: projects, error: fetchError } = await supabase
        .from('projects')
        .select('id, title, image_url, storage_path')
        .like('image_url', 'data:%')
        .is('storage_path', null)
        .order('id', { ascending: true }); // Process in consistent order

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

      console.log(`Starting migration of ${projects.length} images (one at a time)...`);

      // Process ONE image at a time to prevent timeouts
      for (let i = 0; i < projects.length; i++) {
        if (isPaused) {
          setProgress(prev => ({ ...prev, status: 'paused' }));
          break;
        }

        const project = projects[i];
        
        setProgress(prev => ({ 
          ...prev, 
          current: project.title 
        }));

        try {
          console.log(`\n--- Migrating project ${i + 1}/${projects.length}: "${project.title}" ---`);
          
          const base64Data = project.image_url.split(',')[1];
          const mimeType = project.image_url.split(';')[0].split(':')[1];
          
          // Check and log image size
          const imageSizeKB = Math.round(calculateImageSize(base64Data) / 1024);
          console.log(`Image size: ${imageSizeKB} KB`);

          // Skip oversized images
          if (imageSizeKB > 8000) { // 8MB limit
            console.log(`⚠️ Skipping oversized image: ${imageSizeKB} KB`);
            setProgress(prev => ({ ...prev, skipped: prev.skipped + 1 }));
            continue;
          }

          // Determine file extension
          const fileExtension = mimeType.includes('jpeg') ? '.jpg' :
                               mimeType.includes('png') ? '.png' :
                               mimeType.includes('gif') ? '.gif' :
                               mimeType.includes('webp') ? '.webp' : '.jpg';

          const fileName = `project-${project.id}-${Date.now()}${fileExtension}`;
          const storagePath = `projects/${fileName}`;

          // Upload with retry logic
          console.log('🔄 Uploading to Storage...');
          const uploadSuccess = await uploadImageWithRetry(base64Data, mimeType, storagePath);
          
          if (!uploadSuccess) {
            console.error(`❌ Failed to upload image for project ${project.id}`);
            setProgress(prev => ({ ...prev, failed: prev.failed + 1 }));
            continue;
          }

          // Verify upload
          console.log('✅ Upload successful, verifying...');
          const verifySuccess = await verifyUploadedImage(storagePath);
          if (!verifySuccess) {
            console.error(`❌ Failed to verify uploaded image for project ${project.id}`);
            // Clean up failed upload
            await supabase.storage.from('project-images').remove([storagePath]);
            setProgress(prev => ({ ...prev, failed: prev.failed + 1 }));
            continue;
          }

          // Update database
          console.log('💾 Updating database...');
          const updateSuccess = await updateProjectWithRetry(project.id, storagePath);
          
          if (!updateSuccess) {
            console.error(`❌ Failed to update project ${project.id} in database`);
            // Clean up uploaded file if database update failed
            await supabase.storage.from('project-images').remove([storagePath]);
            setProgress(prev => ({ ...prev, failed: prev.failed + 1 }));
            continue;
          }

          setProgress(prev => ({ 
            ...prev, 
            completed: prev.completed + 1 
          }));

          console.log(`✅ Successfully migrated project ${project.id}: ${storagePath}`);

        } catch (error) {
          console.error(`❌ Error migrating project ${project.id}:`, error);
          setProgress(prev => ({ ...prev, failed: prev.failed + 1 }));
        }

        // Longer pause between each image to prevent database overload
        if (i < projects.length - 1 && !isPaused) {
          console.log('⏸️ Pausing 3 seconds before next image...');
          await delay(3000);
        }
      }

      const finalProgress = progress.completed + progress.failed + progress.skipped;
      const isCompleted = finalProgress >= projects.length && !isPaused;
      
      setProgress(prev => ({ 
        ...prev, 
        status: isPaused ? 'paused' : 'completed',
        current: ''
      }));

      if (isCompleted) {
        const message = `${progress.completed} bilder migrerade framgångsrikt.${progress.failed > 0 ? ` ${progress.failed} misslyckades.` : ''}${progress.skipped > 0 ? ` ${progress.skipped} hoppades över (för stora).` : ''}`;
        
        toast({
          title: "Migration slutförd",
          description: message,
          variant: progress.failed > 0 ? "destructive" : "default"
        });
      }

    } catch (error) {
      console.error('Fatal migration error:', error);
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
      skipped: 0,
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
