import React, { useState } from 'react';
import { Settings, Globe, Bell, Shield, HelpCircle, ChevronRight, Check } from 'lucide-react';
import { useTranslation } from '../hooks/useTranslation';
import { Header } from './Header';
import { languages } from '../utils/translations';
import { storage } from '../utils/storage';

interface SettingsScreenProps {
  language: string;
  onBack: () => void;
  onNavigate: (screen: string) => void;
  onLanguageChange: (newLanguage: string) => void;
}

export const SettingsScreen: React.FC<SettingsScreenProps> = ({ 
  language, 
  onBack, 
  onNavigate,
  onLanguageChange
}) => {
  const { t } = useTranslation(language);
  const [notifications, setNotifications] = useState(true);
  const [showLanguageSelector, setShowLanguageSelector] = useState(false);

  const settingSections = [
    {
      title: 'Préférences',
      items: [
        {
          id: 'language',
          title: t('language'),
          icon: Globe,
          description: languages.find(l => l.code === language)?.name || 'English',
          action: () => setShowLanguageSelector(true)
        },
        {
          id: 'notifications',
          title: t('notifications'),
          icon: Bell,
          description: notifications ? 'Activées' : 'Désactivées',
          action: () => setNotifications(!notifications),
          toggle: true,
          value: notifications
        }
      ]
    },
    {
      title: 'Support & Légal',
      items: [
        {
          id: 'faq-support',
          title: t('faqSupport'),
          icon: HelpCircle,
          description: 'Centre d\'aide et support',
          action: () => onNavigate('faq-support')
        },
        {
          id: 'privacy',
          title: t('privacy'),
          icon: Shield,
          description: 'Politique de confidentialité',
          action: () => {}
        }
      ]
    }
  ];

  const handleLanguageSelect = (newLanguage: string) => {
    onLanguageChange(newLanguage);
    storage.language.set(newLanguage);
    setShowLanguageSelector(false);
  };

  if (showLanguageSelector) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-rose-50">
        <Header 
          title={t('language')} 
          showBackButton 
          onBack={() => setShowLanguageSelector(false)} 
        />
        
        <div className="p-4">
          <div className="bg-white rounded-2xl shadow-xl p-6">
            <div className="space-y-3">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => handleLanguageSelect(lang.code)}
                  className={`w-full flex items-center justify-between p-4 rounded-xl transition-all duration-200 ${
                    language === lang.code
                      ? 'bg-gradient-to-r from-pink-400 to-rose-400 text-white'
                      : 'hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{lang.flag}</span>
                    <span className="font-medium">{lang.name}</span>
                  </div>
                  {language === lang.code && (
                    <Check className="w-5 h-5" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-rose-50">
      <Header title={t('settings')} showBackButton onBack={onBack} />
      
      <div className="p-4 space-y-6">
        {settingSections.map((section, sectionIndex) => (
          <div key={sectionIndex} className="bg-white rounded-2xl shadow-xl p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">{section.title}</h3>
            <div className="space-y-3">
              {section.items.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={item.action}
                    className="w-full flex items-center justify-between p-4 rounded-xl hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center space-x-3">
                      <Icon className="w-5 h-5 text-gray-600" />
                      <div className="text-left">
                        <p className="font-medium text-gray-800">{item.title}</p>
                        <p className="text-sm text-gray-500">{item.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {item.toggle && (
                        <div className={`w-12 h-6 rounded-full transition-colors ${
                          item.value ? 'bg-pink-400' : 'bg-gray-300'
                        }`}>
                          <div className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform ${
                            item.value ? 'translate-x-6' : 'translate-x-0.5'
                          } mt-0.5`}></div>
                        </div>
                      )}
                      {!item.toggle && <ChevronRight className="w-5 h-5 text-gray-400" />}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        ))}

        {/* App Info */}
        <div className="bg-white rounded-2xl shadow-xl p-6 text-center">
          <div className="w-24 h-24 bg-transparent flex items-center justify-center mx-auto mb-4">
            <img 
              src="/log copy.png" 
              alt="Vayara Logo" 
              className="w-20 h-20 object-contain"
            />
          </div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Vayara</h3>
          <p className="text-gray-600 mb-1">Version 1.0.0</p>
          <p className="text-sm text-gray-500">© 2024 Vayara. Tous droits réservés.</p>
        </div>
      </div>
    </div>
  );
};