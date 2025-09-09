import React from 'react';
import { Crown, Star, Sparkles, Filter, Grid, List as ListIcon } from 'lucide-react';
import { useTranslation } from '../hooks/useTranslation';
import { Header } from './Header';
import { mockProducts, getRecommendations } from '../utils/mockData';
import { PremiumUpgradeModal } from './PremiumUpgradeModal';
import type { Product } from '../types';

interface PremiumRecommendationsScreenProps {
  language: string;
  onBack: () => void;
  onProductSelect: (product: Product) => void;
}

export const PremiumRecommendationsScreen: React.FC<PremiumRecommendationsScreenProps> = ({ 
  language, 
  onBack, 
  onProductSelect 
}) => {
  const { t } = useTranslation(language);
  const [showUpgradeModal, setShowUpgradeModal] = React.useState(false);
  const [selectedCategory, setSelectedCategory] = React.useState('all');
  const [viewMode, setViewMode] = React.useState<'grid' | 'list'>('grid');
  
  const categories = [
    { id: 'all', name: 'Tous', icon: '🌟' },
    { id: 'makeup', name: 'Maquillage', icon: '💄' },
    { id: 'skincare', name: 'Soins', icon: '🧴' },
    { id: 'hair', name: 'Capillaires', icon: '💇‍♀️' },
    { id: 'fragrance', name: 'Parfums', icon: '🌸' }
  ];

  const recommendations = getRecommendations(selectedCategory === 'all' ? undefined : selectedCategory);

  const handleUpgrade = () => {
    setShowUpgradeModal(false);
    // Simulate upgrade
    alert('Redirection vers le paiement...');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-rose-50">
      <Header title={t('premiumTitle')} showBackButton onBack={onBack} />
      
      <div className="p-4">
        {/* Category Filter */}
        <div className="bg-white rounded-2xl shadow-xl p-4 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-800">Catégories</h3>
            <div className="flex space-x-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-pink-100 text-pink-600' : 'text-gray-400'}`}
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-pink-100 text-pink-600' : 'text-gray-400'}`}
              >
                <ListIcon className="w-4 h-4" />
              </button>
            </div>
          </div>
          <div className="flex space-x-2 overflow-x-auto">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex-shrink-0 px-4 py-2 rounded-xl transition-colors ${
                  selectedCategory === category.id
                    ? 'bg-gradient-to-r from-pink-400 to-rose-400 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <span className="mr-2">{category.icon}</span>
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* Premium CTA */}
        <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-2xl p-6 mb-6 text-center">
          <Crown className="w-10 h-10 text-white mx-auto mb-3" />
          <h3 className="text-xl font-bold text-white mb-2">Recommandations Premium</h3>
          <p className="text-white/90 mb-4">3,99 €/mois - Annulable à tout moment</p>
          <button
            onClick={() => setShowUpgradeModal(true)}
            className="bg-white text-yellow-600 font-semibold px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
          >
            Essai gratuit 7 jours
          </button>
        </div>

        {/* Recommendations */}
        <div className={viewMode === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 gap-4' : 'space-y-4'}>
          {recommendations.map((product) => (
            <button
              key={product.id}
              onClick={() => onProductSelect(product)}
              className="bg-white rounded-xl shadow-lg p-4 hover:shadow-xl transition-all duration-200 transform hover:scale-105 text-left w-full"
            >
              <div className={viewMode === 'grid' ? 'space-y-3' : 'flex space-x-4'}>
                <img
                  src={product.image || 'https://images.pexels.com/photos/4465124/pexels-photo-4465124.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'}
                  alt={product.name}
                  className={viewMode === 'grid' ? 'w-full h-32 object-cover rounded-lg' : 'w-16 h-16 object-cover rounded-lg'}
                />
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-800 mb-1">{product.name}</h4>
                  <p className="text-gray-600 mb-2">{product.brand}</p>
                  <div className="flex items-center space-x-2">
                    <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                      ✓ Certifié
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

        <PremiumUpgradeModal
          language={language}
          isOpen={showUpgradeModal}
          onClose={() => setShowUpgradeModal(false)}
          onUpgrade={handleUpgrade}
        />
      </div>
    </div>
  );
};