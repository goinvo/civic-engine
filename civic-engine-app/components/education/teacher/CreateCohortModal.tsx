'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Copy, Check, Download, QrCode, ArrowRight } from 'lucide-react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Card } from '../ui/Card';
import { GradeLevel } from '@/types/education';
import { cn } from '@/lib/utils';

interface CreateCohortModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateCohort: (data: CreateCohortData) => Promise<{ joinCode: string; cohortId: string }>;
}

export interface CreateCohortData {
  name: string;
  gradeLevel: GradeLevel;
  approximateSize: number;
}

type Step = 'form' | 'success';

const gradeLevelOptions: { value: GradeLevel; label: string }[] = [
  { value: '6-8', label: 'Middle School (6-8)' },
  { value: '9-10', label: 'High School (9-10)' },
  { value: '11-12', label: 'High School (11-12)' },
  { value: 'college', label: 'College / University' },
];

export function CreateCohortModal({ isOpen, onClose, onCreateCohort }: CreateCohortModalProps) {
  const [step, setStep] = useState<Step>('form');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState<'code' | 'link' | null>(null);

  // Form state
  const [name, setName] = useState('');
  const [gradeLevel, setGradeLevel] = useState<GradeLevel>('9-10');
  const [approximateSize, setApproximateSize] = useState('');

  // Success state
  const [joinCode, setJoinCode] = useState('');
  const [cohortId, setCohortId] = useState('');

  const resetForm = () => {
    setStep('form');
    setName('');
    setGradeLevel('9-10');
    setApproximateSize('');
    setJoinCode('');
    setCohortId('');
    setError(null);
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const result = await onCreateCohort({
        name,
        gradeLevel,
        approximateSize: parseInt(approximateSize) || 25,
      });
      setJoinCode(result.joinCode);
      setCohortId(result.cohortId);
      setStep('success');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create class');
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = async (type: 'code' | 'link') => {
    const text = type === 'code' ? joinCode : `civic-engine.app/join/${joinCode}`;
    await navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(null), 2000);
  };

  const joinLink = `civic-engine.app/join/${joinCode}`;

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title={step === 'form' ? 'Create New Class' : undefined}
      size="md"
    >
      <AnimatePresence mode="wait">
        {step === 'form' ? (
          <motion.form
            key="form"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            onSubmit={handleSubmit}
            className="space-y-4"
          >
            <Input
              label="Class Name"
              placeholder='e.g., "Period 3 - US Government"'
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />

            <div>
              <label className="block text-sm font-bold text-neutral-dark dark:text-white mb-1.5">
                Grade Level
              </label>
              <div className="grid grid-cols-2 gap-2">
                {gradeLevelOptions.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => setGradeLevel(option.value)}
                    className={cn(
                      'p-3 text-sm font-medium border-2 transition-all text-left',
                      gradeLevel === option.value
                        ? 'border-[#2F3BBD] bg-[#AFC5F5] text-[#2F3BBD]'
                        : 'border-gray-200 dark:border-gray-600 hover:border-gray-400'
                    )}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>

            <Input
              label="Approximate Class Size"
              type="number"
              placeholder="25"
              value={approximateSize}
              onChange={(e) => setApproximateSize(e.target.value)}
              min={1}
              max={100}
            />

            {error && (
              <p className="text-sm text-[#C91A2B] font-medium">{error}</p>
            )}

            <div className="flex gap-3 pt-2">
              <Button variant="outline" onClick={handleClose} type="button">
                Cancel
              </Button>
              <Button
                variant="primary"
                type="submit"
                isLoading={isLoading}
                disabled={!name.trim()}
              >
                Create Class
              </Button>
            </div>
          </motion.form>
        ) : (
          <motion.div
            key="success"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="text-center"
          >
            <div className="mb-6">
              <div className="w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
                <Check className="w-8 h-8 text-green-600" />
              </div>
              <h2 className="font-display text-xl font-black text-neutral-dark dark:text-white mb-2">
                Your class &ldquo;{name}&rdquo; is ready!
              </h2>
              <p className="text-neutral dark:text-gray-400">
                Share this code with your students to let them join.
              </p>
            </div>

            {/* Join Code Display */}
            <Card variant="elevated" padding="lg" className="mb-4">
              <p className="text-xs font-medium text-neutral dark:text-gray-400 mb-2">
                Join Code
              </p>
              <p className="font-mono text-3xl font-black text-[#2F3BBD] tracking-wider mb-4">
                {joinCode}
              </p>
              <div className="flex gap-2 justify-center">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => copyToClipboard('code')}
                  leftIcon={copied === 'code' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                >
                  {copied === 'code' ? 'Copied!' : 'Copy Code'}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => copyToClipboard('link')}
                  leftIcon={copied === 'link' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                >
                  {copied === 'link' ? 'Copied!' : 'Copy Link'}
                </Button>
              </div>
            </Card>

            <p className="text-sm text-neutral dark:text-gray-400 mb-6">
              Join Link: <span className="font-mono">{joinLink}</span>
            </p>

            {/* Next Steps */}
            <div className="text-left border-t border-gray-200 dark:border-gray-700 pt-4 mb-4">
              <p className="text-sm font-bold text-neutral-dark dark:text-white mb-2">
                Next steps:
              </p>
              <div className="flex gap-2">
                <Button
                  variant="primary"
                  size="sm"
                  rightIcon={<ArrowRight className="w-4 h-4" />}
                >
                  Select Policy Set
                </Button>
                <Button variant="outline" size="sm">
                  Customize Policies
                </Button>
              </div>
            </div>

            <Button variant="ghost" onClick={handleClose} className="w-full">
              Done
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </Modal>
  );
}
