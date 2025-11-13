'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Lock, CreditCard, ShieldCheck } from 'lucide-react';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LoginModal({ isOpen, onClose }: LoginModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto"
            >
              {/* Header */}
              <div className="relative bg-gradient-to-r from-primary to-primary-dark text-white p-6 rounded-t-2xl">
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-lg transition-colors"
                  aria-label="Close"
                >
                  <X className="w-5 h-5" />
                </button>
                <h2 className="text-2xl font-bold mb-2">
                  Login to Vote
                </h2>
                <p className="text-blue-100 text-sm">
                  Secure, verified voting for all Americans
                </p>
              </div>

              {/* Demo Notice */}
              <div className="mx-6 mt-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <p className="text-sm text-neutral-dark">
                  <strong className="text-yellow-800">Demo Version:</strong> This
                  is a placeholder for the full authentication system. Actual
                  voting features are not yet implemented.
                </p>
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Login Form (Disabled) */}
                <form className="space-y-4">
                  {/* Email */}
                  <div>
                    <label className="block text-sm font-medium text-neutral-dark mb-2">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral" />
                      <input
                        type="email"
                        disabled
                        placeholder="you@example.com"
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-neutral cursor-not-allowed"
                      />
                    </div>
                  </div>

                  {/* Password */}
                  <div>
                    <label className="block text-sm font-medium text-neutral-dark mb-2">
                      Password
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral" />
                      <input
                        type="password"
                        disabled
                        placeholder="••••••••"
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-neutral cursor-not-allowed"
                      />
                    </div>
                  </div>

                  {/* Login Button (Disabled) */}
                  <button
                    type="button"
                    disabled
                    className="w-full py-3 bg-gray-300 text-gray-500 rounded-lg font-medium cursor-not-allowed"
                  >
                    Login (Demo Only)
                  </button>
                </form>

                {/* Divider */}
                <div className="relative my-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-neutral">
                      Future Features
                    </span>
                  </div>
                </div>

                {/* Future Verification Steps */}
                <div className="space-y-4">
                  <h3 className="font-bold text-neutral-dark mb-3">
                    How Voter Verification Will Work:
                  </h3>

                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                      <span className="text-primary font-bold">1</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-neutral-dark text-sm mb-1">
                        Create Account
                      </h4>
                      <p className="text-neutral text-sm">
                        Sign up with your email and create a secure password.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                      <CreditCard className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-neutral-dark text-sm mb-1">
                        Verify Identity ($1 Fee)
                      </h4>
                      <p className="text-neutral text-sm">
                        One-time $1 charge to verify your identity and prevent
                        duplicate accounts. This uses secure payment verification.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                      <ShieldCheck className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-neutral-dark text-sm mb-1">
                        Start Voting
                      </h4>
                      <p className="text-neutral text-sm">
                        Once verified, vote on policies and compare options to help
                        rank what matters most to Americans.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Privacy Note */}
                <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                  <p className="text-sm text-neutral-dark">
                    <strong className="text-primary">Privacy First:</strong> Your
                    votes are anonymous. We only verify you're a real person, not
                    who you are or how you vote.
                  </p>
                </div>
              </div>

              {/* Footer */}
              <div className="px-6 pb-6">
                <button
                  onClick={onClose}
                  className="w-full py-3 border border-gray-300 text-neutral-dark rounded-lg font-medium hover:bg-gray-50 transition-colors"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
