import React, { useState, useEffect } from 'react';
import { BarChart3, TrendingUp, Target, Calendar, Award, Crown } from 'lucide-react';
import { useTranslation } from '../hooks/useTranslation';
import { Header } from './Header';
import { storage } from '../utils/storage';
import type { UserStats } from '../types';

interface PremiumDashboardScreenProps {
  language: string;
  onBack: () => void;
}

export const PremiumDashboardScreen: React.FC<PremiumDashboardScreenProps> = ({ 
  language, 
  onBack 
}) => {
  const { t } = useTranslation(language);
  const [stats, setStats] = useState<UserStats>({
    totalScans: 0,
    crueltyFreePercentage: 0,
    favoriteProducts: 0,
    monthlyScans: 0,
    streak: 0
  });

  useEffect(() => {
    // Simulate loading user stats
    const mockStats: UserStats = {
      totalScans: 127,
      crueltyFreePercentage: 73,
      favoriteProducts: storage.favorites.get().length,
      monthlyScans: 34,
      streak: 12
    };
    setStats(mockStats);
    storage.stats.update(mockStats);
  }, []);

  const statCards = [
    {
      title: t('totalScans'),
      value: stats.totalScans,
      icon: BarChart3,
      color: 'from-pink-400 to-rose-400',
      change: '+12 ce mois'
    },
    {
      title: t('crueltyFreeRate'),
      value: `${stats.crueltyFreePercentage}%`,
      icon: Award,
      color: 'from-green-400 to-emerald-400',
      change: '+5% vs mois dernier'
    },
    {
      title: t('monthlyProgress'),
      value: stats.monthlyScans,
      icon: TrendingUp,
      color: 'from-purple-400 to-pink-400',
      change: 'Objectif: 50'
    },
    {
      title: t('currentStreak'),
      value: `${stats.streak} ${t('days')}`,
      icon: Target,
      color: 'from-yellow-400 to-amber-400',
      change: 'Record personnel!'
    }
  ];

  const monthlyData = [
    { month: 'Jan', scans: 15, crueltyFree: 8 },
    { month: 'Fév', scans: 23, crueltyFree: 16 },
    { month: 'Mar', scans: 31, crueltyFree: 24 },
    { month: 'Avr', scans: 28, crueltyFree: 21 },
    { month: 'Mai', scans: 34, crueltyFree: 26 }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-rose-50">
      <Header title={t('premiumDashboard')} showBackButton onBack={onBack} />
      
      <div className="p-4 space-y-6">
        {/* Premium Badge */}
        <div className="bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-400 rounded-2xl p-4 text-center">
          <Crown className="w-8 h-8 text-white mx-auto mb-2" />
          <div className="w-16 h-16 mx-auto mb-2 flex items-center justify-center">
            <img 
              src="/log copy.png" 
              alt="Vayara Logo" 
              className="w-14 h-14 object-contain"
            />
          </div>
          <h2 className="text-lg font-bold text-gray-800">{t('yourStats')}</h2>
          <p className="text-gray-700 opacity-90">Tableau de bord Premium</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {statCards.map((card, index) => {
            const Icon = card.icon;
            return (
              <div key={index} className="bg-white rounded-2xl shadow-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 bg-gradient-to-r ${card.color} rounded-xl flex items-center justify-center`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-gray-800">{card.value}</p>
                    <p className="text-sm text-gray-600">{card.title}</p>
                  </div>
                </div>
                <p className="text-xs text-gray-500">{card.change}</p>
              </div>
            );
          })}
        </div>

        {/* Progress Chart */}
        <div className="bg-white rounded-2xl shadow-xl p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-6 flex items-center space-x-2">
            <Calendar className="w-5 h-5" />
            <span>Évolution mensuelle</span>
          </h3>
          
          <div className="space-y-4">
            {monthlyData.map((data, index) => {
              const crueltyFreeRate = Math.round((data.crueltyFree / data.scans) * 100);
              return (
                <div key={index} className="flex items-center space-x-4">
                  <div className="w-12 text-sm font-medium text-gray-600">{data.month}</div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm text-gray-600">{data.scans} scans</span>
                      <span className="text-sm font-medium text-green-600">{crueltyFreeRate}% CF</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-pink-400 to-rose-400 h-2 rounded-full"
                        style={{ width: `${(data.scans / 40) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Achievements */}
        <div className="bg-white rounded-2xl shadow-xl p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Réalisations</h3>
          <div className="grid grid-cols-3 gap-4">
            {[
              { title: 'Premier scan', icon: '🎯', unlocked: true },
              { title: '50 scans', icon: '🏆', unlocked: true },
              { title: '100 scans', icon: '🌟', unlocked: true },
              { title: 'Série de 7j', icon: '🔥', unlocked: true },
              { title: '80% CF', icon: '💚', unlocked: false },
              { title: '200 scans', icon: '👑', unlocked: false }
            ].map((achievement, index) => (
              <div 
                key={index}
                className={`text-center p-4 rounded-xl ${
                  achievement.unlocked 
                    ? 'bg-gradient-to-r from-yellow-100 to-amber-100' 
                    : 'bg-gray-100'
                }`}
              >
                <div className="text-2xl mb-2">{achievement.icon}</div>
                <p className={`text-xs font-medium ${
                  achievement.unlocked ? 'text-gray-800' : 'text-gray-500'
                }`}>
                  {achievement.title}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Weekly Goal */}
        <div className="bg-gradient-to-r from-purple-400 to-pink-400 rounded-2xl p-6 text-white">
          <h3 className="text-lg font-semibold mb-4">Objectif hebdomadaire</h3>
          <div className="flex items-center justify-between mb-4">
            <span>7 scans cette semaine</span>
            <span className="font-bold">5/7</span>
          </div>
          <div className="w-full bg-white/20 rounded-full h-3">
            <div 
              className="bg-white h-3 rounded-full transition-all duration-500"
              style={{ width: '71%' }}
            ></div>
          </div>
          <p className="text-sm opacity-90 mt-2">Plus que 2 scans pour atteindre votre objectif!</p>
        </div>
      </div>
    </div>
  );
};