'use client';

import { useState } from 'react';
import Link from 'next/link';
import { User, Globe, Menu, X } from 'lucide-react';
import LoginModal from './LoginModal';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [languageMenuOpen, setLanguageMenuOpen] = useState(false);
  const [loginModalOpen, setLoginModalOpen] = useState(false);

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Title */}
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
              <span className="font-display text-gray-600 font-bold text-sm">M</span>
            </div>
            <span className="font-display font-bold text-base text-black">
              Most Of Us
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className="text-sm font-medium text-black hover:text-gray-600 transition-colors"
            >
              Top 10
            </Link>
            <Link
              href="/top20"
              className="text-sm font-medium text-black hover:text-gray-600 transition-colors"
            >
              All Policies
            </Link>
            <Link
              href="/top20"
              className="text-sm font-medium text-black hover:text-gray-600 transition-colors"
            >
              All Policies
            </Link>

            {/* Language Switcher */}
            <button
              onClick={() => setLanguageMenuOpen(!languageMenuOpen)}
              className="flex items-center space-x-1 text-sm font-medium text-gray-600 hover:text-black transition-colors relative"
              aria-label="Select language"
            >
              <Globe className="w-4 h-4" />
              <span>EN</span>
            </button>

            {/* Login Button */}
            <button
              onClick={() => setLoginModalOpen(true)}
              className="flex items-center space-x-1 px-4 py-2 bg-[#2F3BBD] text-white hover:opacity-90 transition-opacity text-sm font-bold border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
              aria-label="Login"
            >
              <User className="w-4 h-4" />
              <span>Login</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 hover:bg-neutral-light transition-colors border-2 border-black"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6 text-neutral-dark" />
            ) : (
              <Menu className="w-6 h-6 text-neutral-dark" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <div className="flex flex-col space-y-3">
              <Link
                href="/"
                className="px-4 py-2 text-neutral-dark hover:bg-neutral-light rounded-lg transition-colors font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                Top 10
              </Link>
              <Link
                href="/top20"
                className="px-4 py-2 text-neutral-dark hover:bg-neutral-light rounded-lg transition-colors font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                All Policies
              </Link>
              <Link
                href="/top20"
                className="px-4 py-2 text-neutral-dark hover:bg-neutral-light rounded-lg transition-colors font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                All Policies
              </Link>

              {/* Mobile Language Selector */}
              <div className="px-4 py-2 border-t border-gray-200 mt-2 pt-4">
                <div className="text-sm text-neutral mb-2">Language</div>
                <div className="flex space-x-2">
                  <button className="px-3 py-1.5 bg-primary text-white rounded text-sm font-medium">
                    EN
                  </button>
                  <button className="px-3 py-1.5 bg-neutral-light text-neutral rounded text-sm">
                    ES
                  </button>
                  <button className="px-3 py-1.5 bg-neutral-light text-neutral rounded text-sm">
                    中文
                  </button>
                </div>
              </div>

              {/* Mobile Login Button */}
              <button
                onClick={() => {
                  setLoginModalOpen(true);
                  setMobileMenuOpen(false);
                }}
                className="mx-4 mt-2 flex items-center justify-center space-x-2 px-4 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors shadow-sm"
              >
                <User className="w-5 h-5" />
                <span className="font-medium">Login to Vote</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Login Modal */}
      <LoginModal isOpen={loginModalOpen} onClose={() => setLoginModalOpen(false)} />
    </nav>
  );
}
