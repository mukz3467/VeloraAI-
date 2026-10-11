import React, { createContext, useContext, useState, useEffect } from 'react';
import { BusinessProfile } from '../types';

interface BusinessProfileContextType {
  profile: BusinessProfile;
  updateProfile: (updated: Partial<BusinessProfile>) => void;
  resetProfile: () => void;
  isProfileSet: boolean;
  isProfileModalOpen: boolean;
  openProfileModal: () => void;
  closeProfileModal: () => void;
}

const DEFAULT_PROFILE: BusinessProfile = {
  shopName: 'Bali Fashion Store',
  businessType: 'clothing-fashion',
  contactNumber: '0300-1234567',
  shopAddress: 'Shop #14, Main Commercial Market',
  city: 'Lahore',
  preferredLanguage: 'Roman Urdu',
  standardCurrency: 'Rs.',
  defaultDeliveryCharges: 'Rs. 200',
  jazzcashNumber: '0300-1234567 (Title: Bali Fashion)',
  easypaisaNumber: '0345-9876543 (Title: Bali Fashion)',
  bankDetails: 'HBL Bank - 001234567890 (Title: Bali Fashion)',
  businessHours: '10:00 AM - 10:00 PM (Mon-Sat)'
};

const BusinessProfileContext = createContext<BusinessProfileContextType | undefined>(undefined);

export const BusinessProfileProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [profile, setProfile] = useState<BusinessProfile>(() => {
    try {
      const stored = localStorage.getItem('velora_business_profile');
      return stored ? JSON.parse(stored) : DEFAULT_PROFILE;
    } catch {
      return DEFAULT_PROFILE;
    }
  });

  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('velora_business_profile', JSON.stringify(profile));
  }, [profile]);

  const updateProfile = (updated: Partial<BusinessProfile>) => {
    setProfile(prev => ({ ...prev, ...updated }));
  };

  const resetProfile = () => {
    setProfile(DEFAULT_PROFILE);
  };

  const isProfileSet = Boolean(profile.shopName && profile.shopName.trim());

  return (
    <BusinessProfileContext.Provider value={{
      profile,
      updateProfile,
      resetProfile,
      isProfileSet,
      isProfileModalOpen,
      openProfileModal: () => setIsProfileModalOpen(true),
      closeProfileModal: () => setIsProfileModalOpen(false)
    }}>
      {children}
    </BusinessProfileContext.Provider>
  );
};

export const useBusinessProfile = () => {
  const ctx = useContext(BusinessProfileContext);
  if (!ctx) throw new Error('useBusinessProfile must be used within BusinessProfileProvider');
  return ctx;
};
