'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  Building2,
  Users,
  Clock,
  DollarSign,
  CheckSquare,
  Globe,
  Info,
  ChevronDown,
  BarChart3,
  ExternalLink,
  FileText,
} from 'lucide-react';
import { Card, Button, Badge } from '@/components/education/ui';
import { PreferenceRadar } from '@/components/problem-areas/PreferenceRadar';
import { calculatePreferenceProfile } from '@/lib/problem-areas/preference-profile';
import { loadPreferences } from '@/lib/problem-areas';
import {
  PREFERENCE_DIMENSIONS,
  type PreferenceDimension,
  type PreferenceDimensionId,
  type UserPreferenceProfile,
} from '@/types/problem-areas';
import { statSources } from '@/data/statSources';
import { policies } from '@/data/policies';

// Icon mapping
const DIMENSION_ICONS: Record<string, React.ReactNode> = {
  Building2: <Building2 className="w-5 h-5" />,
  Users: <Users className="w-5 h-5" />,
  Clock: <Clock className="w-5 h-5" />,
  DollarSign: <DollarSign className="w-5 h-5" />,
  CheckSquare: <CheckSquare className="w-5 h-5" />,
  Globe: <Globe className="w-5 h-5" />,
};

export default function MethodologyPage() {
  const [mounted, setMounted] = useState(false);
  const [userProfile, setUserProfile] = useState<UserPreferenceProfile | null>(null);
  const [expandedDimension, setExpandedDimension] = useState<PreferenceDimensionId | null>(null);

  useEffect(() => {
    setMounted(true);
    const prefs = loadPreferences();
    const ratings = prefs?.implementationRatings ?? {};
    if (Object.keys(ratings).length > 0) {
      const profile = calculatePreferenceProfile(ratings);
      setUserProfile(profile);
    }
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-gray-500">Loading...</div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-950 pb-24">
      {/* Top bar */}
      <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <Link
              href="/explore"
              className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Explore
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-display text-3xl md:text-4xl font-black text-neutral-dark dark:text-white mb-3">
            How We Map Your Values
          </h1>
          <p className="text-base text-neutral dark:text-gray-400 leading-relaxed max-w-2xl">
            When you rate policy approaches, we analyze your choices across six key dimensions
            to create a preference profile that reflects your values.
          </p>
        </div>

        {/* User's Radar (if they have ratings) */}
        {userProfile && (
          <Card variant="default" padding="lg" className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <BarChart3 className="w-5 h-5 text-[#2F3BBD]" />
              <h2 className="font-display text-xl font-black text-neutral-dark dark:text-white">
                Your Preference Profile
              </h2>
              <Badge variant={userProfile.confidence === 'high' ? 'success' : userProfile.confidence === 'medium' ? 'secondary' : 'outline'}>
                {userProfile.confidence} confidence
              </Badge>
            </div>

            <div className="grid md:grid-cols-2 gap-6 items-center">
              <PreferenceRadar
                userProfile={userProfile}
                height={300}
                primaryColor="#3B82F6"
              />

              <div className="space-y-3">
                <p className="text-sm text-neutral dark:text-gray-400">
                  Based on <span className="font-bold text-neutral-dark dark:text-white">{userProfile.approachesRated} rated approaches</span>,
                  here's how your preferences map across the six dimensions.
                </p>

                {/* Dimension scores list */}
                <div className="space-y-2">
                  {PREFERENCE_DIMENSIONS.map((dim) => {
                    const score = userProfile.dimensions[dim.id];
                    return (
                      <div key={dim.id} className="flex items-center gap-3">
                        <span className="text-xs text-neutral dark:text-gray-500 w-16">{dim.label}</span>
                        <div className="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                          <motion.div
                            className="h-full rounded-full"
                            style={{ backgroundColor: dim.color }}
                            initial={{ width: 0 }}
                            animate={{ width: `${score}%` }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                          />
                        </div>
                        <span className="text-xs font-bold text-neutral-dark dark:text-white w-8 text-right">
                          {Math.round(score)}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </Card>
        )}

        {/* No ratings message */}
        {!userProfile && (
          <Card variant="outlined" padding="lg" className="mb-8 text-center">
            <Info className="w-8 h-8 mx-auto mb-3 text-neutral" />
            <h2 className="font-display text-lg font-black text-neutral-dark dark:text-white mb-2">
              No Ratings Yet
            </h2>
            <p className="text-sm text-neutral dark:text-gray-400 mb-4">
              Rate some policy approaches to see your preference profile visualized here.
            </p>
            <Link href="/explore">
              <Button variant="primary">Start Exploring</Button>
            </Link>
          </Card>
        )}

        {/* The Six Dimensions */}
        <h2 className="font-display text-2xl font-black text-neutral-dark dark:text-white mb-4">
          The Six Dimensions
        </h2>
        <p className="text-sm text-neutral dark:text-gray-400 mb-6">
          Every policy approach is scored on these six dimensions. Your ratings reveal which
          end of each spectrum you tend to favor.
        </p>

        <div className="space-y-4 mb-12">
          {PREFERENCE_DIMENSIONS.map((dim, index) => (
            <DimensionCard
              key={dim.id}
              dimension={dim}
              userScore={userProfile?.dimensions[dim.id]}
              isExpanded={expandedDimension === dim.id}
              onToggle={() => setExpandedDimension(expandedDimension === dim.id ? null : dim.id)}
              index={index}
            />
          ))}
        </div>

        {/* How It Works */}
        <Card variant="default" padding="lg">
          <h2 className="font-display text-xl font-black text-neutral-dark dark:text-white mb-4">
            How the Algorithm Works
          </h2>

          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#2F3BBD] to-[#C91A2B] flex items-center justify-center text-white font-bold text-sm shrink-0">
                1
              </div>
              <div>
                <h3 className="font-bold text-neutral-dark dark:text-white mb-1">
                  Each approach is pre-scored
                </h3>
                <p className="text-sm text-neutral dark:text-gray-400">
                  Policy experts have scored each implementation approach from 0-100 on all six dimensions.
                  For example, "Single-Payer Healthcare" scores 95 on Government Role (very government-led)
                  but 15 on Individual Choice (standardized).
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#2F3BBD] to-[#C91A2B] flex items-center justify-center text-white font-bold text-sm shrink-0">
                2
              </div>
              <div>
                <h3 className="font-bold text-neutral-dark dark:text-white mb-1">
                  Your ratings become weights
                </h3>
                <p className="text-sm text-neutral dark:text-gray-400">
                  When you rate an approach, we use that rating as a weight. "Strongly Support" gives
                  full weight to that approach's dimension scores. "Strongly Oppose" inverts them.
                  Neutral ratings have minimal influence.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#2F3BBD] to-[#C91A2B] flex items-center justify-center text-white font-bold text-sm shrink-0">
                3
              </div>
              <div>
                <h3 className="font-bold text-neutral-dark dark:text-white mb-1">
                  We compute your profile
                </h3>
                <p className="text-sm text-neutral dark:text-gray-400">
                  By averaging the weighted dimension scores across all your rated approaches,
                  we calculate where you fall on each spectrum. More ratings = higher confidence
                  in the profile accuracy.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#2F3BBD] to-[#C91A2B] flex items-center justify-center text-white font-bold text-sm shrink-0">
                4
              </div>
              <div>
                <h3 className="font-bold text-neutral-dark dark:text-white mb-1">
                  Visualized as a radar
                </h3>
                <p className="text-sm text-neutral dark:text-gray-400">
                  The radar chart shows all six dimensions at once, making it easy to see your
                  overall preference shape and compare it with specific policy approaches.
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* Data Sources Section */}
        <div className="mt-12">
          <h2 className="font-display text-2xl font-black text-neutral-dark dark:text-white mb-4 flex items-center gap-2">
            <FileText className="w-6 h-6" />
            Data Sources
          </h2>
          <p className="text-sm text-neutral dark:text-gray-400 mb-6">
            The statistics displayed on the landing page are sourced from reputable research organizations,
            government agencies, and nonpartisan polling institutions.
          </p>

          <div className="space-y-4">
            {statSources.map((policyStats, index) => {
              const policy = policies.find(p => p.id === policyStats.policyId);
              if (!policy) return null;

              return (
                <motion.div
                  key={policyStats.policyId}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Card variant="outlined" padding="md">
                    <h3 className="font-bold text-neutral-dark dark:text-white mb-3">
                      {policy.title}
                    </h3>
                    <div className="space-y-3">
                      {policyStats.stats.map((stat, i) => (
                        <div key={i} className="flex items-start gap-3 text-sm">
                          <Badge variant="secondary" className="shrink-0">
                            {stat.label}: {stat.value}
                          </Badge>
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <span className="text-neutral-dark dark:text-white font-medium">
                                {stat.source}
                              </span>
                              {stat.year && (
                                <span className="text-xs text-neutral dark:text-gray-500">
                                  ({stat.year})
                                </span>
                              )}
                              {stat.url && (
                                <a
                                  href={stat.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-[#2F3BBD] hover:underline"
                                >
                                  <ExternalLink className="w-3 h-3" />
                                </a>
                              )}
                            </div>
                            {stat.notes && (
                              <p className="text-xs text-neutral dark:text-gray-500 mt-1">
                                {stat.notes}
                              </p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Sticky footer */}
      <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t-2 border-black dark:border-gray-600 py-4 z-50">
        <div className="max-w-4xl mx-auto px-4 flex items-center justify-between">
          <p className="text-sm text-neutral dark:text-gray-400">
            {userProfile
              ? `Profile based on ${userProfile.approachesRated} ratings`
              : 'Rate approaches to build your profile'
            }
          </p>
          <Link href="/explore">
            <Button variant="primary">
              {userProfile ? 'Continue Exploring' : 'Start Rating'}
            </Button>
          </Link>
        </div>
      </div>
    </main>
  );
}

// Dimension Card Component
interface DimensionCardProps {
  dimension: PreferenceDimension;
  userScore?: number;
  isExpanded: boolean;
  onToggle: () => void;
  index: number;
}

function DimensionCard({ dimension, userScore, isExpanded, onToggle, index }: DimensionCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
    >
      <Card variant="outlined" padding="none" className="overflow-hidden">
        <button
          onClick={onToggle}
          className="w-full p-4 flex items-center gap-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-left"
        >
          {/* Icon */}
          <div
            className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
            style={{ backgroundColor: `${dimension.color}20`, color: dimension.color }}
          >
            {DIMENSION_ICONS[dimension.icon]}
          </div>

          {/* Title and spectrum */}
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-neutral-dark dark:text-white">
              {dimension.title}
            </h3>
            <div className="flex items-center gap-2 text-xs text-neutral dark:text-gray-500">
              <span>{dimension.lowLabel}</span>
              <span className="flex-1 h-px bg-gray-300 dark:bg-gray-600" />
              <span>{dimension.highLabel}</span>
            </div>
          </div>

          {/* User score (if available) */}
          {userScore !== undefined && (
            <div className="text-right shrink-0">
              <div className="text-lg font-bold" style={{ color: dimension.color }}>
                {Math.round(userScore)}
              </div>
              <div className="text-xs text-neutral dark:text-gray-500">your score</div>
            </div>
          )}

          {/* Expand icon */}
          <motion.div
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <ChevronDown className="w-5 h-5 text-neutral" />
          </motion.div>
        </button>

        {/* Expanded content */}
        <motion.div
          initial={false}
          animate={{ height: isExpanded ? 'auto' : 0 }}
          className="overflow-hidden"
        >
          <div className="px-4 pb-4 pt-0 border-t border-gray-200 dark:border-gray-700">
            <div className="pt-4">
              <p className="text-sm text-neutral dark:text-gray-400 mb-4">
                {dimension.description}
              </p>

              {/* Visual spectrum */}
              <div className="relative h-8 bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden">
                <div
                  className="absolute inset-y-0 left-0 opacity-30"
                  style={{
                    background: `linear-gradient(to right, ${dimension.color}00, ${dimension.color})`,
                    width: '100%',
                  }}
                />

                {/* User position marker */}
                {userScore !== undefined && (
                  <motion.div
                    className="absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full border-2 border-white shadow-md"
                    style={{ backgroundColor: dimension.color, left: `calc(${userScore}% - 8px)` }}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: 'spring' }}
                  />
                )}
              </div>

              <div className="flex justify-between mt-2 text-xs">
                <span className="text-neutral dark:text-gray-500">
                  <span className="font-bold">0</span> — {dimension.lowLabel}
                </span>
                <span className="text-neutral dark:text-gray-500">
                  {dimension.highLabel} — <span className="font-bold">100</span>
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </Card>
    </motion.div>
  );
}
