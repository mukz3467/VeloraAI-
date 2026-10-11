import { Category } from '../types';

export const SELLER_CATEGORIES: Category[] = [
  {
    id: 'seller-orders',
    slug: 'order-management',
    role: 'seller',
    name: 'Order Management',
    icon: 'PackageCheck',
    description: 'Order confirmations, receipts, dispatch alerts, cancellations, modifications, and inventory stock updates.',
    badge: 'Core Business',
    gradient: 'from-blue-600 to-indigo-700',
    accentColor: 'indigo',
    seoTitle: 'Seller Order Confirmation & Processing Messages | Velora AI',
    seoDescription: 'Professional order management templates for WhatsApp, SMS, and Instagram sellers: confirmations, dispatch, pre-orders, and stock alerts.',
    subcategories: [
      { slug: 'order-confirmation', name: 'Order Confirmation', description: 'Confirming customer orders with item details, total price, and address.' },
      { slug: 'order-received', name: 'Order Received', description: 'Acknowledging receipt of an incoming customer order.' },
      { slug: 'order-status-update', name: 'Processing & Progress Updates', description: 'Notifying customer that parcel is being packed or prepared.' },
      { slug: 'order-cancellation', name: 'Order Cancellation', description: 'Confirming order cancellation respectfully.' },
      { slug: 'order-modification', name: 'Order Modification & Changes', description: 'Confirming adjustments to color, size, or quantity.' },
      { slug: 'out-of-stock-notice', name: 'Out-of-Stock Notification', description: 'Informing customer politely about unavailable items with alternatives.' },
      { slug: 'back-in-stock', name: 'Back-in-Stock Alert', description: 'Alerting waiting customers that an item is available again.' },
      { slug: 'pre-order-custom', name: 'Pre-Order & Custom Orders', description: 'Custom production timelines and pre-booking confirmations.' }
    ]
  },
  {
    id: 'seller-payment',
    slug: 'payment-banking',
    role: 'seller',
    name: 'Payment & Banking',
    icon: 'CreditCard',
    description: 'Payment instructions, JazzCash, Easypaisa, Bank transfer details, COD confirmations, and payment reminders.',
    badge: 'High Frequency',
    gradient: 'from-emerald-600 to-teal-700',
    accentColor: 'emerald',
    seoTitle: 'Payment Instructions, JazzCash, Easypaisa & COD Templates | Velora AI',
    seoDescription: 'Accurate payment instruction templates with placeholders for JazzCash, Easypaisa, Bank details, payment receipts, and COD policies.',
    subcategories: [
      { slug: 'payment-instructions', name: 'Payment Details & Instructions', description: 'Clear instructions for online bank transfers, JazzCash, and Easypaisa.' },
      { slug: 'payment-received', name: 'Payment Received Confirmation', description: 'Confirming receipt of screenshot, advance, or full payment.' },
      { slug: 'payment-reminder', name: 'Payment Follow-up & Reminder', description: 'Polite reminder for pending bank or mobile payments.' },
      { slug: 'cod-confirmation', name: 'Cash on Delivery (COD) Confirmation', description: 'Confirming COD amount and asking for phone verification.' },
      { slug: 'advance-payment-request', name: 'Advance Payment Request', description: 'Polite request for partial/full advance on high-value or customized items.' },
      { slug: 'refund-processed', name: 'Refund Processed Notification', description: 'Sharing transaction ID and proof for completed customer refunds.' }
    ]
  },
  {
    id: 'seller-shipping',
    slug: 'shipping-delivery',
    role: 'seller',
    name: 'Shipping, Tracking & Delivery',
    icon: 'Truck',
    description: 'Dispatch alerts, courier tracking numbers (TCS, Leopards, Trax, PostEx), delays, and delivery confirmations.',
    badge: 'Critical',
    gradient: 'from-amber-500 to-orange-600',
    accentColor: 'amber',
    seoTitle: 'Courier Tracking, Dispatch & Delivery Messages for Sellers | Velora AI',
    seoDescription: 'Send parcel tracking numbers, courier dispatch alerts, delivery delay apologies, and address confirmation requests.',
    subcategories: [
      { slug: 'parcel-dispatched', name: 'Parcel Dispatched & Tracking Link', description: 'Sharing tracking number, courier company name, and tracking portal link.' },
      { slug: 'address-confirmation', name: 'Address & Phone Confirmation', description: 'Requesting complete street, house, landmark, and active contact number.' },
      { slug: 'delivery-delay-apology', name: 'Delivery Delay Apology', description: 'Courteous explanation for courier, weather, or customs delays.' },
      { slug: 'failed-delivery-followup', name: 'Customer Unavailable / Failed Delivery', description: 'Informing customer courier attempted delivery and arranging re-attempt.' },
      { slug: 'successful-delivery', name: 'Successful Delivery Confirmation', description: 'Checking in after delivery to ensure customer is satisfied.' },
      { slug: 'shipping-charges', name: 'Shipping Rates & Free Delivery Rules', description: 'Explaining standard shipping fee and free shipping thresholds.' }
    ]
  },
  {
    id: 'seller-product',
    slug: 'product-pricing',
    role: 'seller',
    name: 'Product & Pricing Inquiries',
    icon: 'Tag',
    description: 'Price quotes, size charts, material specifications, stock availability, and personalized recommendations.',
    gradient: 'from-purple-600 to-indigo-700',
    accentColor: 'purple',
    seoTitle: 'Product Details, Price Responses & Size Inquiries | Velora AI',
    seoDescription: 'Instant templates answering product prices, fabric/material details, size charts, wholesale rates, and warranties.',
    subcategories: [
      { slug: 'price-inquiry-response', name: 'Price Inquiry Response', description: 'Sharing product price, delivery charges, and current promotional offer.' },
      { slug: 'size-color-availability', name: 'Available Sizes, Colors & Chart', description: 'Detailing in-stock variants, dimensions, and fit recommendations.' },
      { slug: 'product-specifications', name: 'Material & Technical Specifications', description: 'Fabric, ingredients, technical specs, and warranty details.' },
      { slug: 'bundle-discount-offers', name: 'Bundles & Volume Discounts', description: 'Incentivizing larger orders with 2-pack or 3-pack discounts.' },
      { slug: 'product-recommendations', name: 'Matching & Recommended Items', description: 'Helpful cross-recommendations matching customer preferences.' }
    ]
  },
  {
    id: 'seller-support',
    slug: 'customer-support-complaints',
    role: 'seller',
    name: 'Customer Support & Complaints',
    icon: 'Headphones',
    description: 'De-escalating angry customers, handling wrong or damaged items, exchanges, returns, and warranty claims.',
    badge: 'De-escalation',
    gradient: 'from-rose-500 to-pink-600',
    accentColor: 'rose',
    seoTitle: 'Customer Complaint Resolution & Return Policy Messages | Velora AI',
    seoDescription: 'Professional de-escalation scripts for angry customers, damaged products, missing parcels, return procedures, and refunds.',
    subcategories: [
      { slug: 'angry-customer-response', name: 'De-escalation & Empathetic Apology', description: 'Calming frustrated buyers and promising fast resolution.' },
      { slug: 'damaged-wrong-item', name: 'Damaged or Wrong Item Received', description: 'Asking for video/photos and arranging immediate replacement.' },
      { slug: 'return-exchange-policy', name: 'Return & Exchange Instructions', description: 'Step-by-step guidance on how to exchange or return an item.' },
      { slug: 'delayed-response-apology', name: 'Apology for High Inflow / Late Reply', description: 'Polite apology when message volume causes delayed responses.' },
      { slug: 'missing-parcel-investigation', name: 'Missing Parcel Investigation', description: 'Reassuring buyer while coordinating with courier branch.' }
    ]
  },
  {
    id: 'seller-marketing',
    slug: 'sales-marketing',
    role: 'seller',
    name: 'Sales & Marketing',
    icon: 'Megaphone',
    description: 'New arrivals, Eid sales, flash discounts, abandoned cart follow-ups, and customer reactivation.',
    gradient: 'from-amber-500 to-rose-600',
    accentColor: 'amber',
    seoTitle: 'E-commerce Sales, WhatsApp Marketing & Eid Offers | Velora AI',
    seoDescription: 'High-conversion sales messages, abandoned cart recoveries, seasonal Eid promos, and VIP customer discounts.',
    subcategories: [
      { slug: 'new-product-launch', name: 'New Collection & Product Launch', description: 'Exciting announcement of new arrivals with call to action.' },
      { slug: 'eid-seasonal-sales', name: 'Eid & Seasonal Festive Offers', description: 'Festive greetings combined with limited-time promotional discounts.' },
      { slug: 'abandoned-cart-recovery', name: 'Abandoned Cart & Inquiry Follow-Up', description: 'Warm follow-up reminding customer about items they selected.' },
      { slug: 'flash-sale-limited-stock', name: 'Flash Sale & Limited Stock', description: 'Ethical urgency for sales expiring within 24 to 48 hours.' },
      { slug: 'customer-reactivation', name: 'Win-Back Inactive Customers', description: 'Special exclusive discount code for returning past buyers.' }
    ]
  },
  {
    id: 'seller-wholesale',
    slug: 'retailers-wholesale-dealers',
    role: 'seller',
    name: 'Retailers, Dealers & Wholesale',
    icon: 'Boxes',
    description: 'Wholesale price lists, dealer onboarding, minimum order quantities (MOQ), margins, and bulk supply.',
    gradient: 'from-cyan-600 to-blue-700',
    accentColor: 'cyan',
    seoTitle: 'B2B Wholesale Price Lists, Dealer Onboarding & Bulk Orders | Velora AI',
    seoDescription: 'B2B communication templates: MOQ terms, retailer profit margins, sample requests, and wholesale catalog sharing.',
    subcategories: [
      { slug: 'wholesale-inquiry-response', name: 'Wholesale Rates & Catalog Sharing', description: 'Sharing bulk pricing tiers, catalog link, and payment terms.' },
      { slug: 'moq-retailer-margins', name: 'MOQ & Retailer Profit Margins', description: 'Explaining minimum order quantity and recommended retail margins.' },
      { slug: 'dealer-onboarding', name: 'Dealer & Stockist Onboarding', description: 'Welcoming new regional retailers to your authorized distribution network.' },
      { slug: 'bulk-order-confirmation', name: 'Bulk Order & Freight Confirmation', description: 'Formal confirmation for cartons, freight delivery, and commercial terms.' },
      { slug: 'payment-collection-b2b', name: 'Wholesale Payment Collection', description: 'Professional invoice and payment collection follow-up for business clients.' }
    ]
  },
  {
    id: 'seller-reviews',
    slug: 'reviews-relationships',
    role: 'seller',
    name: 'Reviews & Customer Relationships',
    icon: 'HeartHandshake',
    description: 'Review requests, photo feedback requests, thanking repeat buyers, and responding to negative reviews.',
    gradient: 'from-pink-500 to-rose-600',
    accentColor: 'pink',
    seoTitle: 'Customer Review Requests & Loyalty Messages | Velora AI',
    seoDescription: 'Encourage 5-star reviews, Google/Facebook/Daraz ratings, WhatsApp photo feedback, and nurture repeat customers.',
    subcategories: [
      { slug: 'review-feedback-request', name: 'Review & Photo Feedback Request', description: 'Politely inviting happy customers to share a photo review or rating.' },
      { slug: 'repeat-customer-thanks', name: 'Repeat Buyer VIP Appreciation', description: 'Special heartfelt thanks to loyal customers with repeat perks.' },
      { slug: 'negative-review-response', name: 'Negative Review Resolution', description: 'Addressing critical feedback publicly and moving to private resolution.' },
      { slug: 'customer-birthday-greeting', name: 'Customer Birthday & Anniversary Greeting', description: 'Delighting buyers with personal celebration notes and promo gifts.' }
    ]
  },
  {
    id: 'seller-policies',
    slug: 'business-announcements-policies',
    role: 'seller',
    name: 'Business Announcements & Policies',
    icon: 'Building2',
    description: 'Store hours, Eid/holiday closure dates, store relocations, temporary pauses, and terms of service.',
    gradient: 'from-slate-600 to-zinc-800',
    accentColor: 'slate',
    seoTitle: 'Store Holiday Hours, Eid Closure & Business Policies | Velora AI',
    seoDescription: 'Clear announcements for Eid closures, holiday delivery cutoffs, price changes, and store policy updates.',
    subcategories: [
      { slug: 'holiday-closure-hours', name: 'Holiday & Eid Closure Hours', description: 'Dates when dispatch will pause and resume after holidays.' },
      { slug: 'delivery-cutoff-dates', name: 'Festive Delivery Cutoff Dates', description: 'Informing buyers of the last date to order for pre-holiday delivery.' },
      { slug: 'store-relocation-new-branch', name: 'New Outlet / Branch Announcement', description: 'Inviting customers to visit a newly opened showroom or branch.' },
      { slug: 'terms-and-policies', name: 'Exchange Policy & Standard Terms', description: 'Clear, transparent explanation of business policies.' }
    ]
  },
  {
    id: 'seller-quick-replies',
    slug: 'daily-quick-replies',
    role: 'seller',
    name: 'Daily Quick Replies',
    icon: 'Zap',
    description: 'Instant 1-tap WhatsApp business responses: "Yes Available", "Send Screenshot", "Share Location", and "Confirm Order".',
    badge: '1-Tap Fast',
    gradient: 'from-emerald-500 to-green-600',
    accentColor: 'emerald',
    seoTitle: 'Instant WhatsApp Quick Replies for Online Sellers | Velora AI',
    seoDescription: 'Canned responses for high-velocity WhatsApp, Instagram DMs, and Facebook Messenger chats.',
    subcategories: [
      { slug: 'yes-available', name: 'Yes Available & Ready to Ship', description: 'Instant confirmation that stock is ready.' },
      { slug: 'please-send-screenshot', name: 'Please Send Payment Screenshot', description: 'Quick prompt asking for transaction receipt proof.' },
      { slug: 'share-location-address', name: 'Kindly Share Complete Address', description: 'Fast request for house #, street, area, and city.' },
      { slug: 'please-confirm-order', name: 'Please Confirm Your Order', description: '1-tap message asking buyer to confirm COD order.' },
      { slug: 'we-will-get-back', name: 'Please Wait, Checking Stock', description: 'Brief polite hold message while staff checks warehouse.' }
    ]
  }
];

