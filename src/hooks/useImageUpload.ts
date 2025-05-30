
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from './use-toast';
import { compressImage } from '@/utils/imageCompression';

interface UploadResult {
  storagePath: string;
  publicUrl: string;
  originalSize: number;
  compressedSize: number;
}

interface UploadProgress {
  stage: string;
  progress: number;
}

export const useImageUpload = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<UploadProgress>({ stage: '', progress: 0 });
  const { toast } = useToast();

  const uploadImage = async (file: File): Promise<UploadResult | null> => {
    try {
      setIsUploading(true);
      setUploadProgress({ stage: 'Validerar fil...', progress: 5 });
      
      // Validate file type
      if (!file.type.startsWith('image/')) {
        toast({
          title: "Fel filtyp",
          description: "Endast bildfiler är tillåtna.",
          variant: "destructive",
        });
        return null;
      }

      console.log(`🔄 Compressing image: ${file.name} (${(file.size / 1024).toFixed(1)}KB)`);
      
      // Compress the image with progress feedback
      const compressed = await compressImage(
        file, 
        500, 
        0.8, 
        (stage, progress) => {
          setUploadProgress({ stage, progress });
        }
      );
      
      console.log(`✅ Compression complete: ${(compressed.originalSize / 1024).toFixed(1)}KB → ${(compressed.compressedSize / 1024).toFixed(1)}KB`);
      
      setUploadProgress({ stage: 'Förbereder uppladdning...', progress: 95 });
      
      // Generate storage path
      const fileExtension = 'jpg';
      const fileName = `project-${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExtension}`;
      const storagePath = `projects/${fileName}`;

      setUploadProgress({ stage: 'Laddar upp till server...', progress: 98 });

      // Upload to Storage with optimized settings
      const { error: uploadError } = await supabase.storage
        .from('project-images')
        .upload(storagePath, compressed.blob, {
          contentType: 'image/jpeg',
          upsert: false,
          duplex: 'half' // Optimering för snabbare uppladdning
        });

      if (uploadError) {
        console.error('Storage upload error:', uploadError);
        toast({
          title: "Uppladdningsfel",
          description: "Kunde inte ladda upp bilden till storage.",
          variant: "destructive",
        });
        return null;
      }

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('project-images')
        .getPublicUrl(storagePath);

      setUploadProgress({ stage: 'Klar!', progress: 100 });

      console.log(`✅ Image uploaded successfully: ${publicUrl}`);
      
      toast({
        title: "Bild uppladdad!",
        description: `Komprimerad från ${(compressed.originalSize / 1024).toFixed(1)}KB till ${(compressed.compressedSize / 1024).toFixed(1)}KB`,
      });

      return {
        storagePath,
        publicUrl,
        originalSize: compressed.originalSize,
        compressedSize: compressed.compressedSize
      };

    } catch (error) {
      console.error('Image upload error:', error);
      toast({
        title: "Uppladdningsfel",
        description: "Ett oväntat fel inträffade vid bilduppladdning.",
        variant: "destructive",
      });
      return null;
    } finally {
      setIsUploading(false);
      setUploadProgress({ stage: '', progress: 0 });
    }
  };

  return { uploadImage, isUploading, uploadProgress };
};
