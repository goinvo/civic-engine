import { WeightProfile } from '@/types/values';
import { ImpactScore } from '@/types/policy';
import { policyImpactScores } from '@/data/policyScores';
import { DEFAULT_WEIGHTS } from '@/data/values';

/**
 * Calculate personalized impact score for a policy based on user's value weights
 *
 * @param policyId - The ID of the policy
 * @param userWeights - The user's weight profile (if null, uses default balanced weights)
 * @returns Personalized score (0-100) or null if policy has no impact data
 */
export function calculatePersonalizedScore(
  policyId: string,
  userWeights: WeightProfile | null
): number | null {
  const policyScore = policyImpactScores[policyId];
  if (!policyScore) return null;

  // Use user weights or default balanced weights
  const weights = userWeights || DEFAULT_WEIGHTS;

  const { breakdown } = policyScore;

  // Calculate weighted sum
  const personalizedScore =
    breakdown.population * weights.population +
    breakdown.economic * weights.economic +
    breakdown.intensity * weights.intensity +
    breakdown.duration * weights.duration +
    breakdown.equity * weights.equity +
    breakdown.externalities * weights.externalities +
    breakdown.implementation * weights.implementation;

  // Normalize to 0-100 scale
  // Since weights sum to 1.0 and breakdowns are 0-1, the max possible is 1.0
  // Multiply by 100 to get a 0-100 score
  return Math.round(personalizedScore * 100);
}

/**
 * Get the base (non-personalized) impact score for a policy
 *
 * @param policyId - The ID of the policy
 * @returns Base impact score or null if not found
 */
export function getBaseImpactScore(policyId: string): ImpactScore | null {
  return policyImpactScores[policyId] || null;
}

/**
 * Calculate the difference between personalized and base scores
 *
 * @param policyId - The ID of the policy
 * @param userWeights - The user's weight profile
 * @returns Difference in points (positive means higher than base, negative means lower)
 */
export function getScoreDifference(
  policyId: string,
  userWeights: WeightProfile | null
): number | null {
  const baseScore = policyImpactScores[policyId]?.totalScore;
  const personalizedScore = calculatePersonalizedScore(policyId, userWeights);

  if (baseScore === undefined || personalizedScore === null) return null;

  return personalizedScore - baseScore;
}

/**
 * Get insight text explaining why a score is higher or lower than base
 *
 * @param policyId - The ID of the policy
 * @param userWeights - The user's weight profile
 * @returns Insight text or null
 */
export function getScoreInsight(
  policyId: string,
  userWeights: WeightProfile | null
): string | null {
  if (!userWeights) return null;

  const policyScore = policyImpactScores[policyId];
  const difference = getScoreDifference(policyId, userWeights);

  if (!policyScore || difference === null) return null;

  // If difference is negligible, don't show insight
  if (Math.abs(difference) < 3) return null;

  const factorNames: Record<string, string> = {
    population: 'Population Reach',
    economic: 'Economic Scale',
    intensity: 'Individual Impact',
    duration: 'Time Horizon',
    equity: 'Equity & Justice',
    externalities: 'Side Effects',
    implementation: 'Feasibility',
  };

  // Get top 2 user-weighted factors
  const topUserFactors = Object.entries(userWeights)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 2)
    .map(([key]) => key);

  // Get top 2 policy strength factors
  const topPolicyFactors = Object.entries(policyScore.breakdown)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 2)
    .map(([key]) => key);

  // Find overlap between user priorities and policy strengths
  const alignedFactors = topUserFactors.filter(f => topPolicyFactors.includes(f));

  if (difference > 0) {
    // Score is higher than base
    if (alignedFactors.length > 0) {
      const alignedFactor = alignedFactors[0];
      const factorScore = policyScore.breakdown[alignedFactor as keyof typeof policyScore.breakdown];
      const factorName = factorNames[alignedFactor] || alignedFactor;

      return `Scores ${difference} points above average. This policy excels in ${factorName} (${Math.round(factorScore * 100)}%), which you prioritize highly.`;
    } else {
      // Find what user values most
      const topUserFactor = topUserFactors[0];
      const topUserFactorName = factorNames[topUserFactor] || topUserFactor;
      const userFactorScore = policyScore.breakdown[topUserFactor as keyof typeof policyScore.breakdown];

      return `Scores ${difference} points above average. Strong alignment with your focus on ${topUserFactorName} (${Math.round(userFactorScore * 100)}%).`;
    }
  } else {
    // Score is lower than base
    // Find user's top factor where policy is weak
    const topUserFactor = topUserFactors[0];
    const topUserFactorName = factorNames[topUserFactor] || topUserFactor;
    const userFactorScore = policyScore.breakdown[topUserFactor as keyof typeof policyScore.breakdown];

    if (userFactorScore < 0.4) {
      return `Scores ${Math.abs(difference)} points below average. This policy rates lower in ${topUserFactorName} (${Math.round(userFactorScore * 100)}%), which matters most to you.`;
    } else {
      return `Scores ${Math.abs(difference)} points below average based on your values, despite reasonable ${topUserFactorName} performance.`;
    }
  }
}
