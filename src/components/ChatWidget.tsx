
import { Mail } from 'lucide-react';
import { useContactForm } from '@/contexts/ContactFormContext';

const ChatWidget = () => {
  const { openContactForm } = useContactForm();

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <button
        onClick={openContactForm}
        className="bg-forge-500 hover:bg-forge-600 text-white p-4 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-105"
        aria-label="Öppna kontaktformulär"
        title="Kontakta oss"
      >
        <Mail size={24} />
      </button>
    </div>
  );
};

export default ChatWidget;
