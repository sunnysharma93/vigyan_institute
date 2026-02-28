/**
 * Type definitions for Vigyan Institute website
 * Provides TypeScript interfaces for all data structures used throughout the application
 */

// Base interfaces
export interface BaseEntity {
  id: string;
  createdAt: string;
  updatedAt: string;
}

// Institute related types
export interface Address {
  street: string;
  area: string;
  city: string;
  state: string;
  pincode: string;
  landmark?: string;
}

export interface ContactInfo {
  main: string;
  whatsapp?: string;
  support?: string;
}

export interface SocialMedia {
  facebook?: string;
  instagram?: string;
  youtube?: string;
  linkedin?: string;
  twitter?: string;
}

export interface InstituteData {
  name: string;
  tagline: string;
  description: string;
  address: {
    mainCampus: Address;
  };
  contact: ContactInfo;
  email: {
    info: string;
    admission?: string;
    support?: string;
  };
  socialMedia: SocialMedia;
  statistics: {
    studentsEnrolled: number;
    yearsOfExcellence: number;
    successRate: number;
    facultyMembers: number;
  };
}

// Course related types
export interface Course extends BaseEntity {
  name: string;
  description: string;
  price: number;
  duration: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  subjects: string[];
  batchTimings: string[];
  features: string[];
  image?: string;
  isPopular?: boolean;
}

// Faculty related types
export interface Faculty extends BaseEntity {
  name: string;
  role: string;
  experience: number;
  specialization: string[];
  qualification: string;
  image?: string;
  bio?: string;
  achievements?: string[];
}

// Review/Testimonial types
export interface Review extends BaseEntity {
  studentName: string;
  rating: number;
  comment: string;
  course?: string;
  batchYear?: string;
  image?: string;
  verified?: boolean;
}

// SEO related types
export interface SEOData {
  title: string;
  description: string;
  keywords?: string[];
  canonicalUrl?: string;
  ogImage?: string;
  structuredData?: Record<string, any>;
}

// Navigation types
export interface NavItem {
  name: string;
  path: string;
  icon?: string;
  children?: NavItem[];
  external?: boolean;
}

// Form types
export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  message: string;
  subject?: string;
}

export interface AdmissionFormData {
  studentName: string;
  parentName: string;
  email: string;
  phone: string;
  course: string;
  currentClass: string;
  school: string;
  message?: string;
}

// UI Component types
export interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  className?: string;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  href?: string;
  target?: string;
}

export interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  padding?: 'sm' | 'md' | 'lg';
  shadow?: 'sm' | 'md' | 'lg' | 'xl';
}

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

// Animation types
export interface AnimationProps {
  initial?: any;
  animate?: any;
  transition?: any;
  whileInView?: any;
  viewport?: any;
}

// Error boundary types
export interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
  errorInfo?: React.ErrorInfo;
}

// Loading states
export interface LoadingState {
  isLoading: boolean;
  error?: string | null;
  data?: any;
}

// API Response types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

// Analytics types
export interface AnalyticsEvent {
  action: string;
  category: string;
  label?: string;
  value?: number;
}

// Theme types
export interface Theme {
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    surface: string;
    text: string;
    textSecondary: string;
  };
  fonts: {
    primary: string;
    secondary: string;
  };
  spacing: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
  };
}
