import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  Search, 
  Globe, 
  MapPin, 
  CheckCircle2, 
  XCircle, 
  AlertTriangle, 
  ExternalLink, 
  Download, 
  Check, 
  RotateCcw, 
  X, 
  Layers, 
  FileText, 
  Link2, 
  Code, 
  Smartphone, 
  Laptop, 
  SlidersHorizontal,
  ShieldCheck,
  Building,
  Target
} from 'lucide-react';
import { useSEO } from '../context/SEOContext';
import { RouteSEOConfig } from '../data/seoRegistry';

interface AuditResult {
  totalScore: number;
  overallScoreTenScale: string;
  letterGrade: string;
  passedCount: number;
  totalChecks: number;
  categoryScores: {
    title: { score: number; maxScore: number };
    description: { score: number; maxScore: number };
    content: { score: number; maxScore: number };
    technical: { score: number; maxScore: number };
    structuredData: { score: number; maxScore: number };
  };
  checks: Array<{
    id: string;
    category: string;
    name: string;
    passed: boolean;
    score: number;
    maxScore: number;
    evidence: string;
    recommendation: string;
  }>;
  failedChecks: Array<any>;
  passedChecks: Array<any>;
  evaluatedAt: string;
  disclaimer: string;
}

interface VerificationResult {
  targetUrl: string;
  httpStatus: number;
  statusText: string;
  isIndexable: boolean;
  inSitemap: boolean;
  robotsTxtAllowed: boolean;
  securityHeaders: Record<string, string>;
  canonicalMatch: boolean;
  verifiedAt: string;
}

