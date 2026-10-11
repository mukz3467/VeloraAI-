import React, { useState } from 'react';
import { Bookmark, FolderPlus, Copy, Clock, Search, Trash2, ArrowRight } from 'lucide-react';
import { INITIAL_TEMPLATES } from '../data/templates';
import { Template } from '../types';
import { MessageCard } from '../components/MessageCard';
import { SEOHelmet } from '../components/SEOHelmet';
import { useFavorites } from '../context/FavoritesContext';
import { useNavigation } from '../context/NavigationContext';

interface FavoritesPageProps {
  onOpenShare: (template: Template) => void;
  onOpenPersonalize: (template: Template) => void;
}

export const FavoritesPage: React.FC<FavoritesPageProps> = ({
  onOpenShare,
  onOpenPersonalize
}) => {
  const { favorites, collections, createCollection, recentCopied } = useFavorites();
  const { navigate } = useNavigation();

  const [activeTab, setActiveTab] = useState<'favorites' | 'collections' | 'history'>('favorites');
  const [newColName, setNewColName] = useState('');
  const [showColModal, setShowColModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Find saved templates
  const savedTemplates = INITIAL_TEMPLATES.filter(t => favorites.includes(t.id));
  const filteredTemplates = savedTemplates.filter(t => 
    !searchQuery.trim() || 
    t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.text.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCreateCollection = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newColName.trim()) return;
    createCollection(newColName.trim(), '#6366f1');
    setNewColName('');
    setShowColModal(false);
  };

  return (
    <div className="min-h-screen py-8 sm:py-12">
      <SEOHelmet
        title="Saved Messages, Collections & Copy History | Velora AI"
        description="Organize your favorite messages into custom collections and review your recent clipboard copies on Velora AI."
        canonicalPath="/favorites"
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-rose-400 uppercase tracking-wider mb-1">
              <Bookmark className="h-4 w-4" />
              <span>Personal Vault</span>
            </div>
            <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-white">
              Saved Messages & Collections
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Access your bookmarked phrases, organized work folders, and clipboard history.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowColModal(true)}
              className="flex items-center gap-1.5 rounded-xl border border-slate-700 bg-slate-800 px-3.5 py-2 text-xs font-semibold text-slate-200 hover:bg-slate-700 transition-colors"
            >
              <FolderPlus className="h-4 w-4 text-indigo-400" />
              <span>New Collection</span>
            </button>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-3 border-b border-slate-800/80 pb-3 text-xs">
          <button
            onClick={() => setActiveTab('favorites')}
            className={`font-semibold pb-1 transition-colors ${
              activeTab === 'favorites' ? 'text-indigo-400 border-b-2 border-indigo-500' : 'text-slate-400 hover:text-white'
            }`}
          >
            All Bookmarks ({favorites.length})
          </button>
          <button
            onClick={() => setActiveTab('collections')}
            className={`font-semibold pb-1 transition-colors ${
              activeTab === 'collections' ? 'text-indigo-400 border-b-2 border-indigo-500' : 'text-slate-400 hover:text-white'
            }`}
          >
            Collections ({collections.length})
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={`font-semibold pb-1 transition-colors ${
              activeTab === 'history' ? 'text-indigo-400 border-b-2 border-indigo-500' : 'text-slate-400 hover:text-white'
            }`}
          >
            Recent Copies ({recentCopied.length})
          </button>
        </div>

        {/* Search Bar for Favorites */}
        {activeTab === 'favorites' && favorites.length > 0 && (
          <div className="max-w-md">
            <div className="relative">
              <Search className="absolute left-3.5 top-2.5 h-4 w-4 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search your saved messages..."
                className="w-full rounded-xl border border-slate-800 bg-slate-900 pl-10 pr-4 py-2 text-xs text-white placeholder-slate-400 focus:border-indigo-500 focus:outline-none"
              />
            </div>
          </div>
        )}

        {/* Content: Favorites Grid */}
        {activeTab === 'favorites' && (
          <div>
            {filteredTemplates.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredTemplates.map(template => (
                  <MessageCard
                    key={template.id}
                    template={template}
                    onOpenShare={onOpenShare}
                    onOpenPersonalize={onOpenPersonalize}
                  />
                ))}
              </div>
            ) : (
              <div className="py-20 text-center rounded-3xl border border-slate-800 bg-slate-900/40 p-8 space-y-3">
                <Bookmark className="mx-auto h-8 w-8 text-slate-600" />
                <h3 className="text-base font-bold text-white">No bookmarked messages yet</h3>
                <p className="text-xs text-slate-400 max-w-sm mx-auto">
                  Click the bookmark icon on any message card to save it into your personal library.
                </p>
                <button
                  onClick={() => navigate('/explore')}
                  className="rounded-xl bg-indigo-600 px-4 py-2 text-xs font-semibold text-white hover:bg-indigo-500 transition-colors"
                >
                  Explore Messages
                </button>
              </div>
            )}
          </div>
        )}

        {/* Content: Collections List */}
        {activeTab === 'collections' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {collections.map(col => {
              const colTemplates = INITIAL_TEMPLATES.filter(t => col.templateIds.includes(t.id));
              return (
                <div key={col.id} className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full" style={{ backgroundColor: col.color }} />
                      <h3 className="font-display font-bold text-base text-white">{col.name}</h3>
                    </div>
                    <span className="text-xs text-slate-400">{col.templateIds.length} items</span>
                  </div>

                  <div className="space-y-2">
                    {colTemplates.slice(0, 2).map(t => (
                      <div key={t.id} className="rounded-xl bg-slate-950 p-2.5 text-xs text-slate-300 line-clamp-1 border border-slate-800/60">
                        {t.title}
                      </div>
                    ))}
                    {colTemplates.length === 0 && (
                      <div className="text-xs text-slate-500 italic py-2">No templates in this folder yet.</div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Content: Recent Copies History */}
        {activeTab === 'history' && (
          <div className="space-y-3 max-w-3xl">
            {recentCopied.length > 0 ? (
              recentCopied.map((item, idx) => (
                <div key={idx} className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4 space-y-2 flex items-start justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-[11px] text-slate-400">
                      <Clock className="h-3 w-3" />
                      <span>{new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                      "{item.text}"
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(item.text);
                    }}
                    className="shrink-0 rounded-lg bg-slate-800 px-2.5 py-1.5 text-xs text-slate-300 hover:text-white transition-colors"
                  >
                    Copy Again
                  </button>
                </div>
              ))
            ) : (
              <div className="py-16 text-center text-slate-500 text-xs">
                No copy history recorded in this session yet.
              </div>
            )}
          </div>
        )}

        {/* Create Collection Modal */}
        {showColModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md" onClick={() => setShowColModal(false)} />
            <div className="relative w-full max-w-sm rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-2xl z-10 space-y-4">
              <h3 className="font-display text-base font-bold text-white">Create New Collection</h3>
              <form onSubmit={handleCreateCollection} className="space-y-3">
                <input
                  type="text"
                  required
                  value={newColName}
                  onChange={e => setNewColName(e.target.value)}
                  placeholder="e.g. Work Cold Emails, Sweet Bedtime..."
                  className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3 py-2 text-xs text-white placeholder-slate-500 focus:border-indigo-500 focus:outline-none"
                />
                <div className="flex items-center justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setShowColModal(false)}
                    className="rounded-xl px-3 py-1.5 text-xs text-slate-400 hover:text-white"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="rounded-xl bg-indigo-600 px-4 py-1.5 text-xs font-semibold text-white hover:bg-indigo-500"
                  >
                    Create
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
