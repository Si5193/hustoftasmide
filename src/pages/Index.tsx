
import { useEffect } from 'react';
import Layout from '../components/Layout';
import Hero from '../components/Hero';
import ServicesSection from '../components/sections/ServicesSection';
import AboutSection from '../components/sections/AboutSection';
import ProjectsSection from '../components/sections/ProjectsSection';
import CTASection from '../components/sections/CTASection';
import { Project } from '../components/sections/ProjectsSection';

// Project data with properly formatted image paths for the newly uploaded images
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
    image: '/images/tradgardsgrind.jpg',
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
    id: 8,
    title: 'Räcke till entré',
    description: 'Enkelt men elegant entréräcke i svart metall, designat för att ge stöd och säkerhet vid yttertrappor. Praktisk och stilren design.',
    category: 'Privatperson',
    image: '/images/racke-entre.jpg',
  },
  {
    id: 9,
    title: 'Industriell rördel',
    description: 'Precisionssvetsad industriell rördel i stål, anpassad för specifika tekniska krav. Tillverkad för att klara krävande industriella miljöer.',
    category: 'Företag',
    image: '/images/industriell-rordel.jpg',
  },
  {
    id: 10,
    title: 'Industriella behållare',
    description: 'Specialtillverkade metallbehållare för industriell användning. Robusta och funktionella för att möta specifika produktionskrav.',
    category: 'Företag',
    image: '/images/industriella-behallare.jpg',
  },
  {
    id: 11,
    title: 'Precisionskomponent',
    description: 'Bearbetad metallkomponent med hög precision för industriellt bruk. Tillverkad enligt exakta specifikationer för optimal funktionalitet.',
    category: 'Företag',
    image: '/images/precisionskomponent.jpg',
  },
  {
    id: 12,
    title: 'Industriell rörkonstruktion',
    description: 'Robust rörkonstruktion i stål för industriella applikationer. Designad och tillverkad för att möta höga krav på hållbarhet och prestanda.',
    category: 'Företag',
    image: '/images/industriell-rorkonstruktion.jpg',
  },
  {
    id: 13,
    title: 'Specialanpassat trappräcke',
    description: 'Elegant svart trappräcke med dekorativa stolpar, skräddarsytt för att passa en klassisk interiör. Förenar hantverksskicklighet med praktisk funktion.',
    category: 'Privatperson',
    image: '/images/specialanpassat-trappracke.jpg',
  },
  {
    id: 14,
    title: 'Metallbearbetning',
    description: 'Precision i metallbearbetning med hög detaljnivå. Visar vår tekniska kompetens och möjlighet att skapa specialanpassade metallkomponenter.',
    category: 'Företag',
    image: '/images/metallbearbetning.jpg',
  },
  {
    id: 15,
    title: 'Svetsad stålkomponent',
    description: 'Avancerad svetsad stålkomponent för industriella applikationer. Tillverkad med fokus på precision och hållbarhet för krävande användningsområden.',
    category: 'Företag',
    image: '/images/svetsad-stalkomponent.jpg',
  },
  {
    id: 16,
    title: 'Svart smidesräcke',
    description: 'Klassiskt svart smidesräcke för inomhusbruk. Handtillverkat med traditionella metoder och ett öga för detaljer som ger karaktär till hemmet.',
    category: 'Privatperson',
    image: '/images/svart-smidesracke.jpg',
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
