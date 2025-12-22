/**
 * V1 Impact Model Methodologies Index
 *
 * This folder contains detailed policy scoring methodologies using the V1 Impact Model.
 *
 * The V1 model evaluates policies based on 7 factors:
 * 1. Population - How many people are directly affected
 * 2. Economic - The dollar volume / economic scale
 * 3. Intensity - How deeply each affected person is impacted
 * 4. Duration - How long the effects persist
 * 5. Equity - Whether benefits flow to vulnerable populations
 * 6. Externalities - Spillover effects (positive or negative)
 * 7. Implementation - How difficult it is to actually pass and implement
 *
 * Scale: 0.0 - 1.0 for each factor
 * Total Score: 0-100 (weighted combination)
 */

// Individual policy exports
export { socialSecurityCapMethodology } from './social-security-cap';
export { medicareDrugNegotiationMethodology } from './medicare-drug-negotiation';
export { immigrationGrandBargainMethodology } from './immigration-grand-bargain';
export { universalPreKMethodology } from './universal-pre-k';
export { ultraMillionaireTaxMethodology } from './ultra-millionaire-tax';
export { minimumWage17Methodology } from './minimum-wage-17';
export { universalBackgroundChecksMethodology } from './universal-background-checks';
export { scotusTermLimitsMethodology } from './scotus-term-limits';
export { aiSafetyRegulationMethodology } from './ai-safety-regulation';
export { junkFeePreventionMethodology } from './junk-fee-prevention';

// Import for combined record
import { socialSecurityCapMethodology } from './social-security-cap';
import { medicareDrugNegotiationMethodology } from './medicare-drug-negotiation';
import { immigrationGrandBargainMethodology } from './immigration-grand-bargain';
import { universalPreKMethodology } from './universal-pre-k';
import { ultraMillionaireTaxMethodology } from './ultra-millionaire-tax';
import { minimumWage17Methodology } from './minimum-wage-17';
import { universalBackgroundChecksMethodology } from './universal-background-checks';
import { scotusTermLimitsMethodology } from './scotus-term-limits';
import { aiSafetyRegulationMethodology } from './ai-safety-regulation';
import { junkFeePreventionMethodology } from './junk-fee-prevention';
import { V1PolicyMethodology } from '../../v1Methodology';

/**
 * All V1 impact model methodologies indexed by policy ID
 */
export const impactModelMethodologies: Record<string, V1PolicyMethodology> = {
  'social-security-cap': socialSecurityCapMethodology,
  'medicare-drug-negotiation': medicareDrugNegotiationMethodology,
  'immigration-grand-bargain': immigrationGrandBargainMethodology,
  'universal-pre-k': universalPreKMethodology,
  'ultra-millionaire-tax': ultraMillionaireTaxMethodology,
  'minimum-wage-17': minimumWage17Methodology,
  'universal-background-checks': universalBackgroundChecksMethodology,
  'scotus-term-limits': scotusTermLimitsMethodology,
  'ai-safety-regulation': aiSafetyRegulationMethodology,
  'junk-fee-prevention': junkFeePreventionMethodology,
};

/**
 * Get all V1 impact model methodologies as an array
 */
export function getAllImpactModelMethodologies(): V1PolicyMethodology[] {
  return Object.values(impactModelMethodologies);
}

/**
 * Get a specific V1 impact model methodology by policy ID
 */
export function getImpactModelMethodology(policyId: string): V1PolicyMethodology | undefined {
  return impactModelMethodologies[policyId];
}

/**
 * Check if a policy has a V1 impact model methodology
 */
export function hasImpactModelMethodology(policyId: string): boolean {
  return policyId in impactModelMethodologies;
}
