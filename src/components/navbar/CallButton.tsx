
import { Phone } from 'lucide-react';

interface CallButtonProps {
  scrolled: boolean;
}

const CallButton = ({ scrolled }: CallButtonProps) => {
  const handleCallClick = () => {
    window.location.href = 'tel:076-1072796';
  };

  return (
    <button 
      onClick={handleCallClick}
      className={`hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all duration-300 ${
        scrolled 
          ? 'bg-forge-500 text-white hover:bg-forge-600' 
          : 'bg-white/10 backdrop-blur-sm text-white hover:bg-white/20'
      }`}
    >
      <div className="w-6 h-6 rounded-full overflow-hidden border border-white/20">
        <img 
          src="/images/hustofta.jpg" 
          alt="Alexander" 
          className="w-full h-full object-cover"
        />
      </div>
      <span className="text-xs font-medium">Ring mig</span>
      <Phone size={14} />
    </button>
  );
};

export default CallButton;
