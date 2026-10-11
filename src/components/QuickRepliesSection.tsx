import React, { useState, useEffect } from 'react';
import { Zap, MessageSquare, ArrowRight } from 'lucide-react';
import { Template } from '../types';
import { MessageCard } from './MessageCard';

interface QuickRepliesSectionProps {
  onOpenShare: (template: Template) => void;
  onOpenPersonalize: (template: Template) => void;
}

export const QuickRepliesSection: React.FC<QuickRepliesSectionProps> = ({
  onOpenShare,
  onOpenPersonalize
}) => {
  const [quickReplies, setQuickReplies] = useState<Template[]>([]);

  useEffect(() => {
    fetch('/api/templates?isQuickReply=true&limit=6')
      .then(res => res.json())
      .then(data => {
        if (data.templates) setQuickReplies(data.templates);
      })
      .catch(err => console.error('Error fetching quick replies:', err));
  }, []);

  if (quickReplies.length === 0) return null;

  return (
    <section className="py-12 border-t border-slate-900 bg-slate-950/50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-wider mb-1.5">
              <Zap className="h-4 w-4" />
              <span>WhatsApp Business Canned Responses</span>
            </div>
            <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-white">
              Frequently Used Daily Quick Replies
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Save 2+ hours daily answering repetitive customer inquiries on WhatsApp, Instagram DMs, and Messenger.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {quickReplies.map(reply => (
            <MessageCard
              key={reply.id}
              template={reply}
              onOpenShare={onOpenShare}
              onOpenPersonalize={onOpenPersonalize}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
