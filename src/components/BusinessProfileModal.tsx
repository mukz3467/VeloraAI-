import React, { useState, useEffect } from 'react';
import { Store, X, Save, Check, ShieldCheck, MapPin, Phone, CreditCard, Clock } from 'lucide-react';
import { useBusinessProfile } from '../context/BusinessProfileContext';
import { BUSINESS_TYPES } from '../data/languages';

export const BusinessProfileModal: React.FC = () => {
  const { profile, updateProfile, resetProfile, isProfileModalOpen, closeProfileModal } = useBusinessProfile();
  const [form, setForm] = useState(profile);
  const [savedNotice, setSavedNotice] = useState(false);

  useEffect(() => {
    setForm(profile);
  }, [profile, isProfileModalOpen]);

  if (!isProfileModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile(form);
    setSavedNotice(true);
    setTimeout(() => {
      setSavedNotice(false);
      closeProfileModal();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div 
        className="fixed inset-0 bg-slate-950/80 backdrop-blur-md" 
        onClick={closeProfileModal} 
      />

      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl border border-slate-800 bg-slate-900 p-6 sm:p-8 shadow-2xl z-10 space-y-6">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-indigo-600/20 text-indigo-400 border border-indigo-500/30">
              <Store className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-display text-lg font-bold text-white">Saved Business Profile</h3>
              <p className="text-xs text-slate-400">Auto-fills into all seller message templates and AI generators</p>
            </div>
          </div>
          <button onClick={closeProfileModal} className="text-slate-400 hover:text-white p-1">
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Shop Name */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300">Shop / Brand Name *</label>
              <input
                type="text"
                required
                value={form.shopName}
                onChange={e => setForm({ ...form, shopName: e.target.value })}
                placeholder="e.g. Bali Fashion Store"
                className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:border-indigo-500 focus:outline-none"
              />
            </div>

            {/* Business Type */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300">Business Category</label>
              <select
                value={form.businessType}
                onChange={e => setForm({ ...form, businessType: e.target.value })}
                className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3 py-2.5 text-xs text-white focus:border-indigo-500 focus:outline-none"
              >
                {BUSINESS_TYPES.map(bt => (
                  <option key={bt.id} value={bt.id}>{bt.name}</option>
                ))}
              </select>
            </div>

            {/* WhatsApp Contact Number */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300 flex items-center gap-1">
                <Phone className="h-3.5 w-3.5 text-indigo-400" />
                <span>WhatsApp / Phone Number</span>
              </label>
              <input
                type="text"
                value={form.contactNumber}
                onChange={e => setForm({ ...form, contactNumber: e.target.value })}
                placeholder="0300-1234567"
                className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:border-indigo-500 focus:outline-none"
              />
            </div>

            {/* Default Delivery Charges */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300">Standard Delivery Charges</label>
              <input
                type="text"
                value={form.defaultDeliveryCharges}
                onChange={e => setForm({ ...form, defaultDeliveryCharges: e.target.value })}
                placeholder="Rs. 200 / Free delivery over Rs. 3,000"
                className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:border-indigo-500 focus:outline-none"
              />
            </div>

            {/* Shop Address */}
            <div className="space-y-1 sm:col-span-2">
              <label className="text-xs font-semibold text-slate-300 flex items-center gap-1">
                <MapPin className="h-3.5 w-3.5 text-indigo-400" />
                <span>Shop Address / City</span>
              </label>
              <input
                type="text"
                value={form.shopAddress}
                onChange={e => setForm({ ...form, shopAddress: e.target.value })}
                placeholder="Shop #14, Main Commercial Market, Lahore"
                className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:border-indigo-500 focus:outline-none"
              />
            </div>

            {/* JazzCash Number */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300">JazzCash Account Details</label>
              <input
                type="text"
                value={form.jazzcashNumber}
                onChange={e => setForm({ ...form, jazzcashNumber: e.target.value })}
                placeholder="0300-XXXXXXX (Account Title: Store Name)"
                className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:border-indigo-500 focus:outline-none"
              />
            </div>

            {/* Easypaisa Number */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300">Easypaisa Account Details</label>
              <input
                type="text"
                value={form.easypaisaNumber}
                onChange={e => setForm({ ...form, easypaisaNumber: e.target.value })}
                placeholder="0345-XXXXXXX (Account Title: Store Name)"
                className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:border-indigo-500 focus:outline-none"
              />
            </div>

            {/* Bank Transfer */}
            <div className="space-y-1 sm:col-span-2">
              <label className="text-xs font-semibold text-slate-300 flex items-center gap-1">
                <CreditCard className="h-3.5 w-3.5 text-indigo-400" />
                <span>Bank Account Details (Optional)</span>
              </label>
              <input
                type="text"
                value={form.bankDetails}
                onChange={e => setForm({ ...form, bankDetails: e.target.value })}
                placeholder="Bank Name, IBAN / Account #, Account Title"
                className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:border-indigo-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="rounded-xl border border-indigo-500/20 bg-indigo-500/5 p-3 text-xs text-slate-400 flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-emerald-400 shrink-0" />
            <span>Privacy Note: Your business details are stored locally on your device only. Never shared or sold.</span>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-slate-800">
            <button
              type="button"
              onClick={resetProfile}
              className="text-xs text-slate-500 hover:text-rose-400"
            >
              Reset to Defaults
            </button>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={closeProfileModal}
                className="rounded-xl px-4 py-2 text-xs font-medium text-slate-400 hover:text-white"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 px-5 py-2 text-xs font-bold text-white hover:from-indigo-500 hover:to-violet-500 shadow-md shadow-indigo-600/30"
              >
                {savedNotice ? (
                  <>
                    <Check className="h-4 w-4 text-white" />
                    <span>Saved!</span>
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4" />
                    <span>Save Shop Profile</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
