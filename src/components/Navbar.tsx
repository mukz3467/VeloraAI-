import React, { useState } from 'react';
import { 
  Sparkles, 
  Search, 
  Store, 
  UserCheck, 
  Zap, 
  Bookmark, 
  Moon, 
  Sun, 
  User as UserIcon, 
  Menu, 
  X, 
  BarChart2,
  Sliders
} from 'lucide-react';
import { useNavigation } from '../context/NavigationContext';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { useFavorites } from '../context/FavoritesContext';
import { useBusinessProfile } from '../context/BusinessProfileContext';
import { useSEO } from '../context/SEOContext';

interface NavbarProps {
  onOpenSearch: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenSearch }) => {
  const { currentPath, navigate } = useNavigation();
  const { theme, toggleTheme } = useTheme();
  const { user, openAuthModal } = useAuth();
  const { favorites } = useFavorites();
  const { profile, openProfileModal } = useBusinessProfile();
  const { openSEOModal } = useSEO();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Seller Messages', path: '/seller-messages', icon: Store },
    { label: 'Customer Messages', path: '/customer-messages', icon: UserCheck },
    { label: 'Quick Replies', path: '/daily-quick-replies', icon: Zap },
    { label: 'AI Generator', path: '/ai-message-generator', icon: Sparkles },
    { label: `Saved (${favorites.length})`, path: '/favorites', icon: Bookmark },
  ];

  const handleLinkClick = (path: string) => {
    navigate(path);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-slate-950/85 backdrop-blur-xl transition-colors duration-200">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand Logo */}
        <div className="flex items-center gap-6 lg:gap-8">
          <button 
            onClick={() => handleLinkClick('/')}
            className="group flex items-center gap-2.5 text-left focus:outline-none shrink-0"
          >
            <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-violet-500 shadow-lg shadow-indigo-500/25 transition-transform duration-300 group-hover:scale-105">
              <Store className="h-5 w-5 text-white" />
              <div className="absolute -top-1 -right-1 flex h-3 w-3">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex h-3 w-3 rounded-full bg-emerald-500"></span>
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-display text-lg sm:text-xl font-bold tracking-tight text-white">
                  Velora<span className="text-indigo-400">AI</span>
                </span>
                <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-bold text-emerald-400 border border-emerald-500/20">
                  Seller Hub
                </span>
              </div>
              <p className="text-[10px] text-slate-400 tracking-wider uppercase font-semibold">Business Messages</p>
            </div>
          </button>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map(link => {
              const Icon = link.icon;
              const isActive = currentPath === link.path || (link.path === '/seller-messages' && currentPath.startsWith('/seller-messages'));
              return (
                <button
                  key={link.path}
                  onClick={() => handleLinkClick(link.path)}
                  className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
                    isActive 
                      ? 'bg-indigo-500/15 text-indigo-300 border border-indigo-500/30 shadow-sm' 
                      : 'text-slate-300 hover:bg-slate-900 hover:text-white'
                  }`}
                >
                  <Icon className={`h-3.5 w-3.5 ${isActive ? 'text-indigo-400' : 'text-slate-400'}`} />
                  <span>{link.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Right Action Bar */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          {/* Quick Search Button */}
          <button
            onClick={onOpenSearch}
            className="flex items-center gap-2 rounded-xl border border-slate-800 bg-slate-900/80 px-2.5 py-1.5 text-xs text-slate-400 hover:border-slate-700 hover:bg-slate-800/80 hover:text-slate-200 transition-all sm:px-3 sm:py-2"
            title="Search templates (Cmd+K)"
          >
            <Search className="h-3.5 w-3.5 text-indigo-400" />
            <span className="hidden sm:inline">Search...</span>
            <kbd className="hidden rounded bg-slate-800 px-1 text-[10px] text-slate-400 sm:inline-block border border-slate-700">
              ⌘K
            </kbd>
          </button>

          {/* Add SEO Metadata (New Feature) */}
          <button
            onClick={() => openSEOModal(currentPath)}
            className="flex items-center gap-1.5 rounded-xl border border-indigo-500/40 bg-indigo-500/10 px-2.5 py-1.5 text-xs font-semibold text-indigo-300 hover:bg-indigo-500/20 hover:text-white transition-all shadow-sm"
            title="Configure SEO metadata & run audit"
          >
            <Sparkles className="h-3.5 w-3.5 text-indigo-400" />
            <span className="hidden lg:inline">Add SEO Metadata</span>
            <span className="rounded-md bg-emerald-500/20 px-1.5 py-0.2 text-[9px] font-bold text-emerald-400 border border-emerald-500/30">
              New Feature
            </span>
          </button>

          {/* Saved Shop Profile Button */}
          <button
            onClick={openProfileModal}
            className="flex items-center gap-1.5 rounded-xl border border-slate-800 bg-slate-900 px-2.5 py-1.5 text-xs font-semibold text-slate-300 hover:border-indigo-500/40 hover:text-white transition-all"
            title="Manage saved shop details"
          >
            <Store className="h-3.5 w-3.5 text-indigo-400" />
            <span className="hidden md:inline font-mono text-[11px] text-indigo-300">{profile.shopName || 'Shop Profile'}</span>
          </button>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="rounded-xl border border-slate-800 bg-slate-900/80 p-2 text-slate-400 hover:bg-slate-800 hover:text-slate-200 transition-all"
            title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          >
            {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>

          {/* User Credits / Auth */}
          <div className="hidden sm:flex items-center gap-2">
            {user.tier === 'guest' ? (
              <button
                onClick={openAuthModal}
                className="flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 px-3.5 py-1.5 text-xs font-semibold text-white shadow-md shadow-indigo-600/20 hover:from-indigo-500 hover:to-violet-500 transition-all"
              >
                <UserIcon className="h-3.5 w-3.5" />
                <span>Sign In</span>
              </button>
            ) : (
              <button
                onClick={() => navigate('/profile')}
                className="flex h-8 w-8 items-center justify-center rounded-xl bg-indigo-600/30 border border-indigo-500/50 text-indigo-300 font-semibold text-xs"
              >
                {user.name.charAt(0)}
              </button>
            )}
          </div>

          {/* Mobile menu hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden rounded-xl border border-slate-800 bg-slate-900 p-2 text-slate-400 hover:text-white"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-slate-800 bg-slate-950/95 px-4 pt-2 pb-6 space-y-2 backdrop-blur-2xl">
          {navLinks.map(link => {
            const Icon = link.icon;
            const isActive = currentPath === link.path;
            return (
              <button
                key={link.path}
                onClick={() => handleLinkClick(link.path)}
                className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all ${
                  isActive ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/30' : 'text-slate-300 hover:bg-slate-900'
                }`}
              >
                <Icon className="h-5 w-5 text-indigo-400" />
                <span>{link.label}</span>
              </button>
            );
          })}

          <button
            onClick={() => { setMobileMenuOpen(false); openSEOModal(currentPath); }}
            className="flex w-full items-center justify-between rounded-xl border border-indigo-500/40 bg-indigo-500/10 px-4 py-3 text-sm font-semibold text-indigo-300"
          >
            <div className="flex items-center gap-3">
              <Sparkles className="h-5 w-5 text-indigo-400" />
              <span>Add SEO Metadata</span>
            </div>
            <span className="rounded-md bg-emerald-500/20 px-2 py-0.5 text-[10px] font-bold text-emerald-400 border border-emerald-500/30">
              New Feature
            </span>
          </button>

          <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between">
            <button
              onClick={() => { setMobileMenuOpen(false); openProfileModal(); }}
              className="flex items-center gap-2 text-xs text-indigo-400 font-medium py-2"
            >
              <Store className="h-4 w-4" />
              <span>Shop: {profile.shopName || 'Edit Profile'}</span>
            </button>

            {user.tier === 'guest' ? (
              <button
                onClick={() => { setMobileMenuOpen(false); openAuthModal(); }}
                className="rounded-lg bg-indigo-600 px-3 py-1.5 text-xs font-semibold text-white"
              >
                Sign In
              </button>
            ) : (
              <button
                onClick={() => handleLinkClick('/profile')}
                className="text-xs text-indigo-400 font-medium"
              >
                {user.name}
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
