
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export const useStorageSetup = () => {
  const [bucketExists, setBucketExists] = useState(false);
  const [checking, setChecking] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    checkBucketExists();
  }, []);

  const checkBucketExists = async () => {
    try {
      const { data, error } = await supabase.storage.listBuckets();
      
      if (error) {
        console.error('Error checking buckets:', error);
        setChecking(false);
        return;
      }

      const projectImagesBucket = data?.find(bucket => bucket.name === 'project-images');
      setBucketExists(!!projectImagesBucket);
      
      if (!projectImagesBucket) {
        console.log('project-images bucket does not exist, will need to create it');
      }
      
    } catch (error) {
      console.error('Error checking bucket existence:', error);
    } finally {
      setChecking(false);
    }
  };

  const createBucket = async () => {
    try {
      const { error } = await supabase.storage.createBucket('project-images', {
        public: true,
        allowedMimeTypes: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
        fileSizeLimit: 10485760 // 10MB
      });

      if (error) {
        console.error('Error creating bucket:', error);
        toast({
          title: "Fel",
          description: "Kunde inte skapa storage bucket. Kontakta administratören.",
          variant: "destructive",
        });
        return false;
      }

      setBucketExists(true);
      toast({
        title: "Bucket skapad",
        description: "Storage bucket för projektbilder har skapats.",
      });
      
      return true;
    } catch (error) {
      console.error('Error creating bucket:', error);
      toast({
        title: "Fel",
        description: "Något gick fel när bucket skulle skapas.",
        variant: "destructive",
      });
      return false;
    }
  };

  return {
    bucketExists,
    checking,
    createBucket
  };
};
