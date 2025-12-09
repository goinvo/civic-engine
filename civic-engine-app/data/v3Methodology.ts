/**
 * V3 Methodology: Needs-Based Policy Scoring
 *
 * Inspired by Maslow's hierarchy of needs, this model scores policies
 * based on their impact across human need categories and practical metrics.
 *
 * SCALE: 0-10 where 5 = neutral (no effect)
 * - 0: Extremely harmful
 * - 1-4: Harmful (varying degrees)
 * - 5: No effect / neutral
 * - 6-9: Beneficial (varying degrees)
 * - 10: Extremely beneficial
 *
 * Need Categories (Maslow-inspired):
 * 1. Physiological - Basic survival (food, water, shelter, healthcare)
 * 2. Safety - Security, stability, protection (highest weighted by default)
 * 3. Community - Social belonging, connection, civic participation
 * 4. Opportunity - Esteem/growth (employment, education, economic mobility)
 * 5. Self-Actualization - Arts, cultural programs, personal fulfillment
 *
 * Scoring Dimensions (also 0-10, 5 = neutral):
 * - populationAffected: Who is affected? (5 = no one, 10 = everyone)
 * - essentialToSurvival: How critical? (5 = irrelevant, 10 = life-or-death)
 * - timeToOutcome: How fast? (5 = never, 10 = immediate)
 * - feasibility: How achievable? (5 = impossible, 10 = easy to pass)
 */

// ============================================
// CONSTANTS
// ============================================

/** The neutral score indicating no effect */
export const NEUTRAL_SCORE = 5;

/** Minimum score (extremely harmful) */
export const MIN_SCORE = 0;

/** Maximum score (extremely beneficial) */
export const MAX_SCORE = 10;

// ============================================
// TYPES
// ============================================

/**
 * The five need categories based on Maslow's hierarchy
 */
export type NeedCategory =
  | 'physiological'
  | 'safety'
  | 'community'
  | 'opportunity'
  | 'selfActualization';

/**
 * Score for a single need category with reasoning
 * Scale: 0-10, where 5 = neutral/no effect
 */
export interface NeedCategoryScore {
  score: number; // 0-10: How does this policy affect this need? (5 = neutral)
  reasoning: string;
}

/**
 * The core scoring dimensions for V3
 * Scale: 0-10, where 5 = neutral/no effect
 */
export interface V3ScoringDimensions {
  populationAffected: number;    // 0-10: Who is affected? (5 = no one, 10 = universal)
  essentialToSurvival: number;   // 0-10: How critical to survival? (5 = irrelevant, 10 = life-or-death)
  timeToOutcome: number;         // 0-10: How quickly? (5 = never, 10 = immediate)
  feasibility: number;           // 0-10: How achievable? (5 = impossible, 10 = easy)
}

/**
 * Full V3 impact score for a policy
 */
export interface V3ImpactScore {
  // Which need categories does this policy primarily address?
  needCategories: Partial<Record<NeedCategory, NeedCategoryScore>>;

  // The four core scoring dimensions
  dimensions: V3ScoringDimensions;

  // Optional: Overall rationale
  rationale?: string;

  // Optional: Link to detailed methodology
  methodologyId?: string;
}

/**
 * Detailed methodology for a policy (for the methodologies folder)
 */
export interface V3PolicyMethodology {
  policyId: string;
  policyName: string;
  description: string;

  // Detailed need category analysis
  needCategories: Record<NeedCategory, NeedCategoryScore>;

  // Detailed dimension analysis
  dimensions: {
    populationAffected: {
      score: number;
      reasoning: string;
      keyPoints: string[];
    };
    essentialToSurvival: {
      score: number;
      reasoning: string;
      keyPoints: string[];
    };
    timeToOutcome: {
      score: number;
      reasoning: string;
      keyPoints: string[];
    };
    feasibility: {
      score: number;
      reasoning: string;
      keyPoints: string[];
    };
  };

  overallRationale: string;
  sources?: string[];
}

// ============================================
// NEED CATEGORY DEFINITIONS
// ============================================

