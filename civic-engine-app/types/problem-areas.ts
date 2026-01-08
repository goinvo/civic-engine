/**
 * Problem Areas + Implementation Approaches Data Model
 *
 * This replaces the policy-focused system with a problem-first architecture
 * where users explore different implementation approaches for each problem area.
 */

// ============================================
// CORE ID TYPES
// ============================================

export type ProblemAreaId =
  | 'healthcare-costs'
  | 'housing-affordability'
  | 'childcare-family'
  | 'democratic-reform'
  | 'economic-opportunity'
  | 'education-quality';

export type ImplementationRating = -2 | -1 | 0 | 1 | 2;
// -2: Strongly Oppose
// -1: Oppose
//  0: Neutral
// +1: Support
// +2: Strongly Support

export type PriorityRank = 1 | 2 | 3 | 4 | 5 | 6;

// ============================================
// VOICE/PERSONA TYPE
// ============================================

/**
 * A voice representing a perspective on an implementation approach.
 * Personas ground the debate in real stakeholder viewpoints.
 */
export interface Voice {
  /** Persona identifier, e.g., "Small Business Owner (Tom, 42)" */
  persona: string;
  /** The core argument this persona would make */
  argument: string;
  /** Optional context about why this persona holds this view */
  background?: string;
}

// ============================================
// TRADEOFFS TYPE
// ============================================

export interface Tradeoffs {
  /** Positive outcomes / advantages of this approach */
  benefits: string[];
  /** Negative outcomes / disadvantages / risks of this approach */
  costs: string[];
}

// ============================================
// IMPLEMENTATION APPROACH TYPE
// ============================================

export interface ImplementationApproach {
  /** Unique ID, e.g., "healthcare-single-payer" */
  id: string;
  /** Parent problem area ID */
  problemAreaId: ProblemAreaId;
  /** Short title, e.g., "Single-Payer / Medicare for All" */
  title: string;
  /** 1-2 sentence overview */
  summary: string;
  /** How it works - the policy mechanism (multi-line) */
  mechanism: string;

  /** Benefits and costs of this approach */
  tradeoffs: Tradeoffs;

  /** Legislation/program reference, e.g., "Medicare for All Act (Sanders/Jayapal)" */
  source: string;

  /** Personas who support this approach (3-6) */
  voices_support: Voice[];
  /** Personas who oppose this approach (3-6) */
  voices_opposition: Voice[];

  /** Key research findings or data points */
  evidence: string[];
  /** Organizations that support this approach */
  endorsing_orgs?: string[];
  /** Organizations that oppose this approach */
  opposing_orgs?: string[];

  /** Display order within problem area (1-5) */
  order: number;
  /** Optional Lucide icon name */
  icon?: string;
}

// ============================================
// PROBLEM AREA TYPE
// ============================================

export interface ProblemArea {
  /** Unique ID */
  id: ProblemAreaId;
  /** Full title, e.g., "Healthcare Costs" */
  title: string;
  /** Short title for navigation, e.g., "Healthcare" */
  shortTitle: string;
  /** Problem statement (2-3 sentences) */
  description: string;
  /** Lucide icon name */
  icon: string;
  /** Theme color (hex) */
  color: string;

  /** The core question this problem area addresses */
  coreQuestion: string;

  /** Where Americans agree on this issue */
  consensus: string;
  /** Where Americans disagree on this issue */
  disagreement: string;

  /** Number of implementation approaches (for display) */
  approachCount: number;
  /** Display order (1-6) */
  order: number;
}

// ============================================
// USER PREFERENCES TYPE
// ============================================

/**
 * User's preferences for problem areas and implementation approaches.
 * Stored in localStorage.
 */
export interface UserPreferences {
  /** Problem area priorities - map of problemAreaId -> rank (1 = highest) */
  problemAreaPriorities: Partial<Record<ProblemAreaId, PriorityRank>>;

  /** Implementation ratings - map of approachId -> rating (-2 to +2) */
  implementationRatings: Record<string, ImplementationRating>;

  /** Selected problem area IDs (the 3-5 they chose to explore) */
  selectedProblemIds: ProblemAreaId[];

  /** Optional location for geo analysis */
  zipCode?: string;

  /** Optional display name */
  displayName?: string;

  /** Timestamps */
  createdAt: string;
  updatedAt: string;
}

// ============================================
// PREFERENCE DIMENSIONS (for radar visualization)
// ============================================

/**
 * Preference dimensions represent abstract value categories that cut across
 * all implementation approaches. These are visualized on a radar chart to
 * show a user's "preference profile" based on their approach ratings.
 */
export type PreferenceDimensionId =
  | 'government-role'
  | 'universality'
  | 'time-horizon'
  | 'cost-distribution'
  | 'individual-choice'
  | 'implementation-scale';

export interface PreferenceDimension {
  id: PreferenceDimensionId;
  /** Short label for radar chart */
  label: string;
  /** Full title */
  title: string;
  /** Description of what this dimension measures */
  description: string;
  /** Low end of the spectrum (0) */
  lowLabel: string;
  /** High end of the spectrum (100) */
  highLabel: string;
  /** Icon for the dimension */
  icon: string;
  /** Display color */
  color: string;
}

