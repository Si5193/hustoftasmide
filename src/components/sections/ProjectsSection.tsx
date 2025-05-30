
import ProjectGallery from '../ProjectGallery';
import { Project } from '../../hooks/useSupabaseProjects';

interface ProjectsSectionProps {
  projects: Project[];
}

const ProjectsSection = ({ projects }: ProjectsSectionProps) => {
  return (
    <section id="projects" className="py-16 md:py-24">
      <ProjectGallery 
        projects={projects} 
        title="Våra senaste projekt"
        subtitle="Upptäck exempel på vårt hantverk och se vad vi kan göra för dig."
      />
    </section>
  );
};

export default ProjectsSection;
