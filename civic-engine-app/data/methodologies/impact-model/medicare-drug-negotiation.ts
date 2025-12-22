import { V1PolicyMethodology } from '../../v1Methodology';

export const medicareDrugNegotiationMethodology: V1PolicyMethodology = {
  policyId: 'medicare-drug-negotiation',
  policyName: 'Medicare Drug Price Negotiation',
  description: 'Allow Medicare to negotiate prescription drug prices directly with pharmaceutical companies.',
  totalScore: 72,
  tier: 'TIER 1: THE STRUCTURAL GIANTS',
  factors: {
    population: {
      score: 0.6,
      reasoning: 'Directly affects Medicare beneficiaries (65M+) and indirectly affects private insurance pricing.',
      keyPoints: [
        'Over 65 million Medicare beneficiaries',
        'Spillover effects to private insurance markets',
        'Particularly affects those with chronic conditions',
      ],
    },
    economic: {
      score: 0.7,
      reasoning: 'Massive economic shift in the pharmaceutical market, potentially $100B+ in savings.',
      keyPoints: [
        'Medicare spends ~$200B/year on prescription drugs',
        'Potential 30-50% price reductions on negotiated drugs',
        'Restructures pharma revenue streams significantly',
      ],
    },
    intensity: {
      score: 0.8,
      reasoning: 'High intensity for seniors on expensive medications - can mean life-or-death affordability.',
      keyPoints: [
        'Many seniors choose between food and medication',
        'Some drugs cost thousands per month',
        'Reduces financial stress and improves health outcomes',
      ],
    },
    duration: {
      score: 0.8,
      reasoning: 'Permanent change to how drug prices are set in the largest market.',
      keyPoints: [
        'Establishes ongoing negotiation framework',
        'Precedent affects future drug pricing',
        'Structural change to pharma business model',
      ],
    },
    equity: {
      score: 0.8,
      reasoning: 'Strongly progressive - seniors are often on fixed incomes and most affected by high drug costs.',
      keyPoints: [
        'Seniors have highest medication burden',
        'Low-income seniors benefit most',
        'Reduces healthcare cost inequality',
      ],
    },
    externalities: {
      score: 0.4,
      reasoning: 'Some concern about R&D investment, but primarily contained to healthcare sector.',
      keyPoints: [
        'Potential (debated) impact on drug innovation',
        'May influence global drug pricing norms',
        'Political precedent for price regulation',
      ],
    },
    implementation: {
      score: 0.6,
      reasoning: 'Requires new government negotiation infrastructure and ongoing processes.',
      keyPoints: [
        'Need to build negotiation capacity at HHS',
        'Pharma lobbying creates political friction',
        'Already partially implemented via IRA 2022',
      ],
    },
  },
  overallRationale: 'Directly reduces costs for seniors (High Intensity/Equity). Structural change to the pharmaceutical market (High Economic).',
};
