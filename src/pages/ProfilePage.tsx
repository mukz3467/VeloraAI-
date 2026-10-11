import React, { useState } from 'react';
import { User, Zap, ShieldCheck, Sparkles, LogOut, Check, Star, Settings } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useFavorites } from '../context/FavoritesContext';
import { SEOHelmet } from '../components/SEOHelmet';

export const ProfilePage: React.FC = () => {
  const { user, logout, openAuthModal } = useAuth();
  const { favorites, collections } = useFavorites();

  const [savedSettings, setSavedSettings] = useState(false);
  const [defaultTone, setDefaultTone] = useState('friendly');

  const handleSavePref = () => {
    setSavedSettings(true);
    setTimeout(() => setSavedSettings(false), 2000);
  };

  return (
    <div className="min-h-screen py-8 sm:py-12">
      <SEOHelmet
        title="User Profile & AI Usage Credits | Velora AI"
        description="Manage your account preferences, review your monthly AI generation credits, and manage Velora Pro features."
        canonicalPath="/profile"
      />

      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6 sm:p-10 shadow-xl backdrop-blur-xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-tr from-indigo-600 to-violet-600 text-white font-display text-xl font-bold shadow-lg shadow-indigo-600/30">
                {user.name.charAt(0)}
              </div>
              <div>
                <h1 className="font-display text-xl sm:text-2xl font-bold text-white">
                  {user.name}
                </h1>
                <p className="text-xs text-slate-400">
                  {user.email || 'Guest Explorer Session'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className={`rounded-xl px-3 py-1.5 text-xs font-semibold uppercase tracking-wider ${
                user.tier === 'pro'
                  ? 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                  : 'bg-slate-800 text-slate-300'
              }`}>
                {user.tier === 'pro' ? 'Velora Pro' : 'Free Tier'}
              </span>

              {user.tier === 'pro' ? (
                <button
                  onClick={logout}
                  className="rounded-xl border border-slate-800 bg-slate-950 p-2 text-slate-400 hover:text-white"
                  title="Log out"
                >
                  <LogOut className="h-4 w-4" />
                </button>
              ) : (
                <button
                  onClick={openAuthModal}
                  className="rounded-xl bg-indigo-600 px-3.5 py-1.5 text-xs font-semibold text-white hover:bg-indigo-500 transition-colors"
                >
                  Sign In / Upgrade
                </button>
              )}
            </div>
          </div>

          {/* Credits & Stats Card */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="rounded-2xl border border-slate-800 bg-slate-950 p-4 space-y-1">
              <div className="flex items-center gap-1.5 text-xs text-slate-400">
                <Zap className="h-4 w-4 text-amber-400" />
                <span>AI Credits Remaining</span>
              </div>
              <div className="font-display text-2xl font-bold text-white">
                {user.tier === 'pro' ? 'Unlimited' : user.creditsRemaining}
              </div>
              <div className="text-[11px] text-slate-500">Resets daily at midnight</div>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-950 p-4 space-y-1">
              <div className="flex items-center gap-1.5 text-xs text-slate-400">
                <Star className="h-4 w-4 text-rose-400" />
                <span>Bookmarked Messages</span>
              </div>
              <div className="font-display text-2xl font-bold text-white">
                {favorites.length}
              </div>
              <div className="text-[11px] text-slate-500">In {collections.length} collections</div>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-950 p-4 space-y-1">
              <div className="flex items-center gap-1.5 text-xs text-slate-400">
                <ShieldCheck className="h-4 w-4 text-emerald-400" />
                <span>Security Status</span>
              </div>
              <div className="font-display text-base font-bold text-emerald-400 mt-1">
                Zero Data Tracking
              </div>
              <div className="text-[11px] text-slate-500">Client-side persistence</div>
            </div>
          </div>

          {/* Preferences */}
          <div className="space-y-4 pt-4 border-t border-slate-800">
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-300 uppercase tracking-wider">
              <Settings className="h-4 w-4 text-indigo-400" />
              <span>Studio Default Preferences</span>
            </div>

            <div className="max-w-xs space-y-2">
              <label className="text-xs text-slate-400">Default Generator Tone:</label>
              <select
                value={defaultTone}
                onChange={e => setDefaultTone(e.target.value)}
                className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3 py-2 text-xs text-white"
              >
                <option value="friendly">Friendly</option>
                <option value="professional">Professional</option>
                <option value="romantic">Romantic</option>
                <option value="confident">Confident</option>
              </select>

              <button
                onClick={handleSavePref}
                className="rounded-xl bg-slate-800 px-4 py-1.5 text-xs font-medium text-slate-200 hover:text-white"
              >
                {savedSettings ? 'Saved!' : 'Save Preferences'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
