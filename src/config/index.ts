/**
 * Environment configuration and constants
 * Centralizes all environment variables and provides defaults
 */

// Get environment variables with fallbacks
const getEnvVar = (key: string, defaultValue: string = ''): string => {
  return process.env[key] || defaultValue;
};

// Application Configuration
export const APP_CONFIG = {
  name: getEnvVar('REACT_APP_NAME', 'Vigyan Institute'),
  tagline: getEnvVar('REACT_APP_TAGLINE', 'Shaping Future with Quality Education'),
  description: getEnvVar('REACT_APP_DESCRIPTION', 'Premier coaching institute providing quality education for JEE, NEET, and board exams'),
  siteUrl: getEnvVar('REACT_APP_SITE_URL', 'https://vigyan-institute.vercel.app'),
  apiUrl: getEnvVar('REACT_APP_API_URL', 'http://localhost:8080/api'),
};

// Contact Information
export const CONTACT_CONFIG = {
  phone: {
    main: getEnvVar('REACT_APP_PHONE_MAIN', '+91 12345 67890'),
    branch: getEnvVar('REACT_APP_PHONE_BRANCH', '+91 09876 54321'),
    admissions: getEnvVar('REACT_APP_PHONE_ADMISSIONS', '+91 11223 44556'),
  },
  email: {
    info: getEnvVar('REACT_APP_EMAIL_INFO', 'info@vigyaninstitute.edu'),
    admissions: getEnvVar('REACT_APP_EMAIL_ADMISSIONS', 'admissions@vigyaninstitute.edu'),
    support: getEnvVar('REACT_APP_EMAIL_SUPPORT', 'support@vigyaninstitute.edu'),
  },
  officeHours: {
    weekdays: getEnvVar('REACT_APP_OFFICE_HOURS_WEEKDAYS', 'Monday - Friday: 9:00 AM - 6:00 PM'),
    saturday: getEnvVar('REACT_APP_OFFICE_HOURS_SATURDAY', 'Saturday: 9:00 AM - 2:00 PM'),
    sunday: getEnvVar('REACT_APP_OFFICE_HOURS_SUNDAY', 'Sunday: Closed'),
  },
};

// Address Information
export const ADDRESS_CONFIG = {
  mainCampus: {
    street: getEnvVar('REACT_APP_ADDRESS_STREET', 'Near Palla Chowk'),
    area: getEnvVar('REACT_APP_ADDRESS_AREA', 'Palla'),
    city: getEnvVar('REACT_APP_ADDRESS_CITY', 'Faridabad'),
    state: getEnvVar('REACT_APP_ADDRESS_STATE', 'Haryana'),
    pincode: getEnvVar('REACT_APP_ADDRESS_PINCODE', '121004'),
    landmark: getEnvVar('REACT_APP_ADDRESS_LANDMARK', 'Opposite Palla Government School'),
  },
  branchOffice: {
    street: getEnvVar('REACT_APP_BRANCH_STREET', 'Sector 15'),
    area: getEnvVar('REACT_APP_BRANCH_AREA', 'Faridabad'),
    city: getEnvVar('REACT_APP_BRANCH_CITY', 'Faridabad'),
    state: getEnvVar('REACT_APP_BRANCH_STATE', 'Haryana'),
    pincode: getEnvVar('REACT_APP_BRANCH_PINCODE', '121007'),
    landmark: getEnvVar('REACT_APP_BRANCH_LANDMARK', 'Near Delhi-Mathura Road'),
  },
};

// Social Media Links
export const SOCIAL_CONFIG = {
  facebook: getEnvVar('REACT_APP_FACEBOOK', 'https://facebook.com/vigyaninstitute'),
  instagram: getEnvVar('REACT_APP_INSTAGRAM', 'https://instagram.com/vigyaninstitute'),
  twitter: getEnvVar('REACT_APP_TWITTER', 'https://twitter.com/vigyaninstitute'),
  linkedin: getEnvVar('REACT_APP_LINKEDIN', 'https://linkedin.com/company/vigyaninstitute'),
  youtube: getEnvVar('REACT_APP_YOUTUBE', 'https://youtube.com/@vigyaninstitute'),
};

// Analytics Configuration
export const ANALYTICS_CONFIG = {
  gaTrackingId: getEnvVar('REACT_APP_GA_TRACKING_ID', ''),
  gtmId: getEnvVar('REACT_APP_GTM_ID', ''),
  enableAnalytics: getEnvVar('REACT_APP_ENABLE_ANALYTICS', 'false') === 'true',
};

// EmailJS Configuration
export const EMAILJS_CONFIG = {
  serviceId: getEnvVar('REACT_APP_EMAILJS_SERVICE_ID', ''),
  templateId: getEnvVar('REACT_APP_EMAILJS_TEMPLATE_ID', ''),
  publicKey: getEnvVar('REACT_APP_EMAILJS_PUBLIC_KEY', ''),
};

