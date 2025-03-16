
import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react';

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
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [imageError, setImageError] = useState<Record<number, boolean>>({});
  const [imagesLoaded, setImagesLoaded] = useState<Record<number, boolean>>({});

  useEffect(() => {
    // Reset image states when projects change
    setImageError({});
    setImagesLoaded({});
  }, [projects]);

  const openProject = (project: Project, index: number) => {
    setSelectedProject(project);
    setActiveIndex(index);
    document.body.style.overflow = 'hidden';
  };

  const closeProject = () => {
    setSelectedProject(null);
    setActiveIndex(null);
    document.body.style.overflow = 'auto';
  };

  const navigateProject = (direction: 'prev' | 'next') => {
    if (activeIndex === null) return;
    
    const newIndex = direction === 'next'
      ? (activeIndex + 1) % projects.length
      : (activeIndex - 1 + projects.length) % projects.length;
    
    setSelectedProject(projects[newIndex]);
    setActiveIndex(newIndex);
  };

  // Handle backdrop click to close
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      closeProject();
    }
  };

  // Handle image loading error
  const handleImageError = (projectId: number) => {
    console.error(`Failed to load image for project ${projectId}`);
    setImageError(prev => ({ ...prev, [projectId]: true }));
  };

  // Handle image loading success
  const handleImageLoad = (projectId: number) => {
    setImagesLoaded(prev => ({ ...prev, [projectId]: true }));
  };

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
            <div 
              key={project.id}
              className="group relative cursor-pointer overflow-hidden rounded-lg bg-metal-100 shadow-md transition-transform hover:scale-[1.02] hover:shadow-lg"
              onClick={() => openProject(project, index)}
            >
              <div className="aspect-[4/3] overflow-hidden">
                {imageError[project.id] ? (
                  <div className="flex h-full w-full items-center justify-center bg-metal-200">
                    <p className="text-metal-500">Bild saknas</p>
                    <p className="text-xs text-metal-400 mt-1">{project.image}</p>
                  </div>
                ) : (
                  <div className="relative h-full w-full">
                    {!imagesLoaded[project.id] && (
                      <div className="absolute inset-0 flex items-center justify-center bg-metal-100">
                        <div className="h-8 w-8 animate-spin rounded-full border-4 border-metal-300 border-t-metal-500"></div>
                      </div>
                    )}
                    <img
                      src={project.image}
                      alt={project.title}
                      className={`h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105 ${
                        imagesLoaded[project.id] ? 'opacity-100' : 'opacity-0'
                      }`}
                      onError={() => handleImageError(project.id)}
                      onLoad={() => handleImageLoad(project.id)}
                    />
                  </div>
                )}
              </div>
              
              <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/80 to-transparent p-6 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <div className="translate-y-4 transform transition-transform duration-300 group-hover:translate-y-0">
                  <h3 className="mb-1 text-xl font-semibold text-white">{project.title}</h3>
                  <p className="text-sm text-metal-200">{project.category}</p>
                </div>
                
                <div className="absolute right-4 top-4 rounded-full bg-white/10 p-2 backdrop-blur-sm">
                  <Plus className="text-white" size={20} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Project Modal */}
      {selectedProject && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          onClick={handleBackdropClick}
        >
          <div className="relative max-h-[90vh] w-full max-w-5xl overflow-auto rounded-lg bg-white">
            <button 
              className="absolute right-4 top-4 z-10 rounded-full bg-black/20 p-2 text-white backdrop-blur-sm transition-colors hover:bg-black/40"
              onClick={closeProject}
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
                      onError={() => handleImageError(selectedProject.id)}
                      onLoad={() => handleImageLoad(selectedProject.id)}
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
                  navigateProject('prev');
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
                  navigateProject('next');
                }}
              >
                <ChevronRight size={24} />
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default ProjectGallery;
