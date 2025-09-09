import type { Product } from '../types';

export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Organic Face Cream',
    brand: 'Green Beauty',
    barcode: '1234567890123',
    crueltyFree: 'certified',
    compositionGrade: 'A',
    ingredients: ['Aqua', 'Aloe Vera', 'Jojoba Oil', 'Vitamin E', 'Glycerin'],
    image: 'https://images.pexels.com/photos/4465124/pexels-photo-4465124.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
    description: 'Natural organic face cream with certified cruelty-free ingredients.',
    alternatives: []
  },
  {
    id: '2',
    name: 'Moisturizing Shampoo',
    brand: 'HairCare Plus',
    barcode: '9876543210987',
    crueltyFree: 'not-certified',
    compositionGrade: 'C',
    ingredients: ['Water', 'Sodium Lauryl Sulfate', 'Cocamidopropyl Betaine', 'Fragrance', 'Parabens'],
    image: 'https://images.pexels.com/photos/4465831/pexels-photo-4465831.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
    description: 'Moisturizing shampoo for all hair types.'
  },
  {
    id: '3',
    name: 'Natural Lip Balm',
    brand: 'Pure Lips',
    barcode: '5555666677778',
    crueltyFree: 'certified',
    compositionGrade: 'A',
    ingredients: ['Beeswax', 'Coconut Oil', 'Shea Butter', 'Vitamin E'],
    image: 'https://images.pexels.com/photos/5069432/pexels-photo-5069432.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
    description: '100% natural lip balm with organic ingredients.'
  }
];

export const findProductByBarcode = (barcode: string): Product | null => {
  return mockProducts.find(product => product.barcode === barcode) || null;
};

export const searchProducts = (query: string): Product[] => {
  const lowercaseQuery = query.toLowerCase();
  return mockProducts.filter(product => 
    product.name.toLowerCase().includes(lowercaseQuery) ||
    product.brand.toLowerCase().includes(lowercaseQuery)
  );
};

export const getRecommendations = (category?: string): Product[] => {
  let filtered = mockProducts.filter(p => p.crueltyFree === 'certified');
  if (category) {
    // Simulate category filtering
    filtered = filtered.slice(0, 3);
  }
  return filtered;
};

export const mockBadges = [
  { id: '1', name: 'Premier scan', description: 'Votre premier produit scanné', icon: '🎯', unlocked: true },
  { id: '2', name: 'Explorateur', description: '10 produits scannés', icon: '🔍', unlocked: true },
  { id: '3', name: 'Défenseur', description: '50 produits cruelty-free', icon: '🛡️', unlocked: true },
  { id: '4', name: 'Champion', description: '100 scans réalisés', icon: '🏆', unlocked: false },
  { id: '5', name: 'Expert', description: '80% de produits cruelty-free', icon: '⭐', unlocked: false },
  { id: '6', name: 'Maître', description: '500 scans réalisés', icon: '👑', unlocked: false }
];