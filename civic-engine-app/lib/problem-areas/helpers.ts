/**
 * Helper functions for accessing problem area and approach data
 */

import type {
  ProblemArea,
  ProblemAreaId,
  ProblemAreaWithApproaches,
  ImplementationApproach,
  UserProfileSummary,
  ImplementationRating,
  FlowState,
} from '@/types/problem-areas';

import { problemAreas } from '@/data/problem-areas/problem-areas';
import { allApproaches } from '@/data/problem-areas/approaches';
import {
  loadPreferences,
  getSelectedProblemIds,
  getTopProblemAreaIds,
} from './storage';

// ============================================
// DATA ACCESS - PROBLEM AREAS
// ============================================

/**
 * Get all problem areas sorted by order
 */
export function getProblemAreas(): ProblemArea[] {
  return [...problemAreas].sort((a, b) => a.order - b.order);
}

/**
 * Get a single problem area by ID
 */
export function getProblemAreaById(id: ProblemAreaId): ProblemArea | undefined {
  return problemAreas.find((area) => area.id === id);
}

/**
 * Get problem areas by IDs (preserves order of input)
 */
export function getProblemAreasByIds(ids: ProblemAreaId[]): ProblemArea[] {
  return ids
    .map((id) => getProblemAreaById(id))
    .filter((area): area is ProblemArea => area !== undefined);
}

/**
 * Get the user's selected problem areas
 */
export function getSelectedProblemAreas(): ProblemArea[] {
  const selectedIds = getSelectedProblemIds();
  return getProblemAreasByIds(selectedIds);
}

// ============================================
// DATA ACCESS - APPROACHES
// ============================================

/**
 * Get all implementation approaches
 */
export function getAllApproaches(): ImplementationApproach[] {
  return allApproaches;
}

/**
 * Get total count of all approaches
 */
export function getTotalApproachCount(): number {
  return allApproaches.length;
}

/**
 * Get implementation approaches for a specific problem area
 */
export function getApproachesByProblemArea(
  problemAreaId: ProblemAreaId
): ImplementationApproach[] {
  return allApproaches
    .filter((approach) => approach.problemAreaId === problemAreaId)
    .sort((a, b) => a.order - b.order);
}

/**
 * Get a single implementation approach by ID
 */
export function getApproachById(id: string): ImplementationApproach | undefined {
  return allApproaches.find((approach) => approach.id === id);
}

/**
 * Get approaches for multiple problem areas
 */
export function getApproachesForProblemAreas(
  problemAreaIds: ProblemAreaId[]
): ImplementationApproach[] {
  return allApproaches
    .filter((approach) => problemAreaIds.includes(approach.problemAreaId))
    .sort((a, b) => {
      // Sort by problem area order first, then by approach order
      const areaOrderA = problemAreaIds.indexOf(a.problemAreaId);
      const areaOrderB = problemAreaIds.indexOf(b.problemAreaId);
      if (areaOrderA !== areaOrderB) return areaOrderA - areaOrderB;
      return a.order - b.order;
    });
}

// ============================================
// COMBINED DATA
// ============================================

/**
 * Get all problem areas with their approaches attached
 */
export function getProblemAreasWithApproaches(): ProblemAreaWithApproaches[] {
  return getProblemAreas().map((area) => ({
    ...area,
    approaches: getApproachesByProblemArea(area.id),
  }));
}

/**
 * Get a single problem area with approaches by ID
 */
export function getProblemAreaWithApproaches(
  id: ProblemAreaId
): ProblemAreaWithApproaches | undefined {
  const area = getProblemAreaById(id);
  if (!area) return undefined;

  return {
    ...area,
    approaches: getApproachesByProblemArea(id),
  };
}

/**
 * Get selected problem areas with approaches
 */
export function getSelectedProblemAreasWithApproaches(): ProblemAreaWithApproaches[] {
  const selectedIds = getSelectedProblemIds();
  return selectedIds
    .map((id) => getProblemAreaWithApproaches(id))
    .filter((area): area is ProblemAreaWithApproaches => area !== undefined);
}

// ============================================
// USER PROFILE
// ============================================

/**
 * Get a summary of the user's profile for display
 */
export function getUserProfileSummary(): UserProfileSummary | null {
  const prefs = loadPreferences();
  if (!prefs) return null;

  // Get top problem areas (either by priority or by selection order)
  const topAreas =
    Object.keys(prefs.problemAreaPriorities).length > 0
      ? getTopProblemAreaIds(5)
      : (prefs.selectedProblemIds.slice(0, 5) as ProblemAreaId[]);

  // Find user's preferred approach for each problem area
  const preferredApproaches: UserProfileSummary['preferredApproaches'] = [];

  for (const areaId of prefs.selectedProblemIds) {
    const areaApproaches = getApproachesByProblemArea(areaId);

    // Find highest-rated approach for this area
    let bestApproach: {
      approachId: string;
      approachTitle: string;
      rating: ImplementationRating;
    } | null = null;

    for (const approach of areaApproaches) {
      const rating = prefs.implementationRatings[approach.id];
      if (rating !== undefined && rating > 0) {
        if (!bestApproach || rating > bestApproach.rating) {
          bestApproach = {
            approachId: approach.id,
            approachTitle: approach.title,
            rating,
          };
        }
      }
    }

    if (bestApproach) {
      preferredApproaches.push({
        problemAreaId: areaId,
        ...bestApproach,
      });
    }
  }

  return {
    topProblemAreas: topAreas,
    preferredApproaches,
    stats: {
      problemsSelected: prefs.selectedProblemIds.length,
      approachesRated: Object.keys(prefs.implementationRatings).length,
      totalApproaches: allApproaches.length,
    },
  };
}

