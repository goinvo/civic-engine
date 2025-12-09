import { useMemo } from 'react';
import { useValues } from '@/contexts/ValuesContext';
import {
  calculatePersonalizedScore,
  getBaseImpactScore,
  getScoreDifference,
  getScoreInsight,
} from '@/utils/impactScore';
import {
  calculatePersonalizedV2Score,
  getBaseV2Score,
  getV2ScoreInsight,
  getV2ScoreDifference,
  analyzePolicy,
  getQuickConsensusState,
  getTopScoreDrivers,
} from '@/utils/analysisV2';
import { ConsensusAnalysis, ConsensusState, V2ImpactScore } from '@/types/consensus';
import { getV3Scores, hasV3Scores } from '@/data/policyScoresV3';
import { V3ImpactScore } from '@/data/v3Methodology';

/**
 * Hook to get personalized impact score for a policy
 * Supports both V1 and V2 scoring models
 *
 * @param policyId - The ID of the policy
 * @returns Object containing personalized score, base score, difference, and insight
 */
export function useImpactScore(policyId: string) {
  const { profile } = useValues();

  const result = useMemo(() => {
    const scoringModel = profile?.scoringModel || 'v1';

    // Always get V3 scores if available (shown alongside V2)
    const v3Score = getV3Scores(policyId);
    const hasV3 = hasV3Scores(policyId);

    if (scoringModel === 'v2') {
      // V2 scoring model
      const v2Weights = profile?.v2Weights || null;
      const baseV2Score = getBaseV2Score(policyId);
      const personalizedScore = calculatePersonalizedV2Score(policyId, v2Weights);
      const insight = getV2ScoreInsight(policyId, v2Weights);
      const difference = getV2ScoreDifference(policyId, v2Weights);

      // Get quick consensus state for list views
      const consensusState = getQuickConsensusState(policyId);

      return {
        // V1 compatibility fields (null in V2 mode)
        baseScore: null,
        // V2 fields
        personalizedScore,
        insight,
        difference,
        hasPersonalization: profile !== null && profile.v2ArchetypeId !== undefined,
        // V2-specific fields
        scoringModel: 'v2' as const,
        baseV2Score,
        consensusState,
        // V3 fields (always available if data exists)
        v3Score,
        hasV3,
      };
    }

    // V1 scoring model (default)
    const weights = profile?.weights || null;
    const baseScore = getBaseImpactScore(policyId);
    const personalizedScore = calculatePersonalizedScore(policyId, weights);
    const difference = getScoreDifference(policyId, weights);
    const insight = getScoreInsight(policyId, weights);

    return {
      baseScore,
      personalizedScore,
      difference,
      insight,
      hasPersonalization: profile !== null && profile.archetypeId !== 'balanced',
      // V2-specific fields (null in V1 mode)
      scoringModel: 'v1' as const,
      baseV2Score: null,
      consensusState: null,
      // V3 fields (always available if data exists)
      v3Score,
      hasV3,
    };
  }, [policyId, profile]);

  return result;
}

/**
 * Hook to get full consensus analysis for a policy (V2 only)
 * More expensive than useImpactScore, use for detail views
 *
 * @param policyId - The ID of the policy
 * @returns Full consensus analysis or null if not using V2
 */
export function useConsensusAnalysis(policyId: string): ConsensusAnalysis | null {
  const { profile } = useValues();

  return useMemo(() => {
    if (profile?.scoringModel !== 'v2') return null;
    return analyzePolicy(policyId);
  }, [policyId, profile?.scoringModel]);
}

/**
 * Hook to get top score drivers for a policy (V2 only)
 *
 * @param policyId - The ID of the policy
 * @param topN - Number of top drivers to return (default: 3)
 * @returns Array of top contributing factors
 */
export function useTopScoreDrivers(policyId: string, topN: number = 3) {
  const { profile } = useValues();

  return useMemo(() => {
    if (profile?.scoringModel !== 'v2') return [];
    return getTopScoreDrivers(policyId, profile.v2Weights || null, topN);
  }, [policyId, profile?.scoringModel, profile?.v2Weights, topN]);
}
