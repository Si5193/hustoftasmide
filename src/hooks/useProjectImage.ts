
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export const useProjectImage = (projectId: number | null) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!projectId) {
      setImageUrl(null);
      setError(false);
      return;
    }

    const fetchImage = async () => {
      try {
        setLoading(true);
        setError(false);
        
        // First try to fetch with storage_path
        let data = null;
        let hasStoragePath = false;

        // Test if storage_path column exists by trying to select it
        try {
          const { data: testData, error: testError } = await supabase
            .from('projects')
            .select('image_url, storage_path')
            .eq('id', projectId)
            .single();

          if (!testError && testData) {
            data = testData;
            hasStoragePath = true;
          }
        } catch (error) {
          // storage_path column doesn't exist, fall back to image_url only
          console.log('storage_path column not available, using image_url only');
        }

        // If storage_path query failed, try with just image_url
        if (!data) {
          const { data: fallbackData, error: fallbackError } = await supabase
            .from('projects')
            .select('image_url')
            .eq('id', projectId)
            .single();

          if (fallbackError) {
            throw fallbackError;
          }
          data = fallbackData;
        }

        if (!data) {
          setImageUrl('https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=400&h=400&fit=crop');
          return;
        }

        // Prioritera Storage-bild om den finns och storage_path kolumnen existerar
        if (hasStoragePath && data.storage_path && typeof data.storage_path === 'string') {
          const { data: { publicUrl } } = supabase.storage
            .from('project-images')
            .getPublicUrl(data.storage_path);
          
          setImageUrl(publicUrl);
        } else if (data.image_url) {
          // Fallback till base64 om Storage-bild inte finns
          if (data.image_url.startsWith('data:')) {
            // För stora base64-bilder, använd placeholder tills migration är klar
            console.log(`Project ${projectId} har fortfarande base64-bild, använder placeholder`);
            setImageUrl('https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=400&h=400&fit=crop');
          } else {
            setImageUrl(data.image_url);
          }
        } else {
          // Ingen bild finns
          setImageUrl('https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=400&h=400&fit=crop');
        }

      } catch (error) {
        console.error('Error fetching project image:', error);
        setError(true);
        setImageUrl('https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=400&h=400&fit=crop');
      } finally {
        setLoading(false);
      }
    };

    fetchImage();
  }, [projectId]);

  return {
    imageUrl,
    loading,
    error
  };
};
