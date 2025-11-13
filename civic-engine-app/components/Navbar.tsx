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
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Title */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary-dark rounded-lg flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow">
              <span className="text-white font-bold text-xl">M</span>
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-lg text-primary leading-tight">
                Most of Us
              </span>
              <span className="text-xs text-neutral hidden sm:block">
                Policies We Agree On
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link
              href="/"
              className="text-neutral-dark hover:text-primary font-medium transition-colors"
            >
              Top 10
            </Link>
            <Link
              href="/top20"
              className="text-neutral-dark hover:text-primary font-medium transition-colors"
            >
              All Policies
            </Link>
            <Link
              href="/compare"
              className="text-neutral-dark hover:text-primary font-medium transition-colors"
            >
              Compare
            </Link>

            {/* Language Switcher */}
            <div className="relative">
              <button
                onClick={() => setLanguageMenuOpen(!languageMenuOpen)}
                className="flex items-center space-x-1 px-3 py-2 text-neutral hover:text-primary transition-colors"
                aria-label="Select language"
              >
                <Globe className="w-5 h-5" />
                <span className="text-sm font-medium">EN</span>
              </button>

              {languageMenuOpen && (
                <div className="absolute right-0 mt-2 w-32 bg-white rounded-lg shadow-lg border border-gray-200 py-1">
                  <button className="w-full px-4 py-2 text-left text-sm hover:bg-neutral-light transition-colors">
                    English
                  </button>
                  <button className="w-full px-4 py-2 text-left text-sm text-neutral hover:bg-neutral-light transition-colors">
                    Español
                  </button>
                  <button className="w-full px-4 py-2 text-left text-sm text-neutral hover:bg-neutral-light transition-colors">
                    中文
                  </button>
                </div>
              )}
            </div>

            {/* Login Button */}
            <button
              onClick={() => setLoginModalOpen(true)}
              className="flex items-center space-x-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors shadow-sm hover:shadow-md"
              aria-label="Login"
            >
              <User className="w-5 h-5" />
              <span className="font-medium">Login</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-neutral-light transition-colors"
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
                href="/compare"
                className="px-4 py-2 text-neutral-dark hover:bg-neutral-light rounded-lg transition-colors font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                Compare
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
