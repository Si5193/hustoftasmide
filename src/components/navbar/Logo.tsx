
import { Hammer } from 'lucide-react';

interface LogoProps {
  scrolled: boolean;
  onLogoClick: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}

const Logo = ({ scrolled, onLogoClick }: LogoProps) => {
  return (
    <a href="#" onClick={onLogoClick} className={`flex items-center space-x-2 transition-colors ${scrolled ? 'text-forge-500' : 'text-white'}`}>
      <Hammer className="text-forge-500" size={28} />
      <span className="text-xl font-bold tracking-tight md:text-base">Hustofta smide &amp; mekaniska</span>
    </a>
  );
};

export default Logo;
