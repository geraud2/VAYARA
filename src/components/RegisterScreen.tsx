import React, { useState } from 'react';
import { Mail, Lock, User, Eye, EyeOff, ArrowRight, Check } from 'lucide-react';
import { useTranslation } from '../hooks/useTranslation';

interface RegisterScreenProps {
  language: string;
  onRegister: (email: string, password: string, name: string) => void;
  onNavigateToLogin: () => void;
  onSkip: () => void;
}

export const RegisterScreen: React.FC<RegisterScreenProps> = ({
  language,
  onRegister,
  onNavigateToLogin,
  onSkip
}) => {
  const { t } = useTranslation(language);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.email && formData.password && formData.name && acceptTerms) {
      if (formData.password !== formData.confirmPassword) {
        alert('Les mots de passe ne correspondent pas');
        return;
      }
      setIsLoading(true);
      // Simulate API call
      setTimeout(() => {
        onRegister(formData.email, formData.password, formData.name);
        setIsLoading(false);
      }, 1500);
    }
  };

  const updateFormData = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const isPasswordValid = formData.password.length >= 6;
  const doPasswordsMatch = formData.password === formData.confirmPassword && formData.confirmPassword.length > 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-rose-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-24 h-24 mx-auto mb-4 flex items-center justify-center">
            <img 
              src="/log copy.png" 
              alt="Vayara Logo" 
              className="w-20 h-20 object-contain"
            />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Rejoignez <span className="bg-gradient-to-r from-pink-400 to-rose-400 bg-clip-text text-transparent">Vayara</span>
          </h1>
          <p className="text-gray-600">Créez votre compte gratuitement</p>
        </div>

        {/* Register Form */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nom complet
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => updateFormData('name', e.target.value)}
                  placeholder="Votre nom"
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-400 focus:border-transparent outline-none transition-all"
                  required
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => updateFormData('email', e.target.value)}
                  placeholder="votre@email.com"
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-400 focus:border-transparent outline-none transition-all"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Mot de passe
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={(e) => updateFormData('password', e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-12 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-400 focus:border-transparent outline-none transition-all"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {formData.password && (
                <div className="mt-2 flex items-center space-x-2">
                  <div className={`w-3 h-3 rounded-full ${isPasswordValid ? 'bg-green-400' : 'bg-red-400'}`}></div>
                  <span className={`text-xs ${isPasswordValid ? 'text-green-600' : 'text-red-600'}`}>
                    Minimum 6 caractères
                  </span>
                </div>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Confirmer le mot de passe
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={formData.confirmPassword}
                  onChange={(e) => updateFormData('confirmPassword', e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-12 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-400 focus:border-transparent outline-none transition-all"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {formData.confirmPassword && (
                <div className="mt-2 flex items-center space-x-2">
                  <div className={`w-3 h-3 rounded-full ${doPasswordsMatch ? 'bg-green-400' : 'bg-red-400'}`}></div>
                  <span className={`text-xs ${doPasswordsMatch ? 'text-green-600' : 'text-red-600'}`}>
                    {doPasswordsMatch ? 'Mots de passe identiques' : 'Mots de passe différents'}
                  </span>
                </div>
              )}
            </div>

            {/* Terms */}
            <div className="flex items-start space-x-3">
              <button
                type="button"
                onClick={() => setAcceptTerms(!acceptTerms)}
                className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${
                  acceptTerms 
                    ? 'bg-gradient-to-r from-pink-400 to-rose-400 border-pink-400' 
                    : 'border-gray-300 hover:border-pink-400'
                }`}
              >
                {acceptTerms && <Check className="w-3 h-3 text-white" />}
              </button>
              <p className="text-sm text-gray-600 leading-relaxed">
                J'accepte les{' '}
                <button className="text-pink-600 hover:text-pink-700 underline">
                  conditions d'utilisation
                </button>
                {' '}et la{' '}
                <button className="text-pink-600 hover:text-pink-700 underline">
                  politique de confidentialité
                </button>
              </p>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading || !formData.email || !formData.password || !formData.name || !acceptTerms || !doPasswordsMatch}
              className="w-full bg-gradient-to-r from-pink-400 to-rose-400 text-white font-semibold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center space-x-2"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <>
                  <span>Créer mon compte</span>
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </form>
        </div>

        {/* Login Link */}
        <div className="text-center mb-6">
          <p className="text-gray-600">
            Déjà un compte ?{' '}
            <button
              onClick={onNavigateToLogin}
              className="text-pink-600 font-semibold hover:text-pink-700 transition-colors"
            >
              Se connecter
            </button>
          </p>
        </div>

        {/* Skip Button */}
        <button
          onClick={onSkip}
          className="w-full bg-white border-2 border-gray-200 text-gray-600 font-semibold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
        >
          Continuer sans compte
        </button>

        {/* Social Register */}
        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-gradient-to-br from-pink-50 via-white to-rose-50 text-gray-500">
                Ou s'inscrire avec
              </span>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-3">
            <button className="w-full bg-white border border-gray-200 text-gray-700 font-medium py-3 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 flex items-center justify-center space-x-2">
              <span className="text-xl">🇬</span>
              <span>Google</span>
            </button>
            <button className="w-full bg-white border border-gray-200 text-gray-700 font-medium py-3 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 flex items-center justify-center space-x-2">
              <span className="text-xl">📘</span>
              <span>Facebook</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};