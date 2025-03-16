
import { useState } from 'react';

export interface Project {
  id: number;
  title: string;
  description: string;
  category: string;
  image: string;
}

export const useProjectNavigation = (projects: Project[]) => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

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

  return {
    selectedProject,
    activeIndex,
    openProject,
    closeProject,
    navigateProject,
    handleBackdropClick
  };
};
