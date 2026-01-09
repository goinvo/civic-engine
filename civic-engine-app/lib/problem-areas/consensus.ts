/**
 * Consensus Data Library for "Most of Us"
 *
 * Provides mock consensus data for each approach until real data is collected.
 * This data represents what "most Americans" think about each approach.
 *
 * Key principle: Show users that they're not alone - "most of us" agree on more than we think.
 */

import type {
  ApproachConsensusData,
  NationalConsensusData,
  AmericanMandate,
  UserConsensusAlignment,
  CivicIdentity,
  UserCivicIdentity,
  CONSENSUS_THRESHOLDS,
} from '@/types/consensus';
import type { ProblemAreaId, ImplementationRating } from '@/types/problem-areas';
import { getAllApproaches, getApproachById, getProblemAreaById } from './helpers';
import { loadPreferences } from './storage';
import { CIVIC_IDENTITIES } from '@/types/consensus';

// ============================================
// MOCK CONSENSUS DATA
// ============================================

/**
 * Mock consensus data for each approach.
 * In production, this would come from aggregated user data.
 *
 * The percentages are designed to show:
 * 1. High consensus on many issues (the "mirror" revelation)
 * 2. Bipartisan agreement (cross-party support)
 * 3. Some genuinely divided issues (to maintain credibility)
 */
