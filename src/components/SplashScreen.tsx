import React, { useEffect, useState } from 'react';

interface SplashScreenProps {
  onComplete: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onComplete }) => {
  const [isAnimating, setIsAnimating] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAnimating(false);
      setTimeout(onComplete, 500);
    }, 2500);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className={`fixed inset-0 bg-gradient-to-br from-pink-200 via-pink-100 to-rose-200 flex items-center justify-center transition-opacity duration-500 z-50 ${isAnimating ? 'opacity-100' : 'opacity-0'}`}>
      <div className="text-center">
        {/* Logo Animation - TAILLE AUGMENTÉE */}
        <div className={`transition-all duration-1000 ${isAnimating ? 'scale-100 opacity-100' : 'scale-110 opacity-90'}`}>
          <div className="relative mb-8">
            <div className="w-64 h-64 mx-auto bg-transparent flex items-center justify-center transform transition-transform duration-1000 hover:scale-105">
              <img 
                src="/log copy.png" 
                alt="Vayara Logo" 
                className={`w-full h-full object-contain transition-all duration-1000 ${isAnimating ? 'animate-pulse' : ''}`}
              />
            </div>
            <div className={`absolute -inset-8 bg-gradient-to-r from-pink-300 to-rose-300 rounded-full opacity-20 transition-all duration-1000 ${isAnimating ? 'animate-ping' : ''}`}></div>
          </div>
        </div>

        {/* App Name */}
        <div className={`transition-all duration-1000 delay-300 ${isAnimating ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-90'}`}>
          <h1 className="text-5xl font-bold text-gray-800 mb-2 font-poppins">
            <span className="bg-gradient-to-r from-pink-400 to-rose-400 bg-clip-text text-transparent">
              Vayara
            </span>
          </h1>
          <p className="text-gray-600 text-lg font-medium">Cruelty-Free Discovery</p>
        </div>

        {/* Loading Animation */}
        <div className={`mt-8 transition-all duration-1000 delay-500 ${isAnimating ? 'opacity-100' : 'opacity-60'}`}>
          <div className="w-48 h-1 bg-white/30 rounded-full mx-auto overflow-hidden">
            <div className={`h-full bg-gradient-to-r from-pink-400 to-rose-400 rounded-full transition-all duration-2000 ${isAnimating ? 'w-full' : 'w-0'}`}></div>
          </div>
        </div>
      </div>

      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-4 h-4 bg-pink-400 rounded-full animate-bounce"></div>
        <div className="absolute top-32 right-16 w-3 h-3 bg-rose-400 rounded-full animate-bounce delay-200"></div>
        <div className="absolute bottom-40 left-20 w-5 h-5 bg-pink-300 rounded-full animate-bounce delay-500"></div>
        <div className="absolute bottom-60 right-12 w-2 h-2 bg-rose-300 rounded-full animate-bounce delay-700"></div>
      </div>
    </div>
  );
};