import React, { useState } from 'react';
import { HelpCircle, MessageCircle, Mail, Phone, ChevronDown, ChevronUp } from 'lucide-react';
import { useTranslation } from '../hooks/useTranslation';
import { Header } from './Header';

interface FAQSupportScreenProps {
  language: string;
  onBack: () => void;
}

export const FAQSupportScreen: React.FC<FAQSupportScreenProps> = ({ 
  language, 
  onBack 
}) => {
  const { t } = useTranslation(language);
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);

  const faqItems = [
    {
      question: "Comment scanner un produit ?",
      answer: "Appuyez sur 'Scanner un produit' depuis l'accueil, pointez votre appareil photo vers le code-barres du produit. L'application reconnaîtra automatiquement le code et affichera les informations."
    },
    {
      question: "Que signifie 'cruelty-free' ?",
      answer: "Un produit cruelty-free signifie qu'il n'a pas été testé sur les animaux, ni le produit fini ni ses ingrédients. Vayara vérifie cette information auprès d'organismes de certification reconnus."
    },
    {
      question: "Comment fonctionne la notation A-E ?",
      answer: "La notation évalue la composition du produit : A (excellent) pour des ingrédients naturels et sains, E (médiocre) pour des compositions avec des ingrédients controversés."
    },
    {
      question: "Puis-je utiliser l'app sans connexion internet ?",
      answer: "Certaines fonctionnalités de base sont disponibles hors ligne, mais pour obtenir les informations les plus récentes sur les produits, une connexion internet est recommandée."
    },
    {
      question: "Comment ajouter un produit manquant ?",
      answer: "Si un produit n'est pas dans notre base de données, vous pouvez nous le signaler via le support. Notre équipe l'ajoutera après vérification."
    },
    {
      question: "Que propose l'abonnement Premium ?",
      answer: "Premium offre des recommandations personnalisées, un historique illimité, des statistiques détaillées, et l'accès prioritaire aux nouvelles fonctionnalités."
    }
  ];

  const supportOptions = [
    {
      title: 'Chat en direct',
      description: 'Réponse immédiate',
      icon: MessageCircle,
      color: 'from-blue-400 to-blue-500',
      available: true
    },
    {
      title: 'Email',
      description: 'support@vayara.com',
      icon: Mail,
      color: 'from-green-400 to-green-500',
      available: true
    },
    {
      title: 'Téléphone',
      description: '+33 1 23 45 67 89',
      icon: Phone,
      color: 'from-purple-400 to-purple-500',
      available: false
    }
  ];

  const toggleFAQ = (index: number) => {
    setExpandedFAQ(expandedFAQ === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-rose-50">
      <Header title={t('faqSupport')} showBackButton onBack={onBack} />
      
      <div className="p-4 space-y-6">
        {/* FAQ Section */}
        <div className="bg-white rounded-2xl shadow-xl p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center space-x-2">
            <HelpCircle className="w-5 h-5" />
            <span>{t('frequentlyAsked')}</span>
          </h3>
          
          <div className="space-y-3">
            {faqItems.map((item, index) => (
              <div key={index} className="border border-gray-100 rounded-xl overflow-hidden">
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors"
                >
                  <span className="font-medium text-gray-800">{item.question}</span>
                  {expandedFAQ === index ? (
                    <ChevronUp className="w-5 h-5 text-gray-500" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-500" />
                  )}
                </button>
                {expandedFAQ === index && (
                  <div className="px-4 pb-4">
                    <p className="text-gray-600 leading-relaxed">{item.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Contact Support */}
        <div className="bg-white rounded-2xl shadow-xl p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">{t('contactSupport')}</h3>
          
          <div className="space-y-4">
            {supportOptions.map((option, index) => {
              const Icon = option.icon;
              return (
                <button
                  key={index}
                  disabled={!option.available}
                  className={`w-full flex items-center space-x-4 p-4 rounded-xl transition-all duration-200 ${
                    option.available 
                      ? 'hover:shadow-lg transform hover:scale-105' 
                      : 'opacity-50 cursor-not-allowed'
                  }`}
                >
                  <div className={`w-12 h-12 bg-gradient-to-r ${option.color} rounded-xl flex items-center justify-center`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1 text-left">
                    <p className="font-semibold text-gray-800">{option.title}</p>
                    <p className="text-sm text-gray-600">{option.description}</p>
                    {!option.available && (
                      <p className="text-xs text-red-500">Bientôt disponible</p>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Help Center */}
        <div className="bg-gradient-to-r from-pink-400 to-rose-400 rounded-2xl p-6 text-white">
          <h3 className="text-lg font-semibold mb-2">{t('helpCenter')}</h3>
          <div className="w-16 h-16 mx-auto mb-3 flex items-center justify-center">
            <img 
              src="/log copy.png" 
              alt="Vayara Logo" 
              className="w-14 h-14 object-contain"
            />
          </div>
          <p className="text-sm opacity-90 mb-4">
            Consultez notre documentation complète et nos guides d'utilisation
          </p>
          <button className="bg-white text-pink-600 px-6 py-2 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105">
            Accéder au centre d'aide
          </button>
        </div>

        {/* Quick Tips */}
        <div className="bg-white rounded-2xl shadow-xl p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Conseils rapides</h3>
          <div className="space-y-3">
            {[
              "Assurez-vous que le code-barres est bien éclairé lors du scan",
              "Utilisez la recherche manuelle si le scan ne fonctionne pas",
              "Ajoutez vos produits favoris pour un accès rapide",
              "Consultez régulièrement vos statistiques Premium"
            ].map((tip, index) => (
              <div key={index} className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-gradient-to-r from-pink-400 to-rose-400 rounded-full flex items-center justify-center mt-0.5">
                  <span className="text-white text-xs font-bold">{index + 1}</span>
                </div>
                <p className="text-gray-600 text-sm">{tip}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};