import React from 'react';
import { Sparkles, Store, UserCheck, Zap, Shield, FileText, Compass, ExternalLink } from 'lucide-react';
import { useNavigation } from '../context/NavigationContext';
import { useSEO } from '../context/SEOContext';
import { SELLER_CATEGORIES, CUSTOMER_CATEGORIES } from '../data/sellerCustomerCategories';

export const Footer: React.FC = () => {
  const { navigate } = useNavigation();
  const { openSEOModal } = useSEO();

  return (
    <footer className="border-t border-slate-800/80 bg-slate-950 text-slate-400">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-4 lg:gap-12">
          {/* Brand Info */}
          <div className="md:col-span-1 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-500 shadow-md shadow-indigo-500/20">
                <Sparkles className="h-5 w-5 text-white" />
              </div>
              <span className="font-display text-xl font-bold tracking-tight text-white">
                Velora<span className="text-indigo-400">AI</span>
              </span>
            </div>
            <p className="text-sm leading-relaxed text-slate-400">
              The premier AI seller and customer communication platform. Providing instant order confirmations, payment reminders, shipping notices, and multilingual messages in English, Urdu, and Roman Urdu.
            </p>
            <div className="pt-2 flex flex-wrap gap-2 text-xs">
              <span className="rounded-lg border border-slate-800 bg-slate-900 px-2.5 py-1 text-slate-300">
                🚀 Multi-Channel Ready
              </span>
              <span className="rounded-lg border border-slate-800 bg-slate-900 px-2.5 py-1 text-slate-300">
                🇵🇰 Urdu & Roman Urdu
              </span>
            </div>
          </div>

          {/* Seller Messages */}
          <div>
            <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-slate-200 flex items-center gap-2">
              <Store className="h-4 w-4 text-indigo-400" />
              <span>Seller Messages</span>
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <button onClick={() => navigate('/seller-messages')} className="hover:text-indigo-400 transition-colors text-left font-medium text-slate-200">
                  All Seller Categories
                </button>
              </li>
              {SELLER_CATEGORIES.slice(0, 5).map(cat => (
                <li key={cat.slug}>
                  <button
                    onClick={() => navigate(`/seller-messages/${cat.slug}`)}
                    className="hover:text-indigo-400 transition-colors text-left text-xs text-slate-400"
                  >
                    {cat.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Messages & Tools */}
          <div>
            <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-slate-200 flex items-center gap-2">
              <UserCheck className="h-4 w-4 text-violet-400" />
              <span>Customer & Tools</span>
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <button onClick={() => navigate('/customer-messages')} className="hover:text-indigo-400 transition-colors text-left font-medium text-slate-200">
                  Customer Message Center
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/daily-quick-replies')} className="hover:text-indigo-400 transition-colors text-left text-xs">
                  Daily WhatsApp Quick Replies
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/ai-message-generator')} className="hover:text-indigo-400 transition-colors text-left text-xs">
                  AI Generator & Rewriter
                </button>
              </li>
              <li>
                <button 
                  onClick={() => openSEOModal('/')} 
                  className="flex items-center gap-1.5 text-indigo-400 hover:text-indigo-300 transition-colors text-left text-xs font-medium"
                >
                  <Sparkles className="h-3 w-3" />
                  <span>Add SEO Metadata</span>
                  <span className="rounded bg-emerald-500/20 px-1 py-0.2 text-[9px] font-bold text-emerald-400 border border-emerald-500/30">
                    New Feature
                  </span>
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/trending')} className="hover:text-indigo-400 transition-colors text-left text-xs">
                  Trending Business Templates
                </button>
              </li>
              <li>
                <a href="/sitemap.xml" target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:text-indigo-400 transition-colors text-xs">
                  <span>XML Sitemap</span>
                  <ExternalLink className="h-3 w-3" />
                </a>
              </li>
            </ul>
          </div>

          {/* Platform & Trust */}
          <div>
            <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-slate-200">
              Platform & Legal
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <button onClick={() => navigate('/about')} className="hover:text-indigo-400 transition-colors text-xs">
                  About Velora AI
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/contact')} className="hover:text-indigo-400 transition-colors text-xs">
                  Contact Support & Inquiries
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/privacy')} className="hover:text-indigo-400 transition-colors text-xs">
                  Privacy Policy & Cookies
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/terms')} className="hover:text-indigo-400 transition-colors text-xs">
                  Terms of Service
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-slate-800/80 pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} Velora AI Communication Platform. Designed for modern online businesses & buyers.</p>
          <div className="flex items-center gap-6">
            <button onClick={() => navigate('/privacy')} className="hover:text-slate-300">Privacy Policy</button>
            <button onClick={() => navigate('/terms')} className="hover:text-slate-300">Terms of Service</button>
            <button onClick={() => navigate('/contact')} className="hover:text-slate-300">Contact</button>
          </div>
        </div>
      </div>
    </footer>
  );
};
