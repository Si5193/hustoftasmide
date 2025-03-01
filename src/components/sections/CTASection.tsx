
import { Link } from 'react-router-dom';

const CTASection = () => {
  return (
    <section className="bg-metal-800 py-16 text-white md:py-20">
      <div className="container px-4 md:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">
            Redo att starta ditt projekt?
          </h2>
          <p className="mb-8 text-lg text-metal-300">
            Kontakta oss idag för en kostnadsfri konsultation. Vi hjälper dig att förverkliga dina idéer.
          </p>
          <Link 
            to="/contact" 
            className="btn-primary bg-forge-500 hover:bg-forge-600"
          >
            Kontakta oss
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
