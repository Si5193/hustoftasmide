
import { useState, useEffect } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import LoadingScreen from './LoadingScreen';
import { Toaster } from './ui/toaster';
import { useToast } from '@/hooks/use-toast';
import { useLocation } from 'react-router-dom';
import { useIsMobile } from '@/hooks/use-mobile';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const location = useLocation();
  const isMobile = useIsMobile();

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

  // Check for 404 errors when the route changes
  useEffect(() => {
    // If the path includes "/services" but the Services page doesn't exist yet
    if (location.pathname.includes('/services')) {
      toast({
        title: "Sidan under konstruktion",
        description: "Denna sida är för närvarande under utveckling.",
        variant: "default",
      });
    }
  }, [location.pathname, toast]);

  return (
    <div className="flex min-h-screen flex-col">
      {loading && <LoadingScreen onLoadingComplete={handleLoadingComplete} />}
      
      <Navbar />
      
      <main className={`flex-1 w-full pt-16 md:pt-20 transition-opacity duration-500 ${loading ? 'opacity-0' : 'opacity-100'}`}>
        {children}
      </main>
      
      <Footer />
      <Toaster />
    </div>
  );
};

export default Layout;
