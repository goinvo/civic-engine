// Consensus Scoring Model Types
// V2: 13-Factor Political Economy Framework
// V3: Needs-Based Maslow-Inspired Framework
// V4: "Most of Us" Collective Consensus Model

import type { ProblemAreaId, ImplementationRating } from './problem-areas';

// ===========================================
// FACTOR DEFINITIONS
// ===========================================

// Group A: Mechanics & Structure (5 factors)
// Group B: Rights & Dynamics (4 factors)
// Group C: Justice & Distribution (4 factors)

export type V2Factor =
  // Group A: Mechanics & Structure
  | 'hayek'      // Info Feasibility - Central Planning vs Decentralized
  | 'ostrom'     // Scale Match - Mismatched vs Polycentric
  | 'downs'      // Legibility - Opaque vs Clear
  | 'olson'      // Anti-Capture - Vulnerable vs Robust
  | 'keynes'     // Stability - Pro-Cyclical vs Counter-Cyclical
  // Group B: Rights & Dynamics
  | 'pettit'     // Non-Domination - Dependent vs Independent
  | 'hirschman'  // Exit/Voice - Trapped vs Agency
  | 'buchanan'   // Consent - Imposed vs Pareto
  | 'polanyi'    // Protection - Commodified vs Buffered
  // Group C: Justice & Distribution
  | 'rawls'      // The Floor - Regressive vs Maximin
  | 'george'     // Rent Target - Penalizes Labor vs Captures Rent
  | 'acemoglu'   // Inclusivity - Extractive vs Inclusive
  | 'walzer';    // Sphere Justice - Corrupt vs Appropriate

export type V2FactorGroup = 'mechanics' | 'rights' | 'justice';

// ===========================================
// SCORE INTERFACES
// ===========================================

// Factor scores for a policy (0.0 - 1.0 each)
export interface V2FactorScores {
  // Group A: Mechanics & Structure
  hayek: number;
  ostrom: number;
  downs: number;
  olson: number;
  keynes: number;
  // Group B: Rights & Dynamics
  pettit: number;
  hirschman: number;
  buchanan: number;
  polanyi: number;
  // Group C: Justice & Distribution
  rawls: number;
  george: number;
  acemoglu: number;
  walzer: number;
}

// Weight profile (weights must sum to 1.0)
export type V2WeightProfile = V2FactorScores;

// ===========================================
// ARCHETYPE DEFINITIONS
// ===========================================

export type V2ArchetypeId =
  | 'classical_liberal'
  | 'social_democrat'
  | 'civic_republican'
  | 'institutionalist'
  | 'custom_v2';

export interface V2Archetype {
  id: V2ArchetypeId;
  name: string;
  description: string;
  philosopher: string;
  philosophyName: string;
  philosophyDescription: string;
  weights: V2WeightProfile;
}

// ===========================================
// POLICY MODIFIERS
// ===========================================

export type ModifierCategory = 'funding' | 'implementation' | 'enforcement' | 'timeline';

export interface PolicyModifier {
  id: string;
  name: string;
  category: ModifierCategory;
  description: string;
  delta: Partial<V2FactorScores>;
}

// ===========================================
// CONSENSUS ANALYSIS
// ===========================================

export type ConsensusState =
  | 'super-consensus'    // All archetypes score high (>70) with low stdDev (<10)
  | 'hidden-agreement'   // High mean (>60) with moderate variance
  | 'battleground'       // High variance (stdDev >= 20), archetypes disagree
  | 'universal-reject'   // All archetypes score low (<40)
  | 'mixed';             // Everything else

export interface DivergenceDriver {
  factor: V2Factor;
  variance: number;
  narrative: string;
}

export interface ConsensusAnalysis {
  scores: Record<V2ArchetypeId, number>;
  consensusState: ConsensusState;
  mean: number;
  stdDev: number;
  drivers: DivergenceDriver[];
}

// ===========================================
// V2 IMPACT SCORE (for policies)
// ===========================================

export interface V2ImpactScore {
  // Mill Layer (Base Utilitarian Magnitude)
  base: {
    population: number;  // 0-1: Reach/scope
    economic: number;    // 0-1: Resource volume
    intensity: number;   // 0-1: Depth per person
  };
  // Political Economy Layer (13 factors)
  factors: V2FactorScores;
  // Explanation
  rationale: string;
  // Link to detailed methodology (if available)
  methodologyId?: string;
}

// ===========================================
// FACTOR METADATA
// ===========================================

export interface V2FactorInfo {
  id: V2Factor;
  name: string;
  thinker: string;
  group: V2FactorGroup;
  lowAnchor: string;
  highAnchor: string;
  description: string;
}

// ===========================================
// V3 NEEDS-BASED SCORING MODEL
// ===========================================

/**
 * V3 Scale Constants
 * All scores use 0-10 where 5 = neutral (no effect)
 * - 0: Extremely harmful
 * - 1-4: Harmful (varying degrees)
 * - 5: No effect / neutral
 * - 6-9: Beneficial (varying degrees)
 * - 10: Extremely beneficial
 */
