import React from 'react';
import { ArrowLeft } from 'lucide-react';

interface HeaderProps {
  title?: string;
  showBackButton?: boolean;
  onBack?: () => void;
  showLogo?: boolean;
  children?: React.ReactNode;
}

export const Header: React.FC<HeaderProps> = ({ 
  title, 
  showBackButton = false, 
  onBack,
  showLogo = false,
  children
}) => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-100">
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center space-x-3">
          {showBackButton && onBack && (
            <button
              onClick={onBack}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </button>
          )}
          
          {showLogo && (
            <div className="flex items-center space-x-2">
              <img 
                src="/log copy.png" 
                alt="Vayara Logo" 
                className="w-16 h-16 object-contain"
              />
              <span className="font-bold text-gray-800">Vayara</span>
            </div>
          )}
          
          {title && !showLogo && (
            <h1 className="text-xl font-semibold text-gray-800">{title}</h1>
          )}
        </div>
        
        {children && (
          <div className="flex items-center">
            {children}
          </div>
        )}
      </div>
    </header>
  );
};