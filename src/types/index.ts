export interface Product {
  id: string;
  name: string;
  brand: string;
  barcode: string;
  crueltyFree: 'certified' | 'not-certified' | 'unknown';
  compositionGrade: 'A' | 'B' | 'C' | 'D' | 'E';
  ingredients: string[];
  image?: string;
  description?: string;
  alternatives?: Product[];
}

export interface Language {
  code: string;
  name: string;
  flag: string;
}

export interface Translations {
  [key: string]: {
    [key: string]: string;
  };
}

export type Screen = 
  | 'splash'
  | 'language-selection'
  | 'home'
  | 'scanner'
  | 'product-detail'
  | 'search'
  | 'favorites'
  | 'history'
  | 'premium-recommendations'
  | 'account'
  | 'settings'
  | 'premium-dashboard'
  | 'faq-support';

export interface UserStats {
  totalScans: number;
  crueltyFreePercentage: number;
  favoriteProducts: number;
  monthlyScans: number;
  streak: number;
}

export interface Subscription {
  type: 'free' | 'premium';
  expiresAt?: Date;
  features: string[];
  price?: string;
  billingCycle?: 'monthly' | 'yearly';
}

export interface CustomList {
  id: string;
  name: string;
  description?: string;
  productIds: string[];
  createdAt: Date;
  category?: 'routine' | 'shopping' | 'custom';
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlocked: boolean;
  unlockedAt?: Date;
}

export interface ProductRecommendation {
  product: Product;
  reason: string;
  score: number;
  category: string;
}