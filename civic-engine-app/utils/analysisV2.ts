import {
  V2FactorScores,
  V2WeightProfile,
  V2Factor,
  ConsensusAnalysis,
  ConsensusState,
  PolicyModifier,
  DivergenceDriver,
  V2ArchetypeId,
  V2ImpactScore,
} from '@/types/consensus';
import {
  V2_ARCHETYPES,
  V2_FACTORS,
  V2_FACTOR_INFO,
  V2_DEFAULT_WEIGHTS,
} from '@/data/archetypesV2';
import { policyImpactScoresV2 } from '@/data/policyScoresV2';

// ===========================================
// CORE CALCULATION FUNCTIONS
// ===========================================

/**
 * Apply modifiers to factor scores with clamping (0-1)
 */
export function applyModifiers(
  factors: V2FactorScores,
  modifiers?: PolicyModifier[]
): V2FactorScores {
  if (!modifiers?.length) return factors;

  const result = { ...factors };
  for (const mod of modifiers) {
    for (const [key, delta] of Object.entries(mod.delta)) {
      const k = key as V2Factor;
      if (delta !== undefined && k in result) {
        result[k] = Math.min(1.0, Math.max(0.0, result[k] + delta));
      }
    }
  }
  return result;
}

/**
 * Calculate archetype score via dot product
 * Score = sum(factor_score * factor_weight) * 100
 */
export function calculateV2ArchetypeScore(
  factors: V2FactorScores,
  weights: V2WeightProfile,
  modifiers?: PolicyModifier[]
): number {
  const currentFactors = applyModifiers(factors, modifiers);

  let sum = 0;
  for (const factor of V2_FACTORS) {
    sum += currentFactors[factor] * weights[factor];
  }
  return Math.round(sum * 100);
}

/**
 * Calculate personalized V2 score for a policy
 */
export function calculatePersonalizedV2Score(
  policyId: string,
  weights: V2WeightProfile | null,
  modifiers?: PolicyModifier[]
): number | null {
  const policyScores = policyImpactScoresV2[policyId];
  if (!policyScores) return null;

  const userWeights = weights || V2_DEFAULT_WEIGHTS;
  return calculateV2ArchetypeScore(policyScores.factors, userWeights, modifiers);
}

/**
 * Get base V2 impact score for a policy
 */
export function getBaseV2Score(policyId: string): V2ImpactScore | null {
  return policyImpactScoresV2[policyId] || null;
}

// ===========================================
// CONSENSUS ANALYSIS
// ===========================================

/**
 * Calculate scores for all archetypes
 */
function calculateAllArchetypeScores(
  factors: V2FactorScores,
  modifiers?: PolicyModifier[]
): Record<V2ArchetypeId, number> {
  const scores: Partial<Record<V2ArchetypeId, number>> = {};

  for (const archetype of V2_ARCHETYPES) {
    scores[archetype.id] = calculateV2ArchetypeScore(factors, archetype.weights, modifiers);
  }

  return scores as Record<V2ArchetypeId, number>;
}

/**
 * Determine consensus state based on score distribution
 */
function determineConsensusState(
  scores: number[],
  mean: number,
  stdDev: number
): ConsensusState {
  const allHigh = scores.every(s => s > 70);
  const allLow = scores.every(s => s < 40);
  const lowSpread = stdDev < 10;
  const moderateSpread = stdDev >= 10 && stdDev < 20;
  const highSpread = stdDev >= 20;

  if (allHigh && lowSpread) return 'super-consensus';
  if (allLow) return 'universal-reject';
  if (mean > 60 && moderateSpread) return 'hidden-agreement';
  if (highSpread) return 'battleground';
  return 'mixed';
}

/**
 * Find which factors cause the most divergence across archetypes
 */
