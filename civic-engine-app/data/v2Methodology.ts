/**
 * V2 Methodology: 13-Factor Political Economy Policy Scoring
 *
 * This file re-exports from the modular methodologies folder.
 * Each policy has its own file in data/methodologies/ for easier maintenance.
 */

// Re-export everything from the modular structure
export {
  // Types
  type FactorScore,
  type PolicyMethodology,
  // Constants
  FACTOR_DEFINITIONS,
  // Data
  policyMethodologies,
  // Helper functions
  getMethodology,
  hasMethodology,
  getAllMethodologies,
  getFactorDefinition,
} from './methodologies';
