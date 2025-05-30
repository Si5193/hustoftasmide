
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Project } from '../../hooks/useSupabaseProjects';
import { useProjectImage } from '../../hooks/useProjectImage';
import ShareButton from '../ui/share-button';
import OptimizedImage from './OptimizedImage';

interface ProjectModalProps {
  selectedProject: Project | null;
  activeIndex: number | null;
  projects: Project[];
  imageError: Record<number, boolean>;
  imagesLoaded: Record<number, boolean>;
  onImageError: (projectId: number) => void;
  onImageLoad: (projectId: number) => void;
  onClose: () => void;
  onNavigate: (direction: 'prev' | 'next') => void;
  onBackdropClick: (e: React.MouseEvent<HTMLDivElement>) => void;
}

const ProjectModal = ({
  selectedProject,
  activeIndex,
  projects,
  imageError,
  imagesLoaded,
  onImageError,
  onImageLoad,
  onClose,
  onNavigate,
  onBackdropClick
}: ProjectModalProps) => {
  const { imageUrl } = useProjectImage(selectedProject?.id || null);
  
  if (!selectedProject) return null;
  
  const projectWithImage = { ...selectedProject, image: imageUrl || '' };
  
  const handleImageError = () => {
    if (selectedProject) {
      onImageError(selectedProject.id);
    }
  };

  const handleImageLoad = () => {
    if (selectedProject) {
      onImageLoad(selectedProject.id);
    }
  };
  
  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 overflow-y-auto"
      onClick={onBackdropClick}
    >
      <div className="relative w-full max-w-4xl overflow-hidden rounded-lg bg-white my-auto mx-auto">
        <button 
          className="absolute right-4 top-4 z-10 rounded-full bg-black/20 p-2 text-white backdrop-blur-sm transition-colors hover:bg-black/40"
          onClick={onClose}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
        
        <div className="flex flex-col md:flex-row">
          <div className="w-full md:w-1/2 h-52 sm:h-60 md:h-72">
            <OptimizedImage
              src={imageUrl || 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=400&h=400&fit=crop'}
              alt={selectedProject.title}
              aspectRatio="auto"
              className="h-full w-full"
              onLoad={handleImageLoad}
              onError={handleImageError}
            />
          </div>
          
          <div className="p-6 md:p-8 w-full md:w-1/2 flex flex-col justify-center">
            <h3 className="mb-2 text-xl sm:text-2xl font-bold text-metal-800">{selectedProject.title}</h3>
            <p className="mb-4 inline-block rounded-full bg-metal-100 px-3 py-1 text-sm font-medium text-metal-600">
              {selectedProject.category}
            </p>
            <p className="text-metal-600 text-sm sm:text-base mb-6">{selectedProject.description}</p>
            
            {/* Share Button */}
            <div className="flex justify-start">
              <ShareButton
                title={selectedProject.title}
                description={selectedProject.description}
                imageUrl={imageUrl || ''}
              />
            </div>
          </div>
        </div>
        
        {/* Navigation Buttons */}
        <div className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 transform">
          <button 
            className="rounded-full bg-black/20 p-1 sm:p-2 text-white backdrop-blur-sm transition-colors hover:bg-black/40"
            onClick={(e) => {
              e.stopPropagation();
              onNavigate('prev');
            }}
            aria-label="Föregående projekt"
          >
            <ChevronLeft size={20} />
          </button>
        </div>
        
        <div className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 transform">
          <button 
            className="rounded-full bg-black/20 p-1 sm:p-2 text-white backdrop-blur-sm transition-colors hover:bg-black/40"
            onClick={(e) => {
              e.stopPropagation();
              onNavigate('next');
            }}
            aria-label="Nästa projekt"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;
