
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
      
      if (projectImagesBucket) {
        console.log('✅ project-images bucket exists and is ready');
      } else {
        console.log('❌ project-images bucket does not exist');
      }
      
    } catch (error) {
      console.error('Error checking bucket existence:', error);
    } finally {
      setChecking(false);
    }
  };

  const createBucket = async () => {
    toast({
      title: "Bucket skapas automatiskt",
      description: "Storage bucket skapas via SQL-migrering istället för applikationen.",
    });
    return false;
  };

  return {
    bucketExists,
    checking,
    createBucket
  };
};
