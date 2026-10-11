import React, { useState, useEffect } from 'react';
import { 
  Copy, 
  Check, 
  Bookmark, 
  Share2, 
  Sparkles, 
  Sliders, 
  ArrowLeft, 
  ChevronRight, 
  Clock, 
  FileText,
  Heart,
  BarChart2
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { Template } from '../types';
import { CATEGORIES } from '../data/categories';
import { SELLER_CATEGORIES, CUSTOMER_CATEGORIES } from '../data/sellerCustomerCategories';
import { SEOHelmet } from '../components/SEOHelmet';
import { MessageCard } from '../components/MessageCard';
import { useNavigation } from '../context/NavigationContext';
import { useFavorites } from '../context/FavoritesContext';

interface TemplateDetailPageProps {
  onOpenShare: (template: Template) => void;
  onOpenPersonalize: (template: Template) => void;
}

export const TemplateDetailPage: React.FC<TemplateDetailPageProps> = ({
  onOpenShare,
  onOpenPersonalize
}) => {
  const { templateId, navigate } = useNavigation();
  const { isFavorite, toggleFavorite, recordCopy } = useFavorites();

  const [template, setTemplate] = useState<Template | null>(null);
  const [related, setRelated] = useState<Template[]>([]);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const [variables, setVariables] = useState<Record<string, string>>({});

  useEffect(() => {
    if (!templateId) return;

    let isMounted = true;
    const fetchTemplate = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/templates/${templateId}`);
        if (res.ok) {
          const data = await res.json();
          if (isMounted) {
            setTemplate(data.template);
            setRelated(data.related || []);

            // Init variable state
            if (data.template?.variables) {
              const initVars: Record<string, string> = {};
              data.template.variables.forEach((v: string) => { initVars[v] = ''; });
              setVariables(initVars);
            }
          }
        }
      } catch (err) {
        console.error('Error fetching template:', err);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchTemplate();
    return () => { isMounted = false; };
  }, [templateId]);

  if (loading) {
    return (
      <div className="min-h-screen py-24 text-center space-y-3">
        <Sparkles className="mx-auto h-8 w-8 animate-spin text-indigo-400" />
        <p className="text-sm text-slate-400">Loading message template details...</p>
      </div>
    );
  }

  if (!template) {
    return (
      <div className="min-h-screen py-24 text-center space-y-4">
        <h2 className="text-xl font-bold text-white">Template Not Found</h2>
        <p className="text-xs text-slate-400">The requested template could not be located in our universe.</p>
        <button
          onClick={() => navigate('/explore')}
          className="rounded-xl bg-indigo-600 px-4 py-2 text-xs font-semibold text-white"
        >
          Explore All Categories
        </button>
      </div>
    );
  }

  const allCategories = [...SELLER_CATEGORIES, ...CUSTOMER_CATEGORIES, ...CATEGORIES];
  const category = allCategories.find(c => c.slug === template.categorySlug);
  const favorited = isFavorite(template.id);

  // Substitute variables (handles both [variable] and {{variable}} syntaxes)
  let renderedText = template.text;
  Object.entries(variables).forEach(([k, v]) => {
    if (v.trim()) {
      renderedText = renderedText.replaceAll(`[${k}]`, v.trim());
      renderedText = renderedText.replaceAll(`{{${k}}}`, v.trim());
    }
  });

  const words = renderedText.trim().split(/\s+/).length;
  const chars = renderedText.length;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(renderedText);
      setCopied(true);
      recordCopy(template.id, renderedText);

      confetti({
        particleCount: 35,
        spread: 55,
        origin: { y: 0.6 }
      });

      setTimeout(() => setCopied(false), 2000);
    } catch {}
  };

  const handleAISpin = () => {
    sessionStorage.setItem('velora_seed_prompt', renderedText);
    sessionStorage.setItem('velora_seed_tone', template.tone);
    navigate('/ai-message-generator');
  };

  const categoryPath = category?.role === 'customer'
    ? `/customer-messages/${category.slug}`
    : category?.role === 'seller'
      ? `/seller-messages/${category.slug}`
      : `/messages/${category?.slug || 'explore'}`;

  return (
    <div className="min-h-screen py-8 sm:py-12">
      <SEOHelmet
        title={`${template.title} – Template & Customizer | Velora AI`}
        description={`"${template.text.substring(0, 140)}..." Read, personalize, and copy this ${template.tone} message.`}
        canonicalPath={`/templates/${template.id}`}
      />

      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <button onClick={() => navigate(category?.role === 'seller' ? '/seller-messages' : (category?.role === 'customer' ? '/customer-messages' : '/explore'))} className="hover:text-white flex items-center gap-1">
            <ArrowLeft className="h-3 w-3" />
            <span>{category?.role === 'seller' ? 'Seller Messages' : (category?.role === 'customer' ? 'Customer Messages' : 'Categories')}</span>
          </button>
          <ChevronRight className="h-3 w-3 text-slate-600" />
          {category && (
            <>
              <button onClick={() => navigate(categoryPath)} className="hover:text-white">
                {category.name}
              </button>
              <ChevronRight className="h-3 w-3 text-slate-600" />
            </>
          )}
          <span className="text-slate-300 font-medium truncate max-w-xs">{template.title}</span>
        </div>

        {/* Hero Card Container */}
        <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6 sm:p-10 shadow-2xl backdrop-blur-xl space-y-6">
          {/* Header Badges */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-indigo-500/10 px-3 py-1 text-xs font-semibold text-indigo-300 border border-indigo-500/20 capitalize">
                {template.tone} tone
              </span>
              <span className="rounded-full bg-slate-800 px-2.5 py-1 text-xs font-medium text-slate-400 capitalize">
                {template.length} length
              </span>
              {template.recipient && (
                <span className="rounded-full bg-slate-800 px-2.5 py-1 text-xs font-medium text-slate-300">
                  Recipient: {template.recipient}
                </span>
              )}
            </div>

            <button
              onClick={() => toggleFavorite(template.id)}
              className={`rounded-xl p-2 transition-colors border border-slate-800 ${
                favorited ? 'bg-rose-500/10 text-rose-400 border-rose-500/30' : 'bg-slate-950 text-slate-400 hover:text-white'
              }`}
            >
              <Bookmark className={`h-4 w-4 ${favorited ? 'fill-rose-400' : ''}`} />
            </button>
          </div>

          {/* Title */}
          <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-white">
            {template.title}
          </h1>

          {/* Interactive Variable Fillers if template has variables */}
          {template.variables && template.variables.length > 0 && (
            <div className="rounded-2xl border border-amber-500/20 bg-amber-500/5 p-4 space-y-3">
              <div className="flex items-center gap-2 text-xs font-semibold text-amber-300 uppercase tracking-wider">
                <Sliders className="h-3.5 w-3.5" />
                <span>Fill Variables for Instant Live Replacement:</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {template.variables.map(v => (
                  <div key={v} className="space-y-1">
                    <label className="text-xs text-slate-300 font-medium">{v}</label>
                    <input
                      type="text"
                      value={variables[v] || ''}
                      onChange={e => setVariables({ ...variables, [v]: e.target.value })}
                      placeholder={`Enter ${v}...`}
                      className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3 py-1.5 text-xs text-white placeholder-slate-500 focus:border-amber-400 focus:outline-none"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Message Text Body */}
          <div className="rounded-2xl border border-slate-800/80 bg-slate-950 p-6 shadow-inner">
            <p className="text-base sm:text-lg text-slate-100 leading-relaxed font-normal whitespace-pre-line selection:bg-indigo-500/40">
              {renderedText}
            </p>
          </div>

          {/* Meta & Reading Stats */}
          <div className="flex flex-wrap items-center justify-between text-xs text-slate-400 border-t border-slate-800/80 pt-4 gap-3">
            <div className="flex items-center gap-4">
              <span>{words} words</span>
              <span>•</span>
              <span>{chars} characters</span>
              <span>•</span>
              <span>~{Math.max(1, Math.ceil(words / 180))} min read</span>
            </div>

            <div className="flex items-center gap-1.5">
              <span>Copied {template.copyCount.toLocaleString()} times</span>
            </div>
          </div>

          {/* Primary Action Buttons */}
          <div className="pt-2 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <button
                onClick={handleCopy}
                className={`flex items-center gap-2 rounded-2xl px-6 py-3 text-xs sm:text-sm font-bold text-white transition-all shadow-lg ${
                  copied
                    ? 'bg-emerald-600'
                    : 'bg-indigo-600 hover:bg-indigo-500 shadow-indigo-600/30'
                }`}
              >
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                <span>{copied ? 'Copied to Clipboard!' : 'Copy This Message'}</span>
              </button>

              <button
                onClick={handleAISpin}
                className="flex items-center gap-2 rounded-2xl border border-slate-700 bg-slate-800 px-5 py-3 text-xs sm:text-sm font-semibold text-slate-200 hover:border-indigo-500/50 hover:bg-slate-750 hover:text-white transition-all"
              >
                <Sparkles className="h-4 w-4 text-indigo-400" />
                <span>Personalize with AI</span>
              </button>
            </div>

            <button
              onClick={() => onOpenShare(template)}
              className="flex items-center gap-2 rounded-2xl border border-slate-800 bg-slate-950 px-4 py-3 text-xs font-semibold text-slate-300 hover:text-white transition-colors"
            >
              <Share2 className="h-4 w-4" />
              <span>Share</span>
            </button>
          </div>
        </div>

        {/* Related Templates Grid */}
        {related.length > 0 && (
          <div className="space-y-4 pt-6 border-t border-slate-900">
            <h2 className="font-display text-xl font-bold text-white">
              Similar & Related Templates
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {related.map(rel => (
                <MessageCard
                  key={rel.id}
                  template={rel}
                  onOpenShare={onOpenShare}
                  onOpenPersonalize={onOpenPersonalize}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
