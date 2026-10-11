import React, { useState, useEffect } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { FavoritesProvider } from './context/FavoritesContext';
import { AuthProvider } from './context/AuthContext';
import { NavigationProvider, useNavigation } from './context/NavigationContext';
import { BusinessProfileProvider } from './context/BusinessProfileContext';
import { PersonalizationProvider } from './context/PersonalizationContext';
import { SEOProvider } from './context/SEOContext';

import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { SearchModal } from './components/SearchModal';
import { ShareModal } from './components/ShareModal';
import { PersonalizeModal } from './components/PersonalizeModal';
import { AuthModal } from './components/AuthModal';
import { BusinessProfileModal } from './components/BusinessProfileModal';
import { SEOOptimizerModal } from './components/SEOOptimizerModal';

import { HomePage } from './pages/HomePage';
import { ExplorePage } from './pages/ExplorePage';
import { CategoryPage } from './pages/CategoryPage';
import { GeneratorPage } from './pages/GeneratorPage';
import { TemplateDetailPage } from './pages/TemplateDetailPage';
import { TrendingPage } from './pages/TrendingPage';
import { FavoritesPage } from './pages/FavoritesPage';
import { ProfilePage } from './pages/ProfilePage';
import { AboutPage, ContactPage, PrivacyPage, TermsPage } from './pages/StaticPages';
import { Template } from './types';

function MainLayout() {
  const { currentPath, navigate } = useNavigation();

  // Modals state
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [shareTemplate, setShareTemplate] = useState<Template | null>(null);
  const [personalizeTemplate, setPersonalizeTemplate] = useState<Template | null>(null);

  // Global Cmd+K listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Guarantee that public visitors never encounter any login gate or auth redirect
  useEffect(() => {
    if (currentPath === '/login' || currentPath === '/signin' || currentPath === '/auth') {
      navigate('/');
    }
  }, [currentPath, navigate]);

  const handleOpenShare = (template: Template) => {
    setShareTemplate(template);
  };

  const handleOpenPersonalize = (template: Template) => {
    setPersonalizeTemplate(template);
  };

  const handleSelectFromSearch = (template: Template) => {
    navigate(`/templates/${template.id}`);
  };

  // Route router logic
  let PageComponent = (
    <HomePage 
      onOpenSearch={() => setIsSearchOpen(true)} 
      onOpenShare={handleOpenShare} 
      onOpenPersonalize={handleOpenPersonalize} 
    />
  );

  if (currentPath === '/seller-messages' || currentPath.startsWith('/seller-messages/')) {
    PageComponent = <CategoryPage onOpenShare={handleOpenShare} onOpenPersonalize={handleOpenPersonalize} />;
  } else if (currentPath === '/customer-messages' || currentPath.startsWith('/customer-messages/')) {
    PageComponent = <CategoryPage onOpenShare={handleOpenShare} onOpenPersonalize={handleOpenPersonalize} />;
  } else if (currentPath === '/daily-quick-replies' || currentPath === '/quick-replies') {
    PageComponent = (
      <HomePage 
        onOpenSearch={() => setIsSearchOpen(true)} 
        onOpenShare={handleOpenShare} 
        onOpenPersonalize={handleOpenPersonalize} 
      />
    );
  } else if (currentPath === '/explore') {
    PageComponent = <ExplorePage />;
  } else if (currentPath.startsWith('/messages/')) {
    PageComponent = <CategoryPage onOpenShare={handleOpenShare} onOpenPersonalize={handleOpenPersonalize} />;
  } else if (currentPath === '/ai-message-generator') {
    PageComponent = <GeneratorPage onOpenShare={handleOpenShare} />;
  } else if (currentPath.startsWith('/templates/')) {
    PageComponent = <TemplateDetailPage onOpenShare={handleOpenShare} onOpenPersonalize={handleOpenPersonalize} />;
  } else if (currentPath === '/trending') {
    PageComponent = <TrendingPage onOpenShare={handleOpenShare} onOpenPersonalize={handleOpenPersonalize} />;
  } else if (currentPath === '/favorites') {
    PageComponent = <FavoritesPage onOpenShare={handleOpenShare} onOpenPersonalize={handleOpenPersonalize} />;
  } else if (currentPath === '/profile') {
    PageComponent = <ProfilePage />;
  } else if (currentPath === '/about') {
    PageComponent = <AboutPage />;
  } else if (currentPath === '/contact') {
    PageComponent = <ContactPage />;
  } else if (currentPath === '/privacy') {
    PageComponent = <PrivacyPage />;
  } else if (currentPath === '/terms') {
    PageComponent = <TermsPage />;
  }

  return (
    <div className="flex min-h-screen flex-col bg-slate-950 text-slate-100 transition-colors">
      <Navbar
        onOpenSearch={() => setIsSearchOpen(true)}
      />

      <main className="flex-grow">
        {PageComponent}
      </main>

      <Footer />

      {/* Global Modals & Drawers */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectTemplate={handleSelectFromSearch}
      />

      <ShareModal
        isOpen={!!shareTemplate}
        template={shareTemplate}
        onClose={() => setShareTemplate(null)}
      />

      <PersonalizeModal
        isOpen={!!personalizeTemplate}
        template={personalizeTemplate}
        onClose={() => setPersonalizeTemplate(null)}
      />

      <BusinessProfileModal />

      <AuthModal />

      <SEOOptimizerModal />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <FavoritesProvider>
        <BusinessProfileProvider>
          <PersonalizationProvider>
            <AuthProvider>
              <SEOProvider>
                <NavigationProvider>
                  <MainLayout />
                </NavigationProvider>
              </SEOProvider>
            </AuthProvider>
          </PersonalizationProvider>
        </BusinessProfileProvider>
      </FavoritesProvider>
    </ThemeProvider>
  );
}
