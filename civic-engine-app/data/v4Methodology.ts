/**
 * V4 Methodology: Unified Policy Scoring Model
 *
 * Combines three lenses into a comprehensive evaluation framework:
 *
 * 1. IMPACT LENS (from V1): Measures magnitude & feasibility
 *    - 7 factors: population, economic, intensity, duration, equity, externalities, implementation
 *
 * 2. ECONOMICS LENS (from V2): Evaluates political economy alignment
 *    - 13 factors grouped into: Mechanics & Structure, Rights & Dynamics, Justice & Distribution
 *
 * 3. NEEDS LENS (from V3): Assesses human needs fulfillment
 *    - 5 Maslow-inspired categories: physiological, safety, community, opportunity, selfActualization
 *
 * SCORING:
 * - Each lens produces a 0-100 score
 * - User weights determine how much each lens contributes to final score
 * - Default: Impact 33%, Economics 33%, Needs 34%
 */

import { ImpactFactor, WeightProfile } from '@/types/values';
import { V2Factor, V2WeightProfile } from '@/types/consensus';
import { NeedCategory, NEED_CATEGORY_DEFINITIONS } from './v3Methodology';

// ============================================
// V4 LENS TYPES
// ============================================

export type V4Lens = 'impact' | 'economics' | 'needs';

// ============================================
// V4 COMBINED WEIGHTS
// ============================================

/**
 * V4 user profile combines weights from all three models
 */
export interface V4WeightProfile {
  // Lens-level weights (how much each lens matters)
  lensWeights: {
    impact: number;     // Weight for V1 Impact Lens (0-1)
    economics: number;  // Weight for V2 Economics Lens (0-1)
    needs: number;      // Weight for V3 Needs Lens (0-1)
  };

  // V1 Impact factor weights (within the Impact lens)
  impactWeights: WeightProfile;

  // V2 Economics factor weights (within the Economics lens)
  economicsWeights: V2WeightProfile;

  // V3 Needs category weights (within the Needs lens)
  needsWeights: Record<NeedCategory, number>;
}

/**
 * Default V4 weights - balanced across all three lenses
 */
export const DEFAULT_V4_WEIGHTS: V4WeightProfile = {
  lensWeights: {
    impact: 0.33,
    economics: 0.33,
    needs: 0.34,
  },
  impactWeights: {
    population: 0.143,
    economic: 0.143,
    intensity: 0.143,
    duration: 0.143,
    equity: 0.143,
    externalities: 0.143,
    implementation: 0.142,
  },
  economicsWeights: {
    hayek: 0.077,
    ostrom: 0.077,
    downs: 0.077,
    olson: 0.077,
    keynes: 0.077,
    pettit: 0.077,
    hirschman: 0.077,
    buchanan: 0.077,
    polanyi: 0.077,
    rawls: 0.077,
    george: 0.077,
    acemoglu: 0.077,
    walzer: 0.076,
  },
  needsWeights: {
    physiological: 0.20,
    safety: 0.20,
    community: 0.20,
    opportunity: 0.20,
    selfActualization: 0.20,
  },
};

// ============================================
// V4 ARCHETYPE DEFINITIONS
// ============================================

export type V4ArchetypeId =
  | 'pragmatist'      // Prioritizes Impact lens (feasibility, reach)
  | 'economist'       // Prioritizes Economics lens (political economy)
  | 'humanist'        // Prioritizes Needs lens (human flourishing)
  | 'balanced'        // Equal weight across all lenses
  | 'custom_v4';      // User-customized weights

export interface V4Archetype {
  id: V4ArchetypeId;
  name: string;
  description: string;
  shortDescription: string;
  weights: V4WeightProfile;
}

