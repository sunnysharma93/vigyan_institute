/**
 * NotFound page - 404 error page with helpful navigation
 * Provides user-friendly error handling and navigation options
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui';

const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4">
      <div className="max-w-2xl w-full text-center">
        {/* 404 Illustration */}
        <div className="mb-8">
          <div className="relative inline-block">
            <div className="text-9xl font-bold text-blue-600 opacity-20">404</div>
            <div className="absolute inset-0 flex items-center justify-center">
              <svg
                className="h-24 w-24 text-blue-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Error Message */}
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Page Not Found
        </h1>
        
        <p className="text-xl text-gray-600 mb-8">
          Oops! The page you're looking for seems to have vanished into thin air.
        </p>

        {/* Helpful Options */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">
            Here's what you can do:
          </h2>
          
          <div className="grid md:grid-cols-2 gap-4 text-left">
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-blue-600 text-sm">1</span>
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Go Back Home</h3>
                <p className="text-sm text-gray-600">
                  Return to our homepage and start fresh
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-blue-600 text-sm">2</span>
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Check the URL</h3>
                <p className="text-sm text-gray-600">
                  Make sure the address is spelled correctly
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-blue-600 text-sm">3</span>
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Use Search</h3>
                <p className="text-sm text-gray-600">
                  Search for what you're looking for
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-blue-600 text-sm">4</span>
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Contact Support</h3>
                <p className="text-sm text-gray-600">
                  We're here to help you find what you need
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/">
            <Button size="lg" className="w-full sm:w-auto">
              Go to Homepage
            </Button>
          </Link>
          
          <Link to="/contact">
            <Button variant="outline" size="lg" className="w-full sm:w-auto">
              Contact Support
            </Button>
          </Link>
        </div>

        {/* Popular Links */}
        <div className="mt-12">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Popular Pages
          </h3>
          <div className="flex flex-wrap justify-center gap-2">
            {[
              { name: 'Courses', path: '/courses' },
              { name: 'Faculty', path: '/faculty' },
              { name: 'Admission', path: '/admission' },
              { name: 'About Us', path: '/about' },
            ].map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-colors duration-200"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
