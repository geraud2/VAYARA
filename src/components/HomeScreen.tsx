import React from 'react';
import { QrCode, Search, Heart, History, Crown, User, Settings } from 'lucide-react';
import { useTranslation } from '../hooks/useTranslation';
import { Header } from './Header';

interface HomeScreenProps {
  language: string;
  onNavigate: (screen: string) => void;
  user?: any;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({ language, onNavigate, user }) => {
  const { t } = useTranslation(language);

  // Add logo to welcome section
  const menuItems = [
    {
      id: 'scanner',
      title: t('scanProduct'),
      icon: QrCode,
      color: 'from-pink-400 to-rose-400',
      description: 'Scanner le code-barres'
    },
    {
      id: 'search',
      title: t('searchProduct'),
      icon: Search,
      color: 'from-purple-400 to-pink-400',
      description: 'Recherche manuelle'
    },
    {
      id: 'favorites',
      title: t('myFavorites'),
      icon: Heart,
      color: 'from-rose-400 to-pink-400',
      description: 'Produits sauvegardés'
    },
    {
      id: 'history',
      title: t('scanHistory'),
      icon: History,
      color: 'from-indigo-400 to-purple-400',
      description: 'Historique des scans'
    },
    {
      id: 'custom-lists',
      title: 'Mes listes',
      icon: Heart,
      color: 'from-green-400 to-emerald-400',
      description: 'Listes personnalisées'
    },
    {
      id: 'badges',
      title: 'Mes badges',
      icon: Crown,
      color: 'from-yellow-400 to-amber-400',
      description: 'Récompenses et progression'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-rose-50 pb-20 sm:pb-4">
      <Header showLogo={true}>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => onNavigate('account')}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
          >
            <User className="w-5 h-5 text-gray-600" />
          </button>
          <button
            onClick={() => onNavigate('settings')}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
          >
            <Settings className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </Header>
      
      <div className="p-4 sm:p-6">
        {/* Welcome Section */}
        <div className="text-center mb-6 sm:mb-8">
          <div className="w-24 h-24 sm:w-28 sm:h-28 mx-auto mb-4 bg-transparent flex items-center justify-center">
            <img 
              src="/log copy.png" 
              alt="Vayara Logo" 
              className="w-20 h-20 sm:w-24 sm:h-24 object-contain"
            />
          </div>
          {user?.isAuthenticated ? (
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">
                Bonjour {user.name} ! 👋
              </h1>
              <p className="text-gray-600 text-base sm:text-lg px-4">Prêt à scanner vos produits ?</p>
            </div>
          ) : (
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">
                {t('welcome')}
              </h1>
              <p className="text-gray-600 text-base sm:text-lg px-4">{t('subtitle')}</p>
            </div>
          )}
        </div>

        {/* Menu Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 mb-6">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 group"
              >
                <div className={`w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r ${item.color} rounded-xl sm:rounded-2xl flex items-center justify-center mb-3 sm:mb-4 mx-auto group-hover:scale-110 transition-transform duration-200`}>
                  <Icon className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                </div>
                <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-1">{item.title}</h3>
                <p className="text-xs sm:text-sm text-gray-500">{item.description}</p>
              </button>
            );
          })}
        </div>

        {/* Premium Section */}
        <div className="bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-400 rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-xl">
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-full flex items-center justify-center flex-shrink-0">
              <Crown className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-500" />
            </div>
            <div className="flex-1">
              <h3 className="text-base sm:text-lg font-bold text-gray-800">{t('premiumRecommendations')}</h3>
              <p className="text-xs sm:text-sm text-gray-700 opacity-80">Découvrez des alternatives cruelty-free</p>
            </div>
            <button
              onClick={() => onNavigate('premium-recommendations')}
              className="bg-white text-yellow-600 px-3 py-2 sm:px-4 sm:py-2 rounded-lg sm:rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 text-sm"
            >
              Premium
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};