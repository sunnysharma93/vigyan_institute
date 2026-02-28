/**
 * Enhanced Header Component with Performance Optimizations and Accessibility
 * Features debounced scroll handling, proper imports, and comprehensive ARIA support
 */

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { NavLink } from 'react-router-dom';
import { Phone, Menu, X, Sun, Moon } from 'lucide-react';
import { useInstitute } from '../context/InstituteContext';
import { useTheme } from './theme-provider';
import Button from './ui/Button';
import { cn } from '../utils';
import { useDebounce } from '../hooks';

// Responsive breakpoints for consistent behavior
const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536
} as const;

// Navigation items configuration for maintainability
const NAVIGATION_ITEMS = [
  { path: '/', label: 'Home', icon: '🏠' },
  { path: '/about', label: 'About', icon: 'ℹ️' },
  { path: '/courses', label: 'Courses', icon: '📚' },
  { path: '/faculty', label: 'Faculty', icon: '👨‍🏫' },
  { path: '/admission', label: 'Admission', icon: '📝' },
  { path: '/notes', label: 'Notes', icon: '📚' },
  { path: '/contact-us', label: 'Contact Us', icon: '📞' }
] as const;

const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { instituteInfo, getPhoneNumber } = useInstitute();
  const { theme, setTheme } = useTheme();
  
  // Memoized theme detection
  const isDark = useMemo(() => {
    if (theme === 'system') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return theme === 'dark';
  }, [theme]);

  // Debounced scroll handler for performance
  const handleScroll = useCallback(() => {
    setIsScrolled(window.scrollY > 20);
  }, []);

  const debouncedScroll = useDebounce(handleScroll, 16); // ~60fps

  // Mobile detection with proper cleanup
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < BREAKPOINTS.xl);
    };

    checkMobile();
    
    const mediaQuery = window.matchMedia(`(max-width: ${BREAKPOINTS.xl - 1}px)`);
    mediaQuery.addEventListener('change', checkMobile);

    return () => {
      mediaQuery.removeEventListener('change', checkMobile);
    };
  }, []);

  // Scroll event listener with performance optimization
  useEffect(() => {
    window.addEventListener('scroll', debouncedScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', debouncedScroll);
    };
  }, [debouncedScroll]);

  // Memoized phone number to prevent recalculations
  const phoneNumber = useMemo(() => getPhoneNumber('main'), [getPhoneNumber]);
  const telLink = useMemo(() => `tel:${phoneNumber.replace(/\s/g, '')}`, [phoneNumber]);

  // Mobile menu handlers with accessibility
  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(prev => !prev);
  }, []);

  const closeMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(false);
  }, []);

  // Theme toggle handler
  const handleThemeToggle = useCallback(() => {
    setTheme(isDark ? 'light' : 'dark');
  }, [isDark, setTheme]);

  // Memoized navigation classes
  const headerClasses = useMemo(() => 
    cn(
      'fixed top-0 left-0 right-0 z-50 transition-all duration-300 glass-effect',
      isScrolled 
        ? 'bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-lg border-b border-gray-200/50 dark:border-gray-800/50' 
        : 'bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm shadow-sm border-b border-gray-200/30 dark:border-gray-800/30'
    ),
    [isScrolled]
  );

  // Memoized navigation link component
  const NavigationLink = useMemo(() => 
    ({ item, onClick, className }: { 
      item: typeof NAVIGATION_ITEMS[number]; 
      onClick?: () => void;
      className?: string;
    }) => (
      <NavLink
        to={item.path}
        className={({ isActive }) =>
          cn(
            'px-4 py-2.5 rounded-lg font-medium text-sm transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500',
            isActive
              ? 'bg-brand-600 text-white shadow-md'
              : 'text-gray-700 dark:text-gray-300 hover:text-brand-600 dark:hover:text-brand-400 hover:bg-brand-50 dark:hover:bg-brand-900/20',
            className
          )
        }
        onClick={onClick}
        aria-label={`Navigate to ${item.label}`}
      >
        {item.label}
      </NavLink>
    ),
    []
  );

  // Memoized mobile navigation link
  const MobileNavigationLink = useMemo(() =>
    ({ item, onClick }: { item: typeof NAVIGATION_ITEMS[number]; onClick?: () => void }) => (
      <li>
        <NavLink
          to={item.path}
          className={({ isActive }) =>
            cn(
              'block px-4 py-3 rounded-lg font-medium transition-all duration-300',
              isActive
                ? 'bg-brand-600 text-white shadow-md'
                : 'text-gray-700 hover:text-brand-600 hover:bg-brand-50'
            )
          }
          onClick={onClick}
          aria-label={`Navigate to ${item.label}`}
        >
          <div className="flex items-center space-x-3">
            <span className="text-lg" aria-hidden="true">{item.icon}</span>
            <span>{item.label}</span>
          </div>
        </NavLink>
      </li>
    ),
    []
  );

  return (
    <header className={headerClasses} role="banner">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8" role="navigation" aria-label="Main navigation">
        <div className="flex justify-between items-center h-16 lg:h-20">
          {/* Logo and Institute Info */}
          <div className="flex items-center space-x-4 lg:space-x-6">
            <NavLink 
              to="/" 
              className="flex items-center space-x-3 group hover-lift focus:outline-none focus:ring-2 focus:ring-brand-500 rounded-xl"
              aria-label="Vigyan Institute Home"
            >
              <div className="w-10 h-10 lg:w-12 lg:h-12 bg-gradient-to-br from-brand-600 to-brand-700 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl group-hover:scale-105 transition-all duration-300">
                <span className="text-white font-bold text-lg lg:text-xl">VI</span>
              </div>
              <div>
                <h1 className="text-xl lg:text-2xl font-bold text-gray-900 dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors duration-300">
                  {instituteInfo.name}
                </h1>
                <p className="text-xs lg:text-sm text-gray-500 dark:text-gray-400 font-medium hidden sm:block">
                  Excellence in Education
                </p>
              </div>
            </NavLink>
            
            {/* Phone Display - Desktop */}
            <div className="hidden lg:flex items-center space-x-3 bg-gradient-to-r from-brand-50 to-brand-100 dark:from-brand-900/20 dark:to-brand-800/20 px-4 py-2 rounded-xl border border-brand-100 dark:border-brand-800">
              <Phone className="w-4 h-4 text-brand-600 dark:text-brand-400" aria-hidden="true" />
              <div>
                <p className="text-xs text-gray-600 dark:text-gray-400 font-medium">Call Us</p>
                <p className="text-sm font-bold text-gray-900 dark:text-white">{phoneNumber}</p>
              </div>
            </div>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden xl:flex items-center space-x-1" role="menubar">
            {NAVIGATION_ITEMS.map((item) => (
              <div key={item.path} role="none">
                <NavigationLink item={item} />
              </div>
            ))}
          </div>

          {/* CTA Button & Theme Toggle - Desktop */}
          <div className="hidden lg:flex items-center space-x-3">
            <button
              onClick={handleThemeToggle}
              className="p-2 rounded-xl text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-brand-500 transition-all duration-200"
              aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
              title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
            >
              {isDark ? (
                <Sun className="w-5 h-5" aria-hidden="true" />
              ) : (
                <Moon className="w-5 h-5" aria-hidden="true" />
              )}
            </button>
            <Button
              href={telLink}
              size="sm"
              className="bg-gradient-to-r from-brand-600 to-brand-700 hover:from-brand-700 hover:to-brand-800"
              aria-label={`Call ${phoneNumber} to enroll now`}
            >
              Enroll Now
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className="xl:hidden p-2 rounded-xl text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-brand-500 transition-all duration-200"
            aria-label="Toggle mobile menu"
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" aria-hidden="true" />
            ) : (
              <Menu className="w-6 h-6" aria-hidden="true" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div 
            id="mobile-menu"
            className="xl:hidden border-t border-gray-200 bg-white/95 backdrop-blur-md"
            role="menu"
          >
            <div className="py-4 space-y-2">
              {/* Mobile Phone Display */}
              <div className="flex items-center justify-between bg-gradient-to-r from-blue-50 to-indigo-50 px-4 py-3 rounded-xl mx-4 border border-blue-100">
                <div className="flex items-center space-x-3">
                  <span className="text-blue-600 text-lg" aria-hidden="true">📞</span>
                  <div>
                    <p className="text-xs text-gray-600 font-medium">Call Us</p>
                    <p className="text-sm font-bold text-gray-900">{phoneNumber}</p>
                  </div>
                </div>
                <a
                  href={telLink}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  aria-label={`Call ${phoneNumber}`}
                >
                  Call
                </a>
              </div>
              
              {/* Mobile Navigation Links */}
              <ul className="px-4 py-2 space-y-1" role="none">
                {NAVIGATION_ITEMS.map((item) => (
                  <MobileNavigationLink 
                    key={item.path} 
                    item={item} 
                    onClick={closeMobileMenu}
                  />
                ))}
              </ul>
              
              {/* Mobile CTA Button */}
              <div className="px-4 py-3">
                <a
                  href={telLink}
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300 text-center focus:outline-none focus:ring-2 focus:ring-blue-500"
                  aria-label={`Call ${phoneNumber} to enroll now`}
                >
                  🚀 Enroll Now
                </a>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
