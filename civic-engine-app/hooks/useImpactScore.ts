import { useMemo } from 'react';
import { useValues } from '@/contexts/ValuesContext';
import {
  calculatePersonalizedScore,
  getBaseImpactScore,
  getScoreDifference,
  getScoreInsight,
} from '@/utils/impactScore';

/**
 * Hook to get personalized impact score for a policy
 *
 * @param policyId - The ID of the policy
 * @returns Object containing personalized score, base score, difference, and insight
 */
export function useImpactScore(policyId: string) {
  const { profile } = useValues();

  const result = useMemo(() => {
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
    };
  }, [policyId, profile]);

  return result;
}
