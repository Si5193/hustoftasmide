
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Project } from '../sections/ProjectsSection';

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
  if (!selectedProject) return null;
  
  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
      onClick={onBackdropClick}
    >
      <div className="relative max-h-[90vh] w-full max-w-5xl overflow-auto rounded-lg bg-white">
        <button 
          className="absolute right-4 top-4 z-10 rounded-full bg-black/20 p-2 text-white backdrop-blur-sm transition-colors hover:bg-black/40"
          onClick={onClose}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
        
        <div className="grid md:grid-cols-2">
          <div className="h-72 overflow-hidden md:h-auto">
            {imageError[selectedProject.id] ? (
              <div className="flex h-full w-full flex-col items-center justify-center bg-metal-200 p-4">
                <p className="text-metal-500">Bild saknas</p>
                <p className="text-xs text-metal-400 mt-1 text-center break-all">{selectedProject.image}</p>
              </div>
            ) : (
              <div className="relative h-full w-full">
                {!imagesLoaded[selectedProject.id] && (
                  <div className="absolute inset-0 flex items-center justify-center bg-metal-100">
                    <div className="h-8 w-8 animate-spin rounded-full border-4 border-metal-300 border-t-metal-500"></div>
                  </div>
                )}
                <img 
                  src={selectedProject.image} 
                  alt={selectedProject.title}
                  className={`h-full w-full object-cover ${
                    imagesLoaded[selectedProject.id] ? 'opacity-100' : 'opacity-0'
                  }`}
                  onError={() => onImageError(selectedProject.id)}
                  onLoad={() => onImageLoad(selectedProject.id)}
                />
              </div>
            )}
          </div>
          
          <div className="p-6 md:p-8">
            <h3 className="mb-2 text-2xl font-bold text-metal-800">{selectedProject.title}</h3>
            <p className="mb-4 inline-block rounded-full bg-metal-100 px-3 py-1 text-sm font-medium text-metal-600">
              {selectedProject.category}
            </p>
            <p className="text-metal-600">{selectedProject.description}</p>
          </div>
        </div>
        
        {/* Navigation Buttons */}
        <div className="absolute left-4 top-1/2 -translate-y-1/2 transform md:left-6">
          <button 
            className="rounded-full bg-black/20 p-2 text-white backdrop-blur-sm transition-colors hover:bg-black/40"
            onClick={(e) => {
              e.stopPropagation();
              onNavigate('prev');
            }}
          >
            <ChevronLeft size={24} />
          </button>
        </div>
        
        <div className="absolute right-4 top-1/2 -translate-y-1/2 transform md:right-6">
          <button 
            className="rounded-full bg-black/20 p-2 text-white backdrop-blur-sm transition-colors hover:bg-black/40"
            onClick={(e) => {
              e.stopPropagation();
              onNavigate('next');
            }}
          >
            <ChevronRight size={24} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;
