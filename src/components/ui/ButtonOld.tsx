import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-xl text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background active:scale-[0.98]',
  {
    variants: {
      variant: {
        default: 'bg-gradient-to-r from-brand-600 to-brand-700 text-white hover:from-brand-700 hover:to-brand-800 shadow-md hover:shadow-lg',
        destructive: 'bg-gradient-to-r from-red-500 to-red-600 text-white hover:from-red-600 hover:to-red-700 shadow-md',
        outline: 'border-2 border-input bg-background hover:bg-accent hover:text-accent-foreground hover:border-brand-500',
        secondary: 'bg-gray-100 text-gray-900 hover:bg-gray-200 shadow-sm',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-brand-600 underline-offset-4 hover:underline',
        success: 'bg-gradient-to-r from-green-500 to-green-600 text-white hover:from-green-600 hover:to-green-700',
        warning: 'bg-gradient-to-r from-amber-500 to-amber-600 text-white hover:from-amber-600 hover:to-amber-700',
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

// Type fixing: Humein Button aur Anchor dono ke attributes ka union chahiye
type CombinedProps = React.ButtonHTMLAttributes<HTMLButtonElement> & React.AnchorHTMLAttributes<HTMLAnchorElement>;

export interface ButtonProps extends Omit<CombinedProps, 'color'>, VariantProps<typeof buttonVariants> {
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  href?: string;
}

const Button = React.forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  ({ className, variant, size, loading = false, leftIcon, rightIcon, children, disabled, href, target, ...props }, ref) => {
    
    // Determine the tag: Use 'a' if href exists, otherwise 'button'
    const Comp = href ? 'a' : 'button';

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

    // Common logic for classes
    const combinedClasses = cn(buttonVariants({ variant, size, className }));

    return (
      <Comp
        // @ts-ignore - TS sometimes struggles with polymorphic refs, this is a safe bypass here
        ref={ref}
        href={href}
        target={target}
        className={combinedClasses}
        // Button specific logic: a tag doesn't support 'disabled'
        {...(Comp === 'button' ? { disabled: disabled || loading, type: props.type || 'button' } : {})}
        // Accessibility
        aria-disabled={disabled || loading}
        role={href ? 'link' : 'button'}
        {...(props as any)}
      >
        {loading && <LoadingSpinner />}
        {!loading && leftIcon && <span className="mr-2 inline-flex">{leftIcon}</span>}
        <span className={cn(loading && "opacity-80")}>{children}</span>
        {!loading && rightIcon && <span className="ml-2 inline-flex">{rightIcon}</span>}
        
        {loading && (
          <span className="sr-only">Loading, please wait...</span>
        )}
      </Comp>
    );
  }
);

Button.displayName = 'Button';

export { Button, buttonVariants };