import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  tier: 'guest' | 'pro';
  creditsRemaining: number;
}

interface AuthContextType {
  user: User;
  isAuthModalOpen: boolean;
  openAuthModal: () => void;
  closeAuthModal: () => void;
  loginAsDemoUser: (name: string, email: string) => void;
  logout: () => void;
  consumeCredit: () => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User>(() => {
    try {
      const stored = localStorage.getItem('velora_user');
      if (stored) {
        const parsed = JSON.parse(stored);
        // Ensure guest has adequate credits and is not blocked
        if (parsed.tier === 'guest' && (typeof parsed.creditsRemaining !== 'number' || parsed.creditsRemaining < 10)) {
          parsed.creditsRemaining = 100;
        }
        return parsed;
      }
      return {
        id: 'guest-' + Math.random().toString(36).substring(2, 9),
        name: 'Guest Explorer',
        email: '',
        tier: 'guest',
        creditsRemaining: 100
      };
    } catch {
      return {
        id: 'guest-1',
        name: 'Guest Explorer',
        email: '',
        tier: 'guest',
        creditsRemaining: 100
      };
    }
  });

  // STRICT RULE: Auth modal is NEVER opened automatically on initial load or page reload
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem('velora_user', JSON.stringify(user));
    } catch {}
  }, [user]);

  const openAuthModal = () => setIsAuthModalOpen(true);
  const closeAuthModal = () => setIsAuthModalOpen(false);

  const loginAsDemoUser = (name: string, email: string) => {
    setUser({
      id: 'usr-' + Date.now(),
      name: name || 'Alex Rivera',
      email: email || 'alex@example.com',
      tier: 'pro',
      creditsRemaining: 500
    });
    setIsAuthModalOpen(false);
  };

  const logout = () => {
    setUser({
      id: 'guest-' + Math.random().toString(36).substring(2, 9),
      name: 'Guest Explorer',
      email: '',
      tier: 'guest',
      creditsRemaining: 100
    });
  };

  // Safe credit consumption that NEVER blocks guest users or forces modals
  const consumeCredit = (): boolean => {
    if (user.tier === 'pro') return true;
    setUser(prev => ({
      ...prev,
      creditsRemaining: Math.max(0, (prev.creditsRemaining || 100) - 1)
    }));
    return true;
  };

  return (
    <AuthContext.Provider value={{
      user,
      isAuthModalOpen,
      openAuthModal,
      closeAuthModal,
      loginAsDemoUser,
      logout,
      consumeCredit
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};
