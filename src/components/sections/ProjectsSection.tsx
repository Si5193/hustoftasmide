
import ProjectGallery from '../ProjectGallery';

// Project data type definition
export interface Project {
  id: number;
  title: string;
  description: string;
  category: string;
  image: string;
}

interface ProjectsSectionProps {
  projects: Project[];
}

const ProjectsSection = ({ projects }: ProjectsSectionProps) => {
  return (
    <ProjectGallery 
      projects={projects} 
      title="Våra senaste projekt"
      subtitle="Upptäck exempel på vårt hantverk och se vad vi kan göra för dig."
    />
  );
};

export default ProjectsSection;