const MOCK_CONSENSUS: Record<string, Omit<ApproachConsensusData, 'approachId' | 'problemAreaId'>> = {
  // Healthcare
  'healthcare-single-payer': {
    totalParticipants: 12847,
    distribution: { stronglySupport: 28, support: 23, neutral: 12, oppose: 19, stronglyOppose: 18 },
    supportPercent: 51,
    opposePercent: 37,
    consensusLevel: 'divided',
    byParty: {
      democrat: { support: 78, oppose: 14 },
      republican: { support: 24, oppose: 67 },
      independent: { support: 52, oppose: 36 },
    },
  },
  'healthcare-public-option': {
    totalParticipants: 13421,
    distribution: { stronglySupport: 32, support: 36, neutral: 14, oppose: 11, stronglyOppose: 7 },
    supportPercent: 68,
    opposePercent: 18,
    consensusLevel: 'moderate',
    byParty: {
      democrat: { support: 84, oppose: 8 },
      republican: { support: 47, oppose: 38 },
      independent: { support: 71, oppose: 17 },
    },
  },
  'healthcare-aca-strengthen': {
    totalParticipants: 11893,
    distribution: { stronglySupport: 24, support: 31, neutral: 18, oppose: 15, stronglyOppose: 12 },
    supportPercent: 55,
    opposePercent: 27,
    consensusLevel: 'moderate',
    byParty: {
      democrat: { support: 79, oppose: 11 },
      republican: { support: 31, oppose: 54 },
      independent: { support: 56, oppose: 28 },
    },
  },
  'healthcare-market-reform': {
    totalParticipants: 10234,
    distribution: { stronglySupport: 18, support: 27, neutral: 21, oppose: 20, stronglyOppose: 14 },
    supportPercent: 45,
    opposePercent: 34,
    consensusLevel: 'divided',
    byParty: {
      democrat: { support: 28, oppose: 52 },
      republican: { support: 68, oppose: 18 },
      independent: { support: 44, oppose: 35 },
    },
  },
  'healthcare-price-transparency': {
    totalParticipants: 14892,
    distribution: { stronglySupport: 38, support: 34, neutral: 15, oppose: 8, stronglyOppose: 5 },
    supportPercent: 72,
    opposePercent: 13,
    consensusLevel: 'strong',
    byParty: {
      democrat: { support: 74, oppose: 12 },
      republican: { support: 71, oppose: 14 },
      independent: { support: 73, oppose: 13 },
    },
  },

  // Housing
  'housing-zoning-reform': {
    totalParticipants: 9847,
    distribution: { stronglySupport: 29, support: 33, neutral: 18, oppose: 12, stronglyOppose: 8 },
    supportPercent: 62,
    opposePercent: 20,
    consensusLevel: 'moderate',
    byParty: {
      democrat: { support: 67, oppose: 18 },
      republican: { support: 54, oppose: 26 },
      independent: { support: 64, oppose: 19 },
    },
  },
  'housing-public-housing': {
    totalParticipants: 8934,
    distribution: { stronglySupport: 22, support: 26, neutral: 16, oppose: 21, stronglyOppose: 15 },
    supportPercent: 48,
    opposePercent: 36,
    consensusLevel: 'divided',
    byParty: {
      democrat: { support: 68, oppose: 19 },
      republican: { support: 27, oppose: 58 },
      independent: { support: 49, oppose: 35 },
    },
  },
  'housing-vouchers': {
    totalParticipants: 9123,
    distribution: { stronglySupport: 24, support: 31, neutral: 19, oppose: 16, stronglyOppose: 10 },
    supportPercent: 55,
    opposePercent: 26,
    consensusLevel: 'moderate',
    byParty: {
      democrat: { support: 62, oppose: 22 },
      republican: { support: 48, oppose: 32 },
      independent: { support: 55, oppose: 26 },
    },
  },
  'housing-rent-control': {
    totalParticipants: 10456,
    distribution: { stronglySupport: 26, support: 24, neutral: 14, oppose: 19, stronglyOppose: 17 },
    supportPercent: 50,
    opposePercent: 36,
    consensusLevel: 'divided',
    byParty: {
      democrat: { support: 68, oppose: 21 },
      republican: { support: 29, oppose: 56 },
      independent: { support: 52, oppose: 34 },
    },
  },
  'housing-first-time-buyer': {
    totalParticipants: 11234,
    distribution: { stronglySupport: 31, support: 35, neutral: 16, oppose: 11, stronglyOppose: 7 },
    supportPercent: 66,
    opposePercent: 18,
    consensusLevel: 'moderate',
    byParty: {
      democrat: { support: 72, oppose: 14 },
      republican: { support: 59, oppose: 24 },
      independent: { support: 67, oppose: 17 },
    },
  },

  // Childcare
  'childcare-universal-pre-k': {
    totalParticipants: 12567,
    distribution: { stronglySupport: 35, support: 32, neutral: 14, oppose: 12, stronglyOppose: 7 },
    supportPercent: 67,
    opposePercent: 19,
    consensusLevel: 'moderate',
    byParty: {
      democrat: { support: 82, oppose: 10 },
      republican: { support: 51, oppose: 32 },
      independent: { support: 68, oppose: 18 },
    },
  },
  'childcare-tax-credits': {
    totalParticipants: 11893,
    distribution: { stronglySupport: 33, support: 36, neutral: 15, oppose: 10, stronglyOppose: 6 },
    supportPercent: 69,
    opposePercent: 16,
    consensusLevel: 'moderate',
    byParty: {
      democrat: { support: 74, oppose: 13 },
      republican: { support: 64, oppose: 20 },
      independent: { support: 69, oppose: 16 },
    },
  },
  'childcare-employer-mandates': {
    totalParticipants: 9234,
    distribution: { stronglySupport: 21, support: 27, neutral: 19, oppose: 20, stronglyOppose: 13 },
    supportPercent: 48,
    opposePercent: 33,
    consensusLevel: 'divided',
    byParty: {
      democrat: { support: 64, oppose: 22 },
      republican: { support: 32, oppose: 49 },
      independent: { support: 48, oppose: 34 },
    },
  },
  'childcare-paid-leave': {
    totalParticipants: 13456,
    distribution: { stronglySupport: 38, support: 34, neutral: 12, oppose: 10, stronglyOppose: 6 },
    supportPercent: 72,
    opposePercent: 16,
    consensusLevel: 'strong',
    byParty: {
      democrat: { support: 88, oppose: 6 },
      republican: { support: 54, oppose: 29 },
      independent: { support: 74, oppose: 15 },
    },
  },
  'childcare-community-based': {
    totalParticipants: 8912,
    distribution: { stronglySupport: 27, support: 34, neutral: 20, oppose: 12, stronglyOppose: 7 },
    supportPercent: 61,
    opposePercent: 19,
    consensusLevel: 'moderate',
    byParty: {
      democrat: { support: 65, oppose: 17 },
      republican: { support: 57, oppose: 22 },
      independent: { support: 61, oppose: 19 },
    },
  },

  // Democratic Reform
  'democracy-campaign-finance': {
    totalParticipants: 15678,
    distribution: { stronglySupport: 42, support: 31, neutral: 11, oppose: 9, stronglyOppose: 7 },
    supportPercent: 73,
    opposePercent: 16,
    consensusLevel: 'strong',
    byParty: {
      democrat: { support: 84, oppose: 9 },
      republican: { support: 61, oppose: 24 },
      independent: { support: 76, oppose: 14 },
    },
  },
  'democracy-ranked-choice': {
    totalParticipants: 10234,
    distribution: { stronglySupport: 28, support: 29, neutral: 21, oppose: 13, stronglyOppose: 9 },
    supportPercent: 57,
    opposePercent: 22,
    consensusLevel: 'moderate',
    byParty: {
      democrat: { support: 64, oppose: 18 },
      republican: { support: 48, oppose: 28 },
      independent: { support: 62, oppose: 20 },
    },
  },
  'democracy-term-limits': {
    totalParticipants: 16789,
    distribution: { stronglySupport: 45, support: 29, neutral: 10, oppose: 9, stronglyOppose: 7 },
    supportPercent: 74,
    opposePercent: 16,
    consensusLevel: 'strong',
    byParty: {
      democrat: { support: 68, oppose: 19 },
      republican: { support: 82, oppose: 11 },
      independent: { support: 76, oppose: 14 },
    },
  },
  'democracy-redistricting': {
    totalParticipants: 11456,
    distribution: { stronglySupport: 36, support: 32, neutral: 14, oppose: 11, stronglyOppose: 7 },
    supportPercent: 68,
    opposePercent: 18,
    consensusLevel: 'moderate',
    byParty: {
      democrat: { support: 79, oppose: 11 },
      republican: { support: 56, oppose: 27 },
      independent: { support: 70, oppose: 17 },
    },
  },
  'democracy-voting-access': {
    totalParticipants: 14567,
    distribution: { stronglySupport: 34, support: 28, neutral: 13, oppose: 14, stronglyOppose: 11 },
    supportPercent: 62,
    opposePercent: 25,
    consensusLevel: 'moderate',
    byParty: {
      democrat: { support: 86, oppose: 8 },
      republican: { support: 37, oppose: 48 },
      independent: { support: 64, oppose: 23 },
    },
  },

  // Economic Opportunity
  'economic-minimum-wage': {
    totalParticipants: 13789,
    distribution: { stronglySupport: 32, support: 29, neutral: 12, oppose: 15, stronglyOppose: 12 },
    supportPercent: 61,
    opposePercent: 27,
    consensusLevel: 'moderate',
    byParty: {
      democrat: { support: 82, oppose: 11 },
      republican: { support: 38, oppose: 47 },
      independent: { support: 63, oppose: 25 },
    },
  },
  'economic-eitc-expansion': {
    totalParticipants: 10567,
    distribution: { stronglySupport: 29, support: 35, neutral: 18, oppose: 11, stronglyOppose: 7 },
    supportPercent: 64,
    opposePercent: 18,
    consensusLevel: 'moderate',
    byParty: {
      democrat: { support: 74, oppose: 13 },
      republican: { support: 53, oppose: 25 },
      independent: { support: 65, oppose: 18 },
    },
  },
  'economic-job-training': {
    totalParticipants: 11234,
    distribution: { stronglySupport: 31, support: 38, neutral: 16, oppose: 10, stronglyOppose: 5 },
    supportPercent: 69,
    opposePercent: 15,
    consensusLevel: 'moderate',
    byParty: {
      democrat: { support: 74, oppose: 12 },
      republican: { support: 64, oppose: 18 },
      independent: { support: 69, oppose: 15 },
    },
  },
  'economic-union-rights': {
    totalParticipants: 9876,
    distribution: { stronglySupport: 27, support: 25, neutral: 15, oppose: 18, stronglyOppose: 15 },
    supportPercent: 52,
    opposePercent: 33,
    consensusLevel: 'divided',
    byParty: {
      democrat: { support: 74, oppose: 16 },
      republican: { support: 29, oppose: 54 },
      independent: { support: 53, oppose: 32 },
    },
  },
  'economic-small-business': {
    totalParticipants: 12345,
    distribution: { stronglySupport: 34, support: 37, neutral: 15, oppose: 9, stronglyOppose: 5 },
    supportPercent: 71,
    opposePercent: 14,
    consensusLevel: 'strong',
    byParty: {
      democrat: { support: 68, oppose: 16 },
      republican: { support: 76, oppose: 11 },
      independent: { support: 71, oppose: 14 },
    },
  },

  // Education
  'education-school-funding': {
    totalParticipants: 12890,
    distribution: { stronglySupport: 36, support: 33, neutral: 13, oppose: 11, stronglyOppose: 7 },
    supportPercent: 69,
    opposePercent: 18,
    consensusLevel: 'moderate',
    byParty: {
      democrat: { support: 82, oppose: 10 },
      republican: { support: 54, oppose: 28 },
      independent: { support: 70, oppose: 17 },
    },
  },
  'education-school-choice': {
    totalParticipants: 11567,
    distribution: { stronglySupport: 24, support: 26, neutral: 16, oppose: 19, stronglyOppose: 15 },
    supportPercent: 50,
    opposePercent: 34,
    consensusLevel: 'divided',
    byParty: {
      democrat: { support: 32, oppose: 52 },
      republican: { support: 72, oppose: 16 },
      independent: { support: 49, oppose: 33 },
    },
  },
  'education-teacher-pay': {
    totalParticipants: 14234,
    distribution: { stronglySupport: 41, support: 33, neutral: 12, oppose: 9, stronglyOppose: 5 },
    supportPercent: 74,
    opposePercent: 14,
    consensusLevel: 'strong',
    byParty: {
      democrat: { support: 86, oppose: 7 },
      republican: { support: 61, oppose: 22 },
      independent: { support: 75, oppose: 13 },
    },
  },
  'education-career-tech': {
    totalParticipants: 10789,
    distribution: { stronglySupport: 33, support: 39, neutral: 15, oppose: 8, stronglyOppose: 5 },
    supportPercent: 72,
    opposePercent: 13,
    consensusLevel: 'strong',
    byParty: {
      democrat: { support: 71, oppose: 14 },
      republican: { support: 74, oppose: 12 },
      independent: { support: 72, oppose: 13 },
    },
  },
  'education-early-literacy': {
    totalParticipants: 11890,
    distribution: { stronglySupport: 38, support: 36, neutral: 14, oppose: 8, stronglyOppose: 4 },
    supportPercent: 74,
    opposePercent: 12,
    consensusLevel: 'strong',
    byParty: {
      democrat: { support: 79, oppose: 9 },
      republican: { support: 69, oppose: 15 },
      independent: { support: 74, oppose: 12 },
    },
  },
};

