'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Lock, Users, Eye, EyeOff } from 'lucide-react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { cn } from '@/lib/utils';

interface JoinClassFormProps {
  onJoin: (joinCode: string, profile: StudentProfileData) => Promise<{ className: string; teacherName: string }>;
  initialCode?: string;
}

export interface StudentProfileData {
  displayName: string;
  email?: string;
  password: string;
}

type Step = 'code' | 'profile' | 'welcome';

export function JoinClassForm({ onJoin, initialCode }: JoinClassFormProps) {
  const [step, setStep] = useState<Step>(initialCode ? 'profile' : 'code');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  // Form state
  const [codeLeft, setCodeLeft] = useState(initialCode?.split('-')[0] || '');
  const [codeRight, setCodeRight] = useState(initialCode?.split('-')[1] || '');
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Success state
  const [className, setClassName] = useState('');
  const [teacherName, setTeacherName] = useState('');

  const joinCode = `${codeLeft}-${codeRight}`.toUpperCase();

  const handleCodeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (codeLeft.length === 3 && codeRight.length === 4) {
      setStep('profile');
    }
  };

  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const result = await onJoin(joinCode, {
        displayName,
        email: email || undefined,
        password,
      });
      setClassName(result.className);
      setTeacherName(result.teacherName);
      setStep('welcome');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to join class');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <AnimatePresence mode="wait">
        {step === 'code' && (
          <motion.div
            key="code"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <Card variant="elevated" padding="lg">
              <h1 className="font-display text-2xl font-black text-neutral-dark dark:text-white mb-2 text-center">
                Join a Class
              </h1>
              <p className="text-neutral dark:text-gray-400 text-center mb-6">
                Enter the code your teacher gave you:
              </p>

              <form onSubmit={handleCodeSubmit}>
                <fieldset>
                  <legend className="sr-only">Enter your class join code</legend>
                  <div className="flex items-center justify-center gap-2 mb-6">
                    <div>
                      <label htmlFor="code-left" className="sr-only">First 3 characters of code</label>
                      <input
                        id="code-left"
                        type="text"
                        value={codeLeft}
                        onChange={(e) => setCodeLeft(e.target.value.toUpperCase().slice(0, 3))}
                        placeholder="ABC"
                        maxLength={3}
                        autoComplete="off"
                        className={cn(
                          'w-24 h-16 text-center text-2xl font-mono font-black',
                          'border-2 border-black dark:border-gray-600',
                          'focus:outline-none focus:ring-2 focus:ring-[#2F3BBD]',
                          'uppercase tracking-widest'
                        )}
                      />
                    </div>
                    <span className="text-3xl font-bold text-neutral-dark dark:text-white" aria-hidden="true">
                      -
                    </span>
                    <div>
                      <label htmlFor="code-right" className="sr-only">Last 4 characters of code</label>
                      <input
                        id="code-right"
                        type="text"
                        value={codeRight}
                        onChange={(e) => setCodeRight(e.target.value.toUpperCase().slice(0, 4))}
                        placeholder="1234"
                        maxLength={4}
                        autoComplete="off"
                        className={cn(
                          'w-28 h-16 text-center text-2xl font-mono font-black',
                          'border-2 border-black dark:border-gray-600',
                          'focus:outline-none focus:ring-2 focus:ring-[#2F3BBD]',
                          'uppercase tracking-widest'
                        )}
                      />
                    </div>
                  </div>
                </fieldset>

                <Button
                  type="submit"
                  variant="primary"
                  className="w-full"
                  disabled={codeLeft.length !== 3 || codeRight.length !== 4}
                  rightIcon={<ArrowRight className="w-4 h-4" />}
                >
                  Join Class
                </Button>
              </form>

              <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                <p className="text-sm text-neutral dark:text-gray-400 text-center">
                  Don&apos;t have a code? This platform is for classroom use.
                  Ask your teacher to set up a class.
                </p>
              </div>
            </Card>
          </motion.div>
        )}

        {step === 'profile' && (
          <motion.div
            key="profile"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <Card variant="elevated" padding="lg">
              <h1 className="font-display text-2xl font-black text-neutral-dark dark:text-white mb-2 text-center">
                Create Your Profile
              </h1>
              <p className="text-neutral dark:text-gray-400 text-center mb-6">
                Joining with code: <span className="font-mono font-bold">{joinCode}</span>
              </p>

              <form onSubmit={handleProfileSubmit} className="space-y-4">
                <Input
                  label="Display Name"
                  placeholder="First name or nickname"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  hint="This is what classmates see. Can be first name only."
                  required
                />

                <Input
                  label="Email (optional)"
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  hint="Only for password recovery. Teacher can't see it."
                />

                <div className="relative">
                  <Input
                    label="Create Password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="At least 6 characters"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength={6}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-9 text-neutral hover:text-neutral-dark dark:text-gray-400 dark:hover:text-gray-200 focus:outline-none focus:ring-2 focus:ring-[#2F3BBD] rounded"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                    aria-pressed={showPassword}
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" aria-hidden="true" />
                    ) : (
                      <Eye className="w-5 h-5" aria-hidden="true" />
                    )}
                  </button>
                </div>

                {/* Privacy Notice */}
                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
                  <div className="flex items-start gap-3">
                    <Lock className="w-5 h-5 text-blue-600 mt-0.5" />
                    <div className="text-sm">
                      <p className="font-bold text-blue-800 dark:text-blue-300 mb-1">
                        Privacy Note:
                      </p>
                      <ul className="space-y-1 text-blue-700 dark:text-blue-400">
                        <li>
                          • Your teacher grades your reasoning, but responses are
                          anonymized — they won&apos;t know which position is yours
                        </li>
                        <li>• Your classmates can see your discussion posts</li>
                        <li>• Only you can see your personal civic profile</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {error && (
                  <p role="alert" className="text-sm text-[#C91A2B] font-medium">{error}</p>
                )}

                {isLoading && (
                  <p role="status" aria-live="polite" className="sr-only">
                    Joining class, please wait...
                  </p>
                )}

                <div className="flex gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setStep('code')}
                  >
                    Back
                  </Button>
                  <Button
                    type="submit"
                    variant="primary"
                    className="flex-1"
                    isLoading={isLoading}
                    disabled={!displayName.trim() || password.length < 6}
                  >
                    Join Class
                  </Button>
                </div>
              </form>
            </Card>
          </motion.div>
        )}

        {step === 'welcome' && (
          <motion.div
            key="welcome"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <Card variant="elevated" padding="lg" className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
                <Users className="w-8 h-8 text-green-600" />
              </div>

              <h1 className="font-display text-2xl font-black text-neutral-dark dark:text-white mb-2">
                Welcome to {className}
              </h1>
              <p className="text-neutral dark:text-gray-400 mb-6">
                Teacher: {teacherName}
              </p>

              <div className="text-left bg-neutral-light dark:bg-gray-800 p-4 mb-6">
                <p className="font-bold text-neutral-dark dark:text-white mb-3">
                  What you&apos;ll do:
                </p>
                <ol className="space-y-2 text-sm text-neutral dark:text-gray-400">
                  <li className="flex items-start gap-2">
                    <span className="font-bold text-[#2F3BBD]">1.</span>
                    Explore policies and gather evidence
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-bold text-[#2F3BBD]">2.</span>
                    Form your own positions (with reasons)
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-bold text-[#2F3BBD]">3.</span>
                    Discuss with classmates
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-bold text-[#2F3BBD]">4.</span>
                    Reflect on what you learned
                  </li>
                </ol>
              </div>

              <p className="text-sm text-neutral dark:text-gray-400 mb-4">
                Current phase: <span className="font-bold">Policy Exploration</span>
              </p>

              <Button
                variant="primary"
                className="w-full"
                rightIcon={<ArrowRight className="w-4 h-4" />}
              >
                Get Started
              </Button>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
