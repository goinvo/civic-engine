/**
 * Implementation Approaches - Aggregate Export
 *
 * All implementation approaches from all problem areas combined into a single array.
 */

import type { ImplementationApproach } from '@/types/problem-areas';

import { healthcareApproaches } from './healthcare';
import { housingApproaches } from './housing';
import { childcareApproaches } from './childcare';
import { democraticReformApproaches } from './democratic-reform';
import { economicOpportunityApproaches } from './economic-opportunity';
import { educationApproaches } from './education';

/**
 * All implementation approaches from all problem areas
 */
export const allApproaches: ImplementationApproach[] = [
  ...healthcareApproaches,
  ...housingApproaches,
  ...childcareApproaches,
  ...democraticReformApproaches,
  ...economicOpportunityApproaches,
  ...educationApproaches,
];

// Re-export individual arrays for direct access if needed
export {
  healthcareApproaches,
  housingApproaches,
  childcareApproaches,
  democraticReformApproaches,
  economicOpportunityApproaches,
  educationApproaches,
};
