// V2 type imports
import { V2ArchetypeId, V2WeightProfile } from './consensus';

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
export type ScoringModelVersion = 'v1' | 'v2';

// V2 Questionnaire responses (13 questions)
export interface V2QuestionnaireResponses {
  [key: string]: LikertScale;
}

// User's complete values profile (supports both v1 and v2)
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

  // Timestamps
  createdAt: string;
  updatedAt: string;
}
