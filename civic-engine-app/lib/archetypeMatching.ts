/**
 * Archetype Matching Utilities
 *
 * Functions to find the closest archetype to user's questionnaire-derived weights
 * and generate explanations for why that archetype was selected.
 */

import { V3_ARCHETYPES, V3Archetype, V3_NEED_INFO, NEED_CATEGORY_ORDER } from '@/data/archetypesV3';
import { V2_ARCHETYPES, V2_FACTOR_INFO } from '@/data/archetypesV2';
import { V3NeedWeights } from '@/types/values';
import { V2WeightProfile, V2Archetype, V2Factor } from '@/types/consensus';
import { NeedCategory } from '@/data/v3Methodology';

export interface ArchetypeMatch<T> {
  archetype: T;
  distance: number;
  similarity: number; // 0-100 percentage
  explanation: string;
  topSharedPriorities: string[];
}

/**
 * Calculate Euclidean distance between two V3 weight profiles
 */
function calculateV3Distance(w1: V3NeedWeights, w2: V3NeedWeights): number {
  const categories: NeedCategory[] = ['physiological', 'safety', 'community', 'opportunity', 'selfActualization'];
  const sumSquaredDiffs = categories.reduce((sum, category) => {
    const diff = (w1[category] || 0) - (w2[category] || 0);
    return sum + (diff * diff);
  }, 0);
  return Math.sqrt(sumSquaredDiffs);
}

/**
 * Calculate Euclidean distance between two V2 weight profiles
 */
function calculateV2Distance(w1: V2WeightProfile, w2: V2WeightProfile): number {
  const factors: V2Factor[] = ['hayek', 'ostrom', 'downs', 'olson', 'keynes', 'pettit', 'hirschman', 'buchanan', 'polanyi', 'rawls', 'george', 'acemoglu', 'walzer'];
  const sumSquaredDiffs = factors.reduce((sum, factor) => {
    const diff = (w1[factor] || 0) - (w2[factor] || 0);
    return sum + (diff * diff);
  }, 0);
  return Math.sqrt(sumSquaredDiffs);
}

/**
 * Convert distance to similarity percentage (0-100)
 * Uses exponential decay so small distances = high similarity
 */
function distanceToSimilarity(distance: number, maxDistance: number = 1): number {
  // Normalize distance to 0-1 range
  const normalizedDistance = Math.min(distance / maxDistance, 1);
  // Exponential decay for more intuitive similarity
  const similarity = Math.exp(-normalizedDistance * 3) * 100;
  return Math.round(similarity);
}

/**
 * Get top priorities from V3 weights
 */
function getV3TopPriorities(weights: V3NeedWeights, count: number = 2): NeedCategory[] {
  return NEED_CATEGORY_ORDER
    .slice()
    .sort((a, b) => (weights[b] || 0) - (weights[a] || 0))
    .slice(0, count);
}

/**
 * Get top priorities from V2 weights
 */
function getV2TopPriorities(weights: V2WeightProfile, count: number = 3): V2Factor[] {
  const factors: V2Factor[] = ['hayek', 'ostrom', 'downs', 'olson', 'keynes', 'pettit', 'hirschman', 'buchanan', 'polanyi', 'rawls', 'george', 'acemoglu', 'walzer'];
  return factors
    .slice()
    .sort((a, b) => (weights[b] || 0) - (weights[a] || 0))
    .slice(0, count);
}

/**
 * Find shared top priorities between user weights and archetype weights
 */
function findV3SharedPriorities(userWeights: V3NeedWeights, archetypeWeights: V3NeedWeights): string[] {
  const userTop = getV3TopPriorities(userWeights, 3);
  const archetypeTop = getV3TopPriorities(archetypeWeights, 3);

  const shared = userTop.filter(p => archetypeTop.includes(p));
  return shared.map(category => V3_NEED_INFO[category].name);
}

/**
 * Find shared top priorities between user weights and V2 archetype weights
 */
function findV2SharedPriorities(userWeights: V2WeightProfile, archetypeWeights: V2WeightProfile): string[] {
  const userTop = getV2TopPriorities(userWeights, 4);
  const archetypeTop = getV2TopPriorities(archetypeWeights, 4);

  const shared = userTop.filter(p => archetypeTop.includes(p));
  return shared.map(factor => V2_FACTOR_INFO[factor].name);
}

