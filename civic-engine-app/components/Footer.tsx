import Link from 'next/link';
import { Github, Mail, Info } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 dark:bg-black text-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About Section */}
          <div>
            <h3 className="font-bold text-lg mb-4 flex items-center space-x-2 text-white">
              <Info className="w-5 h-5" />
              <span>About Most of Us</span>
            </h3>
            <p className="text-gray-300 dark:text-gray-400 text-sm leading-relaxed">
              A platform highlighting policies that have broad bipartisan support
              across America. All policies shown have 55%+ agreement among
              Democrats, Republicans, and Independents.
            </p>
            <div className="mt-4 px-3 py-2 bg-red-900/30 dark:bg-red-950/50 border border-red-800/50 dark:border-red-900/50 rounded-lg">
              <p className="text-xs text-gray-200 dark:text-gray-300">
                <strong>Demo Version</strong> - Not for actual voting
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-lg mb-4 text-white">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="text-gray-300 dark:text-gray-400 hover:text-white transition-colors text-sm"
                >
                  Top 10 Policies
                </Link>
              </li>
              <li>
                <Link
                  href="/top20"
                  className="text-gray-300 dark:text-gray-400 hover:text-white transition-colors text-sm"
                >
                  All Policies
                </Link>
              </li>
              <li>
                <a
                  href="https://americans-agree.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 dark:text-gray-400 hover:text-white transition-colors text-sm inline-flex items-center"
                >
                  Data Source: Americans-Agree.org
                  <span className="ml-1">↗</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Data & Transparency */}
          <div>
            <h3 className="font-bold text-lg mb-4 text-white">Data & Transparency</h3>
            <p className="text-gray-300 dark:text-gray-400 text-sm leading-relaxed mb-4">
              All policy data sourced from reputable polling organizations including:
            </p>
            <ul className="text-gray-300 dark:text-gray-400 text-sm space-y-1">
              <li>• YouGov</li>
              <li>• Pew Research Center</li>
              <li>• Associated Press-NORC</li>
              <li>• The Economist/YouGov</li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-8 border-t border-gray-700 dark:border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 dark:text-gray-500 text-sm">
              © {currentYear} Most of Us. A civic engagement demo platform.
            </p>
            <div className="flex items-center space-x-6">
              <a
                href="mailto:contact@mostofus.org"
                className="text-gray-400 dark:text-gray-500 hover:text-white transition-colors"
                aria-label="Contact us"
              >
                <Mail className="w-5 h-5" />
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 dark:text-gray-500 hover:text-white transition-colors"
                aria-label="GitHub"
              >
                <Github className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
