import React, { useEffect } from 'react';
import { useSEO } from '../context/SEOContext';

interface SEOHelmetProps {
  title: string;
  description: string;
  canonicalPath?: string;
  schema?: Record<string, any>;
  robots?: string;
}

export const SEOHelmet: React.FC<SEOHelmetProps> = ({
  title: propTitle,
  description: propDescription,
  canonicalPath = '/',
  schema: propSchema,
  robots: propRobots
}) => {
  const { getSEOForRoute, lastUpdatedTimestamp } = useSEO();

  useEffect(() => {
    // Check if custom user-approved SEO metadata exists for this route
    const currentConfig = getSEOForRoute(canonicalPath);

    const activeTitle = currentConfig?.applied ? currentConfig.title : propTitle;
    const activeDescription = currentConfig?.applied ? currentConfig.description : propDescription;
    const activeRobots = currentConfig?.applied ? (currentConfig.robots || 'index, follow') : (propRobots || 'index, follow');
    const activeSchema = currentConfig?.applied ? currentConfig.schema : propSchema;

    // 1. Page Title
    document.title = activeTitle;

    // 2. Meta description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', activeDescription);

    // 3. Robots directive
    let metaRobots = document.querySelector('meta[name="robots"]');
    if (!metaRobots) {
      metaRobots = document.createElement('meta');
      metaRobots.setAttribute('name', 'robots');
      document.head.appendChild(metaRobots);
    }
    metaRobots.setAttribute('content', activeRobots);

    // 4. OpenGraph tags
    const setMeta = (property: string, content: string) => {
      let el = document.querySelector(`meta[property="${property}"]`);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute('property', property);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    const setTwitterMeta = (name: string, content: string) => {
      let el = document.querySelector(`meta[name="${name}"]`);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute('name', name);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    const fullUrl = window.location.origin + canonicalPath;

    setMeta('og:type', 'website');
    setMeta('og:site_name', 'Velora AI');
    setMeta('og:title', activeTitle);
    setMeta('og:description', activeDescription);
    setMeta('og:url', fullUrl);

    setTwitterMeta('twitter:card', 'summary_large_image');
    setTwitterMeta('twitter:title', activeTitle);
    setTwitterMeta('twitter:description', activeDescription);

    // 5. Canonical link
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', fullUrl);

    // 6. JSON-LD structured data
    let scriptTag = document.getElementById('json-ld-structured-data');
    if (activeSchema) {
      if (!scriptTag) {
        scriptTag = document.createElement('script');
        scriptTag.id = 'json-ld-structured-data';
        scriptTag.setAttribute('type', 'application/ld+json');
        document.head.appendChild(scriptTag);
      }
      scriptTag.textContent = JSON.stringify(activeSchema);
    } else if (scriptTag) {
      scriptTag.remove();
    }
  }, [propTitle, propDescription, canonicalPath, propSchema, propRobots, lastUpdatedTimestamp, getSEOForRoute]);

  return null;
};
