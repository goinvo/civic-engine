/**
 * Problem Areas Library
 *
 * Re-exports all storage and helper functions for convenience.
 */

// Storage functions
export {
  CIVIC_ENGINE_STORAGE_KEY,
  DEFAULT_PREFERENCES,
  loadPreferences,
  savePreferences,
  clearPreferences,
  getOrCreatePreferences,
  updatePreferences,
  selectProblemArea,
  deselectProblemArea,
  toggleProblemAreaSelection,
  setSelectedProblemAreas,
  getSelectedProblemIds,
  setProblemAreaPriority,
  setProblemAreaPriorities,
  getTopProblemAreaIds,
  setImplementationRating,
  removeImplementationRating,
  getImplementationRating,
  getRatingsForProblemArea,
  isProblemAreaComplete,
  hasMinimumProblemsSelected,
  hasCompletedFlow,
  getCompletionStats,
  setDisplayName,
  setZipCode,
} from './storage';

// Helper functions
export {
  getProblemAreas,
  getProblemAreaById,
  getProblemAreasByIds,
  getSelectedProblemAreas,
  getAllApproaches,
  getTotalApproachCount,
  getApproachesByProblemArea,
  getApproachById,
  getApproachesForProblemAreas,
  getProblemAreasWithApproaches,
  getProblemAreaWithApproaches,
  getSelectedProblemAreasWithApproaches,
  getUserProfileSummary,
  getFlowState,
  getProblemAreaProgress,
  getSupportedApproaches,
  getStronglySupportedApproaches,
  getOpposedApproaches,
  getApproachesByStance,
  searchApproaches,
} from './helpers';

// Consensus functions ("Most of Us")
export {
  getApproachConsensus,
  getProblemAreaConsensus,
  getNationalConsensus,
  getAmericanMandate,
  getUserConsensusAlignment,
  getUserCivicIdentity,
} from './consensus';
