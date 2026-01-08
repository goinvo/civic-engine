/**
 * Preference Dimension Scores for Implementation Approaches
 *
 * Each approach is scored on 6 preference dimensions (0-100):
 * - government-role: 0=Market-Led, 100=Government-Led
 * - universality: 0=Targeted, 100=Universal
 * - time-horizon: 0=Immediate Relief, 100=Systemic Change
 * - cost-distribution: 0=Individual/Private, 100=Public/Taxpayer
 * - individual-choice: 0=Standardized, 100=High Choice
 * - implementation-scale: 0=Local, 100=National
 */

import type { ApproachDimensionScores, PreferenceDimensionId } from '@/types/problem-areas';

export const approachDimensionScores: ApproachDimensionScores[] = [
  // ==========================================
  // HEALTHCARE COSTS
  // ==========================================
  {
    approachId: 'healthcare-single-payer',
    scores: {
      'government-role': 95,
      'universality': 100,
      'time-horizon': 85,
      'cost-distribution': 95,
      'individual-choice': 15,
      'implementation-scale': 100,
    },
  },
  {
    approachId: 'healthcare-public-option',
    scores: {
      'government-role': 65,
      'universality': 70,
      'time-horizon': 60,
      'cost-distribution': 65,
      'individual-choice': 75,
      'implementation-scale': 90,
    },
  },
  {
    approachId: 'healthcare-price-regulation',
    scores: {
      'government-role': 70,
      'universality': 80,
      'time-horizon': 40,
      'cost-distribution': 50,
      'individual-choice': 60,
      'implementation-scale': 85,
    },
  },
  {
    approachId: 'healthcare-market-reforms',
    scores: {
      'government-role': 15,
      'universality': 30,
      'time-horizon': 55,
      'cost-distribution': 20,
      'individual-choice': 95,
      'implementation-scale': 50,
    },
  },
  {
    approachId: 'healthcare-strengthen-aca',
    scores: {
      'government-role': 55,
      'universality': 60,
      'time-horizon': 35,
      'cost-distribution': 55,
      'individual-choice': 65,
      'implementation-scale': 85,
    },
  },

  // ==========================================
  // HOUSING AFFORDABILITY
  // ==========================================
  {
    approachId: 'housing-rent-stabilization',
    scores: {
      'government-role': 75,
      'universality': 45,
      'time-horizon': 25,
      'cost-distribution': 30,
      'individual-choice': 35,
      'implementation-scale': 30,
    },
  },
  {
    approachId: 'housing-zoning-reform',
    scores: {
      'government-role': 25,
      'universality': 70,
      'time-horizon': 80,
      'cost-distribution': 15,
      'individual-choice': 85,
      'implementation-scale': 55,
    },
  },
  {
    approachId: 'housing-public-social',
    scores: {
      'government-role': 95,
      'universality': 75,
      'time-horizon': 90,
      'cost-distribution': 95,
      'individual-choice': 40,
      'implementation-scale': 70,
    },
  },
  {
    approachId: 'housing-vouchers',
    scores: {
      'government-role': 60,
      'universality': 35,
      'time-horizon': 30,
      'cost-distribution': 80,
      'individual-choice': 75,
      'implementation-scale': 75,
    },
  },
  {
    approachId: 'housing-first-time-buyer',
    scores: {
      'government-role': 45,
      'universality': 40,
      'time-horizon': 50,
      'cost-distribution': 55,
      'individual-choice': 80,
      'implementation-scale': 70,
    },
  },

  // ==========================================
  // CHILDCARE & FAMILY SUPPORT
  // ==========================================
  {
    approachId: 'childcare-universal-pre-k',
    scores: {
      'government-role': 85,
      'universality': 95,
      'time-horizon': 85,
      'cost-distribution': 90,
      'individual-choice': 50,
      'implementation-scale': 75,
    },
  },
  {
    approachId: 'childcare-tax-credits',
    scores: {
      'government-role': 50,
      'universality': 90,
      'time-horizon': 35,
      'cost-distribution': 75,
      'individual-choice': 95,
      'implementation-scale': 100,
    },
  },
  {
    approachId: 'childcare-subsidies',
    scores: {
      'government-role': 70,
      'universality': 40,
      'time-horizon': 30,
      'cost-distribution': 80,
      'individual-choice': 65,
      'implementation-scale': 65,
    },
  },
  {
    approachId: 'childcare-paid-leave',
    scores: {
      'government-role': 80,
      'universality': 85,
      'time-horizon': 70,
      'cost-distribution': 75,
      'individual-choice': 55,
      'implementation-scale': 90,
    },
  },
  {
    approachId: 'childcare-home-based',
    scores: {
      'government-role': 35,
      'universality': 60,
      'time-horizon': 40,
      'cost-distribution': 45,
      'individual-choice': 90,
      'implementation-scale': 30,
    },
  },

  // ==========================================
  // DEMOCRATIC REFORM
  // ==========================================
  {
    approachId: 'ranked-choice-voting',
    scores: {
      'government-role': 55,
      'universality': 100,
      'time-horizon': 75,
      'cost-distribution': 50,
      'individual-choice': 85,
      'implementation-scale': 60,
    },
  },
  {
    approachId: 'campaign-finance-reform',
    scores: {
      'government-role': 75,
      'universality': 100,
      'time-horizon': 80,
      'cost-distribution': 60,
      'individual-choice': 45,
      'implementation-scale': 85,
    },
  },
  {
    approachId: 'independent-redistricting',
    scores: {
      'government-role': 65,
      'universality': 100,
      'time-horizon': 85,
      'cost-distribution': 50,
      'individual-choice': 40,
      'implementation-scale': 55,
    },
  },
  {
    approachId: 'expand-voting-access',
    scores: {
      'government-role': 70,
      'universality': 100,
      'time-horizon': 60,
      'cost-distribution': 65,
      'individual-choice': 85,
      'implementation-scale': 75,
    },
  },
  {
    approachId: 'election-integrity-security',
    scores: {
      'government-role': 60,
      'universality': 100,
      'time-horizon': 50,
      'cost-distribution': 55,
      'individual-choice': 35,
      'implementation-scale': 65,
    },
  },

  // ==========================================
  // EDUCATION QUALITY
  // ==========================================
  {
    approachId: 'education-increase-funding',
    scores: {
      'government-role': 85,
      'universality': 85,
      'time-horizon': 70,
      'cost-distribution': 90,
      'individual-choice': 35,
      'implementation-scale': 70,
    },
  },
  {
    approachId: 'education-school-choice',
    scores: {
      'government-role': 30,
      'universality': 50,
      'time-horizon': 55,
      'cost-distribution': 55,
      'individual-choice': 95,
      'implementation-scale': 50,
    },
  },
  {
    approachId: 'education-standards-accountability',
    scores: {
      'government-role': 75,
      'universality': 95,
      'time-horizon': 65,
      'cost-distribution': 60,
      'individual-choice': 25,
      'implementation-scale': 85,
    },
  },
  {
    approachId: 'education-invest-teachers',
    scores: {
      'government-role': 75,
      'universality': 90,
      'time-horizon': 75,
      'cost-distribution': 85,
      'individual-choice': 50,
      'implementation-scale': 70,
    },
  },
  {
    approachId: 'education-empower-parents',
    scores: {
      'government-role': 25,
      'universality': 80,
      'time-horizon': 40,
      'cost-distribution': 30,
      'individual-choice': 90,
      'implementation-scale': 40,
    },
  },

  // ==========================================
  // ECONOMIC OPPORTUNITY & WAGES
  // ==========================================
  {
    approachId: 'economy-raise-minimum-wage',
    scores: {
      'government-role': 80,
      'universality': 65,
      'time-horizon': 35,
      'cost-distribution': 25,
      'individual-choice': 30,
      'implementation-scale': 80,
    },
  },
  {
    approachId: 'economy-expand-eitc',
    scores: {
      'government-role': 55,
      'universality': 50,
      'time-horizon': 35,
      'cost-distribution': 85,
      'individual-choice': 70,
      'implementation-scale': 95,
    },
  },
  {
    approachId: 'economy-strengthen-unions',
    scores: {
      'government-role': 60,
      'universality': 55,
      'time-horizon': 80,
      'cost-distribution': 25,
      'individual-choice': 55,
      'implementation-scale': 75,
    },
  },
  {
    approachId: 'economy-job-training',
    scores: {
      'government-role': 50,
      'universality': 60,
      'time-horizon': 75,
      'cost-distribution': 65,
      'individual-choice': 80,
      'implementation-scale': 65,
    },
  },
  {
    approachId: 'economy-universal-basic-income',
    scores: {
      'government-role': 85,
      'universality': 100,
      'time-horizon': 90,
      'cost-distribution': 95,
      'individual-choice': 100,
      'implementation-scale': 100,
    },
  },
];

/**
 * Get dimension scores for a specific approach
 */
export function getApproachScores(approachId: string): Record<PreferenceDimensionId, number> | null {
  const found = approachDimensionScores.find((a) => a.approachId === approachId);
  return found?.scores ?? null;
}

/**
 * Get all scores as a map for quick lookup
 */
export const approachScoresMap = new Map<string, Record<PreferenceDimensionId, number>>(
  approachDimensionScores.map((a) => [a.approachId, a.scores])
);