export const NEED_CATEGORY_DEFINITIONS: Record<NeedCategory, {
  name: string;
  description: string;
  examples: string[];
  defaultWeight: number; // For weighted scoring
}> = {
  physiological: {
    name: 'Physiological',
    description: 'Basic survival needs: food, water, shelter, healthcare, sleep',
    examples: ['Healthcare access', 'Housing stability', 'Food security', 'Clean water'],
    defaultWeight: 0.25,
  },
  safety: {
    name: 'Safety',
    description: 'Security, stability, protection from harm and uncertainty',
    examples: ['Personal safety', 'Financial security', 'Health security', 'Job security'],
    defaultWeight: 0.30, // Highest weight as per specification
  },
  community: {
    name: 'Community',
    description: 'Social belonging, connection, civic participation',
    examples: ['Civic engagement', 'Social cohesion', 'Family support', 'Community programs'],
    defaultWeight: 0.15,
  },
  opportunity: {
    name: 'Opportunity',
    description: 'Esteem and growth through employment, education, economic mobility',
    examples: ['Job access', 'Education access', 'Career advancement', 'Entrepreneurship'],
    defaultWeight: 0.20,
  },
  selfActualization: {
    name: 'Self-Actualization',
    description: 'Personal fulfillment, creativity, reaching full potential',
    examples: ['Arts programs', 'Cultural enrichment', 'Creative expression', 'Personal growth'],
    defaultWeight: 0.10,
  },
};

// ============================================
// SCORING DIMENSION DEFINITIONS
// ============================================

export const DIMENSION_DEFINITIONS: Record<keyof V3ScoringDimensions, {
  name: string;
  keyQuestion: string;
  scale: {
    0: string;
    5: string;
    10: string;
  };
}> = {
  populationAffected: {
    name: 'Population Affected',
    keyQuestion: 'What proportion of the population will be affected by this policy?',
    scale: {
      0: 'Harms everyone',
      5: 'Affects no one / neutral',
      10: 'Benefits everyone universally',
    },
  },
  essentialToSurvival: {
    name: 'Essential to Survival',
    keyQuestion: 'How critical is this policy to preventing mortality or addressing basic survival needs?',
    scale: {
      0: 'Directly causes death/harm',
      5: 'Irrelevant to survival',
      10: 'Directly prevents death / ensures survival',
    },
  },
  timeToOutcome: {
    name: 'Time to Outcome',
    keyQuestion: 'How quickly will the effects of this policy be realized?',
    scale: {
      0: 'Immediate harm',
      5: 'No effect / never materializes',
      10: 'Immediate benefit (days to months)',
    },
  },
  feasibility: {
    name: 'Feasibility',
    keyQuestion: 'How politically and practically achievable is this policy?',
    scale: {
      0: 'Actively blocked / illegal',
      5: 'Impossible to pass',
      10: 'Already has broad support, easy path',
    },
  },
};

// ============================================
// SCORING FORMULA
// ============================================

/**
 * Calculate the overall V3 score for a policy
 *
 * The formula combines:
 * 1. Need-weighted score: Sum of (need_score * need_weight) for all categories
 * 2. Dimension score: Average of the four dimensions
 *
 * Final = (need_weighted_score * 0.5) + (dimension_score * 0.5)
 *
 * Returns a score from 0-10 where 5 = neutral
 */
export function calculateV3Score(
  impact: V3ImpactScore,
  categoryWeights?: Partial<Record<NeedCategory, number>>
): number {
  // Use custom weights or defaults
  const weights: Record<NeedCategory, number> = {
    physiological: categoryWeights?.physiological ?? NEED_CATEGORY_DEFINITIONS.physiological.defaultWeight,
    safety: categoryWeights?.safety ?? NEED_CATEGORY_DEFINITIONS.safety.defaultWeight,
    community: categoryWeights?.community ?? NEED_CATEGORY_DEFINITIONS.community.defaultWeight,
    opportunity: categoryWeights?.opportunity ?? NEED_CATEGORY_DEFINITIONS.opportunity.defaultWeight,
    selfActualization: categoryWeights?.selfActualization ?? NEED_CATEGORY_DEFINITIONS.selfActualization.defaultWeight,
  };

  // Calculate need-weighted score (already 0-10)
  let needScore = 0;
  let totalWeight = 0;
  for (const [category, catScore] of Object.entries(impact.needCategories)) {
    if (catScore) {
      needScore += catScore.score * weights[category as NeedCategory];
      totalWeight += weights[category as NeedCategory];
    }
  }
  // Normalize if not all categories are present
  if (totalWeight > 0) {
    needScore = needScore / totalWeight;
  } else {
    needScore = NEUTRAL_SCORE; // Default to neutral if no categories
  }

  // Calculate dimension score (simple average, already 0-10)
  const { populationAffected, essentialToSurvival, timeToOutcome, feasibility } = impact.dimensions;
  const dimensionScore = (populationAffected + essentialToSurvival + timeToOutcome + feasibility) / 4;

  // Combine: 50% need-based, 50% dimension-based
  return needScore * 0.5 + dimensionScore * 0.5;
}

