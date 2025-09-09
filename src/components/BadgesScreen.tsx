import React from 'react';
import { Award, Lock } from 'lucide-react';
import { useTranslation } from '../hooks/useTranslation';
import { Header } from './Header';
import { mockBadges } from '../utils/mockData';

interface BadgesScreenProps {
  language: string;
  onBack: () => void;
}

export const BadgesScreen: React.FC<BadgesScreenProps> = ({ language, onBack }) => {
  const { t } = useTranslation(language);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-rose-50">
      <Header title="Mes badges" showBackButton onBack={onBack} />
      
      <div className="p-4">
        {/* Progress Overview */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
          <div className="text-center">
            <Award className="w-12 h-12 text-yellow-500 mx-auto mb-3" />
            <h2 className="text-xl font-bold text-gray-800 mb-2">Progression</h2>
            <p className="text-gray-600 mb-4">
              {mockBadges.filter(b => b.unlocked).length} / {mockBadges.length} badges débloqués
            </p>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div 
                className="bg-gradient-to-r from-yellow-400 to-amber-400 h-3 rounded-full transition-all duration-500"
                style={{ width: `${(mockBadges.filter(b => b.unlocked).length / mockBadges.length) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Badges Grid */}
        <div className="grid grid-cols-2 gap-4">
          {mockBadges.map((badge) => (
            <div
              key={badge.id}
              className={`bg-white rounded-xl shadow-lg p-6 text-center transition-all duration-200 ${
                badge.unlocked 
                  ? 'transform hover:scale-105' 
                  : 'opacity-60'
              }`}
            >
              <div className={`relative inline-block mb-3 ${!badge.unlocked ? 'filter grayscale' : ''}`}>
                <div className="text-4xl mb-2">{badge.icon}</div>
                {!badge.unlocked && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Lock className="w-6 h-6 text-gray-400" />
                  </div>
                )}
              </div>
              
              <h3 className={`font-semibold mb-2 ${
                badge.unlocked ? 'text-gray-800' : 'text-gray-500'
              }`}>
                {badge.name}
              </h3>
              
              <p className={`text-sm ${
                badge.unlocked ? 'text-gray-600' : 'text-gray-400'
              }`}>
                {badge.description}
              </p>
              
              {badge.unlocked && (
                <div className="mt-3 px-3 py-1 bg-gradient-to-r from-green-100 to-emerald-100 rounded-full">
                  <span className="text-xs font-medium text-green-700">Débloqué</span>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Next Badge */}
        <div className="bg-gradient-to-r from-purple-400 to-pink-400 rounded-2xl p-6 mt-6 text-white text-center">
          <h3 className="text-lg font-semibold mb-2">Prochain objectif</h3>
          <div className="text-3xl mb-2">🏆</div>
          <p className="text-sm opacity-90">
            Plus que 23 scans pour débloquer le badge "Champion"
          </p>
        </div>
      </div>
    </div>
  );
};