import React, { useState } from 'react';
import { 
  Search, 
  Sliders, 
  Sparkles, 
  Store, 
  User, 
  Tag, 
  CreditCard, 
  Truck, 
  ClipboardPaste, 
  RotateCcw, 
  Check, 
  X, 
  ChevronDown, 
  ChevronUp,
  MapPin,
  Phone
} from 'lucide-react';
import { usePersonalization } from '../context/PersonalizationContext';
import { useBusinessProfile } from '../context/BusinessProfileContext';

interface SmartSearchPersonalizerProps {
  onSearchChange: (query: string) => void;
  searchQuery: string;
}

export const SmartSearchPersonalizer: React.FC<SmartSearchPersonalizerProps> = ({
  onSearchChange,
  searchQuery
}) => {
  const { values, updateValue, clearValues, parseAndPopulate, loadFromShopProfile, isPersonalized } = usePersonalization();
  const { profile, openProfileModal } = useBusinessProfile();

  const [isTrayExpanded, setIsTrayExpanded] = useState(false);
  const [showPasteModal, setShowPasteModal] = useState(false);
  const [pastedText, setPastedText] = useState('');
  const [pasteSuccessNotice, setPasteSuccessNotice] = useState<string | null>(null);

  const samplePasteText = `Shop: Bali Fashion Store
Customer Name: Ahmed Khan
Product: Embroidered Lawn Suit
Price: 3,450
Order Number: BF1088
Tracking Number: TCS-8912304
Courier: TCS Express
City: Lahore
Phone: 0301-9876543`;

  const handleApplyPaste = () => {
    if (!pastedText.trim()) return;
    const count = parseAndPopulate(pastedText);
    setShowPasteModal(false);
    setPastedText('');
    setPasteSuccessNotice(`Successfully parsed ${count} order details! Templates auto-updated.`);
    setTimeout(() => setPasteSuccessNotice(null), 3500);
  };

  const handleSamplePaste = () => {
    setPastedText(samplePasteText);
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-3">
      {/* Main Smart Search & Personalizer Bar */}
      <div className="relative rounded-3xl border border-slate-700/80 bg-slate-900/90 p-2 sm:p-2.5 shadow-2xl backdrop-blur-xl">
        <div className="flex flex-col sm:flex-row items-center gap-2">
          {/* Search Input Field */}
          <div className="relative flex-grow w-full flex items-center">
            <Search className="absolute left-4 h-5 w-5 text-indigo-400 shrink-0 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => onSearchChange(e.target.value)}
              placeholder="Search messages or enter shop, customer, product, price (e.g. 'order confirmation', 'آرڈر کنفرم', 'payment mil gai')..."
              className="w-full rounded-2xl bg-slate-950/80 pl-12 pr-4 py-3.5 text-xs sm:text-sm text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
            {searchQuery && (
              <button 
                onClick={() => onSearchChange('')}
                className="absolute right-3 text-slate-400 hover:text-white p-1"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          {/* Quick Action Toggle Buttons */}
          <div className="flex items-center gap-2 w-full sm:w-auto shrink-0 justify-end">
            <button
              onClick={() => setShowPasteModal(true)}
              className="flex items-center gap-1.5 rounded-2xl border border-slate-700 bg-slate-800/80 px-3.5 py-3 text-xs font-semibold text-slate-200 hover:border-indigo-500/50 hover:bg-slate-750 hover:text-white transition-all shadow-sm"
              title="Paste WhatsApp order details to auto-populate all templates"
            >
              <ClipboardPaste className="h-4 w-4 text-indigo-400" />
              <span className="hidden md:inline">Paste Labeled Details</span>
              <span className="md:hidden">Paste</span>
            </button>

            <button
              onClick={() => setIsTrayExpanded(!isTrayExpanded)}
              className={`flex items-center gap-1.5 rounded-2xl px-4 py-3 text-xs font-bold transition-all shadow-md ${
                isTrayExpanded || isPersonalized
                  ? 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-indigo-600/30'
                  : 'border border-slate-700 bg-slate-800 text-slate-200 hover:bg-slate-700'
              }`}
            >
              <Sliders className="h-4 w-4" />
              <span>{isTrayExpanded ? 'Hide Auto-Fill' : 'Auto-Fill Fields'}</span>
              {isTrayExpanded ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
            </button>
          </div>
        </div>

        {/* Active Personalization Quick Summary Pill */}
        {isPersonalized && !isTrayExpanded && (
          <div className="mt-2 pt-2 border-t border-slate-800/80 px-3 flex flex-wrap items-center justify-between text-xs text-slate-400 gap-2">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="text-slate-300 font-medium">
                Active Personalization: <strong className="text-white">{values.shopName || profile.shopName}</strong> • {values.customerName} • {values.productName} • {values.orderNumber}
              </span>
            </div>
            <button
              onClick={clearValues}
              className="text-slate-400 hover:text-rose-400 flex items-center gap-1 text-[11px]"
            >
              <RotateCcw className="h-3 w-3" />
              <span>Reset</span>
            </button>
          </div>
        )}

        {/* Success toast notice if details parsed */}
        {pasteSuccessNotice && (
          <div className="mt-2 rounded-xl bg-emerald-500/10 border border-emerald-500/30 p-2.5 text-xs text-emerald-300 flex items-center gap-2 animate-in fade-in">
            <Check className="h-4 w-4 text-emerald-400" />
            <span>{pasteSuccessNotice}</span>
          </div>
        )}
      </div>

      {/* Expandable Auto-Personalization Fields Tray */}
      {isTrayExpanded && (
        <div className="rounded-3xl border border-indigo-500/30 bg-slate-900/95 p-5 sm:p-6 shadow-2xl backdrop-blur-2xl space-y-4 animate-in fade-in duration-200">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
            <div>
              <h3 className="font-display text-sm font-bold text-white flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-indigo-400" />
                <span>Smart Order Details (Instantly Populates All Templates)</span>
              </h3>
              <p className="text-[11px] text-slate-400">
                Values entered here automatically replace placeholders across Seller and Customer cards in real time.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={loadFromShopProfile}
                className="rounded-xl border border-slate-700 bg-slate-950 px-3 py-1.5 text-[11px] font-semibold text-indigo-300 hover:bg-indigo-600/20 transition-colors flex items-center gap-1.5"
                title="Load business details from saved profile"
              >
                <Store className="h-3.5 w-3.5" />
                <span>Load Shop Profile</span>
              </button>

              <button
                onClick={openProfileModal}
                className="rounded-xl border border-slate-700 bg-slate-950 px-2.5 py-1.5 text-[11px] font-semibold text-slate-300 hover:text-white"
                title="Configure permanent shop profile"
              >
                Profile Settings
              </button>

              <button
                onClick={clearValues}
                className="rounded-xl border border-slate-800 bg-slate-950 px-2.5 py-1.5 text-[11px] text-slate-400 hover:text-rose-400 transition-colors"
                title="Clear all fields"
              >
                Clear
              </button>
            </div>
          </div>

          {/* Form Fields Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
            {/* Shop Name */}
            <div className="space-y-1">
              <label className="text-[11px] font-semibold text-slate-300 flex items-center gap-1">
                <Store className="h-3 w-3 text-indigo-400" />
                <span>Shop / Seller Name</span>
              </label>
              <input
                type="text"
                value={values.shopName}
                onChange={e => updateValue('shopName', e.target.value)}
                placeholder="e.g. Bali Fashion Store"
                className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3 py-2 text-xs text-white placeholder-slate-500 focus:border-indigo-500 focus:outline-none"
              />
            </div>

            {/* Customer Name */}
            <div className="space-y-1">
              <label className="text-[11px] font-semibold text-slate-300 flex items-center gap-1">
                <User className="h-3 w-3 text-indigo-400" />
                <span>Customer Name</span>
              </label>
              <input
                type="text"
                value={values.customerName}
                onChange={e => updateValue('customerName', e.target.value)}
                placeholder="e.g. Ahmed Khan"
                className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3 py-2 text-xs text-white placeholder-slate-500 focus:border-indigo-500 focus:outline-none"
              />
            </div>

            {/* Product Name */}
            <div className="space-y-1">
              <label className="text-[11px] font-semibold text-slate-300 flex items-center gap-1">
                <Tag className="h-3 w-3 text-indigo-400" />
                <span>Product Name</span>
              </label>
              <input
                type="text"
                value={values.productName}
                onChange={e => updateValue('productName', e.target.value)}
                placeholder="e.g. Black Stitched Kurti"
                className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3 py-2 text-xs text-white placeholder-slate-500 focus:border-indigo-500 focus:outline-none"
              />
            </div>

            {/* Price */}
            <div className="space-y-1">
              <label className="text-[11px] font-semibold text-slate-300 flex items-center gap-1">
                <CreditCard className="h-3 w-3 text-indigo-400" />
                <span>Total Price (Rs.)</span>
              </label>
              <input
                type="text"
                value={values.price}
                onChange={e => updateValue('price', e.target.value)}
                placeholder="e.g. 1,500"
                className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3 py-2 text-xs text-white placeholder-slate-500 focus:border-indigo-500 focus:outline-none"
              />
            </div>

            {/* Order Number */}
            <div className="space-y-1">
              <label className="text-[11px] font-semibold text-slate-300">Order #</label>
              <input
                type="text"
                value={values.orderNumber}
                onChange={e => updateValue('orderNumber', e.target.value)}
                placeholder="e.g. BF1024"
                className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3 py-2 text-xs text-white placeholder-slate-500 focus:border-indigo-500 focus:outline-none"
              />
            </div>

            {/* Tracking Number */}
            <div className="space-y-1">
              <label className="text-[11px] font-semibold text-slate-300 flex items-center gap-1">
                <Truck className="h-3 w-3 text-indigo-400" />
                <span>Tracking #</span>
              </label>
              <input
                type="text"
                value={values.trackingNumber}
                onChange={e => updateValue('trackingNumber', e.target.value)}
                placeholder="e.g. TCS-9812456"
                className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3 py-2 text-xs text-white placeholder-slate-500 focus:border-indigo-500 focus:outline-none"
              />
            </div>

            {/* Courier Company */}
            <div className="space-y-1">
              <label className="text-[11px] font-semibold text-slate-300">Courier Company</label>
              <input
                type="text"
                value={values.courierCompany}
                onChange={e => updateValue('courierCompany', e.target.value)}
                placeholder="e.g. TCS / Leopards / Trax"
                className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3 py-2 text-xs text-white placeholder-slate-500 focus:border-indigo-500 focus:outline-none"
              />
            </div>

            {/* City & Address */}
            <div className="space-y-1">
              <label className="text-[11px] font-semibold text-slate-300 flex items-center gap-1">
                <MapPin className="h-3 w-3 text-indigo-400" />
                <span>Destination City</span>
              </label>
              <input
                type="text"
                value={values.city}
                onChange={e => updateValue('city', e.target.value)}
                placeholder="e.g. Lahore / Karachi"
                className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3 py-2 text-xs text-white placeholder-slate-500 focus:border-indigo-500 focus:outline-none"
              />
            </div>
          </div>
        </div>
      )}

      {/* Paste Labeled Details Modal */}
      {showPasteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md" onClick={() => setShowPasteModal(false)} />
          <div className="relative w-full max-w-lg rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-2xl z-10 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <ClipboardPaste className="h-5 w-5 text-indigo-400" />
                <h3 className="font-display text-base font-bold text-white">Paste Order or Customer Notes</h3>
              </div>
              <button onClick={() => setShowPasteModal(false)} className="text-slate-400 hover:text-white">
                <X className="h-4 w-4" />
              </button>
            </div>

            <p className="text-xs text-slate-300">
              Paste customer WhatsApp messages, delivery notes, or order sheets. Our engine recognizes labeled values and populates all templates automatically:
            </p>

            <textarea
              rows={6}
              value={pastedText}
              onChange={e => setPastedText(e.target.value)}
              placeholder={`Example:\nShop: My Brand\nCustomer: Ali\nProduct: Blue Denim\nPrice: Rs. 2,200\nOrder #: 4091`}
              className="w-full rounded-2xl border border-slate-800 bg-slate-950 p-3 text-xs text-white placeholder-slate-500 focus:border-indigo-500 focus:outline-none font-mono"
            />

            <div className="flex items-center justify-between pt-2">
              <button
                type="button"
                onClick={handleSamplePaste}
                className="text-xs text-indigo-400 hover:underline"
              >
                Insert Sample Order Data
              </button>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setShowPasteModal(false)}
                  className="rounded-xl px-3 py-1.5 text-xs text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleApplyPaste}
                  className="rounded-xl bg-indigo-600 px-4 py-1.5 text-xs font-semibold text-white hover:bg-indigo-500 transition-colors"
                >
                  Parse & Auto-Fill
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