/**
 * Alternative: Calculate with custom dimension weights
 */
export function calculateV3ScoreWeighted(
  impact: V3ImpactScore,
  categoryWeights?: Partial<Record<NeedCategory, number>>,
  dimensionWeights?: Partial<Record<keyof V3ScoringDimensions, number>>
): number {
  // Use custom weights or defaults
  const catWeights: Record<NeedCategory, number> = {
    physiological: categoryWeights?.physiological ?? NEED_CATEGORY_DEFINITIONS.physiological.defaultWeight,
    safety: categoryWeights?.safety ?? NEED_CATEGORY_DEFINITIONS.safety.defaultWeight,
    community: categoryWeights?.community ?? NEED_CATEGORY_DEFINITIONS.community.defaultWeight,
    opportunity: categoryWeights?.opportunity ?? NEED_CATEGORY_DEFINITIONS.opportunity.defaultWeight,
    selfActualization: categoryWeights?.selfActualization ?? NEED_CATEGORY_DEFINITIONS.selfActualization.defaultWeight,
  };

  const dimWeights: Record<keyof V3ScoringDimensions, number> = {
    populationAffected: dimensionWeights?.populationAffected ?? 0.25,
    essentialToSurvival: dimensionWeights?.essentialToSurvival ?? 0.25,
    timeToOutcome: dimensionWeights?.timeToOutcome ?? 0.25,
    feasibility: dimensionWeights?.feasibility ?? 0.25,
  };

  // Calculate need-weighted score
  let needScore = 0;
  let totalWeight = 0;
  for (const [category, catScore] of Object.entries(impact.needCategories)) {
    if (catScore) {
      needScore += catScore.score * catWeights[category as NeedCategory];
      totalWeight += catWeights[category as NeedCategory];
    }
  }
  if (totalWeight > 0) {
    needScore = needScore / totalWeight;
  } else {
    needScore = NEUTRAL_SCORE;
  }

  // Calculate weighted dimension score
  const { populationAffected, essentialToSurvival, timeToOutcome, feasibility } = impact.dimensions;
  const dimensionScore =
    populationAffected * dimWeights.populationAffected +
    essentialToSurvival * dimWeights.essentialToSurvival +
    timeToOutcome * dimWeights.timeToOutcome +
    feasibility * dimWeights.feasibility;

  // Normalize dimension score (weights should sum to 1, but just in case)
  const dimWeightSum = Object.values(dimWeights).reduce((a, b) => a + b, 0);
  const normalizedDimScore = dimWeightSum > 0 ? dimensionScore / dimWeightSum : NEUTRAL_SCORE;

  // Combine: 50% need-based, 50% dimension-based
  return needScore * 0.5 + normalizedDimScore * 0.5;
}

/**
 * Helper to check if a score indicates benefit (> neutral)
 */
export function isBeneficial(score: number): boolean {
  return score > NEUTRAL_SCORE;
}

/**
 * Helper to check if a score indicates harm (< neutral)
 */
export function isHarmful(score: number): boolean {
  return score < NEUTRAL_SCORE;
}

/**
 * Helper to get a human-readable label for a score
 */
export function getScoreLabel(score: number): string {
  if (score <= 1) return 'Extremely Harmful';
  if (score <= 3) return 'Harmful';
  if (score < 5) return 'Slightly Harmful';
  if (score === 5) return 'No Effect';
  if (score < 7) return 'Slightly Beneficial';
  if (score < 9) return 'Beneficial';
  return 'Extremely Beneficial';
}
