
import { useEffect } from 'react';
import Layout from '../components/Layout';
import Hero from '../components/Hero';
import ServicesSection from '../components/sections/ServicesSection';
import AboutSection from '../components/sections/AboutSection';
import ProjectsSection from '../components/sections/ProjectsSection';
import CTASection from '../components/sections/CTASection';
import { Project } from '../components/sections/ProjectsSection';

// Project data with properly formatted image paths
const projects: Project[] = [
  {
    id: 1,
    title: 'Smidesgrind',
    description: 'Handtillverkad smidesgrind med detaljerade utsmyckningar. Designad för att passa elegant vid ingången till en villa.',
    category: 'Privatperson',
    image: '/lovable-uploads/61a3c4a2-0e66-4a4c-8bc4-0ad835631e29.png',
  },
  {
    id: 2,
    title: 'Trädgårdsgrind',
    description: 'Vacker grind i smide med dekorativa detaljer, tillverkad för en trädgårdsingång. Kombinerar säkerhet med en attraktiv design.',
    category: 'Privatperson',
    image: '/lovable-uploads/5c075a49-f2b7-4b13-bb2a-52804d5c57d0.png',
  },
  {
    id: 3,
    title: 'Räcke till trappa',
    description: 'Elegant trappräcke i svart smide, skräddarsytt för hemmet. Kombinerar estetik med funktionalitet och säkerhet.',
    category: 'Privatperson',
    image: '/lovable-uploads/d38a65da-17b3-4052-bbd8-54d0c3ad6dd3.png',
  },
  {
    id: 4,
    title: 'Balkongräcke',
    description: 'Stilrent balkongräcke i smide med vertikal design, anpassat för en modern villa. Ger säkerhet utan att blockera utsikten.',
    category: 'Privatperson',
    image: '/lovable-uploads/8212dcf4-1cd6-4aff-a6a9-43182aab5614.png',
  },
  {
    id: 5,
    title: 'Industrikomponent',
    description: 'Precisionsbearbetad rördel i metall för industriellt bruk. Skräddarsydd efter kundens specifika tekniska krav.',
    category: 'Företag',
    image: '/lovable-uploads/44df79a5-2144-4153-85fd-13ae7eff5467.png',
  },
  {
    id: 6,
    title: 'Industriella behållare',
    description: 'Specialtillverkade metallbehållare för industriell användning. Robusta och funktionella för att möta specifika produktionskrav.',
    category: 'Företag',
    image: '/lovable-uploads/df7c8186-d1ac-4c6f-8cc7-5e17bc8bedc9.png',
  },
];

const Index = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Layout>
      <Hero />
      <ServicesSection />
      <AboutSection />
      <ProjectsSection projects={projects} />
      <CTASection />
    </Layout>
  );
};

export default Index;
