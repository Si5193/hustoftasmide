
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';

export const useImageHandling = (projects: { id: number }[]) => {
  const [imageError, setImageError] = useState<Record<number, boolean>>({});
  const [imagesLoaded, setImagesLoaded] = useState<Record<number, boolean>>({});
  const { toast } = useToast();

  // Reset image states when projects change
  useEffect(() => {
    setImageError({});
    setImagesLoaded({});
  }, [projects]);

  // For showing errors with images
  useEffect(() => {
    const errors = Object.keys(imageError).length;
    if (errors > 0) {
      toast({
        title: `${errors} bilder kunde inte laddas`,
        description: "Kontrollera att bilderna finns i rätt mapp och har rätt filnamn.",
        variant: "destructive",
      });
    }
  }, [imageError, toast]);

  // Handle image loading error
  const handleImageError = (projectId: number) => {
    console.error(`Failed to load image for project ${projectId}`);
    setImageError(prev => ({ ...prev, [projectId]: true }));
  };

  // Handle image loading success
  const handleImageLoad = (projectId: number) => {
    setImagesLoaded(prev => ({ ...prev, [projectId]: true }));
  };

  return {
    imageError,
    imagesLoaded,
    handleImageError,
    handleImageLoad
  };
};
