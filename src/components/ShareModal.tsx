import React, { useState } from 'react';
import { X, Share2, Copy, Check, MessageSquare, Twitter, Mail, Link2 } from 'lucide-react';
import { Template } from '../types';

interface ShareModalProps {
  template: Template | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ShareModal: React.FC<ShareModalProps> = ({
  template,
  isOpen,
  onClose
}) => {
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedText, setCopiedText] = useState(false);

  if (!isOpen || !template) return null;

  const currentUrl = `${window.location.origin}/templates/${template.id}`;

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(currentUrl);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    } catch {}
  };

  const handleCopyText = async () => {
    try {
      await navigator.clipboard.writeText(template.text);
      setCopiedText(true);
      setTimeout(() => setCopiedText(false), 2000);
    } catch {}
  };

  const shareToWhatsApp = () => {
    const url = `https://wa.me/?text=${encodeURIComponent(template.text)}`;
    window.open(url, '_blank');
  };

  const shareToTwitter = () => {
    const text = template.text.length > 200 ? template.text.substring(0, 197) + '...' : template.text;
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text + '\n\nDiscovered via @VeloraAI')}`;
    window.open(url, '_blank');
  };

  const shareToEmail = () => {
    const url = `mailto:?subject=${encodeURIComponent(template.title)}&body=${encodeURIComponent(template.text)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div 
        className="fixed inset-0 bg-slate-950/80 backdrop-blur-md"
        onClick={onClose}
      />

      <div className="relative w-full max-w-md rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-2xl z-10 space-y-5 animate-in fade-in zoom-in-95">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <Share2 className="h-5 w-5 text-indigo-400" />
            <h3 className="font-display text-base font-bold text-white">Share Message</h3>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white p-1">
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Snippet preview */}
        <div className="rounded-xl border border-slate-800 bg-slate-950/80 p-3 text-xs text-slate-300 line-clamp-3">
          "{template.text}"
        </div>

        {/* Share buttons */}
        <div className="grid grid-cols-3 gap-3">
          <button
            onClick={shareToWhatsApp}
            className="flex flex-col items-center justify-center gap-2 rounded-xl border border-slate-800 bg-slate-950/60 p-3 hover:border-emerald-500/50 hover:bg-emerald-500/10 transition-all group"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-500/20 text-emerald-400 group-hover:bg-emerald-500 group-hover:text-white transition-colors">
              <MessageSquare className="h-4 w-4" />
            </div>
            <span className="text-xs font-medium text-slate-300 group-hover:text-white">WhatsApp</span>
          </button>

          <button
            onClick={shareToTwitter}
            className="flex flex-col items-center justify-center gap-2 rounded-xl border border-slate-800 bg-slate-950/60 p-3 hover:border-sky-500/50 hover:bg-sky-500/10 transition-all group"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-sky-500/20 text-sky-400 group-hover:bg-sky-500 group-hover:text-white transition-colors">
              <Twitter className="h-4 w-4" />
            </div>
            <span className="text-xs font-medium text-slate-300 group-hover:text-white">X / Twitter</span>
          </button>

          <button
            onClick={shareToEmail}
            className="flex flex-col items-center justify-center gap-2 rounded-xl border border-slate-800 bg-slate-950/60 p-3 hover:border-violet-500/50 hover:bg-violet-500/10 transition-all group"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-violet-500/20 text-violet-400 group-hover:bg-violet-500 group-hover:text-white transition-colors">
              <Mail className="h-4 w-4" />
            </div>
            <span className="text-xs font-medium text-slate-300 group-hover:text-white">Email</span>
          </button>
        </div>

        {/* Copy actions */}
        <div className="space-y-2 pt-2 border-t border-slate-800">
          <button
            onClick={handleCopyLink}
            className="flex w-full items-center justify-between rounded-xl border border-slate-800 bg-slate-950 px-3.5 py-2.5 text-xs text-slate-300 hover:border-indigo-500/40 hover:text-white transition-all"
          >
            <div className="flex items-center gap-2">
              <Link2 className="h-4 w-4 text-indigo-400" />
              <span>Copy Template Link</span>
            </div>
            {copiedLink ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4 text-slate-500" />}
          </button>

          <button
            onClick={handleCopyText}
            className="flex w-full items-center justify-between rounded-xl border border-slate-800 bg-slate-950 px-3.5 py-2.5 text-xs text-slate-300 hover:border-indigo-500/40 hover:text-white transition-all"
          >
            <div className="flex items-center gap-2">
              <Copy className="h-4 w-4 text-indigo-400" />
              <span>Copy Full Text</span>
            </div>
            {copiedText ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4 text-slate-500" />}
          </button>
        </div>
      </div>
    </div>
  );
};
