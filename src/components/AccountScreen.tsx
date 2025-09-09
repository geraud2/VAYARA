import React, { useState, useEffect } from 'react';
import { User, Crown, CreditCard, Calendar, Star, ChevronRight } from 'lucide-react';
import { useTranslation } from '../hooks/useTranslation';
import { Header } from './Header';
import { storage } from '../utils/storage';
import type { Subscription } from '../types';

interface AccountScreenProps {
  language: string;
  onBack: () => void;
  onNavigate: (screen: string) => void;
  user?: any;
  onLogout: () => void;
}

export const AccountScreen: React.FC<AccountScreenProps> = ({ 
  language, 
  onBack, 
  onNavigate,
  user,
  onLogout
}) => {
  const { t } = useTranslation(language);
  const [subscription, setSubscription] = useState<Subscription>({ type: 'free', features: [] });
  const [stats, setStats] = useState({ totalScans: 0, favoriteProducts: 0 });

  useEffect(() => {
    setSubscription(storage.subscription.get());
    const userStats = storage.stats.get();
    const favorites = storage.favorites.get();
    setStats({
      totalScans: userStats.totalScans || 0,
      favoriteProducts: favorites.length
    });
  }, []);

  const accountSections = [
    {
      id: 'subscription',
      title: t('subscription'),
      icon: Crown,
      description: subscription.type === 'premium' ? 'Premium actif' : 'Gratuit',
      color: subscription.type === 'premium' ? 'text-yellow-600' : 'text-gray-600'
    },
    {
      id: 'premium-dashboard',
      title: t('premiumDashboard'),
      icon: Star,
      description: 'Vos statistiques détaillées',
      color: 'text-purple-600'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-rose-50 pb-20 sm:pb-4">
      <Header title={t('myAccount')} showBackButton onBack={onBack} />
      
      <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
        {/* Profile Section */}
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl p-4 sm:p-6">
          <div className="flex items-center space-x-4 mb-6">
            <div className="w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center flex-shrink-0">
              <img 
                src="/log copy.png" 
                alt="Vayara Logo" 
                className="w-14 h-14 sm:w-18 sm:h-18 object-contain"
              />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-gray-800">
                {user?.isAuthenticated ? user.name : 'Utilisateur Vayara'}
              </h2>
              <p className="text-sm sm:text-base text-gray-600">
                {user?.isAuthenticated ? user.email : 'Membre depuis janvier 2024'}
              </p>
              {user?.isAuthenticated && (
                <span className="inline-block px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full mt-1">
                  Connecté
                </span>
              )}
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            <div className="bg-gradient-to-r from-pink-100 to-rose-100 rounded-lg sm:rounded-xl p-3 sm:p-4 text-center">
              <p className="text-xl sm:text-2xl font-bold text-pink-600">{stats.totalScans}</p>
              <p className="text-sm text-gray-600">Produits scannés</p>
            </div>
            <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-lg sm:rounded-xl p-3 sm:p-4 text-center">
              <p className="text-xl sm:text-2xl font-bold text-purple-600">{stats.favoriteProducts}</p>
              <p className="text-sm text-gray-600">Favoris</p>
            </div>
          </div>
        </div>

        {/* Subscription Status */}
        <div className={`rounded-2xl shadow-xl p-6 ${
          subscription.type === 'premium' 
            ? 'bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-400' 
            : 'bg-white'
        }`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Crown className={`w-8 h-8 ${
                subscription.type === 'premium' ? 'text-white' : 'text-gray-400'
              }`} />
              <div>
                <h3 className={`text-lg font-bold ${
                  subscription.type === 'premium' ? 'text-white' : 'text-gray-800'
                }`}>
                  {subscription.type === 'premium' ? 'Premium' : 'Gratuit'}
                </h3>
                <p className={`text-sm ${
                  subscription.type === 'premium' ? 'text-white opacity-90' : 'text-gray-600'
                }`}>
                  {subscription.type === 'premium' 
                    ? 'Accès complet aux fonctionnalités' 
                    : 'Fonctionnalités limitées'
                  }
                </p>
              </div>
            </div>
            {subscription.type === 'free' && (
              <button className="bg-gradient-to-r from-pink-400 to-rose-400 text-white px-4 py-2 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105">
                {t('upgradeToPremium')}
              </button>
            )}
          </div>
        </div>

        {/* Account Sections */}
        <div className="bg-white rounded-2xl shadow-xl p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Gestion du compte</h3>
          <div className="space-y-3">
            {accountSections.map((section) => {
              const Icon = section.icon;
              return (
                <button
                  key={section.id}
                  onClick={() => onNavigate(section.id)}
                  className="w-full flex items-center justify-between p-4 rounded-xl hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <Icon className={`w-5 h-5 ${section.color}`} />
                    <div className="text-left">
                      <p className="font-medium text-gray-800">{section.title}</p>
                      <p className="text-sm text-gray-500">{section.description}</p>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </button>
              );
            })}
          </div>
        </div>

        {/* Payment Methods (Premium) */}
        {subscription.type === 'premium' && (
          <div className="bg-white rounded-2xl shadow-xl p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Méthodes de paiement</h3>
            <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-xl">
              <CreditCard className="w-6 h-6 text-gray-600" />
              <div className="flex-1">
                <p className="font-medium text-gray-800">•••• •••• •••• 1234</p>
                <p className="text-sm text-gray-500">Expire 12/25</p>
              </div>
              <button className="text-pink-600 font-medium">Modifier</button>
            </div>
          </div>
        )}

        {/* Logout */}
        {user?.isAuthenticated ? (
          <button 
            onClick={onLogout}
            className="w-full bg-white border-2 border-red-200 text-red-600 font-semibold py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
          >
            {t('logout')}
          </button>
        ) : (
          <button 
            onClick={() => onNavigate('login')}
            className="w-full bg-gradient-to-r from-pink-400 to-rose-400 text-white font-semibold py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
          >
            Se connecter
          </button>
        )}
      </div>
    </div>
  );
};