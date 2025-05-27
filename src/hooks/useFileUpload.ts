
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from './use-toast';

interface UploadedFile {
  name: string;
  url: string;
  size: number;
  type: string;
}

export const useFileUpload = () => {
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();

  const uploadFile = async (file: File): Promise<UploadedFile | null> => {
    try {
      setIsUploading(true);
      
      // Validate file size (10MB limit)
      if (file.size > 10 * 1024 * 1024) {
        toast({
          title: "Filen är för stor",
          description: "Filstorleken får max vara 10MB.",
          variant: "destructive",
        });
        return null;
      }

      // Validate file type
      const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'application/pdf'];
      if (!allowedTypes.includes(file.type)) {
        toast({
          title: "Filtypen stöds inte",
          description: "Endast bilder (JPG, PNG, GIF) och PDF-filer är tillåtna.",
          variant: "destructive",
        });
        return null;
      }

      // Generate unique filename with timestamp
      const timestamp = Date.now();
      const fileExtension = file.name.split('.').pop();
      const fileName = `${timestamp}-${Math.random().toString(36).substring(7)}.${fileExtension}`;

      console.log('Uploading file to Storage:', fileName);

      // Upload to Supabase Storage
      const { data, error } = await supabase.storage
        .from('contact-attachments')
        .upload(fileName, file, {
          cacheControl: '3600',
          upsert: false
        });

      if (error) {
        console.error('Storage upload error:', error);
        toast({
          title: "Uppladdningsfel",
          description: "Kunde inte ladda upp filen. Försök igen.",
          variant: "destructive",
        });
        return null;
      }

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('contact-attachments')
        .getPublicUrl(fileName);

      console.log('File uploaded successfully:', publicUrl);

      return {
        name: file.name,
        url: publicUrl,
        size: file.size,
        type: file.type
      };

    } catch (error) {
      console.error('File upload error:', error);
      toast({
        title: "Uppladdningsfel",
        description: "Ett oväntat fel inträffade vid filuppladdning.",
        variant: "destructive",
      });
      return null;
    } finally {
      setIsUploading(false);
    }
  };

  return { uploadFile, isUploading };
};