// Default consensus data for approaches not in the mock
const DEFAULT_CONSENSUS: Omit<ApproachConsensusData, 'approachId' | 'problemAreaId'> = {
  totalParticipants: 8500,
  distribution: { stronglySupport: 25, support: 30, neutral: 20, oppose: 15, stronglyOppose: 10 },
  supportPercent: 55,
  opposePercent: 25,
  consensusLevel: 'moderate',
  byParty: {
    democrat: { support: 60, oppose: 25 },
    republican: { support: 50, oppose: 35 },
    independent: { support: 55, oppose: 30 },
  },
};

// ============================================
// CONSENSUS DATA ACCESSORS
// ============================================

/**
 * Get consensus data for a specific approach
 */
export function getApproachConsensus(approachId: string): ApproachConsensusData | null {
  const approach = getApproachById(approachId);
  if (!approach) return null;

  const mockData = MOCK_CONSENSUS[approachId] || DEFAULT_CONSENSUS;

  return {
    approachId,
    problemAreaId: approach.problemAreaId,
    ...mockData,
  };
}

/**
 * Get consensus data for all approaches in a problem area
 */
export function getProblemAreaConsensus(problemAreaId: ProblemAreaId) {
  const approaches = getAllApproaches().filter((a) => a.problemAreaId === problemAreaId);

  return approaches.map((approach) => ({
    ...getApproachConsensus(approach.id)!,
    title: approach.title,
  }));
}

