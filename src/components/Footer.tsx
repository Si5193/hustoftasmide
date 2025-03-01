
import { Link } from 'react-router-dom';
import { Hammer, Phone, Mail, MapPin, Clock, ArrowRight } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-metal-800 text-white">
      <div className="container px-4 py-12 md:px-6 md:py-16">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Hammer className="text-forge-500" size={24} />
              <h4 className="text-xl font-bold tracking-tight">Hustofta</h4>
            </div>
            <p className="text-metal-200">
              Kvalitetssmide och mekanisk tillverkning för företag och privatpersoner.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h5 className="text-lg font-semibold">Snabblänkar</h5>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="group flex items-center text-metal-200 transition-colors hover:text-white">
                  <ArrowRight size={16} className="mr-2 text-forge-500 transition-transform group-hover:translate-x-1" />
                  Hem
                </Link>
              </li>
              <li>
                <Link to="/about" className="group flex items-center text-metal-200 transition-colors hover:text-white">
                  <ArrowRight size={16} className="mr-2 text-forge-500 transition-transform group-hover:translate-x-1" />
                  Om oss
                </Link>
              </li>
              <li>
                <Link to="/services" className="group flex items-center text-metal-200 transition-colors hover:text-white">
                  <ArrowRight size={16} className="mr-2 text-forge-500 transition-transform group-hover:translate-x-1" />
                  Tjänster
                </Link>
              </li>
              <li>
                <Link to="/projects" className="group flex items-center text-metal-200 transition-colors hover:text-white">
                  <ArrowRight size={16} className="mr-2 text-forge-500 transition-transform group-hover:translate-x-1" />
                  Projekt
                </Link>
              </li>
              <li>
                <Link to="/contact" className="group flex items-center text-metal-200 transition-colors hover:text-white">
                  <ArrowRight size={16} className="mr-2 text-forge-500 transition-transform group-hover:translate-x-1" />
                  Kontakt
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h5 className="text-lg font-semibold">Kontaktinformation</h5>
            <ul className="space-y-3">
              <li className="flex items-start">
                <Phone size={18} className="mr-3 mt-0.5 text-forge-500" />
                <span className="text-metal-200">+46 123 456 789</span>
              </li>
              <li className="flex items-start">
                <Mail size={18} className="mr-3 mt-0.5 text-forge-500" />
                <span className="text-metal-200">info@hustoftasmide.se</span>
              </li>
              <li className="flex items-start">
                <MapPin size={18} className="mr-3 mt-0.5 text-forge-500" />
                <span className="text-metal-200">Smidesvägen 1, 123 45 Hustofta</span>
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
        </div>

        <div className="mt-12 border-t border-metal-700 pt-6 text-center text-sm text-metal-300">
          <p>© {currentYear} Hustofta Smide & Mekaniska. Alla rättigheter förbehållna.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
