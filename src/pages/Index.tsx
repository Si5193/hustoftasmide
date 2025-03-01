
import { useEffect } from 'react';
import Layout from '../components/Layout';
import Hero from '../components/Hero';
import ServiceCard from '../components/ServiceCard';
import ProjectGallery from '../components/ProjectGallery';
import { Link } from 'react-router-dom';
import { Hammer, Wrench, Cog, Users, ArrowRight, Check } from 'lucide-react';

// Sample project data
const projects = [
  {
    id: 1,
    title: 'Ståltrappa',
    description: 'En skräddarsydd ståltrappa med glasräcke för ett modernt kontor. Designad för att maximera ljusinsläpp och skapa en luftig känsla i lokalen.',
    category: 'Företag',
    image: 'https://images.unsplash.com/photo-1517420879524-86d64ac2f339?q=80&w=1026&auto=format&fit=crop',
  },
  {
    id: 2,
    title: 'Smidesgrind',
    description: 'Handtillverkad smidesgrind med detaljerade utsmyckningar. Designad och skapad efter kundens önskemål för att passa en exklusiv villa.',
    category: 'Privatperson',
    image: 'https://images.unsplash.com/photo-1519690889869-e705e59f72e1?q=80&w=1170&auto=format&fit=crop',
  },
  {
    id: 3,
    title: 'Industriell inredning',
    description: 'Serie av hyllor och bord i råstål och massivt trä för en restaurang med industriell profil. Möblerna är både funktionella och estetiskt tilltalande.',
    category: 'Företag',
    image: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?q=80&w=1120&auto=format&fit=crop',
  },
];

const Index = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Layout>
      <Hero />
      
      {/* Services Section */}
      <section className="bg-background py-16 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <h2 className="mb-4 text-3xl font-bold tracking-tight text-metal-800 md:text-4xl">
              Våra tjänster
            </h2>
            <p className="text-lg text-metal-600">
              Vi erbjuder ett brett utbud av tjänster inom smide och metallbearbetning för både företag och privatpersoner.
            </p>
          </div>
          
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <ServiceCard
              title="Smide"
              description="Traditionellt smide med modern teknik. Vi skapar unika produkter efter dina önskemål."
              icon={<Hammer size={24} />}
              link="/services"
              delay={100}
            />
            <ServiceCard
              title="Metallbearbetning"
              description="Professionell metallbearbetning med hög precision för industri och verkstad."
              icon={<Wrench size={24} />}
              link="/services"
              delay={200}
            />
            <ServiceCard
              title="Konstruktion"
              description="Konstruktion och tillverkning av metallkonstruktioner för alla behov."
              icon={<Cog size={24} />}
              link="/services"
              delay={300}
            />
            <ServiceCard
              title="Konsultation"
              description="Expert rådgivning inom material, design och tekniska lösningar."
              icon={<Users size={24} />}
              link="/services"
              delay={400}
            />
          </div>
          
          <div className="mt-12 text-center">
            <Link 
              to="/services" 
              className="btn-primary bg-metal-800 hover:bg-metal-700"
            >
              Se alla tjänster
            </Link>
          </div>
        </div>
      </section>
      
      {/* About Section */}
      <section className="bg-metal-50 py-16 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="grid items-center gap-12 md:grid-cols-2">
            <div className="relative">
              <div className="relative aspect-[4/3] overflow-hidden rounded-lg shadow-xl">
                <img 
                  src="https://images.unsplash.com/photo-1564540574859-0dfb63985953?q=80&w=1170&auto=format&fit=crop" 
                  alt="Svetsning" 
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 z-10 hidden h-60 w-60 rounded-lg border-8 border-white shadow-lg md:block">
                <img 
                  src="https://images.unsplash.com/photo-1547623542-de3ff5e71629?q=80&w=987&auto=format&fit=crop" 
                  alt="Smidesdetalj" 
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="absolute -left-4 -top-4 h-24 w-24 rounded-full bg-forge-500/20"></div>
            </div>
            
            <div>
              <div className="inline-block rounded-full bg-forge-500/10 px-4 py-1.5 text-sm font-medium text-forge-600">
                Om oss
              </div>
              <h2 className="mt-4 text-3xl font-bold tracking-tight text-metal-800 md:text-4xl">
                Tradition och kvalitet sedan 1985
              </h2>
              <p className="mt-4 text-lg text-metal-600">
                Hustofta Smide & Mekaniska grundades med en passion för hantverk och ett engagemang för kvalitet. Med över 35 års erfarenhet i branschen har vi utvecklat en djup förståelse för metallbearbetning och kundernas behov.
              </p>
              
              <ul className="mt-6 space-y-3">
                {[
                  'Erfarna hantverkare med gedigen utbildning',
                  'Modern utrustning för högsta precision',
                  'Flexibla lösningar anpassade efter dina behov',
                  'Hållbart hantverk som håller över tid',
                ].map((item, i) => (
                  <li key={i} className="flex items-start">
                    <div className="mr-3 mt-1 flex h-5 w-5 items-center justify-center rounded-full bg-forge-500/10 text-forge-500">
                      <Check size={14} />
                    </div>
                    <span className="text-metal-700">{item}</span>
                  </li>
                ))}
              </ul>
              
              <div className="mt-8">
                <Link 
                  to="/about" 
                  className="group inline-flex items-center font-medium text-forge-500 hover:text-forge-600"
                >
                  <span>Läs mer om oss</span>
                  <ArrowRight size={16} className="ml-2 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Projects Section */}
      <ProjectGallery 
        projects={projects} 
        title="Våra senaste projekt"
        subtitle="Upptäck exempel på vårt hantverk och se vad vi kan göra för dig."
      />
      
      {/* CTA Section */}
      <section className="bg-metal-800 py-16 text-white md:py-20">
        <div className="container px-4 md:px-6">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">
              Redo att starta ditt projekt?
            </h2>
            <p className="mb-8 text-lg text-metal-300">
              Kontakta oss idag för en kostnadsfri konsultation. Vi hjälper dig att förverkliga dina idéer.
            </p>
            <Link 
              to="/contact" 
              className="btn-primary bg-forge-500 hover:bg-forge-600"
            >
              Kontakta oss
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
