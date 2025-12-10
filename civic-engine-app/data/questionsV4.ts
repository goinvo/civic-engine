/**
 * V4 Unified Questionnaire
 *
 * Combines questions from all three lenses into a tiered structure:
 *
 * Tier 1 (Quick - 10 questions):
 *   - 3 Impact lens questions (reach, depth, feasibility)
 *   - 3 Economics lens questions (one per group)
 *   - 3 Needs lens questions (survival, belonging, growth)
 *   - 1 Meta question (lens preference)
 *
 * Tier 2 (Detailed - 15 additional questions):
 *   - 5 deeper Impact questions
 *   - 5 deeper Economics questions
 *   - 5 deeper Needs questions
 */

import { V4Lens, V4QuestionCategory } from './v4Methodology';

export interface V4Question {
  id: string;
  lens: V4Lens;
  category: V4QuestionCategory;
  text: string;
  explanation: string;
  lowLabel: string;
  highLabel: string;
  tier: 1 | 2;
  // Which specific factors this question informs
  factors: string[];
}

// ============================================
// TIER 1: QUICK ASSESSMENT (10 questions)
// ============================================

export const V4_QUESTIONS: V4Question[] = [
  // === IMPACT LENS (3 Tier 1 questions) ===
  {
    id: 'v4_impact_reach',
    lens: 'impact',
    category: 'impact_reach',
    text: 'I prefer policies that affect a large number of people, even if the impact per person is smaller.',
    explanation: 'This measures whether you prioritize breadth of reach vs. depth of impact.',
    lowLabel: 'Depth over breadth',
    highLabel: 'Breadth over depth',
    tier: 1,
    factors: ['population', 'economic'],
  },
  {
    id: 'v4_impact_depth',
    lens: 'impact',
    category: 'impact_depth',
    text: 'Policies addressing life-or-death issues should always come before policies about convenience or quality of life.',
    explanation: 'This measures how much you prioritize severity and urgency of impact.',
    lowLabel: 'All improvements matter',
    highLabel: 'Survival needs first',
    tier: 1,
    factors: ['intensity', 'equity'],
  },
  {
    id: 'v4_impact_feasibility',
    lens: 'impact',
    category: 'impact_feasibility',
    text: 'I would rather support a modest policy that will definitely pass than an ideal policy that might fail.',
    explanation: 'This measures how much you value implementation feasibility.',
    lowLabel: 'Aim high, risk failure',
    highLabel: 'Guaranteed results',
    tier: 1,
    factors: ['implementation'],
  },

  // === ECONOMICS LENS (3 Tier 1 questions) ===
  {
    id: 'v4_econ_mechanics',
    lens: 'economics',
    category: 'econ_mechanics',
    text: 'Complex policy decisions are better handled by experts and central agencies than by local communities and markets.',
    explanation: 'This measures your view on centralized vs. decentralized governance.',
    lowLabel: 'Trust central expertise',
    highLabel: 'Trust local knowledge',
    tier: 1,
    factors: ['hayek', 'ostrom', 'downs'],
  },
  {
    id: 'v4_econ_rights',
    lens: 'economics',
    category: 'econ_rights',
    text: 'People should have the freedom to exit or opt out of government programs they dislike, not just vote for change.',
    explanation: 'This measures whether you value exit options alongside voice mechanisms.',
    lowLabel: 'Voice through voting',
    highLabel: 'Exit and alternatives',
    tier: 1,
    factors: ['pettit', 'hirschman', 'buchanan'],
  },
  {
    id: 'v4_econ_justice',
    lens: 'economics',
    category: 'econ_justice',
    text: 'Economic growth is only valuable if the benefits reach the people who are worst off.',
    explanation: 'This measures how much you prioritize distributional justice.',
    lowLabel: 'Growth benefits all eventually',
    highLabel: 'Prioritize the worst-off',
    tier: 1,
    factors: ['rawls', 'george', 'acemoglu'],
  },

  // === NEEDS LENS (3 Tier 1 questions) ===
  {
    id: 'v4_needs_survival',
    lens: 'needs',
    category: 'needs_survival',
    text: 'Government should guarantee everyone has food, shelter, and healthcare before pursuing any other goals.',
    explanation: 'This measures how much you prioritize basic survival needs.',
    lowLabel: 'Balance all priorities',
    highLabel: 'Basics first always',
    tier: 1,
    factors: ['physiological', 'safety'],
  },
  {
    id: 'v4_needs_belonging',
    lens: 'needs',
    category: 'needs_belonging',
    text: 'Strengthening families, neighborhoods, and communities is more important than individual economic advancement.',
    explanation: 'This measures how much you value social bonds and community.',
    lowLabel: 'Individual advancement',
    highLabel: 'Community strength',
    tier: 1,
    factors: ['community'],
  },
  {
    id: 'v4_needs_growth',
    lens: 'needs',
    category: 'needs_growth',
    text: 'Society should invest in education, arts, and human potential even if it means fewer resources for safety nets and basic security programs.',
    explanation: 'This measures how much you value human flourishing vs. maintaining robust basic protections.',
    lowLabel: 'Protect the safety net',
    highLabel: 'Invest in potential',
    tier: 1,
    factors: ['opportunity', 'selfActualization'],
  },

  // === META QUESTION (1 Tier 1 question) ===
  {
    id: 'v4_meta_lens',
    lens: 'impact', // Meta question, affects lens weights
    category: 'impact_reach', // Placeholder category
    text: 'Understanding how a policy affects institutions and incentives is more important than measuring its direct impact on people.',
    explanation: 'This measures whether you prioritize systemic/institutional analysis vs. direct human outcomes.',
    lowLabel: 'Direct impact matters more',
    highLabel: 'Systemic effects matter more',
    tier: 1,
    factors: [], // Special: affects lens weights, not individual factors
  },

  // ============================================
  // TIER 2: DETAILED ASSESSMENT (15 questions)
  // ============================================

  // === IMPACT LENS TIER 2 (5 questions) ===
  {
    id: 'v4_impact_economic',
    lens: 'impact',
    category: 'impact_reach',
    text: 'Policies that move significant amounts of money or resources should be prioritized over those that don\'t.',
    explanation: 'This measures how much you value economic scale in policy evaluation.',
    lowLabel: 'Impact > money',
    highLabel: 'Resources matter most',
    tier: 2,
    factors: ['economic'],
  },
  {
    id: 'v4_impact_equity',
    lens: 'impact',
    category: 'impact_depth',
    text: 'A policy is failing if it benefits the wealthy but leaves the poor behind, even if it grows the overall economy.',
    explanation: 'This measures how much you prioritize distributional equity.',
    lowLabel: 'Growth helps everyone',
    highLabel: 'Distribution matters',
    tier: 2,
    factors: ['equity'],
  },
  {
    id: 'v4_impact_duration',
    lens: 'impact',
    category: 'impact_horizon',
    text: 'I am willing to accept short-term pain if it solves a problem permanently for future generations.',
    explanation: 'This measures your time horizon preference.',
    lowLabel: 'Immediate relief',
    highLabel: 'Long-term solutions',
    tier: 2,
    factors: ['duration'],
  },
  {
    id: 'v4_impact_externalities',
    lens: 'impact',
    category: 'impact_horizon',
    text: 'I worry most about the unintended side effects that come from new policies.',
    explanation: 'This measures your concern for systemic ripple effects.',
    lowLabel: 'Side effects are manageable',
    highLabel: 'Unintended consequences matter',
    tier: 2,
    factors: ['externalities'],
  },
  {
    id: 'v4_impact_intensity',
    lens: 'impact',
    category: 'impact_depth',
    text: 'A policy that transforms a few lives completely is better than one that mildly improves many lives.',
    explanation: 'This measures whether you value depth of individual impact.',
    lowLabel: 'Help many a little',
    highLabel: 'Transform a few greatly',
    tier: 2,
    factors: ['intensity'],
  },

  // === ECONOMICS LENS TIER 2 (5 questions) ===
  {
    id: 'v4_econ_hayek',
    lens: 'economics',
    category: 'econ_mechanics',
    text: 'Markets and local actors generally coordinate better than government agencies for complex problems.',
    explanation: 'This measures your view on decentralized vs. centralized knowledge.',
    lowLabel: 'Trust central planning',
    highLabel: 'Trust distributed knowledge',
    tier: 2,
    factors: ['hayek'],
  },
  {
    id: 'v4_econ_olson',
    lens: 'economics',
    category: 'econ_mechanics',
    text: 'Special interest groups like industry lobbies corrupt policy-making and should be resisted.',
    explanation: 'This measures your concern about policy capture by concentrated interests.',
    lowLabel: 'Lobbying is natural',
    highLabel: 'Resist capture',
    tier: 2,
    factors: ['olson'],
  },
  {
    id: 'v4_econ_pettit',
    lens: 'economics',
    category: 'econ_rights',
    text: 'People should not have to depend heavily on any single employer, landlord, or institution.',
    explanation: 'This measures how much you value freedom from arbitrary power.',
    lowLabel: 'Dependence is acceptable',
    highLabel: 'Ensure independence',
    tier: 2,
    factors: ['pettit'],
  },
  {
    id: 'v4_econ_polanyi',
    lens: 'economics',
    category: 'econ_rights',
    text: 'Healthcare, housing, and basic food should be protected from pure market pricing.',
    explanation: 'This measures whether you want to buffer essential needs from market logic.',
    lowLabel: 'Market pricing is fine',
    highLabel: 'Protect essentials',
    tier: 2,
    factors: ['polanyi'],
  },
  {
    id: 'v4_econ_walzer',
    lens: 'economics',
    category: 'econ_justice',
    text: 'Wealthy people should not be able to buy better healthcare, education, or legal representation.',
    explanation: 'This measures whether money should determine access to essential goods.',
    lowLabel: 'Money buys access',
    highLabel: 'Separate spheres of justice',
    tier: 2,
    factors: ['walzer'],
  },

  // === NEEDS LENS TIER 2 (5 questions) ===
  {
    id: 'v4_needs_physiological',
    lens: 'needs',
    category: 'needs_survival',
    text: 'Universal healthcare access is more important than keeping taxes low.',
    explanation: 'This explores the trade-off between guaranteed healthcare and fiscal policy.',
    lowLabel: 'Keep taxes low',
    highLabel: 'Universal healthcare',
    tier: 2,
    factors: ['physiological'],
  },
  {
    id: 'v4_needs_safety',
    lens: 'needs',
    category: 'needs_survival',
    text: 'I would accept stricter regulations if it meant more job security and financial stability.',
    explanation: 'This measures preference for security vs. economic freedom.',
    lowLabel: 'Less regulation',
    highLabel: 'More security',
    tier: 2,
    factors: ['safety'],
  },
  {
    id: 'v4_needs_community_2',
    lens: 'needs',
    category: 'needs_belonging',
    text: 'Government should actively invest in community centers, libraries, and neighborhood organizations.',
    explanation: 'This measures support for public investment in community infrastructure.',
    lowLabel: 'Private support only',
    highLabel: 'Public investment',
    tier: 2,
    factors: ['community'],
  },
  {
    id: 'v4_needs_opportunity',
    lens: 'needs',
    category: 'needs_growth',
    text: 'Society should invest heavily in helping people start businesses and pursue entrepreneurship.',
    explanation: 'This measures support for opportunity and economic mobility.',
    lowLabel: 'Focus on stable jobs',
    highLabel: 'Support entrepreneurship',
    tier: 2,
    factors: ['opportunity'],
  },
  {
    id: 'v4_needs_selfactualization',
    lens: 'needs',
    category: 'needs_growth',
    text: 'Public funding for arts, culture, and humanities is just as important as practical job training.',
    explanation: 'This measures the value placed on self-actualization and cultural enrichment.',
    lowLabel: 'Prioritize job training',
    highLabel: 'Equal arts funding',
    tier: 2,
    factors: ['selfActualization'],
  },
];

// ============================================
// HELPER FUNCTIONS
// ============================================

export const V4_TIER1_QUESTIONS = V4_QUESTIONS.filter(q => q.tier === 1);
export const V4_TIER2_QUESTIONS = V4_QUESTIONS.filter(q => q.tier === 2);

export const V4_QUESTIONS_BY_LENS: Record<V4Lens, V4Question[]> = {
  impact: V4_QUESTIONS.filter(q => q.lens === 'impact' && q.id !== 'v4_meta_lens'),
  economics: V4_QUESTIONS.filter(q => q.lens === 'economics'),
  needs: V4_QUESTIONS.filter(q => q.lens === 'needs'),
};

// Likert scale labels
export const V4_LIKERT_LABELS = {
  1: 'Strongly Disagree',
  2: 'Disagree',
  3: 'Neutral',
  4: 'Agree',
  5: 'Strongly Agree',
};
