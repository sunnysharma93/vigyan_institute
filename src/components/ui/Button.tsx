/**
 * Enhanced Button component - Modern design with Shadcn/UI patterns
 * Optimized for Production: Proper Type handling and Polymorphic rendering
 */

import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-xl text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background active:scale-[0.97] select-none',
  {
    variants: {
      variant: {
        default: 'bg-gradient-to-r from-brand-600 to-brand-700 text-white hover:from-brand-700 hover:to-brand-800 shadow-md hover:shadow-xl hover:-translate-y-0.5',
        destructive: 'bg-gradient-to-r from-red-500 to-red-600 text-white hover:from-red-600 hover:to-red-700 shadow-md',
        outline: 'border-2 border-input bg-background hover:bg-brand-50 hover:text-brand-700 hover:border-brand-500',
        secondary: 'bg-gray-100 text-gray-900 hover:bg-gray-200 shadow-sm',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-brand-600 underline-offset-4 hover:underline p-0 h-auto',
        success: 'bg-gradient-to-r from-emerald-500 to-emerald-600 text-white hover:from-emerald-600 hover:to-emerald-700 shadow-md',
        warning: 'bg-gradient-to-r from-amber-500 to-amber-600 text-white hover:from-amber-600 hover:to-amber-700 shadow-md',
      },
      size: {
        default: 'h-11 px-6 py-2.5',
        sm: 'h-9 px-4 py-2 text-xs',
        lg: 'h-13 px-8 py-3 text-base',
        xl: 'h-15 px-10 py-4 text-lg',
        icon: 'h-11 w-11',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

// Interface fix: disabled ko common rakha gaya hai
interface CommonProps extends VariantProps<typeof buttonVariants> {
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  className?: string;
  children?: React.ReactNode;
  disabled?: boolean; // Added here to make it accessible to both
}

type ButtonAsButton = CommonProps & React.ButtonHTMLAttributes<HTMLButtonElement> & { href?: never };
type ButtonAsAnchor = CommonProps & React.AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };

export type ButtonProps = ButtonAsButton | ButtonAsAnchor;

const Button = React.forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  (props, ref) => {
    // Separate out the custom props from the rest
    const { 
      className, 
      variant, 
      size, 
      loading = false, 
      leftIcon, 
      rightIcon, 
      children, 
      disabled, 
      ...rest 
    } = props;
    
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

    const content = (
      <>
        {loading && <LoadingSpinner />}
        {!loading && leftIcon && <span className="mr-2 inline-flex items-center">{leftIcon}</span>}
        <span className={cn(loading && "opacity-70")}>{children}</span>
        {!loading && rightIcon && <span className="ml-2 inline-flex items-center">{rightIcon}</span>}
        {loading && <span className="sr-only">Loading...</span>}
      </>
    );

    const classes = cn(buttonVariants({ variant, size, className }));

    // logic for anchor (a) tag
    if ('href' in rest && rest.href) {
      const { target, rel, ...anchorProps } = rest as React.AnchorHTMLAttributes<HTMLAnchorElement>;
      return (
        <a
          ref={ref as React.Ref<HTMLAnchorElement>}
          className={cn(classes, (disabled || loading) && "opacity-50 pointer-events-none")}
          target={target}
          rel={target === '_blank' ? 'noopener noreferrer' : rel}
          aria-disabled={disabled || loading}
          {...(anchorProps as any)}
        >
          {content}
        </a>
      );
    }

    // logic for button tag
    const { type = 'button', ...buttonProps } = rest as React.ButtonHTMLAttributes<HTMLButtonElement>;
    return (
      <button
        ref={ref as React.Ref<HTMLButtonElement>}
        type={type}
        className={classes}
        disabled={disabled || loading}
        aria-disabled={disabled || loading}
        {...(buttonProps as any)}
      >
        {content}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;