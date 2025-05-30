
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

// Simple in-memory cache for images
const imageCache = new Map<number, string>();

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

    // Check cache first
    if (imageCache.has(projectId)) {
      setImageUrl(imageCache.get(projectId)!);
      setLoading(false);
      setError(false);
      return;
    }

    const fetchImage = async () => {
      try {
        setLoading(true);
        setError(false);
        
        // Hämta projekt med storage_path och image_url
        const { data, error: fetchError } = await supabase
          .from('projects')
          .select('image_url, storage_path')
          .eq('id', projectId)
          .single();

        if (fetchError) {
          throw fetchError;
        }

        if (!data) {
          const fallbackUrl = 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=400&h=400&fit=crop';
          setImageUrl(fallbackUrl);
          imageCache.set(projectId, fallbackUrl);
          return;
        }

        let finalImageUrl: string;

        // Prioritera Storage-bild om den finns
        if (data.storage_path && typeof data.storage_path === 'string') {
          const { data: { publicUrl } } = supabase.storage
            .from('project-images')
            .getPublicUrl(data.storage_path);
          
          finalImageUrl = publicUrl;
        } else if (data.image_url) {
          finalImageUrl = data.image_url;
        } else {
          // Fallback till placeholder endast om ingen bild finns alls
          finalImageUrl = 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=400&h=400&fit=crop';
        }

        // Cache the result
        imageCache.set(projectId, finalImageUrl);
        setImageUrl(finalImageUrl);

      } catch (error) {
        console.error('Error fetching project image:', error);
        setError(true);
        const fallbackUrl = 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=400&h=400&fit=crop';
        setImageUrl(fallbackUrl);
        imageCache.set(projectId, fallbackUrl);
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
