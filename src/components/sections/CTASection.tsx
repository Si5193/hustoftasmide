
import { useContactForm } from '@/contexts/ContactFormContext';

const CTASection = () => {
  const { openContactForm } = useContactForm();

  return (
    <section id="contact" className="bg-metal-800 py-8 md:py-16 text-white">
      <div className="container px-4 md:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="mb-3 md:mb-4 text-2xl md:text-3xl lg:text-4xl font-bold">
            Redo att starta ditt projekt?
          </h2>
          <p className="mb-6 md:mb-8 text-sm md:text-lg text-metal-300">
            Kontakta oss idag för en kostnadsfri konsultation.
          </p>
          <div className="flex justify-center">
            <button 
              onClick={openContactForm}
              className="btn-primary bg-forge-500 hover:bg-forge-600 px-6 py-3 rounded-md font-medium text-sm md:text-base min-h-[44px]"
            >
              Kontakta oss
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
