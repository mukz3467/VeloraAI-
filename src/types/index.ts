export type MessageTone = 
  | 'romantic'
  | 'emotional'
  | 'professional'
  | 'friendly'
  | 'funny'
  | 'polite'
  | 'confident'
  | 'persuasive'
  | 'formal'
  | 'inspirational'
  | 'apologetic'
  | 'direct'
  | 'sympathetic';

export type MessageLength = 'short' | 'medium' | 'long';

export type MessageRole = 'seller' | 'customer';

export type SupportedLanguageCode = 
  | 'en' // English
  | 'ur' // Urdu
  | 'ur-latn' // Roman Urdu
  | 'hi' // Hindi
  | 'ar' // Arabic
  | 'es' // Spanish
  | 'fr' // French
  | 'de' // German
  | 'tr' // Turkish
  | 'id'; // Indonesian

export interface LanguageOption {
  code: SupportedLanguageCode;
  name: string;
  nativeName: string;
  direction: 'ltr' | 'rtl';
  flag: string;
  fontClass?: string;
}

export interface Template {
  id: string;
  title: string;
  categorySlug: string;
  subcategorySlug: string;
  role?: MessageRole;
  text: string; // Default English or master text
  tone: MessageTone;
  length: MessageLength;
  language: string;
  tags: string[];
  copyCount: number;
  favoriteCount: number;
  recipient?: string;
  occasion?: string;
  variables?: string[]; // e.g. ["customer_name", "shop_name", "order_number", "price"]
  businessTypes?: string[];
  isQuickReply?: boolean;
  translations?: Partial<Record<SupportedLanguageCode, string>>;
}

export interface SubCategory {
  slug: string;
  name: string;
  description: string;
  templateCount?: number;
}

export interface Category {
  id: string;
  slug: string;
  name: string;
  icon: string;
  role?: MessageRole;
  description: string;
  badge?: string;
  gradient: string;
  accentColor: string;
  subcategories: SubCategory[];
  seoTitle: string;
  seoDescription: string;
}

export interface GenerationInput {
  purpose: string;
  role: MessageRole;
  recipient: string;
  businessType?: string;
  productDetails?: string;
  relationship?: string;
  tone: MessageTone;
  language: string;
  length: MessageLength;
  keywords?: string;
  personalDetails?: string;
}

export interface GeneratedResult {
  id: string;
  text: string;
  role: MessageRole;
  tone: MessageTone;
  length: MessageLength;
  language: string;
  timestamp: number;
  purpose: string;
  recipient: string;
  alternatives?: string[];
}

export interface AnalyticsSummary {
  totalGenerations: number;
  totalCopies: number;
  trendingSearches: { query: string; count: number }[];
  popularCategories: { slug: string; name: string; copies: number }[];
  activeUsersOnline: number;
}

export interface UserSavedCollection {
  id: string;
  name: string;
  color: string;
  templateIds: string[];
}

export interface BusinessProfile {
  shopName: string;
  businessType: string;
  contactNumber: string;
  shopAddress: string;
  city: string;
  preferredLanguage: string;
  standardCurrency: string;
  defaultDeliveryCharges: string;
  jazzcashNumber: string;
  easypaisaNumber: string;
  bankDetails: string;
  businessHours: string;
}

export interface PersonalizationValues {
  shopName: string;
  customerName: string;
  productName: string;
  price: string;
  quantity: string;
  orderNumber: string;
  trackingNumber: string;
  courierCompany: string;
  deliveryDate: string;
  paymentMethod: string;
  deliveryCharges: string;
  contactNumber: string;
  address: string;
  city: string;
  customNote: string;
}