export const V3_NEUTRAL_SCORE = 5;
export const V3_MIN_SCORE = 0;
export const V3_MAX_SCORE = 10;

/**
 * Maslow-inspired need categories
 */
export type V3NeedCategory =
  | 'physiological'     // Food, water, shelter, healthcare
  | 'safety'            // Security, stability, protection
  | 'community'         // Social belonging, civic participation
  | 'opportunity'       // Employment, education, economic mobility
  | 'selfActualization'; // Arts, cultural programs, personal fulfillment

/**
 * V3 scoring dimensions (0-10, 5 = neutral)
 */
export interface V3Dimensions {
  populationAffected: number;    // 0-10: Who is affected? (5 = no one, 10 = everyone)
  essentialToSurvival: number;   // 0-10: How critical? (5 = irrelevant, 10 = life-or-death)
  timeToOutcome: number;         // 0-10: How fast? (5 = never, 10 = immediate)
  feasibility: number;           // 0-10: How achievable? (5 = impossible, 10 = easy)
}

/**
 * Score for a single need category (0-10, 5 = neutral)
 */
export interface V3NeedCategoryScore {
  score: number;       // 0-10: How does this policy affect this need? (5 = neutral)
  reasoning: string;   // Explanation
}

/**
 * V3 Impact Score for a policy
 */
export interface V3ImpactScore {
  // Which need categories does this policy address?
  needCategories: Partial<Record<V3NeedCategory, V3NeedCategoryScore>>;
  // The four core scoring dimensions
  dimensions: V3Dimensions;
  // Optional explanation
  rationale?: string;
  // Link to detailed methodology (if available)
  methodologyId?: string;
}

/**
 * Default weights for V3 need categories
 * Safety is weighted highest as per requirements
 */
export const V3_DEFAULT_NEED_WEIGHTS: Record<V3NeedCategory, number> = {
  physiological: 0.25,
  safety: 0.30,        // Highest weight
  community: 0.15,
  opportunity: 0.20,
  selfActualization: 0.10,
};

/**
 * V3 Archetype (optional: allows custom need weightings)
 */
export interface V3Archetype {
  id: string;
  name: string;
  description: string;
  needWeights: Record<V3NeedCategory, number>;
  dimensionWeights?: Partial<Record<keyof V3Dimensions, number>>;
}

// ===========================================
// "MOST OF US" COLLECTIVE CONSENSUS MODEL
// ===========================================

/**
 * This section defines data structures for the "Most of Us" experience:
 * - MIRROR: Show users that Americans agree on more than they think
 * - MEGAPHONE: Amplify consensus to create pressure for change
 */

/**
 * Breakdown of ratings for a single implementation approach
 */
export interface ApproachConsensusData {
  approachId: string;
  problemAreaId: ProblemAreaId;

  /** Total number of participants who rated this approach */
  totalParticipants: number;

  /** Rating distribution (percentage, sums to 100) */
  distribution: {
    stronglySupport: number;
    support: number;
    neutral: number;
    oppose: number;
    stronglyOppose: number;
  };

  /** Derived metrics */
  supportPercent: number;
  opposePercent: number;
  consensusLevel: 'strong' | 'moderate' | 'divided';

  /** Cross-partisan breakdown */
  byParty?: {
    democrat: { support: number; oppose: number };
    republican: { support: number; oppose: number };
    independent: { support: number; oppose: number };
  };

  /** Demographic breakdowns */
  byAge?: {
    '18-29': { support: number; oppose: number };
    '30-44': { support: number; oppose: number };
    '45-64': { support: number; oppose: number };
    '65+': { support: number; oppose: number };
  };

  byRegion?: {
    northeast: { support: number; oppose: number };
    midwest: { support: number; oppose: number };
    south: { support: number; oppose: number };
    west: { support: number; oppose: number };
  };
}

/**
 * Consensus summary for a problem area
 */
export interface ProblemAreaConsensusData {
  problemAreaId: ProblemAreaId;
  totalParticipants: number;

  /** Approaches ranked by support level */
  approachesBySupport: {
    approachId: string;
    title: string;
    supportPercent: number;
    consensusLevel: 'strong' | 'moderate' | 'divided';
  }[];

  /** Key consensus findings - things "most of us" agree on */
  consensusFindings: string[];

  /** Areas of genuine disagreement */
  divisionPoints: string[];
}

/**
 * National-level aggregate statistics
 */
export interface NationalConsensusData {
  totalParticipants: number;
  totalRatings: number;
  statesRepresented: number;
  averageConsensusPercent: number;
  lastUpdated: string;

  byProblemArea: Record<ProblemAreaId, ProblemAreaConsensusData>;

  /** Top consensus items across all areas */
  topConsensusItems: {
    approachId: string;
    problemAreaId: ProblemAreaId;
    title: string;
    supportPercent: number;
    description: string;
  }[];
}

