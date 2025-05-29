
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
          console.error('Error fetching project image:', fetchError);
          setError(true);
          return;
        }

        setImageUrl(data.image_url);
      } catch (error) {
        console.error('Error fetching project image:', error);
        setError(true);
        toast({
          title: "Fel",
          description: "Kunde inte ladda projektbild.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchImage();
  }, [projectId, toast]);

  return {
    imageUrl,
    loading,
    error
  };
};
