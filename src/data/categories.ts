import { Category } from '../types';

export const CATEGORIES: Category[] = [
  {
    id: 'love-romance',
    slug: 'love-romance',
    name: 'Love, Romance & Relationship',
    icon: 'Heart',
    description: 'Heartfelt, passionate, and cute messages for partners, crushes, anniversaries, and long-distance lovers.',
    badge: 'Popular',
    gradient: 'from-rose-500 to-pink-600',
    accentColor: 'rose',
    seoTitle: 'Love & Romance Messages, Romantic Quotes & Texts | Velora AI',
    seoDescription: 'Discover romantic messages, deep relationship love notes, and sweet cute texts for boyfriend, girlfriend, husband, or wife.',
    subcategories: [
      { slug: 'deep-love', name: 'Deep & Soulful Love', description: 'Intense and unconditional love expressions.' },
      { slug: 'cute-flirty', name: 'Cute & Flirty Texts', description: 'Playful sparks and charming compliments.' },
      { slug: 'long-distance', name: 'Long-Distance Love', description: 'Words that bridge time zones and miles.' },
      { slug: 'anniversary-romance', name: 'Anniversary Romance', description: 'Celebrating milestones and shared memories.' },
      { slug: 'crush-confession', name: 'Crush Confessions', description: 'Sweet and brave ways to express your feelings.' }
    ]
  },
  {
    id: 'birthday-anniversary',
    slug: 'birthday-anniversary',
    name: 'Birthday & Anniversary',
    icon: 'Cake',
    description: 'Celebrate milestones with memorable birthday wishes, milestone anniversaries, and warm congratulations.',
    badge: 'Trending',
    gradient: 'from-amber-500 to-orange-600',
    accentColor: 'amber',
    seoTitle: 'Birthday Wishes & Anniversary Messages Library | Velora AI',
    seoDescription: 'Curated birthday wishes for best friends, parents, partners, and coworkers, plus heartfelt milestone anniversary notes.',
    subcategories: [
      { slug: 'best-friend-birthday', name: 'Best Friend Birthday', description: 'Funny, emotional, and iconic bday wishes.' },
      { slug: 'milestone-birthday', name: 'Milestone Birthdays (18th, 21st, 30th, 50th)', description: 'Commemorating big age markers in style.' },
      { slug: 'wedding-anniversary', name: 'Wedding Anniversary', description: 'Honoring years of love, loyalty, and partnership.' },
      { slug: 'work-anniversary', name: 'Work & Professional Anniversary', description: 'Celebrating company tenure and dedication.' },
      { slug: 'belated-birthday', name: 'Belated Birthday Wishes', description: 'Charming and forgiving late wishes.' }
    ]
  },
  {
    id: 'good-morning-night',
    slug: 'good-morning-night',
    name: 'Good Morning & Good Night',
    icon: 'Sun',
    description: 'Start days with uplifting energy and end evenings with peaceful, tender, or loving good night thoughts.',
    gradient: 'from-sky-500 to-indigo-600',
    accentColor: 'sky',
    seoTitle: 'Good Morning & Good Night Messages & Texts | Velora AI',
    seoDescription: 'Inspiring morning greetings, sweet romantic bedtime texts, and peaceful night blessings for everyone you care about.',
    subcategories: [
      { slug: 'romantic-morning', name: 'Romantic Morning Notes', description: 'Waking up thinking of your special someone.' },
      { slug: 'inspirational-morning', name: 'Productive & Uplifting Morning', description: 'Kickstart the day with positive mindset.' },
      { slug: 'peaceful-night', name: 'Peaceful & Sweet Good Night', description: 'Gentle words to drift into restful sleep.' },
      { slug: 'funny-morning', name: 'Funny Morning Greetings', description: 'Coffee humor and sleepy sarcasm to start smiling.' }
    ]
  },
  {
    id: 'friendship-best-friends',
    slug: 'friendship-best-friends',
    name: 'Friendship & Best Friends',
    icon: 'Users',
    description: 'Celebrate loyalty, shared laughter, ride-or-die bonds, and random appreciations for your true crew.',
    gradient: 'from-emerald-500 to-teal-600',
    accentColor: 'emerald',
    seoTitle: 'Best Friend Messages, Loyalty Quotes & Friend Texts | Velora AI',
    seoDescription: 'Find heartfelt friendship paragraphs, funny banter, and touching appreciation notes for your best friends.',
    subcategories: [
      { slug: 'ride-or-die', name: 'Ride-or-Die Appreciation', description: 'Unwavering gratitude for being through thick and thin.' },
      { slug: 'funny-friend-banter', name: 'Banter & Chaos', description: 'Hilarious inside jokes and teasing roasts.' },
      { slug: 'checking-in', name: 'Gentle Check-Ins', description: 'Thinking of you texts when distance or life happens.' },
      { slug: 'childhood-friends', name: 'Childhood & Old Friends', description: 'Honoring roots that never fade over the years.' }
    ]
  },
  {
    id: 'apology-forgiveness',
    slug: 'apology-forgiveness',
    name: 'Apology & Forgiveness',
    icon: 'ShieldAlert',
    description: 'Sincere, accountable, and tactful apologies to heal misunderstandings, repair trust, and ask for grace.',
    gradient: 'from-violet-500 to-purple-700',
    accentColor: 'violet',
    seoTitle: 'Apology Messages, Sincere Forgiveness Texts | Velora AI',
    seoDescription: 'Craft genuine apologies that take ownership, demonstrate empathy, and restore relationships without defensiveness.',
    subcategories: [
      { slug: 'deep-regret', name: 'Deep & Accountable Apology', description: 'Owning mistakes fully and seeking reconciliation.' },
      { slug: 'relationship-apology', name: 'Romantic & Partner Apology', description: 'Healing hurt feelings with care and affection.' },
      { slug: 'professional-apology', name: 'Professional & Business Apology', description: 'Handling client or workplace delays and missteps.' },
      { slug: 'forgiving-someone', name: 'Words of Forgiveness', description: 'Extending peace and letting go of grudges.' }
    ]
  },
  {
    id: 'thank-you-appreciation',
    slug: 'thank-you-appreciation',
    name: 'Thank You & Appreciation',
    icon: 'Sparkles',
    description: 'Show profound gratitude to mentors, hosts, donors, colleagues, and loved ones who went above and beyond.',
    gradient: 'from-cyan-500 to-blue-600',
    accentColor: 'cyan',
    seoTitle: 'Thank You Messages & Appreciation Notes | Velora AI',
    seoDescription: 'Professional and personal thank-you letters, mentor appreciation, hospitality notes, and gift acknowledgments.',
    subcategories: [
      { slug: 'mentor-teacher', name: 'Mentor & Teacher Appreciation', description: 'Recognizing guidance, wisdom, and life lessons.' },
      { slug: 'work-team-appreciation', name: 'Team & Colleague Gratitude', description: 'Praising hard work, teamwork, and support.' },
      { slug: 'hospitality-gift', name: 'Gift & Hospitality Thanks', description: 'Gracious acknowledgments for events and generosity.' },
      { slug: 'everyday-gratitude', name: 'Everyday Simple Thanks', description: 'Short and sweet tokens of sincere thankfulness.' }
    ]
  },
  {
    id: 'congratulations-achievements',
    slug: 'congratulations-achievements',
    name: 'Congratulations & Achievements',
    icon: 'Trophy',
    description: 'Honor promotions, graduations, new homes, newborn babies, awards, and life milestones.',
    badge: 'Popular',
    gradient: 'from-yellow-500 to-amber-600',
    accentColor: 'yellow',
    seoTitle: 'Congratulations Messages for Promotions, Graduations & Milestones | Velora AI',
    seoDescription: 'Celebrate victories big and small with warm congratulations, pride, and empowering encouragement.',
    subcategories: [
      { slug: 'new-job-promotion', name: 'New Job & Career Promotion', description: 'Cheering someone climbing higher in their craft.' },
      { slug: 'graduation', name: 'Graduation & Academic Success', description: 'Honoring degrees, diplomas, and bright futures.' },
      { slug: 'new-baby-parents', name: 'New Baby & Growing Family', description: 'Welcoming a new life with love and joy.' },
      { slug: 'new-home', name: 'New Home & Housewarming', description: 'Blessings for warmth, laughter, and peaceful walls.' }
    ]
  },
  {
    id: 'motivation-inspirational',
    slug: 'motivation-inspirational',
    name: 'Motivation & Inspirational Messages',
    icon: 'Flame',
    description: 'Fuel courage, resilience, focus, and relentless pursuit of dreams during tough challenges or new beginnings.',
    gradient: 'from-orange-500 to-red-600',
    accentColor: 'orange',
    seoTitle: 'Motivational Messages & Daily Inspirational Quotes | Velora AI',
    seoDescription: 'Powerful inspirational messages to conquer doubt, overcome adversity, and inspire peak human achievement.',
    subcategories: [
      { slug: 'resilience-grit', name: 'Resilience & Grit', description: 'Reminding someone that setbacks forge champions.' },
      { slug: 'monday-focus', name: 'Weekly Focus & Hustle', description: 'Igniting momentum for the days ahead.' },
      { slug: 'creative-breakthrough', name: 'Creative Breakthroughs', description: 'Overcoming creative blocks and imposter syndrome.' },
      { slug: 'self-belief', name: 'Inner Strength & Self-Belief', description: 'Affirmations of worth, tenacity, and purpose.' }
    ]
  },
  {
    id: 'sadness-support-healing',
    slug: 'sadness-support-healing',
    name: 'Sadness, Emotional Support & Healing',
    icon: 'HeartHandshake',
    description: 'Comforting, non-intrusive words for grief, illness, mental health struggles, and difficult transitions.',
    gradient: 'from-slate-500 to-zinc-700',
    accentColor: 'slate',
    seoTitle: 'Sympathy, Emotional Support & Condolence Messages | Velora AI',
    seoDescription: 'Compassionate messages for loss, grief, surgery recovery, mental health comfort, and healing presence.',
    subcategories: [
      { slug: 'sympathy-condolences', name: 'Condolences & Loss of a Loved One', description: 'Gentle honoring of grief and lasting memory.' },
      { slug: 'get-well-recovery', name: 'Get Well & Healing Wishes', description: 'Nourishing strength during sickness and recovery.' },
      { slug: 'mental-health-support', name: 'Mental Health & Quiet Presence', description: 'No unsolicited advice, just holding safe space.' },
      { slug: 'breakup-heartbreak', name: 'Comfort After Heartbreak', description: 'Empathetic validation through ending chapters.' }
    ]
  },
  {
    id: 'family-parents',
    slug: 'family-parents',
    name: 'Family & Parents',
    icon: 'Home',
    description: 'Celebrate mom, dad, siblings, grandparents, and the lifelong glue that holds families together.',
    gradient: 'from-teal-500 to-emerald-700',
    accentColor: 'teal',
    seoTitle: 'Family Messages, Mother & Father Appreciation Texts | Velora AI',
    seoDescription: 'Heart-touching words for Mother’s Day, Father’s Day, sibling bonds, and gratitude for unconditional family sacrifice.',
    subcategories: [
      { slug: 'mother-love', name: 'Mother Appreciation', description: 'Honoring maternal warmth, patience, and tireless love.' },
      { slug: 'father-respect', name: 'Father Respect & Love', description: 'Recognizing quiet strength, guidance, and wisdom.' },
      { slug: 'sibling-bond', name: 'Siblings & Laughter', description: 'The unique blend of lifelong alliance and banter.' },
      { slug: 'grandparents', name: 'Grandparents Heritage', description: 'Revering generational stories and sweet memories.' }
    ]
  },
  {
    id: 'business-professional',
    slug: 'business-professional',
    name: 'Business & Professional Communication',
    icon: 'Briefcase',
    description: 'Polished emails, executive summaries, meeting follow-ups, contract inquiries, and polite nudges.',
    gradient: 'from-blue-600 to-indigo-800',
    accentColor: 'blue',
    seoTitle: 'Professional Email Templates & Business Messages | Velora AI',
    seoDescription: 'Elevate corporate communication with persuasive, diplomatic, and crisp business email templates and outreach notes.',
    subcategories: [
      { slug: 'meeting-followup', name: 'Meeting Follow-Up & Action Items', description: 'Summarizing key decisions and aligned next steps.' },
      { slug: 'executive-briefing', name: 'Executive Status Updates', description: 'Concise high-level briefings for leadership.' },
      { slug: 'polite-reminder', name: 'Polite Reminders & Follow-Ups', description: 'Tactful follow-ups without sounding impatient.' },
      { slug: 'networking-outreach', name: 'Cold & Warm Networking', description: 'Opening doors with credible, value-driven introductions.' }
    ]
  },
  {
    id: 'customer-service-whatsapp',
    slug: 'customer-service-whatsapp',
    name: 'Customer Service & WhatsApp Business',
    icon: 'MessageSquare',
    description: 'Instant replies, order confirmations, handling complaints, refund policies, and WhatsApp quick chats.',
    badge: 'High Utility',
    gradient: 'from-emerald-600 to-green-700',
    accentColor: 'emerald',
    seoTitle: 'Customer Service Scripts & WhatsApp Business Templates | Velora AI',
    seoDescription: 'Ready-to-use customer support templates, WhatsApp canned responses, issue de-escalations, and feedback requests.',
    subcategories: [
      { slug: 'whatsapp-quick-replies', name: 'WhatsApp Quick Replies', description: 'Instant answers to hours, pricing, and orders.' },
      { slug: 'handling-complaints', name: 'De-escalating Complaints', description: 'Turning frustrated customers into loyal advocates.' },
      { slug: 'shipping-order-updates', name: 'Order & Shipping Updates', description: 'Clear tracking and reassuring fulfillment notes.' },
      { slug: 'review-feedback-request', name: 'Review & Feedback Requests', description: 'Encouraging glowing testimonials seamlessly.' }
    ]
  },
  {
    id: 'sales-marketing-followup',
    slug: 'sales-marketing-followup',
    name: 'Sales, Marketing & Follow-Ups',
    icon: 'TrendingUp',
    description: 'High-converting cold pitches, proposal follow-ups, urgency triggers, and re-engaging ghosted leads.',
    gradient: 'from-violet-600 to-pink-700',
    accentColor: 'violet',
    seoTitle: 'Sales Email Templates & Lead Follow-Up Sequences | Velora AI',
    seoDescription: 'Drive pipeline momentum with psychological hooks, value propositions, and breakup emails that trigger replies.',
    subcategories: [
      { slug: 'cold-outreach', name: 'High-Conversion Cold Outreach', description: 'Crisp problem-first emails that earn booked demos.' },
      { slug: 'proposal-followup', name: 'Post-Proposal Follow-Up', description: 'Guiding enterprise clients through decision roadblocks.' },
      { slug: 're-engaging-ghosts', name: 'Reviving Inactive & Ghosted Leads', description: 'Clever 9-word questions that wake up stalled deals.' },
      { slug: 'special-promotions', name: 'Flash Promotions & Limited Offers', description: 'Generating legitimate urgency without gimmickry.' }
    ]
  },
  {
    id: 'job-applications-workplace',
    slug: 'job-applications-workplace',
    name: 'Job Applications & Workplace',
    icon: 'FileText',
    description: 'Cover letter intros, recruiter DMs, salary negotiations, resignation notices, and peer feedback.',
    gradient: 'from-indigo-600 to-cyan-700',
    accentColor: 'indigo',
    seoTitle: 'Job Application Messages, Resignation & Recruiter Outreach | Velora AI',
    seoDescription: 'Stand out in hiring rounds with captivating recruiter messages, professional resignations, and negotiation templates.',
    subcategories: [
      { slug: 'recruiter-linkedin-dm', name: 'Recruiter & Hiring Manager DMs', description: 'Standing out from 500+ applicants in one screen.' },
      { slug: 'salary-negotiation', name: 'Salary & Compensation Negotiation', description: 'Confidently stating value and benchmark data.' },
      { slug: 'graceful-resignation', name: 'Graceful Resignation Letters', description: 'Departing with bridges intact and professional warmth.' },
      { slug: 'peer-360-review', name: '360 Performance Review Feedback', description: 'Constructive, balanced, and appreciative peer notes.' }
    ]
  },
  {
    id: 'education-students',
    slug: 'education-students',
    name: 'Education & Students',
    icon: 'GraduationCap',
    description: 'Emails to professors, study group invitations, asking for recommendation letters, and thesis acknowledgments.',
    gradient: 'from-blue-500 to-teal-600',
    accentColor: 'blue',
    seoTitle: 'Email to Professor Templates, Student & Academic Messages | Velora AI',
    seoDescription: 'Respectful student emails to professors, grade inquiries, recommendation letter requests, and study invites.',
    subcategories: [
      { slug: 'professor-inquiry', name: 'Formal Email to Professor', description: 'Asking about syllabus, deadlines, or research office hours.' },
      { slug: 'recommendation-request', name: 'Letter of Recommendation Request', description: 'Politely requesting academic and professional endorsements.' },
      { slug: 'study-group', name: 'Study Group & Project Collab', description: 'Organizing group milestones and accountability.' },
      { slug: 'thesis-acknowledgment', name: 'Thesis & Project Acknowledgments', description: 'Honoring advisors and contributors in final works.' }
    ]
  },
  {
    id: 'festivals-holidays',
    slug: 'festivals-holidays',
    name: 'Festivals, Holidays & Special Occasions',
    icon: 'Gift',
    description: 'Joyful seasonal greetings for Christmas, New Year, Diwali, Eid, Thanksgiving, Easter, and Lunar New Year.',
    badge: 'Seasonal',
    gradient: 'from-red-500 to-emerald-600',
    accentColor: 'red',
    seoTitle: 'Holiday Greetings & Festival Messages Library | Velora AI',
    seoDescription: 'Warm festive greetings for global holidays, corporate holiday cards, family wishes, and New Year resolutions.',
    subcategories: [
      { slug: 'new-year-celebration', name: 'New Year & Fresh Beginnings', description: 'Hopeful, visionary toasts for the upcoming 365 days.' },
      { slug: 'christmas-holiday', name: 'Christmas & Winter Holiday', description: 'Cozy, joyful greetings for family, friends, and clients.' },
      { slug: 'cultural-festivals', name: 'Diwali, Eid, Lunar New Year & Hanukkah', description: 'Honoring traditions with deep cultural reverence.' },
      { slug: 'thanksgiving-gratitude', name: 'Thanksgiving & Harvest Blessings', description: 'Reflecting on abundance, togetherness, and grace.' }
    ]
  },
  {
    id: 'social-captions',
    slug: 'social-captions',
    name: 'Instagram, Facebook & Social Captions',
    icon: 'Camera',
    description: 'Scroll-stopping captions, aesthetic one-liners, reels hooks, lifestyle musings, and engagement questions.',
    badge: 'Viral',
    gradient: 'from-fuchsia-500 to-rose-600',
    accentColor: 'fuchsia',
    seoTitle: 'Instagram Captions & Viral Social Media Hooks | Velora AI',
    seoDescription: 'Snappy Instagram captions, aesthetic quotes, funny one-liners, and engagement-boosting questions for social posts.',
    subcategories: [
      { slug: 'aesthetic-minimalist', name: 'Aesthetic & Minimalist One-Liners', description: 'Understated elegance for photo dumps and portraits.' },
      { slug: 'travel-wanderlust', name: 'Travel & Adventure Wanderlust', description: 'Capturing passport stamps, sunsets, and horizon dreams.' },
      { slug: 'witty-savage', name: 'Witty, Savage & Confident', description: 'Bold attitude and humorous self-awareness.' },
      { slug: 'fitness-grind', name: 'Fitness & Daily Routine Grind', description: 'Honest sweat, gym discipline, and personal growth.' }
    ]
  },
  {
    id: 'funny-jokes',
    slug: 'funny-jokes',
    name: 'Funny Messages & Jokes',
    icon: 'Smile',
    description: 'Lighten the mood with witty banter, clever punchlines, playful roasts, and relatable everyday comedy.',
    gradient: 'from-yellow-400 to-amber-600',
    accentColor: 'amber',
    seoTitle: 'Funny Messages, Clever Jokes & Playful Banter | Velora AI',
    seoDescription: 'Spill laughs with hilarious texts, situational comedy, relatable memes in text form, and mood lifters.',
    subcategories: [
      { slug: 'relatable-life', name: 'Relatable Adulting & Chaos', description: 'Laughing through bills, sleep deprivation, and laundry.' },
      { slug: 'clever-puns', name: 'Clever Wordplay & Puns', description: 'Smart and silly puns guaranteed to crack a grin.' },
      { slug: 'playful-teasing', name: 'Gentle Playful Teasing', description: 'Affectionate banter without crossing any boundaries.' },
      { slug: 'work-from-home-humor', name: 'Workplace & Zoom Humor', description: 'Muted microphones, endless syncs, and coffee addiction.' }
    ]
  },
  {
    id: 'invitations-events',
    slug: 'invitations-events',
    name: 'Invitations & Event Messages',
    icon: 'Mail',
    description: 'Save-the-dates, housewarming invites, dinner parties, baby showers, and RSVP follow-ups.',
    gradient: 'from-purple-500 to-indigo-600',
    accentColor: 'purple',
    seoTitle: 'Event Invitation Messages, RSVPs & Party Invites | Velora AI',
    seoDescription: 'Craft irresistible invitations for birthdays, dinners, launches, and casual backyard get-togethers.',
    subcategories: [
      { slug: 'dinner-party-casual', name: 'Dinner Party & Casual Gatherings', description: 'Warm invitations to break bread and share wine.' },
      { slug: 'save-the-date', name: 'Save-the-Date & Weddings', description: 'Marking calendars for upcoming celebrations.' },
      { slug: 'business-event-webinar', name: 'Business Launch & Webinar Invites', description: 'Driving attendee signups with compelling agenda value.' },
      { slug: 'rsvp-nudge', name: 'RSVP Reminders & Headcounts', description: 'Gentle nudges to finalize catering and seating.' }
    ]
  },
  {
    id: 'custom-ai-generated',
    slug: 'custom-ai-generated',
    name: 'Custom AI-Generated Messages',
    icon: 'Bot',
    description: 'Bespoke messages tailored to any hyper-niche scenario, specific emotional nuance, or unique prompt.',
    badge: 'AI Engine',
    gradient: 'from-cyan-500 to-violet-600',
    accentColor: 'cyan',
    seoTitle: 'Custom AI Message Studio & Intelligent Generator | Velora AI',
    seoDescription: 'Unleash the full creative intelligence of Velora AI to generate bespoke messages for any situation in seconds.',
    subcategories: [
      { slug: 'hyper-niche', name: 'Hyper-Niche Situations', description: 'Messages tailored to unusual and exact circumstances.' },
      { slug: 'multilingual-bridge', name: 'Bilingual & Cultural Bridges', description: 'Crossing cultural idioms with natural phrasing.' },
      { slug: 'negotiation-strategy', name: 'High-Stakes Negotiations', description: 'Delicate diplomatic phrasings with optimal leverage.' },
      { slug: 'creative-storytelling', name: 'Creative Rhyme & Poetic Prose', description: 'Lyrical and memorable lines crafted on demand.' }
    ]
  }
];

