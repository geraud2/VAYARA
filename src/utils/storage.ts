export const storage = {
  favorites: {
    get: (): string[] => {
      try {
        const favorites = localStorage.getItem('vayara_favorites');
        return favorites ? JSON.parse(favorites) : [];
      } catch {
        return [];
      }
    },
    set: (favorites: string[]) => {
      localStorage.setItem('vayara_favorites', JSON.stringify(favorites));
    },
    add: (productId: string) => {
      const current = storage.favorites.get();
      if (!current.includes(productId)) {
        storage.favorites.set([...current, productId]);
      }
    },
    remove: (productId: string) => {
      const current = storage.favorites.get();
      storage.favorites.set(current.filter(id => id !== productId));
    },
    toggle: (productId: string) => {
      const current = storage.favorites.get();
      if (current.includes(productId)) {
        storage.favorites.remove(productId);
        return false;
      } else {
        storage.favorites.add(productId);
        return true;
      }
    }
  },

  history: {
    get: (): string[] => {
      try {
        const history = localStorage.getItem('vayara_history');
        return history ? JSON.parse(history) : [];
      } catch {
        return [];
      }
    },
    add: (productId: string) => {
      const current = storage.history.get();
      const updated = [productId, ...current.filter(id => id !== productId)].slice(0, 50);
      localStorage.setItem('vayara_history', JSON.stringify(updated));
    }
  },

  language: {
    get: (): string => {
      return localStorage.getItem('vayara_language') || 'en';
    },
    set: (language: string) => {
      localStorage.setItem('vayara_language', language);
    }
  },

  searches: {
    get: (): string[] => {
      try {
        const searches = localStorage.getItem('vayara_searches');
        return searches ? JSON.parse(searches) : [];
      } catch {
        return [];
      }
    },
    add: (query: string) => {
      const current = storage.searches.get();
      const updated = [query, ...current.filter(q => q !== query)].slice(0, 10);
      localStorage.setItem('vayara_searches', JSON.stringify(updated));
    }
  },

  subscription: {
    get: () => {
      try {
        const sub = localStorage.getItem('vayara_subscription');
        return sub ? JSON.parse(sub) : { type: 'free', features: [] };
      } catch {
        return { type: 'free', features: [] };
      }
    },
    set: (subscription: any) => {
      localStorage.setItem('vayara_subscription', JSON.stringify(subscription));
    }
  },

  stats: {
    get: () => {
      try {
        const stats = localStorage.getItem('vayara_stats');
        return stats ? JSON.parse(stats) : {
          totalScans: 0,
          crueltyFreePercentage: 0,
          favoriteProducts: 0,
          monthlyScans: 0,
          streak: 0
        };
      } catch {
        return {
          totalScans: 0,
          crueltyFreePercentage: 0,
          favoriteProducts: 0,
          monthlyScans: 0,
          streak: 0
        };
      }
    },
    update: (newStats: any) => {
      localStorage.setItem('vayara_stats', JSON.stringify(newStats));
    }
  }
};