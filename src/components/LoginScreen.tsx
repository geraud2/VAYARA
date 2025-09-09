import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react';
import { useTranslation } from '../hooks/useTranslation';

interface LoginScreenProps {
  language: string;
  onLogin: (email: string, password: string) => void;
  onNavigateToRegister: () => void;
  onSkip: () => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({
  language,
  onLogin,
  onNavigateToRegister,
  onSkip
}) => {
  const { t } = useTranslation(language);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password) {
      setIsLoading(true);
      // Simulate API call
      setTimeout(() => {
        onLogin(email, password);
        setIsLoading(false);
      }, 1500);
    }
  };

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
            Bienvenue sur <span className="bg-gradient-to-r from-pink-400 to-rose-400 bg-clip-text text-transparent">Vayara</span>
          </h1>
          <p className="text-gray-600">Connectez-vous pour continuer</p>
        </div>

        {/* Login Form */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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
            </div>

            {/* Forgot Password */}
            <div className="text-right">
              <button
                type="button"
                className="text-sm text-pink-600 hover:text-pink-700 transition-colors"
              >
                Mot de passe oublié ?
              </button>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading || !email || !password}
              className="w-full bg-gradient-to-r from-pink-400 to-rose-400 text-white font-semibold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center space-x-2"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <>
                  <span>Se connecter</span>
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </form>
        </div>

        {/* Register Link */}
        <div className="text-center mb-6">
          <p className="text-gray-600">
            Pas encore de compte ?{' '}
            <button
              onClick={onNavigateToRegister}
              className="text-pink-600 font-semibold hover:text-pink-700 transition-colors"
            >
              Créer un compte
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

        {/* Social Login */}
        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-gradient-to-br from-pink-50 via-white to-rose-50 text-gray-500">
                Ou continuer avec
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