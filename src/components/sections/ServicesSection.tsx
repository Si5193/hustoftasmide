
import { Hammer, Wrench, Cog, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import ServiceCard from '../ServiceCard';

const ServicesSection = () => {
  return (
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
  );
};

export default ServicesSection;
