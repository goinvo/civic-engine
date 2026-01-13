'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav
      className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50"
      aria-label="Main navigation"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Title */}
          <Link
            href="/"
            className="flex items-center space-x-2 group rounded focus:outline-none focus:ring-2 focus:ring-[#2F3BBD] focus:ring-offset-2"
            aria-label="Most Of Us - Home"
          >
            <div className="w-8 h-8 bg-gray-300 dark:bg-gray-700 rounded-full flex items-center justify-center" aria-hidden="true">
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
              className="text-sm font-medium text-black dark:text-white hover:text-gray-600 dark:hover:text-gray-400 transition-colors rounded focus:outline-none focus:ring-2 focus:ring-[#2F3BBD] focus:ring-offset-2"
            >
              Top 10
            </Link>
            <Link
              href="/top20"
              className="text-sm font-medium text-black dark:text-white hover:text-gray-600 dark:hover:text-gray-400 transition-colors rounded focus:outline-none focus:ring-2 focus:ring-[#2F3BBD] focus:ring-offset-2"
            >
              All Policies
            </Link>
            <Link
              href="/explore"
              className="inline-flex items-center justify-center text-sm font-bold text-white bg-[#2F3BBD] px-4 py-2.5 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all focus:outline-none focus:ring-2 focus:ring-[#2F3BBD] focus:ring-offset-2"
            >
              Explore Issues
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 hover:bg-neutral-light dark:hover:bg-gray-800 transition-colors border-2 border-black dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-[#2F3BBD] focus:ring-offset-1"
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6 text-neutral-dark dark:text-gray-300" aria-hidden="true" />
            ) : (
              <Menu className="w-6 h-6 text-neutral-dark dark:text-gray-300" aria-hidden="true" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div
            id="mobile-menu"
            className="md:hidden py-4 border-t border-gray-200 dark:border-gray-700"
          >
            <div className="flex flex-col space-y-3">
              <Link
                href="/"
                className="px-4 py-2 text-neutral-dark dark:text-gray-300 hover:bg-neutral-light dark:hover:bg-gray-800 rounded-lg transition-colors font-medium focus:outline-none focus:ring-2 focus:ring-[#2F3BBD] focus:ring-inset"
                onClick={() => setMobileMenuOpen(false)}
              >
                Top 10
              </Link>
              <Link
                href="/top20"
                className="px-4 py-2 text-neutral-dark dark:text-gray-300 hover:bg-neutral-light dark:hover:bg-gray-800 rounded-lg transition-colors font-medium focus:outline-none focus:ring-2 focus:ring-[#2F3BBD] focus:ring-inset"
                onClick={() => setMobileMenuOpen(false)}
              >
                All Policies
              </Link>
              <Link
                href="/explore"
                className="mx-4 inline-flex items-center justify-center px-4 py-3 bg-[#2F3BBD] text-white border-2 border-black font-bold text-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all focus:outline-none focus:ring-2 focus:ring-[#2F3BBD] focus:ring-offset-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Explore Issues
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
