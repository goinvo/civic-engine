'use client';

import QuestionnaireWidget, { QUESTIONNAIRE_THEMES } from '@/components/QuestionnaireWidget';
import { V3_QUESTIONS } from '@/data/questionsV3';
import { LikertScale, V3NeedWeights } from '@/types/values';
import { useValues } from '@/contexts/ValuesContext';
import { NeedCategory } from '@/data/v3Methodology';

export default function ValuesPulseV3({ onComplete }: { onComplete?: () => void }) {
  const { saveV3Profile } = useValues();

  // Calculate V3 weights from responses
  // Tier 2 responses add more weight/precision to the base calculation
  const calculateV3WeightsFromResponses = (responses: Record<string, LikertScale>): V3NeedWeights => {
    const baselinePoints = 10;

    const multipliers: Record<LikertScale, number> = {
      1: 0.5,
      2: 0.75,
      3: 1.0,
      4: 1.5,
      5: 2.0,
    };

    // Calculate points for each category
    // Tier 1 questions have full weight, Tier 2 questions contribute additional refinement
    const categoryQuestions: Record<NeedCategory, string[]> = {
      physiological: ['v3_q_physiological', 'v3_q_physiological_2a', 'v3_q_physiological_2b'],
      safety: ['v3_q_safety', 'v3_q_safety_2a', 'v3_q_safety_2b'],
      community: ['v3_q_community', 'v3_q_community_2a', 'v3_q_community_2b'],
      opportunity: ['v3_q_opportunity', 'v3_q_opportunity_2a', 'v3_q_opportunity_2b'],
      selfActualization: ['v3_q_selfActualization', 'v3_q_selfActualization_2a', 'v3_q_selfActualization_2b'],
    };

    const points: Record<NeedCategory, number> = {
      physiological: 0,
      safety: 0,
      community: 0,
      opportunity: 0,
      selfActualization: 0,
    };

    // Calculate weighted points for each category
    for (const [category, questionIds] of Object.entries(categoryQuestions) as [NeedCategory, string[]][]) {
      let totalWeight = 0;
      let weightedSum = 0;

      for (let i = 0; i < questionIds.length; i++) {
        const qId = questionIds[i];
        const response = responses[qId];
        if (response !== undefined) {
          // Tier 1 (index 0) has weight 1.0, Tier 2 questions have weight 0.5 each
          const questionWeight = i === 0 ? 1.0 : 0.5;
          totalWeight += questionWeight;
          weightedSum += multipliers[response] * questionWeight;
        }
      }

      // Default to neutral if no responses
      if (totalWeight === 0) {
        points[category] = baselinePoints;
      } else {
        points[category] = baselinePoints * (weightedSum / totalWeight);
      }
    }

    const total = Object.values(points).reduce((sum, p) => sum + p, 0);
    return {
      physiological: points.physiological / total,
      safety: points.safety / total,
      community: points.community / total,
      opportunity: points.opportunity / total,
      selfActualization: points.selfActualization / total,
    };
  };

  const handleComplete = (responses: Record<string, LikertScale>) => {
    const weights = calculateV3WeightsFromResponses(responses);
    saveV3Profile({
      v3ArchetypeId: 'custom_v3',
      v3NeedWeights: weights,
      v3Responses: responses,
    });
    onComplete?.();
  };

  // Convert V3 questions to the generic format with tier information
  const questions = V3_QUESTIONS.map((q) => ({
    id: q.id,
    text: q.text,
    explanation: q.explanation,
    lowLabel: q.lowLabel,
    highLabel: q.highLabel,
    tier: q.tier,
  }));

  // Check if there are tier 2 questions
  const hasDeeperQuestions = V3_QUESTIONS.some((q) => q.tier === 2);

  return (
    <QuestionnaireWidget
      questions={questions}
      theme={QUESTIONNAIRE_THEMES.needs}
      onComplete={handleComplete}
      showHeader={true}
      hasDeeperQuestions={hasDeeperQuestions}
    />
  );
}