export const V4_ARCHETYPES: V4Archetype[] = [
  {
    id: 'pragmatist',
    name: 'The Pragmatist',
    description: 'I focus on what policies can actually achieve - their reach, feasibility, and measurable impact.',
    shortDescription: 'Practical outcomes first',
    weights: {
      lensWeights: { impact: 0.50, economics: 0.25, needs: 0.25 },
      impactWeights: {
        population: 0.20,
        economic: 0.15,
        intensity: 0.10,
        duration: 0.10,
        equity: 0.10,
        externalities: 0.10,
        implementation: 0.25,
      },
      economicsWeights: {
        hayek: 0.10, ostrom: 0.10, downs: 0.08, olson: 0.08, keynes: 0.08,
        pettit: 0.06, hirschman: 0.08, buchanan: 0.10, polanyi: 0.06,
        rawls: 0.06, george: 0.06, acemoglu: 0.08, walzer: 0.06,
      },
      needsWeights: {
        physiological: 0.25, safety: 0.30, community: 0.15, opportunity: 0.20, selfActualization: 0.10,
      },
    },
  },
  {
    id: 'economist',
    name: 'The Economist',
    description: 'I evaluate policies through the lens of political economy - incentives, institutions, and market dynamics.',
    shortDescription: 'Institutional analysis',
    weights: {
      lensWeights: { impact: 0.25, economics: 0.50, needs: 0.25 },
      impactWeights: {
        population: 0.12, economic: 0.20, intensity: 0.12, duration: 0.18,
        equity: 0.12, externalities: 0.18, implementation: 0.08,
      },
      economicsWeights: {
        hayek: 0.09, ostrom: 0.09, downs: 0.08, olson: 0.08, keynes: 0.08,
        pettit: 0.07, hirschman: 0.07, buchanan: 0.08, polanyi: 0.07,
        rawls: 0.07, george: 0.08, acemoglu: 0.09, walzer: 0.05,
      },
      needsWeights: {
        physiological: 0.20, safety: 0.25, community: 0.15, opportunity: 0.25, selfActualization: 0.15,
      },
    },
  },
  {
    id: 'humanist',
    name: 'The Humanist',
    description: 'I prioritize how policies affect human wellbeing and fulfill fundamental human needs.',
    shortDescription: 'Human flourishing',
    weights: {
      lensWeights: { impact: 0.25, economics: 0.25, needs: 0.50 },
      impactWeights: {
        population: 0.10, economic: 0.08, intensity: 0.25, duration: 0.15,
        equity: 0.25, externalities: 0.10, implementation: 0.07,
      },
      economicsWeights: {
        hayek: 0.06, ostrom: 0.08, downs: 0.06, olson: 0.06, keynes: 0.08,
        pettit: 0.10, hirschman: 0.08, buchanan: 0.08, polanyi: 0.12,
        rawls: 0.12, george: 0.06, acemoglu: 0.06, walzer: 0.04,
      },
      needsWeights: {
        physiological: 0.25, safety: 0.25, community: 0.20, opportunity: 0.15, selfActualization: 0.15,
      },
    },
  },
  {
    id: 'balanced',
    name: 'The Balanced',
    description: 'I consider all three lenses equally - impact, economics, and human needs.',
    shortDescription: 'Multi-dimensional balance',
    weights: DEFAULT_V4_WEIGHTS,
  },
];

// ============================================
// V4 QUESTIONNAIRE CATEGORIES
// ============================================

/**
 * V4 question categories map to specific lenses and factors
 */
export type V4QuestionCategory =
  // Impact Lens questions
  | 'impact_reach'          // population, economic
  | 'impact_depth'          // intensity, equity
  | 'impact_horizon'        // duration, externalities
  | 'impact_feasibility'    // implementation
  // Economics Lens questions
  | 'econ_mechanics'        // hayek, ostrom, downs, olson, keynes
  | 'econ_rights'           // pettit, hirschman, buchanan, polanyi
  | 'econ_justice'          // rawls, george, acemoglu, walzer
  // Needs Lens questions
  | 'needs_survival'        // physiological, safety
  | 'needs_belonging'       // community
  | 'needs_growth';         // opportunity, selfActualization

export const V4_QUESTION_CATEGORY_INFO: Record<V4QuestionCategory, {
  name: string;
  description: string;
  lens: V4Lens;
  factors: (ImpactFactor | V2Factor | NeedCategory)[];
}> = {
  // Impact Lens
  impact_reach: {
    name: 'Reach & Scale',
    description: 'How many people and resources are affected',
    lens: 'impact',
    factors: ['population', 'economic'],
  },
  impact_depth: {
    name: 'Depth & Fairness',
    description: 'How deeply and fairly individuals are impacted',
    lens: 'impact',
    factors: ['intensity', 'equity'],
  },
  impact_horizon: {
    name: 'Time & Systems',
    description: 'Long-term effects and unintended consequences',
    lens: 'impact',
    factors: ['duration', 'externalities'],
  },
  impact_feasibility: {
    name: 'Feasibility',
    description: 'Likelihood of successful implementation',
    lens: 'impact',
    factors: ['implementation'],
  },
  // Economics Lens
  econ_mechanics: {
    name: 'Mechanics & Structure',
    description: 'How policy institutions and mechanisms work',
    lens: 'economics',
    factors: ['hayek', 'ostrom', 'downs', 'olson', 'keynes'],
  },
  econ_rights: {
    name: 'Rights & Dynamics',
    description: 'Individual freedom and power dynamics',
    lens: 'economics',
    factors: ['pettit', 'hirschman', 'buchanan', 'polanyi'],
  },
  econ_justice: {
    name: 'Justice & Distribution',
    description: 'How benefits and burdens are distributed',
    lens: 'economics',
    factors: ['rawls', 'george', 'acemoglu', 'walzer'],
  },
  // Needs Lens
  needs_survival: {
    name: 'Survival & Security',
    description: 'Basic needs and safety',
    lens: 'needs',
    factors: ['physiological', 'safety'],
  },
  needs_belonging: {
    name: 'Community & Belonging',
    description: 'Social connection and civic participation',
    lens: 'needs',
    factors: ['community'],
  },
  needs_growth: {
    name: 'Growth & Fulfillment',
    description: 'Opportunity and self-actualization',
    lens: 'needs',
    factors: ['opportunity', 'selfActualization'],
  },
};

