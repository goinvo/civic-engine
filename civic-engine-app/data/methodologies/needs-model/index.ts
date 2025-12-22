/**
 * V3 Needs-Based Model Methodologies Index
 *
 * This folder contains detailed policy scoring methodologies using the V3 Needs-Based Framework.
 *
 * The V3 model evaluates policies based on:
 * 1. Maslow-inspired need categories (physiological, safety, community, opportunity, self-actualization)
 * 2. Four scoring dimensions (population affected, essential to survival, time to outcome, feasibility)
 *
 * Scale: 0-10 where 5 = neutral (no effect)
 * - 0: Extremely harmful
 * - 1-4: Harmful (varying degrees)
 * - 5: No effect / neutral
 * - 6-9: Beneficial (varying degrees)
 * - 10: Extremely beneficial
 *
 * Default Need Category Weights:
 * - Physiological: 25%
 * - Safety: 30% (highest weight)
 * - Community: 15%
 * - Opportunity: 20%
 * - Self-Actualization: 10%
 */

export { socialSecurityCapMethodology } from './social-security-cap';
export { congressStockBanMethodology } from './congress-stock-ban';
export { congressTermLimitsMethodology } from './congress-term-limits';
export { rightToRepairMethodology } from './right-to-repair';
export { immigrationGrandBargainMethodology } from './immigration-grand-bargain';
export { vocationalTrainingMethodology } from './vocational-training';
export { kidsOnlineSafetyMethodology } from './kids-online-safety';
export { universalBackgroundChecksMethodology } from './universal-background-checks';
export { freeEasyVoterIdMethodology } from './free-easy-voter-id';
export { junkFeePreventionMethodology } from './junk-fee-prevention';
export { expandedChildTaxCreditMethodology } from './expanded-child-tax-credit';
export { scotusTermLimitsMethodology } from './scotus-term-limits';
export { foreignFarmlandBanMethodology } from './foreign-farmland-ban';
export { minimumWage17Methodology } from './minimum-wage-17';
export { healthcarePublicOptionMethodology } from './healthcare-public-option';
export { nuclearEnergyExpansionMethodology } from './nuclear-energy-expansion';
export { policeAccountabilityMethodology } from './police-accountability';
export { affordableHousingNhiaMethodology } from './affordable-housing-nhia';
export { mentalHealth988Methodology } from './mental-health-988';
export { cannabisBankingMethodology } from './cannabis-banking';
export { universalPreKMethodology } from './universal-pre-k';
export { buyAmericanMandatesMethodology } from './buy-american-mandates';
export { medicareDrugNegotiationMethodology } from './medicare-drug-negotiation';
export { aiSafetyRegulationMethodology } from './ai-safety-regulation';
export { ruralBroadbandAccessMethodology } from './rural-broadband-access';
export { campaignFinanceDisclosureMethodology } from './campaign-finance-disclosure';
export { universalBasicIncomeMethodology } from './universal-basic-income';
export { federalJobGuaranteeMethodology } from './federal-job-guarantee';
export { medicareForAllMethodology } from './medicare-for-all';
export { ultraMillionaireWealthTaxMethodology } from './ultra-millionaire-wealth-tax';
export { nationalServiceVoluntaryMethodology } from './national-service-voluntary';
export { simplifiedTaxFilingMethodology } from './simplified-tax-filing';
export { overturnCitizensUnitedMethodology } from './overturn-citizens-united';