export const CUSTOMER_CATEGORIES: Category[] = [
  {
    id: 'customer-inquiry',
    slug: 'product-price-inquiry',
    role: 'customer',
    name: 'Product Inquiries & Availability',
    icon: 'HelpCircle',
    description: 'Inquiring about prices, delivery charges to your city, size charts, color options, and real item photos.',
    badge: 'High Frequency',
    gradient: 'from-blue-500 to-indigo-600',
    accentColor: 'blue',
    seoTitle: 'Customer Product Inquiries & Price Questions | Velora AI',
    seoDescription: 'Polite buyer messages asking sellers for prices, real pictures, size measurements, and stock availability.',
    subcategories: [
      { slug: 'price-delivery-charges', name: 'Price & Delivery Charges to City', description: 'Asking for total price including courier charges to your specific city.' },
      { slug: 'real-photos-video', name: 'Requesting Real Product Pictures/Video', description: 'Politely asking for non-edited real pictures or video of the fabric/item.' },
      { slug: 'size-chart-measurement', name: 'Size Chart & Custom Fit Inquiry', description: 'Asking for chest, length, or waist measurements before ordering.' },
      { slug: 'availability-in-stock', name: 'Availability in Specific Color/Size', description: 'Checking if your desired color and size are currently in stock.' }
    ]
  },
  {
    id: 'customer-order-placement',
    slug: 'order-placement-tracking',
    role: 'customer',
    name: 'Order Placement & Tracking Requests',
    icon: 'ShoppingBag',
    description: 'Placing new orders with complete delivery address, requesting tracking numbers, and confirming payment sent.',
    gradient: 'from-emerald-500 to-teal-600',
    accentColor: 'emerald',
    seoTitle: 'Customer Order Placement & Tracking Number Requests | Velora AI',
    seoDescription: 'Complete order placement scripts with address formats, payment screenshots, and tracking number requests.',
    subcategories: [
      { slug: 'order-placement-address', name: 'Placing Order with Complete Address', description: 'Cleanly formatted order placement with name, phone, full address, and item.' },
      { slug: 'payment-screenshot-sent', name: 'Payment Sent & Screenshot Attached', description: 'Informing seller that JazzCash/Easypaisa/Bank payment has been transferred.' },
      { slug: 'tracking-id-request', name: 'Tracking Number & Dispatch Status', description: 'Asking seller for tracking number after parcel dispatch.' },
      { slug: 'order-cancellation-request', name: 'Order Cancellation Request', description: 'Politely requesting to cancel an order before dispatch.' }
    ]
  },
  {
    id: 'customer-issues-complaints',
    slug: 'complaints-returns-refunds',
    role: 'customer',
    name: 'Complaints, Returns & Refunds',
    icon: 'AlertTriangle',
    description: 'Reporting late parcels, damaged items, wrong size delivered, and requesting returns or refunds politely.',
    badge: 'Support',
    gradient: 'from-rose-500 to-pink-600',
    accentColor: 'rose',
    seoTitle: 'Customer Complaints, Returns & Exchange Requests | Velora AI',
    seoDescription: 'Polite, firm customer messages for damaged parcels, wrong items, missing accessories, and refund requests.',
    subcategories: [
      { slug: 'damaged-wrong-product', name: 'Damaged or Wrong Product Complaint', description: 'Explaining defect/mistake politely and sharing attached pictures.' },
      { slug: 'late-delivery-complaint', name: 'Delayed Delivery & Missing Parcel', description: 'Checking why parcel has not arrived past promised delivery date.' },
      { slug: 'size-exchange-request', name: 'Size Exchange Request', description: 'Asking to exchange for a smaller or larger size according to policy.' },
      { slug: 'refund-request', name: 'Refund Request for Returned Item', description: 'Requesting refund to JazzCash, Easypaisa, or Bank after returning parcel.' }
    ]
  },
  {
    id: 'customer-negotiation-wholesale',
    slug: 'discounts-price-negotiation',
    role: 'customer',
    name: 'Discounts, Negotiation & Wholesale',
    icon: 'Percent',
    description: 'Polite price negotiations, asking for bulk discounts on 2+ items, student discounts, and wholesale pricing.',
    gradient: 'from-amber-500 to-orange-600',
    accentColor: 'amber',
    seoTitle: 'Polite Price Negotiation & Wholesale Buyer Inquiries | Velora AI',
    seoDescription: 'Respectful discount requests, multi-item bundle negotiations, and bulk wholesale quotes for buyers.',
    subcategories: [
      { slug: 'polite-discount-request', name: 'Polite Multi-Item Discount Request', description: 'Respectfully asking for a discount on ordering multiple items.' },
      { slug: 'wholesale-b2b-buyer-inquiry', name: 'Wholesale / Bulk Order Inquiry', description: 'Asking for wholesale rate sheet for quantities of 12, 50, or 100+ pieces.' },
      { slug: 'free-shipping-negotiation', name: 'Asking for Free Shipping Consideration', description: 'Politely asking if shipping can be waived for this order.' }
    ]
  },
  {
    id: 'customer-appreciation-feedback',
    slug: 'appreciation-positive-feedback',
    role: 'customer',
    name: 'Thank-You & Positive Feedback',
    icon: 'Sparkles',
    description: 'Thanking sellers for quick delivery, praising good fabric/packaging, and sending 5-star customer appreciation.',
    gradient: 'from-indigo-500 to-purple-600',
    accentColor: 'indigo',
    seoTitle: 'Customer Thank You & Positive Feedback Messages | Velora AI',
    seoDescription: 'Delight online sellers by sharing appreciation, compliments on packaging, and recommendations.',
    subcategories: [
      { slug: 'parcel-received-appreciation', name: 'Parcel Received & Loved It!', description: 'Letting seller know parcel arrived safely and quality is outstanding.' },
      { slug: 'unanswered-followup', name: 'Gentle Nudge for Unanswered Message', description: 'Polite follow-up when seller has not replied to an inquiry after a while.' }
    ]
  }
];
