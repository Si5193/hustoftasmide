
import { Check } from 'lucide-react';

const AboutSection = () => {
  return (
    <section id="about" className="bg-metal-50 py-8 md:py-16">
      <div className="container px-4 md:px-6">
        <div className="grid items-center gap-8 md:gap-12 md:grid-cols-2">
          <div className="relative order-2 md:order-1">
            <div className="relative aspect-[4/3] overflow-hidden rounded-lg shadow-xl">
              <video 
                src="https://i.imgur.com/Ftj6aDe.mp4" 
                alt="Hustofta Smide video" 
                className="h-full w-full object-cover"
                autoPlay
                loop
                muted
                playsInline
              />
            </div>
            
            <div className="absolute -left-2 -top-2 md:-left-4 md:-top-4 h-16 w-16 md:h-24 md:w-24 rounded-full bg-forge-500/20"></div>
          </div>
          
          <div className="order-1 md:order-2">
            <div className="inline-block rounded-full bg-forge-500/10 px-3 py-1 md:px-4 md:py-1.5 text-xs md:text-sm font-medium text-forge-600">
              Om oss
            </div>
            <h2 className="mt-3 md:mt-4 text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight text-metal-800">Kvalitet och passion</h2>
            <p className="mt-3 md:mt-4 text-sm md:text-lg text-metal-600">Vi driver Hustofta Smide & Mekaniska med passion för metallarbete och fokus på lösningar som fungerar.</p>
            
            <ul className="mt-4 md:mt-6 space-y-2 md:space-y-3">
              {[
                'Gedigen erfarenhet av metallbearbetning', 
                'Modern utrustning för professionella resultat', 
                'Personlig service och flexibla lösningar', 
                'Fokus på kvalitet som håller över tid'
              ].map((item, i) => (
                <li key={i} className="flex items-start">
                  <div className="mr-2 md:mr-3 mt-1 flex h-4 w-4 md:h-5 md:w-5 items-center justify-center rounded-full bg-forge-500/10 text-forge-500">
                    <Check size={12} className="md:w-3.5 md:h-3.5" />
                  </div>
                  <span className="text-xs md:text-base text-metal-700">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
