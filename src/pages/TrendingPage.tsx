import React, { useState } from 'react';
import { Flame, Sparkles, Trophy, Filter, Store, UserCheck } from 'lucide-react';
import { INITIAL_TEMPLATES } from '../data/templates';
import { BUSINESS_TEMPLATES } from '../data/businessTemplates';
import { CATEGORIES } from '../data/categories';
import { SELLER_CATEGORIES, CUSTOMER_CATEGORIES } from '../data/sellerCustomerCategories';
import { Template } from '../types';
import { MessageCard } from '../components/MessageCard';
import { SEOHelmet } from '../components/SEOHelmet';

interface TrendingPageProps {
  onOpenShare: (template: Template) => void;
  onOpenPersonalize: (template: Template) => void;
}

export const TrendingPage: React.FC<TrendingPageProps> = ({
  onOpenShare,
  onOpenPersonalize
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [roleFilter, setRoleFilter] = useState<'all' | 'seller' | 'customer'>('all');

  const allTemplates = [...BUSINESS_TEMPLATES, ...INITIAL_TEMPLATES];
  const allCategories = [...SELLER_CATEGORIES, ...CUSTOMER_CATEGORIES, ...CATEGORIES];

  // Sort by copyCount descending
  const sortedTemplates = allTemplates
    .filter(t => roleFilter === 'all' || t.role === roleFilter)
    .filter(t => selectedCategory === 'all' || t.categorySlug === selectedCategory)
    .sort((a, b) => (b.copyCount || 0) - (a.copyCount || 0));

  return (
    <div className="min-h-screen py-8 sm:py-12">
      <SEOHelmet
        title="Weekly Trending Message Templates Leaderboard | Velora AI"
        description="Discover the most copied and celebrated message templates across romance, business, birthdays, apologies, and social captions."
        canonicalPath="/trending"
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-3.5 py-1 text-xs font-semibold text-amber-300">
            <Flame className="h-3.5 w-3.5 text-amber-400" />
            <span>Real Usage Data Leaderboard</span>
          </div>
          <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-white">
            Weekly Trending Messages
          </h1>
          <p className="text-xs sm:text-sm text-slate-300">
            Ranked dynamically by copy velocity, client saves, and cross-platform shares.
          </p>
        </div>

        {/* Category & Role Pills Filter */}
        <div className="flex flex-col items-center gap-3">
          {/* Role Toggle */}
          <div className="flex items-center gap-1.5 rounded-2xl border border-slate-800 bg-slate-900/80 p-1 text-xs">
            <button
              onClick={() => { setRoleFilter('all'); setSelectedCategory('all'); }}
              className={`rounded-xl px-3 py-1.5 font-semibold transition-all ${
                roleFilter === 'all' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
              }`}
            >
              All Roles
            </button>
            <button
              onClick={() => { setRoleFilter('seller'); setSelectedCategory('all'); }}
              className={`flex items-center gap-1 rounded-xl px-3 py-1.5 font-semibold transition-all ${
                roleFilter === 'seller' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Store className="h-3 w-3" />
              <span>Seller Top</span>
            </button>
            <button
              onClick={() => { setRoleFilter('customer'); setSelectedCategory('all'); }}
              className={`flex items-center gap-1 rounded-xl px-3 py-1.5 font-semibold transition-all ${
                roleFilter === 'customer' ? 'bg-emerald-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
              }`}
            >
              <UserCheck className="h-3 w-3" />
              <span>Customer Top</span>
            </button>
          </div>

          {/* Category Chips */}
          <div className="flex items-center justify-center gap-2 overflow-x-auto max-w-full pb-2 text-xs">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`rounded-xl px-3.5 py-1.5 font-medium transition-colors whitespace-nowrap ${
                selectedCategory === 'all' ? 'bg-amber-600 text-white shadow-sm' : 'bg-slate-900 border border-slate-800 text-slate-300 hover:bg-slate-800'
              }`}
            >
              All Categories
            </button>
            {allCategories.slice(0, 8).map(cat => (
              <button
                key={cat.slug}
                onClick={() => setSelectedCategory(cat.slug)}
                className={`rounded-xl px-3 py-1.5 font-medium transition-colors whitespace-nowrap ${
                  selectedCategory === cat.slug ? 'bg-amber-600 text-white shadow-sm' : 'bg-slate-900 border border-slate-800 text-slate-300 hover:bg-slate-800'
                }`}
              >
                {cat.name.split(',')[0]}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedTemplates.map(template => (
            <MessageCard
              key={template.id}
              template={template}
              onOpenShare={onOpenShare}
              onOpenPersonalize={onOpenPersonalize}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
