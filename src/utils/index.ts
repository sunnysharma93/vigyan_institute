/**
 * Utility functions for Vigyan Institute website
 * Common helper functions used throughout the application
 */

import { clsx, type ClassValue } from 'clsx';
import { VALIDATION_PATTERNS, SEO_CONFIG } from '../constants';

/**
 * Combine class names with clsx utility
 * @param inputs - Class names to combine
 * @returns Combined class string
 */
export function cn(...inputs: ClassValue[]): string {
  return clsx(inputs);
}

/**
 * Format phone number for display
 * @param phone - Phone number string
 * @returns Formatted phone number
 */
export function formatPhoneNumber(phone: string): string {
  // Remove all non-digit characters
  const cleaned = phone.replace(/\D/g, '');
  
  // Format based on length
  if (cleaned.length === 10) {
    return cleaned.replace(/(\d{5})(\d{5})/, '$1 $2');
  } else if (cleaned.length === 12 && cleaned.startsWith('91')) {
    return `+${cleaned.slice(0, 2)} ${cleaned.slice(2, 7)} ${cleaned.slice(7)}`;
  }
  
  return phone;
}

/**
 * Create tel: link from phone number
 * @param phone - Phone number string
 * @returns tel: link
 */
export function createTelLink(phone: string): string {
  const cleaned = phone.replace(/\D/g, '');
  return `tel:${cleaned}`;
}

/**
 * Create mailto: link from email
 * @param email - Email address
 * @param subject - Optional subject line
 * @param body - Optional email body
 * @returns mailto: link
 */
export function createMailtoLink(
  email: string,
  subject?: string,
  body?: string
): string {
  const params = new URLSearchParams();
  if (subject) params.append('subject', subject);
  if (body) params.append('body', body);
  
  const queryString = params.toString();
  return `mailto:${email}${queryString ? `?${queryString}` : ''}`;
}

/**
 * Validate email format
 * @param email - Email address to validate
 * @returns True if valid
 */
export function isValidEmail(email: string): boolean {
  return VALIDATION_PATTERNS.email.test(email);
}

/**
 * Validate phone number format
 * @param phone - Phone number to validate
 * @returns True if valid
 */
export function isValidPhone(phone: string): boolean {
  return VALIDATION_PATTERNS.phone.test(phone);
}

/**
 * Validate name format
 * @param name - Name to validate
 * @returns True if valid
 */
export function isValidName(name: string): boolean {
  return VALIDATION_PATTERNS.name.test(name.trim());
}

/**
 * Validate pincode format (Indian)
 * @param pincode - Pincode to validate
 * @returns True if valid
 */
export function isValidPincode(pincode: string): boolean {
  return VALIDATION_PATTERNS.pincode.test(pincode);
}

/**
 * Format currency in Indian Rupees
 * @param amount - Amount in number
 * @returns Formatted currency string
 */
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * Format date in readable format
 * @param date - Date object or string
 * @param options - Date formatting options
 * @returns Formatted date string
 */
export function formatDate(
  date: Date | string,
  options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }
): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return new Intl.DateTimeFormat('en-IN', options).format(dateObj);
}

/**
 * Calculate time ago from date
 * @param date - Date to calculate from
 * @returns Time ago string
 */
