import React, { useState, useEffect } from 'react';
import { X, Sliders, Copy, Check, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { Template } from '../types';
import { useFavorites } from '../context/FavoritesContext';

interface PersonalizeModalProps {
  template: Template | null;
  isOpen: boolean;
  onClose: () => void;
}

export const PersonalizeModal: React.FC<PersonalizeModalProps> = ({
  template,
  isOpen,
  onClose
}) => {
  const { recordCopy } = useFavorites();
  const [values, setValues] = useState<Record<string, string>>({});
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (template && template.variables) {
      const initial: Record<string, string> = {};
      template.variables.forEach(v => {
        initial[v] = '';
      });
      setValues(initial);
    } else {
      setValues({});
    }
  }, [template]);

  if (!isOpen || !template) return null;

  // Substitute variables in template text
  let personalizedText = template.text;
  Object.entries(values).forEach(([key, val]) => {
    const replacement = val.trim() ? val.trim() : `[${key}]`;
    personalizedText = personalizedText.replaceAll(`[${key}]`, replacement);
  });

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(personalizedText);
      setCopied(true);
      recordCopy(template.id, personalizedText);

      confetti({
        particleCount: 32,
        spread: 60,
        origin: { y: 0.7 }
      });

      setTimeout(() => setCopied(false), 2200);
    } catch {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div 
        className="fixed inset-0 bg-slate-950/80 backdrop-blur-md"
        onClick={onClose}
      />

      <div className="relative w-full max-w-xl rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-2xl z-10 space-y-5 animate-in fade-in zoom-in-95">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <Sliders className="h-5 w-5 text-amber-400" />
            <h3 className="font-display text-base font-bold text-white">Personalize Message</h3>
          </div>
          <button 
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Form fields for variables */}
        {template.variables && template.variables.length > 0 ? (
          <div className="space-y-3">
            <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Fill in Details:
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {template.variables.map(variable => (
                <div key={variable} className="space-y-1">
                  <label className="text-xs text-slate-300 font-medium">
                    {variable}
                  </label>
                  <input
                    type="text"
                    value={values[variable] || ''}
                    onChange={e => setValues({ ...values, [variable]: e.target.value })}
                    placeholder={`Enter ${variable}...`}
                    className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3 py-2 text-xs text-white placeholder-slate-500 focus:border-indigo-500 focus:outline-none"
                  />
                </div>
              ))}
            </div>
          </div>
        ) : (
          <p className="text-xs text-slate-400">
            This template is ready to use right away. You can review the preview below.
          </p>
        )}

        {/* Live Preview Box */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Live Output Preview</span>
            <span className="text-indigo-400 font-medium">Ready to send</span>
          </div>
          <div className="rounded-xl border border-indigo-500/30 bg-slate-950 p-4 text-sm text-slate-200 leading-relaxed whitespace-pre-line shadow-inner selection:bg-indigo-500/40">
            {personalizedText}
          </div>
        </div>

        {/* Modal Actions */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            onClick={onClose}
            className="rounded-xl px-4 py-2 text-xs font-semibold text-slate-300 hover:bg-slate-800 transition-colors"
          >
            Close
          </button>
          <button
            onClick={handleCopy}
            className={`flex items-center gap-1.5 rounded-xl px-5 py-2 text-xs font-semibold text-white transition-all shadow-md ${
              copied ? 'bg-emerald-600' : 'bg-indigo-600 hover:bg-indigo-500 shadow-indigo-600/25'
            }`}
          >
            {copied ? (
              <>
                <Check className="h-4 w-4" />
                <span>Copied to Clipboard!</span>
              </>
            ) : (
              <>
                <Copy className="h-4 w-4" />
                <span>Copy Personalized Message</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