/**
 * A mandate item - something "most of us" agree on
 */
export interface MandateItem {
  id: string;
  problemAreaId: ProblemAreaId;
  title: string;
  description: string;
  supportPercent: number;
  participantCount: number;

  bipartisanSupport: {
    democrat: number;
    republican: number;
    independent: number;
  };

  isConsensus: boolean;
  policyReference?: string;
}

/**
 * The American Mandate - aggregate document of consensus positions
 */
export interface AmericanMandate {
  generatedAt: string;
  participantCount: number;
  statesRepresented: number;
  consensusThreshold: number;

  consensusItems: MandateItem[];
  bipartisanItems: MandateItem[];

  summary: {
    totalIssuesExplored: number;
    issuesWithConsensus: number;
    averageBipartisanAgreement: number;
  };
}

/**
 * How a user's ratings compare to the collective
 */
export interface UserConsensusAlignment {
  alignmentPercent: number;

  alignedWith: {
    approachId: string;
    title: string;
    userRating: ImplementationRating;
    consensusPercent: number;
  }[];

  differsFrom: {
    approachId: string;
    title: string;
    userRating: ImplementationRating;
    consensusPercent: number;
    consensusDirection: 'support' | 'oppose';
  }[];

  summary: string;
}

/**
 * Civic identity archetype
 */
export interface CivicIdentity {
  id: string;
  name: string;
  tagline: string;
  description: string;
  characteristics: string[];
  priorities: string[];
  color: string;
  icon: string;
}

/**
 * User's assigned civic identity
 */
export interface UserCivicIdentity {
  identity: CivicIdentity;
  matchStrength: number;
  secondaryIdentity?: CivicIdentity;
}

// ===========================================
// CONSTANTS
// ===========================================

export const CONSENSUS_THRESHOLDS = {
  CONSENSUS: 60,
  STRONG_CONSENSUS: 70,
  DIVIDED: 45,
} as const;

export const CIVIC_IDENTITIES: CivicIdentity[] = [
  {
    id: 'pragmatic-reformer',
    name: 'Pragmatic Reformer',
    tagline: 'You believe in practical solutions that work for everyone',
    description:
      'You prioritize approaches that are tested, achievable, and can build broad coalitions. You value evidence over ideology.',
    characteristics: ['Evidence-driven', 'Coalition-builder', 'Results-focused', 'Politically realistic'],
    priorities: ['What works', 'Broad support', 'Measurable outcomes'],
    color: '#3B82F6',
    icon: 'Compass',
  },
  {
    id: 'community-builder',
    name: 'Community Builder',
    tagline: 'You believe strong communities are the foundation of a good society',
    description:
      'You prioritize local solutions, community empowerment, and approaches that strengthen social bonds.',
    characteristics: ['Locally-focused', 'Relationship-driven', 'Trust-builder', 'Grassroots advocate'],
    priorities: ['Local control', 'Community bonds', 'Mutual aid'],
    color: '#10B981',
    icon: 'Users',
  },
  {
    id: 'systems-thinker',
    name: 'Systems Thinker',
    tagline: 'You see the big picture and want structural change',
    description:
      "You understand that many problems are interconnected and require systemic solutions. You're willing to support bold changes.",
    characteristics: ['Big-picture oriented', 'Root-cause focused', 'Long-term thinker', 'Structurally aware'],
    priorities: ['Systemic change', 'Root causes', 'Long-term impact'],
    color: '#8B5CF6',
    icon: 'Network',
  },
  {
    id: 'liberty-guardian',
    name: 'Liberty Guardian',
    tagline: 'You believe in maximizing freedom and limiting government overreach',
    description:
      'You prioritize individual choice, market solutions, and limiting government intervention.',
    characteristics: ['Freedom-focused', 'Market-trusting', 'Limited government', 'Individual rights'],
    priorities: ['Personal freedom', 'Market solutions', 'Limited intervention'],
    color: '#F59E0B',
    icon: 'Shield',
  },
  {
    id: 'equity-champion',
    name: 'Equity Champion',
    tagline: 'You believe everyone deserves a fair shot',
    description:
      'You prioritize approaches that level the playing field and ensure everyone has access to opportunity.',
    characteristics: ['Fairness-focused', 'Opportunity-driven', 'Gap-closer', 'Justice-oriented'],
    priorities: ['Equal opportunity', 'Closing gaps', 'Universal access'],
    color: '#EC4899',
    icon: 'Scale',
  },
  {
    id: 'fiscal-realist',
    name: 'Fiscal Realist',
    tagline: 'You believe we must live within our means',
    description:
      'You prioritize fiscal responsibility, cost-effectiveness, and sustainable solutions.',
    characteristics: ['Cost-conscious', 'Sustainability-focused', 'Debt-aware', 'Efficiency-driven'],
    priorities: ['Fiscal responsibility', 'Cost-effectiveness', 'Sustainability'],
    color: '#6366F1',
    icon: 'Calculator',
  },
];