/**
 * Get national consensus statistics
 */
export function getNationalConsensus(): NationalConsensusData {
  const approaches = getAllApproaches();
  let totalParticipants = 0;
  let totalRatings = 0;
  let consensusSum = 0;

  const topConsensusItems: NationalConsensusData['topConsensusItems'] = [];

  for (const approach of approaches) {
    const consensus = getApproachConsensus(approach.id);
    if (consensus) {
      totalParticipants = Math.max(totalParticipants, consensus.totalParticipants);
      totalRatings += consensus.totalParticipants;
      consensusSum += consensus.supportPercent;

      if (consensus.supportPercent >= 65) {
        topConsensusItems.push({
          approachId: approach.id,
          problemAreaId: approach.problemAreaId,
          title: approach.title,
          supportPercent: consensus.supportPercent,
          description: approach.summary,
        });
      }
    }
  }

  // Sort by support percent
  topConsensusItems.sort((a, b) => b.supportPercent - a.supportPercent);

  return {
    totalParticipants: 47291, // Mock total unique participants
    totalRatings,
    statesRepresented: 50,
    averageConsensusPercent: Math.round(consensusSum / approaches.length),
    lastUpdated: new Date().toISOString(),
    byProblemArea: {} as Record<ProblemAreaId, any>, // Would be populated in production
    topConsensusItems: topConsensusItems.slice(0, 10),
  };
}

