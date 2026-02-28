/**
 * LazyLoad component - Wrapper for lazy loading components with loading states
 * Provides smooth loading transitions and error handling
 */

import React, { Suspense, lazy, ComponentType, ReactNode } from 'react';
import { LoadingSpinner } from './ui';
import ErrorBoundary from './ErrorBoundary';

interface LazyLoadProps {
  loader: () => Promise<{ default: ComponentType<any> }>;
  fallback?: React.ReactNode;
  error?: React.ReactNode;
  delay?: number;
  className?: string;
  children?: ReactNode;
}

/**
 * Higher-order component for lazy loading with custom loading state
 */
export function createLazyComponent<P extends object>(
  importFunc: () => Promise<{ default: ComponentType<P> }>,
  options: {
    fallback?: React.ReactNode;
    error?: React.ReactNode;
    preload?: boolean;
  } = {}
) {
  const LazyComponent = lazy(importFunc);

  // Preload component if requested
  if (options.preload) {
    importFunc();
  }

  const LazyWrapper = (props: P) => (
    <LazyLoad
      loader={importFunc}
      fallback={options.fallback}
      error={options.error}
    >
      <LazyComponent {...props} />
    </LazyLoad>
  );

  // Add display name for debugging
  LazyWrapper.displayName = `LazyLoad(${importFunc.name || 'Component'})`;

  return LazyWrapper;
}

/**
 * LazyLoad wrapper component with loading and error states
 */
const LazyLoad: React.FC<LazyLoadProps> = ({
  loader,
  fallback,
  error,
  delay = 200,
  className = '',
  children,
}) => {
  const LazyComponent = lazy(loader);

  const defaultFallback = (
    <div className={`flex items-center justify-center min-h-[200px] ${className}`}>
      <div className="text-center">
        <LoadingSpinner size="lg" />
        <p className="mt-4 text-gray-600">Loading...</p>
      </div>
    </div>
  );

  const defaultError = (
    <div className={`flex items-center justify-center min-h-[200px] ${className}`}>
      <div className="text-center">
        <div className="text-red-500 mb-4">
          <svg
            className="h-12 w-12 mx-auto"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>
        <p className="text-gray-600">Failed to load content</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Retry
        </button>
      </div>
    </div>
  );

  return (
    <Suspense fallback={fallback || defaultFallback}>
      <ErrorBoundary fallback={error || defaultError}>
        {children}
      </ErrorBoundary>
    </Suspense>
  );
};

export default LazyLoad;
