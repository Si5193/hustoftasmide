
import { Link } from 'react-router-dom';
import { Settings } from 'lucide-react';

interface DesktopNavigationProps {
  navLinks: Array<{
    name: string;
    path: string;
    section: string;
  }>;
  showAdminLink: boolean;
  scrolled: boolean;
  scrollToSection: (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => void;
  isActive: (section: string) => boolean;
}

const DesktopNavigation = ({ 
  navLinks, 
  showAdminLink, 
  scrolled, 
  scrollToSection, 
  isActive 
}: DesktopNavigationProps) => {
  return (
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
  );
};

export default DesktopNavigation;
