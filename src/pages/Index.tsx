
import { useEffect } from 'react';
import Layout from '../components/Layout';
import Hero from '../components/Hero';
import ServicesSection from '../components/sections/ServicesSection';
import AboutSection from '../components/sections/AboutSection';
import ProjectsSection from '../components/sections/ProjectsSection';
import CTASection from '../components/sections/CTASection';
import { useProjectStorage } from '../hooks/useProjectStorage';

const Index = () => {
  const { projects, loading } = useProjectStorage();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Layout>
      <Hero />
      <ServicesSection />
      <AboutSection />
      {loading ? (
        <section id="projects" className="py-16 md:py-24">
          <div className="container mx-auto text-center">
            <p>Laddar projekt...</p>
          </div>
        </section>
      ) : (
        <ProjectsSection projects={projects} />
      )}
      <CTASection />
    </Layout>
  );
};

export default Index;
