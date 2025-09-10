import React, { useState, useEffect } from 'react';
import { QrCode, Search, Heart, History, Crown, User, Settings, Star, TrendingUp, Clock, BookOpen, Zap, Trees, Recycle, Droplets, Sparkles } from 'lucide-react';
import { useTranslation } from '../hooks/useTranslation';
import { Header } from './Header';

interface HomeScreenProps {
  language: string;
  onNavigate: (screen: string) => void;
  user?: any;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({ language, onNavigate, user }) => {
  const { t } = useTranslation(language);
  const [dailyTip, setDailyTip] = useState('');
  const [trendingTopic, setTrendingTopic] = useState('');

  // Simulation de données dynamiques
  useEffect(() => {
    // Conseils du jour
    const tips = [
      "Saviez-vous que plus de 500 marques de beauté sont certifiées cruelty-free?",
      "Les produits avec le logo Leaping Bunny sont garantis sans tests sur animaux",
      "Optez pour des emballages recyclés pour réduire votre impact environnemental",
      "Vérifiez toujours la liste des ingrédients pour repérer les composants d'origine animale"
    ];
    
    // Sujets tendance
    const trends = [
      "Les sérums vegan à la vitamine C",
      "Shampoings solides sans plastique",
      "Marques françaises cruelty-free",
      "Crèmes solaires respectueuses des océans"
    ];
    
    // Sélection aléatoire
    setDailyTip(tips[Math.floor(Math.random() * tips.length)]);
    setTrendingTopic(trends[Math.floor(Math.random() * trends.length)]);
    
    // Changer le conseil toutes les 60 secondes pour la démonstration
    const tipInterval = setInterval(() => {
      setDailyTip(tips[Math.floor(Math.random() * tips.length)]);
    }, 60000);
    
    return () => clearInterval(tipInterval);
  }, []);

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

  // Statistiques environnementales (simulées)
  const environmentalStats = {
    savedAnimals: 42,
    plasticReduction: 28, // en grammes
    co2Reduction: 15, // en kg
    waterSaved: 120 // en litres
  };

  // Marques partenaires (publicité)
  const partnerBrands = [
    {
      name: "EcoBeauty",
      description: "Soins naturels et vegan",
      discount: "15% de réduction avec le code VAYARA15"
    },
    {
      name: "GreenGlow",
      description: "Maquillage éthique",
      discount: "Livraison offerte dès 30€ d'achat"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-rose-50 pb-20 sm:pb-4">
      <Header showLogo={true}> {/* On cache le logo du header pour éviter la duplication */}
        <div className="flex items-center space-x-2">
          {/* <button
            onClick={() => onNavigate('account')}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
          >
            <User className="w-5 h-5 text-gray-600" />
          </button> */}
          {/* <button
            onClick={() => onNavigate('settings')}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
          >
            <Settings className="w-5 h-5 text-gray-600" />
          </button> */}
        </div>
      </Header>
      
      <div className="p-4 sm:p-6">
        {/* Welcome Section avec logo TRÈS GRAND */}
        <div className="text-center mb-4 sm:mb-6">
          <div className="w-64 h-64 sm:w-78 sm:h-78 mx-auto mb-4 bg-transparent flex items-center justify-center">
            <img 
              src="/log copy.png" 
              alt="Vayara Logo" 
              className="w-full h-full object-contain drop-shadow-lg"
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

        {/* Bannière publicitaire discrète */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-3 mb-6 text-center border border-blue-100">
          <p className="text-xs text-blue-700">
            <span className="font-medium">Découvrez nos marques partenaires engagées</span> ↓
          </p>
        </div>

        {/* Daily Tip Section */}
        <div className="bg-white rounded-xl p-4 mb-6 shadow-lg border border-pink-100">
          <div className="flex items-start">
            <div className="bg-pink-100 p-2 rounded-lg mr-3 flex-shrink-0">
              <Zap className="w-5 h-5 text-pink-500" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 mb-1">Conseil du jour</h3>
              <p className="text-sm text-gray-600">{dailyTip}</p>
            </div>
          </div>
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

        {/* Section d'impact positif améliorée */}
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-5 mb-6 shadow-lg border border-green-100">
          <h3 className="font-semibold text-gray-800 mb-4 text-center">Votre impact positif 🌱</h3>
          
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="bg-white p-3 rounded-lg text-center shadow-sm">
              <div className="flex justify-center mb-2">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-green-600" />
                </div>
              </div>
              <div className="text-xl font-bold text-green-600">{environmentalStats.savedAnimals}</div>
              <div className="text-xs text-gray-600 mt-1">Animaux épargnés</div>
            </div>
            
            <div className="bg-white p-3 rounded-lg text-center shadow-sm">
              <div className="flex justify-center mb-2">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <Recycle className="w-5 h-5 text-blue-600" />
                </div>
              </div>
              <div className="text-xl font-bold text-blue-600">{environmentalStats.plasticReduction}g</div>
              <div className="text-xs text-gray-600 mt-1">Plastique évité</div>
            </div>
            
            <div className="bg-white p-3 rounded-lg text-center shadow-sm">
              <div className="flex justify-center mb-2">
                <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center">
                  <Trees className="w-5 h-5 text-amber-600" />
                </div>
              </div>
              <div className="text-xl font-bold text-amber-600">{environmentalStats.co2Reduction}kg</div>
              <div className="text-xs text-gray-600 mt-1">CO₂ économisé</div>
            </div>
            
            <div className="bg-white p-3 rounded-lg text-center shadow-sm">
              <div className="flex justify-center mb-2">
                <div className="w-10 h-10 bg-cyan-100 rounded-full flex items-center justify-center">
                  <Droplets className="w-5 h-5 text-cyan-600" />
                </div>
              </div>
              <div className="text-xl font-bold text-cyan-600">{environmentalStats.waterSaved}L</div>
              <div className="text-xs text-gray-600 mt-1">Eau préservée</div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg p-3 text-center">
            <p className="text-xs text-gray-600">
              Ensemble, nous avons déjà <span className="font-medium text-green-600">scanné 15 432 produits</span> éthiques !
            </p>
          </div>
        </div>

        {/* Section des marques partenaires (publicité) */}
        <div className="bg-white rounded-xl p-4 mb-6 shadow-lg border border-purple-100">
          <h3 className="font-semibold text-gray-800 mb-3 flex items-center">
            <span className="text-purple-600 mr-2">Nos marques partenaires</span>
          </h3>
          <p className="text-sm text-gray-600 mb-4">Découvrez ces marques engagées qui soutiennent une beauté responsable</p>
          
          <div className="space-y-4">
            {partnerBrands.map((brand, index) => (
              <div key={index} className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-4 border border-purple-100">
                <h4 className="font-medium text-purple-700 mb-1">{brand.name}</h4>
                <p className="text-xs text-gray-600 mb-2">{brand.description}</p>
                <div className="bg-purple-100 text-purple-700 text-xs font-medium py-1 px-2 rounded">
                  {brand.discount}
                </div>
              </div>
            ))}
          </div>
          
          <button className="w-full mt-4 text-xs text-purple-600 font-medium text-center">
            Voir plus de partenaires →
          </button>
        </div>

        {/* Trending Now Section */}
        <div className="bg-white rounded-xl p-4 mb-6 shadow-lg border border-amber-100">
          <div className="flex items-center mb-2">
            <TrendingUp className="w-5 h-5 text-amber-500 mr-2" />
            <h3 className="font-semibold text-gray-800">Tendance du moment</h3>
          </div>
          <p className="text-sm text-gray-700 mb-2">
            Les utilisateurs recherchent activement: <span className="font-medium text-amber-600">"{trendingTopic}"</span>
          </p>
          <div className="flex items-center text-xs text-gray-500">
            <Clock className="w-3 h-3 mr-1" />
            Actualisé il y a 5 min
          </div>
        </div>

        {/* Premium Section */}
        <div className="bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-400 rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-xl">
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-full flex items-center justify-center flex-shrink-0">
              <Crown className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-500" />
            </div>
            <div className="flex-1">
              <h3 className="text-base sm:text-lg font-bold text-gray-800">{t('premiumRecommendations')}</h3>
              <p className="text-xs sm:text-sm text-gray-700 opacity-80">Découvrez des alternatives cruelty-free personnalisées</p>
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