function findDivergenceDrivers(
  factors: V2FactorScores,
  topN: number = 3
): DivergenceDriver[] {
  const driverAnalysis: DivergenceDriver[] = [];

  for (const factor of V2_FACTORS) {
    // Calculate contribution of this factor for each archetype
    const contributions = V2_ARCHETYPES.map(arch => ({
      archetypeId: arch.id,
      contribution: factors[factor] * arch.weights[factor] * 100,
    }));

    // Calculate variance of contributions
    const contribValues = contributions.map(c => c.contribution);
    const contribMean = contribValues.reduce((a, b) => a + b, 0) / contribValues.length;
    const variance = contribValues.reduce(
      (sum, c) => sum + Math.pow(c - contribMean, 2),
      0
    ) / contribValues.length;

    // Generate narrative for this factor
    const factorInfo = V2_FACTOR_INFO[factor];
    const highestContrib = Math.max(...contribValues);
    const lowestContrib = Math.min(...contribValues);
    const spread = highestContrib - lowestContrib;

    let narrative = '';
    if (spread > 5) {
      const highArch = V2_ARCHETYPES.find(
        a => factors[factor] * a.weights[factor] * 100 === highestContrib
      );
      const lowArch = V2_ARCHETYPES.find(
        a => factors[factor] * a.weights[factor] * 100 === lowestContrib
      );
      narrative = `${factorInfo.name} (${factorInfo.thinker}) creates a ${spread.toFixed(0)}-point gap between ${highArch?.name || 'some'} and ${lowArch?.name || 'others'}.`;
    } else {
      narrative = `${factorInfo.name} contributes similarly across perspectives.`;
    }

    driverAnalysis.push({
      factor,
      variance,
      narrative,
    });
  }

  // Sort by variance and return top N
  return driverAnalysis
    .sort((a, b) => b.variance - a.variance)
    .slice(0, topN);
}

/**
 * Full consensus analysis for a policy
 */
export function analyzePolicy(
  policyId: string,
  modifiers?: PolicyModifier[]
): ConsensusAnalysis | null {
  const policyScores = policyImpactScoresV2[policyId];
  if (!policyScores) return null;

  const currentFactors = applyModifiers(policyScores.factors, modifiers);

  // Calculate score for each archetype
  const scores = calculateAllArchetypeScores(currentFactors, modifiers);

  // Calculate statistics
  const values = Object.values(scores);
  const mean = values.reduce((a, b) => a + b, 0) / values.length;
  const variance = values.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / values.length;
  const stdDev = Math.sqrt(variance);

  // Determine consensus state
  const consensusState = determineConsensusState(values, mean, stdDev);

  // Find divergence drivers
  const drivers = findDivergenceDrivers(currentFactors, 3);

  return {
    scores,
    consensusState,
    mean: Math.round(mean),
    stdDev: Math.round(stdDev * 10) / 10,
    drivers,
  };
}

/**
 * Quick consensus state calculation (for list views)
 * Skips driver analysis for performance
 */
export function getQuickConsensusState(policyId: string): ConsensusState | null {
  const policyScores = policyImpactScoresV2[policyId];
  if (!policyScores) return null;

  const scores = V2_ARCHETYPES.map(arch =>
    calculateV2ArchetypeScore(policyScores.factors, arch.weights)
  );

  const mean = scores.reduce((a, b) => a + b, 0) / scores.length;
  const variance = scores.reduce((sum, s) => sum + Math.pow(s - mean, 2), 0) / scores.length;
  const stdDev = Math.sqrt(variance);

  return determineConsensusState(scores, mean, stdDev);
}

// ===========================================
// INSIGHT GENERATION
// ===========================================

/**
 * Get the difference between personalized V2 score and default score
 */
export function getV2ScoreDifference(
  policyId: string,
  userWeights: V2WeightProfile | null
): number | null {
  const policyScores = policyImpactScoresV2[policyId];
  if (!policyScores) return null;

  const weights = userWeights || V2_DEFAULT_WEIGHTS;
  const personalizedScore = calculateV2ArchetypeScore(policyScores.factors, weights);
  const defaultScore = calculateV2ArchetypeScore(policyScores.factors, V2_DEFAULT_WEIGHTS);

  return personalizedScore - defaultScore;
}

/**
 * Generate insight text explaining the user's personalized score
 */