// ============================================
// LENS DEFINITIONS
// ============================================

export const V4_LENS_DEFINITIONS: Record<V4Lens, {
  name: string;
  description: string;
  color: string;
  gradient: string;
}> = {
  impact: {
    name: 'Impact Lens',
    description: 'Evaluates the practical magnitude and feasibility of policies',
    color: '#2F3BBD',
    gradient: 'from-[#2F3BBD] to-[#1E2A91]',
  },
  economics: {
    name: 'Economics Lens',
    description: 'Analyzes political economy factors and institutional design',
    color: '#C91A2B',
    gradient: 'from-[#2F3BBD] to-[#C91A2B]',
  },
  needs: {
    name: 'Needs Lens',
    description: 'Assesses impact on human needs and wellbeing',
    color: '#7B2D8E',
    gradient: 'from-[#501159] to-[#7B2D8E]',
  },
};

// ============================================
// SCORING FUNCTIONS
// ============================================

/**
 * Calculate the combined V4 score for a policy
 *
 * @param impactScore - Score from Impact lens (0-100)
 * @param economicsScore - Score from Economics lens (0-100)
 * @param needsScore - Score from Needs lens (0-100)
 * @param weights - User's V4 weight profile
 * @returns Combined score (0-100)
 */
export function calculateV4Score(
  impactScore: number,
  economicsScore: number,
  needsScore: number,
  weights: V4WeightProfile = DEFAULT_V4_WEIGHTS
): number {
  const { impact, economics, needs } = weights.lensWeights;

  return (
    impactScore * impact +
    economicsScore * economics +
    needsScore * needs
  );
}

/**
 * Calculate individual lens scores from raw factor scores
 */
export function calculateImpactLensScore(
  factorScores: Record<ImpactFactor, number>,
  weights: WeightProfile
): number {
  let score = 0;
  for (const [factor, weight] of Object.entries(weights)) {
    score += (factorScores[factor as ImpactFactor] || 0) * weight;
  }
  return score * 100; // Convert to 0-100
}

export function calculateEconomicsLensScore(
  factorScores: Record<V2Factor, number>,
  weights: V2WeightProfile
): number {
  let score = 0;
  for (const [factor, weight] of Object.entries(weights)) {
    score += (factorScores[factor as V2Factor] || 0) * weight;
  }
  return score * 100; // Convert to 0-100
}

export function calculateNeedsLensScore(
  categoryScores: Record<NeedCategory, number>,
  weights: Record<NeedCategory, number>
): number {
  let score = 0;
  for (const [category, weight] of Object.entries(weights)) {
    // V3 scores are 0-10, need to normalize to 0-1
    const normalizedScore = ((categoryScores[category as NeedCategory] || 5) - 0) / 10;
    score += normalizedScore * weight;
  }
  return score * 100; // Convert to 0-100
}

// ============================================
// SCORE INTERPRETATION
// ============================================

export function getV4ScoreLabel(score: number): string {
  if (score >= 80) return 'Strongly Aligned';
  if (score >= 65) return 'Aligned';
  if (score >= 50) return 'Moderately Aligned';
  if (score >= 35) return 'Mixed';
  if (score >= 20) return 'Misaligned';
  return 'Strongly Misaligned';
}

export function getV4ScoreColor(score: number): string {
  if (score >= 80) return 'text-green-600';
  if (score >= 65) return 'text-green-500';
  if (score >= 50) return 'text-yellow-500';
  if (score >= 35) return 'text-orange-500';
  if (score >= 20) return 'text-red-500';
  return 'text-red-600';
}
