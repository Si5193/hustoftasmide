
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export const useStorageSetup = () => {
  const [bucketExists, setBucketExists] = useState(false);
  const [checking, setChecking] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastChecked, setLastChecked] = useState<Date | null>(null);
  const { toast } = useToast();

  const checkBucketExists = async (showToast = false) => {
    try {
      setChecking(true);
      setError(null);
      
      console.log('🔍 Checking for project-images bucket...');
      
      const { data, error } = await supabase.storage.listBuckets();
      
      if (error) {
        console.error('❌ Error checking buckets:', error);
        setError(`Fel vid kontroll av buckets: ${error.message}`);
        setChecking(false);
        if (showToast) {
          toast({
            title: "Fel vid bucket-kontroll",
            description: error.message,
            variant: "destructive",
          });
        }
        return;
      }

      console.log('📋 Found buckets:', data?.map(b => b.name));
      
      const projectImagesBucket = data?.find(bucket => bucket.name === 'project-images');
      const exists = !!projectImagesBucket;
      
      setBucketExists(exists);
      setLastChecked(new Date());
      
      if (exists) {
        console.log('✅ project-images bucket exists and is ready');
        console.log('📊 Bucket details:', projectImagesBucket);
        if (showToast) {
          toast({
            title: "Bucket hittad!",
            description: "project-images bucket är redo för migration.",
          });
        }
      } else {
        console.log('❌ project-images bucket does not exist');
        console.log('🔍 Available buckets:', data?.map(b => b.name) || []);
        setError('project-images bucket hittades inte');
        if (showToast) {
          toast({
            title: "Bucket saknas",
            description: "project-images bucket kunde inte hittas.",
            variant: "destructive",
          });
        }
      }
      
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Okänt fel';
      console.error('💥 Exception checking bucket existence:', error);
      setError(`Undantag vid bucket-kontroll: ${errorMessage}`);
      if (showToast) {
        toast({
          title: "Systemfel",
          description: errorMessage,
          variant: "destructive",
        });
      }
    } finally {
      setChecking(false);
    }
  };

  useEffect(() => {
    checkBucketExists();
  }, []);

  const refreshBucketStatus = () => {
    console.log('🔄 Manual refresh of bucket status...');
    checkBucketExists(true);
  };

  const createBucket = async () => {
    toast({
      title: "Bucket skapas automatiskt",
      description: "Storage bucket skapas via SQL-migrering istället för applikationen.",
    });
    return false;
  };

  // Force bucket exists (fallback when we know it exists but detection fails)
  const forceBucketExists = () => {
    console.log('🔧 Forcing bucket exists status to true');
    setBucketExists(true);
    setError(null);
    toast({
      title: "Bucket status uppdaterad",
      description: "Bucket status har tvingats till 'exists'. Migration kan nu köras.",
    });
  };

  return {
    bucketExists,
    checking,
    error,
    lastChecked,
    createBucket,
    refreshBucketStatus,
    forceBucketExists
  };
};
