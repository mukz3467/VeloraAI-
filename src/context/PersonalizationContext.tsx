import React, { createContext, useContext, useState, useEffect } from 'react';
import { PersonalizationValues } from '../types';
import { useBusinessProfile } from './BusinessProfileContext';

interface PersonalizationContextType {
  values: PersonalizationValues;
  updateValue: (key: keyof PersonalizationValues, val: string) => void;
  setAllValues: (newVals: Partial<PersonalizationValues>) => void;
  clearValues: () => void;
  parseAndPopulate: (rawText: string) => number;
  substituteVariables: (templateText: string, customVals?: Partial<PersonalizationValues>) => string;
  isPersonalized: boolean;
  loadFromShopProfile: () => void;
}

const INITIAL_VALUES: PersonalizationValues = {
  shopName: '',
  customerName: 'Ahmed',
  productName: 'Black Stitched Kurti',
  price: '1,500',
  quantity: '1',
  orderNumber: 'BF1024',
  trackingNumber: 'TCS-9812456',
  courierCompany: 'TCS Courier',
  deliveryDate: 'Wednesday',
  paymentMethod: 'JazzCash 0300-1234567',
  deliveryCharges: 'Rs. 200',
  contactNumber: '0312-3456789',
  address: 'House #12, Street 4, F-7/2',
  city: 'Islamabad',
  customNote: ''
};

const PersonalizationContext = createContext<PersonalizationContextType | undefined>(undefined);

