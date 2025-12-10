'use client';

import QuestionnaireWidget, { QUESTIONNAIRE_THEMES } from './QuestionnaireWidget';
import { QUESTIONS } from '@/data/values';
import { LikertScale } from '@/types/values';
import { useValues } from '@/contexts/ValuesContext';

export default function ValuesPulse({ onComplete }: { onComplete?: () => void }) {
  const { calculateWeightsFromResponses, saveProfile } = useValues();

  const handleComplete = (responses: Record<string, LikertScale>) => {
    const weights = calculateWeightsFromResponses(responses);
    saveProfile({
      archetypeId: 'custom',
      weights,
      responses,
      scoringModel: 'v1',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
    onComplete?.();
  };

  // Convert V1 questions to the generic format
  const questions = QUESTIONS.map((q) => ({
    id: q.id,
    text: q.text,
    explanation: q.explanation,
  }));

  return (
    <QuestionnaireWidget
      questions={questions}
      theme={QUESTIONNAIRE_THEMES.impact}
      onComplete={handleComplete}
      showHeader={false}
    />
  );
}
