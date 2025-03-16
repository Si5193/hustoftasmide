
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
    id: 13,
    title: 'Specialanpassad trappa',
    description: 'Unik trappa tillverkad i aluminium och betsad limträ. Skräddarsydd design som kombinerar modern elegans med robust konstruktion, perfekt för både inomhus- och utomhusmiljöer.',
    category: 'Privatperson',
    image: '/images/specialanpassad-trappa.jpg',
  }
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
