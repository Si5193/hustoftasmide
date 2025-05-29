
import { Plus } from 'lucide-react';
import { Project } from '../../hooks/useSupabaseProjects';
import { useProjectImage } from '../../hooks/useProjectImage';
import { useIsMobile } from '@/hooks/use-mobile';

interface ProjectCardProps {
  project: Project;
  index: number;
  onOpenProject: (project: Project, index: number) => void;
  imageError: Record<number, boolean>;
  imagesLoaded: Record<number, boolean>;
  onImageError: (projectId: number) => void;
  onImageLoad: (projectId: number) => void;
}

const ProjectCard = ({
  project,
  index,
  onOpenProject,
  imageError,
  imagesLoaded,
  onImageError,
  onImageLoad
}: ProjectCardProps) => {
  const isMobile = useIsMobile();
  const { imageUrl, loading: imageLoading, error: imageLoadError } = useProjectImage(project.id);
  
  // Update project with loaded image
  const projectWithImage = { ...project, image: imageUrl || '' };
  
  // Handle image states - combine local error state with hook error state
  const hasImageError = imageError[project.id] || imageLoadError;
  const isImageLoaded = imagesLoaded[project.id] && imageUrl && !imageLoadError;
  const isLoading = imageLoading && !hasImageError;
  
  return (
    <div 
      key={project.id}
      className="group relative cursor-pointer overflow-hidden rounded-lg bg-metal-100 shadow-md transition-transform hover:scale-[1.02] hover:shadow-lg min-h-[120px] md:min-h-[200px]"
      onClick={() => onOpenProject(projectWithImage, index)}
    >
      <div className="aspect-square overflow-hidden">
        {hasImageError ? (
          <div className="flex flex-col h-full w-full items-center justify-center bg-metal-200 p-2 md:p-4">
            <div className="text-metal-400 mb-2">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M21 19V5C21 3.9 20.1 3 19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19ZM8.5 13.5L11 16.51L14.5 12L19 18H5L8.5 13.5Z" fill="currentColor"/>
              </svg>
            </div>
            <p className="text-xs md:text-sm text-metal-500 text-center">Bild kunde inte laddas</p>
          </div>
        ) : (
          <div className="relative h-full w-full">
            {(isLoading || !isImageLoaded) && (
              <div className="absolute inset-0 flex items-center justify-center bg-metal-100">
                <div className="h-4 w-4 md:h-8 md:w-8 animate-spin rounded-full border-2 md:border-4 border-metal-300 border-t-metal-500"></div>
              </div>
            )}
            {imageUrl && !imageLoadError && (
              <img
                src={imageUrl}
                alt={project.title}
                className={`h-full w-full object-cover transition-all duration-500 ease-out group-hover:scale-105 ${
                  isImageLoaded ? 'opacity-100' : 'opacity-0'
                }`}
                onError={() => onImageError(project.id)}
                onLoad={() => onImageLoad(project.id)}
                loading="lazy"
              />
            )}
          </div>
        )}
      </div>
      
      <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/80 to-transparent p-2 md:p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <div className="translate-y-2 md:translate-y-4 transform transition-transform duration-300 group-hover:translate-y-0">
          <h3 className="mb-0.5 md:mb-1 text-xs md:text-lg font-semibold text-white leading-tight">{project.title}</h3>
          <p className="text-xs md:text-sm text-metal-200">{project.category}</p>
        </div>
        
        <div className="absolute right-2 top-2 md:right-4 md:top-4 rounded-full bg-white/10 p-1 md:p-2 backdrop-blur-sm">
          <Plus className="text-white" size={isMobile ? 12 : 20} />
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
