import React, { useState, useEffect } from 'react';
import { 
  ChevronRight, 
  Filter, 
  Sparkles, 
  Search, 
  Store, 
  UserCheck, 
  ArrowLeft, 
  ArrowRight 
} from 'lucide-react';
import { SELLER_CATEGORIES, CUSTOMER_CATEGORIES } from '../data/sellerCustomerCategories';
import { CATEGORIES } from '../data/categories';
import { Template } from '../types';
import { MessageCard } from '../components/MessageCard';
import { SEOHelmet } from '../components/SEOHelmet';
import { useNavigation } from '../context/NavigationContext';

interface CategoryPageProps {
  onOpenShare: (template: Template) => void;
  onOpenPersonalize: (template: Template) => void;
}

export const CategoryPage: React.FC<CategoryPageProps> = ({
  onOpenShare,
  onOpenPersonalize
}) => {
  const { categorySlug, subcategorySlug, role, navigate } = useNavigation();

  const [templates, setTemplates] = useState<Template[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>(subcategorySlug || 'all');
  const [selectedTone, setSelectedTone] = useState<string>('all');
  const [selectedLength, setSelectedLength] = useState<string>('all');
  const [categorySearch, setCategorySearch] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  // Search across Seller, Customer, and General categories
  const allKnownCategories = [...SELLER_CATEGORIES, ...CUSTOMER_CATEGORIES, ...CATEGORIES];
  const category = allKnownCategories.find(c => c.slug === categorySlug) || SELLER_CATEGORIES[0];
  const activeSubcategory = category.subcategories.find(s => s.slug === (subcategorySlug || selectedSubcategory));

  useEffect(() => {
    if (subcategorySlug) {
      setSelectedSubcategory(subcategorySlug);
    } else {
      setSelectedSubcategory('all');
    }
    setPage(1);
  }, [categorySlug, subcategorySlug]);

  useEffect(() => {
    let isMounted = true;
    const fetchTemplates = async () => {
      setLoading(true);
      try {
        let url = `/api/templates?category=${category.slug}&page=${page}&limit=9`;
        if (selectedSubcategory !== 'all') {
          url += `&subcategory=${selectedSubcategory}`;
        }
        if (selectedTone !== 'all') {
          url += `&tone=${selectedTone}`;
        }
        if (selectedLength !== 'all') {
          url += `&length=${selectedLength}`;
        }
        if (categorySearch.trim()) {
          url += `&query=${encodeURIComponent(categorySearch.trim())}`;
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
        console.error('Error loading category templates:', err);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchTemplates();
    return () => { isMounted = false; };
  }, [category.slug, selectedSubcategory, selectedTone, selectedLength, categorySearch, page]);

  const basePath = category.role === 'customer' 
    ? '/customer-messages' 
    : (category.role === 'seller' ? '/seller-messages' : '/messages');

  const handleSubcategoryChange = (slug: string) => {
    setSelectedSubcategory(slug);
    setPage(1);
    if (slug === 'all') {
      navigate(`${basePath}/${category.slug}`);
    } else {
      navigate(`${basePath}/${category.slug}/${slug}`);
    }
  };

  return (
    <div className="min-h-screen py-8 sm:py-12">
      <SEOHelmet
        title={activeSubcategory ? `${activeSubcategory.name} Messages & Templates | Velora AI` : category.seoTitle}
        description={activeSubcategory ? `${activeSubcategory.description}. Find, personalize, copy, and share curated business messages.` : category.seoDescription}
        canonicalPath={subcategorySlug ? `${basePath}/${category.slug}/${subcategorySlug}` : `${basePath}/${category.slug}`}
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs text-slate-400">
          <button onClick={() => navigate('/')} className="hover:text-white transition-colors">Home</button>
          <ChevronRight className="h-3 w-3 text-slate-600" />
          <button onClick={() => navigate(basePath)} className="hover:text-white transition-colors">
            {category.role === 'customer' ? 'Customer Messages' : 'Seller Messages'}
          </button>
          <ChevronRight className="h-3 w-3 text-slate-600" />
          <span className="text-slate-300 font-medium">{category.name}</span>
          {activeSubcategory && selectedSubcategory !== 'all' && (
            <>
              <ChevronRight className="h-3 w-3 text-slate-600" />
              <span className="text-indigo-400 font-medium">{activeSubcategory.name}</span>
            </>
          )}
        </nav>

        {/* Category Hero / Header */}
        <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6 sm:p-10 shadow-xl backdrop-blur-xl space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-3 max-w-2xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-3.5 py-1 text-xs font-bold text-indigo-300">
                {category.role === 'customer' ? <UserCheck className="h-3.5 w-3.5 text-emerald-400" /> : <Store className="h-3.5 w-3.5 text-indigo-400" />}
                <span>{category.role === 'customer' ? 'Customer Communication Category' : 'Seller Communication Category'}</span>
              </div>
              <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-white">
                {activeSubcategory && selectedSubcategory !== 'all' ? activeSubcategory.name : category.name}
              </h1>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                {activeSubcategory && selectedSubcategory !== 'all' ? activeSubcategory.description : category.description}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
              <button
                onClick={() => {
                  sessionStorage.setItem('velora_seed_purpose', `Message regarding ${category.name}`);
                  navigate('/ai-message-generator');
                }}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-2xl bg-indigo-600 px-5 py-3 text-xs sm:text-sm font-bold text-white shadow-lg shadow-indigo-600/25 hover:bg-indigo-500 transition-all"
              >
                <Sparkles className="h-4 w-4" />
                <span>Synthesize with AI</span>
              </button>
            </div>
          </div>

          {/* Subcategory Pills Carousel */}
          {category.subcategories.length > 0 && (
            <div className="pt-6 border-t border-slate-800/80">
              <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
                Subcategories ({category.subcategories.length}):
              </div>
              <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
                <button
                  onClick={() => handleSubcategoryChange('all')}
                  className={`rounded-xl px-3.5 py-2 text-xs font-semibold whitespace-nowrap transition-colors ${
                    selectedSubcategory === 'all'
                      ? 'bg-indigo-600 text-white'
                      : 'bg-slate-950/80 border border-slate-800 text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  All Topics ({category.subcategories.length})
                </button>
                {category.subcategories.map(sub => (
                  <button
                    key={sub.slug}
                    onClick={() => handleSubcategoryChange(sub.slug)}
                    className={`rounded-xl px-3.5 py-2 text-xs font-semibold whitespace-nowrap transition-colors ${
                      selectedSubcategory === sub.slug
                        ? 'bg-indigo-600 text-white'
                        : 'bg-slate-950/80 border border-slate-800 text-slate-300 hover:bg-slate-800'
                    }`}
                  >
                    {sub.name}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Filter Controls Bar */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 rounded-2xl border border-slate-800 bg-slate-900/50 p-4">
          <div className="relative flex-grow max-w-md">
            <Search className="absolute left-3.5 top-2.5 h-4 w-4 text-slate-400" />
            <input
              type="text"
              value={categorySearch}
              onChange={e => { setCategorySearch(e.target.value); setPage(1); }}
              placeholder={`Filter in ${category.name}...`}
              className="w-full rounded-xl border border-slate-800 bg-slate-950 pl-10 pr-4 py-2 text-xs text-white placeholder-slate-400 focus:border-indigo-500 focus:outline-none"
            />
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400">Tone:</span>
              <select
                value={selectedTone}
                onChange={e => { setSelectedTone(e.target.value); setPage(1); }}
                className="rounded-xl border border-slate-800 bg-slate-950 px-3 py-1.5 text-xs text-white focus:border-indigo-500 focus:outline-none capitalize"
              >
                <option value="all">All Tones</option>
                <option value="polite">Polite</option>
                <option value="professional">Professional</option>
                <option value="direct">Direct</option>
                <option value="apologetic">Apologetic</option>
                <option value="friendly">Friendly</option>
                <option value="confident">Confident</option>
              </select>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400">Length:</span>
              <select
                value={selectedLength}
                onChange={e => { setSelectedLength(e.target.value); setPage(1); }}
                className="rounded-xl border border-slate-800 bg-slate-950 px-3 py-1.5 text-xs text-white focus:border-indigo-500 focus:outline-none capitalize"
              >
                <option value="all">All Lengths</option>
                <option value="short">Short</option>
                <option value="medium">Medium</option>
                <option value="long">Long</option>
              </select>
            </div>
          </div>
        </div>

        {/* Templates Grid with Independent Language Dropdowns */}
        <div>
          {loading ? (
            <div className="py-24 text-center space-y-3">
              <Sparkles className="mx-auto h-6 w-6 animate-spin text-indigo-400" />
              <p className="text-xs text-slate-400">Loading messages for {category.name}...</p>
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
            <div className="py-20 text-center rounded-3xl border border-slate-800 bg-slate-900/40 p-8 space-y-3">
              <p className="text-base font-bold text-white">No templates found for this filter combination.</p>
              <button
                onClick={() => {
                  setSelectedSubcategory('all');
                  setSelectedTone('all');
                  setSelectedLength('all');
                  setCategorySearch('');
                }}
                className="rounded-xl bg-slate-800 px-4 py-2 text-xs font-semibold text-white hover:bg-slate-700"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between border-t border-slate-800 pt-6 text-xs text-slate-400">
            <span>Showing page {page} of {totalPages} ({totalCount} total)</span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page <= 1}
                className="rounded-lg border border-slate-800 bg-slate-900 px-3 py-1.5 text-slate-300 disabled:opacity-40"
              >
                Prev
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
    </div>
  );
};
