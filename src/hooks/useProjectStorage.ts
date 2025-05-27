
import { useState, useEffect } from 'react';
import { Project } from './useSupabaseProjects';
import { useToast } from '@/hooks/use-toast';

const STORAGE_KEY = 'hustofta_projects';

// Default projects from Index.tsx as fallback
const defaultProjects: Project[] = [
  {
    id: 1,
    title: 'Smidesgrind',
    description: 'Handtillverkad smidesgrind med detaljerade utsmyckningar. Designad för att passa elegant vid ingången till en villa.',
    category: 'Privatperson',
    image: '/images/smidesgrind.jpg',
  },
  {
    id: 2,
    title: 'Trädgårdsgrind',
    description: 'Vacker grind i smide med dekorativa detaljer, tillverkad för en trädgårdsingång. Kombinerar säkerhet med en attraktiv design.',
    category: 'Privatperson',
    image: '/images/tragardsgrind.jpg',
  },
  {
    id: 3,
    title: 'Dekorativ metallgrind',
    description: 'Konstnärligt utformad grind i smide med stilfulla detaljer och mönster, skräddarsydd för att skapa en inbjudande entré till trädgården.',
    category: 'Privatperson',
    image: '/images/dekorativ-metallgrind.jpg',
  },
  {
    id: 4,
    title: 'Handräcke till trappa',
    description: 'Elegant handräcke i svart smide, specialdesignat för en utomhustrappa. Kombinerar funktionalitet med estetik för att skapa både säkerhet och stil.',
    category: 'Privatperson',
    image: '/images/handracke-trappa.jpg',
  },
  {
    id: 5,
    title: 'Balkongräcke',
    description: 'Stilrent balkongräcke i smide med vertikal design, anpassat för en modern villa. Ger säkerhet utan att blockera utsikten.',
    category: 'Privatperson',
    image: '/images/balkongracke.jpg',
  },
  {
    id: 6,
    title: 'Trappräcke i svart smide',
    description: 'Modernt trappräcke med glaspartier, specialtillverkat för en luftig och elegant inomhusmiljö. Kombinerar säkerhet med en minimalistisk design.',
    category: 'Privatperson',
    image: '/images/trappracke-svart.jpg',
  },
  {
    id: 7,
    title: 'Stålkonsol',
    description: 'Specialtillverkad stålkonsol för väggmontage, designad med både funktionalitet och elegans i åtanke. Stark och stilfull lösning för inredningsdetaljer.',
    category: 'Företag',
    image: '/images/stalkonsol.jpg',
  },
  {
    id: 10,
    title: 'Industriella behållare',
    description: 'Specialtillverkade metallbehållare för industriell användning. Robusta och funktionella för att möta specifika produktionskrav.',
    category: 'Företag',
    image: '/images/industriella-behallare.jpg',
  },
  {
    id: 13,
    title: 'Specialanpassad trappa',
    description: 'Unik trappa tillverkad i aluminium och betsad limträ. Skräddarsydd design som kombinerar modern elegans med robust konstruktion, perfekt för både inomhus- och utomhusmiljöer.',
    category: 'Privatperson',
    image: '/images/specialanpassad-trappa.jpg',
  },
  {
    id: 14,
    title: 'Metallbearbetning',
    description: 'Precision i metallbearbetning med hög detaljnivå. Visar vår tekniska kompetens och möjlighet att skapa specialanpassade metallkomponenter.',
    category: 'Företag',
    image: '/images/metallbearbetning.jpg',
  }
];

export const useProjectStorage = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  // Load projects from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsedProjects = JSON.parse(stored);
        setProjects(parsedProjects);
      } else {
        // Initialize with default projects
        setProjects(defaultProjects);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultProjects));
      }
    } catch (error) {
      console.error('Error loading projects:', error);
      setProjects(defaultProjects);
    } finally {
      setLoading(false);
    }
  }, []);

  const saveProjects = (newProjects: Project[]) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newProjects));
      setProjects(newProjects);
      return true;
    } catch (error) {
      console.error('Error saving projects:', error);
      toast({
        title: "Fel",
        description: "Kunde inte spara projekt. Försök igen.",
        variant: "destructive",
      });
      return false;
    }
  };

  const addProject = (project: Omit<Project, 'id'>) => {
    const newId = Math.max(...projects.map(p => p.id), 0) + 1;
    const newProject = { ...project, id: newId };
    const updatedProjects = [...projects, newProject];
    
    if (saveProjects(updatedProjects)) {
      toast({
        title: "Projekt tillagt",
        description: `"${project.title}" har lagts till framgångsrikt.`,
      });
      return newProject;
    }
    return null;
  };

  const updateProject = (id: number, updates: Partial<Project>) => {
    const updatedProjects = projects.map(p => 
      p.id === id ? { ...p, ...updates } : p
    );
    
    if (saveProjects(updatedProjects)) {
      toast({
        title: "Projekt uppdaterat",
        description: "Projektet har uppdaterats framgångsrikt.",
      });
      return true;
    }
    return false;
  };

  const deleteProject = (id: number) => {
    const project = projects.find(p => p.id === id);
    const updatedProjects = projects.filter(p => p.id !== id);
    
    if (saveProjects(updatedProjects)) {
      toast({
        title: "Projekt borttaget",
        description: `"${project?.title}" har tagits bort.`,
      });
      return true;
    }
    return false;
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