// Statistics
export const STATISTICS_CONFIG = {
  studentsTaught: getEnvVar('REACT_APP_STUDENTS_TAUGHT', '5000+'),
  successRate: getEnvVar('REACT_APP_SUCCESS_RATE', '95%'),
  programs: getEnvVar('REACT_APP_PROGRAMS', '25+'),
  facultyMembers: getEnvVar('REACT_APP_FACULTY_MEMBERS', '50+'),
};

// Google Reviews
export const REVIEWS_CONFIG = {
  rating: parseFloat(getEnvVar('REACT_APP_GOOGLE_RATING', '5.0')),
  totalReviews: parseInt(getEnvVar('REACT_APP_TOTAL_REVIEWS', '5')),
  url: getEnvVar('REACT_APP_GOOGLE_REVIEWS_URL', 'https://www.google.com/search?q=vigyan+institute+faridabad'),
};

// Feature Flags
export const FEATURE_CONFIG = {
  darkMode: getEnvVar('REACT_APP_ENABLE_DARK_MODE', 'true') === 'true',
  analytics: getEnvVar('REACT_APP_ENABLE_ANALYTICS', 'false') === 'true',
  pwa: getEnvVar('REACT_APP_ENABLE_PWA', 'true') === 'true',
};

// Validation patterns
export const VALIDATION_PATTERNS = {
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  phone: /^[\+]?[1-9][\d]{0,15}$/,
  name: /^[a-zA-Z\s]{2,50}$/,
  pincode: /^[1-9][0-9]{5}$/,
  password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
};

// SEO Configuration
export const SEO_CONFIG = {
  defaultTitle: APP_CONFIG.name,
  defaultDescription: APP_CONFIG.description,
  siteUrl: APP_CONFIG.siteUrl,
  keywords: [
    'vigyan institute',
    'coaching institute',
    'JEE coaching',
    'NEET coaching',
    'board exam preparation',
    'Faridabad coaching',
    'Palla coaching',
    'quality education',
    'competitive exams',
    'science coaching',
  ],
  twitterHandle: '@vigyaninstitute',
};

// API Endpoints
export const API_ENDPOINTS = {
  notes: {
    upload: `${APP_CONFIG.apiUrl}/notes/upload`,
    list: `${APP_CONFIG.apiUrl}/notes`,
    download: (fileName: string) => `${APP_CONFIG.apiUrl}/notes/download/${fileName}`,
    delete: (fileName: string) => `${APP_CONFIG.apiUrl}/notes/${fileName}`,
  },
  contact: {
    submit: `${APP_CONFIG.apiUrl}/contact`,
  },
};

// File Upload Configuration
export const UPLOAD_CONFIG = {
  maxFileSize: 10 * 1024 * 1024, // 10MB
  allowedTypes: ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
  allowedExtensions: ['pdf', 'doc', 'docx'],
};

// Cache Configuration
export const CACHE_CONFIG = {
  apiCacheTime: 5 * 60 * 1000, // 5 minutes
  imageCacheTime: 24 * 60 * 60 * 1000, // 24 hours
  staticCacheTime: 7 * 24 * 60 * 60 * 1000, // 7 days
};

// Theme Configuration
export const THEME_CONFIG = {
  defaultTheme: 'light' as const,
  storageKey: 'vigyan-theme',
  themes: ['light', 'dark', 'system'] as const,
};

// Animation Configuration
export const ANIMATION_CONFIG = {
  duration: {
    fast: 150,
    normal: 300,
    slow: 500,
  },
  easing: {
    ease: 'cubic-bezier(0.4, 0, 0.2, 1)',
    easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
    easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
    easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
  },
};

// Breakpoint Configuration
export const BREAKPOINT_CONFIG = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
};

// Export all configurations as a single object for convenience
export const CONFIG = {
  app: APP_CONFIG,
  contact: CONTACT_CONFIG,
  address: ADDRESS_CONFIG,
  social: SOCIAL_CONFIG,
  analytics: ANALYTICS_CONFIG,
  emailjs: EMAILJS_CONFIG,
  statistics: STATISTICS_CONFIG,
  reviews: REVIEWS_CONFIG,
  features: FEATURE_CONFIG,
  validation: VALIDATION_PATTERNS,
  seo: SEO_CONFIG,
  api: API_ENDPOINTS,
  upload: UPLOAD_CONFIG,
  cache: CACHE_CONFIG,
  theme: THEME_CONFIG,
  animation: ANIMATION_CONFIG,
  breakpoint: BREAKPOINT_CONFIG,
};

export default CONFIG;
