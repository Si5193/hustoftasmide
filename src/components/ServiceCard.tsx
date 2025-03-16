
import { useState } from 'react';
import { ArrowRight, Info, ArrowDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useIsMobile } from '@/hooks/use-mobile';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface ServiceCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  link?: string;
  delay?: number;
  fullDescription?: string;
}

const ServiceCard = ({ 
  title, 
  description, 
  icon, 
  link, 
  delay = 0,
  fullDescription
}: ServiceCardProps) => {
  const isMobile = useIsMobile();
  const [dialogOpen, setDialogOpen] = useState(false);
  
  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
      setDialogOpen(false);
    }
  };
  
  return (
    <>
      <div 
        className="group relative overflow-hidden rounded-lg border border-metal-200 bg-white p-4 md:p-6 shadow-sm transition-all duration-300 hover:shadow-md"
        style={{ animationDelay: `${delay}ms` }}
      >
        <div className="mb-3 md:mb-4 inline-flex h-10 w-10 md:h-12 md:w-12 items-center justify-center rounded-md bg-metal-100 text-forge-500 transition-colors group-hover:bg-forge-500 group-hover:text-white">
          {icon}
        </div>
        
        <h3 className="mb-2 md:mb-3 text-lg md:text-xl font-semibold text-metal-800">{title}</h3>
        
        <p className="mb-3 md:mb-4 text-sm md:text-base text-metal-600">{description}</p>
        
        {(link || fullDescription) && (
          <button 
            onClick={() => setDialogOpen(true)}
            className="group/link inline-flex items-center text-sm font-medium text-forge-500 transition-colors hover:text-forge-600"
          >
            <span>Läs mer</span>
            <ArrowRight size={isMobile ? 14 : 16} className="ml-1 transition-transform group-hover/link:translate-x-1" />
          </button>
        )}
        
        <div className="absolute -bottom-1 -right-1 h-12 w-12 md:h-16 md:w-16 rounded-full bg-metal-100 opacity-0 transition-opacity group-hover:opacity-20" />
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-metal-100 text-forge-500">
                {icon}
              </span>
              {title}
            </DialogTitle>
            <DialogDescription>
              {fullDescription || description}
            </DialogDescription>
          </DialogHeader>
          
          <div className="mt-4 space-y-4">
            <p className="text-sm text-metal-600">
              Vill du veta mer om denna tjänst eller diskutera ditt projekt med oss?
            </p>
            
            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={() => setDialogOpen(false)}>
                Stäng
              </Button>
              <Button 
                onClick={scrollToContact} 
                className="bg-forge-500 text-white hover:bg-forge-600"
              >
                <span>Kontakta oss</span>
                <ArrowDown className="ml-1 h-4 w-4" />
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ServiceCard;
