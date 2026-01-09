'use client';

import Link from 'next/link';
import { Github, Mail, ExternalLink, Compass } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white dark:bg-gray-950 border-t-2 border-black dark:border-gray-600 mt-auto">
      <div className="max-w-5xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About */}
          <div>
            <h3 className="font-bold text-neutral-dark dark:text-white mb-3">
              About Most of Us
            </h3>
            <p className="text-sm text-neutral dark:text-gray-400 mb-4">
              A platform highlighting policies with broad bipartisan support. All policies shown have 55%+ agreement among Democrats, Republicans, and Independents.
            </p>
            <div className="bg-gradient-to-r from-[#2F3BBD] to-[#C91A2B] border-2 border-black px-3 py-2">
              <p className="text-xs text-white font-bold">
                Demo Version — Not for actual voting
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-neutral-dark dark:text-white mb-3">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-sm text-neutral dark:text-gray-400 hover:text-neutral-dark dark:hover:text-white transition-colors">
                  Top 10 Policies
                </Link>
              </li>
              <li>
                <Link href="/top20" className="text-sm text-neutral dark:text-gray-400 hover:text-neutral-dark dark:hover:text-white transition-colors">
                  All Policies
                </Link>
              </li>
              <li>
                <Link href="/explore" className="text-sm text-neutral dark:text-gray-400 hover:text-neutral-dark dark:hover:text-white transition-colors inline-flex items-center gap-1">
                  <Compass className="w-3 h-3" />
                  Explore Problem Areas
                </Link>
              </li>
              <li>
                <a
                  href="https://americans-agree.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-neutral dark:text-gray-400 hover:text-neutral-dark dark:hover:text-white transition-colors inline-flex items-center gap-1"
                >
                  Data Source
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
            </ul>
          </div>

          {/* Data Sources */}
          <div>
            <h3 className="font-bold text-neutral-dark dark:text-white mb-3">
              Data Sources
            </h3>
            <div className="bg-gray-100 dark:bg-gray-900 border-2 border-black dark:border-gray-600 p-3">
              <ul className="text-sm text-neutral-dark dark:text-gray-300 space-y-1">
                <li>• YouGov</li>
                <li>• Pew Research Center</li>
                <li>• Associated Press-NORC</li>
                <li>• The Economist/YouGov</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-6 border-t-2 border-black dark:border-gray-600">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-sm text-neutral dark:text-gray-500">
              © {currentYear} Most of Us
            </p>
            <div className="flex items-center gap-2">
              <motion.a
                href="mailto:contact@mostofus.org"
                className="p-2 bg-white dark:bg-gray-900 border-2 border-black dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                aria-label="Contact us"
                whileHover={{ y: -2 }}
              >
                <Mail className="w-4 h-4 text-neutral-dark dark:text-white" />
              </motion.a>
              <motion.a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-white dark:bg-gray-900 border-2 border-black dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                aria-label="GitHub"
                whileHover={{ y: -2 }}
              >
                <Github className="w-4 h-4 text-neutral-dark dark:text-white" />
              </motion.a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