export const PersonalizationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { profile } = useBusinessProfile();
  
  const [values, setValues] = useState<PersonalizationValues>(() => {
    try {
      const stored = localStorage.getItem('velora_personalization');
      const parsed = stored ? JSON.parse(stored) : INITIAL_VALUES;
      if (!parsed.shopName && profile.shopName) {
        parsed.shopName = profile.shopName;
      }
      return parsed;
    } catch {
      return INITIAL_VALUES;
    }
  });

  useEffect(() => {
    localStorage.setItem('velora_personalization', JSON.stringify(values));
  }, [values]);

  const updateValue = (key: keyof PersonalizationValues, val: string) => {
    setValues(prev => ({ ...prev, [key]: val }));
  };

  const setAllValues = (newVals: Partial<PersonalizationValues>) => {
    setValues(prev => ({ ...prev, ...newVals }));
  };

  const clearValues = () => {
    setValues({
      shopName: profile.shopName || '',
      customerName: '',
      productName: '',
      price: '',
      quantity: '1',
      orderNumber: '',
      trackingNumber: '',
      courierCompany: '',
      deliveryDate: '',
      paymentMethod: '',
      deliveryCharges: profile.defaultDeliveryCharges || 'Rs. 200',
      contactNumber: '',
      address: '',
      city: profile.city || '',
      customNote: ''
    });
  };

  const loadFromShopProfile = () => {
    setValues(prev => ({
      ...prev,
      shopName: profile.shopName || prev.shopName,
      contactNumber: profile.contactNumber || prev.contactNumber,
      deliveryCharges: profile.defaultDeliveryCharges || prev.deliveryCharges,
      city: profile.city || prev.city,
      paymentMethod: profile.jazzcashNumber ? `JazzCash: ${profile.jazzcashNumber}` : prev.paymentMethod
    }));
  };

  // Smart parser for pasted WhatsApp message or order form lines
  const parseAndPopulate = (rawText: string): number => {
    let populatedCount = 0;
    const lines = rawText.split(/\r?\n/);
    const updates: Partial<PersonalizationValues> = {};

    for (const line of lines) {
      const parts = line.split(/[:=-]/);
      if (parts.length >= 2) {
        const label = parts[0].trim().toLowerCase();
        const val = parts.slice(1).join(':').trim();
        if (!val) continue;

        if (label.includes('customer') || label.includes('buyer') || label.includes('client') || label.includes('name') || label.includes('naam')) {
          updates.customerName = val;
          populatedCount++;
        } else if (label.includes('shop') || label.includes('store') || label.includes('brand') || label.includes('seller')) {
          updates.shopName = val;
          populatedCount++;
        } else if (label.includes('product') || label.includes('item') || label.includes('suit') || label.includes('dress') || label.includes('cheez')) {
          updates.productName = val;
          populatedCount++;
        } else if (label.includes('price') || label.includes('amount') || label.includes('total') || label.includes('qimat') || label.includes('rs') || label.includes('pkr')) {
          updates.price = val.replace(/[^0-9,]/g, '');
          populatedCount++;
        } else if (label.includes('order') || label.includes('invoice') || label.includes('bill')) {
          updates.orderNumber = val;
          populatedCount++;
        } else if (label.includes('tracking') || label.includes('cn') || label.includes('consignment')) {
          updates.trackingNumber = val;
          populatedCount++;
        } else if (label.includes('courier') || label.includes('tcs') || label.includes('trax') || label.includes('leopard')) {
          updates.courierCompany = val;
          populatedCount++;
        } else if (label.includes('city') || label.includes('shahar')) {
          updates.city = val;
          populatedCount++;
        } else if (label.includes('phone') || label.includes('mobile') || label.includes('whatsapp') || label.includes('contact')) {
          updates.contactNumber = val;
          populatedCount++;
        } else if (label.includes('address') || label.includes('pata') || label.includes('location')) {
          updates.address = val;
          populatedCount++;
        } else if (label.includes('method') || label.includes('payment') || label.includes('jazzcash') || label.includes('easypaisa')) {
          updates.paymentMethod = val;
          populatedCount++;
        }
      }
    }

    if (populatedCount > 0) {
      setValues(prev => ({ ...prev, ...updates }));
    }

    return populatedCount;
  };

  // Substitute variables safely
  const substituteVariables = (templateText: string, customVals?: Partial<PersonalizationValues>): string => {
    const v = { ...values, ...customVals };
    let result = templateText;

    const currencySymbol = profile.standardCurrency || 'Rs.';

    const mapping: Record<string, string> = {
      '{{customer_name}}': v.customerName || '[Customer Name]',
      '{{shop_name}}': v.shopName || profile.shopName || '[Shop Name]',
      '{{product_name}}': v.productName || '[Product Name]',
      '{{price}}': v.price ? `${v.price}` : '[Price]',
      '{{currency}}': currencySymbol,
      '{{order_number}}': v.orderNumber || '[Order #]',
      '{{tracking_number}}': v.trackingNumber || '[Tracking #]',
      '{{courier}}': v.courierCompany || 'TCS / Courier',
      '{{payment_method}}': v.paymentMethod || 'JazzCash / Easypaisa',
      '{{delivery_charges}}': v.deliveryCharges || profile.defaultDeliveryCharges || 'Rs. 200',
      '{{contact_number}}': v.contactNumber || '[Phone Number]',
      '{{address}}': v.address || '[Delivery Address]',
      '{{city}}': v.city || '[City]',
      '{{quantity}}': v.quantity || '1',
      '{{delivery_date}}': v.deliveryDate || '2-3 working days'
    };

    // Replace all keys
    Object.entries(mapping).forEach(([token, val]) => {
      result = result.replaceAll(token, val);
    });

    return result;
  };

  const isPersonalized = Boolean(values.customerName || values.productName || values.orderNumber);

  return (
    <PersonalizationContext.Provider value={{
      values,
      updateValue,
      setAllValues,
      clearValues,
      parseAndPopulate,
      substituteVariables,
      isPersonalized,
      loadFromShopProfile
    }}>
      {children}
    </PersonalizationContext.Provider>
  );
};

export const usePersonalization = () => {
  const ctx = useContext(PersonalizationContext);
  if (!ctx) throw new Error('usePersonalization must be used within PersonalizationProvider');
  return ctx;
};
