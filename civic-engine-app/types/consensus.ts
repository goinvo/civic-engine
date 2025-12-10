// Consensus Scoring Model Types
// V2: 13-Factor Political Economy Framework
// V3: Needs-Based Maslow-Inspired Framework

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
