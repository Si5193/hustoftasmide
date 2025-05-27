import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Hammer, X, Settings, Phone } from 'lucide-react';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  showAdminLink: boolean;
  navLinks: Array<{
    name: string;
    path: string;
    section: string;
  }>;
  scrollToSection: (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => void;
  isActive: (section: string) => boolean;
}

const MobileMenu = ({ 
  isOpen, 
  onClose, 
  showAdminLink, 
  navLinks, 
  scrollToSection, 
  isActive 
}: MobileMenuProps) => {
  const handleCallClick = () => {
    window.location.href = 'tel:076-1072796';
  };

  return (
    <div className={`fixed inset-0 z-50 bg-metal-100 dark:bg-metal-900 backdrop-blur-sm opacity-100 transition-transform duration-300 md:hidden ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
      <div className="container flex h-full flex-col px-4">
        <div className="flex items-center justify-between py-4">
          <a href="#" onClick={e => scrollToSection(e, 'top')} className="flex items-center space-x-2">
            <Hammer className="text-forge-500" size={28} />
            <span className="text-xl font-bold">Hustofta</span>
          </a>
          <button onClick={onClose} aria-label="Close menu">
            <X size={24} />
          </button>
        </div>
        
        <nav className="flex-1 py-8">
          <ul className="flex flex-col space-y-6">
            {navLinks.map(link => (
              <li key={link.section}>
                <a href={link.path} onClick={e => scrollToSection(e, link.section)} className={`text-3xl font-medium ${isActive(link.section) ? 'text-forge-500' : 'text-foreground'}`}>
                  {link.name}
                </a>
              </li>
            ))}
            {showAdminLink && (
              <li>
                <Link to="/admin" className="text-3xl font-medium text-foreground flex items-center gap-2">
                  <Settings size={32} />
                  Admin
                </Link>
              </li>
            )}
            <li>
              <button 
                onClick={handleCallClick}
                className="flex items-center gap-3 text-2xl font-medium text-white bg-forge-500 hover:bg-forge-600 px-4 py-2 rounded-lg w-full justify-center transition-colors"
              >
                <div className="w-10 h-10 rounded-full overflow-hidden border border-white/20">
                  <img 
                    src="/images/hustofta.jpg" 
                    alt="Alexander" 
                    className="w-full h-full object-cover"
                  />
                </div>
                Ring mig
                <Phone size={24} />
              </button>
            </li>
          </ul>
        </nav>
        
        <div className="py-8">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Hustofta Smide & Mekaniska
          </p>
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
