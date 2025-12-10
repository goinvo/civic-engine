// V2 type imports
import { V2ArchetypeId, V2WeightProfile } from './consensus';
import { NeedCategory } from '@/data/v3Methodology';

// The 7 Impact Factors
export type ImpactFactor =
  | 'population'
  | 'economic'
  | 'intensity'
  | 'duration'
  | 'equity'
  | 'externalities'
  | 'implementation';

// Raw scores for a policy (0.0 - 1.0 for each factor)
export interface ImpactFactors {
  population: number;      // Scope/Reach
  economic: number;        // Volume of resources
  intensity: number;       // Depth of impact on individual
  duration: number;        // Time horizon
  equity: number;          // Distributional justice
  externalities: number;   // Systemic side-effects
  implementation: number;  // Feasibility and risk
}

// User's weighted preferences (sum = 1.0)
export interface WeightProfile {
  population: number;
  economic: number;
  intensity: number;
  duration: number;
  equity: number;
  externalities: number;
  implementation: number;
}

// Preset archetypes
export type ArchetypeId =
  | 'optimizer'
  | 'advocate'
  | 'realist'
  | 'futurist'
  | 'balanced'
  | 'custom';

export interface Archetype {
  id: ArchetypeId;
  name: string;
  description: string;
  shortDescription: string;
  philosopher?: string;
  philosophyName?: string;
  philosophyDescription?: string;
  thinkerBio?: string;
  weights: WeightProfile;
  icon?: string;
}

// Questionnaire
export type QuestionId =
  | 'q_scope'
  | 'q_money'
  | 'q_depth'
  | 'q_time'
  | 'q_equity'
  | 'q_systems'
  | 'q_risk';

export interface Question {
  id: QuestionId;
  factor: ImpactFactor;
  text: string;
  explanation?: string;
}

export type LikertScale = 1 | 2 | 3 | 4 | 5;

export interface QuestionnaireResponses {
  [key: string]: LikertScale;
}

// Scoring model version
export type ScoringModelVersion = 'v1' | 'v2' | 'v3' | 'v4';

// V2 Questionnaire responses (13 questions)
export interface V2QuestionnaireResponses {
  [key: string]: LikertScale;
}

// V3 Need Category Weights (sum should = 1.0)
export type V3NeedWeights = Record<NeedCategory, number>;

// V3 Questionnaire responses (5 questions)
export interface V3QuestionnaireResponses {
  [key: string]: LikertScale;
}

// V3 Archetype IDs
export type V3ArchetypeId =
  | 'balanced'        // Default equal weights
  | 'survivalist'     // Prioritizes physiological & safety
  | 'communitarian'   // Prioritizes community & opportunity
  | 'idealist'        // Prioritizes self-actualization & community
  | 'pragmatist'      // Prioritizes safety & opportunity
  | 'custom_v3';      // Custom weights

// V4 Archetype IDs (Unified Model)
export type V4ArchetypeId =
  | 'pragmatist'      // Prioritizes Impact lens (feasibility, reach)
  | 'economist'       // Prioritizes Economics lens (political economy)
  | 'humanist'        // Prioritizes Needs lens (human flourishing)
  | 'balanced'        // Equal weight across all lenses
  | 'custom_v4';      // Custom weights

// V4 Weight Profile (combines all three lenses)
export interface V4WeightProfile {
  lensWeights: {
    impact: number;
    economics: number;
    needs: number;
  };
  impactWeights: WeightProfile;
  economicsWeights: import('@/types/consensus').V2WeightProfile;
  needsWeights: V3NeedWeights;
}

// V4 Questionnaire responses
export interface V4QuestionnaireResponses {
  [key: string]: LikertScale;
}

// User's complete values profile (supports v1, v2, v3, and v4)
export interface UserValuesProfile {
  // V1 fields (always present for backwards compatibility)
  archetypeId: ArchetypeId;
  weights: WeightProfile;
  responses?: QuestionnaireResponses;

  // Model version selector
  scoringModel: ScoringModelVersion;

  // V2 fields (optional, present when user has used v2)
  v2ArchetypeId?: V2ArchetypeId;
  v2Weights?: V2WeightProfile;
  v2Responses?: V2QuestionnaireResponses;
  v2AutoMapped?: boolean; // True if profile was auto-mapped from v1

  // V3 fields (optional, present when user has used v3)
  v3ArchetypeId?: V3ArchetypeId;
  v3NeedWeights?: V3NeedWeights;
  v3Responses?: V3QuestionnaireResponses;

  // V4 fields (optional, present when user has used v4 unified model)
  v4ArchetypeId?: V4ArchetypeId;
  v4Weights?: V4WeightProfile;
  v4Responses?: V4QuestionnaireResponses;

  // Timestamps
  createdAt: string;
  updatedAt: string;
}
