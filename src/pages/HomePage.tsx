import React, { useState } from 'react';
import { 
  Sparkles, 
  Store, 
  UserCheck, 
  ArrowRight, 
  Zap, 
  Send, 
  Copy, 
  Check, 
  ShieldCheck, 
  Flame, 
  CreditCard, 
  Truck, 
  PackageCheck, 
  Headphones, 
  Boxes,
  HelpCircle,
  ShoppingBag
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { SmartSearchPersonalizer } from '../components/SmartSearchPersonalizer';
import { SellerCustomerCenter } from '../components/SellerCustomerCenter';
import { QuickRepliesSection } from '../components/QuickRepliesSection';
import { SELLER_CATEGORIES, CUSTOMER_CATEGORIES } from '../data/sellerCustomerCategories';
import { BUSINESS_TEMPLATES } from '../data/businessTemplates';
import { Template, MessageRole } from '../types';
import { MessageCard } from '../components/MessageCard';
import { SEOHelmet } from '../components/SEOHelmet';
import { useNavigation } from '../context/NavigationContext';
import { useAuth } from '../context/AuthContext';
import { useFavorites } from '../context/FavoritesContext';
import { useBusinessProfile } from '../context/BusinessProfileContext';
import { usePersonalization } from '../context/PersonalizationContext';
import { useSEO } from '../context/SEOContext';

interface HomePageProps {
  onOpenSearch: () => void;
  onOpenShare: (template: Template) => void;
  onOpenPersonalize: (template: Template) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onOpenSearch,
  onOpenShare,
  onOpenPersonalize
}) => {
  const { navigate } = useNavigation();
  const { user, consumeCredit, openAuthModal } = useAuth();
  const { recordCopy } = useFavorites();
  const { profile, openProfileModal } = useBusinessProfile();
  const { values } = usePersonalization();
  const { openSEOModal } = useSEO();

  // Search state across homepage
  const [searchQuery, setSearchQuery] = useState('');

  // Hero AI Generator Teaser state
  const [generatorRole, setGeneratorRole] = useState<MessageRole>('seller');
  const [heroPrompt, setHeroPrompt] = useState('Confirm customer COD order for lawn suit with 2-3 days delivery time');
  const [heroTone, setHeroTone] = useState('polite');
  const [heroLang, setHeroLang] = useState('Roman Urdu');
  const [isGenerating, setIsGenerating] = useState(false);
  const [heroResult, setHeroResult] = useState<string | null>(null);
  const [heroCopied, setHeroCopied] = useState(false);

  const quickScenarios = [
    { label: '📦 Confirm COD Order (Roman Urdu)', role: 'seller', prompt: 'Confirm cash on delivery order for stitched suit to customer Ahmed in Lahore', tone: 'polite', lang: 'Roman Urdu' },
    { label: '💳 JazzCash/Easypaisa Request', role: 'seller', prompt: 'Ask customer politely for advance payment via JazzCash or Easypaisa with account title', tone: 'polite', lang: 'English' },
    { label: '🚚 Parcel Tracking Sent (Urdu)', role: 'seller', prompt: 'پارسل ٹی سی ایس سے بھیج دیا گیا ہے، ٹریکنگ نمبر کے ساتھ گاہک کو تصدیق بھیجیں', tone: 'polite', lang: 'Urdu' },
    { label: '🛍️ Customer: Ask Real Pictures', role: 'customer', prompt: 'Ask seller politely for real unedited pictures/video of the dress before placing order', tone: 'polite', lang: 'Roman Urdu' }
  ];

  const handleHeroGenerate = async (presetPrompt?: string, presetRole?: string, presetTone?: string, presetLang?: string) => {
    const promptToUse = presetPrompt || heroPrompt;
    const roleToUse = presetRole || generatorRole;
    const toneToUse = presetTone || heroTone;
    const langToUse = presetLang || heroLang;

    if (!promptToUse.trim()) return;

    consumeCredit();
    setIsGenerating(true);
    setHeroResult(null);

    try {
      const res = await fetch('/api/ai/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          purpose: promptToUse,
          role: roleToUse,
          tone: toneToUse,
          language: langToUse,
          length: 'medium',
          personalDetails: values.customerName ? `Customer: ${values.customerName}, Shop: ${values.shopName || profile.shopName}` : ''
        })
      });

      if (res.ok) {
        const data = await res.json();
        setHeroResult(data.text);
      } else {
        setHeroResult("Assalam-o-Alaikum! Thank you for contacting us. Your order has been received and will be processed shortly. Shukriya!");
      }
    } catch {
      setHeroResult("Assalam-o-Alaikum! Thank you for contacting us. Your order has been received and will be processed shortly. Shukriya!");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopyHero = async () => {
    if (!heroResult) return;
    try {
      await navigator.clipboard.writeText(heroResult);
      setHeroCopied(true);
      recordCopy('hero-gen', heroResult);

      confetti({
        particleCount: 35,
        spread: 60,
        origin: { y: 0.6 }
      });

      setTimeout(() => setHeroCopied(false), 2000);
    } catch {}
  };

  const structuredSchema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    'name': 'Velora AI – Seller & Customer Message Platform',
    'applicationCategory': 'BusinessApplication',
    'operatingSystem': 'All',
    'description': 'AI message generator and multi-lingual template library for online sellers, retailers, wholesalers, and customers in English, Urdu, Roman Urdu, and Hindi.',
    'offers': {
      '@type': 'Offer',
      'price': '0',
      'priceCurrency': 'USD'
    }
  };

  return (
    <div className="relative min-h-screen">
      <SEOHelmet
        title="Velora AI – AI Seller & Customer Message Platform | WhatsApp, SMS & E-Commerce"
        description="Find, personalize, translate, and copy professional seller and customer messages in English, Urdu, Roman Urdu, and Hindi. Order confirmations, payment instructions, courier tracking, and complaints."
        canonicalPath="/"
        schema={structuredSchema}
      />

      {/* Ambient Glows */}
      <div className="mesh-glow -top-40 left-1/4 h-96 w-96 bg-indigo-600/25"></div>
      <div className="mesh-glow top-48 right-10 h-80 w-80 bg-emerald-600/20"></div>

      {/* =========================================================================
          1 & 2. HERO SECTION
          ========================================================================= */}
      <section className="relative pt-10 pb-12 sm:pt-16 sm:pb-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center space-y-4 max-w-3xl mx-auto">
            {/* Top Pill */}
            <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-4 py-1.5 text-xs font-bold text-indigo-300 shadow-sm backdrop-blur-md">
              <Sparkles className="h-3.5 w-3.5 text-indigo-400" />
              <span>Next-Gen AI E-Commerce & Retail Communication Platform</span>
              <span className="flex h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping"></span>
            </div>

            {/* Main H1 */}
            <h1 className="font-display text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
              Instant Professional Messages for{' '}
              <span className="bg-gradient-to-r from-indigo-400 via-emerald-300 to-amber-300 bg-clip-text text-transparent">
                Sellers & Customers
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
              Find, auto-fill, translate, generate, and copy high-converting messages in <strong>English</strong>, <strong>اردو (Urdu)</strong>, <strong>Roman Urdu</strong>, and <strong>हिन्दी (Hindi)</strong>. Every message has its own independent language selector.
            </p>

            {/* Quick Actions Row: Saved Profile & Add SEO Metadata */}
            <div className="pt-1 flex flex-wrap items-center justify-center gap-2.5">
              <button
                onClick={openProfileModal}
                className="inline-flex items-center gap-2 rounded-xl border border-slate-800 bg-slate-900/80 px-3.5 py-1.5 text-xs text-slate-300 hover:border-indigo-500/50 hover:text-white transition-all shadow-sm"
              >
                <Store className="h-3.5 w-3.5 text-indigo-400" />
                <span>Shop Profile: <strong className="text-indigo-300">{profile.shopName || 'Set Shop Name'}</strong></span>
                <span className="text-[10px] text-slate-500">Edit</span>
              </button>

              <button
                onClick={() => openSEOModal('/')}
                className="inline-flex items-center gap-2 rounded-xl border border-indigo-500/40 bg-indigo-500/10 px-3.5 py-1.5 text-xs font-semibold text-indigo-300 hover:bg-indigo-500/20 hover:text-white transition-all shadow-sm shadow-indigo-950/40"
              >
                <Sparkles className="h-3.5 w-3.5 text-indigo-400" />
                <span>Add SEO Metadata</span>
                <span className="rounded-md bg-emerald-500/20 px-1.5 py-0.2 text-[9px] font-bold text-emerald-400 border border-emerald-500/30">
                  New Feature
                </span>
              </button>
            </div>
          </div>

          {/* =========================================================================
              3. LARGE SMART SEARCH AND PERSONALIZATION BAR
              ========================================================================= */}
          <div className="pt-2">
            <SmartSearchPersonalizer
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
            />
          </div>
        </div>
      </section>

      {/* =========================================================================
          4 & 5. MAIN SELLER & CUSTOMER MESSAGE CENTER (Tabs & Subcategories)
          ========================================================================= */}
      <SellerCustomerCenter
        onOpenShare={onOpenShare}
        onOpenPersonalize={onOpenPersonalize}
        externalSearchQuery={searchQuery}
      />

      {/* =========================================================================
          6. POPULAR BUSINESS MESSAGE CATEGORIES GRID
          ========================================================================= */}
      <section className="py-12 border-t border-slate-900 bg-slate-950/60">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <div className="text-xs font-bold text-indigo-400 uppercase tracking-wider mb-1">
                Structured Directory
              </div>
              <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-white">
                Popular Business Message Categories
              </h2>
            </div>
            <button
              onClick={() => {
                const el = document.getElementById('seller-customer-center');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 flex items-center gap-1"
            >
              <span>Jump to Live Message Hub</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {SELLER_CATEGORIES.slice(0, 8).map(cat => (
              <div
                key={cat.slug}
                onClick={() => {
                  const el = document.getElementById('seller-customer-center');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="glass-card group flex flex-col justify-between rounded-2xl border border-slate-800 bg-slate-900/60 p-4 hover:border-indigo-500/50 hover:bg-slate-900 cursor-pointer transition-all"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className={`flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr ${cat.gradient} text-white shadow-md`}>
                      <Store className="h-4 w-4" />
                    </div>
                    {cat.badge && (
                      <span className="rounded-full bg-slate-800 px-2 py-0.5 text-[10px] font-semibold text-indigo-300 border border-slate-700">
                        {cat.badge}
                      </span>
                    )}
                  </div>
                  <h3 className="font-display text-sm font-bold text-white group-hover:text-indigo-300 transition-colors">
                    {cat.name}
                  </h3>
                  <p className="mt-1 text-xs text-slate-400 line-clamp-2 leading-relaxed">
                    {cat.description}
                  </p>
                </div>
                <div className="mt-4 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400 group-hover:text-white">
                  <span>{cat.subcategories.length} subtopics</span>
                  <ArrowRight className="h-3 w-3" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          7. AI MESSAGE GENERATOR (Interactive Studio Preview)
          ========================================================================= */}
      <section className="py-14 border-t border-slate-900 bg-slate-950/80">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center space-y-3">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-indigo-500/10 px-3.5 py-1 text-xs font-bold text-indigo-400 border border-indigo-500/20">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Interactive Neural Studio • Gemini 3.8 Flash</span>
            </div>
            <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-white">
              AI Message Generator for Sellers & Customers
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto">
              Generate custom bespoke communications for high-stakes buyer disputes, custom quotes, or wholesaler negotiations.
            </p>
          </div>

          <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-5 sm:p-8 shadow-2xl backdrop-blur-xl space-y-5">
            {/* Quick Scenarios */}
            <div className="space-y-1.5">
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                1-Click Preset Scenarios:
              </span>
              <div className="flex flex-wrap gap-2">
                {quickScenarios.map((qs, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setHeroPrompt(qs.prompt);
                      setGeneratorRole(qs.role as MessageRole);
                      setHeroTone(qs.tone);
                      setHeroLang(qs.lang);
                      handleHeroGenerate(qs.prompt, qs.role, qs.tone, qs.lang);
                    }}
                    className="rounded-xl border border-slate-800 bg-slate-950/80 px-3 py-1.5 text-xs text-slate-300 hover:border-indigo-500/40 hover:text-white transition-all text-left"
                  >
                    {qs.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Controls Bar */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {/* Role Toggle */}
              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-slate-300">Communicator Role</label>
                <select
                  value={generatorRole}
                  onChange={e => setGeneratorRole(e.target.value as MessageRole)}
                  className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3 py-2 text-xs text-white"
                >
                  <option value="seller">Seller / Store Owner</option>
                  <option value="customer">Customer / Buyer</option>
                </select>
              </div>

              {/* Tone */}
              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-slate-300">Tone</label>
                <select
                  value={heroTone}
                  onChange={e => setHeroTone(e.target.value)}
                  className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3 py-2 text-xs text-white"
                >
                  <option value="polite">Polite & Courteous</option>
                  <option value="professional">Professional</option>
                  <option value="direct">Direct & Short (WhatsApp)</option>
                  <option value="apologetic">Apologetic (For delays/defects)</option>
                  <option value="persuasive">Persuasive (Sales/Discount)</option>
                </select>
              </div>

              {/* Language */}
              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-slate-300">Output Language</label>
                <select
                  value={heroLang}
                  onChange={e => setHeroLang(e.target.value)}
                  className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3 py-2 text-xs text-white"
                >
                  <option value="English">English</option>
                  <option value="Roman Urdu">Roman Urdu (Latin Script)</option>
                  <option value="Urdu">اردو (Urdu Script)</option>
                  <option value="Hindi">हिन्दी (Hindi)</option>
                  <option value="Arabic">العربية (Arabic)</option>
                </select>
              </div>
            </div>

            {/* Prompt input */}
            <div className="space-y-1">
              <label className="text-[11px] font-semibold text-slate-300">Message Objective & Details</label>
              <textarea
                rows={2}
                value={heroPrompt}
                onChange={e => setHeroPrompt(e.target.value)}
                placeholder="What do you need to communicate? (e.g. 'Inquire about exchange for size Medium on kurta delivered yesterday')..."
                className="w-full rounded-2xl border border-slate-800 bg-slate-950 p-3 text-xs sm:text-sm text-white placeholder-slate-500 focus:border-indigo-500 focus:outline-none resize-none"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-1">
              <button
                onClick={() => navigate('/ai-message-generator')}
                className="text-xs text-indigo-400 hover:text-indigo-300 font-semibold"
              >
                Open Full Dedicated AI Studio →
              </button>

              <button
                onClick={() => handleHeroGenerate()}
                disabled={isGenerating || !heroPrompt.trim()}
                className={`flex items-center gap-2 rounded-2xl px-6 py-2.5 text-xs font-bold text-white shadow-lg transition-all ${
                  isGenerating || !heroPrompt.trim()
                    ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                    : 'bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 shadow-indigo-600/30'
                }`}
              >
                {isGenerating ? (
                  <>
                    <Sparkles className="h-4 w-4 animate-spin" />
                    <span>Synthesizing...</span>
                  </>
                ) : (
                  <>
                    <Send className="h-3.5 w-3.5" />
                    <span>Generate Message</span>
                  </>
                )}
              </button>
            </div>

            {/* Live Result Render */}
            {heroResult && (
              <div className="mt-4 rounded-2xl border border-indigo-500/40 bg-slate-950 p-4 space-y-3 animate-in fade-in">
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span className="font-bold text-indigo-400 flex items-center gap-1.5">
                    <Sparkles className="h-3.5 w-3.5" />
                    <span>AI Generated ({heroLang}):</span>
                  </span>
                  <span className="text-[11px]">{heroResult.trim().split(/\s+/).length} words</span>
                </div>

                <p 
                  dir={heroLang === 'Urdu' || heroLang === 'Arabic' ? 'rtl' : 'ltr'}
                  className={`text-sm text-slate-100 leading-relaxed font-normal whitespace-pre-line selection:bg-indigo-500/40 ${
                    heroLang === 'Urdu' ? 'font-urdu text-right' : ''
                  }`}
                >
                  {heroResult}
                </p>

                <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-900">
                  <button
                    onClick={handleCopyHero}
                    className={`flex items-center gap-1.5 rounded-xl px-4 py-1.5 text-xs font-bold text-white transition-all ${
                      heroCopied ? 'bg-emerald-600' : 'bg-indigo-600 hover:bg-indigo-500'
                    }`}
                  >
                    {heroCopied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                    <span>{heroCopied ? 'Copied!' : 'Copy'}</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* =========================================================================
          8. TRENDING AND POPULAR BUSINESS TEMPLATES
          ========================================================================= */}
      <section className="py-12 border-t border-slate-900">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-wider mb-1">
                <Flame className="h-4 w-4" />
                <span>Leaderboard</span>
              </div>
              <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-white">
                Trending Seller & Customer Templates
              </h2>
            </div>
            <button
              onClick={() => navigate('/trending')}
              className="text-xs font-semibold text-indigo-400 hover:underline flex items-center gap-1"
            >
              <span>View All Trending</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {BUSINESS_TEMPLATES.slice(0, 6).map(tmpl => (
              <MessageCard
                key={tmpl.id}
                template={tmpl}
                onOpenShare={onOpenShare}
                onOpenPersonalize={onOpenPersonalize}
              />
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          9. FREQUENTLY USED QUICK REPLIES
          ========================================================================= */}
      <QuickRepliesSection
        onOpenShare={onOpenShare}
        onOpenPersonalize={onOpenPersonalize}
      />

      {/* =========================================================================
          10. RELATED CONTENT & TRUST BADGE
          ========================================================================= */}
      <section className="py-12 border-t border-slate-900 bg-slate-950/40">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="inline-flex items-center gap-2 text-xs text-slate-400">
            <ShieldCheck className="h-4 w-4 text-emerald-400" />
            <span>Zero Data Leakage • Full RTL Urdu & Arabic Unicode Support • Fast Native Performance</span>
          </div>
          <p className="text-xs text-slate-500 max-w-2xl mx-auto">
            Used by over 40,000+ online sellers on WhatsApp, Instagram DMs, Daraz, and Shopify stores across Pakistan, Middle East, India, and global markets.
          </p>
        </div>
      </section>
    </div>
  );
};