// ============================================
// FLOW STATE
// ============================================

/**
 * Get the current flow state
 */
export function getFlowState(): FlowState {
  const prefs = loadPreferences();

  if (!prefs) {
    return {
      currentStep: 0,
      completedProblemIds: [],
      isComplete: false,
    };
  }

  // Determine completed problem areas
  const completedProblemIds: ProblemAreaId[] = [];

  for (const areaId of prefs.selectedProblemIds) {
    const approaches = getApproachesByProblemArea(areaId);
    const allRated = approaches.every(
      (a) => prefs.implementationRatings[a.id] !== undefined
    );
    if (allRated) {
      completedProblemIds.push(areaId);
    }
  }

  // Determine current step
  let currentStep = 0;

  if (prefs.selectedProblemIds.length === 0) {
    currentStep = 1; // Problem selection
  } else if (completedProblemIds.length < prefs.selectedProblemIds.length) {
    currentStep = 2; // Rating approaches
  } else {
    currentStep = 3; // Results
  }

  const isComplete =
    prefs.selectedProblemIds.length >= 3 &&
    completedProblemIds.length === prefs.selectedProblemIds.length;

  return {
    currentStep,
    completedProblemIds,
    isComplete,
  };
}

/**
 * Get progress for a specific problem area
 */
export function getProblemAreaProgress(problemAreaId: ProblemAreaId): {
  total: number;
  rated: number;
  isComplete: boolean;
} {
  const prefs = loadPreferences();
  const approaches = getApproachesByProblemArea(problemAreaId);

  if (!prefs) {
    return { total: approaches.length, rated: 0, isComplete: false };
  }

  const rated = approaches.filter(
    (a) => prefs.implementationRatings[a.id] !== undefined
  ).length;

  return {
    total: approaches.length,
    rated,
    isComplete: rated === approaches.length,
  };
}

// ============================================
// FILTERING & ANALYSIS
// ============================================

/**
 * Get approaches the user supports (rating >= 1)
 */
export function getSupportedApproaches(): ImplementationApproach[] {
  const prefs = loadPreferences();
  if (!prefs) return [];

  return allApproaches.filter((approach) => {
    const rating = prefs.implementationRatings[approach.id];
    return rating !== undefined && rating >= 1;
  });
}

/**
 * Get approaches the user strongly supports (rating === 2)
 */
export function getStronglySupportedApproaches(): ImplementationApproach[] {
  const prefs = loadPreferences();
  if (!prefs) return [];

  return allApproaches.filter((approach) => {
    const rating = prefs.implementationRatings[approach.id];
    return rating === 2;
  });
}

/**
 * Get approaches the user opposes (rating <= -1)
 */
export function getOpposedApproaches(): ImplementationApproach[] {
  const prefs = loadPreferences();
  if (!prefs) return [];

  return allApproaches.filter((approach) => {
    const rating = prefs.implementationRatings[approach.id];
    return rating !== undefined && rating <= -1;
  });
}

/**
 * Group user's rated approaches by stance
 */
export function getApproachesByStance(): {
  stronglySupport: ImplementationApproach[];
  support: ImplementationApproach[];
  neutral: ImplementationApproach[];
  oppose: ImplementationApproach[];
  stronglyOppose: ImplementationApproach[];
} {
  const prefs = loadPreferences();

  const result = {
    stronglySupport: [] as ImplementationApproach[],
    support: [] as ImplementationApproach[],
    neutral: [] as ImplementationApproach[],
    oppose: [] as ImplementationApproach[],
    stronglyOppose: [] as ImplementationApproach[],
  };

  if (!prefs) return result;

  for (const approach of allApproaches) {
    const rating = prefs.implementationRatings[approach.id];
    if (rating === undefined) continue;

    switch (rating) {
      case 2:
        result.stronglySupport.push(approach);
        break;
      case 1:
        result.support.push(approach);
        break;
      case 0:
        result.neutral.push(approach);
        break;
      case -1:
        result.oppose.push(approach);
        break;
      case -2:
        result.stronglyOppose.push(approach);
        break;
    }
  }

  return result;
}

/**
 * Search approaches by keyword (title, summary)
 */
export function searchApproaches(query: string): ImplementationApproach[] {
  const lowerQuery = query.toLowerCase();

  return allApproaches.filter(
    (approach) =>
      approach.title.toLowerCase().includes(lowerQuery) ||
      approach.summary.toLowerCase().includes(lowerQuery)
  );
}
