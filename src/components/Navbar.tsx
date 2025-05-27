
import { Menu, X } from 'lucide-react';
import { useNavbarLogic } from './navbar/useNavbarLogic';
import Logo from './navbar/Logo';
import DesktopNavigation from './navbar/DesktopNavigation';
import CallButton from './navbar/CallButton';
import MobileMenu from './navbar/MobileMenu';

const Navbar = () => {
  const {
    isOpen,
    scrolled,
    showAdminLink,
    navLinks,
    handleLogoClick,
    toggleMenu,
    closeMenu,
    scrollToSection,
    isActive
  } = useNavbarLogic();

  return (
    <header className={`fixed left-0 top-0 z-40 w-full transition-all duration-300 ${scrolled ? 'bg-background/90 py-3 shadow-md backdrop-blur-md' : 'bg-transparent py-4'}`}>
      <div className="container flex items-center justify-between px-4 md:px-6">
        <Logo scrolled={scrolled} onLogoClick={handleLogoClick} />

        <DesktopNavigation 
          navLinks={navLinks}
          showAdminLink={showAdminLink}
          scrolled={scrolled}
          scrollToSection={scrollToSection}
          isActive={isActive}
        />

        <CallButton scrolled={scrolled} />

        {/* Mobile Menu Button */}
        <button className={`flex md:hidden ${scrolled ? 'text-forge-500' : 'text-white'}`} onClick={toggleMenu} aria-label={isOpen ? 'Close menu' : 'Open menu'}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <MobileMenu 
        isOpen={isOpen}
        onClose={closeMenu}
        showAdminLink={showAdminLink}
        navLinks={navLinks}
        scrollToSection={scrollToSection}
        isActive={isActive}
      />
    </header>
  );
};

export default Navbar;
