import { ImpactScore } from '@/types/policy';

export const policyImpactScores: Record<string, ImpactScore> = {
  // --- TIER 1: THE STRUCTURAL GIANTS ---
  'social-security-cap': {
    totalScore: 80, // Base Score
    breakdown: {
      population: 1.0,
      economic: 1.0,
      intensity: 0.6,
      duration: 0.9,
      equity: 0.8,
      externalities: 0.5,
      implementation: 0.2
    },
    rationale:
      'Affects the financial future of nearly every American with massive economic volume ($Trillions). Mechanically simple to implement (tax code change).',
  },
  'immigration-grand-bargain': {
    totalScore: 76,
    breakdown: {
      population: 0.9,
      economic: 0.7,
      intensity: 0.9,
      duration: 0.8,
      equity: 0.7,
      externalities: 0.9,
      implementation: 0.9
    },
    rationale:
      'Transforms the labor market (Population/Econ) and has existential intensity for migrants. Extremely difficult implementation (border infrastructure/courts).',
  },
  'medicare-drug-negotiation': {
    totalScore: 72,
    breakdown: {
      population: 0.6,
      economic: 0.7,
      intensity: 0.8,
      duration: 0.8,
      equity: 0.8,
      externalities: 0.4,
      implementation: 0.6
    },
    rationale:
      'Directly reduces costs for seniors (High Intensity/Equity). Structural change to the pharmaceutical market (High Economic).',
  },

  // --- TIER 2: MAJOR SOCIAL REFORMS ---
  'universal-pre-k': {
    totalScore: 65,
    breakdown: {
      population: 0.4,
      economic: 0.5,
      intensity: 0.8,
      duration: 0.7,
      equity: 0.8,
      externalities: 0.8,
      implementation: 0.8
    },
    rationale:
      'High intensity for young families. Massive positive externalities for the workforce, but requires building a new nationwide school infrastructure (High Implementation).',
  },
  'childcare-tax-credit': {
    totalScore: 63,
    breakdown: {
      population: 0.5,
      economic: 0.6,
      intensity: 0.6,
      duration: 0.6,
      equity: 0.8,
      externalities: 0.5,
      implementation: 0.2
    },
    rationale:
      'Similar economic benefit to Pre-K but much easier to implement (IRS check vs. building schools).',
  },
  'minimum-wage-17': {
    totalScore: 61,
    breakdown: {
      population: 0.4,
      economic: 0.6,
      intensity: 0.7,
      duration: 0.8,
      equity: 0.9,
      externalities: 0.6,
      implementation: 0.3
    },
    rationale:
      'High Equity score as it targets the working poor. Moderate implementation friction (business compliance).',
  },
  'public-option-healthcare': {
    totalScore: 64,
    breakdown: {
      population: 0.5,
      economic: 0.8,
      intensity: 0.7,
      duration: 0.7,
      equity: 0.7,
      externalities: 0.6,
      implementation: 0.9
    },
    rationale:
      'Massive economic shift, but voluntary nature limits population scope compared to single-payer. Very high implementation complexity.',
  },
  'ultra-millionaire-tax': {
    totalScore: 55,
    breakdown: {
      population: 0.1,
      economic: 0.7,
      intensity: 0.6,
      duration: 0.7,
      equity: 1.0,
      externalities: 0.6,
      implementation: 0.8
    },
    rationale:
      'Maximum Equity score. Low Population score (affects a tiny fraction of households), but high Economic volume. Implementation is difficult due to avoidance/valuation.',
  },

  // --- TIER 3: INFRASTRUCTURE & TECH ---
  'nuclear-energy-expansion': {
    totalScore: 58,
    breakdown: {
      population: 1.0,
      economic: 0.6,
      intensity: 0.2,
      duration: 0.9,
      equity: 0.3,
      externalities: 0.7,
      implementation: 0.9
    },
    rationale:
      'Universal scope (grid reliability) and long duration. Low direct intensity for individuals. Implementation is extremely difficult (regulatory).',
  },
  'rural-broadband-access': {
    totalScore: 51,
    breakdown: {
      population: 0.3,
      economic: 0.4,
      intensity: 0.8,
      duration: 0.9,
      equity: 0.8,
      externalities: 0.6,
      implementation: 0.7
    },
    rationale:
      'Life-changing intensity for the rural minority (High Equity/Intensity). High physical infrastructure costs.',
  },
  'right-to-repair': {
    totalScore: 48,
    breakdown: {
      population: 0.9,
      economic: 0.3,
      intensity: 0.3,
      duration: 0.7,
      equity: 0.5,
      externalities: 0.4,
      implementation: 0.4
    },
    rationale:
      'Broad population reach (everyone owns devices), but low intensity impact per person. Disrupts monopoly externalities.',
  },
  'ai-safety-regulation': {
    totalScore: 45,
    breakdown: {
      population: 1.0,
      economic: 0.4,
      intensity: 0.2,
      duration: 0.7, // bumped from 0.5
      equity: 0.3,
      externalities: 0.9,
      implementation: 0.9
    },
    rationale:
      'Universal reach and massive externalities (safety/truth), but currently low daily intensity. Implementation is speculative and difficult.',
  },
  'buy-american': {
    totalScore: 38,
    breakdown: {
      population: 0.3,
      economic: 0.4,
      intensity: 0.2,
      duration: 0.5,
      equity: 0.4,
      externalities: 0.5,
      implementation: 0.5
    },
    rationale:
      'Affects manufacturing sector. Likely increases costs (negative efficiency) for modest employment gains.',
  },
  'foreign-farmland-ban': {
    totalScore: 32,
    breakdown: {
      population: 0.1,
      economic: 0.2,
      intensity: 0.3,
      duration: 0.6,
      equity: 0.4,
      externalities: 0.5,
      implementation: 0.4
    },
    rationale:
      'Symbolically high, but practically affects a tiny fraction of US land. Mostly a national security preventative measure.',
  },

  // --- TIER 4: TARGETED JUSTICE & SAFETY ---
  'universal-background-checks': {
    totalScore: 43,
    breakdown: {
      population: 0.3,
      economic: 0.1,
      intensity: 0.9,
      duration: 0.7,
      equity: 0.5,
      externalities: 0.5,
      implementation: 0.5
    },
    rationale:
      'High intensity (life/death safety) but low economic volume. Affects gun buyers (subset of pop).',
  },
  'police-accountability': {
    totalScore: 40,
    breakdown: {
      population: 0.2,
      economic: 0.1,
      intensity: 0.9,
      duration: 0.6,
      equity: 0.9,
      externalities: 0.5,
      implementation: 0.6
    },
    rationale:
      'Existential intensity for affected communities (High Equity), but low macroeconomic impact.',
  },
  'kids-online-safety': {
    totalScore: 46,
    breakdown: {
      population: 0.5,
      economic: 0.2,
      intensity: 0.7,
      duration: 0.6,
      equity: 0.5,
      externalities: 0.6,
      implementation: 0.7
    },
    rationale:
      'Targeted demographic (minors) with high intensity (mental health). High implementation friction regarding verification.',
  },
  'mental-health-988': {
    totalScore: 30,
    breakdown: {
      population: 0.2, // bumped from 0.1
      economic: 0.1,
      intensity: 1.0,
      duration: 0.6,
      equity: 0.6,
      externalities: 0.3,
      implementation: 0.3
    },
    rationale:
      'Maximum Intensity (Suicide prevention) but for a relatively small percentage of the population at any given time.',
  },
  'cannabis-banking-safer': {
    totalScore: 35,
    breakdown: {
      population: 0.2,
      economic: 0.3,
      intensity: 0.4,
      duration: 0.6,
      equity: 0.5,
      externalities: 0.3,
      implementation: 0.3
    },
    rationale:
      'Fixes a banking glitch. Important for the industry and safety, but minor impact on the average American.',
  },

  // --- TIER 5: GOVERNANCE & SYMBOLIC (Low Score != Unimportant) ---
  'scotus-term-limits': {
    totalScore: 29,
    breakdown: {
      population: 0.1,
      economic: 0.0,
      intensity: 0.1,
      duration: 1.0,
      equity: 0.5,
      externalities: 0.9,
      implementation: 1.0
    },
    rationale:
      'Constitutional duration and massive political externalities (trust in law), but zero direct economic flow and limited daily impact on citizens.',
  },
  'end-citizens-united': {
    totalScore: 29,
    breakdown: {
      population: 0.1,
      economic: 0.2,
      intensity: 0.1,
      duration: 1.0,
      equity: 0.5,
      externalities: 0.9,
      implementation: 1.0
    },
    rationale:
      'Massive political externality, but very difficult to pass (Implementation 1.0) and indirect impact on daily life.',
  },
  'congress-term-limits': {
    totalScore: 28,
    breakdown: {
      population: 0.1, // was 0.0
      economic: 0.0,
      intensity: 0.3,
      duration: 0.9,
      equity: 0.5,
      externalities: 0.7,
      implementation: 1.0
    },
    rationale:
      'Changes who serves in DC and turnover patterns, but may not dramatically change the overall volume of laws. High implementation hurdle (Amendment).',
  },
  'congress-stock-ban': {
    totalScore: 26,
    breakdown: {
      population: 0.1, // was 0.0
      economic: 0.0,
      intensity: 0.4,
      duration: 0.7,
      equity: 0.5,
      externalities: 0.6,
      implementation: 0.3
    },
    rationale:
      'Directly constrains a small elite (535 members) but has symbolic value for trust in institutions. Minimal macroeconomic impact.',
  },
  'campaign-finance-disclosure': {
    totalScore: 25,
    breakdown: {
      population: 0.1,
      economic: 0.1,
      intensity: 0.1,
      duration: 0.6,
      equity: 0.4,
      externalities: 0.6,
      implementation: 0.4
    },
    rationale:
      'Transparency measure. Important for democracy, low immediate impact on daily cost of living.',
  },
  'free-easy-voter-id': {
    totalScore: 24,
    breakdown: {
      population: 0.1,
      economic: 0.0,
      intensity: 0.6,
      duration: 0.6,
      equity: 0.6,
      externalities: 0.4,
      implementation: 0.4
    },
    rationale:
      'High intensity for the small % of people without IDs, but largely irrelevant for the majority who already have them.',
  },
  'irs-direct-file': {
    totalScore: 22,
    breakdown: {
      population: 0.6, // was 0.4
      economic: 0.1,
      intensity: 0.2,
      duration: 0.5,
      equity: 0.4,
      externalities: 0.2,
      implementation: 0.4
    },
    rationale:
      'Convenience measure. Saves time and money for a large share of filers, but not a structural macroeconomic change.',
  },
  'national-service': {
    totalScore: 21,
    breakdown: {
      population: 0.2, // was 0.1
      economic: 0.1,
      intensity: 0.6,
      duration: 0.4,
      equity: 0.5,
      externalities: 0.5,
      implementation: 0.4
    },
    rationale:
      'Voluntary nature limits actual participation compared to the whole population. High impact on participants, moderate spillover for society.',
  },
  'junk-fee-prevention': {
    totalScore: 39,
    breakdown: {
      population: 0.7,
      economic: 0.2,
      intensity: 0.4,
      duration: 0.5,
      equity: 0.5,
      externalities: 0.3,
      implementation: 0.5
    },
    rationale:
      'Affects most consumers (hotels, tickets, airlines), but the per-transaction savings are modest.',
  },
  'affordable-housing-supply': {
    totalScore: 50,
    breakdown: {
      population: 0.6,
      economic: 0.6,
      intensity: 0.7,
      duration: 0.7,
      equity: 0.6,
      externalities: 0.5,
      implementation: 0.6
    },
    rationale:
      'Supply-side mechanics take time to work. Moderate economic volume via tax credits.',
  },
  'vocational-training': {
    totalScore: 45,
    breakdown: {
      population: 0.3,
      economic: 0.3,
      intensity: 0.7,
      duration: 0.6,
      equity: 0.7,
      externalities: 0.5,
      implementation: 0.4
    },
    rationale:
      'High impact for those involved (career trajectory), but niche population compared to general education.',
  },
};
