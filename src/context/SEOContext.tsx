import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { RouteSEOConfig, DEFAULT_SEO_REGISTRY } from '../data/seoRegistry';

interface SEOContextType {
  configs: RouteSEOConfig[];
  getSEOForRoute: (path: string) => RouteSEOConfig;
  applyMetadata: (newConfig: RouteSEOConfig) => Promise<{ success: boolean; message: string }>;
  resetSEOForRoute: (path: string) => void;
  isSEOModalOpen: boolean;
  activeModalRoute: string;
  openSEOModal: (initialRoute?: string) => void;
  closeSEOModal: () => void;
  lastUpdatedTimestamp: number;
}

const SEOContext = createContext<SEOContextType | undefined>(undefined);

const STORAGE_KEY = 'velora_seo_overrides_v1';

export const SEOProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [configs, setConfigs] = useState<RouteSEOConfig[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const overrides: Record<string, Partial<RouteSEOConfig>> = JSON.parse(stored);
        return DEFAULT_SEO_REGISTRY.map(def => {
          if (overrides[def.path]) {
            return { ...def, ...overrides[def.path], applied: true };
          }
          return def;
        });
      }
    } catch (e) {
      console.warn('Could not read SEO overrides from localStorage', e);
    }
    return DEFAULT_SEO_REGISTRY;
  });

  const [isSEOModalOpen, setIsSEOModalOpen] = useState(false);
  const [activeModalRoute, setActiveModalRoute] = useState<string>('/');
  const [lastUpdatedTimestamp, setLastUpdatedTimestamp] = useState<number>(Date.now());

  const getSEOForRoute = useCallback((path: string): RouteSEOConfig => {
    const cleanPath = path.split('?')[0].split('#')[0] || '/';
    // Exact match
    const found = configs.find(c => c.path === cleanPath);
    if (found) return found;

    // Check seller or customer category path prefix
    if (cleanPath.startsWith('/seller-messages/')) {
      const slug = cleanPath.replace('/seller-messages/', '');
      return {
        path: cleanPath,
        name: `Seller: ${slug.replace(/-/g, ' ')}`,
        category: 'seller',
        businessName: 'Velora AI',
        businessType: 'Online seller communication tools',
        targetCountry: 'Pakistan',
        targetCity: '',
        primaryKeyword: `${slug.replace(/-/g, ' ')} message templates`,
        secondaryKeywords: ['whatsapp seller messages', 'order management', 'urdu messages'],
        targetLanguage: 'English & Urdu',
        searchIntent: 'Commercial',
        title: `${slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())} Message Templates | Velora AI`,
        description: `Browse verified ${slug.replace(/-/g, ' ')} message templates for WhatsApp and online stores. Ready to personalize, translate, and copy in one click.`,
        canonicalPath: cleanPath,
        h1Recommendation: `${slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())} Communication Templates for Sellers`,
        h2Suggestions: ['Order Status & Notification Samples', 'Payment & Banking Templates', 'Customer Reassurance Notices'],
        keywordMapping: {
          primary: `${slug.replace(/-/g, ' ')} message templates`,
          secondary: ['whatsapp templates', 'seller communication'],
          recommendedDensity: '1.5%'
        },
        imageAltRecommendations: [`${slug} message category preview card`],
        ogTitle: `${slug.replace(/-/g, ' ')} Message Templates | Velora AI`,
        ogDescription: `Professional ${slug.replace(/-/g, ' ')} message templates for online businesses.`,
        robots: 'index, follow',
        hreflang: [{ lang: 'en', href: `https://velora.ai${cleanPath}` }],
        internalLinkSuggestions: [
          { url: '/seller-messages', anchor: 'All Seller Messages', context: 'Return to seller categories hub' },
          { url: '/daily-quick-replies', anchor: 'WhatsApp Quick Replies', context: 'Fast canned replies' }
        ],
        schema: {
          '@context': 'https://schema.org',
          '@type': 'CollectionPage',
          'name': `${slug.replace(/-/g, ' ')} Templates`
        }
      };
    }

    if (cleanPath.startsWith('/customer-messages/')) {
      const slug = cleanPath.replace('/customer-messages/', '');
      return {
        path: cleanPath,
        name: `Customer: ${slug.replace(/-/g, ' ')}`,
        category: 'customer',
        businessName: 'Velora AI',
        businessType: 'Customer inquiry tools',
        targetCountry: 'Pakistan',
        targetCity: '',
        primaryKeyword: `${slug.replace(/-/g, ' ')} customer inquiry messages`,
        secondaryKeywords: ['buyer message to seller', 'polite whatsapp inquiry'],
        targetLanguage: 'English & Urdu',
        searchIntent: 'Informational',
        title: `${slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())} Messages for Online Buyers | Velora AI`,
        description: `Polite and effective ${slug.replace(/-/g, ' ')} message templates for shoppers. Send quick questions, order tracking requests, and feedback to sellers.`,
        canonicalPath: cleanPath,
        h1Recommendation: `${slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())} Inquiry Templates for Customers`,
        h2Suggestions: ['Common Buyer Questions', 'Order Tracking & Proof Messages', 'Polite Communication Etiquette'],
        keywordMapping: {
          primary: `${slug.replace(/-/g, ' ')} customer inquiry messages`,
          secondary: ['buyer message to seller', 'polite whatsapp template'],
          recommendedDensity: '1.5%'
        },
        imageAltRecommendations: [`Customer ${slug} inquiry templates preview`],
        ogTitle: `${slug.replace(/-/g, ' ')} Inquiry Messages | Velora AI`,
        ogDescription: `Polite customer message templates for online shopping.`,
        robots: 'index, follow',
        hreflang: [{ lang: 'en', href: `https://velora.ai${cleanPath}` }],
        internalLinkSuggestions: [
          { url: '/customer-messages', anchor: 'All Customer Messages', context: 'Return to customer hub' }
        ],
        schema: {
          '@context': 'https://schema.org',
          '@type': 'CollectionPage',
          'name': `${slug.replace(/-/g, ' ')} Customer Templates`
        }
      };
    }

    // Fallback to default homepage config
    return configs[0];
  }, [configs]);

  const applyMetadata = async (newConfig: RouteSEOConfig): Promise<{ success: boolean; message: string }> => {
    try {
      const updatedConfig: RouteSEOConfig = {
        ...newConfig,
        applied: true,
        lastUpdated: new Date().toISOString()
      };

      // 1. Update in-memory state
      setConfigs(prev => {
        const existingIdx = prev.findIndex(c => c.path === updatedConfig.path);
        let next: RouteSEOConfig[];
        if (existingIdx >= 0) {
          next = [...prev];
          next[existingIdx] = updatedConfig;
        } else {
          next = [...prev, updatedConfig];
        }

        // 2. Persist in localStorage
        try {
          const overridesMap: Record<string, RouteSEOConfig> = {};
          next.forEach(c => {
            if (c.applied) overridesMap[c.path] = c;
          });
          localStorage.setItem(STORAGE_KEY, JSON.stringify(overridesMap));
        } catch (err) {
          console.error('Failed to write to localStorage', err);
        }

        return next;
      });

      // 3. Sync to server API
      try {
        await fetch('/api/seo/metadata', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ config: updatedConfig })
        });
      } catch (apiErr) {
        console.warn('Could not sync SEO metadata to server API', apiErr);
      }

      setLastUpdatedTimestamp(Date.now());

      // 4. If current window location matches, directly update DOM
      const currentPath = window.location.pathname;
      if (currentPath === updatedConfig.path) {
        document.title = updatedConfig.title;
        const metaDesc = document.querySelector('meta[name="description"]');
        if (metaDesc) metaDesc.setAttribute('content', updatedConfig.description);

        const ogTitle = document.querySelector('meta[property="og:title"]');
        if (ogTitle) ogTitle.setAttribute('content', updatedConfig.ogTitle || updatedConfig.title);

        const ogDesc = document.querySelector('meta[property="og:description"]');
        if (ogDesc) ogDesc.setAttribute('content', updatedConfig.ogDescription || updatedConfig.description);

        const canonical = document.querySelector('link[rel="canonical"]');
        if (canonical) canonical.setAttribute('href', window.location.origin + updatedConfig.canonicalPath);

        let robots = document.querySelector('meta[name="robots"]');
        if (!robots) {
          robots = document.createElement('meta');
          robots.setAttribute('name', 'robots');
          document.head.appendChild(robots);
        }
        robots.setAttribute('content', updatedConfig.robots || 'index, follow');

        if (updatedConfig.schema) {
          let scriptTag = document.getElementById('json-ld-structured-data');
          if (!scriptTag) {
            scriptTag = document.createElement('script');
            scriptTag.id = 'json-ld-structured-data';
            scriptTag.setAttribute('type', 'application/ld+json');
            document.head.appendChild(scriptTag);
          }
          scriptTag.textContent = JSON.stringify(updatedConfig.schema);
        }
      }

      return {
        success: true,
        message: `Successfully applied real SEO metadata to ${updatedConfig.path}`
      };
    } catch (err: any) {
      return {
        success: false,
        message: `Error applying metadata: ${err?.message || 'Unknown error'}`
      };
    }
  };

  const resetSEOForRoute = (path: string) => {
    const defaultItem = DEFAULT_SEO_REGISTRY.find(c => c.path === path);
    if (!defaultItem) return;

    setConfigs(prev => {
      const next = prev.map(c => (c.path === path ? { ...defaultItem, applied: false } : c));
      try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
          const overrides = JSON.parse(stored);
          delete overrides[path];
          localStorage.setItem(STORAGE_KEY, JSON.stringify(overrides));
        }
      } catch {}
      return next;
    });

    setLastUpdatedTimestamp(Date.now());
  };

  const openSEOModal = (initialRoute = '/') => {
    setActiveModalRoute(initialRoute);
    setIsSEOModalOpen(true);
  };

  const closeSEOModal = () => {
    setIsSEOModalOpen(false);
  };

  return (
    <SEOContext.Provider
      value={{
        configs,
        getSEOForRoute,
        applyMetadata,
        resetSEOForRoute,
        isSEOModalOpen,
        activeModalRoute,
        openSEOModal,
        closeSEOModal,
        lastUpdatedTimestamp
      }}
    >
      {children}
    </SEOContext.Provider>
  );
};

export const useSEO = () => {
  const context = useContext(SEOContext);
  if (!context) {
    throw new Error('useSEO must be used within an SEOProvider');
  }
  return context;
};
