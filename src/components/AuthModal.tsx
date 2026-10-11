import React, { useState } from 'react';
import { X, Sparkles, User, Mail, ShieldCheck, Check } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const AuthModal: React.FC = () => {
  const { isAuthModalOpen, closeAuthModal, loginAsDemoUser } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  React.useEffect(() => {
    if (!isAuthModalOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeAuthModal();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isAuthModalOpen, closeAuthModal]);

  if (!isAuthModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      loginAsDemoUser(name || 'Jordan Lee', email || 'jordan.lee@example.com');
      setIsSubmitting(false);
    }, 400);
  };

  const handleInstantDemo = () => {
    loginAsDemoUser('Alex Vance', 'alex.vance@velora.ai');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div 
        className="fixed inset-0 bg-slate-950/80 backdrop-blur-md"
        onClick={closeAuthModal}
      />

      <div className="relative w-full max-w-md rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-2xl z-10 space-y-5 animate-in fade-in zoom-in-95">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-indigo-600/20 text-indigo-400">
              <Sparkles className="h-4 w-4" />
            </div>
            <div>
              <h3 className="font-display text-base font-bold text-white">Join Velora AI</h3>
              <p className="text-xs text-slate-400">Save favorites across devices & unlock 500 monthly credits</p>
            </div>
          </div>
          <button onClick={closeAuthModal} className="text-slate-400 hover:text-white p-1">
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-3.5">
          <div className="space-y-1">
            <label className="text-xs font-medium text-slate-300">Your Name</label>
            <div className="relative">
              <User className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
              <input
                type="text"
                required
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="e.g. Jordan Lee"
                className="w-full rounded-xl border border-slate-800 bg-slate-950 pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:border-indigo-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-medium text-slate-300">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
              <input
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="jordan@company.com"
                className="w-full rounded-xl border border-slate-800 bg-slate-950 pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:border-indigo-500 focus:outline-none"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 py-2.5 text-xs font-semibold text-white shadow-lg shadow-indigo-600/25 hover:from-indigo-500 hover:to-violet-500 transition-all flex items-center justify-center gap-1.5"
          >
            {isSubmitting ? (
              <span>Activating Account...</span>
            ) : (
              <>
                <ShieldCheck className="h-4 w-4" />
                <span>Continue to Free Account</span>
              </>
            )}
          </button>
        </form>

        <div className="relative flex py-1 items-center">
          <div className="flex-grow border-t border-slate-800"></div>
          <span className="flex-shrink mx-2 text-[10px] text-slate-500 uppercase">Or Fast Test</span>
          <div className="flex-grow border-t border-slate-800"></div>
        </div>

        {/* 1-Click Instant Demo Login */}
        <button
          onClick={handleInstantDemo}
          className="w-full rounded-xl border border-slate-700 bg-slate-800/80 py-2 text-xs font-medium text-slate-200 hover:bg-slate-750 hover:text-white transition-all flex items-center justify-center gap-2"
        >
          <Sparkles className="h-3.5 w-3.5 text-indigo-400" />
          <span>One-Click Demo Sign-In (Alex Vance, Pro)</span>
        </button>

        <p className="text-[11px] text-slate-500 text-center">
          By signing in, you agree to Velora's Privacy Policy and Terms of Service.
        </p>
      </div>
    </div>
  );
};