/**
 * Generate the American Mandate document
 */
export function getAmericanMandate(): AmericanMandate {
  const approaches = getAllApproaches();
  const consensusItems: AmericanMandate['consensusItems'] = [];
  const bipartisanItems: AmericanMandate['bipartisanItems'] = [];

  for (const approach of approaches) {
    const consensus = getApproachConsensus(approach.id);
    if (!consensus || !consensus.byParty) continue;

    const item = {
      id: approach.id,
      problemAreaId: approach.problemAreaId,
      title: approach.title,
      description: approach.summary,
      supportPercent: consensus.supportPercent,
      participantCount: consensus.totalParticipants,
      bipartisanSupport: {
        democrat: consensus.byParty.democrat.support,
        republican: consensus.byParty.republican.support,
        independent: consensus.byParty.independent.support,
      },
      isConsensus: consensus.supportPercent >= 60,
      policyReference: approach.source,
    };

    if (item.isConsensus) {
      consensusItems.push(item);
    }

    // Check for bipartisan support (all parties > 50%)
    const isBipartisan =
      consensus.byParty.democrat.support > 50 &&
      consensus.byParty.republican.support > 50 &&
      consensus.byParty.independent.support > 50;

    if (isBipartisan) {
      bipartisanItems.push(item);
    }
  }

  // Sort by support
  consensusItems.sort((a, b) => b.supportPercent - a.supportPercent);
  bipartisanItems.sort((a, b) => b.supportPercent - a.supportPercent);

  const avgBipartisan =
    bipartisanItems.length > 0
      ? Math.round(
          bipartisanItems.reduce(
            (sum, item) =>
              sum +
              (item.bipartisanSupport.democrat +
                item.bipartisanSupport.republican +
                item.bipartisanSupport.independent) /
                3,
            0
          ) / bipartisanItems.length
        )
      : 0;

  return {
    generatedAt: new Date().toISOString(),
    participantCount: 47291,
    statesRepresented: 50,
    consensusThreshold: 60,
    consensusItems,
    bipartisanItems,
    summary: {
      totalIssuesExplored: approaches.length,
      issuesWithConsensus: consensusItems.length,
      averageBipartisanAgreement: avgBipartisan,
    },
  };
}

/**
 * Calculate how a user's ratings align with national consensus
 */
