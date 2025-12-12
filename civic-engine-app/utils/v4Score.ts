/**
 * V4 Combined Scoring Utility
 *
 * Calculates personalized scores combining all three lenses:
 * - Impact (V1): Measures magnitude & feasibility
 * - Economics (V2): Evaluates political economy alignment
 * - Needs (V3): Assesses human needs fulfillment
 */

import { policyImpactScores } from '@/data/policyScores';
import { policyImpactScoresV2 } from '@/data/policyScoresV2';
import { getV3Scores, hasV3Scores } from '@/data/policyScoresV3';
import { V4WeightProfile, DEFAULT_V4_WEIGHTS } from '@/data/v4Methodology';
import { V3NeedWeights, WeightProfile } from '@/types/values';
import { V2WeightProfile, V2Factor } from '@/types/consensus';
import { NeedCategory } from '@/data/v3Methodology';

/**
 * Calculate V1 Impact lens score for a policy
 * Returns 0-100 score
 */
export function calculateImpactScore(
  policyId: string,
  weights: WeightProfile
): number | null {
  const policyScore = policyImpactScores[policyId];
  if (!policyScore) return null;

  const { breakdown } = policyScore;
  let score = 0;
  score += breakdown.population * weights.population;
  score += breakdown.economic * weights.economic;
  score += breakdown.intensity * weights.intensity;
  score += breakdown.duration * weights.duration;
  score += breakdown.equity * weights.equity;
  score += breakdown.externalities * weights.externalities;
  score += breakdown.implementation * weights.implementation;

  return Math.round(score * 100);
}

/**
 * Calculate V2 Economics lens score for a policy
 * Returns 0-100 score
 */
export function calculateEconomicsScore(
  policyId: string,
  weights: V2WeightProfile
): number | null {
  const policyScore = policyImpactScoresV2[policyId];
  if (!policyScore) return null;

  const { factors } = policyScore;
  let score = 0;
  const factorKeys: V2Factor[] = [
    'hayek', 'ostrom', 'downs', 'olson', 'keynes',
    'pettit', 'hirschman', 'buchanan', 'polanyi',
    'rawls', 'george', 'acemoglu', 'walzer'
  ];

  for (const factor of factorKeys) {
    score += (factors[factor] || 0) * weights[factor];
  }

  return Math.round(score * 100);
}

/**
 * Calculate V3 Needs lens score for a policy
 * Returns 0-100 score (converted from 0-10 scale)
 */
export function calculateNeedsScore(
  policyId: string,
  weights: V3NeedWeights
): number | null {
  const impactScore = getV3Scores(policyId);
  if (!impactScore) return null;

  const { needCategories, dimensions } = impactScore;

  // Calculate need-weighted score
  let needScore = 0;
  let totalWeight = 0;
  const categories: NeedCategory[] = ['physiological', 'safety', 'community', 'opportunity', 'selfActualization'];

  for (const category of categories) {
    const catScore = needCategories[category];
    if (catScore) {
      needScore += catScore.score * weights[category];
      totalWeight += weights[category];
    }
  }

  // Normalize if not all categories present
  if (totalWeight > 0) {
    needScore = needScore / totalWeight;
  } else {
    needScore = 5; // Neutral
  }

  // Calculate dimension score
  const dimensionScore = (
    dimensions.populationAffected +
    dimensions.essentialToSurvival +
    dimensions.timeToOutcome +
    dimensions.feasibility
  ) / 4;

  // Combine: 50% need-based, 50% dimension-based
  const combined = needScore * 0.5 + dimensionScore * 0.5;

  // Convert from 0-10 to 0-100
  return Math.round(combined * 10);
}

/**
 * Calculate combined V4 score using all three lenses
 * Returns 0-100 score
 */
export function calculateV4CombinedScore(
  policyId: string,
  v4Weights: V4WeightProfile | null
): number | null {
  const weights = v4Weights || DEFAULT_V4_WEIGHTS;

  // Calculate individual lens scores
  const impactScore = calculateImpactScore(policyId, weights.impactWeights);
  const economicsScore = calculateEconomicsScore(policyId, weights.economicsWeights);
  const needsScore = calculateNeedsScore(policyId, weights.needsWeights);

  // Count available scores and weights
  let totalScore = 0;
  let totalWeight = 0;

  if (impactScore !== null) {
    totalScore += impactScore * weights.lensWeights.impact;
    totalWeight += weights.lensWeights.impact;
  }

  if (economicsScore !== null) {
    totalScore += economicsScore * weights.lensWeights.economics;
    totalWeight += weights.lensWeights.economics;
  }

  if (needsScore !== null) {
    totalScore += needsScore * weights.lensWeights.needs;
    totalWeight += weights.lensWeights.needs;
  }

  // If no scores available, return null
  if (totalWeight === 0) return null;

  // Normalize to account for missing lenses
  return Math.round(totalScore / totalWeight);
}

/**
 * Get individual lens scores for breakdown display
 */
export function getV4LensBreakdown(
  policyId: string,
  v4Weights: V4WeightProfile | null
): {
  impact: number | null;
  economics: number | null;
  needs: number | null;
  combined: number | null;
} {
  const weights = v4Weights || DEFAULT_V4_WEIGHTS;

  return {
    impact: calculateImpactScore(policyId, weights.impactWeights),
    economics: calculateEconomicsScore(policyId, weights.economicsWeights),
    needs: calculateNeedsScore(policyId, weights.needsWeights),
    combined: calculateV4CombinedScore(policyId, v4Weights),
  };
}

/**
 * Check if a policy has all three lens scores
 */
export function hasFullV4Coverage(policyId: string): boolean {
  const hasV1 = policyImpactScores[policyId] !== undefined;
  const hasV2 = policyImpactScoresV2[policyId] !== undefined;
  const hasV3 = hasV3Scores(policyId);
  return hasV1 && hasV2 && hasV3;
}

/**
 * Get the number of available lens scores for a policy
 */
export function getV4Coverage(policyId: string): {
  impact: boolean;
  economics: boolean;
  needs: boolean;
  count: number;
} {
  const impact = policyImpactScores[policyId] !== undefined;
  const economics = policyImpactScoresV2[policyId] !== undefined;
  const needs = hasV3Scores(policyId);
  return {
    impact,
    economics,
    needs,
    count: (impact ? 1 : 0) + (economics ? 1 : 0) + (needs ? 1 : 0),
  };
}
