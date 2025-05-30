
import { useState } from 'react';
import { useLazyLoading } from '@/hooks/useLazyLoading';
import { Skeleton } from '@/components/ui/skeleton';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  onLoad?: () => void;
  onError?: () => void;
  aspectRatio?: 'square' | 'auto';
}

const OptimizedImage = ({ 
  src, 
  alt, 
  className = '', 
  onLoad, 
  onError,
  aspectRatio = 'square'
}: OptimizedImageProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const { elementRef, shouldLoad } = useLazyLoading(0.2);

  const handleImageLoad = () => {
    setImageLoaded(true);
    onLoad?.();
  };

  const handleImageError = () => {
    setImageError(true);
    onError?.();
  };

  return (
    <div 
      ref={elementRef} 
      className={`relative overflow-hidden ${aspectRatio === 'square' ? 'aspect-square' : ''} ${className}`}
    >
      {!shouldLoad && (
        <Skeleton className="h-full w-full" />
      )}
      
      {shouldLoad && !imageLoaded && !imageError && (
        <div className="absolute inset-0 flex items-center justify-center bg-metal-100">
          <div className="h-4 w-4 md:h-8 md:w-8 animate-spin rounded-full border-2 md:border-4 border-metal-300 border-t-metal-500"></div>
        </div>
      )}
      
      {shouldLoad && (
        <img
          src={src}
          alt={alt}
          className={`h-full w-full object-cover transition-opacity duration-300 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={handleImageLoad}
          onError={handleImageError}
          loading="lazy"
          decoding="async"
        />
      )}
    </div>
  );
};

export default OptimizedImage;
