
import { useEffect } from 'react';
import Layout from '../components/Layout';
import { Clock, Tool, Hammer, Users, Award, ThumbsUp } from 'lucide-react';

const About = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const stats = [
    { label: 'År i branschen', value: '35+' },
    { label: 'Genomförda projekt', value: '1000+' },
    { label: 'Nöjda kunder', value: '800+' },
    { label: 'Skickliga hantverkare', value: '12' },
  ];

  const values = [
    {
      icon: <Tool className="text-forge-500" size={32} />,
      title: 'Kvalitet',
      description: 'Vi kompromissar aldrig med kvaliteten. Varje detalj är viktig för att slutresultatet ska bli perfekt.'
    },
    {
      icon: <Hammer className="text-forge-500" size={32} />,
      title: 'Hantverk',
      description: 'Vi värnar om traditionellt hantverk och kombinerar det med modern teknik för bästa resultat.'
    },
    {
      icon: <Users className="text-forge-500" size={32} />,
      title: 'Kundservice',
      description: 'Vi sätter alltid kunden i centrum och arbetar för att överträffa förväntningarna.'
    },
    {
      icon: <Award className="text-forge-500" size={32} />,
      title: 'Innovation',
      description: 'Vi söker ständigt nya lösningar och metoder för att ligga i framkant av branschen.'
    },
    {
      icon: <Clock className="text-forge-500" size={32} />,
      title: 'Punktlighet',
      description: 'Vi respekterar deadlines och levererar alltid enligt överenskommelse.'
    },
    {
      icon: <ThumbsUp className="text-forge-500" size={32} />,
      title: 'Hållbarhet',
      description: 'Vi arbetar miljömedvetet och strävar efter hållbara lösningar i alla led.'
    },
  ];

  const team = [
    {
      name: 'Anders Svensson',
      role: 'Grundare & VD',
      image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=687&auto=format&fit=crop',
      description: 'Med över 35 års erfarenhet i branschen grundade Anders företaget med visionen att leverera högkvalitativt smide och metallarbete.',
    },
    {
      name: 'Lisa Lindgren',
      role: 'Projektledare',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=687&auto=format&fit=crop',
      description: 'Lisa har en bakgrund inom industridesign och ansvarar för att koordinera våra projekt från idé till färdigt resultat.',
    },
    {
      name: 'Mikael Öberg',
      role: 'Chefssmed',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=687&auto=format&fit=crop',
      description: 'Mikael har varit smed i över 20 år och leder vårt team av hantverkare med sin djupa kunskap och passion för smide.',
    },
    {
      name: 'Emma Björklund',
      role: 'Konstruktör',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=688&auto=format&fit=crop',
      description: 'Med sin tekniska expertis tar Emma fram ritningar och lösningar som kombinerar estetik och funktionalitet.',
    },
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative bg-metal-800 pt-32 text-white">
        <div className="container px-4 py-16 md:px-6 md:py-24">
          <div className="grid gap-12 md:grid-cols-2 md:items-center">
            <div className="animate-slide-up">
              <div className="mb-4 inline-block rounded-full bg-forge-500/20 px-4 py-1.5 text-sm font-medium text-forge-500">
                Om oss
              </div>
              <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl">
                Tradition möter innovation
              </h1>
              <p className="text-lg text-metal-200">
                Hustofta Smide & Mekaniska har levererat kvalitetshantverk sedan 1985. Med passion för smide och metallbearbetning kombinerar vi traditionella metoder med modern teknik för att skapa unika lösningar för våra kunder.
              </p>
            </div>
            
            <div className="relative animate-slide-up" style={{ animationDelay: '200ms' }}>
              <div className="aspect-video overflow-hidden rounded-lg shadow-xl">
                <img 
                  src="https://images.unsplash.com/photo-1518621736915-f3b1c41bfd00?q=80&w=1169&auto=format&fit=crop" 
                  alt="Smed arbetar" 
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="absolute -bottom-3 -left-3 h-24 w-24 rounded-full bg-forge-500/30"></div>
              <div className="absolute -right-4 -top-4 h-16 w-16 rounded-full bg-metal-500/20"></div>
            </div>
          </div>
        </div>
        
        {/* Wave divider */}
        <div className="absolute bottom-0 left-0 h-16 w-full overflow-hidden">
          <svg
            className="absolute bottom-0 w-full text-background"
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
      
      {/* Stats Section */}
      <section className="py-12 md:py-16">
        <div className="container px-4 md:px-6">
          <div className="mx-auto grid max-w-4xl grid-cols-2 gap-8 md:grid-cols-4">
            {stats.map((stat, i) => (
              <div 
                key={i} 
                className="flex flex-col items-center text-center"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <div className="text-3xl font-bold text-forge-500 md:text-4xl">{stat.value}</div>
                <div className="mt-2 text-sm text-metal-500 md:text-base">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* History Section */}
      <section className="bg-metal-50 py-16 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-6 text-3xl font-bold tracking-tight text-metal-800 md:text-4xl">
              Vår historia
            </h2>
            <p className="mb-8 text-lg text-metal-600">
              Hustofta Smide & Mekaniska har en rik historia som går tillbaka till 1985 när Anders Svensson startade sitt lilla smidesföretag i en lada på familjegården i Hustofta.
            </p>
          </div>
          
          <div className="relative mx-auto mt-16 max-w-4xl">
            {/* Timeline */}
            <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 transform bg-metal-200"></div>
            
            {/* Timeline Events */}
            <div className="space-y-16">
              {[
                {
                  year: '1985',
                  title: 'Företaget grundas',
                  description: 'Anders Svensson startar Hustofta Smide i en lada på familjegården.',
                  align: 'right',
                },
                {
                  year: '1992',
                  title: 'Expansion',
                  description: 'Företaget växer och flyttar till nya lokaler. Första CNC-maskinen köps in.',
                  align: 'left',
                },
                {
                  year: '2005',
                  title: 'Ny generation',
                  description: 'Anders son Erik börjar i företaget och tar med sig ny kunskap inom digital design.',
                  align: 'right',
                },
                {
                  year: '2015',
                  title: 'Hustofta Smide & Mekaniska',
                  description: 'Företaget byter namn för att bättre spegla det breddade tjänsteutbudet.',
                  align: 'left',
                },
                {
                  year: 'Idag',
                  title: 'Fortsatt utveckling',
                  description: 'Idag är vi 12 anställda och fortsätter att utveckla vår verksamhet med fokus på kvalitet och kundnöjdhet.',
                  align: 'right',
                },
              ].map((event, i) => (
                <div key={i} className="relative">
                  <div 
                    className={`flex items-center ${
                      event.align === 'left' ? 'justify-end md:justify-start' : 'justify-start md:justify-end'
                    } md:w-1/2 ${event.align === 'left' ? 'md:pr-12' : 'md:pl-12'}`}
                  >
                    <div className="w-full rounded-lg border border-metal-200 bg-white p-6 shadow-sm md:max-w-md">
                      <div className="mb-2 font-heading text-xl font-semibold text-forge-500">
                        {event.year}
                      </div>
                      <h3 className="mb-2 text-lg font-semibold text-metal-800">
                        {event.title}
                      </h3>
                      <p className="text-metal-600">
                        {event.description}
                      </p>
                    </div>
                  </div>
                  
                  {/* Timeline Dot */}
                  <div className="absolute left-1/2 top-6 flex h-5 w-5 -translate-x-1/2 transform items-center justify-center rounded-full border-2 border-forge-500 bg-white"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      
      {/* Values Section */}
      <section className="py-16 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-6 text-3xl font-bold tracking-tight text-metal-800 md:text-4xl">
              Våra värderingar
            </h2>
            <p className="mb-12 text-lg text-metal-600">
              Vi drivs av starka värderingar som genomsyrar allt vi gör. Dessa principer hjälper oss att leverera högsta kvalitet till våra kunder.
            </p>
          </div>
          
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {values.map((value, i) => (
              <div 
                key={i} 
                className="rounded-lg border border-metal-200 bg-white p-6 shadow-sm transition-transform hover:shadow-md"
              >
                <div className="mb-4">{value.icon}</div>
                <h3 className="mb-3 text-xl font-semibold text-metal-800">{value.title}</h3>
                <p className="text-metal-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Team Section */}
      <section className="bg-metal-50 py-16 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-6 text-3xl font-bold tracking-tight text-metal-800 md:text-4xl">
              Vårt team
            </h2>
            <p className="mb-12 text-lg text-metal-600">
              Bakom varje projekt står ett team av passionerade och skickliga människor. Lär känna några av nyckelpersonerna på Hustofta Smide & Mekaniska.
            </p>
          </div>
          
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {team.map((member, i) => (
              <div 
                key={i} 
                className="group overflow-hidden rounded-lg bg-white shadow-sm transition-transform hover:-translate-y-1 hover:shadow-md"
              >
                <div className="aspect-[3/4] overflow-hidden">
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-metal-800">{member.name}</h3>
                  <p className="mb-3 text-sm font-medium text-forge-500">{member.role}</p>
                  <p className="text-sm text-metal-600">{member.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
