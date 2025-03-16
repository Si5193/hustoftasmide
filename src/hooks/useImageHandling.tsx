
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';

export const useImageHandling = (projects: { id: number; image: string }[]) => {
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
      const failedImages = projects
        .filter(project => imageError[project.id])
        .map(project => `${project.id}: ${project.image}`)
        .join(', ');
      
      toast({
        title: `${errors} bilder kunde inte laddas`,
        description: `Kontrollera dessa bilder: ${failedImages}`,
        variant: "destructive",
      });
      
      console.log("Failed images:", failedImages);
    }
  }, [imageError, toast, projects]);

  // Handle image loading error
  const handleImageError = (projectId: number) => {
    const project = projects.find(p => p.id === projectId);
    console.error(`Failed to load image for project ${projectId}: ${project?.image}`);
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
