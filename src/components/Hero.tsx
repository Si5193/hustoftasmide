
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useIsMobile } from '@/hooks/use-mobile';

const Hero = () => {
  const isMobile = useIsMobile();
  
  // Function to handle scrolling to a section
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80, // Adjust for header height
        behavior: 'smooth'
      });
    }
  };
  
  return (
    <section className="relative overflow-hidden bg-metal-900 py-16 text-white md:py-24 lg:py-32">
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="h-full w-full object-cover opacity-50"
        >
          <source src="https://videos.pexels.com/video-files/5846598/5846598-hd_1080_1920_25fps.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-metal-900/60"></div>
      </div>

      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10 z-10">
        <div className="absolute -right-16 -top-16 h-96 w-96 rounded-full border border-white/20" />
        <div className="absolute bottom-20 left-20 h-64 w-64 rounded-full border border-white/20" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(249,115,22,0.15),transparent)]" />
      </div>

      <div className="container relative px-4 md:px-6 z-20">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-6 inline-block rounded-full bg-metal-700/50 px-4 py-1.5 text-sm font-medium backdrop-blur-sm">
            <span className="text-forge-500">Kvalitet</span>
            <span className="mx-2 inline-block h-1 w-1 rounded-full bg-metal-400"></span>
            <span className="text-metal-200">Hantverk</span>
            <span className="mx-2 inline-block h-1 w-1 rounded-full bg-metal-400"></span>
            <span className="text-metal-200">Precision</span>
          </div>
          
          <div className="mb-6 flex justify-center">
            <img 
              src="/images/hslogo.png" 
              alt="Hustofta Smide & Mekaniska" 
              className="h-auto max-w-full" 
              style={{ maxHeight: '120px' }}
            />
          </div>
          
          <p className="mx-auto mb-8 md:mb-10 max-w-2xl text-base md:text-lg lg:text-xl text-metal-200">
            Vi kombinerar traditionellt hantverk med modern teknologi för att skapa hållbara lösningar i metall för både företag och privatpersoner.
          </p>
          
          <div className="flex flex-col justify-center space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
            <Link
              to="/services"
              className="btn-primary group inline-flex items-center justify-center space-x-2 bg-forge-500 text-white hover:bg-forge-600"
            >
              <span>Våra tjänster</span>
              <ArrowRight size={isMobile ? 14 : 16} className="transition-transform group-hover:translate-x-1" />
            </Link>
            
            <button
              onClick={() => scrollToSection('projects')}
              className="btn-outline border-metal-600 text-forge-500 hover:bg-metal-800"
            >
              Se våra projekt
            </button>
          </div>
        </div>
      </div>
      
      {/* Bottom Divider */}
      <div className="absolute bottom-0 left-0 h-8 w-full overflow-hidden z-20">
        <svg
          className="absolute bottom-0 w-full text-background"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
            opacity=".25"
            fill="currentColor"
          />
          <path
            d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z"
            opacity=".5"
            fill="currentColor"
          />
          <path
            d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"
            fill="currentColor"
          />
        </svg>
      </div>
    </section>
  );
};

export default Hero;
