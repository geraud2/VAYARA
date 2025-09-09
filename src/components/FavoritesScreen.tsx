import React, { useState, useEffect } from 'react';
import { Heart, Trash2 } from 'lucide-react';
import { useTranslation } from '../hooks/useTranslation';
import { Header } from './Header';
import { storage } from '../utils/storage';
import { mockProducts } from '../utils/mockData';
import type { Product } from '../types';

interface FavoritesScreenProps {
  language: string;
  onBack: () => void;
  onProductSelect: (product: Product) => void;
}

export const FavoritesScreen: React.FC<FavoritesScreenProps> = ({ 
  language, 
  onBack, 
  onProductSelect 
}) => {
  const { t } = useTranslation(language);
  const [favorites, setFavorites] = useState<Product[]>([]);

  useEffect(() => {
    const favoriteIds = storage.favorites.get();
    const favoriteProducts = mockProducts.filter(product => favoriteIds.includes(product.id));
    setFavorites(favoriteProducts);
  }, []);

  const removeFavorite = (productId: string) => {
    storage.favorites.remove(productId);
    setFavorites(prev => prev.filter(p => p.id !== productId));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-rose-50 pb-20 sm:pb-4">
      <Header title={t('favoritesTitle')} showBackButton onBack={onBack} />
      
      <div className="p-4 sm:p-6">
        {favorites.length > 0 ? (
          <div className="space-y-3 sm:space-y-4">
            {favorites.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-xl shadow-lg p-4 hover:shadow-xl transition-all duration-200"
              >
                <div className="flex space-x-4">
                  <button
                    onClick={() => onProductSelect(product)}
                    className="flex-1 flex space-x-4 text-left"
                  >
                    <img
                      src={product.image || 'https://images.pexels.com/photos/4465124/pexels-photo-4465124.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'}
                      alt={product.name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-800 mb-1">{product.name}</h3>
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
                  </button>
                  <button
                    onClick={() => removeFavorite(product.id)}
                    className="p-2 hover:bg-red-50 rounded-lg transition-colors group"
                  >
                    <Trash2 className="w-5 h-5 text-gray-400 group-hover:text-red-500 transition-colors" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <div className="w-20 h-20 mx-auto mb-4 flex items-center justify-center">
              <img 
                src="/log copy.png" 
                alt="Vayara Logo" 
                className="w-16 h-16 object-contain opacity-40"
              />
            </div>
            <p className="text-xl text-gray-500 mb-2">{t('noFavorites')}</p>
            <p className="text-gray-400">Ajoutez des produits à vos favoris pour les retrouver ici</p>
          </div>
        )}
      </div>
    </div>
  );
};