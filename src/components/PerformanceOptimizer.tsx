/**
 * PerformanceOptimizer component - Handles performance monitoring and optimization
 * Includes Core Web Vitals tracking, resource optimization, and performance hints
 */

import React, { useEffect, useRef, useState } from 'react';

interface PerformanceMetrics {
  fcp: number; // First Contentful Paint
  lcp: number; // Largest Contentful Paint
  fid: number; // First Input Delay
  cls: number; // Cumulative Layout Shift
  ttfb: number; // Time to First Byte
}

interface PerformanceOptimizerProps {
  enableAnalytics?: boolean;
  enableResourceHints?: boolean;
  enableServiceWorker?: boolean;
}

const PerformanceOptimizer: React.FC<PerformanceOptimizerProps> = ({
  enableAnalytics = true,
  enableResourceHints = true,
  enableServiceWorker = true,
}) => {
  const [metrics, setMetrics] = useState<PerformanceMetrics | null>(null);
  const observerRef = useRef<PerformanceObserver | null>(null);

  useEffect(() => {
    // Initialize performance monitoring
    if (enableAnalytics) {
      initializePerformanceMonitoring();
    }

    // Add resource hints
    if (enableResourceHints) {
      addResourceHints();
    }

    // Register service worker
    if (enableServiceWorker && 'serviceWorker' in navigator) {
      registerServiceWorker();
    }

    // Cleanup
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [enableAnalytics, enableResourceHints, enableServiceWorker]);

  const initializePerformanceMonitoring = () => {
    // Monitor Core Web Vitals
    observeWebVitals();

    // Report metrics to analytics
    reportMetrics();
  };

  const observeWebVitals = () => {
    try {
      // Observe Largest Contentful Paint (LCP)
      if ('PerformanceObserver' in window) {
        const lcpObserver = new PerformanceObserver((entryList) => {
          const entries = entryList.getEntries();
          const lastEntry = entries[entries.length - 1];
          if (lastEntry) {
            setMetrics(prev => ({
              ...prev!,
              lcp: lastEntry.startTime,
            }));
          }
        });
        lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
        observerRef.current = lcpObserver;
      }

      // Observe First Input Delay (FID)
      if ('PerformanceObserver' in window) {
        const fidObserver = new PerformanceObserver((entryList) => {
          const entries = entryList.getEntries();
          entries.forEach((entry: any) => {
            if (entry.processingStart) {
              setMetrics(prev => ({
                ...prev!,
                fid: entry.processingStart - entry.startTime,
              }));
            }
          });
        });
        fidObserver.observe({ entryTypes: ['first-input'] });
      }

      // Observe Cumulative Layout Shift (CLS)
      if ('PerformanceObserver' in window) {
        let clsValue = 0;
        const clsObserver = new PerformanceObserver((entryList) => {
          for (const entry of entryList.getEntries()) {
            if (!(entry as any).hadRecentInput) {
              clsValue += (entry as any).value;
            }
          }
          setMetrics(prev => ({
            ...prev!,
            cls: clsValue,
          }));
        });
        clsObserver.observe({ entryTypes: ['layout-shift'] });
      }

      // Get First Contentful Paint (FCP)
      if ('performance' in window && 'getEntriesByType' in performance) {
        const paintEntries = performance.getEntriesByType('paint');
        const fcpEntry = paintEntries.find(entry => entry.name === 'first-contentful-paint');
        if (fcpEntry) {
          setMetrics(prev => ({
            ...prev!,
            fcp: fcpEntry.startTime,
          }));
        }
      }

      // Get Time to First Byte (TTFB)
      if ('performance' in window && 'timing' in performance) {
        const ttfb = performance.timing.responseStart - performance.timing.navigationStart;
        setMetrics(prev => ({
          ...prev!,
          ttfb,
        }));
      }
    } catch (error) {
      console.warn('Performance monitoring not fully supported:', error);
    }
  };

  const reportMetrics = () => {
    // Report to Google Analytics if available
    if (typeof window !== 'undefined' && (window as any).gtag && metrics) {
      Object.entries(metrics).forEach(([metric, value]) => {
        (window as any).gtag('event', metric, {
          event_category: 'Web Vitals',
          value: Math.round(metric === 'cls' ? value * 1000 : value),
          non_interaction: true,
        });
      });
    }

    // Log metrics in development
    if (process.env.NODE_ENV === 'development' && metrics) {
      console.table(metrics);
    }
  };

  const addResourceHints = () => {
    // Preconnect to external domains
    const preconnectDomains = [
      'https://fonts.googleapis.com',
      'https://fonts.gstatic.com',
      'https://www.googletagmanager.com',
      'https://www.google-analytics.com',
    ];

    preconnectDomains.forEach(domain => {
      const link = document.createElement('link');
      link.rel = 'preconnect';
      link.href = domain;
      if (domain.includes('fonts.gstatic.com')) {
        link.crossOrigin = 'anonymous';
      }
      document.head.appendChild(link);
    });

    // DNS prefetch for less critical domains
    const dnsPrefetchDomains = [
      '//www.facebook.com',
      '//www.instagram.com',
      '//www.youtube.com',
    ];

    dnsPrefetchDomains.forEach(domain => {
      const link = document.createElement('link');
      link.rel = 'dns-prefetch';
      link.href = domain;
      document.head.appendChild(link);
    });
  };

  const registerServiceWorker = async () => {
    try {
      const registration = await navigator.serviceWorker.register('/sw.js');
      console.log('Service Worker registered:', registration);

      // Check for updates
      registration.addEventListener('updatefound', () => {
        const newWorker = registration.installing;
        if (newWorker) {
          newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
              // New content is available
              if (window.confirm('New content is available. Would you like to refresh?')) {
                window.location.reload();
              }
            }
          });
        }
      });
    } catch (error) {
      console.warn('Service Worker registration failed:', error);
    }
  };

  // This component doesn't render anything visible
  return null;
};

export default PerformanceOptimizer;

// Performance monitoring utilities
export const measurePerformance = (name: string, fn: () => void) => {
  if ('performance' in window && 'mark' in performance) {
    performance.mark(`${name}-start`);
    fn();
    performance.mark(`${name}-end`);
    performance.measure(name, `${name}-start`, `${name}-end`);
  } else {
    fn();
  }
};

export const getPerformanceMetrics = (): PerformanceMetrics | null => {
  if (typeof window === 'undefined' || !('performance' in window)) {
    return null;
  }

  const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
  const paint = performance.getEntriesByType('paint');

  return {
    fcp: paint.find(entry => entry.name === 'first-contentful-paint')?.startTime || 0,
    lcp: 0, // Requires observer
    fid: 0, // Requires observer
    cls: 0, // Requires observer
    ttfb: navigation.responseStart - navigation.requestStart,
  };
};

// Performance optimization utilities
export const debounce = (func: Function, wait: number) => {
  let timeout: NodeJS.Timeout;
  return function executedFunction(...args: any[]) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

export const throttle = (func: Function, limit: number) => {
  let inThrottle: boolean;
  return function executedFunction(this: any, ...args: any[]) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};

// Image optimization utilities
export const optimizeImage = (src: string, width?: number, quality?: number): string => {
  // This would integrate with an image optimization service like Cloudinary, Imgix, etc.
  // For now, return the original src
  return src;
};

// Lazy loading utilities
export const createIntersectionObserver = (
  callback: IntersectionObserverCallback,
  options?: IntersectionObserverInit
): IntersectionObserver | null => {
  if ('IntersectionObserver' in window) {
    return new IntersectionObserver(callback, options);
  }
  return null;
};
