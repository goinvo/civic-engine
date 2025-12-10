'use client';

import QuestionnaireWidget, { QUESTIONNAIRE_THEMES } from '@/components/QuestionnaireWidget';
import { V2_QUESTIONS } from '@/data/questionsV2';
import { LikertScale } from '@/types/values';
import { useValues } from '@/contexts/ValuesContext';

export default function ValuesPulseV2({ onComplete }: { onComplete?: () => void }) {
  const { calculateV2WeightsFromResponses, saveV2Profile } = useValues();

  const handleComplete = (responses: Record<string, LikertScale>) => {
    const weights = calculateV2WeightsFromResponses(responses);
    saveV2Profile({
      v2ArchetypeId: 'custom_v2',
      v2Weights: weights,
      v2Responses: responses,
      v2AutoMapped: false,
    });
    onComplete?.();
  };

  // Convert V2 questions to the generic format
  const questions = V2_QUESTIONS.map((q) => ({
    id: q.id,
    text: q.text,
    explanation: q.explanation,
    lowLabel: q.lowLabel,
    highLabel: q.highLabel,
  }));

  return (
    <QuestionnaireWidget
      questions={questions}
      theme={QUESTIONNAIRE_THEMES.economics}
      onComplete={handleComplete}
      showHeader={true}
    />
  );
}