export function getUserConsensusAlignment(): UserConsensusAlignment | null {
  const prefs = loadPreferences();
  if (!prefs) return null;

  const ratings = prefs.implementationRatings;
  if (Object.keys(ratings).length === 0) return null;

  const alignedWith: UserConsensusAlignment['alignedWith'] = [];
  const differsFrom: UserConsensusAlignment['differsFrom'] = [];

  for (const [approachId, rating] of Object.entries(ratings)) {
    const approach = getApproachById(approachId);
    const consensus = getApproachConsensus(approachId);

    if (!approach || !consensus) continue;

    const userSupports = rating > 0;
    const userOpposes = rating < 0;
    const majoritySupports = consensus.supportPercent > consensus.opposePercent;
    const majorityOpposes = consensus.opposePercent > consensus.supportPercent;

    // User agrees with majority
    if ((userSupports && majoritySupports) || (userOpposes && majorityOpposes)) {
      alignedWith.push({
        approachId,
        title: approach.title,
        userRating: rating,
        consensusPercent: majoritySupports ? consensus.supportPercent : consensus.opposePercent,
      });
    }
    // User differs from majority
    else if ((userSupports && majorityOpposes) || (userOpposes && majoritySupports)) {
      differsFrom.push({
        approachId,
        title: approach.title,
        userRating: rating,
        consensusPercent: majoritySupports ? consensus.supportPercent : consensus.opposePercent,
        consensusDirection: majoritySupports ? 'support' : 'oppose',
      });
    }
  }

  const totalRated = alignedWith.length + differsFrom.length;
  const alignmentPercent = totalRated > 0 ? Math.round((alignedWith.length / totalRated) * 100) : 0;

  return {
    alignmentPercent,
    alignedWith,
    differsFrom,
    summary: `You agree with most Americans on ${alignmentPercent}% of the approaches you rated.`,
  };
}

/**
 * Determine user's civic identity based on their ratings
 */
export function getUserCivicIdentity(): UserCivicIdentity | null {
  const prefs = loadPreferences();
  if (!prefs) return null;

  const ratings = prefs.implementationRatings;
  if (Object.keys(ratings).length < 5) return null; // Need enough data

  // Score each identity based on user's ratings
  const scores: Record<string, number> = {};

  for (const identity of CIVIC_IDENTITIES) {
    scores[identity.id] = calculateIdentityScore(identity, ratings);
  }

  // Find best match
  const sortedIdentities = CIVIC_IDENTITIES.sort((a, b) => scores[b.id] - scores[a.id]);

  return {
    identity: sortedIdentities[0],
    matchStrength: scores[sortedIdentities[0].id],
    secondaryIdentity: scores[sortedIdentities[1].id] > 50 ? sortedIdentities[1] : undefined,
  };
}

/**
 * Calculate how well a user's ratings match an identity archetype
 */
function calculateIdentityScore(
  identity: CivicIdentity,
  ratings: Record<string, ImplementationRating>
): number {
  // This is a simplified scoring algorithm
  // In production, you'd map each approach to identity dimensions

  let score = 50; // Start neutral

  const ratingValues = Object.values(ratings) as number[];
  const avgRating = ratingValues.length > 0
    ? ratingValues.reduce((a, b) => a + b, 0) / ratingValues.length
    : 0;

  // Adjust based on identity type and rating patterns
  switch (identity.id) {
    case 'pragmatic-reformer':
      // Pragmatists tend toward moderate positions
      score += ratingValues.filter((r) => r === 0 || r === 1 || r === -1).length * 5;
      break;
    case 'systems-thinker':
      // Systems thinkers support structural changes
      score += ratingValues.filter((r) => r === 2 || r === -2).length * 5;
      break;
    case 'liberty-guardian':
      // Liberty guardians tend to oppose government expansion
      score += ratingValues.filter((r) => r < 0).length * 3;
      break;
    case 'equity-champion':
      // Equity champions support universal programs
      score += ratingValues.filter((r) => r > 0).length * 3;
      break;
    case 'community-builder':
      // Community builders prefer local solutions (moderate, balanced)
      score += Math.max(0, 70 - Math.abs(avgRating) * 20);
      break;
    case 'fiscal-realist':
      // Fiscal realists are selective
      score += ratingValues.filter((r) => r === 0 || r === -1).length * 4;
      break;
  }

  return Math.min(100, Math.max(0, score));
}

// ============================================
// EXPORTS
// ============================================

export {
  MOCK_CONSENSUS,
  DEFAULT_CONSENSUS,
};
