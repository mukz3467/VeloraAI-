import React, { useState, useEffect, useRef } from 'react';
import { Search, X, Sparkles, Compass, Flame, ArrowRight, CornerDownLeft } from 'lucide-react';
import { CATEGORIES } from '../data/categories';
import { Template } from '../types';
import { useNavigation } from '../context/NavigationContext';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectTemplate: (template: Template) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onSelectTemplate
}) => {
  const { navigate } = useNavigation();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Template[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const inputRef = useRef<HTMLInputElement>(null);

  const trendingQueries = [
    'best friend birthday',
    'romantic confession',
    'resignation notice',
    'whatsapp business greeting',
    'apology to partner',
    'monday motivation',
    'instagram photo dump caption',
    'meeting follow-up'
  ];

  // Auto focus input on open
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
      setResults([]);
    }
  }, [isOpen]);

  // Handle ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Debounced search
  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const timer = setTimeout(async () => {
      setLoading(true);
      try {
        let url = `/api/templates?query=${encodeURIComponent(query)}&limit=8`;
        if (selectedCategory !== 'all') {
          url += `&category=${selectedCategory}`;
        }
        const res = await fetch(url);
        if (res.ok) {
          const data = await res.json();
          setResults(data.templates || []);
        }
      } catch (err) {
        console.error('Search error:', err);
      } finally {
        setLoading(false);
      }
    }, 200);

    return () => clearTimeout(timer);
  }, [query, selectedCategory]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-4 sm:p-6 lg:p-10">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-slate-950/80 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-3xl rounded-2xl border border-slate-800 bg-slate-900 shadow-2xl overflow-hidden z-10 mt-12 animate-in fade-in zoom-in-95 duration-150">
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 border-b border-slate-800 px-4 py-3.5 sm:px-6">
          <Search className="h-5 w-5 text-indigo-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search by occasion, recipient, emotion, or keyword (e.g. 'apology to friend', 'job offer')..."
            className="w-full bg-transparent text-sm sm:text-base text-white placeholder-slate-400 focus:outline-none"
          />
          {query && (
            <button 
              onClick={() => setQuery('')}
              className="text-slate-400 hover:text-white p-1"
            >
              <X className="h-4 w-4" />
            </button>
          )}
          <kbd className="hidden sm:inline-block rounded bg-slate-800 px-2 py-0.5 text-xs text-slate-400 border border-slate-700">
            ESC
          </kbd>
        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-2 overflow-x-auto px-4 py-2.5 sm:px-6 border-b border-slate-800/60 scrollbar-none text-xs">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`rounded-lg px-2.5 py-1 whitespace-nowrap transition-colors font-medium ${
              selectedCategory === 'all'
                ? 'bg-indigo-600 text-white'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            All Categories
          </button>
          {CATEGORIES.slice(0, 7).map(cat => (
            <button
              key={cat.slug}
              onClick={() => setSelectedCategory(cat.slug)}
              className={`rounded-lg px-2.5 py-1 whitespace-nowrap transition-colors font-medium ${
                selectedCategory === cat.slug
                  ? 'bg-indigo-600 text-white'
                  : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700'
              }`}
            >
              {cat.name.split(',')[0]}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="max-h-[60vh] overflow-y-auto p-4 sm:p-6 space-y-6">
          {loading && (
            <div className="flex items-center justify-center py-12 text-slate-400 gap-2">
              <Sparkles className="h-4 w-4 animate-spin text-indigo-400" />
              <span className="text-sm">Searching template universe...</span>
            </div>
          )}

          {!loading && results.length > 0 && (
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs text-slate-400 font-medium">
                <span>Found {results.length} results</span>
                <span>Click to view or personalize</span>
              </div>
              <div className="space-y-2">
                {results.map(template => (
                  <div
                    key={template.id}
                    onClick={() => {
                      onClose();
                      onSelectTemplate(template);
                    }}
                    className="group flex flex-col sm:flex-row sm:items-center justify-between gap-2 rounded-xl border border-slate-800/80 bg-slate-950/60 p-3.5 hover:border-indigo-500/50 hover:bg-slate-850 cursor-pointer transition-all"
                  >
                    <div className="space-y-1 pr-2">
                      <div className="flex items-center gap-2">
                        <span className="font-display font-semibold text-sm text-white group-hover:text-indigo-300 transition-colors">
                          {template.title}
                        </span>
                        <span className="rounded-full bg-indigo-500/10 px-2 py-0.5 text-[10px] text-indigo-400 border border-indigo-500/20 capitalize">
                          {template.tone}
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 line-clamp-1">
                        {template.text}
                      </p>
                    </div>

                    <div className="flex items-center gap-1.5 text-xs text-slate-400 group-hover:text-indigo-400 shrink-0">
                      <span>Open</span>
                      <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {!loading && query && results.length === 0 && (
            <div className="py-12 text-center space-y-3">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-800 text-slate-400">
                <Search className="h-6 w-6" />
              </div>
              <p className="text-sm font-medium text-slate-200">No matching templates found for "{query}"</p>
              <p className="text-xs text-slate-400 max-w-sm mx-auto">
                Try searching by simple keywords like "anniversary", "boss", or jump directly into the AI Message Generator to synthesize a brand new custom message.
              </p>
              <button
                onClick={() => {
                  onClose();
                  sessionStorage.setItem('velora_seed_prompt', query);
                  navigate('/ai-message-generator');
                }}
                className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2 text-xs font-semibold text-white hover:bg-indigo-500 transition-all shadow-md shadow-indigo-600/20"
              >
                <Sparkles className="h-3.5 w-3.5" />
                <span>Generate with AI Generator</span>
              </button>
            </div>
          )}

          {!query && (
            <div className="space-y-6">
              {/* Trending Searches */}
              <div>
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
                  <Flame className="h-3.5 w-3.5 text-amber-400" />
                  <span>Trending Searches</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {trendingQueries.map(item => (
                    <button
                      key={item}
                      onClick={() => setQuery(item)}
                      className="rounded-lg border border-slate-800 bg-slate-800/60 px-3 py-1.5 text-xs text-slate-300 hover:border-indigo-500/40 hover:bg-slate-800 hover:text-white transition-all text-left"
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>

              {/* Browse by Category Shortcuts */}
              <div>
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
                  <Compass className="h-3.5 w-3.5 text-indigo-400" />
                  <span>Popular Categories</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {CATEGORIES.slice(0, 6).map(cat => (
                    <button
                      key={cat.slug}
                      onClick={() => {
                        onClose();
                        navigate(`/messages/${cat.slug}`);
                      }}
                      className="flex items-center justify-between rounded-xl border border-slate-800/80 bg-slate-950/40 p-3 hover:border-slate-700 hover:bg-slate-800/50 text-left transition-all"
                    >
                      <div>
                        <div className="text-xs font-semibold text-white">{cat.name}</div>
                        <div className="text-[11px] text-slate-400">{cat.subcategories.length} subcategories</div>
                      </div>
                      <ArrowRight className="h-3.5 w-3.5 text-slate-500" />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="border-t border-slate-800/80 bg-slate-950/50 px-4 py-2.5 sm:px-6 flex items-center justify-between text-xs text-slate-400">
          <span>Tip: Press <kbd className="rounded bg-slate-800 px-1 text-[10px]">Enter</kbd> to search</span>
          <button
            onClick={() => {
              onClose();
              navigate('/explore');
            }}
            className="text-indigo-400 hover:text-indigo-300 font-medium"
          >
            Explore all 20 categories →
          </button>
        </div>
      </div>
    </div>
  );
};
