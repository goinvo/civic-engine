/**
 * V3 Needs Lens Questionnaire
 *
 * Tier 1: 5 questions mapping to the 5 Maslow-inspired need categories.
 * Tier 2: 10 additional deeper-dive questions (2 per category) for more nuanced assessment.
 * Each question probes the user's priorities for human needs.
 */

import { NeedCategory } from './v3Methodology';

export interface V3Question {
  id: string;
  needCategory: NeedCategory;
  text: string;
  explanation: string;
  lowLabel: string;
  highLabel: string;
  tier: 1 | 2; // 1 = basic, 2 = detailed
}

// Tier 1: Basic questions (5 total - one per need category)
export const V3_QUESTIONS: V3Question[] = [
  {
    id: 'v3_q_physiological',
    needCategory: 'physiological',
    text: 'Government should prioritize ensuring everyone has food, shelter, and healthcare before addressing any other issues.',
    explanation: 'This measures how much you prioritize basic survival needs like food, housing, and health.',
    lowLabel: 'Other priorities first',
    highLabel: 'Survival needs first',
    tier: 1,
  },
  {
    id: 'v3_q_safety',
    needCategory: 'safety',
    text: 'Financial security and protection from crime, job loss, and economic shocks should be the primary goal of public policy.',
    explanation: 'This measures how much you prioritize safety, stability, and security.',
    lowLabel: 'Accept some risk',
    highLabel: 'Maximize security',
    tier: 1,
  },
  {
    id: 'v3_q_community',
    needCategory: 'community',
    text: 'Strengthening families, neighborhoods, and civic organizations is more important than individual economic advancement.',
    explanation: 'This measures how much you value social bonds and community belonging.',
    lowLabel: 'Individual focus',
    highLabel: 'Community focus',
    tier: 1,
  },
  {
    id: 'v3_q_opportunity',
    needCategory: 'opportunity',
    text: 'Policies should focus on creating pathways for people to advance economically and achieve recognition for their efforts.',
    explanation: 'This measures how much you value economic mobility and achievement.',
    lowLabel: 'Stability over mobility',
    highLabel: 'Opportunity to advance',
    tier: 1,
  },
  {
    id: 'v3_q_selfActualization',
    needCategory: 'selfActualization',
    text: 'Once basic needs are met, society should invest heavily in education, arts, creativity, and helping people reach their full potential.',
    explanation: 'This measures how much you value human flourishing and self-actualization.',
    lowLabel: 'Focus on basics',
    highLabel: 'Invest in potential',
    tier: 1,
  },

  // Tier 2: Detailed questions (10 total - two per need category)
  // Physiological - deeper dive
  {
    id: 'v3_q_physiological_2a',
    needCategory: 'physiological',
    text: 'Universal healthcare access is more important than keeping taxes low.',
    explanation: 'This explores the trade-off between guaranteed healthcare and fiscal policy.',
    lowLabel: 'Keep taxes low',
    highLabel: 'Universal healthcare',
    tier: 2,
  },
  {
    id: 'v3_q_physiological_2b',
    needCategory: 'physiological',
    text: 'No one should face homelessness regardless of their personal circumstances or choices.',
    explanation: 'This probes unconditional vs. conditional approaches to meeting basic needs.',
    lowLabel: 'Depends on circumstances',
    highLabel: 'Unconditional housing',
    tier: 2,
  },

  // Safety - deeper dive
  {
    id: 'v3_q_safety_2a',
    needCategory: 'safety',
    text: 'I would accept stricter regulations on businesses if it meant more job security for workers.',
    explanation: 'This explores the trade-off between economic freedom and employment stability.',
    lowLabel: 'Less regulation',
    highLabel: 'More job security',
    tier: 2,
  },
  {
    id: 'v3_q_safety_2b',
    needCategory: 'safety',
    text: 'Predictable, stable policies are better than policies that might produce bigger gains but with more uncertainty.',
    explanation: 'This measures preference for stability vs. potential but risky gains.',
    lowLabel: 'Accept uncertainty for gains',
    highLabel: 'Prefer predictability',
    tier: 2,
  },

  // Community - deeper dive
  {
    id: 'v3_q_community_2a',
    needCategory: 'community',
    text: 'Government should actively support local institutions like community centers, libraries, and neighborhood organizations.',
    explanation: 'This measures support for public investment in community infrastructure.',
    lowLabel: 'Private/voluntary support',
    highLabel: 'Public investment',
    tier: 2,
  },
  {
    id: 'v3_q_community_2b',
    needCategory: 'community',
    text: 'Policies should prioritize keeping families and communities together over individual economic opportunities elsewhere.',
    explanation: 'This explores the tension between community ties and economic mobility.',
    lowLabel: 'Follow opportunity',
    highLabel: 'Preserve community',
    tier: 2,
  },

  // Opportunity - deeper dive
  {
    id: 'v3_q_opportunity_2a',
    needCategory: 'opportunity',
    text: 'Merit and hard work should be the primary determinants of economic success, with minimal redistribution.',
    explanation: 'This measures belief in meritocracy vs. corrective redistribution.',
    lowLabel: 'More redistribution',
    highLabel: 'Merit-based outcomes',
    tier: 2,
  },
  {
    id: 'v3_q_opportunity_2b',
    needCategory: 'opportunity',
    text: 'Society should invest heavily in helping people start businesses and pursue entrepreneurship.',
    explanation: 'This measures support for entrepreneurial opportunity creation.',
    lowLabel: 'Focus on stable employment',
    highLabel: 'Support entrepreneurship',
    tier: 2,
  },

  // Self-actualization - deeper dive
  {
    id: 'v3_q_selfActualization_2a',
    needCategory: 'selfActualization',
    text: 'Public funding for arts, culture, and humanities is just as important as funding for practical job training.',
    explanation: 'This explores the value placed on cultural enrichment vs. vocational focus.',
    lowLabel: 'Prioritize job training',
    highLabel: 'Equal arts funding',
    tier: 2,
  },
  {
    id: 'v3_q_selfActualization_2b',
    needCategory: 'selfActualization',
    text: 'Education should focus on developing well-rounded individuals, not just preparing people for careers.',
    explanation: 'This measures preference for holistic education vs. career preparation.',
    lowLabel: 'Career-focused education',
    highLabel: 'Holistic development',
    tier: 2,
  },
];

// Likert scale labels for V3
export const V3_LIKERT_LABELS = {
  1: 'Strongly Disagree',
  2: 'Disagree',
  3: 'Neutral',
  4: 'Agree',
  5: 'Strongly Agree',
};

// Question ID to need category mapping for quick lookup
export const V3_QUESTION_NEED_MAP: Record<string, NeedCategory> = V3_QUESTIONS.reduce(
  (acc, q) => ({ ...acc, [q.id]: q.needCategory }),
  {} as Record<string, NeedCategory>
);