/**
 * Generate explanation for why V3 archetype was matched
 */
function generateV3Explanation(
  userWeights: V3NeedWeights,
  archetype: V3Archetype,
  similarity: number,
  sharedPriorities: string[]
): string {
  const userTopPriorities = getV3TopPriorities(userWeights, 2)
    .map(c => V3_NEED_INFO[c].name);

  if (sharedPriorities.length >= 2) {
    return `Your emphasis on ${sharedPriorities.slice(0, 2).join(' and ')} aligns closely with the ${archetype.name} profile. This perspective values ${archetype.shortDescription.toLowerCase()}.`;
  } else if (sharedPriorities.length === 1) {
    return `Your priority on ${sharedPriorities[0]} resonates with the ${archetype.name} approach. While your profile is unique, you share similar core values around ${archetype.shortDescription.toLowerCase()}.`;
  } else {
    return `Based on your overall weighting pattern, the ${archetype.name} profile is your closest match at ${similarity}% similarity. Your emphasis on ${userTopPriorities.join(' and ')} creates a unique but related perspective.`;
  }
}

/**
 * Generate explanation for why V2 archetype was matched
 */
function generateV2Explanation(
  userWeights: V2WeightProfile,
  archetype: V2Archetype,
  similarity: number,
  sharedPriorities: string[]
): string {
  const userTopPriorities = getV2TopPriorities(userWeights, 2)
    .map(f => V2_FACTOR_INFO[f].name);

  if (sharedPriorities.length >= 2) {
    return `Your emphasis on ${sharedPriorities.slice(0, 2).join(' and ')} aligns closely with ${archetype.name}. This perspective, inspired by ${archetype.philosopher}, focuses on ${archetype.philosophyName.toLowerCase()}.`;
  } else if (sharedPriorities.length === 1) {
    return `Your priority on ${sharedPriorities[0]} resonates with ${archetype.name}. While your profile is unique, you share core values with this ${archetype.philosopher}-inspired approach.`;
  } else {
    return `Based on your overall weighting pattern, ${archetype.name} is your closest match at ${similarity}% similarity. Your emphasis on ${userTopPriorities.join(' and ')} creates a distinctive perspective.`;
  }
}

/**
 * Find the closest V3 archetype to user's weights
 */
export function findClosestV3Archetype(userWeights: V3NeedWeights): ArchetypeMatch<V3Archetype> {
  let closestArchetype = V3_ARCHETYPES[0];
  let minDistance = calculateV3Distance(userWeights, V3_ARCHETYPES[0].weights);

  for (const archetype of V3_ARCHETYPES) {
    const distance = calculateV3Distance(userWeights, archetype.weights);
    if (distance < minDistance) {
      minDistance = distance;
      closestArchetype = archetype;
    }
  }

  const similarity = distanceToSimilarity(minDistance, 0.5);
  const sharedPriorities = findV3SharedPriorities(userWeights, closestArchetype.weights);
  const explanation = generateV3Explanation(userWeights, closestArchetype, similarity, sharedPriorities);

  return {
    archetype: closestArchetype,
    distance: minDistance,
    similarity,
    explanation,
    topSharedPriorities: sharedPriorities,
  };
}

/**
 * Find the closest V2 archetype to user's weights
 */
export function findClosestV2Archetype(userWeights: V2WeightProfile): ArchetypeMatch<V2Archetype> {
  let closestArchetype = V2_ARCHETYPES[0];
  let minDistance = calculateV2Distance(userWeights, V2_ARCHETYPES[0].weights);

  for (const archetype of V2_ARCHETYPES) {
    const distance = calculateV2Distance(userWeights, archetype.weights);
    if (distance < minDistance) {
      minDistance = distance;
      closestArchetype = archetype;
    }
  }

  const similarity = distanceToSimilarity(minDistance, 0.7);
  const sharedPriorities = findV2SharedPriorities(userWeights, closestArchetype.weights);
  const explanation = generateV2Explanation(userWeights, closestArchetype, similarity, sharedPriorities);

  return {
    archetype: closestArchetype,
    distance: minDistance,
    similarity,
    explanation,
    topSharedPriorities: sharedPriorities,
  };
}
