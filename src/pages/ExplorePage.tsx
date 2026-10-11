import React, { useState } from 'react';
import { Compass, Search, ArrowRight, Sparkles, Filter } from 'lucide-react';
import { CATEGORIES } from '../data/categories';
import { SEOHelmet } from '../components/SEOHelmet';
import { useNavigation } from '../context/NavigationContext';

export const ExplorePage: React.FC = () => {
  const { navigate } = useNavigation();
  const [searchTerm, setSearchTerm] = useState('');
  const [badgeFilter, setBadgeFilter] = useState<string>('all');

  const filteredCategories = CATEGORIES.filter(cat => {
    const matchesSearch = 
      cat.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cat.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cat.subcategories.some(sub => sub.name.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesBadge = badgeFilter === 'all' || cat.badge?.toLowerCase() === badgeFilter.toLowerCase();

    return matchesSearch && matchesBadge;
  });

  return (
    <div className="min-h-screen py-10 sm:py-16">
      <SEOHelmet
        title="Explore 20 Message Categories & Subcategories | Velora AI"
        description="Browse our comprehensive directory of 20 categories: Love, Romance, Birthdays, Business, Customer Service, Apologies, and Job Applications."
        canonicalPath="/explore"
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-3.5 py-1 text-xs font-semibold text-indigo-300">
            <Compass className="h-3.5 w-3.5" />
            <span>Complete Category Universe</span>
          </div>
          <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white">
            Explore All 20 Message Categories
          </h1>
          <p className="text-sm sm:text-base text-slate-300">
            Every category features curated subcategories, realistic scenarios, personalized tone filters, and continuous AI message variants.
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 max-w-4xl mx-auto">
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              placeholder="Filter categories or subtopics..."
              className="w-full rounded-xl border border-slate-800 bg-slate-900 pl-10 pr-4 py-2.5 text-xs sm:text-sm text-white placeholder-slate-400 focus:border-indigo-500 focus:outline-none"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto text-xs pb-1 sm:pb-0">
            <button
              onClick={() => setBadgeFilter('all')}
              className={`rounded-xl px-3 py-2 font-medium transition-colors whitespace-nowrap ${
                badgeFilter === 'all'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-slate-900 border border-slate-800 text-slate-300 hover:bg-slate-800'
              }`}
            >
              All (20)
            </button>
            <button
              onClick={() => setBadgeFilter('popular')}
              className={`rounded-xl px-3 py-2 font-medium transition-colors whitespace-nowrap ${
                badgeFilter === 'popular'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-slate-900 border border-slate-800 text-slate-300 hover:bg-slate-800'
              }`}
            >
              Popular
            </button>
            <button
              onClick={() => setBadgeFilter('trending')}
              className={`rounded-xl px-3 py-2 font-medium transition-colors whitespace-nowrap ${
                badgeFilter === 'trending'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-slate-900 border border-slate-800 text-slate-300 hover:bg-slate-800'
              }`}
            >
              Trending
            </button>
            <button
              onClick={() => setBadgeFilter('high utility')}
              className={`rounded-xl px-3 py-2 font-medium transition-colors whitespace-nowrap ${
                badgeFilter === 'high utility'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-slate-900 border border-slate-800 text-slate-300 hover:bg-slate-800'
              }`}
            >
              High Utility
            </button>
          </div>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCategories.map((cat, index) => (
            <div
              key={cat.slug}
              className="glass-card group flex flex-col justify-between rounded-3xl border border-slate-800 bg-slate-900/70 p-6 hover:border-indigo-500/50 hover:bg-slate-900/95 transition-all shadow-xl"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className={`flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-tr ${cat.gradient} text-white shadow-md`}>
                    <Sparkles className="h-5 w-5" />
                  </div>
                  <div className="flex items-center gap-1.5">
                    {cat.badge && (
                      <span className="rounded-full bg-slate-800 px-2.5 py-0.5 text-[10px] font-semibold text-indigo-300 border border-slate-700">
                        {cat.badge}
                      </span>
                    )}
                    <span className="font-mono text-xs text-slate-400">#{index + 1}</span>
                  </div>
                </div>

                <div>
                  <h2 
                    onClick={() => navigate(`/messages/${cat.slug}`)}
                    className="font-display text-lg font-bold text-white group-hover:text-indigo-300 transition-colors cursor-pointer"
                  >
                    {cat.name}
                  </h2>
                  <p className="mt-1.5 text-xs text-slate-400 leading-relaxed">
                    {cat.description}
                  </p>
                </div>

                {/* Subcategories list */}
                <div className="space-y-2 pt-2 border-t border-slate-800/80">
                  <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                    Key Subtopics ({cat.subcategories.length})
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {cat.subcategories.map(sub => (
                      <button
                        key={sub.slug}
                        onClick={() => navigate(`/messages/${cat.slug}/${sub.slug}`)}
                        className="rounded-lg bg-slate-950/80 px-2.5 py-1 text-[11px] text-slate-300 hover:bg-indigo-600/30 hover:text-white border border-slate-800/80 transition-colors text-left"
                      >
                        {sub.name}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action */}
              <div className="pt-5 mt-5 border-t border-slate-800 flex items-center justify-between">
                <button
                  onClick={() => navigate(`/messages/${cat.slug}`)}
                  className="flex items-center gap-1.5 text-xs font-semibold text-indigo-400 group-hover:text-indigo-300 transition-colors"
                >
                  <span>Open Category</span>
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                </button>

                <button
                  onClick={() => {
                    sessionStorage.setItem('velora_seed_purpose', `Message regarding ${cat.name}`);
                    navigate('/ai-message-generator');
                  }}
                  className="rounded-lg bg-slate-800 px-2.5 py-1 text-[11px] font-medium text-slate-300 hover:bg-slate-700 hover:text-white transition-colors"
                  title="Generate new in AI"
                >
                  AI Spin
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredCategories.length === 0 && (
          <div className="py-20 text-center space-y-3">
            <p className="text-base font-semibold text-white">No categories found matching "{searchTerm}"</p>
            <p className="text-xs text-slate-400">Clear filters to browse all 20 categories.</p>
            <button
              onClick={() => { setSearchTerm(''); setBadgeFilter('all'); }}
              className="rounded-xl bg-indigo-600 px-4 py-2 text-xs font-semibold text-white"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
