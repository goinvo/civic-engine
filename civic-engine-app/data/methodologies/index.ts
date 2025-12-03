/**
 * V2 Methodology: 13-Factor Political Economy Policy Scoring
 *
 * This module contains the detailed methodology, scoring rubrics, and evidence-based
 * reasoning for each policy's factor scores.
 *
 * Methodology:
 * We assign each policy factor a score between 0.0 (low alignment) and 1.0 (high alignment)
 * by comparing the policy's characteristics to the rubric's anchor descriptions. For consistency,
 * we derive key questions from each factor's definition and rely on real-world evidence
 * (empirical studies, policy analyses) and political-economic theory to justify each score.
 */

// ============================================
// TYPES
// ============================================

export interface FactorScore {
  score: number;
  reasoning: string;
  keyPoints: string[];
  sources?: string[];
}

export interface PolicyMethodology {
  policyId: string;
  policyName: string;
  description: string;
  factors: {
    hayek: FactorScore;
    ostrom: FactorScore;
    downs: FactorScore;
    olson: FactorScore;
    keynes: FactorScore;
    pettit: FactorScore;
    hirschman: FactorScore;
    buchanan: FactorScore;
    polanyi: FactorScore;
    rawls: FactorScore;
    george: FactorScore;
    acemoglu: FactorScore;
    walzer: FactorScore;
  };
  overallRationale: string;
  modifiers?: {
    id: string;
    name: string;
    description: string;
    factorChanges: Partial<Record<keyof PolicyMethodology['factors'], number>>;
  }[];
}

// ============================================
// FACTOR DEFINITIONS
// ============================================

export const FACTOR_DEFINITIONS = {
  hayek: {
    name: 'Info Feasibility',
    thinker: 'Hayek',
    keyQuestion: 'Does the policy require centralized bureaucracy or leverage local knowledge and choice?',
    lowAnchor: 'Requires bureaucratic omniscience or central planning',
    highAnchor: 'Leverages decentralized price signals and personal knowledge',
  },
  ostrom: {
    name: 'Scale Match',
    thinker: 'Ostrom',
    keyQuestion: 'Does the policy match decision-making power to the scope of the problem?',
    lowAnchor: 'Top-down, mismatched scale (too centralized or too fragmented)',
    highAnchor: 'Polycentric: decision power matches problem scope',
  },
  downs: {
    name: 'Legibility',
    thinker: 'Downs',
    keyQuestion: 'Is the policy simple and transparent or complex with hidden costs?',
    lowAnchor: 'Opaque, complex, hidden trade-offs, hard to audit',
    highAnchor: 'Simple "if X then Y" rule, transparent costs/benefits',
  },
  olson: {
    name: 'Anti-Capture',
    thinker: 'Olson',
    keyQuestion: 'Is the policy resistant to special interest capture?',
    lowAnchor: 'Vulnerable to lobbying, earmarks, or rent-seeking',
    highAnchor: 'Robust against capture: broad-based, automatic, transparent',
  },
  keynes: {
    name: 'Stability',
    thinker: 'Keynes',
    keyQuestion: 'Does the policy stabilize the economy during downturns?',
    lowAnchor: 'Pro-cyclical: amplifies booms and busts',
    highAnchor: 'Counter-cyclical: automatic stabilizer, maintains demand',
  },
  pettit: {
    name: 'Non-Domination',
    thinker: 'Pettit',
    keyQuestion: 'Does the policy reduce arbitrary power over individuals?',
    lowAnchor: 'Creates or maintains dependence on arbitrary will of others',
    highAnchor: 'Provides independence, "F-you money," reduces coercion',
  },
  hirschman: {
    name: 'Exit/Voice',
    thinker: 'Hirschman',
    keyQuestion: 'Does the policy enhance people\'s ability to exit bad situations or voice grievances?',
    lowAnchor: 'People are trapped, no exit, voice is ignored',
    highAnchor: 'Easy to switch providers, voice is amplified and heard',
  },
  buchanan: {
    name: 'Consent',
    thinker: 'Buchanan',
    keyQuestion: 'Does the policy approach near-unanimous consent or Pareto improvement?',
    lowAnchor: 'Imposed on minorities without compensation, creates clear losers',
    highAnchor: 'Broad-based benefits, losers compensated, approaches Pareto',
  },
  polanyi: {
    name: 'Protection',
    thinker: 'Polanyi',
    keyQuestion: 'Does the policy buffer people from pure market logic for essential needs?',
    lowAnchor: 'Commodifies essentials, market determines survival',
    highAnchor: 'De-commodifies necessities, provides social buffer',
  },
  rawls: {
    name: 'The Floor',
    thinker: 'Rawls',
    keyQuestion: 'Does the policy primarily benefit the worst-off in society?',
    lowAnchor: 'Regressive: benefits mostly flow to the already advantaged',
    highAnchor: 'Maximin: maximizes the minimum, lifts the floor',
  },
  george: {
    name: 'Rent Target',
    thinker: 'George',
    keyQuestion: 'Does the policy tax unearned income (rent) rather than productive labor?',
    lowAnchor: 'Taxes labor/production, ignores or subsidizes rent extraction',
    highAnchor: 'Captures economic rent (land, monopoly, pollution rights)',
  },
  acemoglu: {
    name: 'Inclusivity',
    thinker: 'Acemoglu',
    keyQuestion: 'Does the policy create or reinforce inclusive economic institutions?',
    lowAnchor: 'Extractive: benefits narrow elite, high barriers to entry',
    highAnchor: 'Inclusive: broad access, level playing field, shared growth',
  },
  walzer: {
    name: 'Sphere Justice',
    thinker: 'Walzer',
    keyQuestion: 'Does the policy distribute goods by appropriate criteria for their sphere?',
    lowAnchor: 'Corrupt: money buys everything, spheres collapse',
    highAnchor: 'Appropriate criteria for each good (need, merit, citizenship)',
  },
};