import { socialSecurityCapMethodology } from './social-security-cap';
import { congressStockBanMethodology } from './congress-stock-ban';
import { congressTermLimitsMethodology } from './congress-term-limits';
import { rightToRepairMethodology } from './right-to-repair';
import { immigrationGrandBargainMethodology } from './immigration-grand-bargain';
import { vocationalTrainingMethodology } from './vocational-training';
import { kidsOnlineSafetyMethodology } from './kids-online-safety';
import { universalBackgroundChecksMethodology } from './universal-background-checks';
import { freeEasyVoterIdMethodology } from './free-easy-voter-id';
import { junkFeePreventionMethodology } from './junk-fee-prevention';
import { expandedChildTaxCreditMethodology } from './expanded-child-tax-credit';
import { scotusTermLimitsMethodology } from './scotus-term-limits';
import { foreignFarmlandBanMethodology } from './foreign-farmland-ban';
import { minimumWage17Methodology } from './minimum-wage-17';
import { healthcarePublicOptionMethodology } from './healthcare-public-option';
import { nuclearEnergyExpansionMethodology } from './nuclear-energy-expansion';
import { policeAccountabilityMethodology } from './police-accountability';
import { affordableHousingNhiaMethodology } from './affordable-housing-nhia';
import { mentalHealth988Methodology } from './mental-health-988';
import { cannabisBankingMethodology } from './cannabis-banking';
import { universalPreKMethodology } from './universal-pre-k';
import { buyAmericanMandatesMethodology } from './buy-american-mandates';
import { medicareDrugNegotiationMethodology } from './medicare-drug-negotiation';
import { aiSafetyRegulationMethodology } from './ai-safety-regulation';
import { ruralBroadbandAccessMethodology } from './rural-broadband-access';
import { campaignFinanceDisclosureMethodology } from './campaign-finance-disclosure';
import { universalBasicIncomeMethodology } from './universal-basic-income';
import { federalJobGuaranteeMethodology } from './federal-job-guarantee';
import { medicareForAllMethodology } from './medicare-for-all';
import { ultraMillionaireWealthTaxMethodology } from './ultra-millionaire-wealth-tax';
import { nationalServiceVoluntaryMethodology } from './national-service-voluntary';
import { simplifiedTaxFilingMethodology } from './simplified-tax-filing';
import { overturnCitizensUnitedMethodology } from './overturn-citizens-united';
import { V3PolicyMethodology } from '../../v3Methodology';

/**
 * All V3 needs-based methodologies indexed by policy ID
 */
export const needsModelMethodologies: Record<string, V3PolicyMethodology> = {
  'social-security-cap': socialSecurityCapMethodology,
  'congress-stock-ban': congressStockBanMethodology,
  'congress-term-limits': congressTermLimitsMethodology,
  'right-to-repair': rightToRepairMethodology,
  'immigration-grand-bargain': immigrationGrandBargainMethodology,
  'invest-vocational-training': vocationalTrainingMethodology,
  'kids-online-safety-act': kidsOnlineSafetyMethodology,
  'universal-background-checks': universalBackgroundChecksMethodology,
  'free-and-easy-voter-id': freeEasyVoterIdMethodology,
  'junk-fee-prevention': junkFeePreventionMethodology,
  'expanded-child-tax-credit': expandedChildTaxCreditMethodology,
  'supreme-court-term-limits': scotusTermLimitsMethodology,
  'foreign-farmland-ownership-ban': foreignFarmlandBanMethodology,
  'raise-minimum-wage': minimumWage17Methodology,
  'healthcare-public-option': healthcarePublicOptionMethodology,
  'expand-nuclear-energy': nuclearEnergyExpansionMethodology,
  'police-accountability-standards': policeAccountabilityMethodology,
  'affordable-housing-supply': affordableHousingNhiaMethodology,
  'mental-health-lifeline-988': mentalHealth988Methodology,
  'cannabis-banking': cannabisBankingMethodology,
  'universal-pre-k': universalPreKMethodology,
  'buy-american-mandates': buyAmericanMandatesMethodology,
  'medicare-drug-negotiation': medicareDrugNegotiationMethodology,
  'ai-safety-regulation': aiSafetyRegulationMethodology,
  'rural-broadband-access': ruralBroadbandAccessMethodology,
  'campaign-finance-disclosure': campaignFinanceDisclosureMethodology,
  'universal-basic-income': universalBasicIncomeMethodology,
  'federal-job-guarantee': federalJobGuaranteeMethodology,
  'medicare-for-all': medicareForAllMethodology,
  'ultra-millionaire-wealth-tax': ultraMillionaireWealthTaxMethodology,
  'national-service-voluntary': nationalServiceVoluntaryMethodology,
  'simplified-tax-filing': simplifiedTaxFilingMethodology,
  'overturn-citizens-united': overturnCitizensUnitedMethodology,
};

/**
 * Get a V3 methodology by policy ID
 */
export function getNeedsModelMethodology(policyId: string): V3PolicyMethodology | undefined {
  return needsModelMethodologies[policyId];
}

/**
 * Check if a policy has a detailed V3 methodology
 */
export function hasNeedsModelMethodology(policyId: string): boolean {
  return policyId in needsModelMethodologies;
}

/**
 * Get all policy IDs with detailed V3 methodologies
 */
export function getNeedsModelPolicyIds(): string[] {
  return Object.keys(needsModelMethodologies);
}
