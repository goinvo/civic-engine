'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Check,
  ChevronRight,
  Clock,
  Eye,
  Plus,
  X,
  GripVertical
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription } from '../ui/Card';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { Modal } from '../ui/Modal';
import { PolicySetPreset } from '@/types/education';
import { cn } from '@/lib/utils';

// Preset policy sets
const POLICY_SET_PRESETS: PolicySetPreset[] = [
  {
    id: 'starter',
    name: 'Starter Set',
    description: '8 policies that affect students\' daily lives',
    estimatedTime: '2-3 class periods',
    policyIds: [
      'universal-background-checks',
      'minimum-wage-17',
      'right-to-repair',
      'junk-fee-prevention',
      'mental-health-988',
      'clean-energy-investment',
      'affordable-housing-supply',
      'free-community-college',
    ],
  },
  {
    id: 'healthcare',
    name: 'Healthcare Focus',
    description: 'Deep dive into healthcare policy options',
    estimatedTime: '2 class periods',
    policyIds: [
      'medicare-for-all',
      'healthcare-public-option',
      'aca-expansion',
      'medicare-drug-negotiation',
      'mental-health-988',
      'prescription-drug-import',
    ],
  },
  {
    id: 'economic',
    name: 'Economic Policy',
    description: 'Wages, jobs, taxes, and economic security',
    estimatedTime: '2 class periods',
    policyIds: [
      'minimum-wage-17',
      'universal-basic-income',
      'federal-job-guarantee',
      'ultra-millionaire-tax',
      'expanded-child-tax-credit',
      'social-security-cap',
    ],
  },
  {
    id: 'governance',
    name: 'Governance & Reform',
    description: 'How our democracy works (or doesn\'t)',
    estimatedTime: '2 class periods',
    policyIds: [
      'congress-term-limits',
      'scotus-term-limits',
      'overturn-citizens-united',
      'campaign-finance-disclosure',
      'congress-stock-ban',
      'free-voter-id',
    ],
  },
];

// Student-friendly policy descriptions
const POLICY_DISPLAY: Record<string, { title: string; hook: string }> = {
  'universal-background-checks': { title: 'Universal Background Checks', hook: 'school safety' },
  'minimum-wage-17': { title: '$17 Minimum Wage', hook: 'your paycheck' },
  'right-to-repair': { title: 'Right to Repair', hook: 'your phone, your car' },
  'junk-fee-prevention': { title: 'Junk Fee Prevention', hook: 'concert tickets, subscriptions' },
  'mental-health-988': { title: 'Mental Health 988 Lifeline', hook: 'crisis access' },
  'clean-energy-investment': { title: 'Clean Energy Investment', hook: 'your future climate' },
  'affordable-housing-supply': { title: 'Affordable Housing Supply', hook: 'moving out someday' },
  'free-community-college': { title: 'Free Community College', hook: 'your next step' },
  'medicare-for-all': { title: 'Medicare for All', hook: 'universal healthcare' },
  'healthcare-public-option': { title: 'Public Option', hook: 'government health plan' },
  'aca-expansion': { title: 'Expand the ACA', hook: 'Obamacare improvements' },
  'medicare-drug-negotiation': { title: 'Medicare Drug Negotiation', hook: 'lower drug prices' },
  'prescription-drug-import': { title: 'Drug Import from Canada', hook: 'cheaper medications' },
  'universal-basic-income': { title: 'Universal Basic Income', hook: '$1000/month for everyone' },
  'federal-job-guarantee': { title: 'Federal Job Guarantee', hook: 'guaranteed employment' },
  'ultra-millionaire-tax': { title: 'Ultra-Millionaire Tax', hook: 'wealth over $50M' },
  'expanded-child-tax-credit': { title: 'Expanded Child Tax Credit', hook: 'family support' },
  'social-security-cap': { title: 'Lift Social Security Cap', hook: 'retirement funding' },
  'congress-term-limits': { title: 'Congress Term Limits', hook: 'no career politicians' },
  'scotus-term-limits': { title: 'Supreme Court Term Limits', hook: '18-year terms' },
  'overturn-citizens-united': { title: 'Overturn Citizens United', hook: 'money in politics' },
  'campaign-finance-disclosure': { title: 'Campaign Finance Disclosure', hook: 'donor transparency' },
  'congress-stock-ban': { title: 'Congress Stock Trading Ban', hook: 'no insider trading' },
  'free-voter-id': { title: 'Free & Easy Voter ID', hook: 'accessible voting' },
};

interface PolicySetSelectorProps {
  onSelect: (policyIds: string[]) => void;
  selectedPolicies?: string[];
  className?: string;
}

