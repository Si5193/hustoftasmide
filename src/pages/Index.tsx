
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
    image: '/lovable-uploads/251de2d1-47da-45d6-a492-6589cde8d0dd.png',
  },
  {
    id: 2,
    title: 'Trädgårdsgrind',
    description: 'Vacker grind i smide med dekorativa detaljer, tillverkad för en trädgårdsingång. Kombinerar säkerhet med en attraktiv design.',
    category: 'Privatperson',
    image: '/lovable-uploads/9d38ecb0-e4ae-446e-8fc5-0aed050854a3.png',
  },
  {
    id: 3,
    title: 'Dekorativ metallgrind',
    description: 'Konstnärligt utformad grind i smide med stilfulla detaljer och mönster, skräddarsydd för att skapa en inbjudande entré till trädgården.',
    category: 'Privatperson',
    image: '/lovable-uploads/3bc8a0d2-7d3d-4a9f-8a29-a79fd9d4e72f.png',
  },
  {
    id: 4,
    title: 'Handräcke till trappa',
    description: 'Elegant handräcke i svart smide, specialdesignat för en utomhustrappa. Kombinerar funktionalitet med estetik för att skapa både säkerhet och stil.',
    category: 'Privatperson',
    image: '/lovable-uploads/81485e48-2e54-444d-8b99-747d180e7fd5.png',
  },
  {
    id: 5,
    title: 'Balkongräcke',
    description: 'Stilrent balkongräcke i smide med vertikal design, anpassat för en modern villa. Ger säkerhet utan att blockera utsikten.',
    category: 'Privatperson',
    image: '/lovable-uploads/ac608f13-7ac5-4f2a-9006-f6c272b43a85.png',
  },
  {
    id: 6,
    title: 'Trappräcke i svart smide',
    description: 'Modernt trappräcke med glaspartier, specialtillverkat för en luftig och elegant inomhusmiljö. Kombinerar säkerhet med en minimalistisk design.',
    category: 'Privatperson',
    image: '/lovable-uploads/8bce9860-d62f-42d6-ac9d-38ccc1924b2f.png',
  },
  {
    id: 7,
    title: 'Stålkonsol',
    description: 'Specialtillverkad stålkonsol för väggmontage, designad med både funktionalitet och elegans i åtanke. Stark och stilfull lösning för inredningsdetaljer.',
    category: 'Företag',
    image: '/lovable-uploads/4b42a99c-9a04-43af-90d9-4fd7d86a29f5.png',
  },
  {
    id: 8,
    title: 'Räcke till entré',
    description: 'Enkelt men elegant entréräcke i svart metall, designat för att ge stöd och säkerhet vid yttertrappor. Praktisk och stilren design.',
    category: 'Privatperson',
    image: '/lovable-uploads/e00dfe10-00ce-4d17-b863-472ff804f0d5.png',
  },
  {
    id: 9,
    title: 'Industriell rördel',
    description: 'Precisionssvetsad industriell rördel i stål, anpassad för specifika tekniska krav. Tillverkad för att klara krävande industriella miljöer.',
    category: 'Företag',
    image: '/lovable-uploads/33f891e5-aff5-468a-8742-ac0b0fdb4dbd.png',
  },
  {
    id: 10,
    title: 'Industriella behållare',
    description: 'Specialtillverkade metallbehållare för industriell användning. Robusta och funktionella för att möta specifika produktionskrav.',
    category: 'Företag',
    image: '/lovable-uploads/23289630-0385-46e2-ad23-a59b56849c4b.png',
  },
  {
    id: 11,
    title: 'Precisionskomponent',
    description: 'Bearbetad metallkomponent med hög precision för industriellt bruk. Tillverkad enligt exakta specifikationer för optimal funktionalitet.',
    category: 'Företag',
    image: '/lovable-uploads/429e8fe7-36f0-438f-977c-a64482cd0255.png',
  },
  {
    id: 12,
    title: 'Industriell rörkonstruktion',
    description: 'Robust rörkonstruktion i stål för industriella applikationer. Designad och tillverkad för att möta höga krav på hållbarhet och prestanda.',
    category: 'Företag',
    image: '/lovable-uploads/d8900721-09d9-4591-b943-dec572ec7878.png',
  },
  {
    id: 13,
    title: 'Specialanpassat trappräcke',
    description: 'Elegant svart trappräcke med dekorativa stolpar, skräddarsytt för att passa en klassisk interiör. Förenar hantverksskicklighet med praktisk funktion.',
    category: 'Privatperson',
    image: '/lovable-uploads/d4c9ea09-97dc-4935-afed-55c2492419f1.png',
  },
  {
    id: 14,
    title: 'Metallbearbetning',
    description: 'Precision i metallbearbetning med hög detaljnivå. Visar vår tekniska kompetens och möjlighet att skapa specialanpassade metallkomponenter.',
    category: 'Företag',
    image: '/lovable-uploads/f53f1c86-f436-4e6d-86b3-3cc0cb2e6e28.png',
  },
  {
    id: 15,
    title: 'Svetsad stålkomponent',
    description: 'Avancerad svetsad stålkomponent för industriella applikationer. Tillverkad med fokus på precision och hållbarhet för krävande användningsområden.',
    category: 'Företag',
    image: '/lovable-uploads/3d59c5c9-7092-4fb9-92dd-97e08a166e24.png',
  },
  {
    id: 16,
    title: 'Svart smidesräcke',
    description: 'Klassiskt svart smidesräcke för inomhusbruk. Handtillverkat med traditionella metoder och ett öga för detaljer som ger karaktär till hemmet.',
    category: 'Privatperson',
    image: '/lovable-uploads/4e35ac42-db46-4cbb-ac33-506a93140c93.png',
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
