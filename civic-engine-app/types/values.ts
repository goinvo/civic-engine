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

// User's complete values profile
export interface UserValuesProfile {
  archetypeId: ArchetypeId;
  weights: WeightProfile;
  responses?: QuestionnaireResponses;
  createdAt: string;
  updatedAt: string;
}
