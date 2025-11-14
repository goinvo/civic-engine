/**
 * Policy data types for Most of Us platform
 */

export type PolicyScope = 'federal' | 'state' | 'territory' | 'multistate';

export type PolicyCategory =
  | 'healthcare'
  | 'economy'
  | 'environment'
  | 'education'
  | 'justice'
  | 'governance'
  | 'civil-rights'
  | 'defense'
  | 'infrastructure'
  | 'other';

/**
 * Source citation for policy data
 */
export interface PolicySource {
  organization: string;
  title: string;
  url: string;
  year: number;
  supportPercentage?: number; // e.g., 72 for 72% support
}

/**
 * Party-specific support breakdown
 */
export interface PartySupport {
  democrats: number;
  republicans: number;
  independents: number;
}

/**
 * Detailed breakdown of a policy
 */
export interface PolicyDetail {
  title: string;
  description: string;
}

/**
 * Resource flow - shows who pays, who benefits, and how
 */
export interface ResourceFlow {
  from: string;   // e.g. "Federal income taxes", "Employers", "Landlords"
  to: string;     // e.g. "Working families", "Renters", "Small businesses"
  channel: string; // e.g. "Tax credit", "Regulation", "Direct subsidy"
}

/**
 * Causal chain - shows the policy's logic
 */
export interface CausalChain {
  immediate: string; // What the policy does
  outcome: string;   // What it's meant to achieve
}

/**
 * Common questions and answers about the policy
 */
export interface CommonQuestion {
  question: string;
  answer: string;
}

/**
 * Main Policy interface
 */
export interface Policy {
  id: string; // Unique identifier, e.g., "medicare-for-all"
  rank: number; // 1-20 for top policies
  title: string; // Short, action-oriented title
  description: string; // 1-2 sentence summary
  category: PolicyCategory;
  scope: PolicyScope;
  icon?: string; // Lucide icon name (optional)

  // Expandable details
  details: PolicyDetail[];

  // Impact structure - how the policy works
  resourceFlow?: ResourceFlow; // Who pays, who benefits, how it flows
  ifThen?: string[]; // Practical examples: "If X, then Y"
  causalChain?: CausalChain; // The policy's logic: immediate action → outcome
  commonQuestions?: CommonQuestion[]; // FAQ about the policy

  // Sources and support data
  sources: PolicySource[];
  averageSupport: number; // Average percentage support across sources
  partySupport?: PartySupport; // Support breakdown by party

  // For future features
  trending?: 'up' | 'down' | 'stable';

  // Metadata
  lastUpdated: string; // ISO date string
}

/**
 * Comparison result (for future voting feature)
 */
export interface PolicyComparison {
  policyA: Policy;
  policyB: Policy;
  winner?: 'A' | 'B';
  timestamp?: string;
}

/**
 * User preference (placeholder for future features)
 */
export interface UserPreference {
  userId: string;
  preferredPolicies: string[]; // Array of policy IDs
  comparisons: PolicyComparison[];
}
