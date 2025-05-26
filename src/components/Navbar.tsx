import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Hammer, Menu, X, Settings, Phone } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showAdminLink, setShowAdminLink] = useState(false);
  const location = useLocation();

  // Check for admin access on double-click of logo
  const [clickCount, setClickCount] = useState(0);
  
  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setClickCount(prev => prev + 1);
    
    setTimeout(() => setClickCount(0), 500); // Reset after 500ms
    
    if (clickCount === 1) { // This will be the second click
      setShowAdminLink(prev => !prev);
    }
    
    scrollToSection(e, 'top');
  };

  const handleCallClick = () => {
    window.location.href = 'tel:076-1072796';
  };

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
        behavior: 'smooth'
      });
    }
  };

  const isActive = (section: string) => {
    return false;
  };

  return (
    <header className={`fixed left-0 top-0 z-40 w-full transition-all duration-300 ${scrolled ? 'bg-background/90 py-3 shadow-md backdrop-blur-md' : 'bg-transparent py-4'}`}>
      <div className="container flex items-center justify-between px-4 md:px-6">
        <a href="#" onClick={handleLogoClick} className={`flex items-center space-x-2 transition-colors ${scrolled ? 'text-forge-500' : 'text-white'}`}>
          <Hammer className="text-forge-500" size={28} />
          <span className="text-xl font-bold tracking-tight md:text-base">Hustofta smide &amp; mekaniska</span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:block">
          <ul className="flex items-center space-x-6">
            {navLinks.map(link => (
              <li key={link.section}>
                <a href={link.path} onClick={e => scrollToSection(e, link.section)} className={`hover-link px-1 py-2 text-sm font-medium transition-colors ${isActive(link.section) ? 'text-forge-500' : scrolled ? 'text-forge-500 hover:text-forge-600' : 'text-white hover:text-forge-500'}`}>
                  {link.name}
                </a>
              </li>
            ))}
            {showAdminLink && (
              <li>
                <Link to="/admin" className={`hover-link px-1 py-2 text-sm font-medium transition-colors flex items-center gap-1 ${scrolled ? 'text-forge-500 hover:text-forge-600' : 'text-white hover:text-forge-500'}`}>
                  <Settings size={16} />
                  Admin
                </Link>
              </li>
            )}
          </ul>
        </nav>

        {/* Call Button */}
        <button 
          onClick={handleCallClick}
          className={`hidden md:flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 ${
            scrolled 
              ? 'bg-forge-500 text-white hover:bg-forge-600' 
              : 'bg-white/10 backdrop-blur-sm text-white hover:bg-white/20'
          }`}
        >
          <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-white/20">
            <img 
              src="/images/hustofta.jpg" 
              alt="Alexander" 
              className="w-full h-full object-cover"
            />
          </div>
          <span className="text-sm font-medium">Ring mig</span>
          <Phone size={16} />
        </button>

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
                  className="flex items-center gap-3 text-3xl font-medium text-foreground bg-forge-500 text-white px-6 py-3 rounded-lg w-full justify-center"
                >
                  <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white/20">
                    <img 
                      src="/images/hustofta.jpg" 
                      alt="Alexander" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  Ring mig
                  <Phone size={32} />
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
    </header>
  );
};

export default Navbar;
