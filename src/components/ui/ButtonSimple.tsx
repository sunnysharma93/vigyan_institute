import React from 'react';
import { cn } from '../../utils';

// Types ko refine kiya gaya hai taaki anchor aur button ke props clash na karein
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline' | 'secondary' | 'ghost';
  size?: 'sm' | 'default' | 'lg';
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  href?: string;
  target?: string;
}

const Button = React.forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  ({ 
    className, 
    variant = 'default', 
    size = 'default', 
    loading = false, 
    leftIcon, 
    rightIcon, 
    children, 
    disabled, 
    href, 
    target, 
    type = 'button', // Default type button rakha hai
    ...props 
  }, ref) => {
    
    const baseClasses = 'inline-flex items-center justify-center rounded-xl font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none active:scale-[0.98]';
    
    const variants = {
      default: 'bg-gradient-to-r from-brand-600 to-brand-700 text-white hover:from-brand-700 hover:to-brand-800 shadow-md hover:shadow-lg',
      outline: 'border-2 border-brand-600 text-brand-600 bg-transparent hover:bg-brand-50',
      secondary: 'bg-gray-100 text-gray-900 hover:bg-gray-200',
      ghost: 'text-brand-600 hover:bg-brand-50',
    };
    
    const sizes = {
      sm: 'h-9 px-4 py-2 text-xs',
      default: 'h-11 px-6 py-2.5 text-sm',
      lg: 'h-13 px-8 py-3 text-base',
    };

    const LoadingSpinner = () => (
      <svg
        className="animate-spin -ml-1 mr-2 h-4 w-4 text-current"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
      </svg>
    );

    const buttonClasses = cn(
      baseClasses,
      variants[variant],
      sizes[size],
      className
    );

    const content = (
      <>
        {loading && <LoadingSpinner />}
        {!loading && leftIcon && <span className="mr-2 inline-flex">{leftIcon}</span>}
        <span className={cn(loading && 'opacity-0')}> {children} </span>
        {!loading && rightIcon && <span className="ml-2 inline-flex">{rightIcon}</span>}
        {loading && <span className="sr-only">Loading...</span>}
      </>
    );

    // Agar href hai toh anchor tag return karo
    if (href) {
      return (
        <a
          href={href}
          target={target}
          className={buttonClasses}
          ref={ref as React.Ref<HTMLAnchorElement>}
          // Button specific props filter out karein
          {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
        >
          {content}
        </a>
      );
    }

    // Default button tag
    return (
      <button
        type={type}
        className={buttonClasses}
        ref={ref as React.Ref<HTMLButtonElement>}
        disabled={disabled || loading}
        {...props}
      >
        {content}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;