import { LanguageOption, SupportedLanguageCode } from '../types';

export const SUPPORTED_LANGUAGES: LanguageOption[] = [
  {
    code: 'en',
    name: 'English',
    nativeName: 'English',
    direction: 'ltr',
    flag: '🇬🇧'
  },
  {
    code: 'ur',
    name: 'Urdu',
    nativeName: 'اردو',
    direction: 'rtl',
    flag: '🇵🇰',
    fontClass: 'font-urdu'
  },
  {
    code: 'ur-latn',
    name: 'Roman Urdu',
    nativeName: 'Roman Urdu',
    direction: 'ltr',
    flag: '🇵🇰'
  },
  {
    code: 'hi',
    name: 'Hindi',
    nativeName: 'हिन्दी',
    direction: 'ltr',
    flag: '🇮🇳',
    fontClass: 'font-hindi'
  },
  {
    code: 'ar',
    name: 'Arabic',
    nativeName: 'العربية',
    direction: 'rtl',
    flag: '🇦🇪',
    fontClass: 'font-arabic'
  },
  {
    code: 'es',
    name: 'Spanish',
    nativeName: 'Español',
    direction: 'ltr',
    flag: '🇪🇸'
  },
  {
    code: 'fr',
    name: 'French',
    nativeName: 'Français',
    direction: 'ltr',
    flag: '🇫🇷'
  },
  {
    code: 'de',
    name: 'German',
    nativeName: 'Deutsch',
    direction: 'ltr',
    flag: '🇩🇪'
  },
  {
    code: 'tr',
    name: 'Turkish',
    nativeName: 'Türkçe',
    direction: 'ltr',
    flag: '🇹🇷'
  },
  {
    code: 'id',
    name: 'Indonesian',
    nativeName: 'Bahasa Indonesia',
    direction: 'ltr',
    flag: '🇮🇩'
  }
];

export const BUSINESS_TYPES: { id: string; name: string; icon: string }[] = [
  { id: 'all', name: 'All Business Types', icon: 'Store' },
  { id: 'clothing-fashion', name: 'Clothing & Fashion', icon: 'Shirt' },
  { id: 'cosmetics-skincare', name: 'Cosmetics & Skincare', icon: 'Sparkles' },
  { id: 'mobiles-accessories', name: 'Mobile & Accessories', icon: 'Smartphone' },
  { id: 'electronics', name: 'Electronics & Gadgets', icon: 'Tv' },
  { id: 'grocery-household', name: 'Grocery & Household', icon: 'ShoppingBag' },
  { id: 'shoes-bags', name: 'Shoes & Bags', icon: 'Footprints' },
  { id: 'jewelry', name: 'Jewelry & Watches', icon: 'Watch' },
  { id: 'furniture-decor', name: 'Furniture & Home Decor', icon: 'Armchair' },
  { id: 'food-bakery', name: 'Food, Bakery & Sweets', icon: 'Utensils' },
  { id: 'retail-wholesale', name: 'Retailers & Wholesale B2B', icon: 'Boxes' },
  { id: 'digital-products', name: 'Digital Products & Services', icon: 'Code' },
  { id: 'other', name: 'Other Businesses', icon: 'Briefcase' }
];
