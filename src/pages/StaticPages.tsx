import React, { useState } from 'react';
import { Mail, Shield, Check, FileText, Send, Sparkles } from 'lucide-react';
import { SEOHelmet } from '../components/SEOHelmet';

export const AboutPage: React.FC = () => {
  return (
    <div className="min-h-screen py-12 sm:py-16">
      <SEOHelmet
        title="About Velora AI – Next-Generation Message Intelligence"
        description="Learn about Velora AI's mission: helping humanity communicate with emotional depth, professional clarity, and effortless authentic prose."
        canonicalPath="/about"
      />
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-indigo-500/10 px-3 py-1 text-xs font-semibold text-indigo-400 border border-indigo-500/20">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Our Philosophy</span>
          </div>
          <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-white">
            About Velora AI
          </h1>
          <p className="text-sm text-slate-300 max-w-2xl mx-auto">
            We believe that the hardest part of human relationships—whether romantic, familial, or corporate—is finding the right words when stakes are high.
          </p>
        </div>

        <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6 sm:p-10 space-y-6 text-sm text-slate-300 leading-relaxed">
          <h2 className="font-display text-xl font-bold text-white">The Anti-AI Cliché Mission</h2>
          <p>
            Most generic chatbots spit out hollow, repetitive filler: "In today's fast-paced world...", "It is important to remember...", or robotic corporate phrases that feel cold and insincere.
          </p>
          <p>
            Velora AI was architected from the ground up to synthesize high-empathy, contextually authentic prose. Whether you need a tender good-night note for your spouse across time zones or a high-stakes salary negotiation email, Velora provides the precise emotional nuance you need in seconds.
          </p>

          <h2 className="font-display text-xl font-bold text-white pt-4">Massive Template Scalability</h2>
          <p>
            With 20 primary categories and over 80 curated subtopics, our system pairs algorithmic precision with human copywriting craftsmanship. No duplicates, no spam, just pristine communication ready to copy and send.
          </p>
        </div>
      </div>
    </div>
  );
};

