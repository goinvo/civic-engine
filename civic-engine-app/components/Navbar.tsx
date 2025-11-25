'use client';

import { useState } from 'react';
import Link from 'next/link';
import { User, Globe, Menu, X } from 'lucide-react';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [languageMenuOpen, setLanguageMenuOpen] = useState(false);

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
              href="/votes"
              className="text-sm font-medium text-black dark:text-white hover:text-gray-600 dark:hover:text-gray-400 transition-colors"
            >
              My Votes
            </Link>

            {/* Language Switcher */}
            <button
              onClick={() => setLanguageMenuOpen(!languageMenuOpen)}
              className="flex items-center space-x-1 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors relative"
              aria-label="Select language"
            >
              <Globe className="w-4 h-4" />
              <span>EN</span>
            </button>

            {/* My Profile Button */}
            <Link
              href="/profile"
              className="flex items-center space-x-1 px-4 py-2 bg-[#2F3BBD] text-white hover:opacity-90 transition-opacity text-sm font-bold border-2 border-black dark:border-gray-600 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(75,85,99,1)]"
              aria-label="My Profile"
            >
              <User className="w-4 h-4" />
              <span>My Profile</span>
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
                href="/votes"
                className="px-4 py-2 text-neutral-dark dark:text-gray-300 hover:bg-neutral-light dark:hover:bg-gray-800 rounded-lg transition-colors font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                My Votes
              </Link>
              <Link
                href="/top20"
                className="px-4 py-2 text-neutral-dark dark:text-gray-300 hover:bg-neutral-light dark:hover:bg-gray-800 rounded-lg transition-colors font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                All Policies
              </Link>

              {/* Mobile Language Selector */}
              <div className="px-4 py-2 border-t border-gray-200 dark:border-gray-700 mt-2 pt-4">
                <div className="text-sm text-neutral dark:text-gray-400 mb-2">Language</div>
                <div className="flex space-x-2">
                  <button className="px-3 py-1.5 bg-primary text-white rounded text-sm font-medium">
                    EN
                  </button>
                  <button className="px-3 py-1.5 bg-neutral-light dark:bg-gray-700 text-neutral dark:text-gray-300 rounded text-sm">
                    ES
                  </button>
                  <button className="px-3 py-1.5 bg-neutral-light dark:bg-gray-700 text-neutral dark:text-gray-300 rounded text-sm">
                    中文
                  </button>
                </div>
              </div>

              {/* Mobile My Profile Button */}
              <Link
                href="/profile"
                onClick={() => setMobileMenuOpen(false)}
                className="mx-4 mt-2 flex items-center justify-center space-x-2 px-4 py-3 bg-[#2F3BBD] text-white border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:opacity-90 transition-opacity font-bold"
              >
                <User className="w-5 h-5" />
                <span className="font-medium">My Profile</span>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
