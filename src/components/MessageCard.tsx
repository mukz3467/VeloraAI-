import React, { useState, useEffect } from 'react';
import { 
  Copy, 
  Check, 
  Bookmark, 
  Share2, 
  Sparkles, 
  Globe, 
  RefreshCw, 
  Edit3, 
  Sliders, 
  Store, 
  UserCheck, 
  Zap,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { Template, SupportedLanguageCode } from '../types';
import { SUPPORTED_LANGUAGES } from '../data/languages';
import { useFavorites } from '../context/FavoritesContext';
import { useNavigation } from '../context/NavigationContext';
import { usePersonalization } from '../context/PersonalizationContext';

interface MessageCardProps {
  template: Template;
  onOpenShare: (template: Template) => void;
  onOpenPersonalize: (template: Template) => void;
}

export const MessageCard: React.FC<MessageCardProps> = ({
  template,
  onOpenShare,
  onOpenPersonalize
}) => {
  const { isFavorite, toggleFavorite, recordCopy } = useFavorites();
  const { navigate } = useNavigation();
  const { substituteVariables, values } = usePersonalization();

  // INDEPENDENT Language state for THIS card only
  const [currentLang, setCurrentLang] = useState<SupportedLanguageCode>('en');
  const [translatedText, setTranslatedText] = useState<string>(template.text);
  const [isTranslating, setIsTranslating] = useState<boolean>(false);
  const [translationError, setTranslationError] = useState<string | null>(null);

  // In-place editing state
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editedText, setEditedText] = useState<string>('');

  const [copied, setCopied] = useState<boolean>(false);
  const [copyCount, setCopyCount] = useState<number>(template.copyCount);

  const favorited = isFavorite(template.id);
  const currentLangObj = SUPPORTED_LANGUAGES.find(l => l.code === currentLang) || SUPPORTED_LANGUAGES[0];
  const isRTL = currentLangObj.direction === 'rtl';

  // Initialize and update when template or personalization values change
  useEffect(() => {
    // If template has pre-seeded translation for currentLang, use it; otherwise master text
    const baseText = (template.translations && template.translations[currentLang]) 
      ? template.translations[currentLang]! 
      : template.text;

    const personalized = substituteVariables(baseText);
    setTranslatedText(personalized);
    setEditedText(personalized);
  }, [template, values, currentLang]);

  // Handle INDEPENDENT Language Switch for THIS CARD ONLY
  const handleLanguageChange = async (newLang: SupportedLanguageCode) => {
    if (newLang === currentLang) return;
    setCurrentLang(newLang);
    setTranslationError(null);

    // 1. Check if template already has pre-stored translation
    if (template.translations && template.translations[newLang]) {
      const substituted = substituteVariables(template.translations[newLang]!);
      setTranslatedText(substituted);
      setEditedText(substituted);
      return;
    }

    // 2. Otherwise, fetch real-time AI translation from server preserving variables & details
    setIsTranslating(true);
    try {
      const res = await fetch('/api/ai/translate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: translatedText,
          targetLanguage: newLang,
          sourceLanguage: currentLang
        })
      });

      if (res.ok) {
        const data = await res.json();
        setTranslatedText(data.text);
        setEditedText(data.text);
      } else {
        setTranslationError('Could not translate. Original text retained.');
      }
    } catch (err) {
      console.error('Translation error on card:', err);
      setTranslationError('Network error. Retained current text.');
    } finally {
      setIsTranslating(false);
    }
  };

  const displayText = isEditing ? editedText : translatedText;
  const wordCount = displayText.trim().split(/\s+/).length;
  const charCount = displayText.length;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(displayText);
      setCopied(true);
      setCopyCount(prev => prev + 1);
      recordCopy(template.id, displayText);

      confetti({
        particleCount: 28,
        spread: 45,
        origin: { y: 0.8 },
        colors: ['#6366f1', '#10b981', '#f59e0b']
      });

      setTimeout(() => setCopied(false), 2200);
    } catch {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleSaveEdit = () => {
    setTranslatedText(editedText);
    setIsEditing(false);
  };

  const handleAISpin = () => {
    sessionStorage.setItem('velora_seed_prompt', displayText);
    sessionStorage.setItem('velora_seed_tone', template.tone);
    navigate('/ai-message-generator');
  };

  return (
    <div className="glass-card group relative flex flex-col justify-between rounded-3xl p-5 sm:p-6 border border-slate-800 bg-slate-900/70 shadow-xl transition-all duration-300 hover:border-indigo-500/40 hover:bg-slate-900/90">
      <div>
        {/* Card Header: Role Badge + INDEPENDENT LANGUAGE SELECTOR */}
        <div className="flex flex-wrap items-center justify-between gap-2.5 mb-3.5 pb-3 border-b border-slate-800/80">
          <div className="flex items-center gap-1.5">
            <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider ${
              template.role === 'seller'
                ? 'bg-indigo-500/15 text-indigo-300 border border-indigo-500/30'
                : 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30'
            }`}>
              {template.role === 'seller' ? <Store className="h-3 w-3" /> : <UserCheck className="h-3 w-3" />}
              <span>{template.role === 'seller' ? 'Seller' : 'Customer'}</span>
            </span>

            <span className="rounded-full bg-slate-800 px-2 py-0.5 text-[10px] font-semibold text-slate-400 capitalize">
              {template.tone}
            </span>

            {template.isQuickReply && (
              <span className="rounded-full bg-amber-500/15 px-2 py-0.5 text-[10px] font-semibold text-amber-300 border border-amber-500/30">
                1-Tap Reply
              </span>
            )}
          </div>

          {/* INDEPENDENT LANGUAGE SELECTOR DROPDOWN ON EVERY CARD */}
          <div className="flex items-center gap-1.5">
            <div className="relative inline-flex items-center">
              <Globe className="absolute left-2.5 h-3.5 w-3.5 text-indigo-400 pointer-events-none" />
              <select
                value={currentLang}
                onChange={e => handleLanguageChange(e.target.value as SupportedLanguageCode)}
                disabled={isTranslating}
                className="appearance-none rounded-xl border border-indigo-500/30 bg-slate-950 pl-7 pr-7 py-1 text-xs font-semibold text-indigo-300 hover:border-indigo-400 focus:border-indigo-500 focus:outline-none transition-colors cursor-pointer"
                title="Translate this individual message"
              >
                {SUPPORTED_LANGUAGES.map(lang => (
                  <option key={lang.code} value={lang.code} className="bg-slate-900 text-white">
                    {lang.flag} {lang.nativeName} ({lang.name})
                  </option>
                ))}
              </select>
              <span className="absolute right-2 pointer-events-none text-[10px] text-slate-400">▼</span>
            </div>

            {/* Favorite toggle */}
            <button
              onClick={() => toggleFavorite(template.id)}
              className={`rounded-xl p-1.5 transition-colors border border-slate-800 ${
                favorited ? 'text-rose-400 bg-rose-500/10 border-rose-500/30' : 'text-slate-400 hover:text-white bg-slate-950'
              }`}
              title={favorited ? 'Saved in favorites' : 'Save to favorites'}
            >
              <Bookmark className={`h-3.5 w-3.5 ${favorited ? 'fill-rose-400' : ''}`} />
            </button>
          </div>
        </div>

        {/* Translation Indicator or Error */}
        {isTranslating && (
          <div className="flex items-center gap-2 mb-2 text-xs text-indigo-400 font-medium py-1 animate-pulse">
            <RefreshCw className="h-3 w-3 animate-spin" />
            <span>Translating to {currentLangObj.name}...</span>
          </div>
        )}

        {translationError && (
          <div className="flex items-center gap-1.5 mb-2 text-[11px] text-amber-400 py-0.5">
            <AlertCircle className="h-3 w-3 shrink-0" />
            <span>{translationError}</span>
          </div>
        )}

        {/* Title */}
        <h3 
          onClick={() => navigate(`/templates/${template.id}`)}
          className="font-display text-base font-bold text-white group-hover:text-indigo-300 transition-colors cursor-pointer line-clamp-1 mb-2.5"
        >
          {template.title}
        </h3>

        {/* Editable / Preview Message Text Box */}
        <div className="relative mb-3.5">
          {isEditing ? (
            <div className="space-y-2">
              <textarea
                rows={4}
                value={editedText}
                onChange={e => setEditedText(e.target.value)}
                dir={isRTL ? 'rtl' : 'ltr'}
                className={`w-full rounded-2xl border border-indigo-500/50 bg-slate-950 p-3 text-sm text-slate-100 focus:outline-none focus:ring-1 focus:ring-indigo-500 resize-none ${
                  currentLangObj.fontClass || ''
                }`}
              />
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => setIsEditing(false)}
                  className="rounded-lg px-2.5 py-1 text-xs text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveEdit}
                  className="rounded-lg bg-indigo-600 px-3 py-1 text-xs font-semibold text-white hover:bg-indigo-500"
                >
                  Apply Changes
                </button>
              </div>
            </div>
          ) : (
            <div
              dir={isRTL ? 'rtl' : 'ltr'}
              className={`rounded-2xl border border-slate-800/80 bg-slate-950/70 p-3.5 text-sm text-slate-200 leading-relaxed whitespace-pre-line selection:bg-indigo-500/40 transition-all ${
                currentLangObj.fontClass || ''
              } ${isRTL ? 'text-right' : 'text-left'}`}
            >
              {displayText}
            </div>
          )}
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {template.tags.slice(0, 3).map(tag => (
            <span key={tag} className="text-[10px] text-slate-400 hover:text-slate-200">
              #{tag}
            </span>
          ))}
        </div>
      </div>

      {/* Footer bar & Actions */}
      <div className="pt-3 border-t border-slate-800/80 flex flex-col gap-2.5">
        {/* Stats & Quick Edit Trigger */}
        <div className="flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center gap-2 text-[11px]">
            <span>{copyCount.toLocaleString()} copies</span>
            <span>•</span>
            <span>{wordCount} words ({charCount} chars)</span>
          </div>

          <div className="flex items-center gap-2">
            {!isEditing && (
              <button
                onClick={() => setIsEditing(true)}
                className="text-slate-400 hover:text-white flex items-center gap-1 text-[11px]"
                title="Edit message in-place"
              >
                <Edit3 className="h-3 w-3" />
                <span>Edit</span>
              </button>
            )}
            <button
              onClick={() => onOpenPersonalize(template)}
              className="text-amber-400 hover:text-amber-300 font-medium flex items-center gap-1 text-[11px]"
              title="Personalize names, price, order #"
            >
              <Sliders className="h-3 w-3" />
              <span>Details</span>
            </button>
          </div>
        </div>

        {/* Action Buttons Row */}
        <div className="grid grid-cols-4 gap-2">
          {/* Main Copy Button */}
          <button
            onClick={handleCopy}
            className={`col-span-2 flex items-center justify-center gap-1.5 rounded-xl px-3 py-2 text-xs font-bold transition-all shadow-sm ${
              copied
                ? 'bg-emerald-600 text-white'
                : 'bg-indigo-600 text-white hover:bg-indigo-500 shadow-indigo-600/20'
            }`}
          >
            {copied ? (
              <>
                <Check className="h-3.5 w-3.5" />
                <span>Copied {currentLangObj.name}!</span>
              </>
            ) : (
              <>
                <Copy className="h-3.5 w-3.5" />
                <span>Copy ({currentLangObj.name})</span>
              </>
            )}
          </button>

          {/* AI Customize Spin */}
          <button
            onClick={handleAISpin}
            className="flex items-center justify-center gap-1 rounded-xl border border-slate-700 bg-slate-800/80 px-2 py-2 text-xs font-medium text-slate-200 hover:border-indigo-500/50 hover:bg-slate-750 hover:text-white transition-all"
            title="Refine or rewrite with Gemini AI"
          >
            <Sparkles className="h-3.5 w-3.5 text-indigo-400" />
            <span className="hidden sm:inline">AI Spin</span>
          </button>

          {/* Share */}
          <button
            onClick={() => onOpenShare({ ...template, text: displayText })}
            className="flex items-center justify-center gap-1 rounded-xl border border-slate-700 bg-slate-800/80 px-2 py-2 text-xs font-medium text-slate-200 hover:border-indigo-500/50 hover:bg-slate-750 hover:text-white transition-all"
            title="Share via WhatsApp or link"
          >
            <Share2 className="h-3.5 w-3.5 text-slate-300" />
            <span className="hidden sm:inline">Share</span>
          </button>
        </div>
      </div>
    </div>
  );
};
