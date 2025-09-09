import React, { useState, useEffect } from 'react';
import { SplashScreen } from './components/SplashScreen';
import { LanguageSelection } from './components/LanguageSelection';
import { HomeScreen } from './components/HomeScreen';
import { ScannerScreen } from './components/ScannerScreen';
import { ProductDetailScreen } from './components/ProductDetailScreen';
import { SearchScreen } from './components/SearchScreen';
import { FavoritesScreen } from './components/FavoritesScreen';
import { HistoryScreen } from './components/HistoryScreen';
import { PremiumRecommendationsScreen } from './components/PremiumRecommendationsScreen';
import { AccountScreen } from './components/AccountScreen';
import { SettingsScreen } from './components/SettingsScreen';
import { PremiumDashboardScreen } from './components/PremiumDashboardScreen';
import { FAQSupportScreen } from './components/FAQSupportScreen';
import { CustomListsScreen } from './components/CustomListsScreen';
import { BadgesScreen } from './components/BadgesScreen';
import { BottomNavigation } from './components/BottomNavigation';
import { storage } from './utils/storage';
import { findProductByBarcode, mockProducts } from './utils/mockData';
import type { Screen, Product } from './types';

function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('splash');
  const [language, setLanguage] = useState<string>('en');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isFirstLaunch, setIsFirstLaunch] = useState(true);

  useEffect(() => {
    // Check if user has already selected a language
    const savedLanguage = storage.language.get();
    const hasLaunched = localStorage.getItem('vayara_has_launched');
    
    if (hasLaunched && savedLanguage) {
      setLanguage(savedLanguage);
      setIsFirstLaunch(false);
    }
  }, []);

  const handleSplashComplete = () => {
    if (isFirstLaunch) {
      setCurrentScreen('language-selection');
    } else {
      setCurrentScreen('home');
    }
  };

  const handleLanguageSelect = (selectedLanguage: string) => {
    setLanguage(selectedLanguage);
    storage.language.set(selectedLanguage);
  };

  const handleLanguageContinue = () => {
    localStorage.setItem('vayara_has_launched', 'true');
    setCurrentScreen('home');
  };

  const handleNavigation = (screen: string) => {
    setCurrentScreen(screen as Screen);
  };

  const handleProductFound = (barcode: string) => {
    const product = findProductByBarcode(barcode);
    if (product) {
      setSelectedProduct(product);
      setCurrentScreen('product-detail');
    } else {
      // Handle product not found - could show a "not found" screen or message
      alert('Produit non trouvé dans la base de données');
    }
  };

  const handleProductSelect = (product: Product) => {
    setSelectedProduct(product);
    setCurrentScreen('product-detail');
  };

  const handleBack = () => {
    setCurrentScreen('home');
    setSelectedProduct(null);
  };

  const handleFindAlternatives = () => {
    setCurrentScreen('premium-recommendations');
  };

  const handleLanguageChange = (newLanguage: string) => {
    setLanguage(newLanguage);
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'splash':
        return <SplashScreen onComplete={handleSplashComplete} />;
      
      case 'language-selection':
        return (
          <LanguageSelection
            currentLanguage={language}
            onLanguageSelect={handleLanguageSelect}
            onContinue={handleLanguageContinue}
          />
        );
      
      case 'home':
        return (
          <HomeScreen
            language={language}
            onNavigate={handleNavigation}
          />
        );
      
      case 'scanner':
        return (
          <ScannerScreen
            language={language}
            onBack={handleBack}
            onProductFound={handleProductFound}
          />
        );
      
      case 'product-detail':
        return selectedProduct ? (
          <ProductDetailScreen
            language={language}
            product={selectedProduct}
            onBack={handleBack}
            onFindAlternatives={handleFindAlternatives}
          />
        ) : null;
      
      case 'search':
        return (
          <SearchScreen
            language={language}
            onBack={handleBack}
            onProductSelect={handleProductSelect}
          />
        );
      
      case 'favorites':
        return (
          <FavoritesScreen
            language={language}
            onBack={handleBack}
            onProductSelect={handleProductSelect}
          />
        );
      
      case 'history':
        return (
          <HistoryScreen
            language={language}
            onBack={handleBack}
            onProductSelect={handleProductSelect}
          />
        );
      
      case 'premium-recommendations':
        return (
          <PremiumRecommendationsScreen
            language={language}
            onBack={handleBack}
            onProductSelect={handleProductSelect}
          />
        );
      
      case 'account':
        return (
          <AccountScreen
            language={language}
            onBack={handleBack}
            onNavigate={handleNavigation}
          />
        );
      
      case 'settings':
        return (
          <SettingsScreen
            language={language}
            onBack={handleBack}
            onNavigate={handleNavigation}
            onLanguageChange={handleLanguageChange}
          />
        );
      
      case 'premium-dashboard':
        return (
          <PremiumDashboardScreen
            language={language}
            onBack={handleBack}
          />
        );
      
      case 'faq-support':
        return (
          <FAQSupportScreen
            language={language}
            onBack={handleBack}
          />
        );
      
      case 'custom-lists':
        return (
          <CustomListsScreen
            language={language}
            onBack={handleBack}
            onProductSelect={handleProductSelect}
          />
        );
      
      case 'badges':
        return (
          <BadgesScreen
            language={language}
            onBack={handleBack}
          />
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-white font-poppins pb-16 sm:pb-0">
      {renderScreen()}
      <BottomNavigation
        language={language}
        currentScreen={currentScreen}
        onNavigate={handleNavigation}
      />
    </div>
  );
}

export default App;