export function PolicySetSelector({ onSelect, selectedPolicies = [], className }: PolicySetSelectorProps) {
  const [previewPreset, setPreviewPreset] = useState<PolicySetPreset | null>(null);
  const [customSelection, setCustomSelection] = useState<string[]>(selectedPolicies);
  const [showCustom, setShowCustom] = useState(false);

  const handlePresetSelect = (preset: PolicySetPreset) => {
    onSelect(preset.policyIds);
  };

  const togglePolicy = (policyId: string) => {
    setCustomSelection(prev =>
      prev.includes(policyId)
        ? prev.filter(id => id !== policyId)
        : [...prev, policyId]
    );
  };

  const handleCustomConfirm = () => {
    onSelect(customSelection);
    setShowCustom(false);
  };

  return (
    <div className={cn('space-y-4', className)}>
      <div className="mb-6">
        <h2 className="font-display text-2xl font-black text-neutral-dark dark:text-white mb-2">
          Select Policy Set
        </h2>
        <p className="text-neutral dark:text-gray-400">
          Choose a pre-built set or customize your own:
        </p>
      </div>

      {/* Preset Cards */}
      <div className="space-y-3">
        {POLICY_SET_PRESETS.map((preset) => (
          <PolicySetCard
            key={preset.id}
            preset={preset}
            isRecommended={preset.id === 'starter'}
            onPreview={() => setPreviewPreset(preset)}
            onSelect={() => handlePresetSelect(preset)}
          />
        ))}

        {/* Full Library */}
        <Card
          variant="outlined"
          padding="md"
          className="cursor-pointer hover:border-gray-400 transition-colors"
          onClick={() => setShowCustom(true)}
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-neutral-dark dark:text-white">
                Full Library
              </h3>
              <p className="text-sm text-neutral dark:text-gray-400">
                All 35 policies — pick and choose
              </p>
            </div>
            <Button variant="outline" size="sm">
              Browse Library
            </Button>
          </div>
        </Card>

        {/* Custom Policy */}
        <Card variant="outlined" padding="md">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-neutral-light dark:bg-gray-800 flex items-center justify-center">
                <Plus className="w-5 h-5 text-neutral-dark dark:text-gray-400" />
              </div>
              <div>
                <h3 className="font-bold text-neutral-dark dark:text-white">
                  Add Custom Policy
                </h3>
                <p className="text-sm text-neutral dark:text-gray-400">
                  Create a local or state-specific policy
                </p>
              </div>
            </div>
            <Button variant="outline" size="sm">
              Create Custom
            </Button>
          </div>
        </Card>
      </div>

      {/* Preview Modal */}
      <Modal
        isOpen={!!previewPreset}
        onClose={() => setPreviewPreset(null)}
        title={previewPreset?.name}
        description={previewPreset?.description}
        size="lg"
      >
        {previewPreset && (
          <div>
            <div className="space-y-2 mb-6">
              {previewPreset.policyIds.map((policyId) => {
                const policy = POLICY_DISPLAY[policyId];
                return (
                  <div
                    key={policyId}
                    className="flex items-center gap-3 p-3 bg-neutral-light dark:bg-gray-800"
                  >
                    <Check className="w-5 h-5 text-green-600" />
                    <div>
                      <p className="font-medium text-neutral-dark dark:text-white">
                        {policy?.title || policyId}
                      </p>
                      {policy?.hook && (
                        <p className="text-sm text-neutral dark:text-gray-400">
                          ({policy.hook})
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="flex gap-3">
              <Button variant="outline" onClick={() => setPreviewPreset(null)}>
                Back
              </Button>
              <Button
                variant="primary"
                onClick={() => {
                  handlePresetSelect(previewPreset);
                  setPreviewPreset(null);
                }}
              >
                Confirm Selection
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}

interface PolicySetCardProps {
  preset: PolicySetPreset;
  isRecommended?: boolean;
  onPreview: () => void;
  onSelect: () => void;
}

function PolicySetCard({ preset, isRecommended, onPreview, onSelect }: PolicySetCardProps) {
  return (
    <Card variant="default" padding="md">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-bold text-neutral-dark dark:text-white">
              {preset.name}
            </h3>
            {isRecommended && (
              <Badge variant="primary" size="sm">
                Recommended
              </Badge>
            )}
          </div>
          <p className="text-sm text-neutral dark:text-gray-400 mb-2">
            {preset.description}
          </p>
          <div className="flex items-center gap-1 text-xs text-neutral dark:text-gray-400">
            <Clock className="w-3 h-3" />
            <span>Estimated time: {preset.estimatedTime}</span>
          </div>
        </div>
        <div className="flex gap-2 ml-4">
          <Button variant="ghost" size="sm" onClick={onPreview}>
            <Eye className="w-4 h-4" />
          </Button>
          <Button variant="primary" size="sm" onClick={onSelect}>
            Select
          </Button>
        </div>
      </div>
    </Card>
  );
}
