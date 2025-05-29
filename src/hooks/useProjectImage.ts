
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export const useProjectImage = (projectId: number | null) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (!projectId) {
      setImageUrl(null);
      setError(false);
      return;
    }

    const fetchImageWithTimeout = async (timeoutMs: number = 5000) => {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

      try {
        const { data, error: fetchError } = await supabase
          .from('projects')
          .select('image_url')
          .eq('id', projectId)
          .abortSignal(controller.signal)
          .single();

        clearTimeout(timeoutId);

        if (fetchError) {
          console.error('Error fetching project image:', fetchError);
          throw fetchError;
        }

        return data.image_url;
      } catch (error) {
        clearTimeout(timeoutId);
        throw error;
      }
    };

    const fetchImageWithRetry = async (maxRetries: number = 2) => {
      for (let attempt = 0; attempt <= maxRetries; attempt++) {
        try {
          setLoading(true);
          setError(false);
          
          const imageData = await fetchImageWithTimeout(5000);
          
          if (imageData) {
            setImageUrl(imageData);
            return;
          } else {
            // No image data found
            setImageUrl(null);
            setError(false);
            return;
          }
        } catch (error: any) {
          console.error(`Attempt ${attempt + 1} failed:`, error);
          
          if (attempt === maxRetries) {
            // Final attempt failed
            setError(true);
            setImageUrl(null);
            
            if (error.name !== 'AbortError') {
              toast({
                title: "Bildladdning misslyckades",
                description: "Kunde inte ladda projektbild efter flera försök.",
                variant: "destructive",
              });
            }
          } else {
            // Wait before retry (exponential backoff)
            await new Promise(resolve => setTimeout(resolve, Math.pow(2, attempt) * 1000));
          }
        }
      }
    };

    fetchImageWithRetry();

    return () => {
      // Cleanup function to prevent memory leaks
      setLoading(false);
    };
  }, [projectId, toast]);

  return {
    imageUrl,
    loading,
    error
  };
};