// ============================================
// IMPORT INDIVIDUAL POLICY METHODOLOGIES
// ============================================

import { universalBasicIncome } from './universal-basic-income';
import { federalJobGuarantee } from './federal-job-guarantee';
import { medicareForAll } from './medicare-for-all';
import { kidsOnlineSafetyAct } from './kids-online-safety-act';
import { universalBackgroundChecks } from './universal-background-checks';
import { freeAndEasyVoterId } from './free-and-easy-voter-id';
import { junkFeePrevention } from './junk-fee-prevention';
import { expandedChildTaxCredit } from './expanded-child-tax-credit';
import { supremeCourtTermLimits } from './supreme-court-term-limits';
import { ultraMillionaireWealthTax } from './ultra-millionaire-wealth-tax';
import { overturnCitizensUnited } from './overturn-citizens-united';
import { nationalServiceVoluntary } from './national-service-voluntary';
import { simplifiedTaxFiling } from './simplified-tax-filing';
import { socialSecurityCap } from './social-security-cap';
import { congressStockBan } from './congress-stock-ban';
import { congressTermLimits } from './congress-term-limits';
import { rightToRepair } from './right-to-repair';
import { medicareDrugNegotiation } from './medicare-drug-negotiation';
import { aiSafetyRegulation } from './ai-safety-regulation';
import { policeAccountabilityStandards } from './police-accountability-standards';
import { affordableHousingSupply } from './affordable-housing-supply';
import { mentalHealthLifeline988 } from './mental-health-lifeline-988';
import { foreignFarmlandOwnershipBan } from './foreign-farmland-ownership-ban';
import { ruralBroadbandAccess } from './rural-broadband-access';
import { campaignFinanceDisclosure } from './campaign-finance-disclosure';
import { immigrationGrandBargain } from './immigration-grand-bargain';

// ============================================
// COMBINED METHODOLOGIES
// ============================================

export const policyMethodologies: Record<string, PolicyMethodology> = {
  'universal-basic-income': universalBasicIncome,
  'federal-job-guarantee': federalJobGuarantee,
  'medicare-for-all': medicareForAll,
  'kids-online-safety-act': kidsOnlineSafetyAct,
  'universal-background-checks': universalBackgroundChecks,
  'free-and-easy-voter-id': freeAndEasyVoterId,
  'junk-fee-prevention': junkFeePrevention,
  'expanded-child-tax-credit': expandedChildTaxCredit,
  'supreme-court-term-limits': supremeCourtTermLimits,
  'ultra-millionaire-wealth-tax': ultraMillionaireWealthTax,
  'overturn-citizens-united': overturnCitizensUnited,
  'national-service-voluntary': nationalServiceVoluntary,
  'simplified-tax-filing': simplifiedTaxFiling,
  'social-security-cap': socialSecurityCap,
  'congress-stock-ban': congressStockBan,
  'congress-term-limits': congressTermLimits,
  'right-to-repair': rightToRepair,
  'medicare-drug-negotiation': medicareDrugNegotiation,
  'ai-safety-regulation': aiSafetyRegulation,
  'police-accountability-standards': policeAccountabilityStandards,
  'affordable-housing-supply': affordableHousingSupply,
  'mental-health-lifeline-988': mentalHealthLifeline988,
  'foreign-farmland-ownership-ban': foreignFarmlandOwnershipBan,
  'rural-broadband-access': ruralBroadbandAccess,
  'campaign-finance-disclosure': campaignFinanceDisclosure,
  'immigration-grand-bargain': immigrationGrandBargain,
};

// ============================================
// HELPER FUNCTIONS
// ============================================

export function getMethodology(policyId: string): PolicyMethodology | undefined {
  return policyMethodologies[policyId];
}

export function hasMethodology(policyId: string): boolean {
  return policyId in policyMethodologies;
}

export function getAllMethodologies(): PolicyMethodology[] {
  return Object.values(policyMethodologies);
}

export function getFactorDefinition(factorId: keyof typeof FACTOR_DEFINITIONS) {
  return FACTOR_DEFINITIONS[factorId];
}
