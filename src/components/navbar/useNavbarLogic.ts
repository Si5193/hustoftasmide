
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const useNavbarLogic = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showAdminLink, setShowAdminLink] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const location = useLocation();

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

  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setClickCount(prev => prev + 1);
    
    setTimeout(() => setClickCount(0), 500);
    
    if (clickCount === 1) {
      setShowAdminLink(prev => !prev);
    }
    
    scrollToSection(e, 'top');
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

  return {
    isOpen,
    scrolled,
    showAdminLink,
    navLinks,
    handleLogoClick,
    toggleMenu,
    closeMenu,
    scrollToSection,
    isActive
  };
};
