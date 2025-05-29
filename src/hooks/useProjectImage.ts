
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

    // För tillfället, hoppa över bildladdning helt och visa placeholder
    // Detta undviker timeout-problem med stora base64-bilder
    console.log(`Skipping image load for project ${projectId} - using placeholder`);
    setImageUrl('https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=400&h=400&fit=crop'); // Placeholder från projektet
    setLoading(false);
    setError(false);

    // Kommenterad kod för framtida användning när vi migrerat till Storage:
    /*
    const fetchImage = async () => {
      try {
        setLoading(true);
        setError(false);
        
        const { data, error: fetchError } = await supabase
          .from('projects')
          .select('image_url')
          .eq('id', projectId)
          .single();

        if (fetchError) {
          throw fetchError;
        }

        setImageUrl(data.image_url || null);
      } catch (error) {
        console.error('Error fetching project image:', error);
        setError(true);
        setImageUrl(null);
      } finally {
        setLoading(false);
      }
    };

    fetchImage();
    */
  }, [projectId]);

  return {
    imageUrl,
    loading,
    error
  };
};
