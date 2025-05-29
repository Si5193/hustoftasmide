
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
        
        // Försök hämta med storage_path först, fallback till bara image_url
        let query = supabase
          .from('projects')
          .select('image_url')
          .eq('id', projectId)
          .single();

        // Försök inkludera storage_path om kolumnen finns
        try {
          query = supabase
            .from('projects')
            .select('image_url, storage_path')
            .eq('id', projectId)
            .single();
        } catch (error) {
          // storage_path kolumn finns inte, använd bara image_url
          console.log('storage_path column not available, using image_url only');
        }

        const { data, error: fetchError } = await query;

        if (fetchError) {
          throw fetchError;
        }

        // Prioritera Storage-bild om den finns och storage_path kolumnen existerar
        if (data && 'storage_path' in data && data.storage_path) {
          const { data: { publicUrl } } = supabase.storage
            .from('project-images')
            .getPublicUrl(data.storage_path);
          
          setImageUrl(publicUrl);
        } else if (data && data.image_url) {
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
