
import { useState, useEffect } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import LoadingScreen from './LoadingScreen';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const [loading, setLoading] = useState(true);

  const handleLoadingComplete = () => {
    setLoading(false);
    document.body.style.overflow = 'auto';
  };

  useEffect(() => {
    // Prevent scrolling during loading
    if (loading) {
      document.body.style.overflow = 'hidden';
    }
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [loading]);

  return (
    <div className="flex min-h-screen flex-col">
      {loading && <LoadingScreen onLoadingComplete={handleLoadingComplete} />}
      
      <Navbar />
      
      <main className={`flex-1 transition-opacity duration-500 ${loading ? 'opacity-0' : 'opacity-100'}`}>
        {children}
      </main>
      
      <Footer />
    </div>
  );
};

export default Layout;
