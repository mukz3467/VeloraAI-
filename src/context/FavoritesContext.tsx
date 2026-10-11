import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserSavedCollection } from '../types';

interface FavoritesContextType {
  favorites: string[]; // template IDs or custom generated IDs
  toggleFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;
  collections: UserSavedCollection[];
  createCollection: (name: string, color: string) => void;
  addToCollection: (collectionId: string, templateId: string) => void;
  removeFromCollection: (collectionId: string, templateId: string) => void;
  recentCopied: { id: string; text: string; timestamp: number }[];
  recordCopy: (id: string, text: string) => void;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const FavoritesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem('velora_favorites');
      return stored ? JSON.parse(stored) : ['love-01', 'sales-01', 'social-01'];
    } catch {
      return ['love-01', 'sales-01'];
    }
  });

  const [collections, setCollections] = useState<UserSavedCollection[]>(() => {
    try {
      const stored = localStorage.getItem('velora_collections');
      return stored ? JSON.parse(stored) : [
        { id: 'col-1', name: 'Work & Outreach', color: '#6366f1', templateIds: ['sales-01', 'biz-01'] },
        { id: 'col-2', name: 'Romantic & Love', color: '#f43f5e', templateIds: ['love-01'] }
      ];
    } catch {
      return [];
    }
  });

  const [recentCopied, setRecentCopied] = useState<{ id: string; text: string; timestamp: number }[]>(() => {
    try {
      const stored = localStorage.getItem('velora_recent_copies');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('velora_favorites', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem('velora_collections', JSON.stringify(collections));
  }, [collections]);

  useEffect(() => {
    localStorage.setItem('velora_recent_copies', JSON.stringify(recentCopied.slice(0, 30)));
  }, [recentCopied]);

  const toggleFavorite = (id: string) => {
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const isFavorite = (id: string) => favorites.includes(id);

  const createCollection = (name: string, color: string) => {
    const newCol: UserSavedCollection = {
      id: `col-${Date.now()}`,
      name,
      color,
      templateIds: []
    };
    setCollections(prev => [...prev, newCol]);
  };

  const addToCollection = (collectionId: string, templateId: string) => {
    setCollections(prev => prev.map(col => {
      if (col.id === collectionId && !col.templateIds.includes(templateId)) {
        return { ...col, templateIds: [...col.templateIds, templateId] };
      }
      return col;
    }));
  };

  const removeFromCollection = (collectionId: string, templateId: string) => {
    setCollections(prev => prev.map(col => {
      if (col.id === collectionId) {
        return { ...col, templateIds: col.templateIds.filter(id => id !== templateId) };
      }
      return col;
    }));
  };

  const recordCopy = (id: string, text: string) => {
    setRecentCopied(prev => [
      { id, text, timestamp: Date.now() },
      ...prev.filter(item => item.id !== id)
    ]);

    // Dispatch analytics event to server asynchronously
    fetch('/api/analytics/event', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type: 'copy', payload: { templateId: id } })
    }).catch(() => {});
  };

  return (
    <FavoritesContext.Provider value={{
      favorites,
      toggleFavorite,
      isFavorite,
      collections,
      createCollection,
      addToCollection,
      removeFromCollection,
      recentCopied,
      recordCopy
    }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const ctx = useContext(FavoritesContext);
  if (!ctx) throw new Error('useFavorites must be used within FavoritesProvider');
  return ctx;
};
