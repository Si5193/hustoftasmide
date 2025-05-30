
import { useMemo, useState } from 'react';
import { useImageHandling } from '@/hooks/useImageHandling';
import { useProjectNavigation } from '@/hooks/useProjectNavigation';
import { useShowMore } from '@/hooks/useShowMore';
import ProjectCard from './gallery/ProjectCard';
import ProjectModal from './gallery/ProjectModal';
import CategoryFilter from './gallery/CategoryFilter';
import { Button } from '@/components/ui/button';
import { ChevronDown } from 'lucide-react';

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
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  
  // Get unique categories
  const categories = useMemo(() => {
    const uniqueCategories = Array.from(new Set(projects.map(p => p.category)));
    return uniqueCategories.sort();
  }, [projects]);
  
  // Filter projects by category
  const filteredProjects = useMemo(() => {
    if (!selectedCategory) return projects;
    return projects.filter(project => project.category === selectedCategory);
  }, [projects, selectedCategory]);
  
  // Show more functionality
  const { 
    visibleItems: visibleProjects, 
    hasMore, 
    remainingCount, 
    showMore 
  } = useShowMore(filteredProjects, 6);
  
  const { 
    imageError, 
    imagesLoaded, 
    handleImageError, 
    handleImageLoad 
  } = useImageHandling(visibleProjects);
  
  const {
    selectedProject,
    activeIndex,
    openProject,
    closeProject,
    navigateProject,
    handleBackdropClick
  } = useProjectNavigation(filteredProjects);

  return (
    <section className="py-8 md:py-16 bg-background">
      <div className="container px-4 md:px-6 mx-auto max-w-7xl">
        {(title || subtitle) && (
          <div className="mb-8 md:mb-12 text-center">
            {title && (
              <h2 className="mb-3 md:mb-4 text-2xl md:text-3xl lg:text-4xl font-bold text-metal-800">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="mx-auto max-w-3xl text-sm md:text-lg text-metal-500 mb-6">
                {subtitle}
              </p>
            )}
          </div>
        )}
        
        {/* Category Filter */}
        {categories.length > 1 && (
          <CategoryFilter
            categories={categories}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
          />
        )}
        
        {/* Projects Grid */}
        <div className="grid gap-4 md:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 max-w-none">
          {visibleProjects.map((project, index) => (
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
        
        {/* Show More Button */}
        {hasMore && (
          <div className="flex justify-center mt-8 md:mt-12">
            <Button
              onClick={showMore}
              variant="outline"
              size="lg"
              className="group flex items-center gap-2 px-6 py-3 text-base font-medium"
            >
              Visa {Math.min(remainingCount, 6)} fler projekt
              <ChevronDown className="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
            </Button>
          </div>
        )}
        
        {/* Results counter */}
        {selectedCategory && (
          <div className="text-center mt-6 text-sm text-metal-500">
            Visar {visibleProjects.length} av {filteredProjects.length} projekt i kategorin "{selectedCategory}"
          </div>
        )}
      </div>

      {/* Project Modal */}
      <ProjectModal
        selectedProject={selectedProject}
        activeIndex={activeIndex}
        projects={filteredProjects}
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