export function getTimeAgo(date: Date | string): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - dateObj.getTime()) / 1000);
  
  if (diffInSeconds < 60) return 'just now';
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
  if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 86400)} days ago`;
  if (diffInSeconds < 31536000) return `${Math.floor(diffInSeconds / 2592000)} months ago`;
  return `${Math.floor(diffInSeconds / 31536000)} years ago`;
}

/**
 * Generate slug from string
 * @param text - Text to convert to slug
 * @returns URL-friendly slug
 */
export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * Truncate text to specified length
 * @param text - Text to truncate
 * @param maxLength - Maximum length
 * @param suffix - Suffix to add (default: '...')
 * @returns Truncated text
 */
export function truncateText(
  text: string,
  maxLength: number,
  suffix: string = '...'
): string {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength - suffix.length) + suffix;
}

/**
 * Capitalize first letter of each word
 * @param text - Text to capitalize
 * @returns Capitalized text
 */
export function capitalizeWords(text: string): string {
  return text.replace(/\b\w/g, (char) => char.toUpperCase());
}

/**
 * Generate random ID
 * @param length - Length of ID (default: 8)
 * @returns Random ID string
 */
export function generateId(length: number = 8): string {
  return Math.random()
    .toString(36)
    .substring(2, 2 + length);
}

/**
 * Debounce function calls
 * @param func - Function to debounce
 * @param delay - Delay in milliseconds
 * @returns Debounced function
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
}

/**
 * Throttle function calls
 * @param func - Function to throttle
 * @param delay - Delay in milliseconds
 * @returns Throttled function
 */
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  let lastCall = 0;
  return (...args: Parameters<T>) => {
    const now = Date.now();
    if (now - lastCall >= delay) {
      lastCall = now;
      func(...args);
    }
  };
}

/**
 * Check if element is in viewport
 * @param element - Element to check
 * @param threshold - Threshold value (0-1)
 * @returns True if element is in viewport
 */
export function isInViewport(
  element: HTMLElement,
  threshold: number = 0.1
): boolean {
  const rect = element.getBoundingClientRect();
  const windowHeight = window.innerHeight || document.documentElement.clientHeight;
  const windowWidth = window.innerWidth || document.documentElement.clientWidth;
  
  const vertInView = rect.top <= windowHeight * (1 - threshold) && rect.bottom >= threshold * windowHeight;
  const horInView = rect.left <= windowWidth * (1 - threshold) && rect.right >= threshold * windowWidth;
  
  return vertInView && horInView;
}

/**
 * Smooth scroll to element
 * @param elementId - Element ID to scroll to
 * @param offset - Offset from top (default: 0)
 */
export function scrollToElement(elementId: string, offset: number = 0): void {
  const element = document.getElementById(elementId);
  if (element) {
    const top = element.offsetTop - offset;
    window.scrollTo({
      top,
      behavior: 'smooth',
    });
  }
}

/**
 * Copy text to clipboard
 * @param text - Text to copy
 * @returns Promise that resolves when copied
 */
export async function copyToClipboard(text: string): Promise<void> {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
    } else {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = text;
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      textArea.style.top = '-999999px';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
    }
  } catch (error) {
    console.error('Failed to copy text:', error);
    throw error;
  }
}

/**
 * Get meta tags for SEO
 * @param title - Page title
 * @param description - Page description
 * @param keywords - Keywords array
 * @param ogImage - Open Graph image
 * @returns Meta tags object
 */
export function getMetaTags(
  title: string,
  description: string,
  keywords: string[] = [],
  ogImage?: string
) {
  const fullTitle = title.includes(SEO_CONFIG.defaultTitle)
    ? title
    : `${title} | ${SEO_CONFIG.defaultTitle}`;
    
  return {
    title: fullTitle,
    description,
    keywords: [...keywords, ...SEO_CONFIG.keywords].join(', '),
    canonical: `${SEO_CONFIG.siteUrl}${window.location.pathname}`,
    openGraph: {
      title: fullTitle,
      description,
      type: 'website',
      url: `${SEO_CONFIG.siteUrl}${window.location.pathname}`,
      images: ogImage ? [{ url: ogImage }] : [],
      siteName: SEO_CONFIG.defaultTitle,
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      image: ogImage,
      site: SEO_CONFIG.twitterHandle,
    },
  };
}

/**
 * Get structured data for SEO
 * @param type - Schema type
 * @param data - Schema data
 * @returns Structured data object
 */
export function getStructuredData(type: string, data: Record<string, any>) {
  return {
    '@context': 'https://schema.org',
    '@type': type,
    ...data,
  };
}

/**
 * Generate breadcrumb schema
 * @param breadcrumbs - Breadcrumb items
 * @returns Breadcrumb structured data
 */
export function generateBreadcrumbSchema(breadcrumbs: Array<{ name: string; url: string }>) {
  return getStructuredData('BreadcrumbList', {
    itemListElement: breadcrumbs.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  });
}

/**
 * Generate organization schema
 * @param instituteData - Institute information
 * @returns Organization structured data
 */
export function generateOrganizationSchema(instituteData: any) {
  return getStructuredData('EducationalOrganization', {
    name: instituteData.name,
    description: instituteData.description,
    url: SEO_CONFIG.siteUrl,
    logo: `${SEO_CONFIG.siteUrl}/images/logo.png`,
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: instituteData.contact.main,
      contactType: 'customer service',
      availableLanguage: ['English', 'Hindi'],
    },
    address: {
      '@type': 'PostalAddress',
      streetAddress: instituteData.address.mainCampus.street,
      addressLocality: instituteData.address.mainCampus.area,
      addressRegion: instituteData.address.mainCampus.state,
      postalCode: instituteData.address.mainCampus.pincode,
      addressCountry: 'IN',
    },
    sameAs: Object.values(instituteData.socialMedia).filter(Boolean),
  });
}

/**
 * Local storage helpers
 */
export const storage = {
  get: <T>(key: string, defaultValue?: T): T | null => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue || null;
    } catch {
      return defaultValue || null;
    }
  },
  
  set: <T>(key: string, value: T): void => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error('Failed to save to localStorage:', error);
    }
  },
  
  remove: (key: string): void => {
    try {
      window.localStorage.removeItem(key);
    } catch (error) {
      console.error('Failed to remove from localStorage:', error);
    }
  },
  
  clear: (): void => {
    try {
      window.localStorage.clear();
    } catch (error) {
      console.error('Failed to clear localStorage:', error);
    }
  },
};

/**
 * Session storage helpers
 */
export const sessionStorage = {
  get: <T>(key: string, defaultValue?: T): T | null => {
    try {
      const item = window.sessionStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue || null;
    } catch {
      return defaultValue || null;
    }
  },
  
  set: <T>(key: string, value: T): void => {
    try {
      window.sessionStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error('Failed to save to sessionStorage:', error);
    }
  },
  
  remove: (key: string): void => {
    try {
      window.sessionStorage.removeItem(key);
    } catch (error) {
      console.error('Failed to remove from sessionStorage:', error);
    }
  },
  
  clear: (): void => {
    try {
      window.sessionStorage.clear();
    } catch (error) {
      console.error('Failed to clear sessionStorage:', error);
    }
  },
};
