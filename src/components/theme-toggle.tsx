import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from './theme-provider';
import { cn } from '../utils';

interface ThemeToggleProps {
  className?: string;
  variant?: 'default' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

export function ThemeToggle({ 
  className, 
  variant = 'outline', 
  size = 'md' 
}: ThemeToggleProps) {
  const { theme, setTheme } = useTheme();

  const isDark = theme === 'dark' || (theme === 'system' && 
    window.matchMedia('(prefers-color-scheme: dark)').matches);

  const baseClasses = [
    'inline-flex items-center justify-center rounded-xl font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2',
  ];

  const sizeClasses = {
    sm: 'w-8 h-8 p-1.5',
    md: 'w-10 h-10 p-2',
    lg: 'w-12 h-12 p-2.5',
  };

  const variantClasses = {
    default: [
      'bg-gradient-to-r from-brand-600 to-brand-700 text-white hover:from-brand-700 hover:to-brand-800 focus:ring-brand-500 shadow-medium hover:shadow-strong',
    ],
    outline: [
      'border-2 border-gray-300 bg-white hover:bg-gray-50 focus:ring-brand-500 hover:border-brand-500 dark:border-gray-600 dark:bg-gray-800 dark:hover:bg-gray-700',
    ],
    ghost: [
      'text-gray-600 bg-transparent hover:bg-gray-100 focus:ring-brand-500 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-100',
    ],
  };

  const toggleTheme = () => {
    setTheme(isDark ? 'light' : 'dark');
  };

  return (
    <button
      onClick={toggleTheme}
      className={cn(
        baseClasses,
        sizeClasses[size],
        variantClasses[variant],
        className
      )}
      aria-label="Toggle theme"
      title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
    >
      <Sun 
        className={cn(
          'h-full w-full transition-all duration-300',
          isDark ? 'rotate-90 scale-0 opacity-0' : 'rotate-0 scale-100 opacity-100'
        )} 
      />
      <Moon 
        className={cn(
          'absolute h-full w-full transition-all duration-300',
          isDark ? 'rotate-0 scale-100 opacity-100' : '-rotate-90 scale-0 opacity-0'
        )} 
      />
    </button>
  );
}

export default ThemeToggle;