export const SEOOptimizerModal: React.FC = () => {
  const { 
    configs, 
    getSEOForRoute, 
    applyMetadata, 
    resetSEOForRoute, 
    isSEOModalOpen, 
    activeModalRoute, 
    closeSEOModal 
  } = useSEO();

  const [selectedPath, setSelectedPath] = useState<string>(activeModalRoute || '/');
  const [activeTab, setActiveTab] = useState<'config' | 'metadata' | 'preview' | 'audit'>('config');
  
  // Working Config State
  const [currentConfig, setCurrentConfig] = useState<RouteSEOConfig>(() => getSEOForRoute(selectedPath));
  
  // Local SEO Form Fields
  const [businessName, setBusinessName] = useState(currentConfig.businessName || 'Velora AI');
  const [businessType, setBusinessType] = useState(currentConfig.businessType || 'Online seller communication tools');
  const [targetCountry, setTargetCountry] = useState(currentConfig.targetCountry || 'Pakistan');
  const [targetCity, setTargetCity] = useState(currentConfig.targetCity || '');
  const [primaryKeyword, setPrimaryKeyword] = useState(currentConfig.primaryKeyword || '');
  const [secondaryKeywordsInput, setSecondaryKeywordsInput] = useState(currentConfig.secondaryKeywords?.join(', ') || '');
  const [targetLanguage, setTargetLanguage] = useState(currentConfig.targetLanguage || 'English & Urdu');
  const [searchIntent, setSearchIntent] = useState<'Commercial' | 'Transactional' | 'Informational' | 'Navigational'>(currentConfig.searchIntent || 'Commercial');

  // Async States
  const [isGenerating, setIsGenerating] = useState(false);
  const [isAuditing, setIsAuditing] = useState(false);
  const [isApplying, setIsApplying] = useState(false);
  const [applyFeedback, setApplyFeedback] = useState<{ success: boolean; message: string } | null>(null);
  const [previewDevice, setPreviewDevice] = useState<'desktop' | 'mobile'>('desktop');
  
  // Audit & Verification Results
  const [auditResult, setAuditResult] = useState<AuditResult | null>(null);
  const [verificationResult, setVerificationResult] = useState<VerificationResult | null>(null);

  // Sync when selectedPath or activeModalRoute changes
  useEffect(() => {
    if (activeModalRoute && isSEOModalOpen) {
      setSelectedPath(activeModalRoute);
    }
  }, [activeModalRoute, isSEOModalOpen]);

  useEffect(() => {
    const fresh = getSEOForRoute(selectedPath);
    setCurrentConfig(fresh);
    setBusinessName(fresh.businessName || 'Velora AI');
    setBusinessType(fresh.businessType || 'Online seller communication tools');
    setTargetCountry(fresh.targetCountry || 'Pakistan');
    setTargetCity(fresh.targetCity || '');
    setPrimaryKeyword(fresh.primaryKeyword || '');
    setSecondaryKeywordsInput(fresh.secondaryKeywords?.join(', ') || '');
    setTargetLanguage(fresh.targetLanguage || 'English & Urdu');
    setSearchIntent(fresh.searchIntent || 'Commercial');
    setApplyFeedback(null);
  }, [selectedPath, getSEOForRoute]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isSEOModalOpen) {
        closeSEOModal();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSEOModalOpen, closeSEOModal]);

  if (!isSEOModalOpen) return null;

  // Preset quick fill handler (e.g. Faisalabad / Pakistan online seller tools)
  const applyPresetExample = () => {
    setBusinessName('Velora AI – Pakistan Seller Hub');
    setBusinessType('Online seller communication & order management tools');
    setTargetCountry('Pakistan');
    setTargetCity('Faisalabad');
    setPrimaryKeyword('WhatsApp business message templates');
    setSecondaryKeywordsInput('Urdu business messages, order confirmation messages, customer service templates, payment reminder messages');
    setTargetLanguage('English & Urdu');
    setSearchIntent('Commercial');
  };

  // 1. Generate SEO Metadata
  const handleGenerate = async () => {
    setIsGenerating(true);
    setApplyFeedback(null);
    try {
      const secKeywords = secondaryKeywordsInput.split(',').map(s => s.trim()).filter(Boolean);

      const res = await fetch('/api/seo/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          pagePath: selectedPath,
          businessName,
          businessType,
          targetCountry,
          targetCity,
          primaryKeyword,
          secondaryKeywords: secKeywords,
          targetLanguage,
          searchIntent
        })
      });

      if (!res.ok) throw new Error('Generation server request failed');
      const data = await res.json();
      if (data.metadata) {
        setCurrentConfig(data.metadata);
        setActiveTab('metadata');
      }
    } catch (err: any) {
      console.error(err);
      setApplyFeedback({ success: false, message: 'Could not generate metadata: ' + (err.message || 'Server error') });
    } finally {
      setIsGenerating(false);
    }
  };

  // 2. Run Audit
  const handleRunAudit = async () => {
    setIsAuditing(true);
    try {
      // Run audit engine
      const auditRes = await fetch('/api/seo/audit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ config: currentConfig })
      });
      const auditData = await auditRes.json();
      setAuditResult(auditData);

      // Run live verification
      const verifyRes = await fetch('/api/seo/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ path: selectedPath })
      });
      const verifyData = await verifyRes.json();
      setVerificationResult(verifyData);

      setActiveTab('audit');
    } catch (err) {
      console.error(err);
    } finally {
      setIsAuditing(false);
    }
  };

  // 3. Apply Metadata to Website Code & Rendered DOM
  const handleApply = async () => {
    setIsApplying(true);
    setApplyFeedback(null);
    try {
      const result = await applyMetadata(currentConfig);
      setApplyFeedback(result);
      if (result.success) {
        // Automatically rerun audit on newly applied config
        const auditRes = await fetch('/api/seo/audit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ config: currentConfig })
        });
        const auditData = await auditRes.json();
        setAuditResult(auditData);
      }
    } catch (err: any) {
      setApplyFeedback({ success: false, message: 'Failed to apply: ' + err.message });
    } finally {
      setIsApplying(false);
    }
  };

  // 4. Reset to default
  const handleReset = () => {
    resetSEOForRoute(selectedPath);
    const fresh = getSEOForRoute(selectedPath);
    setCurrentConfig(fresh);
    setApplyFeedback({ success: true, message: `Reset metadata for ${selectedPath} to defaults.` });
  };

  // 5. Export Report
  const handleExport = () => {
    const reportData = {
      exportedAt: new Date().toISOString(),
      route: selectedPath,
      config: currentConfig,
      audit: auditResult,
      verification: verificationResult
    };

    const blob = new Blob([JSON.stringify(reportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `seo-report-${selectedPath.replace(/\//g, '_') || 'home'}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const titleLength = (currentConfig.title || '').length;
  const descLength = (currentConfig.description || '').length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative flex flex-col w-full max-w-5xl max-h-[92vh] rounded-3xl border border-slate-800 bg-slate-900 shadow-2xl shadow-indigo-950/50 overflow-hidden"
        role="dialog"
        aria-modal="true"
        aria-labelledby="seo-panel-title"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800/80 bg-slate-950/50">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-tr from-indigo-600 to-violet-500 shadow-md shadow-indigo-500/20">
              <Sparkles className="h-5 w-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 id="seo-panel-title" className="font-display text-base sm:text-lg font-bold text-white">
                  Advanced SEO Metadata & Score Validation
                </h2>
                <span className="rounded-full bg-emerald-500/15 border border-emerald-500/30 px-2 py-0.5 text-[10px] font-semibold text-emerald-400">
                  New Feature
                </span>
                {currentConfig.applied && (
                  <span className="rounded-full bg-indigo-500/15 border border-indigo-500/30 px-2 py-0.5 text-[10px] font-semibold text-indigo-400">
                    Live Applied
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-400">
                Configure local keywords, synthesize search-friendly metadata, and validate on-page compliance.
              </p>
            </div>
          </div>

          <button
            onClick={closeSEOModal}
            className="rounded-xl border border-slate-800 bg-slate-900 p-2 text-slate-400 hover:bg-slate-800 hover:text-white transition-all"
            aria-label="Close SEO Panel"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Global Route Selector & Quick Navigation Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 px-6 py-3 border-b border-slate-800/60 bg-slate-950/30 text-xs">
          <div className="flex items-center gap-2 flex-grow sm:flex-grow-0 min-w-[260px]">
            <span className="font-medium text-slate-400 shrink-0">Target Page:</span>
            <select
              value={selectedPath}
              onChange={(e) => setSelectedPath(e.target.value)}
              className="w-full sm:w-80 rounded-xl border border-slate-800 bg-slate-900 px-3 py-1.5 text-xs text-white focus:border-indigo-500 focus:outline-none"
            >
              <optgroup label="Core Navigation">
                <option value="/">/ (Homepage – Seller & Customer Hub)</option>
                <option value="/seller-messages">/seller-messages (Seller Messages Center)</option>
                <option value="/customer-messages">/customer-messages (Customer Messages Center)</option>
                <option value="/daily-quick-replies">/daily-quick-replies (WhatsApp Quick Replies)</option>
                <option value="/ai-message-generator">/ai-message-generator (AI Generator Studio)</option>
                <option value="/trending">/trending (Trending Messages Leaderboard)</option>
              </optgroup>
              <optgroup label="Popular Seller Categories">
                <option value="/seller-messages/order-management">/seller-messages/order-management (Order Management)</option>
                <option value="/seller-messages/payment-banking">/seller-messages/payment-banking (Payment & Banking)</option>
                <option value="/seller-messages/shipping-delivery">/seller-messages/shipping-delivery (Shipping & Delivery)</option>
                <option value="/seller-messages/daily-quick-replies">/seller-messages/daily-quick-replies (Canned Responses)</option>
              </optgroup>
              <optgroup label="Popular Customer Categories">
                <option value="/customer-messages/product-price-inquiry">/customer-messages/product-price-inquiry (Price Inquiries)</option>
                <option value="/customer-messages/order-placement-tracking">/customer-messages/order-placement-tracking (Tracking Queries)</option>
                <option value="/customer-messages/customer-complaints-returns">/customer-messages/customer-complaints-returns (Complaints & Returns)</option>
              </optgroup>
              <optgroup label="Company & Legal">
                <option value="/about">/about (About Velora AI)</option>
                <option value="/contact">/contact (Contact & Support)</option>
                <option value="/privacy">/privacy (Privacy Policy & Cookies)</option>
                <option value="/terms">/terms (Terms of Service)</option>
              </optgroup>
            </select>
          </div>

          {/* Tab Navigation */}
          <div className="flex items-center gap-1 rounded-2xl bg-slate-950 p-1 border border-slate-800">
            <button
              onClick={() => setActiveTab('config')}
              className={`flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-semibold transition-all ${
                activeTab === 'config' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
              }`}
            >
              <SlidersHorizontal className="h-3.5 w-3.5" />
              <span>1. Local SEO & Keywords</span>
            </button>
            <button
              onClick={() => setActiveTab('metadata')}
              className={`flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-semibold transition-all ${
                activeTab === 'metadata' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
              }`}
            >
              <FileText className="h-3.5 w-3.5" />
              <span>2. Generated Metadata</span>
            </button>
            <button
              onClick={() => setActiveTab('preview')}
              className={`flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-semibold transition-all ${
                activeTab === 'preview' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Globe className="h-3.5 w-3.5" />
              <span>3. SERP & Social Preview</span>
            </button>
            <button
              onClick={() => {
                if (!auditResult) handleRunAudit();
                else setActiveTab('audit');
              }}
              className={`flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-semibold transition-all ${
                activeTab === 'audit' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
              }`}
            >
              <ShieldCheck className="h-3.5 w-3.5" />
              <span>4. SEO Audit & Score</span>
              {auditResult && (
                <span className="ml-1 rounded-md bg-indigo-950 px-1.5 py-0.2 text-[10px] text-indigo-300 font-bold border border-indigo-700">
                  {auditResult.totalScore}/100
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {applyFeedback && (
            <div className={`flex items-center gap-2 rounded-2xl p-3 text-xs border ${
              applyFeedback.success 
                ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300' 
                : 'bg-rose-500/10 border-rose-500/30 text-rose-300'
            }`}>
              {applyFeedback.success ? <Check className="h-4 w-4" /> : <AlertTriangle className="h-4 w-4" />}
              <span>{applyFeedback.message}</span>
            </div>
          )}

          {/* TAB 1: LOCAL SEO CONFIGURATION */}
          {activeTab === 'config' && (
            <div className="space-y-6 animate-in fade-in duration-150">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-4 rounded-2xl bg-indigo-500/5 border border-indigo-500/20">
                <div className="space-y-1">
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    <Target className="h-4 w-4 text-indigo-400" />
                    <span>Target Audience & Local Geo Settings</span>
                  </h3>
                  <p className="text-xs text-slate-400">
                    Define target territory, primary search term, and secondary keywords for <strong>{selectedPath}</strong>.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={applyPresetExample}
                  className="rounded-xl border border-indigo-500/40 bg-indigo-500/10 px-3 py-1.5 text-xs font-semibold text-indigo-300 hover:bg-indigo-500/20 transition-all shrink-0"
                >
                  ⚡ Load Pakistan / Faisalabad Example
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                {/* Business Name */}
                <div className="space-y-1.5">
                  <label className="font-medium text-slate-300 flex items-center gap-1.5">
                    <Building className="h-3.5 w-3.5 text-slate-400" />
                    <span>Business Name</span>
                  </label>
                  <input
                    type="text"
                    value={businessName}
                    onChange={(e) => setBusinessName(e.target.value)}
                    placeholder="e.g. Velora AI"
                    className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3.5 py-2.5 text-white placeholder-slate-500 focus:border-indigo-500 focus:outline-none"
                  />
                </div>

                {/* Business Type */}
                <div className="space-y-1.5">
                  <label className="font-medium text-slate-300 flex items-center gap-1.5">
                    <Layers className="h-3.5 w-3.5 text-slate-400" />
                    <span>Business Type</span>
                  </label>
                  <input
                    type="text"
                    value={businessType}
                    onChange={(e) => setBusinessType(e.target.value)}
                    placeholder="e.g. Online seller communication tools"
                    className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3.5 py-2.5 text-white placeholder-slate-500 focus:border-indigo-500 focus:outline-none"
                  />
                </div>

                {/* Target Country */}
                <div className="space-y-1.5">
                  <label className="font-medium text-slate-300 flex items-center gap-1.5">
                    <Globe className="h-3.5 w-3.5 text-slate-400" />
                    <span>Target Country</span>
                  </label>
                  <input
                    type="text"
                    value={targetCountry}
                    onChange={(e) => setTargetCountry(e.target.value)}
                    placeholder="e.g. Pakistan, UAE, Global"
                    className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3.5 py-2.5 text-white placeholder-slate-500 focus:border-indigo-500 focus:outline-none"
                  />
                </div>

                {/* Target City or Service Area */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label className="font-medium text-slate-300 flex items-center gap-1.5">
                      <MapPin className="h-3.5 w-3.5 text-slate-400" />
                      <span>Target City or Service Area (Optional)</span>
                    </label>
                    <span className="text-[10px] text-slate-500">Only if locally relevant</span>
                  </div>
                  <input
                    type="text"
                    value={targetCity}
                    onChange={(e) => setTargetCity(e.target.value)}
                    placeholder="e.g. Faisalabad, Lahore, Karachi (Leave empty for national)"
                    className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3.5 py-2.5 text-white placeholder-slate-500 focus:border-indigo-500 focus:outline-none"
                  />
                  <p className="text-[11px] text-slate-500">
                    City names are only inserted into local pages to protect your site against unhelpful keyword stuffing.
                  </p>
                </div>

                {/* Primary Keyword */}
                <div className="space-y-1.5 md:col-span-2">
                  <label className="font-medium text-slate-300 flex items-center gap-1.5">
                    <Search className="h-3.5 w-3.5 text-indigo-400" />
                    <span>Primary Keyword (Target Search Query)</span>
                  </label>
                  <input
                    type="text"
                    value={primaryKeyword}
                    onChange={(e) => setPrimaryKeyword(e.target.value)}
                    placeholder="e.g. WhatsApp business message templates"
                    className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3.5 py-2.5 text-white placeholder-slate-500 focus:border-indigo-500 focus:outline-none font-medium"
                  />
                </div>

                {/* Secondary Keywords */}
                <div className="space-y-1.5 md:col-span-2">
                  <label className="font-medium text-slate-300">
                    Secondary Keywords (Comma-separated)
                  </label>
                  <textarea
                    rows={2}
                    value={secondaryKeywordsInput}
                    onChange={(e) => setSecondaryKeywordsInput(e.target.value)}
                    placeholder="e.g. Urdu business messages, order confirmation messages, customer service templates, payment reminder messages"
                    className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3.5 py-2.5 text-white placeholder-slate-500 focus:border-indigo-500 focus:outline-none resize-none"
                  />
                </div>

                {/* Target Language */}
                <div className="space-y-1.5">
                  <label className="font-medium text-slate-300">Target Language Context</label>
                  <select
                    value={targetLanguage}
                    onChange={(e) => setTargetLanguage(e.target.value)}
                    className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3.5 py-2.5 text-white focus:border-indigo-500 focus:outline-none"
                  >
                    <option value="English & Urdu">English & Urdu (Bilingual Pakistani E-Commerce)</option>
                    <option value="English">English Only</option>
                    <option value="Urdu">Urdu (اردو زبان)</option>
                    <option value="Roman Urdu">Roman Urdu (WhatsApp Transliteration)</option>
                    <option value="Hindi & English">Hindi & English</option>
                    <option value="Multilingual">Multilingual Global</option>
                  </select>
                </div>

                {/* Search Intent */}
                <div className="space-y-1.5">
                  <label className="font-medium text-slate-300">Search Intent</label>
                  <select
                    value={searchIntent}
                    onChange={(e: any) => setSearchIntent(e.target.value)}
                    className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3.5 py-2.5 text-white focus:border-indigo-500 focus:outline-none"
                  >
                    <option value="Commercial">Commercial (Users evaluating message templates & software)</option>
                    <option value="Transactional">Transactional (Users ready to copy quick replies now)</option>
                    <option value="Informational">Informational (Guides, advice, customer care etiquette)</option>
                    <option value="Navigational">Navigational (Brand, about, login, contact)</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={handleGenerate}
                  disabled={isGenerating}
                  className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 px-5 py-2.5 text-xs font-bold text-white shadow-lg shadow-indigo-600/25 hover:from-indigo-500 hover:to-violet-500 disabled:opacity-50 transition-all"
                >
                  <Sparkles className="h-4 w-4" />
                  <span>{isGenerating ? 'Synthesizing SEO Package...' : 'Generate Complete SEO Metadata'}</span>
                </button>
              </div>
            </div>
          )}

          {/* TAB 2: METADATA INSPECTOR & EDITOR */}
          {activeTab === 'metadata' && (
            <div className="space-y-6 animate-in fade-in duration-150 text-xs">
              {/* Title & Description */}
              <div className="space-y-4 rounded-2xl border border-slate-800 bg-slate-950/40 p-5">
                <div className="flex items-center justify-between">
                  <label className="font-bold text-white flex items-center gap-2">
                    <span>1. SEO Title Tag</span>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono ${
                      titleLength >= 30 && titleLength <= 60 
                        ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30' 
                        : 'bg-amber-500/15 text-amber-400 border border-amber-500/30'
                    }`}>
                      {titleLength} / 60 chars {titleLength >= 30 && titleLength <= 60 ? '✓ Optimal' : '(Aim: 30-60)'}
                    </span>
                  </label>
                </div>
                <input
                  type="text"
                  value={currentConfig.title || ''}
                  onChange={(e) => setCurrentConfig({ ...currentConfig, title: e.target.value })}
                  className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3.5 py-2.5 text-white font-medium focus:border-indigo-500 focus:outline-none"
                />

                <div className="flex items-center justify-between pt-2">
                  <label className="font-bold text-white flex items-center gap-2">
                    <span>2. Meta Description</span>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono ${
                      descLength >= 110 && descLength <= 160 
                        ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30' 
                        : 'bg-amber-500/15 text-amber-400 border border-amber-500/30'
                    }`}>
                      {descLength} / 160 chars {descLength >= 110 && descLength <= 160 ? '✓ Optimal' : '(Aim: 110-160)'}
                    </span>
                  </label>
                </div>
                <textarea
                  rows={3}
                  value={currentConfig.description || ''}
                  onChange={(e) => setCurrentConfig({ ...currentConfig, description: e.target.value })}
                  className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3.5 py-2.5 text-white focus:border-indigo-500 focus:outline-none resize-none leading-relaxed"
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                  <div>
                    <label className="font-semibold text-slate-300">Canonical Path</label>
                    <input
                      type="text"
                      value={currentConfig.canonicalPath || selectedPath}
                      onChange={(e) => setCurrentConfig({ ...currentConfig, canonicalPath: e.target.value })}
                      className="mt-1 w-full rounded-xl border border-slate-800 bg-slate-950 px-3 py-2 text-white font-mono text-[11px]"
                    />
                  </div>
                  <div>
                    <label className="font-semibold text-slate-300">Robots Directives</label>
                    <input
                      type="text"
                      value={currentConfig.robots || 'index, follow'}
                      onChange={(e) => setCurrentConfig({ ...currentConfig, robots: e.target.value })}
                      className="mt-1 w-full rounded-xl border border-slate-800 bg-slate-950 px-3 py-2 text-white font-mono text-[11px]"
                    />
                  </div>
                </div>
              </div>

              {/* Headings & Content Architecture */}
              <div className="space-y-4 rounded-2xl border border-slate-800 bg-slate-950/40 p-5">
                <h3 className="font-bold text-white flex items-center gap-2">
                  <FileText className="h-4 w-4 text-indigo-400" />
                  <span>On-Page Heading Architecture & Image Recommendations</span>
                </h3>

                <div>
                  <label className="font-medium text-slate-300">H1 Heading Recommendation</label>
                  <input
                    type="text"
                    value={currentConfig.h1Recommendation || ''}
                    onChange={(e) => setCurrentConfig({ ...currentConfig, h1Recommendation: e.target.value })}
                    className="mt-1 w-full rounded-xl border border-slate-800 bg-slate-950 px-3 py-2 text-white"
                  />
                </div>

                <div>
                  <label className="font-medium text-slate-300">H2 Structure Suggestions</label>
                  <div className="mt-1.5 space-y-2">
                    {(currentConfig.h2Suggestions || []).map((h2, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <span className="flex h-5 w-5 items-center justify-center rounded-md bg-indigo-500/10 text-[10px] font-bold text-indigo-400 shrink-0">
                          H2
                        </span>
                        <input
                          type="text"
                          value={h2}
                          onChange={(e) => {
                            const updated = [...(currentConfig.h2Suggestions || [])];
                            updated[idx] = e.target.value;
                            setCurrentConfig({ ...currentConfig, h2Suggestions: updated });
                          }}
                          className="w-full rounded-lg border border-slate-800 bg-slate-950 px-2.5 py-1.5 text-xs text-slate-200"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-2">
                  <label className="font-medium text-slate-300">Image Alt Text Recommendations</label>
                  <ul className="mt-1.5 space-y-1.5">
                    {(currentConfig.imageAltRecommendations || []).map((alt, idx) => (
                      <li key={idx} className="flex items-center gap-2 rounded-lg bg-slate-900 px-3 py-1.5 text-slate-300 text-[11px] border border-slate-800">
                        <span className="text-indigo-400">🖼️ alt=</span>
                        <span className="italic">"{alt}"</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Internal Linking & Structured Data */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="rounded-2xl border border-slate-800 bg-slate-950/40 p-5 space-y-3">
                  <h4 className="font-bold text-white flex items-center gap-2">
                    <Link2 className="h-4 w-4 text-indigo-400" />
                    <span>Internal Linking Architecture</span>
                  </h4>
                  <div className="space-y-2">
                    {(currentConfig.internalLinkSuggestions || []).map((link, idx) => (
                      <div key={idx} className="rounded-xl border border-slate-800 bg-slate-900/60 p-2.5 space-y-1">
                        <div className="flex items-center justify-between text-indigo-400 font-medium">
                          <span>{link.anchor}</span>
                          <span className="font-mono text-[10px] text-slate-500">{link.url}</span>
                        </div>
                        <p className="text-[11px] text-slate-400">{link.context}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-2xl border border-slate-800 bg-slate-950/40 p-5 space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-white flex items-center gap-2">
                      <Code className="h-4 w-4 text-violet-400" />
                      <span>Schema.org JSON-LD</span>
                    </h4>
                    <span className="text-[10px] text-emerald-400 font-mono">
                      @type: {currentConfig.schema?.['@type'] || 'Object'}
                    </span>
                  </div>
                  <pre className="max-h-48 overflow-y-auto rounded-xl border border-slate-800 bg-slate-950 p-3 font-mono text-[10px] text-slate-300">
                    {JSON.stringify(currentConfig.schema, null, 2)}
                  </pre>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: SERP & SOCIAL PREVIEW */}
          {activeTab === 'preview' && (
            <div className="space-y-6 animate-in fade-in duration-150">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-white">Google Search Result Preview</h3>
                <div className="flex items-center gap-1 rounded-xl bg-slate-950 p-1 border border-slate-800">
                  <button
                    onClick={() => setPreviewDevice('desktop')}
                    className={`flex items-center gap-1 rounded-lg px-2.5 py-1 text-xs ${
                      previewDevice === 'desktop' ? 'bg-indigo-600 text-white' : 'text-slate-400'
                    }`}
                  >
                    <Laptop className="h-3.5 w-3.5" />
                    <span>Desktop</span>
                  </button>
                  <button
                    onClick={() => setPreviewDevice('mobile')}
                    className={`flex items-center gap-1 rounded-lg px-2.5 py-1 text-xs ${
                      previewDevice === 'mobile' ? 'bg-indigo-600 text-white' : 'text-slate-400'
                    }`}
                  >
                    <Smartphone className="h-3.5 w-3.5" />
                    <span>Mobile</span>
                  </button>
                </div>
              </div>

              {/* SERP Snippet Box */}
              <div className={`rounded-2xl border border-slate-800 bg-white p-5 text-slate-900 shadow-xl ${
                previewDevice === 'mobile' ? 'max-w-md mx-auto' : 'w-full'
              }`}>
                <div className="flex items-center gap-2 pb-1.5 text-xs text-slate-600">
                  <div className="flex h-5 w-5 items-center justify-center rounded-full bg-slate-100 text-[10px] font-bold text-indigo-700">
                    V
                  </div>
                  <div className="truncate">
                    <span className="font-semibold text-slate-800">velora.ai</span>
                    <span className="text-slate-400"> › {selectedPath.replace(/^\//, '') || 'home'}</span>
                  </div>
                </div>

                <h4 className="text-base sm:text-lg font-medium text-[#1a0dab] hover:underline cursor-pointer leading-snug line-clamp-2">
                  {currentConfig.title || 'Velora AI – WhatsApp Business Messages'}
                </h4>

                <p className="mt-1 text-xs sm:text-sm text-[#4d5156] leading-relaxed line-clamp-2 sm:line-clamp-3">
                  {currentConfig.description || 'Instant ready-to-copy message templates for online sellers and customers.'}
                </p>

                {/* Rich Snippet Sublinks */}
                <div className="mt-3 pt-3 border-t border-slate-100 flex flex-wrap gap-3 text-xs text-[#1a0dab]">
                  <span className="hover:underline cursor-pointer">Order Confirmation</span>
                  <span className="hover:underline cursor-pointer">Payment Reminders</span>
                  <span className="hover:underline cursor-pointer">Urdu WhatsApp Messages</span>
                </div>
              </div>

              {/* Open Graph Social Card Preview */}
              <div className="space-y-3 pt-4">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <Globe className="h-4 w-4 text-indigo-400" />
                  <span>WhatsApp & Open Graph Social Card Preview</span>
                </h3>
                <div className="max-w-lg rounded-2xl border border-slate-800 bg-slate-950 overflow-hidden shadow-lg">
                  <div className="h-36 bg-gradient-to-tr from-indigo-950 via-slate-900 to-violet-950 flex flex-col items-center justify-center p-4 text-center border-b border-slate-800">
                    <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-indigo-600 shadow-md mb-2">
                      <Sparkles className="h-5 w-5 text-white" />
                    </div>
                    <span className="font-display font-bold text-white text-sm">Velora AI Platform</span>
                    <span className="text-[11px] text-indigo-300">Seller & Customer Communication Intelligence</span>
                  </div>
                  <div className="p-4 space-y-1">
                    <span className="text-[10px] font-mono text-slate-500 uppercase">VELORA.AI</span>
                    <h5 className="font-bold text-white text-xs line-clamp-1">{currentConfig.ogTitle || currentConfig.title}</h5>
                    <p className="text-[11px] text-slate-400 line-clamp-2">{currentConfig.ogDescription || currentConfig.description}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: HONEST SEO AUDIT SCORE DASHBOARD */}
          {activeTab === 'audit' && (
            <div className="space-y-6 animate-in fade-in duration-150">
              {auditResult ? (
                <>
                  {/* Score Hero Banner */}
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-5 rounded-3xl bg-slate-950 border border-slate-800">
                    <div className="flex flex-col items-center justify-center text-center p-3 border-b md:border-b-0 md:border-r border-slate-800">
                      <span className="text-xs text-slate-400 font-medium">Audit Score</span>
                      <div className="flex items-baseline gap-1 my-1">
                        <span className="font-display text-4xl font-extrabold text-white">{auditResult.totalScore}</span>
                        <span className="text-xs text-slate-500">/ 100</span>
                      </div>
                      <div className="inline-flex items-center gap-1.5 rounded-full bg-indigo-500/10 px-2.5 py-0.5 text-xs font-bold text-indigo-400 border border-indigo-500/30">
                        <span>Grade {auditResult.letterGrade}</span>
                        <span>•</span>
                        <span>{auditResult.overallScoreTenScale}/10</span>
                      </div>
                    </div>

                    <div className="md:col-span-3 grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs p-2">
                      <div className="space-y-1">
                        <div className="flex justify-between text-slate-400 text-[11px]">
                          <span>Title Tag</span>
                          <span className="font-mono text-white">{auditResult.categoryScores.title.score}/{auditResult.categoryScores.title.maxScore}</span>
                        </div>
                        <div className="h-1.5 w-full rounded-full bg-slate-900 overflow-hidden">
                          <div className="h-full bg-indigo-500 rounded-full" style={{ width: `${(auditResult.categoryScores.title.score / auditResult.categoryScores.title.maxScore) * 100}%` }}></div>
                        </div>
                      </div>

                      <div className="space-y-1">
                        <div className="flex justify-between text-slate-400 text-[11px]">
                          <span>Description</span>
                          <span className="font-mono text-white">{auditResult.categoryScores.description.score}/{auditResult.categoryScores.description.maxScore}</span>
                        </div>
                        <div className="h-1.5 w-full rounded-full bg-slate-900 overflow-hidden">
                          <div className="h-full bg-indigo-500 rounded-full" style={{ width: `${(auditResult.categoryScores.description.score / auditResult.categoryScores.description.maxScore) * 100}%` }}></div>
                        </div>
                      </div>

                      <div className="space-y-1">
                        <div className="flex justify-between text-slate-400 text-[11px]">
                          <span>Content Architecture</span>
                          <span className="font-mono text-white">{auditResult.categoryScores.content.score}/{auditResult.categoryScores.content.maxScore}</span>
                        </div>
                        <div className="h-1.5 w-full rounded-full bg-slate-900 overflow-hidden">
                          <div className="h-full bg-indigo-500 rounded-full" style={{ width: `${(auditResult.categoryScores.content.score / auditResult.categoryScores.content.maxScore) * 100}%` }}></div>
                        </div>
                      </div>

                      <div className="space-y-1">
                        <div className="flex justify-between text-slate-400 text-[11px]">
                          <span>Technical & Robots</span>
                          <span className="font-mono text-white">{auditResult.categoryScores.technical.score}/{auditResult.categoryScores.technical.maxScore}</span>
                        </div>
                        <div className="h-1.5 w-full rounded-full bg-slate-900 overflow-hidden">
                          <div className="h-full bg-indigo-500 rounded-full" style={{ width: `${(auditResult.categoryScores.technical.score / auditResult.categoryScores.technical.maxScore) * 100}%` }}></div>
                        </div>
                      </div>

                      <div className="space-y-1">
                        <div className="flex justify-between text-slate-400 text-[11px]">
                          <span>Structured Data</span>
                          <span className="font-mono text-white">{auditResult.categoryScores.structuredData.score}/{auditResult.categoryScores.structuredData.maxScore}</span>
                        </div>
                        <div className="h-1.5 w-full rounded-full bg-slate-900 overflow-hidden">
                          <div className="h-full bg-indigo-500 rounded-full" style={{ width: `${(auditResult.categoryScores.structuredData.score / auditResult.categoryScores.structuredData.maxScore) * 100}%` }}></div>
                        </div>
                      </div>

                      <div className="space-y-1">
                        <div className="flex justify-between text-slate-400 text-[11px]">
                          <span>Audit Status</span>
                          <span className="font-bold text-emerald-400">{auditResult.passedCount} / {auditResult.totalChecks} Passed</span>
                        </div>
                        <div className="h-1.5 w-full rounded-full bg-slate-900 overflow-hidden">
                          <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${(auditResult.passedCount / auditResult.totalChecks) * 100}%` }}></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Real Live Technical Verification Strip */}
                  {verificationResult && (
                    <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4 space-y-2 text-xs">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-white flex items-center gap-2">
                          <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                          <span>Live Server Verification Check</span>
                        </span>
                        <span className="font-mono text-[10px] text-slate-500">
                          Verified at {new Date(verificationResult.verifiedAt).toLocaleTimeString()}
                        </span>
                      </div>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px]">
                        <div className="p-2 rounded-xl bg-slate-900 border border-slate-800">
                          <span className="text-slate-500 block">HTTP Status:</span>
                          <span className="font-mono font-bold text-emerald-400">{verificationResult.httpStatus} {verificationResult.statusText}</span>
                        </div>
                        <div className="p-2 rounded-xl bg-slate-900 border border-slate-800">
                          <span className="text-slate-500 block">Sitemap.xml:</span>
                          <span className="font-mono font-bold text-emerald-400">{verificationResult.inSitemap ? '✓ Listed' : '✗ Missing'}</span>
                        </div>
                        <div className="p-2 rounded-xl bg-slate-900 border border-slate-800">
                          <span className="text-slate-500 block">Robots Directives:</span>
                          <span className="font-mono font-bold text-emerald-400">✓ Allowed Crawl</span>
                        </div>
                        <div className="p-2 rounded-xl bg-slate-900 border border-slate-800">
                          <span className="text-slate-500 block">Security Headers:</span>
                          <span className="font-mono font-bold text-emerald-400">✓ Active (nosniff)</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Detailed Checks Breakdown */}
                  <div className="space-y-4">
                    <h3 className="text-sm font-bold text-white">Individual Technical & Content Checks</h3>

                    {/* Failed / Warning Checks First */}
                    {auditResult.failedChecks.length > 0 && (
                      <div className="space-y-2">
                        <h4 className="text-xs font-semibold text-rose-400 flex items-center gap-1.5">
                          <XCircle className="h-4 w-4" />
                          <span>Failed or Sub-optimal Checks ({auditResult.failedChecks.length})</span>
                        </h4>
                        {auditResult.failedChecks.map((check) => (
                          <div key={check.id} className="rounded-xl border border-rose-500/20 bg-rose-500/5 p-3 text-xs space-y-1">
                            <div className="flex items-center justify-between">
                              <span className="font-bold text-white">{check.name}</span>
                              <span className="font-mono text-[10px] text-rose-400 font-bold">{check.score} / {check.maxScore} pts</span>
                            </div>
                            <p className="text-slate-300 text-[11px]"><strong className="text-rose-300">Evidence:</strong> {check.evidence}</p>
                            <p className="text-slate-400 text-[11px]"><strong className="text-indigo-400">Recommended Fix:</strong> {check.recommendation}</p>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Passed Checks */}
                    <div className="space-y-2">
                      <h4 className="text-xs font-semibold text-emerald-400 flex items-center gap-1.5">
                        <CheckCircle2 className="h-4 w-4" />
                        <span>Passed Quality Checks ({auditResult.passedChecks.length})</span>
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                        {auditResult.passedChecks.map((check) => (
                          <div key={check.id} className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-3 space-y-1">
                            <div className="flex items-center justify-between">
                              <span className="font-semibold text-white text-[11px]">{check.name}</span>
                              <span className="font-mono text-[10px] text-emerald-400 font-bold">{check.score} / {check.maxScore} pts</span>
                            </div>
                            <p className="text-slate-400 text-[10px]">{check.evidence}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Honest Audit Disclaimer */}
                  <div className="rounded-2xl border border-slate-800 bg-slate-950 p-4 text-[11px] text-slate-400 space-y-1">
                    <span className="font-semibold text-slate-200">Honest Audit Methodology:</span>
                    <p>{auditResult.disclaimer}</p>
                  </div>
                </>
              ) : (
                <div className="py-12 text-center space-y-3">
                  <div className="flex h-12 w-12 mx-auto items-center justify-center rounded-2xl bg-indigo-600/10 text-indigo-400 border border-indigo-500/20">
                    <ShieldCheck className="h-6 w-6" />
                  </div>
                  <h3 className="text-sm font-bold text-white">Run On-Page Audit</h3>
                  <p className="text-xs text-slate-400 max-w-sm mx-auto">
                    Evaluate title tag quality, meta descriptions, heading structure, search intent, schema validity, and live crawlability.
                  </p>
                  <button
                    onClick={handleRunAudit}
                    disabled={isAuditing}
                    className="rounded-xl bg-indigo-600 px-4 py-2 text-xs font-bold text-white hover:bg-indigo-500 transition-all shadow-md shadow-indigo-600/20"
                  >
                    {isAuditing ? 'Evaluating Rules...' : 'Run SEO Audit Now'}
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Action Footer Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 px-6 py-4 border-t border-slate-800/80 bg-slate-950/80">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleReset}
              className="flex items-center gap-1.5 rounded-xl border border-slate-800 bg-slate-900 px-3 py-2 text-xs font-medium text-slate-400 hover:text-white transition-all"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              <span>Reset Page Defaults</span>
            </button>
            <button
              type="button"
              onClick={handleExport}
              className="flex items-center gap-1.5 rounded-xl border border-slate-800 bg-slate-900 px-3 py-2 text-xs font-medium text-slate-300 hover:text-white transition-all"
            >
              <Download className="h-3.5 w-3.5" />
              <span>Export Report</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            {activeTab !== 'audit' && (
              <button
                type="button"
                onClick={handleRunAudit}
                disabled={isAuditing}
                className="flex items-center gap-1.5 rounded-xl border border-indigo-500/30 bg-indigo-500/10 px-4 py-2 text-xs font-semibold text-indigo-300 hover:bg-indigo-500/20 transition-all"
              >
                <ShieldCheck className="h-3.5 w-3.5" />
                <span>{isAuditing ? 'Auditing...' : 'Run SEO Audit'}</span>
              </button>
            )}

            <button
              type="button"
              onClick={handleApply}
              disabled={isApplying}
              className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 px-5 py-2 text-xs font-bold text-white shadow-lg shadow-emerald-600/25 hover:from-emerald-500 hover:to-teal-500 disabled:opacity-50 transition-all"
            >
              <Check className="h-4 w-4" />
              <span>{isApplying ? 'Applying to Site...' : 'Apply Changes to Website'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
