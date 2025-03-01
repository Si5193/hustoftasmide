import { Check, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const AboutSection = () => {
  return (
    <section id="about" className="bg-metal-50 py-16 md:py-24">
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
  );
};

export default AboutSection;
