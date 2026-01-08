/**
 * Preference Profile Calculation
 *
 * Calculates a user's preference profile (radar chart data) based on
 * their approach ratings weighted by the dimension scores.
 */

import type {
  ImplementationRating,
  PreferenceDimensionId,
  UserPreferenceProfile,
} from '@/types/problem-areas';
import { PREFERENCE_DIMENSION_IDS, PREFERENCE_DIMENSIONS } from '@/types/problem-areas';
import { approachScoresMap } from '@/data/problem-areas/dimension-scores';

/**
 * Calculate a user's preference profile from their approach ratings.
 *
 * For each dimension, we:
 * 1. Take each rated approach
 * 2. Multiply its dimension score by the user's rating (normalized to 0-1)
 * 3. Average across all rated approaches
 *
 * Strongly supported approaches (rating +2) push the profile toward that approach's values.
 * Strongly opposed approaches (rating -2) push away from those values.
 */
export function calculatePreferenceProfile(
  ratings: Record<string, ImplementationRating>
): UserPreferenceProfile {
  const ratedApproachIds = Object.keys(ratings).filter(
    (id) => ratings[id] !== undefined && ratings[id] !== null
  );

  if (ratedApproachIds.length === 0) {
    // No ratings yet - return neutral profile
    return {
      dimensions: Object.fromEntries(
        PREFERENCE_DIMENSION_IDS.map((d) => [d, 50])
      ) as Record<PreferenceDimensionId, number>,
      approachesRated: 0,
      confidence: 'low',
    };
  }

  // Calculate weighted average for each dimension
  const dimensionTotals: Record<PreferenceDimensionId, number> = {} as Record<
    PreferenceDimensionId,
    number
  >;
  const dimensionWeights: Record<PreferenceDimensionId, number> = {} as Record<
    PreferenceDimensionId,
    number
  >;

  for (const dimId of PREFERENCE_DIMENSION_IDS) {
    dimensionTotals[dimId] = 0;
    dimensionWeights[dimId] = 0;
  }

  for (const approachId of ratedApproachIds) {
    const scores = approachScoresMap.get(approachId);
    if (!scores) continue;

    const rating = ratings[approachId];
    // Convert rating (-2 to +2) to weight (0 to 1)
    // -2 -> 0, -1 -> 0.25, 0 -> 0.5, 1 -> 0.75, 2 -> 1
    const normalizedWeight = (rating + 2) / 4;

    for (const dimId of PREFERENCE_DIMENSION_IDS) {
      const dimScore = scores[dimId];
      // Weight contribution by how strongly they feel
      const absWeight = Math.abs(rating) / 2; // 0, 0.5, or 1
      dimensionTotals[dimId] += dimScore * normalizedWeight * absWeight;
      dimensionWeights[dimId] += absWeight;
    }
  }

  // Calculate final dimension scores
  const dimensions: Record<PreferenceDimensionId, number> = {} as Record<
    PreferenceDimensionId,
    number
  >;

  for (const dimId of PREFERENCE_DIMENSION_IDS) {
    if (dimensionWeights[dimId] > 0) {
      dimensions[dimId] = Math.round(dimensionTotals[dimId] / dimensionWeights[dimId]);
    } else {
      dimensions[dimId] = 50; // Neutral if no weight
    }
  }

  // Determine confidence level
  let confidence: 'low' | 'medium' | 'high' = 'low';
  if (ratedApproachIds.length >= 10) {
    confidence = 'high';
  } else if (ratedApproachIds.length >= 5) {
    confidence = 'medium';
  }

  return {
    dimensions,
    approachesRated: ratedApproachIds.length,
    confidence,
  };
}

/**
 * Format preference profile for radar chart display
 */
export function formatProfileForRadar(profile: UserPreferenceProfile) {
  return PREFERENCE_DIMENSIONS.map((dim) => ({
    dimension: dim.label,
    fullName: dim.title,
    value: profile.dimensions[dim.id],
    description: dim.description,
    lowLabel: dim.lowLabel,
    highLabel: dim.highLabel,
    color: dim.color,
  }));
}

/**
 * Format a single approach's dimension scores for radar display
 */
export function formatApproachForRadar(approachId: string) {
  const scores = approachScoresMap.get(approachId);
  if (!scores) return null;

  return PREFERENCE_DIMENSIONS.map((dim) => ({
    dimension: dim.label,
    fullName: dim.title,
    value: scores[dim.id],
    description: dim.description,
    lowLabel: dim.lowLabel,
    highLabel: dim.highLabel,
    color: dim.color,
  }));
}

/**
 * Compare user profile with an approach's profile
 */
export function calculateProfileSimilarity(
  userProfile: UserPreferenceProfile,
  approachId: string
): number {
  const approachScores = approachScoresMap.get(approachId);
  if (!approachScores) return 0;

  // Calculate cosine similarity
  let dotProduct = 0;
  let userMagnitude = 0;
  let approachMagnitude = 0;

  for (const dimId of PREFERENCE_DIMENSION_IDS) {
    const userVal = userProfile.dimensions[dimId];
    const approachVal = approachScores[dimId];
    dotProduct += userVal * approachVal;
    userMagnitude += userVal * userVal;
    approachMagnitude += approachVal * approachVal;
  }

  if (userMagnitude === 0 || approachMagnitude === 0) return 0;

  const similarity = dotProduct / (Math.sqrt(userMagnitude) * Math.sqrt(approachMagnitude));
  // Convert to 0-100 percentage
  return Math.round(similarity * 100);
}
