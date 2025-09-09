import React, { useState, useEffect } from 'react';
import { History, Clock, Trash2 } from 'lucide-react';
import { useTranslation } from '../hooks/useTranslation';
import { Header } from './Header';
import { storage } from '../utils/storage';
import { mockProducts } from '../utils/mockData';
import type { Product } from '../types';

interface HistoryScreenProps {
  language: string;
  onBack: () => void;
  onProductSelect: (product: Product) => void;
}

export const HistoryScreen: React.FC<HistoryScreenProps> = ({ 
  language, 
  onBack, 
  onProductSelect 
}) => {
  const { t } = useTranslation(language);
  const [history, setHistory] = useState<Product[]>([]);

  useEffect(() => {
    const historyIds = storage.history.get();
    const historyProducts = historyIds
      .map(id => mockProducts.find(product => product.id === id))
      .filter(Boolean) as Product[];
    setHistory(historyProducts);
  }, []);

  const clearHistory = () => {
    localStorage.removeItem('vayara_history');
    setHistory([]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-rose-50 pb-20 sm:pb-4">
      <Header title={t('historyTitle')} showBackButton onBack={onBack} />
      
      <div className="p-4 sm:p-6">
        {history.length > 0 ? (
          <>
            <div className="flex justify-between items-center mb-4 sm:mb-6">
              <p className="text-gray-600">{history.length} produit(s) scanné(s)</p>
              <button
                onClick={clearHistory}
                className="flex items-center space-x-1 text-red-600 hover:text-red-700 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
                <span className="text-sm">Effacer</span>
              </button>
            </div>
            
            <div className="space-y-4">
              {history.map((product, index) => (
                <button
                  key={`${product.id}-${index}`}
                  onClick={() => onProductSelect(product)}
                  className="w-full bg-white rounded-xl shadow-lg p-4 hover:shadow-xl transition-all duration-200 transform hover:scale-105 text-left"
                >
                  <div className="flex space-x-4">
                    <img
                      src={product.image || 'https://images.pexels.com/photos/4465124/pexels-photo-4465124.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'}
                      alt={product.name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h3 className="font-semibold text-gray-800">{product.name}</h3>
                        <Clock className="w-4 h-4 text-gray-400" />
                      </div>
                      <p className="text-gray-600 mb-2">{product.brand}</p>
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          product.crueltyFree === 'certified' 
                            ? 'bg-green-100 text-green-800'
                            : product.crueltyFree === 'not-certified'
                            ? 'bg-red-100 text-red-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {t(product.crueltyFree === 'certified' ? 'certified' : 
                             product.crueltyFree === 'not-certified' ? 'notCertified' : 'unknown')}
                        </span>
                        <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-xs font-medium">
                          Grade {product.compositionGrade}
                        </span>
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </>
        ) : (
          <div className="text-center py-16">
            <History className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <div className="w-20 h-20 mx-auto mb-4 flex items-center justify-center">
              <img 
                src="/log copy.png" 
                alt="Vayara Logo" 
                className="w-16 h-16 object-contain opacity-40"
              />
            </div>
            <p className="text-xl text-gray-500 mb-2">{t('noHistory')}</p>
            <p className="text-gray-400">Scannez vos premiers produits pour voir l'historique</p>
          </div>
        )}
      </div>
    </div>
  );
};