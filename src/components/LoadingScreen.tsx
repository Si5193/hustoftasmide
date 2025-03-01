
import { useEffect, useState } from 'react';
import { Hammer, Cog } from 'lucide-react';

interface LoadingScreenProps {
  onLoadingComplete: () => void;
}

const LoadingScreen = ({ onLoadingComplete }: LoadingScreenProps) => {
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [sparks, setSparks] = useState<{ id: number; size: number; left: number; delay: number }[]>([]);

  useEffect(() => {
    // Generate random sparks
    const newSparks = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      size: Math.random() * 6 + 2,
      left: Math.random() * 60 + 20,
      delay: Math.random() * 2,
    }));
    setSparks(newSparks);

    // Simulate loading
    const interval = setInterval(() => {
      setLoadingProgress((prev) => {
        const next = prev + Math.random() * 10;
        return next >= 100 ? 100 : next;
      });
    }, 200);

    // Complete loading after animation
    const timer = setTimeout(() => {
      clearInterval(interval);
      setLoadingProgress(100);
      
      setTimeout(() => {
        onLoadingComplete();
      }, 500);
    }, 2500);

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, [onLoadingComplete]);

  return (
    <div className={`loading-overlay ${loadingProgress === 100 ? 'opacity-0' : 'opacity-100'}`}>
      <div className="flex flex-col items-center">
        <div className="relative mb-8 h-24 w-24">
          <div className="absolute left-0 top-0 h-full w-full animate-rotate-gear text-forge-500">
            <Cog size={96} strokeWidth={1} />
          </div>
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform text-primary-foreground">
            <Hammer size={40} />
          </div>
        </div>
        
        <h1 className="mb-8 font-heading text-3xl font-bold text-primary-foreground">
          Hustofta Smide & Mekaniska
        </h1>
        
        <div className="relative h-1 w-64 overflow-hidden rounded-full bg-metal-700">
          <div 
            className="h-full bg-forge-500 transition-all duration-300 ease-out" 
            style={{ width: `${loadingProgress}%` }}
          />
          
          <div className="absolute bottom-0 left-1/2 h-8 w-1 -translate-x-1/2 transform">
            <div className="weld-point" />
            {sparks.map((spark) => (
              <div
                key={spark.id}
                className="spark"
                style={{
                  width: `${spark.size}px`,
                  height: `${spark.size}px`,
                  left: `${spark.left}%`,
                  animationDelay: `${spark.delay}s`,
                }}
              />
            ))}
          </div>
        </div>
        
        <p className="mt-4 text-lg text-primary-foreground">
          {loadingProgress < 100 ? 'Laddar...' : 'Välkommen'}
        </p>
      </div>
    </div>
  );
};

export default LoadingScreen;
