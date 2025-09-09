import React, { useState, useEffect } from 'react';
import { Search, Clock, X } from 'lucide-react';
import { useTranslation } from '../hooks/useTranslation';
import { Header } from './Header';
import { storage } from '../utils/storage';
import { searchProducts } from '../utils/mockData';
import type { Product } from '../types';

interface SearchScreenProps {
  language: string;
  onBack: () => void;
  onProductSelect: (product: Product) => void;
}

export const SearchScreen: React.FC<SearchScreenProps> = ({ 
  language, 
  onBack, 
  onProductSelect 
}) => {
  const { t } = useTranslation(language);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Product[]>([]);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    setRecentSearches(storage.searches.get());
  }, []);

  useEffect(() => {
    if (query.trim()) {
      setIsSearching(true);
      const timer = setTimeout(() => {
        const searchResults = searchProducts(query);
        setResults(searchResults);
        setIsSearching(false);
      }, 500);
      return () => clearTimeout(timer);
    } else {
      setResults([]);
      setIsSearching(false);
    }
  }, [query]);

  const handleSearch = (searchQuery: string) => {
    if (searchQuery.trim()) {
      storage.searches.add(searchQuery.trim());
      setRecentSearches(storage.searches.get());
      setQuery(searchQuery);
    }
  };

  const clearRecentSearch = (searchToRemove: string) => {
    const updated = recentSearches.filter(s => s !== searchToRemove);
    localStorage.setItem('vayara_searches', JSON.stringify(updated));
    setRecentSearches(updated);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-rose-50 pb-20 sm:pb-4">
      <Header title={t('searchTitle')} showBackButton onBack={onBack} />
      
      <div className="p-4 sm:p-6">
        {/* Search Bar */}
        <div className="relative mb-4 sm:mb-6">
          <div className="text-center mb-4">
            <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto flex items-center justify-center">
              <img 
                src="/log copy.png" 
                alt="Vayara Logo" 
                className="w-12 h-12 sm:w-16 sm:h-16 object-contain opacity-60"
              />
            </div>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t('searchPlaceholder')}
              className="w-full pl-10 pr-4 py-3 sm:py-4 bg-white border border-gray-200 rounded-xl shadow-lg focus:ring-2 focus:ring-pink-400 focus:border-transparent outline-none text-base sm:text-lg"
              onKeyPress={(e) => e.key === 'Enter' && handleSearch(query)}
            />
          </div>
        </div>

        {/* Recent Searches */}
        {!query && recentSearches.length > 0 && (
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center space-x-2">
              <Clock className="w-5 h-5" />
              <span>{t('recentSearches')}</span>
            </h3>
            <div className="space-y-2">
              {recentSearches.map((search, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between bg-white p-3 rounded-xl shadow-sm border border-gray-100"
                >
                  <button
                    onClick={() => handleSearch(search)}
                    className="flex-1 text-left text-gray-700 hover:text-pink-600 transition-colors"
                  >
                    {search}
                  </button>
                  <button
                    onClick={() => clearRecentSearch(search)}
                    className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    <X className="w-4 h-4 text-gray-400" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Loading */}
        {isSearching && (
          <div className="text-center py-8">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-pink-400"></div>
            <p className="text-gray-600 mt-2">{t('loading')}</p>
          </div>
        )}

        {/* Search Results */}
        {query && !isSearching && (
          <div className="space-y-4">
            {results.length > 0 ? (
              results.map((product) => (
                <button
                  key={product.id}
                  onClick={() => onProductSelect(product)}
                  className="w-full bg-white rounded-xl shadow-lg p-4 hover:shadow-xl transition-all duration-200 transform hover:scale-105 text-left"
                >
                  <div className="flex space-x-4">
                    <img
                      src={product.image || 'https://images.pexels.com/photos/4465124/pexels-photo-4465124.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'}
                      alt={product.name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-800 mb-1">{product.name}</h3>
                      <p className="text-gray-600 mb-2">{product.brand}</p>
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          product.crueltyFree === 'certified' 
                            ? 'bg-green-100 text-green-800'
                            : product.crueltyFree === 'not-certified'
                            ? 'bg-red-100 text-red-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {t(product.crueltyFree === 'certified' ? 'certified' : 
                             product.crueltyFree === 'not-certified' ? 'notCertified' : 'unknown')}
                        </span>
                        <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-xs font-medium">
                          Grade {product.compositionGrade}
                        </span>
                      </div>
                    </div>
                  </div>
                </button>
              ))
            ) : (
              <div className="text-center py-8 text-gray-500">
                <Search className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <div className="w-16 h-16 mx-auto mb-2 flex items-center justify-center">
                  <img 
                    src="/log copy.png" 
                    alt="Vayara Logo" 
                    className="w-14 h-14 object-contain opacity-30"
                  />
                </div>
                <p>Aucun produit trouvé pour "{query}"</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};