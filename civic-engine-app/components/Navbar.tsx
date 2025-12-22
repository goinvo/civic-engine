'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Title */}
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="w-8 h-8 bg-gray-300 dark:bg-gray-700 rounded-full flex items-center justify-center">
              <span className="font-display text-gray-600 dark:text-gray-400 font-bold text-sm">M</span>
            </div>
            <span className="font-display font-bold text-base text-black dark:text-white">
              Most Of Us
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className="text-sm font-medium text-black dark:text-white hover:text-gray-600 dark:hover:text-gray-400 transition-colors"
            >
              Top 10
            </Link>
            <Link
              href="/top20"
              className="text-sm font-medium text-black dark:text-white hover:text-gray-600 dark:hover:text-gray-400 transition-colors"
            >
              All Policies
            </Link>
            <Link
              href="/models"
              className="text-sm font-medium text-black dark:text-white hover:text-gray-600 dark:hover:text-gray-400 transition-colors"
            >
              Models
            </Link>
            <Link
              href="/wrapped"
              className="text-sm font-black text-white bg-[#2F3BBD] px-4 py-2 border-2 border-black hover:opacity-90 transition-opacity"
            >
              Policy Wrapped
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 hover:bg-neutral-light dark:hover:bg-gray-800 transition-colors border-2 border-black dark:border-gray-600"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6 text-neutral-dark dark:text-gray-300" />
            ) : (
              <Menu className="w-6 h-6 text-neutral-dark dark:text-gray-300" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex flex-col space-y-3">
              <Link
                href="/"
                className="px-4 py-2 text-neutral-dark dark:text-gray-300 hover:bg-neutral-light dark:hover:bg-gray-800 rounded-lg transition-colors font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                Top 10
              </Link>
              <Link
                href="/top20"
                className="px-4 py-2 text-neutral-dark dark:text-gray-300 hover:bg-neutral-light dark:hover:bg-gray-800 rounded-lg transition-colors font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                All Policies
              </Link>
              <Link
                href="/models"
                className="px-4 py-2 text-neutral-dark dark:text-gray-300 hover:bg-neutral-light dark:hover:bg-gray-800 rounded-lg transition-colors font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                Models
              </Link>
              <Link
                href="/wrapped"
                className="mx-4 px-4 py-3 bg-[#2F3BBD] text-white border-2 border-black font-black text-center"
                onClick={() => setMobileMenuOpen(false)}
              >
                Policy Wrapped
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
