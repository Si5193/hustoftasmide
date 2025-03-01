
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

  const navLinks = [
    { name: 'Hem', path: '/' },
    { name: 'Om oss', path: '/about' },
    { name: 'Tjänster', path: '/services' },
    { name: 'Projekt', path: '/projects' },
    { name: 'Kontakt', path: '/contact' },
  ];

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header 
      className={`fixed left-0 top-0 z-40 w-full transition-all duration-300 ${
        scrolled ? 'bg-background/90 py-3 shadow-md backdrop-blur-md' : 'bg-transparent py-4'
      }`}
    >
      <div className="container flex items-center justify-between px-4 md:px-6">
        <Link to="/" className="flex items-center space-x-2 text-white transition-colors">
          <Hammer className="text-forge-500" size={28} />
          <span className="text-xl font-bold tracking-tight md:text-2xl">Hustofta</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:block">
          <ul className="flex items-center space-x-6">
            {navLinks.map((link) => (
              <li key={link.path}>
                <Link
                  to={link.path}
                  className={`hover-link px-1 py-2 text-sm font-medium transition-colors ${
                    isActive(link.path)
                      ? 'text-forge-500'
                      : 'text-white hover:text-forge-500'
                  }`}
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Mobile Menu Button */}
        <button 
          className="flex md:hidden text-white"
          onClick={toggleMenu}
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation Overlay */}
      <div 
        className={`fixed inset-0 z-50 bg-background transition-transform duration-300 md:hidden ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="container flex h-full flex-col px-4">
          <div className="flex items-center justify-between py-4">
            <Link to="/" className="flex items-center space-x-2" onClick={closeMenu}>
              <Hammer className="text-forge-500" size={28} />
              <span className="text-xl font-bold">Hustofta</span>
            </Link>
            <button onClick={closeMenu} aria-label="Close menu">
              <X size={24} />
            </button>
          </div>
          
          <nav className="flex-1 py-8">
            <ul className="flex flex-col space-y-6">
              {navLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className={`text-3xl font-medium ${
                      isActive(link.path) ? 'text-forge-500' : 'text-foreground'
                    }`}
                    onClick={closeMenu}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
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