export const TONE_OPTIONS: { value: string; label: string; description: string; emoji: string }[] = [
  { value: 'romantic', label: 'Romantic', description: 'Passionate, sweet, and intimate', emoji: '❤️' },
  { value: 'emotional', label: 'Emotional', description: 'Deep, vulnerable, and moving', emoji: '🥺' },
  { value: 'professional', label: 'Professional', description: 'Crisp, respectful, and articulate', emoji: '💼' },
  { value: 'friendly', label: 'Friendly', description: 'Warm, approachable, and natural', emoji: '😊' },
  { value: 'funny', label: 'Funny', description: 'Witty, playful, with clever humor', emoji: '😂' },
  { value: 'polite', label: 'Polite', description: 'Courteous, gentle, and considerate', emoji: '🤝' },
  { value: 'confident', label: 'Confident', description: 'Assertive, bold, and inspiring', emoji: '⚡' },
  { value: 'persuasive', label: 'Persuasive', description: 'Compelling, actionable, and focused', emoji: '🎯' },
  { value: 'formal', label: 'Formal', description: 'Traditional, polished, and stately', emoji: '📜' },
  { value: 'inspirational', label: 'Inspirational', description: 'Uplifting, resilient, and motivating', emoji: '✨' },
  { value: 'sympathetic', label: 'Sympathetic', description: 'Compassionate, tender, and caring', emoji: '🕊️' }
];

export const LANGUAGE_OPTIONS: { code: string; name: string }[] = [
  { code: 'en', name: 'English' },
  { code: 'es', name: 'Spanish (Español)' },
  { code: 'fr', name: 'French (Français)' },
  { code: 'de', name: 'German (Deutsch)' },
  { code: 'it', name: 'Italian (Italiano)' },
  { code: 'pt', name: 'Portuguese (Português)' },
  { code: 'hi', name: 'Hindi (हिन्दी)' },
  { code: 'ar', name: 'Arabic (العربية)' },
  { code: 'ja', name: 'Japanese (日本語)' },
  { code: 'zh', name: 'Chinese (中文)' }
];
