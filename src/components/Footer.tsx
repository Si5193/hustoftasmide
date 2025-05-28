
import { Hammer, Phone, Mail, MapPin, Clock, ArrowRight } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

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
    <footer className="bg-metal-800 text-white">
      <div className="container px-4 py-12 md:px-6 md:py-16">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-5">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Hammer className="text-forge-500" size={24} />
              <h4 className="text-xl font-bold tracking-tight">Hustofta</h4>
            </div>
            <p className="text-metal-200">
              Kvalitetssmide och mekanisk tillverkning för företag och privatpersoner i Höganäs kommun med omnejd.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h5 className="text-lg font-semibold">Snabblänkar</h5>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => scrollToSection('top')}
                  className="group flex items-center text-metal-200 transition-colors hover:text-white"
                >
                  <ArrowRight size={16} className="mr-2 text-forge-500 transition-transform group-hover:translate-x-1" />
                  Hem
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('about')}
                  className="group flex items-center text-metal-200 transition-colors hover:text-white"
                >
                  <ArrowRight size={16} className="mr-2 text-forge-500 transition-transform group-hover:translate-x-1" />
                  Om oss
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('services')}
                  className="group flex items-center text-metal-200 transition-colors hover:text-white"
                >
                  <ArrowRight size={16} className="mr-2 text-forge-500 transition-transform group-hover:translate-x-1" />
                  Tjänster
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('projects')}
                  className="group flex items-center text-metal-200 transition-colors hover:text-white"
                >
                  <ArrowRight size={16} className="mr-2 text-forge-500 transition-transform group-hover:translate-x-1" />
                  Projekt
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('contact')}
                  className="group flex items-center text-metal-200 transition-colors hover:text-white"
                >
                  <ArrowRight size={16} className="mr-2 text-forge-500 transition-transform group-hover:translate-x-1" />
                  Kontakt
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h5 className="text-lg font-semibold">Kontaktinformation</h5>
            <ul className="space-y-3">
              <li className="flex items-start">
                <Phone size={18} className="mr-3 mt-0.5 text-forge-500" />
                <span className="text-metal-200">076-1072796</span>
              </li>
              <li className="flex items-start">
                <Mail size={18} className="mr-3 mt-0.5 text-forge-500" />
                <span className="text-metal-200">info@hustoftasmide.se</span>
              </li>
              <li className="flex items-start">
                <MapPin size={18} className="mr-3 mt-0.5 text-forge-500" />
                <span className="text-metal-200">Ornakärrsvägen 49, 26391 Höganäs</span>
              </li>
            </ul>
          </div>

          {/* Opening Hours */}
          <div className="space-y-4">
            <h5 className="text-lg font-semibold">Öppettider</h5>
            <ul className="space-y-2">
              <li className="flex items-start">
                <Clock size={18} className="mr-3 mt-0.5 text-forge-500" />
                <div>
                  <p className="font-medium">Måndag - Fredag</p>
                  <p className="text-sm text-metal-200">07:00 - 16:00</p>
                </div>
              </li>
              <li className="flex items-start">
                <Clock size={18} className="mr-3 mt-0.5 text-forge-500" />
                <div>
                  <p className="font-medium">Lördag</p>
                  <p className="text-sm text-metal-200">Stängt</p>
                </div>
              </li>
              <li className="flex items-start">
                <Clock size={18} className="mr-3 mt-0.5 text-forge-500" />
                <div>
                  <p className="font-medium">Söndag</p>
                  <p className="text-sm text-metal-200">Stängt</p>
                </div>
              </li>
            </ul>
          </div>

          {/* Service Area */}
          <div className="space-y-4">
            <h5 className="text-lg font-semibold">Verksamhetsområde</h5>
            <ul className="space-y-2">
              <li className="text-sm text-metal-200">Höganäs</li>
              <li className="text-sm text-metal-200">Helsingborg</li>
              <li className="text-sm text-metal-200">Landskrona</li>
              <li className="text-sm text-metal-200">Ängelholm</li>
              <li className="text-sm text-metal-200">Kävlinge</li>
              <li className="text-sm text-metal-200">Bjuv</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-metal-700 pt-6 text-center text-sm text-metal-300">
          <p>© {currentYear} Hustofta Smide & Mekaniska. Alla rättigheter förbehållna.</p>
          <p className="mt-2">
            <a 
              href="mailto:simonstrandlund@gmail.com?subject=Hjälp med hemsida"
              className="text-forge-500 hover:text-forge-400 transition-colors"
            >
              Hemsida byggd av SMVN
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
