import React from 'react';
import { Home, Search, Heart, History, User } from 'lucide-react';
import { useTranslation } from '../hooks/useTranslation';

interface BottomNavigationProps {
  language: string;
  currentScreen: string;
  onNavigate: (screen: string) => void;
}

export const BottomNavigation: React.FC<BottomNavigationProps> = ({
  language,
  currentScreen,
  onNavigate
}) => {
  const { t } = useTranslation(language);

  const navItems = [
    {
      id: 'home',
      title: 'Accueil',
      icon: Home,
      screen: 'home'
    },
    {
      id: 'search',
      title: 'Recherche',
      icon: Search,
      screen: 'search'
    },
    {
      id: 'favorites',
      title: 'Favoris',
      icon: Heart,
      screen: 'favorites'
    },
    {
      id: 'history',
      title: 'Historique',
      icon: History,
      screen: 'history'
    },
    {
      id: 'account',
      title: 'Profil',
      icon: User,
      screen: 'account'
    }
  ];

  // Don't show bottom nav on certain screens
  const hideBottomNav = [
    'splash',
    'language-selection',
    'scanner',
    'product-detail',
    'settings',
    'premium-dashboard',
    'faq-support',
    'custom-lists',
    'badges',
    'premium-recommendations'
  ].includes(currentScreen);

  if (hideBottomNav) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50">
      <div className="flex items-center justify-around py-2 px-4 max-w-md mx-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentScreen === item.screen;
          
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.screen)}
              className={`flex flex-col items-center justify-center py-2 px-3 rounded-xl transition-all duration-200 min-w-0 flex-1 ${
                isActive 
                  ? 'bg-gradient-to-r from-pink-100 to-rose-100 text-pink-600' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <Icon className={`w-5 h-5 mb-1 ${isActive ? 'text-pink-600' : 'text-gray-500'}`} />
              <span className={`text-xs font-medium truncate ${
                isActive ? 'text-pink-600' : 'text-gray-500'
              }`}>
                {item.title}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};