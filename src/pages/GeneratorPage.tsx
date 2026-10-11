import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  Send, 
  Copy, 
  Check, 
  Bookmark, 
  Share2, 
  RefreshCw, 
  Sliders, 
  Globe, 
  Layers, 
  Store, 
  UserCheck, 
  Edit3, 
  RotateCcw,
  Tag,
  ShieldCheck,
  CreditCard
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { MessageTone, MessageLength, MessageRole, GenerationInput } from '../types';
import { BUSINESS_TYPES, SUPPORTED_LANGUAGES } from '../data/languages';
import { SEOHelmet } from '../components/SEOHelmet';
import { useAuth } from '../context/AuthContext';
import { useFavorites } from '../context/FavoritesContext';
import { useBusinessProfile } from '../context/BusinessProfileContext';
import { usePersonalization } from '../context/PersonalizationContext';

interface GeneratorPageProps {
  onOpenShare: (template: any) => void;
}

export const GeneratorPage: React.FC<GeneratorPageProps> = ({ onOpenShare }) => {
  const { user, consumeCredit, openAuthModal } = useAuth();
  const { isFavorite, toggleFavorite, recordCopy } = useFavorites();
  const { profile } = useBusinessProfile();
  const { values, loadFromShopProfile } = usePersonalization();

  const [input, setInput] = useState<GenerationInput>({
    purpose: '',
    role: 'seller',
    recipient: '',
    businessType: 'clothing-fashion',
    productDetails: '',
    relationship: 'Store Owner to Customer',
    tone: 'polite',
    language: 'Roman Urdu',
    length: 'medium',
    keywords: '',
    personalDetails: ''
  });

  const [generatedText, setGeneratedText] = useState<string>('');
  const [alternatives, setAlternatives] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isRefining, setIsRefining] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [statusNotice, setStatusNotice] = useState<string | null>(null);
  const [targetTranslateLang, setTargetTranslateLang] = useState<string>('Urdu');

  useEffect(() => {
    const seed = sessionStorage.getItem('velora_seed_prompt');
    const tone = sessionStorage.getItem('velora_seed_tone') as MessageTone;
    const purpose = sessionStorage.getItem('velora_seed_purpose');

    if (seed) {
      setGeneratedText(seed);
      sessionStorage.removeItem('velora_seed_prompt');
    }
    if (tone) {
      setInput(prev => ({ ...prev, tone }));
      sessionStorage.removeItem('velora_seed_tone');
    }
    if (purpose) {
      setInput(prev => ({ ...prev, purpose }));
      sessionStorage.removeItem('velora_seed_purpose');
    }
  }, []);

  const handleGenerate = async () => {
    if (!input.purpose.trim()) return;

    consumeCredit();
    setIsLoading(true);
    setStatusNotice(null);
    setAlternatives([]);

    try {
      const res = await fetch('/api/ai/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...input,
          personalDetails: input.personalDetails || (values.customerName ? `Shop: ${values.shopName || profile.shopName}, Customer: ${values.customerName}, Product: ${values.productName}, Price: Rs. ${values.price}` : '')
        })
      });

      if (res.ok) {
        const data = await res.json();
        setGeneratedText(data.text);
        if (data.alternatives && data.alternatives.length > 0) {
          setAlternatives(data.alternatives);
        }
      } else {
        setStatusNotice('Could not reach synthesis backend. Using cached composition.');
      }
    } catch (err: any) {
      console.error('Generation error:', err);
      setStatusNotice('Network anomaly. Please retry.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRefine = async (action: string, customPayload?: Record<string, any>) => {
    if (!generatedText) return;

    setIsRefining(true);
    try {
      const res = await fetch('/api/ai/refine', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: generatedText,
          action,
          ...customPayload
        })
      });

      if (res.ok) {
        const data = await res.json();
        setGeneratedText(data.text);
      }
    } catch (err) {
      console.error('Refine error:', err);
    } finally {
      setIsRefining(false);
    }
  };

  const handleGenerateAlternatives = async () => {
    if (!generatedText && !input.purpose) return;

    setIsRefining(true);
    try {
      const res = await fetch('/api/ai/alternatives', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: generatedText || input.purpose,
          purpose: input.purpose,
          recipient: input.recipient,
          tone: input.tone
        })
      });

      if (res.ok) {
        const data = await res.json();
        if (data.alternatives) {
          setAlternatives(data.alternatives);
        }
      }
    } catch (err) {
      console.error('Alternatives error:', err);
    } finally {
      setIsRefining(false);
    }
  };

  const handleCopy = async (textToCopy: string) => {
    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      recordCopy('ai-studio-gen', textToCopy);

      confetti({
        particleCount: 30,
        spread: 50,
        origin: { y: 0.6 }
      });

      setTimeout(() => setCopied(false), 2000);
    } catch {}
  };

  const isRTL = input.language === 'Urdu' || input.language === 'Arabic';

  return (
    <div className="min-h-screen py-8 sm:py-12">
      <SEOHelmet
        title="AI Message Generator for Online Sellers & Retailers | Velora AI"
        description="Generate professional seller and customer communication in English, Urdu, Roman Urdu, and Hindi. Order confirmations, apologies, courier dispatch, and negotiation."
        canonicalPath="/ai-message-generator"
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Studio Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-indigo-400 uppercase tracking-wider mb-1">
              <Sparkles className="h-4 w-4" />
              <span>E-Commerce AI Neural Studio • Gemini 3.8 Flash</span>
            </div>
            <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-white">
              AI Message Generator for Sellers & Customers
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Synthesize flawless order confirmations, payment instructions, de-escalation apologies, or buyer negotiation requests.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400">
              {user.tier === 'pro' ? 'Velora Pro (Unlimited)' : `${user.creditsRemaining} Credits Remaining`}
            </span>
          </div>
        </div>

        {/* 2-Column Studio Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Form Controls (5 Cols) */}
          <div className="lg:col-span-5 rounded-3xl border border-slate-800 bg-slate-900/80 p-6 shadow-xl backdrop-blur-xl space-y-5">
            {/* Communicator Role Toggle */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-300">Who is sending this message?</label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setInput({ ...input, role: 'seller', relationship: 'Seller to Buyer' })}
                  className={`flex items-center justify-center gap-2 rounded-xl py-2.5 text-xs font-bold transition-all ${
                    input.role === 'seller'
                      ? 'bg-indigo-600 text-white shadow-md'
                      : 'bg-slate-950 border border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  <Store className="h-4 w-4" />
                  <span>I am the Seller</span>
                </button>

                <button
                  type="button"
                  onClick={() => setInput({ ...input, role: 'customer', relationship: 'Buyer to Store' })}
                  className={`flex items-center justify-center gap-2 rounded-xl py-2.5 text-xs font-bold transition-all ${
                    input.role === 'customer'
                      ? 'bg-emerald-600 text-white shadow-md'
                      : 'bg-slate-950 border border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  <UserCheck className="h-4 w-4" />
                  <span>I am the Customer</span>
                </button>
              </div>
            </div>

            {/* Purpose / Scenario */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-200 flex items-center justify-between">
                <span>Message Purpose / Situation *</span>
                <span className="text-[10px] text-indigo-400">Main Instruction</span>
              </label>
              <textarea
                rows={3}
                required
                value={input.purpose}
                onChange={e => setInput({ ...input, purpose: e.target.value })}
                placeholder={input.role === 'seller' 
                  ? "e.g. 'Apologize to customer Ahmed for a 1-day rain delay in parcel dispatch and provide updated delivery time'..."
                  : "e.g. 'Ask seller if they can offer free shipping on 2 stitched suits to Karachi'..."
                }
                className="w-full rounded-2xl border border-slate-800 bg-slate-950 p-3.5 text-xs sm:text-sm text-white placeholder-slate-500 focus:border-indigo-500 focus:outline-none resize-none"
              />
            </div>

            {/* Business Niche & Recipient */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-300">Business Category</label>
                <select
                  value={input.businessType}
                  onChange={e => setInput({ ...input, businessType: e.target.value })}
                  className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3 py-2 text-xs text-white"
                >
                  {BUSINESS_TYPES.map(bt => (
                    <option key={bt.id} value={bt.id}>{bt.name}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-300">Recipient Name / Role</label>
                <input
                  type="text"
                  value={input.recipient}
                  onChange={e => setInput({ ...input, recipient: e.target.value })}
                  placeholder="e.g. Ahmed, Shop Manager"
                  className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3 py-2 text-xs text-white placeholder-slate-500 focus:border-indigo-500 focus:outline-none"
                />
              </div>
            </div>

            {/* Tone & Length */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-300">Tone</label>
                <select
                  value={input.tone}
                  onChange={e => setInput({ ...input, tone: e.target.value as MessageTone })}
                  className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3 py-2 text-xs text-white capitalize"
                >
                  <option value="polite">Polite & Courteous</option>
                  <option value="professional">Professional</option>
                  <option value="direct">Direct & Short (WhatsApp)</option>
                  <option value="apologetic">Apologetic</option>
                  <option value="friendly">Friendly</option>
                  <option value="persuasive">Persuasive (Sales/Discount)</option>
                  <option value="formal">Formal</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-300">Length</label>
                <select
                  value={input.length}
                  onChange={e => setInput({ ...input, length: e.target.value as MessageLength })}
                  className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3 py-2 text-xs text-white"
                >
                  <option value="short">Short (Quick WhatsApp 1-2 lines)</option>
                  <option value="medium">Medium (Standard Business)</option>
                  <option value="long">Long (Detailed with Policies)</option>
                </select>
              </div>
            </div>

            {/* Output Language */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                <Globe className="h-3.5 w-3.5 text-indigo-400" />
                <span>Primary Language</span>
              </label>
              <select
                value={input.language}
                onChange={e => setInput({ ...input, language: e.target.value })}
                className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3 py-2 text-xs text-white font-semibold"
              >
                <option value="Roman Urdu">🇵🇰 Roman Urdu (Conversational WhatsApp Latin)</option>
                <option value="Urdu">🇵🇰 اردو (Proper Urdu Script)</option>
                <option value="English">🇬🇧 English</option>
                <option value="Hindi">🇮🇳 हिन्दी (Hindi Devanagari)</option>
                <option value="Arabic">🇦🇪 العربية (Arabic)</option>
                <option value="Spanish">🇪🇸 Spanish (Español)</option>
                <option value="French">🇫🇷 French (Français)</option>
                <option value="German">🇩🇪 German (Deutsch)</option>
                <option value="Turkish">🇹🇷 Turkish (Türkçe)</option>
                <option value="Indonesian">🇮🇩 Indonesian (Bahasa Indonesia)</option>
              </select>
            </div>

            {/* Personalization Details / Product details */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300 flex items-center justify-between">
                <span>Product & Order Details</span>
                {values.customerName && (
                  <span className="text-[10px] text-emerald-400">Using Auto-Fill details</span>
                )}
              </label>
              <input
                type="text"
                value={input.personalDetails}
                onChange={e => setInput({ ...input, personalDetails: e.target.value })}
                placeholder={`e.g. Price: Rs. 1,500, Order: BF1024, TCS courier`}
                className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3 py-2 text-xs text-white placeholder-slate-500 focus:border-indigo-500 focus:outline-none"
              />
            </div>

            {/* Submit Button */}
            <button
              onClick={handleGenerate}
              disabled={isLoading || !input.purpose.trim()}
              className={`w-full rounded-2xl py-3.5 text-xs sm:text-sm font-bold text-white shadow-xl transition-all flex items-center justify-center gap-2 ${
                isLoading || !input.purpose.trim()
                  ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                  : 'bg-gradient-to-r from-indigo-600 via-indigo-500 to-violet-600 hover:from-indigo-500 hover:to-violet-500 shadow-indigo-600/30'
              }`}
            >
              {isLoading ? (
                <>
                  <Sparkles className="h-4 w-4 animate-spin" />
                  <span>Synthesizing Business Message...</span>
                </>
              ) : (
                <>
                  <Send className="h-4 w-4" />
                  <span>Generate Message with Velora AI</span>
                </>
              )}
            </button>
          </div>

          {/* Right Column: Output & Action Buttons (7 Cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="rounded-3xl border border-slate-800 bg-slate-900/90 p-6 sm:p-8 shadow-2xl backdrop-blur-xl space-y-5">
              <div className="flex items-center justify-between pb-3.5 border-b border-slate-800/80">
                <div className="flex items-center gap-2">
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-500/20 text-indigo-400">
                    <Sparkles className="h-4 w-4" />
                  </div>
                  <span className="font-display text-sm font-bold text-white">
                    Generated Business Message ({input.language})
                  </span>
                </div>

                {generatedText && (
                  <div className="flex items-center gap-2 text-xs text-slate-400">
                    <span>{generatedText.trim().split(/\s+/).length} words</span>
                  </div>
                )}
              </div>

              {/* Text Output / Editable */}
              <div className="min-h-[160px] flex items-center justify-center">
                {isLoading ? (
                  <div className="flex flex-col items-center gap-3 py-10 text-slate-400">
                    <Sparkles className="h-8 w-8 animate-spin text-indigo-400" />
                    <p className="text-sm font-medium text-slate-200">Writing tailored message in {input.language}...</p>
                    <p className="text-xs text-slate-500">Preserving names, order numbers, and currency</p>
                  </div>
                ) : generatedText ? (
                  <div className="w-full">
                    {isEditing ? (
                      <textarea
                        rows={6}
                        value={generatedText}
                        onChange={e => setGeneratedText(e.target.value)}
                        dir={isRTL ? 'rtl' : 'ltr'}
                        className={`w-full rounded-2xl border border-indigo-500/50 bg-slate-950 p-4 text-sm text-slate-100 focus:outline-none ${
                          input.language === 'Urdu' ? 'font-urdu' : ''
                        }`}
                      />
                    ) : (
                      <p 
                        dir={isRTL ? 'rtl' : 'ltr'}
                        className={`text-base text-slate-100 leading-relaxed font-normal whitespace-pre-line selection:bg-indigo-500/40 ${
                          input.language === 'Urdu' ? 'font-urdu text-right' : 'text-left'
                        }`}
                      >
                        {generatedText}
                      </p>
                    )}
                  </div>
                ) : (
                  <div className="text-center py-12 space-y-2 text-slate-500">
                    <Store className="h-8 w-8 mx-auto text-slate-600" />
                    <p className="text-sm font-medium text-slate-400">Your generated message will appear here.</p>
                    <p className="text-xs text-slate-600 max-w-xs mx-auto">
                      Fill out the parameters on the left and click Generate Message.
                    </p>
                  </div>
                )}
              </div>

              {/* Action Bar */}
              {generatedText && (
                <div className="pt-4 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleCopy(generatedText)}
                      className={`flex items-center gap-1.5 rounded-xl px-4 py-2 text-xs font-bold text-white transition-all shadow-md ${
                        copied ? 'bg-emerald-600' : 'bg-indigo-600 hover:bg-indigo-500 shadow-indigo-600/25'
                      }`}
                    >
                      {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                      <span>{copied ? 'Copied to Clipboard!' : 'Copy Message'}</span>
                    </button>

                    <button
                      onClick={() => setIsEditing(!isEditing)}
                      className="flex items-center gap-1.5 rounded-xl border border-slate-700 bg-slate-800 px-3 py-2 text-xs font-medium text-slate-200 hover:text-white"
                    >
                      <Edit3 className="h-3.5 w-3.5" />
                      <span>{isEditing ? 'Done Editing' : 'Edit'}</span>
                    </button>

                    <button
                      onClick={() => onOpenShare({ id: 'ai-gen', title: 'Velora AI Message', text: generatedText } as any)}
                      className="flex items-center gap-1.5 rounded-xl border border-slate-700 bg-slate-800 px-3 py-2 text-xs font-medium text-slate-200 hover:text-white"
                    >
                      <Share2 className="h-3.5 w-3.5" />
                      <span>Share</span>
                    </button>
                  </div>

                  <button
                    onClick={() => toggleFavorite('ai-gen-' + Date.now())}
                    className="flex items-center gap-1.5 rounded-xl border border-slate-800 bg-slate-950 px-3 py-2 text-xs font-medium text-slate-300 hover:text-rose-400"
                  >
                    <Bookmark className="h-3.5 w-3.5" />
                    <span>Save to Vault</span>
                  </button>
                </div>
              )}
            </div>

            {/* Neural Transformations (More Polite, More Professional, Shorter, Longer, 5 Alternatives) */}
            {generatedText && (
              <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6 shadow-xl space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-200 uppercase tracking-wider">
                    <Sliders className="h-4 w-4 text-indigo-400" />
                    <span>AI Transformations & Polishing</span>
                  </div>
                  {isRefining && (
                    <span className="flex items-center gap-1 text-xs text-indigo-400">
                      <RefreshCw className="h-3 w-3 animate-spin" />
                      <span>Refining...</span>
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  <button
                    onClick={() => handleRefine('more-polite')}
                    disabled={isRefining}
                    className="rounded-xl border border-slate-800 bg-slate-950 p-2.5 text-xs font-medium text-slate-300 hover:border-emerald-500/40 hover:text-emerald-300 transition-all text-center"
                  >
                    🌸 Make More Polite
                  </button>

                  <button
                    onClick={() => handleRefine('more-professional')}
                    disabled={isRefining}
                    className="rounded-xl border border-slate-800 bg-slate-950 p-2.5 text-xs font-medium text-slate-300 hover:border-blue-500/40 hover:text-blue-300 transition-all text-center"
                  >
                    💼 Make More Professional
                  </button>

                  <button
                    onClick={() => handleRefine('shorter')}
                    disabled={isRefining}
                    className="rounded-xl border border-slate-800 bg-slate-950 p-2.5 text-xs font-medium text-slate-300 hover:border-amber-500/40 hover:text-amber-300 transition-all text-center"
                  >
                    ✂️ Make Shorter (WhatsApp)
                  </button>

                  <button
                    onClick={() => handleRefine('longer')}
                    disabled={isRefining}
                    className="rounded-xl border border-slate-800 bg-slate-950 p-2.5 text-xs font-medium text-slate-300 hover:border-indigo-500/40 hover:text-indigo-300 transition-all text-center"
                  >
                    📖 Make Longer & Detailed
                  </button>

                  <button
                    onClick={handleGenerateAlternatives}
                    disabled={isRefining}
                    className="col-span-2 rounded-xl border border-indigo-500/30 bg-indigo-500/10 p-2.5 text-xs font-bold text-indigo-300 hover:bg-indigo-500/20 transition-all flex items-center justify-center gap-1.5"
                  >
                    <Layers className="h-3.5 w-3.5" />
                    <span>Generate 5 Alternative Angles</span>
                  </button>
                </div>
              </div>
            )}

            {/* Alternatives Drawer */}
            {alternatives.length > 0 && (
              <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6 shadow-xl space-y-3">
                <div className="text-xs font-bold text-indigo-300 uppercase tracking-wider flex items-center gap-2">
                  <Layers className="h-4 w-4" />
                  <span>5 Alternative Variations:</span>
                </div>
                <div className="space-y-2.5">
                  {alternatives.map((alt, idx) => (
                    <div key={idx} className="rounded-2xl border border-slate-800 bg-slate-950/80 p-3.5 space-y-1.5 hover:border-indigo-500/40">
                      <div className="flex items-center justify-between text-[11px] text-slate-400">
                        <span className="font-bold text-indigo-400">Angle #{idx + 1}</span>
                        <button
                          onClick={() => handleCopy(alt)}
                          className="text-xs text-indigo-400 hover:underline flex items-center gap-1"
                        >
                          <Copy className="h-3 w-3" />
                          <span>Copy</span>
                        </button>
                      </div>
                      <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">{alt}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
