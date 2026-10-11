import React, { useState, useEffect } from 'react';
import { 
  Store, 
  UserCheck, 
  Sparkles, 
  Filter, 
  Search, 
  ArrowRight, 
  PackageCheck, 
  CreditCard, 
  Truck, 
  Headphones, 
  Zap, 
  Tag, 
  Megaphone, 
  Boxes, 
  HeartHandshake, 
  Building2,
  HelpCircle,
  ShoppingBag,
  AlertTriangle,
  Percent
} from 'lucide-react';
import { SELLER_CATEGORIES, CUSTOMER_CATEGORIES } from '../data/sellerCustomerCategories';
import { BUSINESS_TYPES } from '../data/languages';
import { Template, MessageRole } from '../types';
import { MessageCard } from './MessageCard';
import { useNavigation } from '../context/NavigationContext';

interface SellerCustomerCenterProps {
  onOpenShare: (template: Template) => void;
  onOpenPersonalize: (template: Template) => void;
  externalSearchQuery?: string;
}

export const SellerCustomerCenter: React.FC<SellerCustomerCenterProps> = ({
  onOpenShare,
  onOpenPersonalize,
  externalSearchQuery = ''
}) => {
  const { navigate } = useNavigation();

  const [activeRole, setActiveRole] = useState<MessageRole>('seller');
  const [selectedCategorySlug, setSelectedCategorySlug] = useState<string>('all');
  const [selectedSubcategorySlug, setSelectedSubcategorySlug] = useState<string>('all');
  const [selectedBusinessType, setSelectedBusinessType] = useState<string>('all');
  const [templates, setTemplates] = useState<Template[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [totalCount, setTotalCount] = useState<number>(0);

  const categories = activeRole === 'seller' ? SELLER_CATEGORIES : CUSTOMER_CATEGORIES;
  const currentCategory = categories.find(c => c.slug === selectedCategorySlug);

  // Fetch templates whenever filters change
  useEffect(() => {
    let isMounted = true;
    const fetchTemplates = async () => {
      setLoading(true);
      try {
        let url = `/api/templates?role=${activeRole}&page=${page}&limit=9`;
        if (selectedCategorySlug !== 'all') {
          url += `&category=${selectedCategorySlug}`;
        }
        if (selectedSubcategorySlug !== 'all') {
          url += `&subcategory=${selectedSubcategorySlug}`;
        }
        if (selectedBusinessType !== 'all') {
          url += `&businessType=${selectedBusinessType}`;
        }
        if (externalSearchQuery.trim()) {
          url += `&query=${encodeURIComponent(externalSearchQuery.trim())}`;
        }

        const res = await fetch(url);
        if (res.ok) {
          const data = await res.json();
          if (isMounted) {
            setTemplates(data.templates || []);
            setTotalPages(data.pagination?.totalPages || 1);
            setTotalCount(data.pagination?.total || 0);
          }
        }
      } catch (err) {
        console.error('Error fetching business templates:', err);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchTemplates();
    return () => { isMounted = false; };
  }, [activeRole, selectedCategorySlug, selectedSubcategorySlug, selectedBusinessType, externalSearchQuery, page]);

  // When changing role, reset category and page
  const handleRoleChange = (role: MessageRole) => {
    setActiveRole(role);
    setSelectedCategorySlug('all');
    setSelectedSubcategorySlug('all');
    setPage(1);
  };

  const handleCategorySelect = (slug: string) => {
    setSelectedCategorySlug(slug);
    setSelectedSubcategorySlug('all');
    setPage(1);
  };

  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'PackageCheck': return <PackageCheck className="h-4 w-4" />;
      case 'CreditCard': return <CreditCard className="h-4 w-4" />;
      case 'Truck': return <Truck className="h-4 w-4" />;
      case 'Headphones': return <Headphones className="h-4 w-4" />;
      case 'Zap': return <Zap className="h-4 w-4" />;
      case 'Tag': return <Tag className="h-4 w-4" />;
      case 'Megaphone': return <Megaphone className="h-4 w-4" />;
      case 'Boxes': return <Boxes className="h-4 w-4" />;
      case 'HeartHandshake': return <HeartHandshake className="h-4 w-4" />;
      case 'Building2': return <Building2 className="h-4 w-4" />;
      case 'HelpCircle': return <HelpCircle className="h-4 w-4" />;
      case 'ShoppingBag': return <ShoppingBag className="h-4 w-4" />;
      case 'AlertTriangle': return <AlertTriangle className="h-4 w-4" />;
      case 'Percent': return <Percent className="h-4 w-4" />;
      default: return <Sparkles className="h-4 w-4" />;
    }
  };

  return (
    <section id="seller-customer-center" className="py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-4 py-1.5 text-xs font-bold text-indigo-300 shadow-sm">
            <Store className="h-3.5 w-3.5 text-indigo-400" />
            <span>Core Hub • E-Commerce & Retail Communication</span>
          </div>

          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white">
            Seller & Customer Message Center
          </h2>
          <p className="text-sm sm:text-base text-slate-300">
            High-converting, courteous, ready-to-copy WhatsApp, SMS, and DM scripts with independent per-card language translation.
          </p>
        </div>

        {/* Central Dual Tabs: SELLER MESSAGES vs CUSTOMER MESSAGES */}
        <div className="flex justify-center">
          <div className="inline-flex rounded-2xl bg-slate-900 border border-slate-800 p-1.5 shadow-xl">
            <button
              onClick={() => handleRoleChange('seller')}
              className={`flex items-center gap-2 rounded-xl px-6 py-3 text-xs sm:text-sm font-bold transition-all ${
                activeRole === 'seller'
                  ? 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-lg shadow-indigo-600/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Store className="h-4 w-4" />
              <span>Seller Messages (10 Categories)</span>
            </button>

            <button
              onClick={() => handleRoleChange('customer')}
              className={`flex items-center gap-2 rounded-xl px-6 py-3 text-xs sm:text-sm font-bold transition-all ${
                activeRole === 'customer'
                  ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg shadow-emerald-600/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <UserCheck className="h-4 w-4" />
              <span>Customer Messages</span>
            </button>
          </div>
        </div>

        {/* Business Type Quick Filter (Fashion, Mobiles, Cosmetics, Wholesale, etc.) */}
        <div className="flex items-center justify-between gap-4 border-b border-slate-800/80 pb-3">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-400 uppercase tracking-wider shrink-0">
            <Filter className="h-3.5 w-3.5 text-indigo-400" />
            <span>Business Niche:</span>
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-xs">
            {BUSINESS_TYPES.map(bt => (
              <button
                key={bt.id}
                onClick={() => { setSelectedBusinessType(bt.id); setPage(1); }}
                className={`rounded-xl px-3 py-1.5 font-medium whitespace-nowrap transition-colors ${
                  selectedBusinessType === bt.id
                    ? 'bg-indigo-600 text-white'
                    : 'bg-slate-900 border border-slate-800 text-slate-300 hover:bg-slate-800'
                }`}
              >
                {bt.name}
              </button>
            ))}
          </div>
        </div>

        {/* Category Pills Bar */}
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span className="font-semibold uppercase tracking-wider">
              {activeRole === 'seller' ? 'Seller Categories' : 'Customer Categories'} ({categories.length}):
            </span>
            <span>{totalCount} total templates found</span>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none text-xs">
            <button
              onClick={() => handleCategorySelect('all')}
              className={`flex items-center gap-1.5 rounded-xl px-4 py-2.5 font-bold whitespace-nowrap transition-all ${
                selectedCategorySlug === 'all'
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'bg-slate-900 border border-slate-800 text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <Sparkles className="h-3.5 w-3.5" />
              <span>All Categories</span>
            </button>

            {categories.map(cat => (
              <button
                key={cat.slug}
                onClick={() => handleCategorySelect(cat.slug)}
                className={`flex items-center gap-2 rounded-xl px-4 py-2.5 font-semibold whitespace-nowrap transition-all ${
                  selectedCategorySlug === cat.slug
                    ? 'bg-indigo-600 text-white shadow-md'
                    : 'bg-slate-900 border border-slate-800 text-slate-300 hover:bg-slate-800 hover:text-white'
                }`}
              >
                {getCategoryIcon(cat.icon)}
                <span>{cat.name}</span>
                {cat.badge && (
                  <span className="rounded-full bg-slate-800 px-1.5 py-0.2 text-[9px] text-indigo-300 border border-slate-700">
                    {cat.badge}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Subcategories (if a category is selected) */}
        {currentCategory && currentCategory.subcategories.length > 0 && (
          <div className="rounded-2xl border border-slate-800/80 bg-slate-950/60 p-3.5 space-y-2">
            <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
              Subtopics in {currentCategory.name}:
            </div>
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-xs">
              <button
                onClick={() => { setSelectedSubcategorySlug('all'); setPage(1); }}
                className={`rounded-lg px-2.5 py-1 font-medium whitespace-nowrap transition-colors ${
                  selectedSubcategorySlug === 'all'
                    ? 'bg-indigo-600 text-white'
                    : 'bg-slate-900 text-slate-400 hover:text-white'
                }`}
              >
                All Subtopics
              </button>
              {currentCategory.subcategories.map(sub => (
                <button
                  key={sub.slug}
                  onClick={() => { setSelectedSubcategorySlug(sub.slug); setPage(1); }}
                  className={`rounded-lg px-2.5 py-1 font-medium whitespace-nowrap transition-colors ${
                    selectedSubcategorySlug === sub.slug
                      ? 'bg-indigo-600 text-white'
                      : 'bg-slate-900 text-slate-400 hover:text-white'
                  }`}
                >
                  {sub.name}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Message Templates Grid */}
        <div>
          {loading ? (
            <div className="py-20 text-center space-y-3">
              <Sparkles className="mx-auto h-7 w-7 animate-spin text-indigo-400" />
              <p className="text-xs text-slate-400">Loading business communication templates...</p>
            </div>
          ) : templates.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {templates.map(tmpl => (
                <MessageCard
                  key={tmpl.id}
                  template={tmpl}
                  onOpenShare={onOpenShare}
                  onOpenPersonalize={onOpenPersonalize}
                />
              ))}
            </div>
          ) : (
            <div className="py-16 text-center rounded-3xl border border-slate-800 bg-slate-900/50 p-8 space-y-3">
              <p className="text-base font-bold text-white">No templates found for this search or filter combination.</p>
              <p className="text-xs text-slate-400 max-w-md mx-auto">
                Try switching business types or clear your search keyword. You can also generate a custom AI message.
              </p>
              <button
                onClick={() => {
                  setSelectedCategorySlug('all');
                  setSelectedSubcategorySlug('all');
                  setSelectedBusinessType('all');
                }}
                className="rounded-xl bg-slate-800 px-4 py-2 text-xs font-semibold text-white hover:bg-slate-700"
              >
                Reset All Filters
              </button>
            </div>
          )}
        </div>

        {/* Pagination controls */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between border-t border-slate-800/80 pt-6 text-xs text-slate-400">
            <span>Showing page {page} of {totalPages} ({totalCount} templates)</span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page <= 1}
                className="rounded-lg border border-slate-800 bg-slate-900 px-3 py-1.5 text-slate-300 disabled:opacity-40"
              >
                Previous
              </button>
              <button
                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                disabled={page >= totalPages}
                className="rounded-lg border border-slate-800 bg-slate-900 px-3 py-1.5 text-slate-300 disabled:opacity-40"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
