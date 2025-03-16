
import { useState } from 'react';
import { Plus } from 'lucide-react';
import { Project } from '../sections/ProjectsSection';

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
  return (
    <div 
      key={project.id}
      className="group relative cursor-pointer overflow-hidden rounded-lg bg-metal-100 shadow-md transition-transform hover:scale-[1.02] hover:shadow-lg"
      onClick={() => onOpenProject(project, index)}
    >
      <div className="aspect-[4/3] overflow-hidden">
        {imageError[project.id] ? (
          <div className="flex flex-col h-full w-full items-center justify-center bg-metal-200 p-4">
            <p className="text-metal-500">Bild saknas</p>
            <p className="text-xs text-metal-400 mt-1 text-center break-all">{project.image}</p>
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
              onError={() => onImageError(project.id)}
              onLoad={() => onImageLoad(project.id)}
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
  );
};

export default ProjectCard;