export const ContactPage: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen py-12 sm:py-16">
      <SEOHelmet
        title="Contact Velora AI – Support, Feedback & Inquiries"
        description="Get in touch with the Velora AI team for feature requests, template suggestions, or enterprise partnerships."
        canonicalPath="/contact"
      />
      <div className="mx-auto max-w-xl px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-3">
          <h1 className="font-display text-3xl font-extrabold text-white">
            Contact Velora AI
          </h1>
          <p className="text-xs sm:text-sm text-slate-400">
            Have a question, template category request, or business proposal? We'd love to hear from you.
          </p>
        </div>

        <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6 sm:p-8 space-y-5">
          {submitted ? (
            <div className="py-10 text-center space-y-3">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/20 text-emerald-400">
                <Check className="h-6 w-6" />
              </div>
              <h2 className="text-base font-bold text-white">Message Received</h2>
              <p className="text-xs text-slate-400">
                Thank you for reaching out! Our team will get back to you shortly.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-medium text-slate-300">Name</label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={e => setForm({ ...form, name: e.target.value })}
                  placeholder="Your Name"
                  className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3 py-2 text-xs text-white placeholder-slate-500 focus:border-indigo-500 focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-medium text-slate-300">Email Address</label>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={e => setForm({ ...form, email: e.target.value })}
                  placeholder="name@example.com"
                  className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3 py-2 text-xs text-white placeholder-slate-500 focus:border-indigo-500 focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-medium text-slate-300">Your Message or Suggestion</label>
                <textarea
                  rows={4}
                  required
                  value={form.message}
                  onChange={e => setForm({ ...form, message: e.target.value })}
                  placeholder="Tell us what you need or what templates we should add..."
                  className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3 py-2 text-xs text-white placeholder-slate-500 focus:border-indigo-500 focus:outline-none resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full rounded-xl bg-indigo-600 py-2.5 text-xs font-bold text-white hover:bg-indigo-500 transition-colors shadow-lg shadow-indigo-600/20"
              >
                Send Message
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export const PrivacyPage: React.FC = () => {
  return (
    <div className="min-h-screen py-12 sm:py-16">
      <SEOHelmet
        title="Privacy Policy & Cookie Policy | Velora AI"
        description="Review Velora AI's comprehensive privacy policy, cookie disclosures, data protection practices, and third-party advertising policies in compliance with Google AdSense standards."
        canonicalPath="/privacy"
      />
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 space-y-6 text-sm text-slate-300 leading-relaxed">
        <h1 className="font-display text-3xl font-extrabold text-white mb-2">
          Privacy Policy
        </h1>
        <p className="text-xs text-slate-400">Last updated: October 2026</p>

        <h2 className="font-display text-lg font-bold text-white pt-4">1. Overview & Commitment</h2>
        <p>
          At Velora AI (accessible at velora.ai), the privacy and security of our online sellers, customers, and visitors are among our highest priorities. This Privacy Policy outlines what information we collect, how it is handled, and your choices concerning your data.
        </p>

        <h2 className="font-display text-lg font-bold text-white pt-4">2. Information We Collect</h2>
        <p>
          When you use our messaging generator, search library, or quick reply tools, we collect only the minimal data necessary to provide and optimize the service:
        </p>
        <ul className="list-disc pl-5 space-y-1.5 text-slate-400">
          <li><strong>Message Prompts:</strong> Text queries and personalization tokens you enter into the generator. These are processed in real time and are not sold or published.</li>
          <li><strong>Log and Telemetry Data:</strong> Standard server logs including anonymous IP addresses, browser types, language preferences, referring URLs, and timestamps to diagnose technical errors and mitigate denial-of-service attempts.</li>
          <li><strong>Local Browser Storage:</strong> Your personal bookmarks, custom variables, and language preferences are stored locally in your browser storage for your convenience.</li>
        </ul>

        <h2 className="font-display text-lg font-bold text-white pt-4">3. Third-Party Advertising & Cookies (Google AdSense)</h2>
        <p>
          We may display advertisements provided by Google AdSense and other trusted advertising networks:
        </p>
        <ul className="list-disc pl-5 space-y-1.5 text-slate-400">
          <li>Google, as a third-party vendor, uses cookies (including the DoubleClick DART cookie) to serve ads based on your visit to this site and other sites on the Internet.</li>
          <li>Users may opt out of personalized advertising by visiting <a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer" className="text-indigo-400 underline">Google Ads Settings</a> or through the Network Advertising Initiative at <a href="https://optout.networkadvertising.org" target="_blank" rel="noopener noreferrer" className="text-indigo-400 underline">optout.networkadvertising.org</a>.</li>
          <li>Third-party ad servers or ad networks use technology in their advertisements and links that appear on Velora AI, sent directly to your browser, automatically receiving your IP address when this occurs.</li>
        </ul>

        <h2 className="font-display text-lg font-bold text-white pt-4">4. Zero Sale of Personal Communications</h2>
        <p>
          We do NOT sell, rent, trade, or monetize your generated messages, customer names, order IDs, or WhatsApp conversation notes to data brokers, marketers, or untrusted entities.
        </p>

        <h2 className="font-display text-lg font-bold text-white pt-4">5. Children's Online Privacy (COPPA)</h2>
        <p>
          Velora AI is intended for business operators, e-commerce professionals, and general adult consumers. We do not knowingly collect personal identifiable information from children under the age of 13.
        </p>

        <h2 className="font-display text-lg font-bold text-white pt-4">6. Security & Encryption</h2>
        <p>
          All data transmission between your browser and our platform is encrypted via TLS 1.3 / HTTPS. All AI processing is executed using secure server-side isolation with rate-limited protection.
        </p>

        <h2 className="font-display text-lg font-bold text-white pt-4">7. Contacting Us</h2>
        <p>
          If you have questions, feedback, or requests regarding this Privacy Policy, please contact our data team through our <a href="/contact" className="text-indigo-400 underline">Contact Page</a>.
        </p>
      </div>
    </div>
  );
};

export const TermsPage: React.FC = () => {
  return (
    <div className="min-h-screen py-12 sm:py-16">
      <SEOHelmet
        title="Terms of Service | Velora AI"
        description="Terms of Service for accessing and using the Velora AI message generation platform and templates library."
        canonicalPath="/terms"
      />
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 space-y-6 text-sm text-slate-300 leading-relaxed">
        <h1 className="font-display text-3xl font-extrabold text-white mb-6">
          Terms of Service
        </h1>
        <p className="text-xs text-slate-400">Effective Date: October 2026</p>

        <h2 className="font-display text-lg font-bold text-white pt-4">1. Acceptance of Terms</h2>
        <p>
          By accessing or using Velora AI, you agree to be bound by these Terms. If you disagree with any part, you may discontinue use of the platform.
        </p>

        <h2 className="font-display text-lg font-bold text-white pt-4">2. Permitted Use</h2>
        <p>
          You are granted a worldwide, royalty-free license to copy, adapt, customize, and transmit messages generated by Velora AI for personal, commercial, or professional communications.
        </p>

        <h2 className="font-display text-lg font-bold text-white pt-4">3. Acceptable Use Policy</h2>
        <p>
          You agree not to use Velora AI to generate hateful, harassing, defamatory, or unlawful content, spam distribution campaigns, or deceptive impersonation.
        </p>
      </div>
    </div>
  );
};
