'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Users, TrendingUp, CheckCircle2 } from 'lucide-react';
import type { ApproachConsensusData } from '@/types/consensus';
import type { ImplementationRating } from '@/types/problem-areas';

interface ConsensusRevealProps {
  consensus: ApproachConsensusData | null;
  userRating: ImplementationRating | undefined;
  showPartyBreakdown?: boolean;
}

/**
 * Reveals consensus data after a user rates an approach.
 * This is the "mirror" moment - showing users they're not alone.
 */
export function ConsensusReveal({
  consensus,
  userRating,
  showPartyBreakdown = true,
}: ConsensusRevealProps) {
  if (!consensus || userRating === undefined) return null;

  const userSupports = userRating > 0;
  const userOpposes = userRating < 0;
  const userNeutral = userRating === 0;

  // Determine what percentage matches the user's direction
  const alignedPercent = userSupports
    ? consensus.supportPercent
    : userOpposes
      ? consensus.opposePercent
      : consensus.distribution.neutral;

  const alignedDirection = userSupports ? 'support' : userOpposes ? 'oppose' : 'are neutral on';

  // Is user with the majority?
  const isWithMajority =
    (userSupports && consensus.supportPercent > consensus.opposePercent) ||
    (userOpposes && consensus.opposePercent > consensus.supportPercent);

  // Check for bipartisan consensus
  const isBipartisan =
    consensus.byParty &&
    ((userSupports &&
      consensus.byParty.democrat.support > 50 &&
      consensus.byParty.republican.support > 50) ||
      (userOpposes &&
        consensus.byParty.democrat.oppose > 50 &&
        consensus.byParty.republican.oppose > 50));

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, height: 0, marginTop: 0 }}
        animate={{ opacity: 1, height: 'auto', marginTop: 16 }}
        exit={{ opacity: 0, height: 0, marginTop: 0 }}
        transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="overflow-hidden"
      >
        <div className="bg-gradient-to-r from-[#2F3BBD]/5 to-[#C91A2B]/5 border-2 border-black dark:border-gray-600 p-4">
          {/* Main reveal */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.3 }}
            className="flex items-start gap-3"
          >
            <div className="w-10 h-10 bg-gradient-to-r from-[#2F3BBD] to-[#C91A2B] border-2 border-black flex items-center justify-center shrink-0">
              <Users className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1">
              <p className="font-bold text-neutral-dark dark:text-white">
                {userNeutral ? (
                  <>You + {alignedPercent}% of participants are undecided</>
                ) : isWithMajority ? (
                  <>
                    You + <span className="text-[#2F3BBD]">{alignedPercent}%</span> of participants{' '}
                    {alignedDirection} this
                  </>
                ) : (
                  <>
                    You're in the minority — only {alignedPercent}% {alignedDirection} this
                  </>
                )}
              </p>
              <p className="text-sm text-neutral dark:text-gray-400 mt-1">
                Based on {consensus.totalParticipants.toLocaleString()} responses
              </p>
            </div>
          </motion.div>

          {/* Consensus bar */}
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ delay: 0.3, duration: 0.4 }}
            className="mt-4"
            style={{ transformOrigin: 'left' }}
          >
            <div className="flex h-4 overflow-hidden border-2 border-black dark:border-gray-600">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${consensus.supportPercent}%` }}
                transition={{ delay: 0.4, duration: 0.5, ease: 'easeOut' }}
                className="bg-[#2F3BBD] relative"
              />
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${consensus.distribution.neutral}%` }}
                transition={{ delay: 0.5, duration: 0.5, ease: 'easeOut' }}
                className="bg-gray-300 dark:bg-gray-600"
              />
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${consensus.opposePercent}%` }}
                transition={{ delay: 0.6, duration: 0.5, ease: 'easeOut' }}
                className="bg-[#C91A2B]"
              />
            </div>
            <div className="flex justify-between mt-1 text-xs">
              <span className="text-[#2F3BBD] font-bold">{consensus.supportPercent}% support</span>
              <span className="text-[#C91A2B] font-bold">{consensus.opposePercent}% oppose</span>
            </div>
          </motion.div>

          {/* Party breakdown */}
          {showPartyBreakdown && consensus.byParty && !userNeutral && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.3 }}
              className="mt-4 pt-4 border-t border-black/10 dark:border-white/10"
            >
              <p className="text-xs font-bold text-neutral-dark dark:text-white mb-2 flex items-center gap-1">
                <TrendingUp className="w-3 h-3" />
                Cross-partisan breakdown
              </p>
              <div className="grid grid-cols-3 gap-2 text-center">
                <PartyBreakdownItem
                  label="Democrats"
                  percent={
                    userSupports
                      ? consensus.byParty.democrat.support
                      : consensus.byParty.democrat.oppose
                  }
                  userDirection={userSupports ? 'support' : 'oppose'}
                />
                <PartyBreakdownItem
                  label="Republicans"
                  percent={
                    userSupports
                      ? consensus.byParty.republican.support
                      : consensus.byParty.republican.oppose
                  }
                  userDirection={userSupports ? 'support' : 'oppose'}
                />
                <PartyBreakdownItem
                  label="Independents"
                  percent={
                    userSupports
                      ? consensus.byParty.independent.support
                      : consensus.byParty.independent.oppose
                  }
                  userDirection={userSupports ? 'support' : 'oppose'}
                />
              </div>

              {/* Bipartisan callout */}
              {isBipartisan && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.8, duration: 0.3 }}
                  className="mt-3 flex items-center gap-2 text-sm font-bold text-green-700 dark:text-green-400"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  Bipartisan consensus — majorities across all parties agree
                </motion.div>
              )}
            </motion.div>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

function PartyBreakdownItem({
  label,
  percent,
  userDirection,
}: {
  label: string;
  percent: number;
  userDirection: 'support' | 'oppose';
}) {
  const isMajority = percent > 50;

  return (
    <div className="text-xs">
      <div className="text-neutral dark:text-gray-400">{label}</div>
      <div
        className={`font-bold ${
          isMajority
            ? userDirection === 'support'
              ? 'text-[#2F3BBD]'
              : 'text-[#C91A2B]'
            : 'text-neutral dark:text-gray-400'
        }`}
      >
        {percent}%
      </div>
    </div>
  );
}

/**
 * Compact version for showing in lists
 */
export function ConsensusBar({
  consensus,
  showLabels = true,
}: {
  consensus: ApproachConsensusData | null;
  showLabels?: boolean;
}) {
  if (!consensus) return null;

  return (
    <div className="w-full">
      <div className="flex h-2 overflow-hidden border border-black/20 dark:border-white/20 rounded-full">
        <div
          className="bg-[#2F3BBD]"
          style={{ width: `${consensus.supportPercent}%` }}
        />
        <div
          className="bg-gray-300 dark:bg-gray-600"
          style={{ width: `${consensus.distribution.neutral}%` }}
        />
        <div
          className="bg-[#C91A2B]"
          style={{ width: `${consensus.opposePercent}%` }}
        />
      </div>
      {showLabels && (
        <div className="flex justify-between mt-1 text-xs text-neutral dark:text-gray-400">
          <span>{consensus.supportPercent}% support</span>
          <span>{consensus.opposePercent}% oppose</span>
        </div>
      )}
    </div>
  );
}

/**
 * Badge showing consensus level
 */
export function ConsensusBadge({
  consensus,
}: {
  consensus: ApproachConsensusData | null;
}) {
  if (!consensus) return null;

  const getBadgeStyle = () => {
    switch (consensus.consensusLevel) {
      case 'strong':
        return 'bg-green-100 text-green-700 border-green-300';
      case 'moderate':
        return 'bg-blue-100 text-blue-700 border-blue-300';
      case 'divided':
        return 'bg-yellow-100 text-yellow-700 border-yellow-300';
    }
  };

  const getLabel = () => {
    switch (consensus.consensusLevel) {
      case 'strong':
        return `${consensus.supportPercent}% consensus`;
      case 'moderate':
        return `${consensus.supportPercent}% support`;
      case 'divided':
        return 'Divided';
    }
  };

  return (
    <span
      className={`text-xs px-2 py-0.5 rounded-full border font-bold ${getBadgeStyle()}`}
    >
      {getLabel()}
    </span>
  );
}
