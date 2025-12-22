/**
 * V1 Methodology: 7-Factor Impact Scoring Model
 *
 * This model evaluates policies based on their "weight of impact" -
 * how much real-world change they would produce.
 *
 * SCALE: 0.0 - 1.0 for each factor
 * Total Score: 0-100 (computed from weighted factors)
 *
 * The 7 Factors:
 * 1. Population - How many people are directly affected
 * 2. Economic - The dollar volume / economic scale
 * 3. Intensity - How deeply each affected person is impacted
 * 4. Duration - How long the effects persist
 * 5. Equity - Whether benefits flow to vulnerable populations
 * 6. Externalities - Spillover effects (positive or negative)
 * 7. Implementation - How difficult it is to actually pass and implement
 */

// ============================================
// TYPES
// ============================================

export type V1Factor =
  | 'population'
  | 'economic'
  | 'intensity'
  | 'duration'
  | 'equity'
  | 'externalities'
  | 'implementation';

export interface V1FactorScore {
  score: number; // 0.0 - 1.0
  reasoning: string;
  keyPoints: string[];
}

export interface V1PolicyMethodology {
  policyId: string;
  policyName: string;
  description: string;
  totalScore: number; // 0-100
  factors: Record<V1Factor, V1FactorScore>;
  overallRationale: string;
  tier: string; // e.g., "TIER 1: THE STRUCTURAL GIANTS"
}

// ============================================
// FACTOR DEFINITIONS
// ============================================

export const V1_FACTOR_DEFINITIONS: Record<V1Factor, {
  name: string;
  keyQuestion: string;
  lowAnchor: string;
  highAnchor: string;
  description: string;
}> = {
  population: {
    name: 'Population Reach',
    keyQuestion: 'What percentage of Americans are directly affected by this policy?',
    lowAnchor: '0.0: Affects almost no one (<1%)',
    highAnchor: '1.0: Affects virtually everyone (>90%)',
    description: 'The breadth of who is touched by the policy - from niche regulations to universal programs.',
  },
  economic: {
    name: 'Economic Scale',
    keyQuestion: 'How much money flows through or is affected by this policy?',
    lowAnchor: '0.0: Negligible economic volume (<$1B)',
    highAnchor: '1.0: Massive economic shift (>$1T)',
    description: 'The dollar magnitude - taxes raised, benefits distributed, markets restructured.',
  },
  intensity: {
    name: 'Impact Intensity',
    keyQuestion: 'How deeply does this affect each person touched by it?',
    lowAnchor: '0.0: Trivial/unnoticeable change',
    highAnchor: '1.0: Life-changing or life-saving',
    description: 'The depth of impact per person - from minor convenience to existential importance.',
  },
  duration: {
    name: 'Duration',
    keyQuestion: 'How long do the effects of this policy persist?',
    lowAnchor: '0.0: Temporary/one-time effect',
    highAnchor: '1.0: Permanent/constitutional change',
    description: 'The time horizon of impact - from annual programs to generational structural changes.',
  },
  equity: {
    name: 'Equity Focus',
    keyQuestion: 'Does this policy primarily benefit vulnerable or disadvantaged populations?',
    lowAnchor: '0.0: Regressive (benefits flow to wealthy)',
    highAnchor: '1.0: Strongly progressive (targets the poor/marginalized)',
    description: 'Whether the policy addresses inequality or reinforces it.',
  },
  externalities: {
    name: 'Externalities',
    keyQuestion: 'What spillover effects does this policy create beyond its direct targets?',
    lowAnchor: '0.0: Contained/no spillovers',
    highAnchor: '1.0: Massive ripple effects (economy, culture, politics)',
    description: 'Second-order effects - labor market shifts, political realignments, cultural changes.',
  },
  implementation: {
    name: 'Implementation Difficulty',
    keyQuestion: 'How hard is it to actually pass and implement this policy?',
    lowAnchor: '0.0: Easy (executive action, simple regulation)',
    highAnchor: '1.0: Extremely difficult (constitutional amendment, new infrastructure)',
    description: 'The friction of making it happen - political, legal, logistical barriers.',
  },
};

// ============================================
// HELPER FUNCTIONS
// ============================================

export function getV1FactorDefinition(factorId: V1Factor) {
  return V1_FACTOR_DEFINITIONS[factorId];
}

export function calculateV1TotalScore(factors: Record<V1Factor, V1FactorScore>): number {
  // Simple average of all factors (except implementation which is a friction measure)
  // Implementation subtracts from the score as higher = harder to achieve
  const positiveFactors = ['population', 'economic', 'intensity', 'duration', 'equity', 'externalities'] as V1Factor[];

  let sum = 0;
  for (const factor of positiveFactors) {
    sum += factors[factor].score;
  }

  // Average the positive factors, then reduce by implementation difficulty
  const avgPositive = sum / positiveFactors.length;
  const implementationPenalty = factors.implementation.score * 0.2; // 20% penalty for max difficulty

  return Math.round((avgPositive - implementationPenalty) * 100);
}
