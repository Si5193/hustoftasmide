
import { Plus } from 'lucide-react';
import { Project } from '../../hooks/useSupabaseProjects';
import { useProjectImage } from '../../hooks/useProjectImage';
import { useIsMobile } from '@/hooks/use-mobile';
import OptimizedImage from './OptimizedImage';

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
  const { imageUrl, loading: imageLoading } = useProjectImage(project.id);
  
  // Update project with loaded image
  const projectWithImage = { ...project, image: imageUrl || '' };
  
  const handleImageError = () => {
    console.log(`Image error for project ${project.id}`);
    onImageError(project.id);
  };

  const handleImageLoad = () => {
    console.log(`Image loaded for project ${project.id}`);
    onImageLoad(project.id);
  };
  
  return (
    <div 
      key={project.id}
      className="group relative cursor-pointer overflow-hidden rounded-lg bg-metal-100 shadow-md transition-transform hover:scale-[1.02] hover:shadow-lg min-h-[120px] md:min-h-[200px]"
      onClick={() => onOpenProject(projectWithImage, index)}
    >
      <OptimizedImage
        src={imageUrl || 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=400&h=400&fit=crop'}
        alt={project.title}
        className="transition-all duration-500 ease-out group-hover:scale-105"
        onLoad={handleImageLoad}
        onError={handleImageError}
      />
      
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
