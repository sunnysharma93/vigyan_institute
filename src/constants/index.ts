/**
 * Application constants for Vigyan Institute website
 * Centralized configuration for all constant values used throughout the application
 */

// App metadata
export const APP_CONFIG = {
  name: 'Vigyan Institute',
  tagline: 'Excellence in Education',
  description: 'Premier coaching institute for science education in Palla, Faridabad',
  version: '1.0.0',
  author: 'Vigyan Institute Team',
} as const;

// SEO constants
export const SEO_CONFIG = {
  defaultTitle: 'Vigyan Institute | Excellence in Education | Palla Faridabad',
  defaultDescription: 'Best coaching institute in Palla Faridabad for Physics, Chemistry, Mathematics. JEE & NEET preparation with expert faculty and proven results.',
  keywords: [
    'coaching institute in Palla Faridabad',
    'best tuition center in Faridabad',
    'science coaching in Palla',
    'JEE preparation Faridabad',
    'NEET coaching Palla',
    'physics coaching',
    'chemistry coaching',
    'mathematics coaching',
    'board exam preparation',
    'science institute'
  ],
  siteUrl: 'https://vigyan-institute.vercel.app',
  ogImage: '/images/og-image.jpg',
  twitterHandle: '@vigyaninstitute',
} as const;

// Navigation configuration
export const NAVIGATION_CONFIG = {
  main: [
    { name: 'Home', path: '/', icon: '🏠' },
    { name: 'About', path: '/about', icon: 'ℹ️' },
    { name: 'Courses', path: '/courses', icon: '📚' },
    { name: 'Faculty', path: '/faculty', icon: '👨‍🏫' },
    { name: 'Admission', path: '/admission', icon: '📝' },
    { name: 'Contact', path: '/contact', icon: '📞' },
  ] as const,
  footer: {
    quickLinks: [
      { name: 'Home', path: '/', icon: '🏠' },
      { name: 'About', path: '/about', icon: 'ℹ️' },
      { name: 'Courses', path: '/courses', icon: '📚' },
      { name: 'Faculty', path: '/faculty', icon: '👨‍🏫' },
      { name: 'Admission', path: '/admission', icon: '📝' },
      { name: 'Contact', path: '/contact', icon: '📞' },
    ],
    services: [
      { name: 'Physics Coaching', path: '/services#physics', icon: '⚛️' },
      { name: 'Mathematics Coaching', path: '/services#math', icon: '🔢' },
      { name: 'Chemistry Coaching', path: '/services#chemistry', icon: '🧪' },
      { name: 'JEE Preparation', path: '/services#jee', icon: '🚀' },
      { name: 'NEET Preparation', path: '/services#neet', icon: '⚕️' },
      { name: 'Board Exams', path: '/services#boards', icon: '📋' },
    ],
    resources: [
      { name: 'Download Brochure', path: '#', icon: '📄' },
      { name: 'Online Admission', path: '/admission', icon: '💻' },
      { name: 'Fee Structure', path: '#', icon: '💰' },
      { name: 'Study Materials', path: '#', icon: '📖' },
      { name: 'Results', path: '#', icon: '🏆' },
      { name: 'Gallery', path: '#', icon: '🖼️' },
    ],
    legal: [
      { name: 'Privacy Policy', path: '/privacy' },
      { name: 'Terms of Service', path: '/terms' },
      { name: 'Refund Policy', path: '/refund' },
      { name: 'Sitemap', path: '/sitemap' },
    ],
  },
} as const;

// Contact information
export const CONTACT_INFO = {
  phone: {
    main: '+91 98765 43210',
    whatsapp: '+91 98765 43210',
    support: '+91 12345 67890',
  },
  email: {
    info: 'info@vigyaninstitutepalla.com',
    admission: 'admission@vigyaninstitutepalla.com',
    support: 'support@vigyaninstitutepalla.com',
  },
  address: {
    mainCampus: {
      street: 'Near Palla Chowk',
      area: 'Palla',
      city: 'Faridabad',
      state: 'Haryana',
      pincode: '121105',
      landmark: 'Opposite Palla Government School',
    },
  },
  socialMedia: {
    facebook: 'https://facebook.com/vigyaninstitute',
    instagram: 'https://instagram.com/vigyaninstitute',
    youtube: 'https://youtube.com/@vigyaninstitute',
    linkedin: 'https://linkedin.com/company/vigyaninstitute',
    twitter: 'https://twitter.com/vigyaninstitute',
  },
} as const;

