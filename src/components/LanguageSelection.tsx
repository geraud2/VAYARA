import React from 'react';
import { languages } from '../utils/translations';
import { useTranslation } from '../hooks/useTranslation';
import { ChevronRight } from 'lucide-react';

interface LanguageSelectionProps {
  currentLanguage: string;
  onLanguageSelect: (language: string) => void;
  onContinue: () => void;
}

export const LanguageSelection: React.FC<LanguageSelectionProps> = ({
  currentLanguage,
  onLanguageSelect,
  onContinue
}) => {
  const { t } = useTranslation(currentLanguage);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-rose-50 p-4">
      <div className="max-w-md mx-auto pt-16">
        <div className="text-center mb-12">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">{t('selectLanguage')}</h1>
          <div className="w-16 h-1 bg-gradient-to-r from-pink-400 to-rose-400 mx-auto rounded-full"></div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-6 mb-8">
          <div className="space-y-3">
            {languages.map((language) => (
              <button
                key={language.code}
                onClick={() => onLanguageSelect(language.code)}
                className={`w-full flex items-center justify-between p-4 rounded-xl transition-all duration-200 ${
                  currentLanguage === language.code
                    ? 'bg-gradient-to-r from-pink-400 to-rose-400 text-white shadow-lg'
                    : 'bg-gray-50 hover:bg-gray-100 text-gray-700'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">{language.flag}</span>
                  <span className="font-medium">{language.name}</span>
                </div>
                {currentLanguage === language.code && (
                  <ChevronRight className="w-5 h-5" />
                )}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={onContinue}
          className="w-full bg-gradient-to-r from-pink-400 to-rose-400 text-white font-semibold py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
        >
          {t('continue')}
        {/* <div className="w-20 h-20 mx-auto mb-4 flex items-center justify-center">
          <img 
            src="/log copy.png" 
            alt="Vayara Logo" 
            className="w-16 h-16 object-contain"
          />
        </div> */}
        </button>
      </div>
    </div>
  );
};