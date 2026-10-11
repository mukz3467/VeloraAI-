import React, { createContext, useContext, useState, useEffect } from 'react';

interface NavigationContextType {
  currentPath: string;
  navigate: (path: string) => void;
  categorySlug?: string;
  subcategorySlug?: string;
  templateId?: string;
  role?: 'seller' | 'customer';
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

export const NavigationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentPath, setCurrentPath] = useState<string>(() => window.location.pathname || '/');

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (path: string) => {
    if (path === currentPath) return;
    window.history.pushState({}, '', path);
    setCurrentPath(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Parse path segments
  const segments = currentPath.split('/').filter(Boolean);
  let categorySlug: string | undefined;
  let subcategorySlug: string | undefined;
  let templateId: string | undefined;
  let role: 'seller' | 'customer' | undefined;

  if (segments[0] === 'seller-messages') {
    role = 'seller';
    categorySlug = segments[1] || 'order-management';
    if (segments[2]) subcategorySlug = segments[2];
  } else if (segments[0] === 'customer-messages') {
    role = 'customer';
    categorySlug = segments[1] || 'product-price-inquiry';
    if (segments[2]) subcategorySlug = segments[2];
  } else if (segments[0] === 'messages' && segments[1]) {
    categorySlug = segments[1];
    if (segments[2]) subcategorySlug = segments[2];
  } else if (segments[0] === 'templates' && segments[1]) {
    templateId = segments[1];
  }

  return (
    <NavigationContext.Provider value={{
      currentPath,
      navigate,
      categorySlug,
      subcategorySlug,
      templateId,
      role
    }}>
      {children}
    </NavigationContext.Provider>
  );
};

export const useNavigation = () => {
  const ctx = useContext(NavigationContext);
  if (!ctx) throw new Error('useNavigation must be used within NavigationProvider');
  return ctx;
};
