/**
 * Storage functions for user preferences
 *
 * Handles localStorage persistence for the problem areas flow.
 */

import type {
  UserPreferences,
  ProblemAreaId,
  ImplementationRating,
  PriorityRank,
} from '@/types/problem-areas';

// ============================================
// CONSTANTS
// ============================================

export const CIVIC_ENGINE_STORAGE_KEY = 'civic-engine.preferences.v1';

export const DEFAULT_PREFERENCES: UserPreferences = {
  problemAreaPriorities: {},
  implementationRatings: {},
  selectedProblemIds: [],
  zipCode: undefined,
  displayName: undefined,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

// ============================================
// UTILITY FUNCTIONS
// ============================================

function isBrowser(): boolean {
  return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';
}

function safeJsonParse<T>(raw: string | null): T | null {
  if (!raw) return null;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

// ============================================
// CORE STORAGE FUNCTIONS
// ============================================

/**
 * Load user preferences from localStorage
 */
export function loadPreferences(): UserPreferences | null {
  if (!isBrowser()) return null;

  const raw = window.localStorage.getItem(CIVIC_ENGINE_STORAGE_KEY);
  const parsed = safeJsonParse<UserPreferences>(raw);

  if (!parsed) return null;

  // Validate basic structure
  if (typeof parsed.problemAreaPriorities !== 'object') return null;
  if (typeof parsed.implementationRatings !== 'object') return null;
  if (!Array.isArray(parsed.selectedProblemIds)) return null;

  return parsed;
}

/**
 * Save user preferences to localStorage
 */
export function savePreferences(preferences: UserPreferences): void {
  if (!isBrowser()) return;

  const updated: UserPreferences = {
    ...preferences,
    updatedAt: new Date().toISOString(),
  };

  window.localStorage.setItem(CIVIC_ENGINE_STORAGE_KEY, JSON.stringify(updated));
}

/**
 * Clear user preferences from localStorage
 */
export function clearPreferences(): void {
  if (!isBrowser()) return;
  window.localStorage.removeItem(CIVIC_ENGINE_STORAGE_KEY);
}

/**
 * Get or create preferences (lazy initialization)
 */
export function getOrCreatePreferences(): UserPreferences {
  const existing = loadPreferences();
  if (existing) return existing;

  const fresh: UserPreferences = {
    ...DEFAULT_PREFERENCES,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  savePreferences(fresh);
  return fresh;
}

/**
 * Update preferences with partial data (merge)
 */
export function updatePreferences(
  patch: Partial<Omit<UserPreferences, 'updatedAt' | 'createdAt'>>
): UserPreferences {
  const current = loadPreferences() ?? { ...DEFAULT_PREFERENCES };

  const updated: UserPreferences = {
    problemAreaPriorities:
      patch.problemAreaPriorities ?? current.problemAreaPriorities,
    implementationRatings:
      patch.implementationRatings ?? current.implementationRatings,
    selectedProblemIds: patch.selectedProblemIds ?? current.selectedProblemIds,
    zipCode: patch.zipCode ?? current.zipCode,
    displayName: patch.displayName ?? current.displayName,
    createdAt: current.createdAt ?? new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  savePreferences(updated);
  return updated;
}

// ============================================
// PROBLEM AREA SELECTION
// ============================================

/**
 * Add a problem area to selected list
 */
export function selectProblemArea(areaId: ProblemAreaId): UserPreferences {
  const current = loadPreferences() ?? { ...DEFAULT_PREFERENCES };

  if (!current.selectedProblemIds.includes(areaId)) {
    current.selectedProblemIds = [...current.selectedProblemIds, areaId];
  }

  savePreferences(current);
  return current;
}

/**
 * Remove a problem area from selected list
 */
export function deselectProblemArea(areaId: ProblemAreaId): UserPreferences {
  const current = loadPreferences() ?? { ...DEFAULT_PREFERENCES };

  current.selectedProblemIds = current.selectedProblemIds.filter(
    (id) => id !== areaId
  );

  savePreferences(current);
  return current;
}

/**
 * Toggle a problem area selection
 */
export function toggleProblemAreaSelection(areaId: ProblemAreaId): UserPreferences {
  const current = loadPreferences() ?? { ...DEFAULT_PREFERENCES };

  if (current.selectedProblemIds.includes(areaId)) {
    return deselectProblemArea(areaId);
  } else {
    return selectProblemArea(areaId);
  }
}

/**
 * Set all selected problem areas at once
 */
export function setSelectedProblemAreas(areaIds: ProblemAreaId[]): UserPreferences {
  const current = loadPreferences() ?? { ...DEFAULT_PREFERENCES };
  current.selectedProblemIds = [...areaIds];
  savePreferences(current);
  return current;
}

/**
 * Get selected problem area IDs
 */
export function getSelectedProblemIds(): ProblemAreaId[] {
  const prefs = loadPreferences();
  return prefs?.selectedProblemIds ?? [];
}

// ============================================
// PRIORITY RANKING
// ============================================

/**
 * Set a problem area's priority ranking
 */
export function setProblemAreaPriority(
  areaId: ProblemAreaId,
  rank: PriorityRank | null
): UserPreferences {
  const current = loadPreferences() ?? { ...DEFAULT_PREFERENCES };

  if (rank === null) {
    delete current.problemAreaPriorities[areaId];
  } else {
    current.problemAreaPriorities[areaId] = rank;
  }

  savePreferences(current);
  return current;
}

/**
 * Set multiple problem area priorities at once (for drag-and-drop ranking)
 */
export function setProblemAreaPriorities(
  priorities: Partial<Record<ProblemAreaId, PriorityRank>>
): UserPreferences {
  const current = loadPreferences() ?? { ...DEFAULT_PREFERENCES };
  current.problemAreaPriorities = { ...priorities };
  savePreferences(current);
  return current;
}

/**
 * Get the user's top N problem areas by priority
 */
export function getTopProblemAreaIds(n: number = 3): ProblemAreaId[] {
  const prefs = loadPreferences();
  if (!prefs) return [];

  return Object.entries(prefs.problemAreaPriorities)
    .filter((entry): entry is [ProblemAreaId, PriorityRank] => entry[1] !== undefined)
    .sort((a, b) => a[1] - b[1])
    .slice(0, n)
    .map(([id]) => id as ProblemAreaId);
}

// ============================================
// IMPLEMENTATION RATINGS
// ============================================

/**
 * Set an implementation approach rating
 */
export function setImplementationRating(
  approachId: string,
  rating: ImplementationRating
): UserPreferences {
  const current = loadPreferences() ?? { ...DEFAULT_PREFERENCES };
  current.implementationRatings[approachId] = rating;
  savePreferences(current);
  return current;
}

/**
 * Remove an implementation approach rating
 */
export function removeImplementationRating(approachId: string): UserPreferences {
  const current = loadPreferences() ?? { ...DEFAULT_PREFERENCES };
  delete current.implementationRatings[approachId];
  savePreferences(current);
  return current;
}

/**
 * Get a specific implementation rating
 */
export function getImplementationRating(
  approachId: string
): ImplementationRating | undefined {
  const prefs = loadPreferences();
  return prefs?.implementationRatings[approachId];
}

/**
 * Get all ratings for a specific problem area
 */
export function getRatingsForProblemArea(
  problemAreaId: ProblemAreaId,
  approachIds: string[]
): Record<string, ImplementationRating> {
  const prefs = loadPreferences();
  if (!prefs) return {};

  const ratings: Record<string, ImplementationRating> = {};
  for (const id of approachIds) {
    if (id.startsWith(problemAreaId) && prefs.implementationRatings[id] !== undefined) {
      ratings[id] = prefs.implementationRatings[id];
    }
  }

  return ratings;
}

/**
 * Check if all approaches for a problem area have been rated
 */
export function isProblemAreaComplete(
  problemAreaId: ProblemAreaId,
  approachIds: string[]
): boolean {
  const prefs = loadPreferences();
  if (!prefs) return false;

  return approachIds.every(
    (id) => prefs.implementationRatings[id] !== undefined
  );
}

// ============================================
// FLOW PROGRESS
// ============================================

/**
 * Check if user has selected enough problem areas to proceed
 */
export function hasMinimumProblemsSelected(): boolean {
  const selected = getSelectedProblemIds();
  return selected.length >= 3;
}

/**
 * Check if the user has completed the full flow
 */
export function hasCompletedFlow(totalApproachCount: number): boolean {
  const prefs = loadPreferences();
  if (!prefs) return false;

  // User has selected at least 3 problems AND rated at least half of total approaches
  const hasEnoughProblems = prefs.selectedProblemIds.length >= 3;
  const ratingsCount = Object.keys(prefs.implementationRatings).length;
  const hasEnoughRatings = ratingsCount >= Math.floor(totalApproachCount / 2);

  return hasEnoughProblems && hasEnoughRatings;
}

/**
 * Get completion stats
 */
export function getCompletionStats(totalApproachCount: number): {
  problemsSelected: number;
  approachesRated: number;
  totalApproaches: number;
  percentComplete: number;
} {
  const prefs = loadPreferences();

  const problemsSelected = prefs?.selectedProblemIds.length ?? 0;
  const approachesRated = Object.keys(prefs?.implementationRatings ?? {}).length;

  return {
    problemsSelected,
    approachesRated,
    totalApproaches: totalApproachCount,
    percentComplete: Math.round((approachesRated / totalApproachCount) * 100),
  };
}

// ============================================
// USER INFO
// ============================================

/**
 * Set user's display name
 */
export function setDisplayName(name: string): UserPreferences {
  const current = loadPreferences() ?? { ...DEFAULT_PREFERENCES };
  current.displayName = name;
  savePreferences(current);
  return current;
}

/**
 * Set user's zip code
 */
export function setZipCode(zip: string): UserPreferences {
  const current = loadPreferences() ?? { ...DEFAULT_PREFERENCES };
  current.zipCode = zip;
  savePreferences(current);
  return current;
}
