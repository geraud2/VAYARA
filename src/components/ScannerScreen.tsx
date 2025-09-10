import React, { useState } from 'react';
import { Camera, Type, Scan } from 'lucide-react';
import { useTranslation } from '../hooks/useTranslation';
import { Header } from './Header';

interface ScannerScreenProps {
  language: string;
  onBack: () => void;
  onProductFound: (barcode: string) => void;
}

export const ScannerScreen: React.FC<ScannerScreenProps> = ({ 
  language, 
  onBack, 
  onProductFound 
}) => {
  const { t } = useTranslation(language);
  const [manualBarcode, setManualBarcode] = useState('');
  const [isScanning, setIsScanning] = useState(false);

  const handleManualSubmit = () => {
    if (manualBarcode.trim()) {
      onProductFound(manualBarcode.trim());
    }
  };

  const simulateScan = () => {
    setIsScanning(true);
    // Simulate camera scan with mock barcode
    setTimeout(() => {
      setIsScanning(false);
      onProductFound('1234567890123'); // Mock barcode
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-rose-50 pb-20 sm:pb-4">
      <Header title={t('scannerTitle')} showBackButton onBack={onBack} />
      
      <div className="p-4 sm:p-6">
        {/* Scanner Area */}
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl p-4 sm:p-8 mb-4 sm:mb-6">
          <div className="text-center mb-6 sm:mb-8">
            <div className="relative mx-auto w-48 h-48 sm:w-64 sm:h-64 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl sm:rounded-2xl flex items-center justify-center mb-4 overflow-hidden">
              {isScanning ? (
                <div className="flex flex-col items-center">
                  <Scan className="w-12 h-12 text-pink-400 animate-pulse mb-2" />
                  <div className="w-16 h-16 mb-2 flex items-center justify-center">
                    <img 
                      src="/log copy.png" 
                      alt="Vayara Logo" 
                      className="w-14 h-14 object-contain opacity-50"
                    />
                  </div>
                  <span className="text-sm text-gray-600">{t('loading')}...</span>
                </div>
              ) : (
                <div className="flex flex-col items-center">
                  <Camera className="w-16 h-16 text-gray-400 mb-2" />
                  <div className="w-16 h-16 flex items-center justify-center">
                    <img 
                      src="/log copy.png" 
                      alt="Vayara Logo" 
                      className="w-14 h-14 object-contain opacity-40"
                    />
                  </div>
                </div>
              )}
              
              {/* Scanner overlay */}
              <div className="absolute inset-4 border-2 border-pink-400 rounded-xl">
                <div className="absolute top-0 left-0 w-6 h-6 border-l-4 border-t-4 border-pink-400 rounded-tl-lg"></div>
                <div className="absolute top-0 right-0 w-6 h-6 border-r-4 border-t-4 border-pink-400 rounded-tr-lg"></div>
                <div className="absolute bottom-0 left-0 w-6 h-6 border-l-4 border-b-4 border-pink-400 rounded-bl-lg"></div>
                <div className="absolute bottom-0 right-0 w-6 h-6 border-r-4 border-b-4 border-pink-400 rounded-br-lg"></div>
                
                {/* Scanning line */}
                {isScanning && (
                  <div className="absolute inset-x-2 top-1/2 h-0.5 bg-gradient-to-r from-transparent via-pink-400 to-transparent animate-pulse"></div>
                )}
              </div>
            </div>
            
            <p className="text-gray-600 mb-6">{t('scannerInstruction')}</p>
            
            <button
              onClick={simulateScan}
              disabled={isScanning}
              className={`w-full bg-gradient-to-r from-pink-400 to-rose-400 text-white font-semibold py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform ${
                isScanning ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'
              }`}
            >
              {isScanning ? t('loading') : 'Démarrer le scan'}
            </button>
          </div>
        </div>

        {/* Manual Entry */}
        <div className="bg-white rounded-2xl shadow-xl p-6">
          <div className="flex items-center space-x-3 mb-4">
            <Type className="w-5 h-5 text-gray-600" />
            <h3 className="text-lg font-semibold text-gray-800">{t('manualEntry')}</h3>
          </div>
          
          <div className="flex space-x-3">
            <input
              type="text"
              value={manualBarcode}
              onChange={(e) => setManualBarcode(e.target.value)}
              placeholder="Code-barres..."
              className="flex-1 p-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-pink-400 focus:border-transparent outline-none min-w-0"
              // min-w-0 permet au champ de ne pas dépasser le bouton sur mobile
            />
            <button
              onClick={handleManualSubmit}
              className="bg-gradient-to-r from-pink-400 to-rose-400 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
            >
              {t('searh')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};