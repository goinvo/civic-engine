import { V2ImpactScore } from '@/types/consensus';

/**
 * V2 Policy Impact Scores using the 13-Factor Political Economy Framework
 *
 * PLACEHOLDER DATA - User will provide real scoring data
 *
 * Each policy is scored on:
 * - base: Mill Layer (utilitarian magnitude: population, economic, intensity)
 * - factors: 13 Political Economy factors (0.0 - 1.0)
 *
 * Factor Reference:
 * - hayek: Info Feasibility (Central Planning 0 → Decentralized 1)
 * - ostrom: Scale Match (Mismatched 0 → Polycentric 1)
 * - downs: Legibility (Opaque 0 → Clear 1)
 * - olson: Anti-Capture (Vulnerable 0 → Robust 1)
 * - keynes: Stability (Pro-Cyclical 0 → Counter-Cyclical 1)
 * - pettit: Non-Domination (Dependent 0 → Independent 1)
 * - hirschman: Exit/Voice (Trapped 0 → Agency 1)
 * - buchanan: Consent (Imposed 0 → Pareto 1)
 * - polanyi: Protection (Commodified 0 → Buffered 1)
 * - rawls: The Floor (Regressive 0 → Maximin 1)
 * - george: Rent Target (Penalizes Labor 0 → Captures Rent 1)
 * - acemoglu: Inclusivity (Extractive 0 → Inclusive 1)
 * - walzer: Sphere Justice (Corrupt 0 → Appropriate 1)
 */