export function getV2ScoreInsight(
  policyId: string,
  userWeights: V2WeightProfile | null
): string | null {
  const policyScores = policyImpactScoresV2[policyId];
  if (!policyScores) return null;

  const weights = userWeights || V2_DEFAULT_WEIGHTS;
  const personalizedScore = calculateV2ArchetypeScore(policyScores.factors, weights);

  // Calculate the "default" score for comparison
  const defaultScore = calculateV2ArchetypeScore(policyScores.factors, V2_DEFAULT_WEIGHTS);
  const difference = personalizedScore - defaultScore;

  if (Math.abs(difference) < 3) {
    return null; // No significant difference
  }

  // Find user's top 2 weighted factors
  const userTopFactors = V2_FACTORS
    .map(f => ({ factor: f, weight: weights[f] }))
    .sort((a, b) => b.weight - a.weight)
    .slice(0, 2);

  // Find policy's top 2 scoring factors
  const policyTopFactors = V2_FACTORS
    .map(f => ({ factor: f, score: policyScores.factors[f] }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 2);

  const topUserFactor = V2_FACTOR_INFO[userTopFactors[0].factor];
  const topPolicyFactor = V2_FACTOR_INFO[policyTopFactors[0].factor];

  if (difference > 0) {
    // Higher than default
    const overlap = userTopFactors.some(u =>
      policyTopFactors.some(p => p.factor === u.factor)
    );

    if (overlap) {
      return `Scores ${difference} points above average. This policy excels in ${topUserFactor.name}, which you prioritize highly.`;
    } else {
      return `Scores ${difference} points above average. Your emphasis on ${topUserFactor.name} aligns well with this policy's strengths.`;
    }
  } else {
    // Lower than default
    return `Scores ${Math.abs(difference)} points below average. This policy rates lower in ${topUserFactor.name}, which matters most to you.`;
  }
}

/**
 * Get the top factors driving a user's score for a policy
 */
export function getTopScoreDrivers(
  policyId: string,
  userWeights: V2WeightProfile | null,
  topN: number = 3
): Array<{ factor: V2Factor; contribution: number; name: string }> {
  const policyScores = policyImpactScoresV2[policyId];
  if (!policyScores) return [];

  const weights = userWeights || V2_DEFAULT_WEIGHTS;

  const contributions = V2_FACTORS.map(factor => ({
    factor,
    contribution: policyScores.factors[factor] * weights[factor] * 100,
    name: V2_FACTOR_INFO[factor].name,
  }));

  return contributions
    .sort((a, b) => b.contribution - a.contribution)
    .slice(0, topN);
}

// ===========================================
// CONSENSUS NARRATIVE GENERATION
// ===========================================

/**
 * Generate human-readable narrative for consensus state
 */
export function generateConsensusNarrative(analysis: ConsensusAnalysis): string {
  const { consensusState, mean, stdDev, drivers, scores } = analysis;

  const scoreValues = Object.values(scores);
  const highest = Math.max(...scoreValues);
  const lowest = Math.min(...scoreValues);

  const highestArchetype = V2_ARCHETYPES.find(
    a => scores[a.id] === highest
  );
  const lowestArchetype = V2_ARCHETYPES.find(
    a => scores[a.id] === lowest
  );

  switch (consensusState) {
    case 'super-consensus':
      return `Strong agreement across all philosophical perspectives (avg: ${mean}, spread: ${stdDev}). ${drivers[0]?.narrative || ''}`;

    case 'hidden-agreement':
      return `Surprising alignment despite different priorities (avg: ${mean}, spread: ${stdDev}). ${drivers[0]?.narrative || ''}`;

    case 'battleground':
      return `Sharp disagreement: ${highestArchetype?.name} scores ${highest} while ${lowestArchetype?.name} scores ${lowest}. ${drivers[0]?.narrative || ''}`;

    case 'universal-reject':
      return `Low scores across all perspectives (avg: ${mean}). ${drivers[0]?.narrative || ''}`;

    case 'mixed':
    default:
      return `Moderate variation in scores (avg: ${mean}, spread: ${stdDev}). Different values lead to different conclusions.`;
  }
}
