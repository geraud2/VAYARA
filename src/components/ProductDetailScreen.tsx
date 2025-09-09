import React, { useState, useEffect } from 'react';
import { Heart, Shield, ShieldAlert, HelpCircle, Sparkles } from 'lucide-react';
import { useTranslation } from '../hooks/useTranslation';
import { Header } from './Header';
import { storage } from '../utils/storage';
import type { Product } from '../types';

interface ProductDetailScreenProps {
  language: string;
  product: Product;
  onBack: () => void;
  onFindAlternatives: () => void;
}

export const ProductDetailScreen: React.FC<ProductDetailScreenProps> = ({
  language,
  product,
  onBack,
  onFindAlternatives
}) => {
  const { t } = useTranslation(language);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const favorites = storage.favorites.get();
    setIsFavorite(favorites.includes(product.id));
    
    // Add to history
    storage.history.add(product.id);
  }, [product.id]);

  const toggleFavorite = () => {
    const newIsFavorite = storage.favorites.toggle(product.id);
    setIsFavorite(newIsFavorite);
  };

  const getStatusIcon = (status: Product['crueltyFree']) => {
    switch (status) {
      case 'certified':
        return <Shield className="w-6 h-6 text-green-500" />;
      case 'not-certified':
        return <ShieldAlert className="w-6 h-6 text-red-500" />;
      default:
        return <HelpCircle className="w-6 h-6 text-yellow-500" />;
    }
  };

  const getStatusColor = (status: Product['crueltyFree']) => {
    switch (status) {
      case 'certified':
        return 'from-green-400 to-emerald-400';
      case 'not-certified':
        return 'from-red-400 to-rose-400';
      default:
        return 'from-yellow-400 to-amber-400';
    }
  };

  const getGradeColor = (grade: string) => {
    const colors = {
      'A': 'from-green-400 to-emerald-400',
      'B': 'from-lime-400 to-green-400',
      'C': 'from-yellow-400 to-amber-400',
      'D': 'from-orange-400 to-red-400',
      'E': 'from-red-400 to-rose-400'
    };
    return colors[grade as keyof typeof colors] || 'from-gray-400 to-gray-500';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-rose-50">
      <Header showBackButton onBack={onBack} />
      
      <div className="p-4 space-y-6">
        {/* Product Image & Basic Info */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="relative">
            <div className="absolute top-4 left-4 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center">
              <img 
                src="/log copy.png" 
                alt="Vayara Logo" 
                className="w-10 h-10 object-contain"
              />
            </div>
            <img
              src={product.image || 'https://images.pexels.com/photos/4465124/pexels-photo-4465124.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'}
              alt={product.name}
              className="w-full h-48 object-cover"
            />
            <button
              onClick={toggleFavorite}
              className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-110"
            >
              <Heart 
                className={`w-5 h-5 ${isFavorite ? 'text-red-500 fill-current' : 'text-gray-400'}`}
              />
            </button>
          </div>
          
          <div className="p-6">
            <h1 className="text-2xl font-bold text-gray-800 mb-2">{product.name}</h1>
            <p className="text-gray-600 text-lg mb-4">{product.brand}</p>
            {product.description && (
              <p className="text-gray-600">{product.description}</p>
            )}
          </div>
        </div>

        {/* Cruelty-Free Status */}
        <div className="bg-white rounded-2xl shadow-xl p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">{t('crueltyFreeStatus')}</h2>
          
          <div className={`bg-gradient-to-r ${getStatusColor(product.crueltyFree)} rounded-xl p-4 text-white`}>
            <div className="flex items-center space-x-3">
              {getStatusIcon(product.crueltyFree)}
              <div>
                <p className="font-semibold text-lg">
                  {t(product.crueltyFree === 'certified' ? 'certified' : 
                     product.crueltyFree === 'not-certified' ? 'notCertified' : 'unknown')}
                </p>
                <p className="text-sm opacity-90">
                  {product.crueltyFree === 'certified' && 'Ce produit est certifié sans cruauté'}
                  {product.crueltyFree === 'not-certified' && 'Ce produit n\'est pas certifié sans cruauté'}
                  {product.crueltyFree === 'unknown' && 'Statut de certification inconnu'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Composition Grade */}
        <div className="bg-white rounded-2xl shadow-xl p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">{t('composition')}</h2>
          
          <div className={`bg-gradient-to-r ${getGradeColor(product.compositionGrade)} rounded-xl p-4 text-white mb-4`}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90">Note de composition</p>
                <p className="text-3xl font-bold">{product.compositionGrade}</p>
              </div>
              <div className="text-right">
                <p className="text-sm opacity-90">Qualité</p>
                <p className="font-semibold">
                  {product.compositionGrade === 'A' && 'Excellente'}
                  {product.compositionGrade === 'B' && 'Très bonne'}
                  {product.compositionGrade === 'C' && 'Bonne'}
                  {product.compositionGrade === 'D' && 'Passable'}
                  {product.compositionGrade === 'E' && 'Médiocre'}
                </p>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold text-gray-800 mb-2">{t('ingredients')}</h3>
            <div className="flex flex-wrap gap-2">
              {product.ingredients.map((ingredient, index) => (
                <span
                  key={index}
                  className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                >
                  {ingredient}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="space-y-3">
          <button
            onClick={onFindAlternatives}
            className="w-full bg-gradient-to-r from-purple-400 to-pink-400 text-white font-semibold py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 flex items-center justify-center space-x-2"
          >
            <Sparkles className="w-5 h-5" />
            <span>{t('findAlternatives')}</span>
          </button>
          
          <button
            onClick={toggleFavorite}
            className={`w-full font-semibold py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 flex items-center justify-center space-x-2 ${
              isFavorite 
                ? 'bg-gradient-to-r from-red-400 to-rose-400 text-white'
                : 'bg-white text-gray-700 border-2 border-gray-200'
            }`}
          >
            <Heart className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`} />
            <span>{isFavorite ? t('removeFromFavorites') : t('addToFavorites')}</span>
          </button>
        </div>
      </div>
    </div>
  );
};