// Business hours
export const BUSINESS_HOURS = {
  weekdays: '9:00 AM - 8:00 PM',
  saturday: '9:00 AM - 6:00 PM',
  sunday: '10:00 AM - 4:00 PM',
} as const;

// Course categories
export const COURSE_CATEGORIES = {
  SCIENCE: 'Science',
  COMPETITIVE: 'Competitive Exams',
  FOUNDATION: 'Foundation',
  BOARD: 'Board Exams',
} as const;

// Course levels
export const COURSE_LEVELS = {
  BEGINNER: 'Beginner',
  INTERMEDIATE: 'Intermediate',
  ADVANCED: 'Advanced',
} as const;

// Animation durations
export const ANIMATION_DURATION = {
  FAST: 150,
  NORMAL: 300,
  SLOW: 500,
} as const;

// Breakpoints
export const BREAKPOINTS = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
} as const;

// Z-index values
export const Z_INDEX = {
  dropdown: 1000,
  sticky: 1020,
  fixed: 1030,
  modalBackdrop: 1040,
  modal: 1050,
  popover: 1060,
  tooltip: 1070,
  toast: 1080,
} as const;

// Form validation patterns
export const VALIDATION_PATTERNS = {
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  phone: /^[+]?[\d\s-()]{10,}$/,
  name: /^[a-zA-Z\s]{2,50}$/,
  pincode: /^[1-9][0-9]{5}$/,
} as const;

// Error messages
export const ERROR_MESSAGES = {
  REQUIRED: 'This field is required',
  INVALID_EMAIL: 'Please enter a valid email address',
  INVALID_PHONE: 'Please enter a valid phone number',
  INVALID_NAME: 'Please enter a valid name',
  NETWORK_ERROR: 'Network error. Please try again.',
  GENERIC_ERROR: 'Something went wrong. Please try again.',
} as const;

// Success messages
export const SUCCESS_MESSAGES = {
  FORM_SUBMITTED: 'Form submitted successfully!',
  EMAIL_SENT: 'Email sent successfully!',
  ADMISSION_RECEIVED: 'Admission inquiry received. We will contact you soon!',
  SUBSCRIPTION_SUCCESS: 'Successfully subscribed to newsletter!',
} as const;

// Loading messages
export const LOADING_MESSAGES = {
  SUBMITTING: 'Submitting...',
  SENDING: 'Sending...',
  LOADING: 'Loading...',
  PROCESSING: 'Processing...',
} as const;

// Image optimization
export const IMAGE_CONFIG = {
  quality: 85,
  format: ['webp', 'jpg'],
  placeholder: 'blur',
  sizes: {
    thumbnail: 100,
    small: 300,
    medium: 600,
    large: 1200,
    xlarge: 1920,
  },
} as const;

// Cache settings
export const CACHE_CONFIG = {
  api: 5 * 60 * 1000, // 5 minutes
  images: 24 * 60 * 60 * 1000, // 24 hours
  static: 7 * 24 * 60 * 60 * 1000, // 7 days
} as const;

// Analytics events
export const ANALYTICS_EVENTS = {
  PAGE_VIEW: 'page_view',
  BUTTON_CLICK: 'button_click',
  FORM_SUBMIT: 'form_submit',
  PHONE_CALL: 'phone_call',
  EMAIL_CLICK: 'email_click',
  COURSE_ENQUIRY: 'course_enquiry',
  ADMISSION_FORM: 'admission_form',
  NEWSLETTER_SUBSCRIBE: 'newsletter_subscribe',
} as const;

// Social proof
export const SOCIAL_PROOF = {
  totalStudents: 5000,
  yearsOfExcellence: 15,
  successRate: 95,
  facultyMembers: 25,
  googleReviews: 1200,
  averageRating: 4.8,
} as const;