export const policyImpactScoresV2: Record<string, V2ImpactScore> = {
  // ===========================================
  // POLICIES WITH FULL METHODOLOGY (Evidence-Based)
  // See data/v2Methodology.ts for detailed reasoning
  // ===========================================

  'universal-basic-income': {
    base: { population: 1.0, economic: 0.9, intensity: 0.8 },
    factors: {
      hayek: 0.9,      // Highly decentralized - cash leverages individual choice
      ostrom: 0.3,     // National one-size-fits-all, no local adjustment
      downs: 1.0,      // Extremely simple: "Every citizen gets $X"
      olson: 0.7,      // Universal nature resists capture
      keynes: 1.0,     // Ultimate automatic stabilizer
      pettit: 1.0,     // Provides "F-you money" - freedom from domination
      hirschman: 0.8,  // Expands exit options from bad situations
      buchanan: 0.6,   // Universal but has clear losers (wealthy taxpayers)
      polanyi: 0.9,    // De-commodifies basic portion of life
      rawls: 1.0,      // Primary benefit flows to worst-off
      george: 0.2,     // Depends on funding - most proposals use income/VAT
      acemoglu: 0.8,   // Inclusive - no gatekeepers, levels playing field
      walzer: 0.7,     // Upholds equality in basic needs sphere
    },
    rationale: 'UBI scores exceptionally high on simplicity (Downs 1.0), stability (Keynes 1.0), non-domination (Pettit 1.0), and helping the worst-off (Rawls 1.0). Main weaknesses: scale mismatch (Ostrom 0.3) due to uniform national benefit, and rent targeting (George 0.2) depends on funding mechanism.',
    methodologyId: 'universal-basic-income',
  },

  'federal-job-guarantee': {
    base: { population: 0.8, economic: 0.9, intensity: 0.9 },
    factors: {
      hayek: 0.5,      // More centralized but local implementation
      ostrom: 0.8,     // Polycentric: federal funding, local execution
      downs: 0.7,      // Simple promise, complex execution
      olson: 0.6,      // Universal availability, some patronage risk
      keynes: 1.0,     // Ultimate automatic stabilizer - buffer stock of jobs
      pettit: 0.9,     // Eliminates threat of unemployment
      hirschman: 1.0,  // Any worker can exit to guaranteed job
      buchanan: 0.4,   // Creates clear losers (taxpayers, low-wage employers)
      polanyi: 1.0,    // Decommodifies labor completely
      rawls: 0.9,      // Primarily benefits worst-off workers
      george: 0.3,     // Spending program, not rent-targeted tax
      acemoglu: 0.8,   // Opens employment to everyone
      walzer: 0.9,     // Right to work as social good
    },
    rationale: 'FJG scores highest on stability (Keynes 1.0), exit/voice (Hirschman 1.0), and protection (Polanyi 1.0). It is the ultimate decommodification of labor. Lower scores on consent (Buchanan 0.4) due to clear losers and rent targeting (George 0.3) as a spending program.',
    methodologyId: 'federal-job-guarantee',
  },

  'medicare-for-all': {
    base: { population: 1.0, economic: 0.9, intensity: 0.9 },
    factors: {
      hayek: 0.3,      // Centralized financing and price-setting
      ostrom: 0.7,     // National pooling makes sense, can have regional admin
      downs: 0.9,      // One payer, one set of rules - extremely simple
      olson: 0.5,      // Eliminates insurer capture, but pharma/hospital lobbying
      keynes: 0.6,     // Decouples insurance from employment
      pettit: 0.8,     // Frees people from employer/insurer domination
      hirschman: 0.7,  // Free choice of provider, democratic voice
      buchanan: 0.5,   // Clear losers (insurance industry, some wealthy)
      polanyi: 1.0,    // Prime example of decommodifying vital need
      rawls: 1.0,      // Strongly prioritizes worst-off
      george: 0.6,     // Captures some healthcare rents (pharma, hospitals)
      acemoglu: 0.9,   // Ensures everyone can participate in society
      walzer: 1.0,     // Health care distributed by need, not money
    },
    rationale: 'M4A scores highest on protection (Polanyi 1.0), the floor (Rawls 1.0), and sphere justice (Walzer 1.0) - embodying the principle that healthcare should be distributed by need. Lower on info feasibility (Hayek 0.3) due to central financing and consent (Buchanan 0.5) due to concentrated losers.',
    methodologyId: 'medicare-for-all',
  },

  // ===========================================
  // TIER 1: STRUCTURAL GIANTS (87%+ support)
  // ===========================================

  'social-security-cap': {
    base: { population: 1.0, economic: 1.0, intensity: 0.6 },
    factors: {
      hayek: 0.3,      // Moderate - uses existing tax infrastructure
      ostrom: 0.7,     // High - federal level matches problem scope
      downs: 0.8,      // High - simple "donut hole" concept
      olson: 0.6,      // Moderate - some capture risk from wealthy
      keynes: 0.9,     // High - automatic stabilizer
      pettit: 0.8,     // High - reduces dependence on arbitrary cuts
      hirschman: 0.5,  // Moderate - no real exit option
      buchanan: 0.7,   // High - most consent (87% support)
      polanyi: 0.9,    // High - buffers retirement security
      rawls: 0.8,      // High - protects worst-off retirees
      george: 0.6,     // Moderate - taxes wages, not rent
      acemoglu: 0.7,   // High - inclusive, universal program
      walzer: 0.8,     // High - appropriate criterion (need/contribution)
    },
    rationale: 'PLACEHOLDER - Awaiting real scoring data. High consensus policy with strong utilitarian and justice scores.',
  },

  'congress-stock-ban': {
    base: { population: 0.3, economic: 0.2, intensity: 0.2 },
    factors: {
      hayek: 0.5,      // Neutral - restricts market participation
      ostrom: 0.8,     // High - federal level appropriate
      downs: 0.9,      // Very high - clear, simple rule
      olson: 0.9,      // Very high - anti-capture by design
      keynes: 0.3,     // Low - not economic stabilizer
      pettit: 0.7,     // High - reduces domination by insiders
      hirschman: 0.8,  // High - voice through voting
      buchanan: 0.9,   // Very high - near universal consent
      polanyi: 0.3,    // Low - not about de-commodification
      rawls: 0.4,      // Moderate - symbolic, not redistributive
      george: 0.5,     // Neutral - targets corruption, not rent
      acemoglu: 0.9,   // Very high - inclusive governance
      walzer: 0.9,     // Very high - correct criterion (merit not money)
    },
    rationale: 'PLACEHOLDER - Awaiting real scoring data. Governance reform with strong anti-capture and legibility scores.',
  },

  'congress-term-limits': {
    base: { population: 0.8, economic: 0.1, intensity: 0.3 },
    factors: {
      hayek: 0.4,      // Moderate - constrains emergent order
      ostrom: 0.5,     // Moderate - federal level appropriate
      downs: 0.8,      // High - simple concept
      olson: 0.7,      // High - reduces entrenchment
      keynes: 0.2,     // Low - not stabilizer
      pettit: 0.6,     // Moderate - reduces some domination
      hirschman: 0.6,  // Moderate - increases voice through turnover
      buchanan: 0.8,   // High - broad public consent
      polanyi: 0.2,    // Low - not about protection
      rawls: 0.4,      // Moderate - unclear distributional impact
      george: 0.3,     // Low - not rent-related
      acemoglu: 0.7,   // High - more inclusive representation
      walzer: 0.6,     // Moderate - debatable criterion
    },
    rationale: 'PLACEHOLDER - Awaiting real scoring data. Governance reform with moderate institutional impact.',
  },

  'right-to-repair': {
    base: { population: 0.7, economic: 0.4, intensity: 0.5 },
    factors: {
      hayek: 0.8,      // High - enables market competition
      ostrom: 0.6,     // Moderate - could be state or federal
      downs: 0.7,      // High - clear consumer right
      olson: 0.7,      // High - fights manufacturer capture
      keynes: 0.3,     // Low - not stabilizer
      pettit: 0.8,     // High - reduces manufacturer domination
      hirschman: 0.9,  // Very high - enables exit from vendor lock-in
      buchanan: 0.7,   // High - broad consent
      polanyi: 0.4,    // Moderate - partially de-commodifies repair
      rawls: 0.5,      // Moderate - helps lower-income through savings
      george: 0.5,     // Neutral - not rent-focused
      acemoglu: 0.8,   // High - opens market to repair shops
      walzer: 0.7,     // High - property rights criterion
    },
    rationale: 'PLACEHOLDER - Awaiting real scoring data. Consumer rights policy with strong exit/voice and inclusivity.',
  },

  'medicare-drug-negotiation': {
    base: { population: 0.6, economic: 0.8, intensity: 0.8 },
    factors: {
      hayek: 0.3,      // Low - central negotiation
      ostrom: 0.6,     // Moderate - federal matches Medicare scope
      downs: 0.6,      // Moderate - complex implementation
      olson: 0.5,      // Moderate - pharma capture risk
      keynes: 0.4,     // Moderate - some stabilizing effect
      pettit: 0.7,     // High - reduces pharma domination
      hirschman: 0.4,  // Low - no real exit from Medicare
      buchanan: 0.7,   // High - broad support
      polanyi: 0.8,    // High - de-commodifies essential medicines
      rawls: 0.8,      // High - helps vulnerable elderly
      george: 0.4,     // Moderate - targets some pharma rent
      acemoglu: 0.6,   // Moderate - mixed inclusivity impact
      walzer: 0.8,     // High - need-based healthcare
    },
    rationale: 'PLACEHOLDER - Awaiting real scoring data. Healthcare policy with strong protection and floor scores.',
  },

  'ai-safety-regulation': {
    base: { population: 0.9, economic: 0.7, intensity: 0.6 },
    factors: {
      hayek: 0.4,      // Moderate - some central planning
      ostrom: 0.5,     // Moderate - global/federal mismatch
      downs: 0.5,      // Moderate - complex, evolving
      olson: 0.5,      // Moderate - tech industry capture risk
      keynes: 0.4,     // Moderate - uncertain stabilizing
      pettit: 0.7,     // High - prevents AI domination
      hirschman: 0.5,  // Moderate - unclear exit options
      buchanan: 0.6,   // Moderate - emerging consensus
      polanyi: 0.6,    // Moderate - protects from automation
      rawls: 0.5,      // Moderate - uncertain distribution
      george: 0.4,     // Low - not rent-focused
      acemoglu: 0.7,   // High - inclusive tech development
      walzer: 0.6,     // Moderate - appropriate tech governance
    },
    rationale: 'PLACEHOLDER - Awaiting real scoring data. Technology policy with moderate scores across factors.',
  },

  'rural-broadband-access': {
    base: { population: 0.4, economic: 0.5, intensity: 0.7 },
    factors: {
      hayek: 0.4,      // Moderate - public investment
      ostrom: 0.7,     // High - local/federal mix
      downs: 0.7,      // High - clear infrastructure
      olson: 0.6,      // Moderate - telecom capture risk
      keynes: 0.5,     // Moderate - infrastructure stimulus
      pettit: 0.7,     // High - reduces digital divide
      hirschman: 0.6,  // Moderate - enables market exit
      buchanan: 0.7,   // High - broad support
      polanyi: 0.6,    // Moderate - essential service
      rawls: 0.7,      // High - helps rural poor
      george: 0.4,     // Low - not rent-focused
      acemoglu: 0.8,   // High - inclusive access
      walzer: 0.7,     // High - utility criterion
    },
    rationale: 'PLACEHOLDER - Awaiting real scoring data. Infrastructure policy with strong inclusivity.',
  },

  'campaign-finance-disclosure': {
    base: { population: 0.8, economic: 0.3, intensity: 0.3 },
    factors: {
      hayek: 0.6,      // Moderate - information transparency
      ostrom: 0.7,     // High - federal level appropriate
      downs: 0.9,      // Very high - transparency by design
      olson: 0.8,      // High - anti-capture mechanism
      keynes: 0.2,     // Low - not stabilizer
      pettit: 0.7,     // High - reduces hidden domination
      hirschman: 0.7,  // High - informed voice
      buchanan: 0.8,   // High - broad consent
      polanyi: 0.3,    // Low - not about protection
      rawls: 0.5,      // Moderate - helps democracy
      george: 0.4,     // Low - doesn't capture rent
      acemoglu: 0.8,   // High - inclusive democracy
      walzer: 0.8,     // High - appropriate political criterion
    },
    rationale: 'PLACEHOLDER - Awaiting real scoring data. Governance reform with strong legibility.',
  },

  'immigration-grand-bargain': {
    base: { population: 0.5, economic: 0.8, intensity: 0.9 },
    factors: {
      hayek: 0.6,      // Moderate - market-friendly
      ostrom: 0.6,     // Moderate - federal matches scope
      downs: 0.5,      // Moderate - complex package
      olson: 0.5,      // Moderate - various capture risks
      keynes: 0.5,     // Moderate - mixed stability
      pettit: 0.7,     // High - pathway reduces domination
      hirschman: 0.7,  // High - enables legal voice
      buchanan: 0.6,   // Moderate - contested consent
      polanyi: 0.6,    // Moderate - worker protections
      rawls: 0.6,      // Moderate - helps worst-off immigrants
      george: 0.4,     // Low - not rent-focused
      acemoglu: 0.7,   // High - more inclusive institutions
      walzer: 0.6,     // Moderate - balances membership criteria
    },
    rationale: 'PLACEHOLDER - Awaiting real scoring data. Comprehensive reform with moderate-high scores.',
  },

  'vocational-training': {
    base: { population: 0.5, economic: 0.5, intensity: 0.7 },
    factors: {
      hayek: 0.7,      // High - market-responsive training
      ostrom: 0.7,     // High - local/state matches
      downs: 0.7,      // High - clear skills pathway
      olson: 0.6,      // Moderate - industry involvement
      keynes: 0.6,     // Moderate - counter-cyclical potential
      pettit: 0.7,     // High - economic independence
      hirschman: 0.8,  // High - career mobility
      buchanan: 0.8,   // High - broad support
      polanyi: 0.5,    // Moderate - partial protection
      rawls: 0.7,      // High - helps non-college track
      george: 0.4,     // Low - not rent-focused
      acemoglu: 0.8,   // High - inclusive opportunity
      walzer: 0.7,     // High - merit-based advancement
    },
    rationale: 'PLACEHOLDER - Awaiting real scoring data. Education policy with strong inclusivity.',
  },

  // ===========================================
  // REMAINING POLICIES (Placeholder structure)
  // ===========================================

  'kids-online-safety': {
    base: { population: 0.4, economic: 0.3, intensity: 0.7 },
    factors: {
      hayek: 0.4, ostrom: 0.5, downs: 0.6, olson: 0.5, keynes: 0.3,
      pettit: 0.7, hirschman: 0.5, buchanan: 0.7, polanyi: 0.7,
      rawls: 0.6, george: 0.3, acemoglu: 0.6, walzer: 0.7,
    },
    rationale: 'PLACEHOLDER - Awaiting real scoring data.',
  },

  'universal-background-checks': {
    base: { population: 0.8, economic: 0.2, intensity: 0.6 },
    factors: {
      hayek: 0.5, ostrom: 0.6, downs: 0.8, olson: 0.5, keynes: 0.2,
      pettit: 0.6, hirschman: 0.4, buchanan: 0.7, polanyi: 0.6,
      rawls: 0.6, george: 0.3, acemoglu: 0.6, walzer: 0.7,
    },
    rationale: 'PLACEHOLDER - Awaiting real scoring data.',
  },

  'free-easy-voter-id': {
    base: { population: 0.9, economic: 0.2, intensity: 0.4 },
    factors: {
      hayek: 0.5, ostrom: 0.6, downs: 0.8, olson: 0.7, keynes: 0.2,
      pettit: 0.7, hirschman: 0.7, buchanan: 0.8, polanyi: 0.3,
      rawls: 0.6, george: 0.3, acemoglu: 0.8, walzer: 0.8,
    },
    rationale: 'PLACEHOLDER - Awaiting real scoring data.',
  },

  'junk-fee-prevention': {
    base: { population: 0.8, economic: 0.4, intensity: 0.5 },
    factors: {
      hayek: 0.6, ostrom: 0.6, downs: 0.9, olson: 0.7, keynes: 0.3,
      pettit: 0.7, hirschman: 0.8, buchanan: 0.8, polanyi: 0.5,
      rawls: 0.6, george: 0.5, acemoglu: 0.7, walzer: 0.8,
    },
    rationale: 'PLACEHOLDER - Awaiting real scoring data.',
  },

  'childcare-tax-credit': {
    base: { population: 0.4, economic: 0.5, intensity: 0.8 },
    factors: {
      hayek: 0.6, ostrom: 0.6, downs: 0.7, olson: 0.6, keynes: 0.6,
      pettit: 0.7, hirschman: 0.6, buchanan: 0.7, polanyi: 0.7,
      rawls: 0.7, george: 0.4, acemoglu: 0.7, walzer: 0.7,
    },
    rationale: 'PLACEHOLDER - Awaiting real scoring data.',
  },

  'scotus-term-limits': {
    base: { population: 0.9, economic: 0.1, intensity: 0.4 },
    factors: {
      hayek: 0.4, ostrom: 0.5, downs: 0.7, olson: 0.7, keynes: 0.2,
      pettit: 0.6, hirschman: 0.6, buchanan: 0.7, polanyi: 0.2,
      rawls: 0.4, george: 0.3, acemoglu: 0.7, walzer: 0.6,
    },
    rationale: 'PLACEHOLDER - Awaiting real scoring data.',
  },

  'ultra-millionaire-tax': {
    base: { population: 0.3, economic: 0.9, intensity: 0.4 },
    factors: {
      hayek: 0.3, ostrom: 0.7, downs: 0.6, olson: 0.4, keynes: 0.6,
      pettit: 0.6, hirschman: 0.4, buchanan: 0.6, polanyi: 0.5,
      rawls: 0.9, george: 0.7, acemoglu: 0.6, walzer: 0.6,
    },
    rationale: 'PLACEHOLDER - Awaiting real scoring data.',
  },

  'end-citizens-united': {
    base: { population: 0.9, economic: 0.4, intensity: 0.4 },
    factors: {
      hayek: 0.4, ostrom: 0.7, downs: 0.7, olson: 0.8, keynes: 0.2,
      pettit: 0.7, hirschman: 0.7, buchanan: 0.7, polanyi: 0.3,
      rawls: 0.5, george: 0.4, acemoglu: 0.8, walzer: 0.8,
    },
    rationale: 'PLACEHOLDER - Awaiting real scoring data.',
  },

  'national-service': {
    base: { population: 0.6, economic: 0.4, intensity: 0.6 },
    factors: {
      hayek: 0.4, ostrom: 0.6, downs: 0.6, olson: 0.5, keynes: 0.5,
      pettit: 0.5, hirschman: 0.5, buchanan: 0.5, polanyi: 0.5,
      rawls: 0.6, george: 0.4, acemoglu: 0.7, walzer: 0.6,
    },
    rationale: 'PLACEHOLDER - Awaiting real scoring data.',
  },

  'irs-direct-file': {
    base: { population: 0.7, economic: 0.3, intensity: 0.5 },
    factors: {
      hayek: 0.4, ostrom: 0.7, downs: 0.8, olson: 0.7, keynes: 0.3,
      pettit: 0.7, hirschman: 0.8, buchanan: 0.8, polanyi: 0.4,
      rawls: 0.6, george: 0.4, acemoglu: 0.7, walzer: 0.7,
    },
    rationale: 'PLACEHOLDER - Awaiting real scoring data.',
  },

  'foreign-farmland-ban': {
    base: { population: 0.3, economic: 0.3, intensity: 0.4 },
    factors: {
      hayek: 0.3, ostrom: 0.5, downs: 0.7, olson: 0.6, keynes: 0.2,
      pettit: 0.5, hirschman: 0.4, buchanan: 0.7, polanyi: 0.6,
      rawls: 0.4, george: 0.6, acemoglu: 0.4, walzer: 0.5,
    },
    rationale: 'PLACEHOLDER - Awaiting real scoring data.',
  },

  'minimum-wage-17': {
    base: { population: 0.4, economic: 0.6, intensity: 0.8 },
    factors: {
      hayek: 0.3, ostrom: 0.5, downs: 0.8, olson: 0.5, keynes: 0.6,
      pettit: 0.7, hirschman: 0.5, buchanan: 0.6, polanyi: 0.8,
      rawls: 0.9, george: 0.5, acemoglu: 0.6, walzer: 0.7,
    },
    rationale: 'PLACEHOLDER - Awaiting real scoring data.',
  },

  'public-option-healthcare': {
    base: { population: 0.6, economic: 0.8, intensity: 0.9 },
    factors: {
      hayek: 0.4, ostrom: 0.6, downs: 0.5, olson: 0.5, keynes: 0.6,
      pettit: 0.7, hirschman: 0.7, buchanan: 0.6, polanyi: 0.9,
      rawls: 0.8, george: 0.4, acemoglu: 0.7, walzer: 0.8,
    },
    rationale: 'PLACEHOLDER - Awaiting real scoring data.',
  },

  'nuclear-energy-expansion': {
    base: { population: 0.8, economic: 0.8, intensity: 0.5 },
    factors: {
      hayek: 0.5, ostrom: 0.5, downs: 0.5, olson: 0.5, keynes: 0.6,
      pettit: 0.5, hirschman: 0.4, buchanan: 0.6, polanyi: 0.5,
      rawls: 0.5, george: 0.4, acemoglu: 0.6, walzer: 0.5,
    },
    rationale: 'PLACEHOLDER - Awaiting real scoring data.',
  },

  'police-accountability': {
    base: { population: 0.6, economic: 0.3, intensity: 0.9 },
    factors: {
      hayek: 0.4, ostrom: 0.6, downs: 0.7, olson: 0.6, keynes: 0.2,
      pettit: 0.9, hirschman: 0.7, buchanan: 0.6, polanyi: 0.5,
      rawls: 0.8, george: 0.3, acemoglu: 0.8, walzer: 0.8,
    },
    rationale: 'PLACEHOLDER - Awaiting real scoring data.',
  },

  'affordable-housing-supply': {
    base: { population: 0.5, economic: 0.7, intensity: 0.8 },
    factors: {
      hayek: 0.6, ostrom: 0.6, downs: 0.5, olson: 0.5, keynes: 0.5,
      pettit: 0.7, hirschman: 0.6, buchanan: 0.6, polanyi: 0.8,
      rawls: 0.8, george: 0.7, acemoglu: 0.7, walzer: 0.7,
    },
    rationale: 'PLACEHOLDER - Awaiting real scoring data.',
  },

  'mental-health-988': {
    base: { population: 0.4, economic: 0.3, intensity: 0.9 },
    factors: {
      hayek: 0.5, ostrom: 0.7, downs: 0.8, olson: 0.6, keynes: 0.4,
      pettit: 0.7, hirschman: 0.6, buchanan: 0.8, polanyi: 0.8,
      rawls: 0.8, george: 0.3, acemoglu: 0.7, walzer: 0.8,
    },
    rationale: 'PLACEHOLDER - Awaiting real scoring data.',
  },

  'cannabis-banking-safer': {
    base: { population: 0.3, economic: 0.4, intensity: 0.6 },
    factors: {
      hayek: 0.7, ostrom: 0.6, downs: 0.7, olson: 0.6, keynes: 0.3,
      pettit: 0.6, hirschman: 0.7, buchanan: 0.6, polanyi: 0.4,
      rawls: 0.5, george: 0.4, acemoglu: 0.7, walzer: 0.6,
    },
    rationale: 'PLACEHOLDER - Awaiting real scoring data.',
  },

  'universal-pre-k': {
    base: { population: 0.4, economic: 0.6, intensity: 0.8 },
    factors: {
      hayek: 0.4, ostrom: 0.6, downs: 0.7, olson: 0.5, keynes: 0.6,
      pettit: 0.7, hirschman: 0.5, buchanan: 0.7, polanyi: 0.8,
      rawls: 0.9, george: 0.4, acemoglu: 0.8, walzer: 0.7,
    },
    rationale: 'PLACEHOLDER - Awaiting real scoring data.',
  },

  'buy-american': {
    base: { population: 0.5, economic: 0.6, intensity: 0.5 },
    factors: {
      hayek: 0.3, ostrom: 0.5, downs: 0.7, olson: 0.4, keynes: 0.5,
      pettit: 0.5, hirschman: 0.4, buchanan: 0.7, polanyi: 0.6,
      rawls: 0.5, george: 0.4, acemoglu: 0.5, walzer: 0.5,
    },
    rationale: 'PLACEHOLDER - Awaiting real scoring data.',
  },
};

/**
 * Helper to check if a policy has V2 scores
 */
export function hasV2Scores(policyId: string): boolean {
  return policyId in policyImpactScoresV2;
}

/**
 * Get V2 scores for a policy
 */
export function getV2Scores(policyId: string): V2ImpactScore | null {
  return policyImpactScoresV2[policyId] || null;
}
