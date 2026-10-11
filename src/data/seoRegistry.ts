export interface RouteSEOConfig {
  path: string;
  name: string;
  category: 'core' | 'seller' | 'customer' | 'tools' | 'legal';
  businessName: string;
  businessType: string;
  targetCountry: string;
  targetCity: string;
  primaryKeyword: string;
  secondaryKeywords: string[];
  targetLanguage: string;
  searchIntent: 'Commercial' | 'Transactional' | 'Informational' | 'Navigational';
  title: string;
  description: string;
  canonicalPath: string;
  h1Recommendation: string;
  h2Suggestions: string[];
  keywordMapping: {
    primary: string;
    secondary: string[];
    recommendedDensity: string;
  };
  imageAltRecommendations: string[];
  ogTitle: string;
  ogDescription: string;
  robots: string;
  hreflang: { lang: string; href: string }[];
  internalLinkSuggestions: { url: string; anchor: string; context: string }[];
  schema: Record<string, any>;
  lastUpdated?: string;
  applied?: boolean;
}

export const DEFAULT_SEO_REGISTRY: RouteSEOConfig[] = [
  {
    path: '/',
    name: 'Homepage – Seller & Customer Hub',
    category: 'core',
    businessName: 'Velora AI',
    businessType: 'Online seller communication tools & message generator',
    targetCountry: 'Pakistan',
    targetCity: '',
    primaryKeyword: 'WhatsApp business message templates',
    secondaryKeywords: [
      'Urdu business messages',
      'order confirmation messages',
      'customer service templates',
      'payment reminder messages',
      'seller messages'
    ],
    targetLanguage: 'English & Urdu',
    searchIntent: 'Commercial',
    title: 'Velora AI – WhatsApp Business Message Templates & Seller Hub',
    description: 'Instant ready-to-copy seller and customer message templates for WhatsApp, order confirmations, polite payment reminders, and multilingual communication in Urdu.',
    canonicalPath: '/',
    h1Recommendation: 'Instant Business & Customer Message Generator for Online Sellers',
    h2Suggestions: [
      'Core Seller Communication Categories',
      'Customer Care & Polite Order Inquiries',
      'One-Click Personalization & Multilingual Urdu Support',
      'Frequently Used WhatsApp Quick Replies'
    ],
    keywordMapping: {
      primary: 'WhatsApp business message templates',
      secondary: ['Urdu business messages', 'order confirmation messages', 'payment reminders'],
      recommendedDensity: '1.5% - 2.2%'
    },
    imageAltRecommendations: [
      'Velora AI multi-lingual business message generator dashboard preview',
      'WhatsApp order confirmation template card with copy button'
    ],
    ogTitle: 'Velora AI – WhatsApp Business Message Templates & Seller Hub',
    ogDescription: 'Instant ready-to-copy seller and customer message templates for WhatsApp, order confirmations, polite payment reminders, and Urdu support.',
    robots: 'index, follow, max-image-preview:large, max-snippet:-1',
    hreflang: [
      { lang: 'en', href: 'https://velora.ai/' },
      { lang: 'ur', href: 'https://velora.ai/?lang=ur' }
    ],
    internalLinkSuggestions: [
      { url: '/seller-messages', anchor: 'Browse Seller Message Templates', context: 'Connect directly to order management and payment message categories' },
      { url: '/customer-messages', anchor: 'Customer Message Center', context: 'Explore buyer communication and inquiry messages' },
      { url: '/daily-quick-replies', anchor: 'Daily WhatsApp Quick Replies', context: 'Grab fast canned replies for daily customer inquiries' },
      { url: '/ai-message-generator', anchor: 'AI Message Studio', context: 'Synthesize custom tailored business messages' }
    ],
    schema: {
      '@context': 'https://schema.org',
      '@type': 'WebApplication',
      'name': 'Velora AI',
      'url': 'https://velora.ai/',
      'applicationCategory': 'BusinessApplication',
      'operatingSystem': 'All',
      'description': 'AI message generator and multi-lingual template library for online sellers, retailers, and customers in English, Urdu, Roman Urdu, and Hindi.',
      'offers': {
        '@type': 'Offer',
        'price': '0',
        'priceCurrency': 'USD'
      }
    }
  },
  {
    path: '/seller-messages',
    name: 'Seller Messages Center',
    category: 'seller',
    businessName: 'Velora AI',
    businessType: 'Online seller communication tools',
    targetCountry: 'Pakistan',
    targetCity: '',
    primaryKeyword: 'seller message templates for online businesses',
    secondaryKeywords: [
      'order confirmation templates',
      'shipping courier messages',
      'jazzcash easypaisa payment instructions',
      'return policy messages'
    ],
    targetLanguage: 'English & Urdu',
    searchIntent: 'Commercial',
    title: 'Seller Message Templates for Online Businesses | Velora AI',
    description: 'Explore professional seller message templates: order confirmations, courier dispatch alerts, bank details, and polite payment reminders for WhatsApp.',
    canonicalPath: '/seller-messages',
    h1Recommendation: 'Professional Seller Message Library for E-commerce & WhatsApp',
    h2Suggestions: [
      'Order Confirmation & Management Templates',
      'Payment Reminders & Banking Instructions (JazzCash & Easypaisa)',
      'Dispatch, Courier Tracking & COD Verification',
      'Customer Support & Complaint Resolution'
    ],
    keywordMapping: {
      primary: 'seller message templates for online businesses',
      secondary: ['order confirmation templates', 'courier dispatch messages', 'JazzCash payment instructions'],
      recommendedDensity: '1.8%'
    },
    imageAltRecommendations: [
      'Seller messages category navigation with order management and payment instructions',
      'Pakistani e-commerce seller templates preview'
    ],
    ogTitle: 'Seller Message Templates for Online Businesses | Velora AI',
    ogDescription: 'Explore professional seller message templates for WhatsApp order confirmations, courier tracking, and payment alerts.',
    robots: 'index, follow, max-image-preview:large',
    hreflang: [
      { lang: 'en', href: 'https://velora.ai/seller-messages' },
      { lang: 'ur', href: 'https://velora.ai/seller-messages?lang=ur' }
    ],
    internalLinkSuggestions: [
      { url: '/seller-messages/order-management', anchor: 'Order Management Messages', context: 'Find confirmation and dispatch messages' },
      { url: '/seller-messages/payment-banking', anchor: 'Payment & Banking Templates', context: 'Send bank transfer and mobile wallet instructions' },
      { url: '/daily-quick-replies', anchor: 'WhatsApp Quick Replies', context: 'Fast one-click seller canned messages' }
    ],
    schema: {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      'name': 'Seller Message Templates Library',
      'description': 'Collection of professional business message templates for online sellers, retailers, and store owners.',
      'url': 'https://velora.ai/seller-messages'
    }
  },
  {
    path: '/customer-messages',
    name: 'Customer Messages Center',
    category: 'customer',
    businessName: 'Velora AI',
    businessType: 'Customer inquiry & communication tools',
    targetCountry: 'Pakistan',
    targetCity: '',
    primaryKeyword: 'customer message templates for buyers',
    secondaryKeywords: [
      'product price inquiry message',
      'order status check whatsapp',
      'return request message to seller',
      'complaint message polite'
    ],
    targetLanguage: 'English & Urdu',
    searchIntent: 'Informational',
    title: 'Customer Message Templates for Online Buyers | Velora AI',
    description: 'Ready-to-use customer message templates: product inquiries, parcel status checks, payment proofs, and polite return requests for online shopping.',
    canonicalPath: '/customer-messages',
    h1Recommendation: 'Polite & Effective Customer Message Templates for Online Shopping',
    h2Suggestions: [
      'Product & Pricing Inquiry Messages',
      'Order Placement, COD & Parcel Tracking Queries',
      'Payment Verification & Screenshot Submission Messages',
      'Damaged Parcel Complaints & Return Inquiries'
    ],
    keywordMapping: {
      primary: 'customer message templates for buyers',
      secondary: ['product price inquiry message', 'parcel status check', 'polite complaint message'],
      recommendedDensity: '1.5%'
    },
    imageAltRecommendations: [
      'Customer communication templates for online shopping and order inquiries'
    ],
    ogTitle: 'Customer Message Templates for Online Buyers | Velora AI',
    ogDescription: 'Ready-to-use customer message templates for inquiries, parcel tracking, and polite complaints.',
    robots: 'index, follow',
    hreflang: [
      { lang: 'en', href: 'https://velora.ai/customer-messages' }
    ],
    internalLinkSuggestions: [
      { url: '/seller-messages', anchor: 'Switch to Seller Messages', context: 'If you run an online shop or business' },
      { url: '/ai-message-generator', anchor: 'Create Custom Inquiry with AI', context: 'Tailor a message to a specific store' }
    ],
    schema: {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      'name': 'Customer Message Templates Library',
      'description': 'Curated collection of customer-to-seller inquiry messages and return requests.',
      'url': 'https://velora.ai/customer-messages'
    }
  },
  {
    path: '/daily-quick-replies',
    name: 'Daily WhatsApp Quick Replies',
    category: 'tools',
    businessName: 'Velora AI',
    businessType: 'WhatsApp business canned responses',
    targetCountry: 'Pakistan',
    targetCity: '',
    primaryKeyword: 'WhatsApp quick replies for business',
    secondaryKeywords: [
      'canned responses for online sellers',
      'fast whatsapp replies urdu',
      'customer care quick text',
      'order greeting template'
    ],
    targetLanguage: 'English & Roman Urdu',
    searchIntent: 'Transactional',
    title: 'WhatsApp Quick Replies for Online Sellers & Support | Velora AI',
    description: 'Instant 1-click WhatsApp quick replies for online sellers. Greetings, price answers, banking instructions, and order dispatch canned templates.',
    canonicalPath: '/daily-quick-replies',
    h1Recommendation: 'Daily WhatsApp Quick Replies for High-Volume Online Sellers',
    h2Suggestions: [
      'Frequently Sent Greeting & Opening Replies',
      'Payment Information & Account Details Canned Text',
      'Out of Stock & Delivery Delay Quick Replies',
      'Roman Urdu & English Fast Copy Buttons'
    ],
    keywordMapping: {
      primary: 'WhatsApp quick replies for business',
      secondary: ['canned responses for online sellers', 'fast whatsapp replies urdu'],
      recommendedDensity: '2.0%'
    },
    imageAltRecommendations: [
      'WhatsApp quick reply buttons and one-click copy cards'
    ],
    ogTitle: 'WhatsApp Quick Replies for Online Sellers | Velora AI',
    ogDescription: 'Instant 1-click WhatsApp quick replies for online sellers and customer support.',
    robots: 'index, follow',
    hreflang: [
      { lang: 'en', href: 'https://velora.ai/daily-quick-replies' }
    ],
    internalLinkSuggestions: [
      { url: '/seller-messages', anchor: 'Full Seller Message Library', context: 'View in-depth comprehensive templates' },
      { url: '/ai-message-generator', anchor: 'Generate Custom Quick Reply', context: 'Use AI to generate tailored canned phrases' }
    ],
    schema: {
      '@context': 'https://schema.org',
      '@type': 'HowTo',
      'name': 'How to Use WhatsApp Quick Replies for Online Selling',
      'description': 'Speed up e-commerce communication with 1-click canned responses.'
    }
  },
  {
    path: '/ai-message-generator',
    name: 'AI Message Studio & Rewriter',
    category: 'tools',
    businessName: 'Velora AI',
    businessType: 'AI e-commerce copy generator',
    targetCountry: 'Pakistan & Global',
    targetCity: '',
    primaryKeyword: 'AI message generator for sellers and customers',
    secondaryKeywords: [
      'business message generator',
      'urdu ai translator e-commerce',
      'polite customer service ai writer',
      'whatsapp message rewriter'
    ],
    targetLanguage: 'Multilingual (English, Urdu, Roman Urdu, Hindi)',
    searchIntent: 'Commercial',
    title: 'AI Message Generator for Sellers & Customers | Velora AI',
    description: 'Generate, translate, and refine professional e-commerce messages in seconds with AI. Support for authentic Urdu, Roman Urdu, tone adjustments, and variables.',
    canonicalPath: '/ai-message-generator',
    h1Recommendation: 'Intelligent AI Message Studio for Online Sellers & Buyers',
    h2Suggestions: [
      'Custom Scenario & Prompt Synthesizer',
      'Tone Adjuster: Polite, Apologetic, Professional, or Firm',
      'Instant Urdu & Roman Urdu Translation Engine',
      'Batch Variations & Ready-to-Send Alternatives'
    ],
    keywordMapping: {
      primary: 'AI message generator for sellers and customers',
      secondary: ['business message generator', 'urdu ai translator', 'whatsapp message rewriter'],
      recommendedDensity: '1.6%'
    },
    imageAltRecommendations: [
      'AI message generation interface with tone selector and language tabs'
    ],
    ogTitle: 'AI Message Generator for Sellers & Customers | Velora AI',
    ogDescription: 'Generate, translate, and refine professional business messages in seconds with AI.',
    robots: 'index, follow',
    hreflang: [
      { lang: 'en', href: 'https://velora.ai/ai-message-generator' }
    ],
    internalLinkSuggestions: [
      { url: '/', anchor: 'Browse Popular Templates First', context: 'Start with curated pre-built templates' },
      { url: '/seller-messages', anchor: 'Seller Message Categories', context: 'Find inspiration from order management templates' }
    ],
    schema: {
      '@context': 'https://schema.org',
      '@type': 'WebApplication',
      'name': 'Velora AI Message Studio',
      'applicationCategory': 'BusinessApplication'
    }
  },
  {
    path: '/trending',
    name: 'Trending Business Templates',
    category: 'tools',
    businessName: 'Velora AI',
    businessType: 'Online seller communication tools',
    targetCountry: 'Pakistan',
    targetCity: '',
    primaryKeyword: 'popular e-commerce message templates',
    secondaryKeywords: [
      'most copied business messages',
      'top whatsapp seller templates',
      'viral customer service replies'
    ],
    targetLanguage: 'English & Urdu',
    searchIntent: 'Informational',
    title: 'Trending & Most Copied Business Message Templates | Velora AI',
    description: 'Discover the most copied e-commerce message templates of the week: top order confirmations, highest-converting payment requests, and polite quick replies.',
    canonicalPath: '/trending',
    h1Recommendation: 'Trending Business & Customer Message Templates Leaderboard',
    h2Suggestions: [
      'Top Copied Seller Order Updates',
      'Highest Converting Payment Reminder Templates',
      'Most Popular Customer Inquiries'
    ],
    keywordMapping: {
      primary: 'popular e-commerce message templates',
      secondary: ['top whatsapp seller templates', 'most copied business messages'],
      recommendedDensity: '1.4%'
    },
    imageAltRecommendations: [
      'Trending business messages leaderboard showing copy counts and popularity'
    ],
    ogTitle: 'Trending Business Message Templates | Velora AI',
    ogDescription: 'Explore the most copied e-commerce messages for WhatsApp, order confirmations, and payments.',
    robots: 'index, follow',
    hreflang: [
      { lang: 'en', href: 'https://velora.ai/trending' }
    ],
    internalLinkSuggestions: [
      { url: '/seller-messages', anchor: 'Seller Message Center', context: 'View all seller categories' },
      { url: '/daily-quick-replies', anchor: 'Quick WhatsApp Replies', context: 'Access quick canned replies' }
    ],
    schema: {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      'name': 'Trending Message Templates Leaderboard'
    }
  },
  {
    path: '/about',
    name: 'About Velora AI',
    category: 'legal',
    businessName: 'Velora AI',
    businessType: 'Communication platform company',
    targetCountry: 'Global',
    targetCity: '',
    primaryKeyword: 'about Velora AI message platform',
    secondaryKeywords: [
      'e-commerce communication software',
      'multilingual message technology',
      'pakistan seller communication tool'
    ],
    targetLanguage: 'English',
    searchIntent: 'Informational',
    title: 'About Velora AI – Next-Generation Seller & Customer Messaging',
    description: 'Learn about Velora AI: our mission to eliminate communication friction between online sellers and customers with intelligent, multilingual tools.',
    canonicalPath: '/about',
    h1Recommendation: 'Empowering Millions of Sellers & Buyers with Frictionless Words',
    h2Suggestions: [
      'Our Origin & The Anti-Cliche Mission',
      'Serving Modern Social Commerce Sellers in Pakistan & Beyond',
      'Multilingual AI with Urdu & Roman Urdu Fluency'
    ],
    keywordMapping: {
      primary: 'about Velora AI message platform',
      secondary: ['seller communication tools', 'multilingual messaging technology'],
      recommendedDensity: '1.2%'
    },
    imageAltRecommendations: [
      'Velora AI leadership and message platform engineering team philosophy'
    ],
    ogTitle: 'About Velora AI – Next-Generation Messaging',
    ogDescription: 'Learn how Velora AI is modernizing e-commerce seller and customer communication.',
    robots: 'index, follow',
    hreflang: [{ lang: 'en', href: 'https://velora.ai/about' }],
    internalLinkSuggestions: [
      { url: '/', anchor: 'Velora AI Home', context: 'Return to message library' },
      { url: '/contact', anchor: 'Contact Us', context: 'Send feedback or suggestions' }
    ],
    schema: {
      '@context': 'https://schema.org',
      '@type': 'AboutPage',
      'name': 'About Velora AI',
      'description': 'Information regarding Velora AI communication platform.'
    }
  },
  {
    path: '/contact',
    name: 'Contact & Support',
    category: 'legal',
    businessName: 'Velora AI',
    businessType: 'Software support service',
    targetCountry: 'Global',
    targetCity: '',
    primaryKeyword: 'contact Velora AI support',
    secondaryKeywords: [
      'customer support message suggestions',
      'enterprise seller messaging inquiry'
    ],
    targetLanguage: 'English',
    searchIntent: 'Navigational',
    title: 'Contact Velora AI – Support, Feedback & Template Inquiries',
    description: 'Get in touch with the Velora AI team for template category requests, partnership inquiries, bug reports, and user feedback.',
    canonicalPath: '/contact',
    h1Recommendation: 'Get in Touch with the Velora AI Engineering Team',
    h2Suggestions: [
      'Submit a Feature or Template Request',
      'Report an Issue or Broken Link',
      'Enterprise & Seller Integrations'
    ],
    keywordMapping: {
      primary: 'contact Velora AI support',
      secondary: ['template inquiry', 'customer feedback'],
      recommendedDensity: '1.2%'
    },
    imageAltRecommendations: ['Velora AI contact and customer support form'],
    ogTitle: 'Contact Velora AI Support',
    ogDescription: 'Contact our team for questions, template suggestions, or enterprise partnerships.',
    robots: 'index, follow',
    hreflang: [{ lang: 'en', href: 'https://velora.ai/contact' }],
    internalLinkSuggestions: [
      { url: '/', anchor: 'Back to Home', context: 'Explore messaging library' },
      { url: '/privacy', anchor: 'Privacy Policy', context: 'Review data protection practices' }
    ],
    schema: {
      '@context': 'https://schema.org',
      '@type': 'ContactPage',
      'name': 'Contact Velora AI Support'
    }
  },
  {
    path: '/privacy',
    name: 'Privacy Policy & Cookies',
    category: 'legal',
    businessName: 'Velora AI',
    businessType: 'Legal & Compliance',
    targetCountry: 'Global',
    targetCity: '',
    primaryKeyword: 'Velora AI privacy policy',
    secondaryKeywords: [
      'data protection seller communication',
      'cookie policy google adsense'
    ],
    targetLanguage: 'English',
    searchIntent: 'Informational',
    title: 'Privacy Policy & Cookie Policy | Velora AI',
    description: 'Read Velora AI’s privacy policy and cookie disclosures in compliance with Google AdSense, GDPR, and international data protection standards.',
    canonicalPath: '/privacy',
    h1Recommendation: 'Privacy Policy & Data Protection at Velora AI',
    h2Suggestions: [
      'Information We Collect & Server-Side Security',
      'Third-Party Advertising & DoubleClick Cookies',
      'Zero Sale of Personal Communications'
    ],
    keywordMapping: {
      primary: 'Velora AI privacy policy',
      secondary: ['cookie disclosures', 'data protection'],
      recommendedDensity: '1.0%'
    },
    imageAltRecommendations: ['Velora AI data privacy and security shield'],
    ogTitle: 'Privacy Policy | Velora AI',
    ogDescription: 'Review our strict privacy policy and cookie disclosures.',
    robots: 'index, follow',
    hreflang: [{ lang: 'en', href: 'https://velora.ai/privacy' }],
    internalLinkSuggestions: [
      { url: '/terms', anchor: 'Terms of Service', context: 'View terms and acceptable use' },
      { url: '/contact', anchor: 'Contact Data Team', context: 'Questions regarding your privacy' }
    ],
    schema: {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      'name': 'Privacy Policy'
    }
  },
  {
    path: '/terms',
    name: 'Terms of Service',
    category: 'legal',
    businessName: 'Velora AI',
    businessType: 'Legal & Compliance',
    targetCountry: 'Global',
    targetCity: '',
    primaryKeyword: 'Velora AI terms of service',
    secondaryKeywords: [
      'acceptable use policy message platform',
      'template copyright and license'
    ],
    targetLanguage: 'English',
    searchIntent: 'Informational',
    title: 'Terms of Service | Velora AI',
    description: 'Terms of service and acceptable use agreement for the Velora AI message generation platform and template library.',
    canonicalPath: '/terms',
    h1Recommendation: 'Velora AI Terms of Service & Acceptable Use Policy',
    h2Suggestions: [
      'Permitted Commercial & Personal Message Usage',
      'Prohibited Activities & Anti-Spam Enforcements',
      'Intellectual Property and Disclaimers'
    ],
    keywordMapping: {
      primary: 'Velora AI terms of service',
      secondary: ['acceptable use', 'commercial message license'],
      recommendedDensity: '1.0%'
    },
    imageAltRecommendations: ['Velora AI terms of service and legal agreement'],
    ogTitle: 'Terms of Service | Velora AI',
    ogDescription: 'Review the terms and conditions for accessing Velora AI.',
    robots: 'index, follow',
    hreflang: [{ lang: 'en', href: 'https://velora.ai/terms' }],
    internalLinkSuggestions: [
      { url: '/privacy', anchor: 'Privacy Policy', context: 'Read privacy policy' },
      { url: '/', anchor: 'Return to Messaging Hub', context: 'Browse messaging library' }
    ],
    schema: {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      'name': 'Terms of Service'
    }
  }
];
