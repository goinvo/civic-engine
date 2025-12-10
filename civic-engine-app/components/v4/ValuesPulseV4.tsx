'use client';

import QuestionnaireWidget, { QUESTIONNAIRE_THEMES, QuestionnaireTheme } from '@/components/QuestionnaireWidget';
import { V4_QUESTIONS } from '@/data/questionsV4';
import { LikertScale, V4WeightProfile } from '@/types/values';
import { useValues } from '@/contexts/ValuesContext';
import { DEFAULT_V4_WEIGHTS, V4Lens } from '@/data/v4Methodology';
import { NeedCategory } from '@/data/v3Methodology';
import { V2Factor } from '@/types/consensus';
import { ImpactFactor } from '@/types/values';

// Custom theme for V4 (unified gradient)
const V4_THEME: QuestionnaireTheme = {
  name: 'Unified Lens',
  accentColor: 'bg-gradient-to-r from-[#2F3BBD] via-[#7B2D8E] to-[#C91A2B]',
  accentGradient: 'bg-gradient-to-r from-[#2F3BBD] via-[#7B2D8E] to-[#C91A2B]',
  progressBarColor: 'bg-gradient-to-r from-[#2F3BBD] via-[#7B2D8E] to-[#C91A2B]',
};

export default function ValuesPulseV4({ onComplete }: { onComplete?: () => void }) {
  const { saveV4Profile } = useValues();

  // Calculate V4 weights from responses
  const calculateV4WeightsFromResponses = (responses: Record<string, LikertScale>): V4WeightProfile => {
    const baselinePoints = 10;

    const multipliers: Record<LikertScale, number> = {
      1: 0.5,
      2: 0.75,
      3: 1.0,
      4: 1.5,
      5: 2.0,
    };

    // Start with default weights
    const weights: V4WeightProfile = JSON.parse(JSON.stringify(DEFAULT_V4_WEIGHTS));

    // Process meta question for lens weights
    const metaResponse = responses['v4_meta_lens'];
    if (metaResponse) {
      // 1 = practical outcomes (impact), 5 = human wellbeing (needs)
      // Middle = economics
      if (metaResponse <= 2) {
        weights.lensWeights = { impact: 0.45, economics: 0.30, needs: 0.25 };
      } else if (metaResponse >= 4) {
        weights.lensWeights = { impact: 0.25, economics: 0.30, needs: 0.45 };
      } else {
        weights.lensWeights = { impact: 0.30, economics: 0.40, needs: 0.30 };
      }
    }

    // Calculate Impact lens weights
    const impactFactorPoints: Record<ImpactFactor, number> = {
      population: baselinePoints,
      economic: baselinePoints,
      intensity: baselinePoints,
      duration: baselinePoints,
      equity: baselinePoints,
      externalities: baselinePoints,
      implementation: baselinePoints,
    };

    // Map V4 questions to impact factors
    const impactQuestionMapping: Record<string, ImpactFactor[]> = {
      'v4_impact_reach': ['population', 'economic'],
      'v4_impact_depth': ['intensity', 'equity'],
      'v4_impact_feasibility': ['implementation'],
      'v4_impact_economic': ['economic'],
      'v4_impact_equity': ['equity'],
      'v4_impact_duration': ['duration'],
      'v4_impact_externalities': ['externalities'],
      'v4_impact_intensity': ['intensity'],
    };

    for (const [qId, factors] of Object.entries(impactQuestionMapping)) {
      const response = responses[qId];
      if (response) {
        for (const factor of factors) {
          impactFactorPoints[factor] *= multipliers[response];
        }
      }
    }

    // Normalize impact weights
    const impactTotal = Object.values(impactFactorPoints).reduce((sum, p) => sum + p, 0);
    weights.impactWeights = {
      population: impactFactorPoints.population / impactTotal,
      economic: impactFactorPoints.economic / impactTotal,
      intensity: impactFactorPoints.intensity / impactTotal,
      duration: impactFactorPoints.duration / impactTotal,
      equity: impactFactorPoints.equity / impactTotal,
      externalities: impactFactorPoints.externalities / impactTotal,
      implementation: impactFactorPoints.implementation / impactTotal,
    };

    // Calculate Economics lens weights
    const econFactorPoints: Record<V2Factor, number> = {
      hayek: baselinePoints,
      ostrom: baselinePoints,
      downs: baselinePoints,
      olson: baselinePoints,
      keynes: baselinePoints,
      pettit: baselinePoints,
      hirschman: baselinePoints,
      buchanan: baselinePoints,
      polanyi: baselinePoints,
      rawls: baselinePoints,
      george: baselinePoints,
      acemoglu: baselinePoints,
      walzer: baselinePoints,
    };

    // Map V4 questions to economics factors
    const econQuestionMapping: Record<string, V2Factor[]> = {
      'v4_econ_mechanics': ['hayek', 'ostrom', 'downs'],
      'v4_econ_rights': ['pettit', 'hirschman', 'buchanan'],
      'v4_econ_justice': ['rawls', 'george', 'acemoglu'],
      'v4_econ_hayek': ['hayek'],
      'v4_econ_olson': ['olson'],
      'v4_econ_pettit': ['pettit'],
      'v4_econ_polanyi': ['polanyi'],
      'v4_econ_walzer': ['walzer'],
    };

    for (const [qId, factors] of Object.entries(econQuestionMapping)) {
      const response = responses[qId];
      if (response) {
        for (const factor of factors) {
          econFactorPoints[factor] *= multipliers[response];
        }
      }
    }

    // Normalize economics weights
    const econTotal = Object.values(econFactorPoints).reduce((sum, p) => sum + p, 0);
    weights.economicsWeights = {
      hayek: econFactorPoints.hayek / econTotal,
      ostrom: econFactorPoints.ostrom / econTotal,
      downs: econFactorPoints.downs / econTotal,
      olson: econFactorPoints.olson / econTotal,
      keynes: econFactorPoints.keynes / econTotal,
      pettit: econFactorPoints.pettit / econTotal,
      hirschman: econFactorPoints.hirschman / econTotal,
      buchanan: econFactorPoints.buchanan / econTotal,
      polanyi: econFactorPoints.polanyi / econTotal,
      rawls: econFactorPoints.rawls / econTotal,
      george: econFactorPoints.george / econTotal,
      acemoglu: econFactorPoints.acemoglu / econTotal,
      walzer: econFactorPoints.walzer / econTotal,
    };

    // Calculate Needs lens weights
    const needPoints: Record<NeedCategory, number> = {
      physiological: baselinePoints,
      safety: baselinePoints,
      community: baselinePoints,
      opportunity: baselinePoints,
      selfActualization: baselinePoints,
    };

    // Map V4 questions to need categories
    const needsQuestionMapping: Record<string, NeedCategory[]> = {
      'v4_needs_survival': ['physiological', 'safety'],
      'v4_needs_belonging': ['community'],
      'v4_needs_growth': ['opportunity', 'selfActualization'],
      'v4_needs_physiological': ['physiological'],
      'v4_needs_safety': ['safety'],
      'v4_needs_community_2': ['community'],
      'v4_needs_opportunity': ['opportunity'],
      'v4_needs_selfactualization': ['selfActualization'],
    };

    for (const [qId, categories] of Object.entries(needsQuestionMapping)) {
      const response = responses[qId];
      if (response) {
        for (const category of categories) {
          needPoints[category] *= multipliers[response];
        }
      }
    }

    // Normalize needs weights
    const needsTotal = Object.values(needPoints).reduce((sum, p) => sum + p, 0);
    weights.needsWeights = {
      physiological: needPoints.physiological / needsTotal,
      safety: needPoints.safety / needsTotal,
      community: needPoints.community / needsTotal,
      opportunity: needPoints.opportunity / needsTotal,
      selfActualization: needPoints.selfActualization / needsTotal,
    };

    return weights;
  };

  const handleComplete = (responses: Record<string, LikertScale>) => {
    const weights = calculateV4WeightsFromResponses(responses);
    saveV4Profile({
      v4ArchetypeId: 'custom_v4',
      v4Weights: weights,
      v4Responses: responses,
    });
    onComplete?.();
  };

  // Convert V4 questions to the generic format with tier information
  const questions = V4_QUESTIONS.map((q) => ({
    id: q.id,
    text: q.text,
    explanation: q.explanation,
    lowLabel: q.lowLabel,
    highLabel: q.highLabel,
    tier: q.tier,
  }));

  // Check if there are tier 2 questions
  const hasDeeperQuestions = V4_QUESTIONS.some((q) => q.tier === 2);

  return (
    <QuestionnaireWidget
      questions={questions}
      theme={V4_THEME}
      onComplete={handleComplete}
      showHeader={true}
      hasDeeperQuestions={hasDeeperQuestions}
    />
  );
}
