import React from 'react';
import { Crown, X, Check, Sparkles } from 'lucide-react';
import { useTranslation } from '../hooks/useTranslation';

interface PremiumUpgradeModalProps {
  language: string;
  isOpen: boolean;
  onClose: () => void;
  onUpgrade: () => void;
}

export const PremiumUpgradeModal: React.FC<PremiumUpgradeModalProps> = ({
  language,
  isOpen,
  onClose,
  onUpgrade
}) => {
  const { t } = useTranslation(language);

  if (!isOpen) return null;

  const premiumFeatures = [
    'Suppression de toutes les publicités',
    'Recommandations personnalisées par catégorie',
    'Tableau de bord avec statistiques avancées',
    'Listes personnalisées et favoris avancés',
    'Recommandations intelligentes basées sur l\'historique',
    'Système de gamification avec badges',
    'Mode hors ligne complet',
    'Support prioritaire'
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 p-6 text-center relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors"
          >
            <X className="w-5 h-5 text-white" />
          </button>
          <Crown className="w-12 h-12 text-white mx-auto mb-3" />
          <h2 className="text-2xl font-bold text-white mb-2">Vayara Premium</h2>
          <p className="text-white/90">Débloquez toutes les fonctionnalités</p>
        </div>

        {/* Pricing */}
        <div className="p-6 text-center border-b border-gray-100">
          <div className="bg-gradient-to-r from-yellow-100 to-amber-100 rounded-xl p-4 mb-4">
            <p className="text-3xl font-bold text-gray-800">3,99 €</p>
            <p className="text-gray-600">par mois</p>
          </div>
          <p className="text-sm text-gray-500">Annulable à tout moment</p>
        </div>

        {/* Features */}
        <div className="p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center space-x-2">
            <Sparkles className="w-5 h-5 text-yellow-500" />
            <span>Fonctionnalités Premium</span>
          </h3>
          <div className="space-y-3">
            {premiumFeatures.map((feature, index) => (
              <div key={index} className="flex items-start space-x-3">
                <div className="w-5 h-5 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full flex items-center justify-center mt-0.5">
                  <Check className="w-3 h-3 text-white" />
                </div>
                <p className="text-gray-700 text-sm">{feature}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="p-6 pt-0">
          <button
            onClick={onUpgrade}
            className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 text-white font-semibold py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 mb-3"
          >
            Commencer l'essai gratuit
          </button>
          <p className="text-xs text-gray-500 text-center">
            7 jours d'essai gratuit, puis 3,99 €/mois
          </p>
        </div>
      </div>
    </div>
  );
};