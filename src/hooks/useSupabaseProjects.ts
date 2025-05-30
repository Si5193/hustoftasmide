import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface Project {
  id: number;
  title: string;
  description: string;
  category: string;
  image: string;
  storage_path?: string;
}

// Map Supabase data to our Project interface (without image for listing)
const mapSupabaseProjectList = (dbProject: any): Omit<Project, 'image'> => ({
  id: dbProject.id,
  title: dbProject.title,
  description: dbProject.description,
  category: dbProject.category,
  storage_path: dbProject.storage_path,
});

// Map Supabase data to our Project interface (with image for single project)
const mapSupabaseProject = (dbProject: any): Project => ({
  id: dbProject.id,
  title: dbProject.title,
  description: dbProject.description,
  category: dbProject.category,
  image: dbProject.image_url,
  storage_path: dbProject.storage_path,
});

// Map our Project interface to Supabase data
const mapToSupabaseProject = (project: Omit<Project, 'id'>) => {
  const supabaseProject: any = {
    title: project.title,
    description: project.description,
    category: project.category,
    image_url: project.image,
  };
  
  // Endast inkludera storage_path om den finns
  if (project.storage_path) {
    supabaseProject.storage_path = project.storage_path;
  }
  
  return supabaseProject;
};

export const useSupabaseProjects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  // Load projects from Supabase on mount
  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      
      // Fetch projects with only essential data for listing - no image URLs
      const { data, error } = await supabase
        .from('projects')
        .select('id, title, description, category, storage_path, created_at')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching projects:', error);
        toast({
          title: "Fel",
          description: "Kunde inte ladda projekt från databasen.",
          variant: "destructive",
        });
        return;
      }

      if (!data) {
        console.error('No data returned from projects query');
        return;
      }

      // Map projects without loading images here - let individual components handle image loading
      const mappedProjects = data.map(dbProject => ({
        ...mapSupabaseProjectList(dbProject),
        image: '' // Will be loaded by useProjectImage hook when needed
      }));
      
      setProjects(mappedProjects);
    } catch (error) {
      console.error('Error fetching projects:', error);
      toast({
        title: "Fel",
        description: "Något gick fel när projekten skulle laddas.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const addProject = async (project: Omit<Project, 'id'>) => {
    try {
      const { data, error } = await supabase
        .from('projects')
        .insert(mapToSupabaseProject(project))
        .select()
        .single();

      if (error) {
        console.error('Error adding project:', error);
        toast({
          title: "Fel",
          description: "Kunde inte lägga till projektet.",
          variant: "destructive",
        });
        return null;
      }

      const newProject = mapSupabaseProject(data);
      setProjects(prev => [newProject, ...prev]);
      
      toast({
        title: "Projekt tillagt",
        description: `"${project.title}" har lagts till framgångsrikt.`,
      });
      
      return newProject;
    } catch (error) {
      console.error('Error adding project:', error);
      toast({
        title: "Fel",
        description: "Något gick fel när projektet skulle läggas till.",
        variant: "destructive",
      });
      return null;
    }
  };

  const updateProject = async (id: number, updates: Partial<Project>) => {
    try {
      const updateData: any = {};
      if (updates.title) updateData.title = updates.title;
      if (updates.description) updateData.description = updates.description;
      if (updates.category) updateData.category = updates.category;
      if (updates.image) updateData.image_url = updates.image;
      if (updates.storage_path) updateData.storage_path = updates.storage_path;

      const { error } = await supabase
        .from('projects')
        .update(updateData)
        .eq('id', id);

      if (error) {
        console.error('Error updating project:', error);
        toast({
          title: "Fel",
          description: "Kunde inte uppdatera projektet.",
          variant: "destructive",
        });
        return false;
      }

      setProjects(prev => 
        prev.map(p => p.id === id ? { ...p, ...updates } : p)
      );
      
      toast({
        title: "Projekt uppdaterat",
        description: "Projektet har uppdaterats framgångsrikt.",
      });
      
      return true;
    } catch (error) {
      console.error('Error updating project:', error);
      toast({
        title: "Fel",
        description: "Något gick fel när projektet skulle uppdateras.",
        variant: "destructive",
      });
      return false;
    }
  };

  const deleteProject = async (id: number) => {
    try {
      const project = projects.find(p => p.id === id);
      
      const { error } = await supabase
        .from('projects')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Error deleting project:', error);
        toast({
          title: "Fel",
          description: "Kunde inte ta bort projektet.",
          variant: "destructive",
        });
        return false;
      }

      setProjects(prev => prev.filter(p => p.id !== id));
      
      toast({
        title: "Projekt borttaget",
        description: `"${project?.title}" har tagits bort.`,
      });
      
      return true;
    } catch (error) {
      console.error('Error deleting project:', error);
      toast({
        title: "Fel",
        description: "Något gick fel när projektet skulle tas bort.",
        variant: "destructive",
      });
      return false;
    }
  };

  const getProjects = () => {
    return projects;
  };

  return {
    projects,
    loading,
    addProject,
    updateProject,
    deleteProject,
    getProjects,
  };
};
