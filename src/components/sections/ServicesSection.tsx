
import { Hammer, Wrench, Cog, Users } from 'lucide-react';
import ServiceCard from '../ServiceCard';

const ServicesSection = () => {
  return (
    <section id="services" className="bg-background py-8 md:py-16">
      <div className="container px-4 md:px-6">
        <div className="mx-auto mb-8 md:mb-12 max-w-3xl text-center">
          <h2 className="mb-3 md:mb-4 text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight text-metal-800">
            Våra tjänster
          </h2>
          <p className="text-base md:text-lg text-metal-600">
            Brett utbud inom smide och metallbearbetning för företag och privatpersoner.
          </p>
        </div>
        
        <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
          <ServiceCard
            title="Smide"
            description="Traditionellt smide med modern teknik för unika produkter."
            icon={<Hammer size={20} />}
            fullDescription="Vårt traditionella smide kombinerar gammalt hantverk med modern teknik för att skapa unika metallarbeten. Vi arbetar med allt från dekorativa inredningsdetaljer till funktionella lösningar för hem och trädgård. Varje projekt är skräddarsytt efter kundens önskemål och behov."
            delay={0}
          />
          <ServiceCard
            title="Metallbearbetning"
            description="Professionell metallbearbetning med hög precision."
            icon={<Wrench size={20} />}
            fullDescription="Vi levererar precisionslösningar för industri, verkstad och privatpersoner. Med modern utrustning erbjuder vi skärning, bockning, svetsning och annan bearbetning i olika metaller och dimensioner. Vi står för kvalitet i varje detalj."
            delay={0}
          />
          <ServiceCard
            title="Konstruktion"
            description="Metallkonstruktioner för alla behov och krav."
            icon={<Cog size={20} />}
            fullDescription="Vi designar och tillverkar hållbara metallkonstruktioner för många olika användningsområden. Från trappor och räcken till specialkonstruktioner för specifika behov - vi levererar lösningar som kombinerar funktion, säkerhet och estetik. Våra konstruktioner följer gällande standarder och regelverk."
            delay={0}
          />
          <ServiceCard
            title="Konsultation"
            description="Expert rådgivning inom material och design."
            icon={<Users size={20} />}
            fullDescription="Vår konsultationstjänst ger dig tillgång till vår expertis inom metallbearbetning och smide. Vi erbjuder professionell rådgivning gällande materialval, design och praktiska lösningar. Genom att involvera oss tidigt i ditt projekt kan vi hjälpa dig optimera både funktion och kostnader."
            delay={0}
          />
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