/**
 * How an implementation approach scores on each preference dimension.
 * Values range from 0-100 where:
 * - 0 = strongly toward lowLabel end
 * - 50 = neutral/balanced
 * - 100 = strongly toward highLabel end
 */
export interface ApproachDimensionScores {
  approachId: string;
  scores: Record<PreferenceDimensionId, number>;
}

/**
 * User's preference profile derived from their approach ratings.
 * Calculated by weighting approach dimension scores by user ratings.
 */
export interface UserPreferenceProfile {
  /** Score for each dimension (0-100) */
  dimensions: Record<PreferenceDimensionId, number>;
  /** How many approaches contributed to this profile */
  approachesRated: number;
  /** Confidence level based on number of ratings */
  confidence: 'low' | 'medium' | 'high';
}

// ============================================
// DERIVED TYPES (for UI/analysis)
// ============================================

/**
 * Problem area with its implementation approaches attached
 */
export interface ProblemAreaWithApproaches extends ProblemArea {
  approaches: ImplementationApproach[];
}

/**
 * User's profile summary for display
 */
export interface UserProfileSummary {
  /** Top 3-5 priority problem areas */
  topProblemAreas: ProblemAreaId[];
  /** User's preferred approach per problem area */
  preferredApproaches: {
    problemAreaId: ProblemAreaId;
    approachId: string;
    approachTitle: string;
    rating: ImplementationRating;
  }[];
  /** Participation stats */
  stats: {
    problemsSelected: number;
    approachesRated: number;
    totalApproaches: number;
  };
}

/**
 * Flow state for navigation
 */
export interface FlowState {
  /** Current step: 0=start, 1=problems, 2=approaches, 3=results */
  currentStep: number;
  /** Problem areas where all approaches have been rated */
  completedProblemIds: ProblemAreaId[];
  /** Whether the flow is complete */
  isComplete: boolean;
}

// ============================================
// CONSTANTS
// ============================================

export const PROBLEM_AREA_IDS: ProblemAreaId[] = [
  'healthcare-costs',
  'housing-affordability',
  'childcare-family',
  'democratic-reform',
  'economic-opportunity',
  'education-quality',
];

export const RATING_LABELS: Record<ImplementationRating, string> = {
  [-2]: 'Strongly Oppose',
  [-1]: 'Oppose',
  [0]: 'Neutral',
  [1]: 'Support',
  [2]: 'Strongly Support',
};

export const RATING_VALUES: ImplementationRating[] = [-2, -1, 0, 1, 2];

export const PRIORITY_LABELS: Record<PriorityRank, string> = {
  1: 'Top Priority',
  2: 'High Priority',
  3: 'Medium-High',
  4: 'Medium',
  5: 'Lower',
  6: 'Lowest',
};

export const MIN_PROBLEMS_TO_SELECT = 3;
export const MAX_PROBLEMS_TO_SELECT = 5;

// ============================================
// PREFERENCE DIMENSIONS CONSTANTS
// ============================================

export const PREFERENCE_DIMENSIONS: PreferenceDimension[] = [
  {
    id: 'government-role',
    label: 'Gov Role',
    title: 'Government Role',
    description: 'How much should government be involved in solving this problem?',
    lowLabel: 'Market-Led',
    highLabel: 'Government-Led',
    icon: 'Building2',
    color: '#3B82F6', // blue
  },
  {
    id: 'universality',
    label: 'Coverage',
    title: 'Universality',
    description: 'Should benefits be universal or targeted to those most in need?',
    lowLabel: 'Targeted',
    highLabel: 'Universal',
    icon: 'Users',
    color: '#8B5CF6', // purple
  },
  {
    id: 'time-horizon',
    label: 'Timeline',
    title: 'Time Horizon',
    description: 'Prioritize immediate relief or long-term systemic change?',
    lowLabel: 'Immediate',
    highLabel: 'Systemic',
    icon: 'Clock',
    color: '#10B981', // green
  },
  {
    id: 'cost-distribution',
    label: 'Funding',
    title: 'Cost Distribution',
    description: 'Who should bear the costs of implementation?',
    lowLabel: 'Individual',
    highLabel: 'Public',
    icon: 'DollarSign',
    color: '#F59E0B', // amber
  },
  {
    id: 'individual-choice',
    label: 'Choice',
    title: 'Individual Choice',
    description: 'How much individual choice should be preserved?',
    lowLabel: 'Standardized',
    highLabel: 'High Choice',
    icon: 'CheckSquare',
    color: '#EC4899', // pink
  },
  {
    id: 'implementation-scale',
    label: 'Scale',
    title: 'Implementation Scale',
    description: 'Should change happen locally or at a national level?',
    lowLabel: 'Local',
    highLabel: 'National',
    icon: 'Globe',
    color: '#6366F1', // indigo
  },
];

export const PREFERENCE_DIMENSION_IDS: PreferenceDimensionId[] = [
  'government-role',
  'universality',
  'time-horizon',
  'cost-distribution',
  'individual-choice',
  'implementation-scale',
];
