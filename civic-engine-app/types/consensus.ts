// V2 Consensus Scoring Model Types
// 13-Factor Political Economy Framework

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
