
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useIsMobile } from '@/hooks/use-mobile';

interface ServiceCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  link?: string;
  delay?: number;
}

const ServiceCard = ({ title, description, icon, link, delay = 0 }: ServiceCardProps) => {
  const isMobile = useIsMobile();
  
  return (
    <div 
      className="group relative overflow-hidden rounded-lg border border-metal-200 bg-white p-4 md:p-6 shadow-sm transition-all duration-300 hover:shadow-md"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="mb-3 md:mb-4 inline-flex h-10 w-10 md:h-12 md:w-12 items-center justify-center rounded-md bg-metal-100 text-forge-500 transition-colors group-hover:bg-forge-500 group-hover:text-white">
        {icon}
      </div>
      
      <h3 className="mb-2 md:mb-3 text-lg md:text-xl font-semibold text-metal-800">{title}</h3>
      
      <p className="mb-3 md:mb-4 text-sm md:text-base text-metal-600">{description}</p>
      
      {link && (
        <Link 
          to={link} 
          className="group/link inline-flex items-center text-sm font-medium text-forge-500 transition-colors hover:text-forge-600"
        >
          <span>Läs mer</span>
          <ArrowRight size={isMobile ? 14 : 16} className="ml-1 transition-transform group-hover/link:translate-x-1" />
        </Link>
      )}
      
      <div className="absolute -bottom-1 -right-1 h-12 w-12 md:h-16 md:w-16 rounded-full bg-metal-100 opacity-0 transition-opacity group-hover:opacity-20" />
    </div>
  );
};

export default ServiceCard;
