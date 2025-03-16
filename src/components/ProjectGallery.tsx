
import { useImageHandling } from '@/hooks/useImageHandling';
import { useProjectNavigation } from '@/hooks/useProjectNavigation';
import ProjectCard from './gallery/ProjectCard';
import ProjectModal from './gallery/ProjectModal';

interface Project {
  id: number;
  title: string;
  description: string;
  category: string;
  image: string;
}

interface ProjectGalleryProps {
  projects: Project[];
  title?: string;
  subtitle?: string;
}

const ProjectGallery = ({ projects, title, subtitle }: ProjectGalleryProps) => {
  const { 
    imageError, 
    imagesLoaded, 
    handleImageError, 
    handleImageLoad 
  } = useImageHandling(projects);
  
  const {
    selectedProject,
    activeIndex,
    openProject,
    closeProject,
    navigateProject,
    handleBackdropClick
  } = useProjectNavigation(projects);

  return (
    <section className="py-12 md:py-16 bg-background">
      {(title || subtitle) && (
        <div className="mb-10 text-center">
          {title && <h2 className="mb-3 text-3xl font-bold text-metal-800 md:text-4xl">{title}</h2>}
          {subtitle && <p className="mx-auto max-w-3xl text-lg text-metal-500">{subtitle}</p>}
        </div>
      )}
      
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              onOpenProject={openProject}
              imageError={imageError}
              imagesLoaded={imagesLoaded}
              onImageError={handleImageError}
              onImageLoad={handleImageLoad}
            />
          ))}
        </div>
      </div>

      {/* Project Modal */}
      <ProjectModal
        selectedProject={selectedProject}
        activeIndex={activeIndex}
        projects={projects}
        imageError={imageError}
        imagesLoaded={imagesLoaded}
        onImageError={handleImageError}
        onImageLoad={handleImageLoad}
        onClose={closeProject}
        onNavigate={navigateProject}
        onBackdropClick={handleBackdropClick}
      />
    </section>
  );
};

export default ProjectGallery;
