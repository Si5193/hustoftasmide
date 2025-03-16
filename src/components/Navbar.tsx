import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Hammer, Menu, X } from 'lucide-react';
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const toggleMenu = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  };
  const closeMenu = () => {
    setIsOpen(false);
    document.body.style.overflow = 'auto';
  };
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  useEffect(() => {
    closeMenu();
  }, [location.pathname]);
  const navLinks = [{
    name: 'Hem',
    path: '#',
    section: 'top'
  }, {
    name: 'Om oss',
    path: '#about',
    section: 'about'
  }, {
    name: 'Tjänster',
    path: '#services',
    section: 'services'
  }, {
    name: 'Projekt',
    path: '#projects',
    section: 'projects'
  }, {
    name: 'Kontakt',
    path: '#contact',
    section: 'contact'
  }];
  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault();
    closeMenu();
    if (sectionId === 'top') {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
      return;
    }
    const element = document.getElementById(sectionId);
    if (element) {
      const offsetTop = element.offsetTop;
      window.scrollTo({
        top: offsetTop - 80,
        // Adjust for header height
        behavior: 'smooth'
      });
    }
  };
  const isActive = (section: string) => {
    // Placeholder for active section logic based on scroll position
    // This can be enhanced with IntersectionObserver for more accurate tracking
    return false;
  };
  return <header className={`fixed left-0 top-0 z-40 w-full transition-all duration-300 ${scrolled ? 'bg-background/90 py-3 shadow-md backdrop-blur-md' : 'bg-transparent py-4'}`}>
      <div className="container flex items-center justify-between px-4 md:px-6">
        <a href="#" onClick={e => scrollToSection(e, 'top')} className={`flex items-center space-x-2 transition-colors ${scrolled ? 'text-forge-500' : 'text-white'}`}>
          <Hammer className="text-forge-500" size={28} />
          <span className="text-xl font-bold tracking-tight md:text-base">Hustofta smide &amp; mekaniska</span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:block">
          <ul className="flex items-center space-x-6">
            {navLinks.map(link => <li key={link.section}>
                <a href={link.path} onClick={e => scrollToSection(e, link.section)} className={`hover-link px-1 py-2 text-sm font-medium transition-colors ${isActive(link.section) ? 'text-forge-500' : scrolled ? 'text-forge-500 hover:text-forge-600' : 'text-white hover:text-forge-500'}`}>
                  {link.name}
                </a>
              </li>)}
          </ul>
        </nav>

        {/* Mobile Menu Button */}
        <button className={`flex md:hidden ${scrolled ? 'text-forge-500' : 'text-white'}`} onClick={toggleMenu} aria-label={isOpen ? 'Close menu' : 'Open menu'}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation Overlay */}
      <div className={`fixed inset-0 z-50 bg-background transition-transform duration-300 md:hidden ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="container flex h-full flex-col px-4">
          <div className="flex items-center justify-between py-4">
            <a href="#" onClick={e => scrollToSection(e, 'top')} className="flex items-center space-x-2">
              <Hammer className="text-forge-500" size={28} />
              <span className="text-xl font-bold">Hustofta</span>
            </a>
            <button onClick={closeMenu} aria-label="Close menu">
              <X size={24} />
            </button>
          </div>
          
          <nav className="flex-1 py-8">
            <ul className="flex flex-col space-y-6">
              {navLinks.map(link => <li key={link.section}>
                  <a href={link.path} onClick={e => scrollToSection(e, link.section)} className={`text-3xl font-medium ${isActive(link.section) ? 'text-forge-500' : 'text-foreground'}`}>
                    {link.name}
                  </a>
                </li>)}
            </ul>
          </nav>
          
          <div className="py-8">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Hustofta Smide & Mekaniska
            </p>
          </div>
        </div>
      </div>
    </header>;
};
export default Navbar;