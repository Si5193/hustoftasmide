
import { useEffect } from 'react';
import Layout from '../components/Layout';
import ServiceCard from '../components/ServiceCard';
import { Link } from 'react-router-dom';
import { 
  Hammer, 
  Wrench, 
  Cog, 
  Users, 
  Scissors, 
  PenTool, 
  Settings, 
  LayoutGrid,
  ArrowRight
} from 'lucide-react';

const Services = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Service categories
  const categories = [
    {
      id: 'smide',
      title: 'Smide',
      description: 'Traditionellt hantverk för unika lösningar',
      icon: <Hammer size={32} />,
      services: [
        {
          title: 'Konstsmide',
          description: 'Konstnärliga smidesarbeten för hem och trädgård.',
          icon: <PenTool size={24} />
        },
        {
          title: 'Räcken & staket',
          description: 'Skräddarsydda räcken och staket i smide.',
          icon: <LayoutGrid size={24} />
        },
        {
          title: 'Möbler',
          description: 'Smidesmöbler för inom- och utomhusbruk.',
          icon: <Scissors size={24} />
        }
      ]
    },
    {
      id: 'metallbearbetning',
      title: 'Metallbearbetning',
      description: 'Precisionslösningar för industri och produktion',
      icon: <Wrench size={32} />,
      services: [
        {
          title: 'CNC-bearbetning',
          description: 'Precis CNC-bearbetning av metall.',
          icon: <Settings size={24} />
        },
        {
          title: 'Svetsning',
          description: 'Professionell svetsning i olika material.',
          icon: <Cog size={24} />
        },
        {
          title: 'Plåtbearbetning',
          description: 'Kapning, bockning och formning av plåt.',
          icon: <Scissors size={24} />
        }
      ]
    },
    {
      id: 'konstruktion',
      title: 'Konstruktion',
      description: 'Hållbara metallkonstruktioner för alla behov',
      icon: <Cog size={32} />,
      services: [
        {
          title: 'Industriella konstruktioner',
          description: 'Robusta konstruktioner för industriella miljöer.',
          icon: <Settings size={24} />
        },
        {
          title: 'Trappor & räcken',
          description: 'Skräddarsydda trappor och räcken.',
          icon: <LayoutGrid size={24} />
        },
        {
          title: 'Specialkonstruktioner',
          description: 'Unika lösningar för specifika behov.',
          icon: <PenTool size={24} />
        }
      ]
    },
    {
      id: 'konsultation',
      title: 'Konsultation',
      description: 'Expert rådgivning för ditt projekt',
      icon: <Users size={32} />,
      services: [
        {
          title: 'Design & planering',
          description: 'Hjälp med design och planering av ditt projekt.',
          icon: <PenTool size={24} />
        },
        {
          title: 'Materialrådgivning',
          description: 'Expertråd om materialval för ditt projekt.',
          icon: <Wrench size={24} />
        },
        {
          title: 'Tekniska lösningar',
          description: 'Utveckling av tekniska lösningar för dina behov.',
          icon: <Settings size={24} />
        }
      ]
    }
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-metal-800 pt-32 text-white">
        <div className="container px-4 py-16 md:px-6 md:py-24">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl">
              Våra tjänster
            </h1>
            <p className="text-lg text-metal-200">
              Vi erbjuder ett brett utbud av tjänster inom smide och metallbearbetning. Från konstnärliga detaljer till industriella konstruktioner - vi har kunskapen och erfarenheten för att möta dina behov.
            </p>
          </div>
        </div>
        
        {/* Wave divider */}
        <div className="h-16 overflow-hidden">
          <svg
            className="w-full text-background"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path
              d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
              fill="currentColor"
            ></path>
          </svg>
        </div>
      </section>
      
      {/* Service Categories */}
      <section className="py-16 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="grid gap-12 md:gap-16">
            {categories.map((category, index) => (
              <div key={category.id} id={category.id} className="scroll-mt-24">
                <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center">
                    <div className="mr-4 rounded-full bg-metal-100 p-3 text-forge-500">
                      {category.icon}
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-metal-800 md:text-3xl">
                        {category.title}
                      </h2>
                      <p className="text-metal-500">{category.description}</p>
                    </div>
                  </div>
                </div>
                
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {category.services.map((service, i) => (
                    <ServiceCard
                      key={i}
                      title={service.title}
                      description={service.description}
                      icon={service.icon}
                      delay={i * 100}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Process Section */}
      <section className="bg-metal-50 py-16 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-6 text-3xl font-bold tracking-tight text-metal-800 md:text-4xl">
              Vår process
            </h2>
            <p className="mb-12 text-lg text-metal-600">
              Från första kontakt till slutförd leverans - så här arbetar vi för att säkerställa att ditt projekt blir precis som du föreställt dig.
            </p>
          </div>
          
          <div className="relative mx-auto max-w-4xl">
            {/* Process Line */}
            <div className="absolute left-8 top-0 h-full w-px bg-metal-200 md:left-1/2 md:-translate-x-px"></div>
            
            {/* Process Steps */}
            <div className="space-y-12">
              {[
                {
                  number: '01',
                  title: 'Konsultation',
                  description: 'Vi lyssnar på dina idéer och behov, diskuterar möjligheter och ger rådgivning kring material och utförande.',
                },
                {
                  number: '02',
                  title: 'Design & offert',
                  description: 'Vi tar fram en design och en detaljerad offert baserad på dina önskemål och våra rekommendationer.',
                },
                {
                  number: '03',
                  title: 'Produktion',
                  description: 'När offerten är godkänd börjar vi producera. Vi håller dig uppdaterad under hela processen.',
                },
                {
                  number: '04',
                  title: 'Leverans & installation',
                  description: 'Vi levererar och, vid behov, installerar den färdiga produkten med samma omsorg som vi tillverkat den.',
                },
                {
                  number: '05',
                  title: 'Uppföljning',
                  description: 'Vi följer upp efter leverans för att säkerställa att du är nöjd med resultatet och svarar på eventuella frågor.',
                },
              ].map((step, i) => (
                <div key={i} className="relative flex flex-col md:flex-row md:items-center">
                  {/* Step Number */}
                  <div className="absolute left-0 flex h-16 w-16 items-center justify-center rounded-full bg-metal-100 text-xl font-bold text-forge-500 md:left-1/2 md:-translate-x-1/2">
                    {step.number}
                  </div>
                  
                  {/* Step Content */}
                  <div className="ml-24 md:ml-0 md:w-1/2 md:pr-12 md:text-right">
                    {i % 2 === 0 ? (
                      <div className="rounded-lg bg-white p-6 shadow-sm md:ml-auto md:max-w-md">
                        <h3 className="mb-2 text-xl font-semibold text-metal-800">{step.title}</h3>
                        <p className="text-metal-600">{step.description}</p>
                      </div>
                    ) : (
                      <div className="hidden md:block" />
                    )}
                  </div>
                  
                  <div className="hidden md:block md:w-1/2 md:pl-12 md:text-left">
                    {i % 2 === 1 ? (
                      <div className="rounded-lg bg-white p-6 shadow-sm md:max-w-md">
                        <h3 className="mb-2 text-xl font-semibold text-metal-800">{step.title}</h3>
                        <p className="text-metal-600">{step.description}</p>
                      </div>
                    ) : (
                      <div className="hidden md:block" />
                    )}
                  </div>
                  
                  {/* Mobile only - right side */}
                  {i % 2 === 1 && (
                    <div className="ml-24 md:hidden">
                      <div className="rounded-lg bg-white p-6 shadow-sm">
                        <h3 className="mb-2 text-xl font-semibold text-metal-800">{step.title}</h3>
                        <p className="text-metal-600">{step.description}</p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="bg-metal-800 py-16 text-white md:py-20">
        <div className="container px-4 md:px-6">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">
              Redo att förverkliga dina idéer?
            </h2>
            <p className="mb-8 text-lg text-metal-300">
              Kontakta oss idag för en kostnadsfri konsultation om ditt projekt.
            </p>
            <Link 
              to="/contact" 
              className="group btn-primary inline-flex items-center space-x-2 bg-forge-500 hover:bg-forge-600"
            >
              <span>Kontakta oss</span>
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Services;
