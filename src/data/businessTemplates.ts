import { Template } from '../types';

export const BUSINESS_TEMPLATES: Template[] = [
  // ==========================================
  // SELLER: ORDER MANAGEMENT
  // ==========================================
  {
    id: 'seller-ord-01',
    title: 'Order Confirmation & Summary',
    categorySlug: 'order-management',
    subcategorySlug: 'order-confirmation',
    role: 'seller',
    text: "Assalam-o-Alaikum {{customer_name}}! Thank you for ordering from {{shop_name}}. Your order for {{product_name}} (Total: {{currency}} {{price}}) has been confirmed under Order #{{order_number}}. It will be dispatched via {{courier}} to your address: {{address}}. Estimated delivery: 2-4 working days.",
    tone: 'polite',
    length: 'medium',
    language: 'English',
    tags: ['order confirmation', 'whatsapp message', 'invoice', 'address verification'],
    copyCount: 42100,
    favoriteCount: 9400,
    recipient: 'Customer',
    occasion: 'Order Placement',
    businessTypes: ['clothing-fashion', 'mobiles-accessories', 'cosmetics-skincare', 'shoes-bags', 'all'],
    variables: ['customer_name', 'shop_name', 'product_name', 'currency', 'price', 'order_number', 'courier', 'address'],
    translations: {
      'en': "Assalam-o-Alaikum {{customer_name}}! Thank you for ordering from {{shop_name}}. Your order for {{product_name}} (Total: {{currency}} {{price}}) has been confirmed under Order #{{order_number}}. It will be dispatched via {{courier}} to your address: {{address}}. Estimated delivery: 2-4 working days.",
      'ur': "السلام علیکم {{customer_name}}! {{shop_name}} سے خریداری کرنے کا شکریہ۔ آپ کا {{product_name}} کا آرڈر (کل رقم: {{currency}} {{price}}) آرڈر نمبر #{{order_number}} کے تحت کنفرم ہو گیا ہے۔ یہ پارسل {{courier}} کے ذریعے آپ کے پتے: {{address}} پر روانہ کیا جائے گا۔ متوقع ترسیل: 2 سے 4 کام کے دن۔",
      'ur-latn': "Assalam-o-Alaikum {{customer_name}}! {{shop_name}} se order karne ka shukriya. Aap ka {{product_name}} ka order (Total: {{currency}} {{price}}) Order #{{order_number}} ke teht confirm ho gaya hai. Ye parcel {{courier}} ke zariye aap ke address: {{address}} par bhej diya jayega. Delivery time: 2 se 4 working days.",
      'hi': "नमस्ते {{customer_name}}! {{shop_name}} से आर्डर करने के लिए धन्यवाद। आपका {{product_name}} का आर्डर (कुल: {{currency}} {{price}}) आर्डर #{{order_number}} के तहत कन्फर्म हो गया है। इसे {{courier}} के द्वारा आपके पते: {{address}} पर भेजा जाएगा। संभावित डिलीवरी: 2-4 कार्य दिवस।",
      'ar': "وعليكم السلام {{customer_name}}! شكرًا لطلبك من {{shop_name}}. تم تأكيد طلبك لـ {{product_name}} (المجموع: {{currency}} {{price}}) برقم الطلب #{{order_number}}. سيتم شحنه عبر {{courier}} إلى عنوانك: {{address}}. التوصيل المتوقع: 2 إلى 4 أيام عمل."
    }
  },
  {
    id: 'seller-ord-02',
    title: 'Order Received & Under Verification',
    categorySlug: 'order-management',
    subcategorySlug: 'order-received',
    role: 'seller',
    text: "Hello {{customer_name}}, we have received your order request for {{product_name}} at {{shop_name}}! Our team is currently verifying the stock and delivery address. You will receive a dispatch update shortly. Thank you for your patience!",
    tone: 'friendly',
    length: 'short',
    language: 'English',
    tags: ['order received', 'processing', 'acknowledgment'],
    copyCount: 28400,
    favoriteCount: 6100,
    recipient: 'Customer',
    occasion: 'New Order',
    businessTypes: ['all'],
    variables: ['customer_name', 'product_name', 'shop_name'],
    translations: {
      'en': "Hello {{customer_name}}, we have received your order request for {{product_name}} at {{shop_name}}! Our team is currently verifying the stock and delivery address. You will receive a dispatch update shortly. Thank you for your patience!",
      'ur': "ہیلو {{customer_name}}، ہمیں {{shop_name}} پر آپ کے {{product_name}} کے آرڈر کی درخواست موصول ہو گئی ہے! ہماری ٹیم اسٹاک اور ترسیل کے پتے کی تصدیق کر رہی ہے۔ جلد ہی آپ کو ترسیل کی تفصیلات موصول ہوں گی۔ آپ کے صبر کا شکریہ!",
      'ur-latn': "Hello {{customer_name}}, humein {{shop_name}} par aap ke {{product_name}} ke order ki request mil gayi hai! Hamari team stock aur delivery address check kar rahi hai. Jaldi hi aap ko dispatch update milega. Shukriya!",
      'hi': "नमस्ते {{customer_name}}, हमें {{shop_name}} पर {{product_name}} के लिए आपका आर्डर अनुरोध प्राप्त हुआ है! हमारी टीम स्टॉक और डिलीवरी पते की जांच कर रही है। जल्द ही आपको अपडेट भेजा जाएगा।"
    }
  },
  {
    id: 'seller-ord-03',
    title: 'Out-of-Stock Polite Apology with Alternatives',
    categorySlug: 'order-management',
    subcategorySlug: 'out-of-stock-notice',
    role: 'seller',
    text: "Dear {{customer_name}}, thank you for choosing {{shop_name}}. Unfortunately, {{product_name}} just went out of stock due to high demand. We sincerely apologize for this inconvenience! We have similar designs available, or we can notify you once fresh stock arrives in 3 days. Would you like to see alternative options?",
    tone: 'apologetic',
    length: 'medium',
    language: 'English',
    tags: ['out of stock', 'apology', 'alternatives', 'customer care'],
    copyCount: 21900,
    favoriteCount: 5200,
    recipient: 'Customer',
    occasion: 'Stock Shortage',
    businessTypes: ['clothing-fashion', 'shoes-bags', 'cosmetics-skincare', 'all'],
    variables: ['customer_name', 'shop_name', 'product_name'],
    translations: {
      'en': "Dear {{customer_name}}, thank you for choosing {{shop_name}}. Unfortunately, {{product_name}} just went out of stock due to high demand. We sincerely apologize for this inconvenience! We have similar designs available, or we can notify you once fresh stock arrives in 3 days. Would you like to see alternative options?",
      'ur': "محترم {{customer_name}}، {{shop_name}} کا انتخاب کرنے کا شکریہ۔ بدقسمتی سے زیادہ مانگ کی وجہ سے {{product_name}} کا اسٹاک ختم ہو گیا ہے۔ ہم اس تکلیف کے لیے دل سے معذرت خواہ ہیں! ہمارے پاس ملتے جلتے متبادل ڈیزائن موجود ہیں، یا 3 دنوں میں نیا اسٹاک آنے پر ہم آپ کو آگاہ کر سکتے ہیں۔ کیا آپ متبادل ڈیزائن دیکھنا پسند کریں گے؟",
      'ur-latn': "Dear {{customer_name}}, {{shop_name}} choose karne ka shukriya. Badqismati se zyada demand ki wajah se {{product_name}} ka stock khatam ho gaya hai. Is takleef ke liye nihayat maazrat khwah hain! Hamare paas milte julte designs available hain, ya 3 din mein fresh stock aane par inform kar sakte hain. Kya aap alternatives dekhna chahenge?",
      'hi': "प्रिय {{customer_name}}, {{shop_name}} चुनने के लिए धन्यवाद। अत्यधिक मांग के कारण {{product_name}} का स्टॉक समाप्त हो गया है। असुविधा के लिए हमें गहरा खेद है! क्या आप मिलते-जुलते विकल्प देखना चाहेंगे?"
    }
  },

  // ==========================================
  // SELLER: PAYMENT & BANKING
  // ==========================================
  {
    id: 'seller-pay-01',
    title: 'JazzCash / Easypaisa & Bank Payment Instructions',
    categorySlug: 'payment-banking',
    subcategorySlug: 'payment-instructions',
    role: 'seller',
    text: "Dear {{customer_name}}, to confirm your order #{{order_number}} of {{currency}} {{price}}, please transfer the payment via one of the following methods:\n\n📱 JazzCash / Easypaisa: {{payment_method}}\nAccount Title: {{shop_name}}\n\n🏦 Bank Transfer: Available upon request.\n\nAfter making the payment, please share a screenshot of the transaction receipt here so we can dispatch your parcel right away. Thank you!",
    tone: 'polite',
    length: 'medium',
    language: 'English',
    tags: ['jazzcash', 'easypaisa', 'bank transfer', 'advance payment', 'screenshot'],
    copyCount: 51200,
    favoriteCount: 14200,
    recipient: 'Customer',
    occasion: 'Payment Request',
    businessTypes: ['all'],
    variables: ['customer_name', 'order_number', 'currency', 'price', 'payment_method', 'shop_name'],
    translations: {
      'en': "Dear {{customer_name}}, to confirm your order #{{order_number}} of {{currency}} {{price}}, please transfer the payment via one of the following methods:\n\n📱 JazzCash / Easypaisa: {{payment_method}}\nAccount Title: {{shop_name}}\n\nAfter making the payment, please share a screenshot of the transaction receipt here so we can dispatch your parcel right away. Thank you!",
      'ur': "محترم {{customer_name}}، اپنے آرڈر #{{order_number}} (رقم: {{currency}} {{price}}) کی تصدیق کے لیے، براہ کرم درج ذیل طریقے سے ادائیگی بھیجیں:\n\n📱 جاز کیش / ایزی پیسہ: {{payment_method}}\nاکاؤنٹ ٹائٹل: {{shop_name}}\n\nادائیگی کے بعد، براہ کرم ٹرانزیکشن رسید کا اسکرین شاٹ یہاں بھیجیں تاکہ آپ کا پارسل فوری روانہ کیا جا سکے۔ شکریہ!",
      'ur-latn': "Dear {{customer_name}}, apne order #{{order_number}} (Amount: {{currency}} {{price}}) ko confirm karne ke liye barah-e-karam payment in accounts par send karein:\n\n📱 JazzCash / Easypaisa: {{payment_method}}\nAccount Title: {{shop_name}}\n\nPayment bhej kar transaction ka screenshot yahan share kar dein taake aap ka parcel fauran dispatch kiya ja sake. Shukriya!",
      'hi': "प्रिय {{customer_name}}, अपने आर्डर #{{order_number}} (रकम: {{currency}} {{price}}) को कन्फर्म करने के लिए भुगतान इन नंबरों पर भेजें:\n\n📱 मोबाइल वॉलेट: {{payment_method}}\nखाता नाम: {{shop_name}}\n\nभुगतान के बाद कृपया रसीद का स्क्रीनशॉट यहाँ साझा करें ताकि आपका पार्सल तुरंत भेजा जा सके। धन्यवाद!"
    }
  },
  {
    id: 'seller-pay-02',
    title: 'Payment Received Confirmation',
    categorySlug: 'payment-banking',
    subcategorySlug: 'payment-received',
    role: 'seller',
    text: "Assalam-o-Alaikum {{customer_name}}! We have successfully received your payment of {{currency}} {{price}} for Order #{{order_number}}. Your parcel has been queued for packaging and will be handed over to {{courier}} today. Thank you for your prompt payment!",
    tone: 'friendly',
    length: 'short',
    language: 'English',
    tags: ['payment received', 'receipt verified', 'fast confirmation'],
    copyCount: 39800,
    favoriteCount: 8900,
    recipient: 'Customer',
    occasion: 'Payment Acknowledgment',
    businessTypes: ['all'],
    variables: ['customer_name', 'currency', 'price', 'order_number', 'courier'],
    translations: {
      'en': "Assalam-o-Alaikum {{customer_name}}! We have successfully received your payment of {{currency}} {{price}} for Order #{{order_number}}. Your parcel has been queued for packaging and will be handed over to {{courier}} today. Thank you for your prompt payment!",
      'ur': "السلام علیکم {{customer_name}}! ہمیں آپ کے آرڈر #{{order_number}} کی {{currency}} {{price}} کی ادائیگی کامیابی سے موصول ہو گئی ہے۔ آپ کا پارسل پیکنگ میں جا چکا ہے اور آج ہی {{courier}} کے حوالے کر دیا جائے گا۔ بروقت ادائیگی کا بہت شکریہ!",
      'ur-latn': "Assalam-o-Alaikum {{customer_name}}! Humein aap ke order #{{order_number}} ki payment ({{currency}} {{price}}) kamyabi se mil gayi hai. Aap ka parcel packing mein hai aur aaj hi {{courier}} ko hand-over kar diya jayega. Shukriya!",
      'hi': "नमस्ते {{customer_name}}! हमें आपके आर्डर #{{order_number}} के लिए {{currency}} {{price}} का भुगतान सफलतापूर्वक प्राप्त हो गया है। आपका पार्सल आज ही {{courier}} को सौंप दिया जाएगा। धन्यवाद!"
    }
  },

  // ==========================================
  // SELLER: SHIPPING, TRACKING & DELIVERY
  // ==========================================
  {
    id: 'seller-ship-01',
    title: 'Parcel Dispatched with Tracking Number',
    categorySlug: 'shipping-delivery',
    subcategorySlug: 'parcel-dispatched',
    role: 'seller',
    text: "Great news {{customer_name}}! 📦 Your parcel from {{shop_name}} has been dispatched via {{courier}}.\n\nTracking Number: {{tracking_number}}\nExpected Delivery: 2-3 working days.\nTotal Payable (COD): {{currency}} {{price}}\n\nPlease keep the exact cash amount ready upon arrival. Thank you for supporting our small business!",
    tone: 'polite',
    length: 'medium',
    language: 'English',
    tags: ['parcel dispatched', 'tracking id', 'courier', 'tcs', 'leopards', 'trax'],
    copyCount: 56300,
    favoriteCount: 16100,
    recipient: 'Customer',
    occasion: 'Shipment Dispatch',
    businessTypes: ['all'],
    variables: ['customer_name', 'shop_name', 'courier', 'tracking_number', 'currency', 'price'],
    translations: {
      'en': "Great news {{customer_name}}! 📦 Your parcel from {{shop_name}} has been dispatched via {{courier}}.\n\nTracking Number: {{tracking_number}}\nExpected Delivery: 2-3 working days.\nTotal Payable (COD): {{currency}} {{price}}\n\nPlease keep the exact cash amount ready upon arrival. Thank you for supporting our small business!",
      'ur': "خوشخبری {{customer_name}}! 📦 {{shop_name}} سے آپ کا پارسل {{courier}} کے ذریعے روانہ کر دیا گیا ہے۔\n\nٹریکنگ نمبر: {{tracking_number}}\nمتوقع ترسیل: 2 سے 3 کام کے دن۔\nواجب الادا رقم (سی او ڈی): {{currency}} {{price}}\n\nبراہ کرم ترسیل کے وقت نقد رقم تیار رکھیں۔ ہمارے کاروبار کو سپورٹ کرنے کا شکریہ!",
      'ur-latn': "Great news {{customer_name}}! 📦 {{shop_name}} se aap ka parcel {{courier}} ke zariye dispatch ho gaya hai.\n\nTracking Number: {{tracking_number}}\nDelivery Time: 2 se 3 working days.\nTotal COD: {{currency}} {{price}}\n\nParcel aane par exact amount tayyar rakhein. Hamare store se shopping karne ka shukriya!",
      'hi': "शुभ समाचार {{customer_name}}! 📦 {{shop_name}} से आपका पार्सल {{courier}} के द्वारा भेज दिया गया है।\n\nट्रैकिंग नंबर: {{tracking_number}}\nअनुमानित डिलीवरी: 2-3 दिन।\nकुल देय राशि: {{currency}} {{price}}\n\nडिलीवरी के समय सही नकद राशि तैयार रखें। धन्यवाद!"
    }
  },
  {
    id: 'seller-ship-02',
    title: 'Complete Address & Contact Request',
    categorySlug: 'shipping-delivery',
    subcategorySlug: 'address-confirmation',
    role: 'seller',
    text: "Assalam-o-Alaikum {{customer_name}}, to ensure smooth delivery without courier delays, please confirm your full postal details:\n\n• House / Flat Number:\n• Street & Sector / Mohallah:\n• Landmark / Famous Location Nearby:\n• City: {{city}}\n• 2 Active Contact Phone Numbers:\n\nOnce shared, we will book your parcel immediately!",
    tone: 'polite',
    length: 'medium',
    language: 'English',
    tags: ['address confirmation', 'phone number', 'courier accuracy'],
    copyCount: 44200,
    favoriteCount: 11200,
    recipient: 'Customer',
    occasion: 'Address Verification',
    businessTypes: ['all'],
    variables: ['customer_name', 'city'],
    translations: {
      'en': "Assalam-o-Alaikum {{customer_name}}, to ensure smooth delivery without courier delays, please confirm your full postal details:\n\n• House / Flat Number:\n• Street & Sector / Mohallah:\n• Landmark Nearby:\n• City: {{city}}\n• 2 Active Phone Numbers:\n\nOnce shared, we will book your parcel immediately!",
      'ur': "السلام علیکم {{customer_name}}، بروقت اور درست ترسیل کے لیے براہ کرم اپنا مکمل پتہ تصدیق فرمائیں:\n\n• مکان / فلیٹ نمبر:\n• گلی، سیکٹر یا محلہ:\n• قریبی مشہور جگہ / لینڈ مارک:\n• شہر: {{city}}\n• 2 فعال فون نمبرز:\n\nتفصیلات ملتے ہی آپ کا پارسل بک کر دیا جائے گا!",
      'ur-latn': "Assalam-o-Alaikum {{customer_name}}, courier delay se bachne ke liye barah-e-karam apna mukammal address share karein:\n\n• House / Flat No:\n• Street / Mohallah:\n• Qareebi Mashhoor Jagah (Landmark):\n• City: {{city}}\n• 2 Active Mobile Numbers:\n\nAddress aate hi parcel foran book kar denge!",
      'hi': "नमस्ते {{customer_name}}, सही समय पर डिलीवरी के लिए कृपया अपना पूरा डाक पता साझा करें:\n\n• मकान नंबर:\n• गली / मोहल्ला:\n• नजदीकी प्रसिद्ध स्थल (Landmark):\n• शहर: {{city}}\n• 2 चालू मोबाइल नंबर:"
    }
  },

  // ==========================================
  // SELLER: CUSTOMER SUPPORT & COMPLAINTS
  // ==========================================
  {
    id: 'seller-sup-01',
    title: 'De-escalating Angry Customer with Empathy',
    categorySlug: 'customer-support-complaints',
    subcategorySlug: 'angry-customer-response',
    role: 'seller',
    text: "Dear {{customer_name}}, I completely understand your frustration and you have every right to feel upset about this issue. This is definitely not the standard we pride ourselves on at {{shop_name}}. Please accept our deepest personal apology. I am personally taking charge of your case right now. Could you please share a quick photo of the issue so I can issue an immediate replacement or full refund? We will make this 100% right for you.",
    tone: 'apologetic',
    length: 'medium',
    language: 'English',
    tags: ['de-escalation', 'angry customer', 'apology', 'refund promise', 'replacement'],
    copyCount: 38700,
    favoriteCount: 11900,
    recipient: 'Frustrated Customer',
    occasion: 'Customer Complaint',
    businessTypes: ['all'],
    variables: ['customer_name', 'shop_name'],
    translations: {
      'en': "Dear {{customer_name}}, I completely understand your frustration and you have every right to feel upset about this issue. This is definitely not the standard we pride ourselves on at {{shop_name}}. Please accept our deepest personal apology. I am personally taking charge of your case right now. Could you please share a quick photo of the issue so I can issue an immediate replacement or full refund? We will make this 100% right for you.",
      'ur': "محترم {{customer_name}}، میں آپ کی ناراضگی کو مکمل طور پر سمجھتا ہوں اور آپ کو غصہ ہونے کا پورا حق ہے۔ یہ معیار ہرگز وہ نہیں جس پر ہم {{shop_name}} میں فخر کرتے ہیں۔ براہ کرم ہماری دلی معذرت قبول فرمائیں۔ میں خود آپ کے معاملے کو حل کر رہا ہوں۔ کیا آپ مسئلے کی ایک تصویر بھیج سکتے ہیں تاکہ میں فوری متبادل یا رقم کی واپسی کا بندوبست کروں؟ ہم آپ کو 100٪ مطمئن کریں گے۔",
      'ur-latn': "Dear {{customer_name}}, main aap ki pareshani aur narazgi ko bilkul samajhta hoon. {{shop_name}} par ye hamara standard bilkul nahi hai. Barah-e-karam hamari dilli maazrat qabool karein. Main personally aap ke masle ko hal kar raha hoon. Kya aap defect ki tasveer bhej sakte hain taake fauran replacement ya refund kar sakein? Hum aap ko 100% satisfy karenge.",
      'hi': "प्रिय {{customer_name}}, मैं आपकी नाराजगी को पूरी तरह समझता हूँ। {{shop_name}} पर यह हमारी सेवा का स्तर बिल्कुल नहीं है। कृपया हमारी क्षमा स्वीकार करें। मैं स्वयं आपके मामले को देख रहा हूँ। क्या आप समस्या की तस्वीर भेज सकते हैं ताकि तुरंत समाधान किया जा सके?"
    }
  },

  // ==========================================
  // SELLER: DAILY QUICK REPLIES (WHATSAPP FAST)
  // ==========================================
  {
    id: 'seller-qr-01',
    title: 'Yes, Available & Ready to Ship',
    categorySlug: 'daily-quick-replies',
    subcategorySlug: 'yes-available',
    role: 'seller',
    text: "Ji bilkul, {{product_name}} stock mein available hai! Price: {{currency}} {{price}} (Delivery charges: {{delivery_charges}}). Agar aap order place karna chahte hain to kindly apna Name, Complete Address aur Phone Number share kar dein.",
    tone: 'direct',
    length: 'short',
    language: 'English',
    isQuickReply: true,
    tags: ['quick reply', 'yes available', 'fast checkout', 'whatsapp ready'],
    copyCount: 68400,
    favoriteCount: 19800,
    recipient: 'Inquiring Buyer',
    occasion: 'Stock Inquiry',
    businessTypes: ['clothing-fashion', 'mobiles-accessories', 'cosmetics-skincare', 'all'],
    variables: ['product_name', 'currency', 'price', 'delivery_charges'],
    translations: {
      'en': "Yes, absolutely! {{product_name}} is in stock and ready to ship. Price: {{currency}} {{price}} (+ Delivery: {{delivery_charges}}). To confirm your order, please share your Name, Address, and Phone Number.",
      'ur': "جی بالکل، {{product_name}} اسٹاک میں موجود ہے! قیمت: {{currency}} {{price}} (ڈلیوری چارجز: {{delivery_charges}})۔ اگر آپ آرڈر بک کرنا چاہتے ہیں تو برائے مہربانی اپنا نام، مکمل پتہ اور موبائل نمبر شیئر فرما دیں۔",
      'ur-latn': "Ji bilkul, {{product_name}} stock mein available hai! Price: {{currency}} {{price}} (Delivery: {{delivery_charges}}). Order confirm karne ke liye apna Name, Address aur Mobile number share kar dein.",
      'hi': "जी हाँ, बिल्कुल! {{product_name}} स्टॉक में उपलब्ध है। कीमत: {{currency}} {{price}} (डिलीवरी: {{delivery_charges}})। आर्डर के लिए अपना नाम, पता और फ़ोन नंबर भेजें।"
    }
  },
  {
    id: 'seller-qr-02',
    title: 'Please Share Location & Complete Address',
    categorySlug: 'daily-quick-replies',
    subcategorySlug: 'share-location-address',
    role: 'seller',
    text: "Kindly share your complete delivery address (House #, Street, Area, City) along with 2 active mobile numbers so we can book your parcel.",
    tone: 'polite',
    length: 'short',
    language: 'English',
    isQuickReply: true,
    tags: ['address prompt', 'quick reply', 'whatsapp'],
    copyCount: 61200,
    favoriteCount: 17400,
    recipient: 'Customer',
    occasion: 'Address Request',
    businessTypes: ['all'],
    variables: [],
    translations: {
      'en': "Kindly share your complete delivery address (House #, Street, Area, City) along with 2 active mobile numbers so we can book your parcel.",
      'ur': "برائے مہربانی اپنا مکمل پتہ (مکان نمبر، گلی، علاقہ، شہر) اور 2 موبائل نمبر شیئر کر دیں تاکہ ہم آپ کا پارسل بک کر سکیں۔",
      'ur-latn': "Kindly apna complete delivery address (House #, Street, Area, City) aur 2 active mobile numbers share kar dein taake parcel book kar sakein.",
      'hi': "कृपया अपना पूरा पता (मकान नं., गली, क्षेत्र, शहर) और 2 चालू मोबाइल नंबर साझा करें ताकि पार्सल बुक किया जा सके।"
    }
  },
  {
    id: 'seller-qr-03',
    title: 'Please Send Payment Screenshot',
    categorySlug: 'daily-quick-replies',
    subcategorySlug: 'please-send-screenshot',
    role: 'seller',
    text: "Payment transfer karne ke baad transaction ki receipt / screenshot zaroor share kijiyega taake aap ka order confirm ho sake. Shukriya!",
    tone: 'direct',
    length: 'short',
    language: 'English',
    isQuickReply: true,
    tags: ['screenshot prompt', 'payment proof', 'quick reply'],
    copyCount: 58900,
    favoriteCount: 16200,
    recipient: 'Customer',
    occasion: 'Payment Verification',
    businessTypes: ['all'],
    variables: [],
    translations: {
      'en': "After transferring the payment, please share the transaction screenshot/receipt here so we can confirm your order immediately. Thank you!",
      'ur': "ادائیگی بھیجنے کے بعد ٹرانزیکشن کی رسید یا اسکرین شاٹ ضرور شیئر کیجیے گا تاکہ آپ کا آرڈر فوری کنفرم کیا جا سکے۔ شکریہ!",
      'ur-latn': "Payment bhej kar transaction ka screenshot / receipt zaroor share karein taake aap ka order fauran confirm kiya ja sake. Shukriya!",
      'hi': "भुगतान करने के बाद कृपया रसीद या स्क्रीनशॉट यहाँ साझा करें ताकि आपका आर्डर तुरंत कन्फर्म हो सके। धन्यवाद!"
    }
  },

  // ==========================================
  // CUSTOMER: PRODUCT INQUIRIES & AVAILABILITY
  // ==========================================
  {
    id: 'cust-inq-01',
    title: 'Product Price & Delivery Charges to City Inquiry',
    categorySlug: 'product-price-inquiry',
    subcategorySlug: 'price-delivery-charges',
    role: 'customer',
    text: "Assalam-o-Alaikum! Can you please tell me the final price of {{product_name}} along with delivery charges to {{city}}? Also, what is the expected delivery time?",
    tone: 'polite',
    length: 'short',
    language: 'English',
    tags: ['customer inquiry', 'price check', 'delivery cost', 'city inquiry'],
    copyCount: 47800,
    favoriteCount: 12400,
    recipient: 'Seller',
    occasion: 'Price Inquiry',
    variables: ['product_name', 'city'],
    translations: {
      'en': "Assalam-o-Alaikum! Can you please tell me the final price of {{product_name}} along with delivery charges to {{city}}? Also, what is the expected delivery time?",
      'ur': "السلام علیکم! کیا آپ برائے مہربانی {{product_name}} کی حتمی قیمت اور {{city}} کے لیے ڈلیوری چارجز بتا سکتے ہیں؟ اور پارسل کتنے دنوں میں پہنچ جائے گا؟",
      'ur-latn': "Assalam-o-Alaikum! Kya aap please {{product_name}} ki final price aur {{city}} ke delivery charges bata sakte hain? Aur delivery kitne din mein mil jayegi?",
      'hi': "नमस्ते! क्या आप कृपया {{product_name}} की अंतिम कीमत और {{city}} के लिए डिलीवरी शुल्क बता सकते हैं? और डिलीवरी में कितना समय लगेगा?",
      'ar': "وعليكم السلام! هل يمكنك إخباري بالسعر النهائي لـ {{product_name}} مع رسوم التوصيل إلى {{city}}؟ وما هو وقت التوصيل المتوقع؟"
    }
  },
  {
    id: 'cust-inq-02',
    title: 'Request for Real Product Pictures / Video',
    categorySlug: 'product-price-inquiry',
    subcategorySlug: 'real-photos-video',
    role: 'customer',
    text: "Hello! I am very interested in ordering {{product_name}}. Could you please share a short real video or non-edited daylight pictures of the item? I want to see the exact fabric/color before confirming. Thank you!",
    tone: 'polite',
    length: 'short',
    language: 'English',
    tags: ['real pictures', 'unfiltered video', 'quality check'],
    copyCount: 39500,
    favoriteCount: 10800,
    recipient: 'Seller',
    occasion: 'Quality Inspection',
    variables: ['product_name'],
    translations: {
      'en': "Hello! I am very interested in ordering {{product_name}}. Could you please share a short real video or non-edited daylight pictures of the item? I want to see the exact fabric/color before confirming. Thank you!",
      'ur': "ہیلو! میں {{product_name}} کا آرڈر دینا چاہتا ہوں۔ کیا آپ برائے مہربانی اس چیز کی اصل ویڈیو یا قدرتی روشنی میں کھینچی گئی غیر ترمیم شدہ تصاویر بھیج سکتے ہیں؟ میں آرڈر کرنے سے پہلے اصل رنگ اور کوالٹی دیکھنا چاہتا ہوں۔ شکریہ!",
      'ur-latn': "Hello! Main {{product_name}} order karna chahta hoon. Kya aap is ki real video ya daylight mein li gayi real pictures share kar sakte hain? Final confirm karne se pehle fabric/color check karna hai. Shukriya!",
      'hi': "नमस्ते! मैं {{product_name}} आर्डर करना चाहता हूँ। क्या आप कृपया बिना एडिट की गई वास्तविक तस्वीरें या वीडियो भेज सकते हैं ताकि मैं रंग और गुणवत्ता देख सकूँ? धन्यवाद!"
    }
  },

  // ==========================================
  // CUSTOMER: ORDER PLACEMENT & TRACKING
  // ==========================================
  {
    id: 'cust-ord-01',
    title: 'Complete Order Placement with Delivery Details',
    categorySlug: 'order-placement-tracking',
    subcategorySlug: 'order-placement-address',
    role: 'customer',
    text: "Assalam-o-Alaikum! Please confirm my order for {{product_name}} on Cash on Delivery (COD).\n\nHere are my complete details:\n• Full Name: {{customer_name}}\n• Phone Number: {{contact_number}}\n• Complete Delivery Address: {{address}}, {{city}}\n• Quantity: {{quantity}}\n• Total Amount: {{currency}} {{price}}\n\nPlease dispatch as soon as possible and share tracking ID once dispatched. Thank you!",
    tone: 'polite',
    length: 'medium',
    language: 'English',
    tags: ['order placement', 'full address', 'cod order', 'buyer script'],
    copyCount: 52400,
    favoriteCount: 15300,
    recipient: 'Seller',
    occasion: 'Placing Order',
    variables: ['product_name', 'customer_name', 'contact_number', 'address', 'city', 'quantity', 'currency', 'price'],
    translations: {
      'en': "Assalam-o-Alaikum! Please confirm my order for {{product_name}} on Cash on Delivery (COD).\n\nHere are my complete details:\n• Full Name: {{customer_name}}\n• Phone Number: {{contact_number}}\n• Complete Address: {{address}}, {{city}}\n• Quantity: {{quantity}}\n• Total: {{currency}} {{price}}\n\nPlease dispatch soon and share tracking ID. Thank you!",
      'ur': "السلام علیکم! براہ کرم کیش آن ڈلیوری (COD) پر {{product_name}} کے لیے میرا آرڈر بک فرما لیں۔\n\nمیری مکمل تفصیلات یہ ہیں:\n• پورا نام: {{customer_name}}\n• موبائل نمبر: {{contact_number}}\n• مکمل پتہ: {{address}}، {{city}}\n• تعداد: {{quantity}}\n• کل رقم: {{currency}} {{price}}\n\nبراہ کرم جلد روانہ کر کے ٹریکنگ آئی ڈی شیئر فرمائیں۔ شکریہ!",
      'ur-latn': "Assalam-o-Alaikum! Please mera {{product_name}} ka Cash on Delivery (COD) order confirm kar dein.\n\nMeri details ye hain:\n• Full Name: {{customer_name}}\n• Mobile No: {{contact_number}}\n• Complete Address: {{address}}, {{city}}\n• Quantity: {{quantity}}\n• Total Amount: {{currency}} {{price}}\n\nJaldi dispatch kar ke tracking ID share kar dijiyega. Shukriya!",
      'hi': "नमस्ते! कृपया कैश ऑन डिलीवरी (COD) पर {{product_name}} के लिए मेरा आर्डर बुक करें।\n\nमेरा विवरण:\n• पूरा नाम: {{customer_name}}\n• मोबाइल: {{contact_number}}\n• पूरा पता: {{address}}, {{city}}\n• मात्रा: {{quantity}}\n• कुल: {{currency}} {{price}}\n\nकृपया जल्द भेजें और ट्रैकिंग नंबर दें। धन्यवाद!"
    }
  },
  {
    id: 'cust-ord-02',
    title: 'Payment Sent Confirmation with Screenshot',
    categorySlug: 'order-placement-tracking',
    subcategorySlug: 'payment-screenshot-sent',
    role: 'customer',
    text: "Assalam-o-Alaikum! I have transferred {{currency}} {{price}} to your {{payment_method}} account for Order #{{order_number}}. The transaction screenshot is attached with this message. Kindly verify and confirm dispatch. Thank you!",
    tone: 'polite',
    length: 'short',
    language: 'English',
    tags: ['screenshot attached', 'payment sent', 'advance paid'],
    copyCount: 46200,
    favoriteCount: 12900,
    recipient: 'Seller',
    occasion: 'Payment Notification',
    variables: ['currency', 'price', 'payment_method', 'order_number'],
    translations: {
      'en': "Assalam-o-Alaikum! I have transferred {{currency}} {{price}} to your {{payment_method}} account for Order #{{order_number}}. The transaction screenshot is attached. Kindly verify and confirm dispatch. Thank you!",
      'ur': "السلام علیکم! میں نے آرڈر #{{order_number}} کے لیے {{currency}} {{price}} آپ کے {{payment_method}} اکاؤنٹ میں بھیج دیے ہیں۔ رسید کا اسکرین شاٹ ساتھ منسلک ہے۔ براہ کرم تصدیق کر کے ترسیل کا عمل شروع کریں۔ شکریہ!",
      'ur-latn': "Assalam-o-Alaikum! Maine order #{{order_number}} ke liye {{currency}} {{price}} aap ke {{payment_method}} account mein transfer kar diye hain. Transaction ka screenshot attach hai. Please verify kar ke confirm karein. Shukriya!",
      'hi': "नमस्ते! मैंने आर्डर #{{order_number}} के लिए {{currency}} {{price}} आपके {{payment_method}} खाते में ट्रांसफर कर दिए हैं। स्क्रीनशॉट संलग्न है। कृपया जांच कर पुष्टि करें। धन्यवाद!"
    }
  },

  // ==========================================
  // CUSTOMER: COMPLAINTS, RETURNS & REFUNDS
  // ==========================================
  {
    id: 'cust-comp-01',
    title: 'Damaged or Wrong Product Received Complaint',
    categorySlug: 'complaints-returns-refunds',
    subcategorySlug: 'damaged-wrong-product',
    role: 'customer',
    text: "Assalam-o-Alaikum. I received my parcel for Order #{{order_number}} today, but unfortunately the {{product_name}} is damaged / not what was shown in the pictures. I have attached unboxing photos and video for your review. Please guide me on the return or exchange procedure. I hope you will resolve this swiftly.",
    tone: 'polite',
    length: 'medium',
    language: 'English',
    tags: ['damaged item', 'wrong product', 'exchange request', 'polite complaint'],
    copyCount: 36700,
    favoriteCount: 9400,
    recipient: 'Seller',
    occasion: 'Product Defect Complaint',
    variables: ['order_number', 'product_name'],
    translations: {
      'en': "Assalam-o-Alaikum. I received my parcel for Order #{{order_number}} today, but unfortunately the {{product_name}} is damaged / not what was shown in the pictures. I have attached photos and video. Please guide me on the exchange procedure. Thank you.",
      'ur': "السلام علیکم۔ مجھے آج اپنے آرڈر #{{order_number}} کا پارسل موصول ہوا، لیکن بدقسمتی سے {{product_name}} خراب ہے / تصویر کے مطابق نہیں ہے۔ میں نے ثبوت کے لیے تصاویر اور ویڈیو ساتھ لگائی ہے۔ براہ کرم واپسی یا تبدیلی کے طریقہ کار سے آگاہ کریں۔ شکریہ۔",
      'ur-latn': "Assalam-o-Alaikum. Mujhe aaj order #{{order_number}} ka parcel mila hai, lekin {{product_name}} damaged hai / pictures jaisa nahi hai. Maine unboxing video aur photos attach ki hain. Please exchange ya return ka process bata dein. Shukriya.",
      'hi': "नमस्ते। मुझे आर्डर #{{order_number}} का पार्सल मिला, लेकिन {{product_name}} क्षतिग्रस्त / गलत है। मैंने तस्वीरें और वीडियो संलग्न किए हैं। कृपया बदलने या रिफंड की प्रक्रिया बताएं।"
    }
  },

  // ==========================================
  // CUSTOMER: DISCOUNTS & NEGOTIATION
  // ==========================================
  {
    id: 'cust-disc-01',
    title: 'Polite Multi-Item Discount Request',
    categorySlug: 'discounts-price-negotiation',
    subcategorySlug: 'polite-discount-request',
    role: 'customer',
    text: "Hello! I am planning to purchase {{quantity}} pieces of {{product_name}} from your shop. Is there any bundle discount or free delivery consideration you could offer for this order? I would love to become a regular customer of {{shop_name}}. Looking forward to your response!",
    tone: 'persuasive',
    length: 'short',
    language: 'English',
    tags: ['discount request', 'price negotiation', 'bulk buying', 'polite customer'],
    copyCount: 33400,
    favoriteCount: 8800,
    recipient: 'Seller',
    occasion: 'Discount Negotiation',
    variables: ['quantity', 'product_name', 'shop_name'],
    translations: {
      'en': "Hello! I am planning to purchase {{quantity}} pieces of {{product_name}} from your shop. Is there any bundle discount or free delivery you could offer? I would love to become a regular customer of {{shop_name}}. Looking forward to your reply!",
      'ur': "ہیلو! میں آپ کی دکان سے {{product_name}} کے {{quantity}} پیس خریدنے کا ارادہ رکھتا ہوں۔ کیا اس آرڈر پر کوئی رعایتی رعایت یا مفت ڈلیوری دی جا سکتی ہے؟ میں {{shop_name}} کا مستقل گاہک بننا چاہتا ہوں۔ آپ کے جواب کا منتظر رہوں گا!",
      'ur-latn': "Hello! Main aap ke store se {{product_name}} ke {{quantity}} pieces lena chahta hoon. Kya is order par koi special discount ya free delivery mil sakti hai? Main regular customer banna chahta hoon. Reply ka intezar rahega!",
      'hi': "नमस्ते! मैं आपकी दुकान से {{product_name}} के {{quantity}} पीस खरीदना चाहता हूँ। क्या इस पर कोई विशेष छूट या मुफ्त डिलीवरी संभव है? धन्यवाद!"
    }
  }
];
