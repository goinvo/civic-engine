import { V1PolicyMethodology } from '../../v1Methodology';

export const junkFeePreventionMethodology: V1PolicyMethodology = {
  policyId: 'junk-fee-prevention',
  policyName: 'Junk Fee Prevention',
  description: 'Require upfront disclosure of all fees in hotels, airlines, tickets, and other services.',
  totalScore: 39,
  tier: 'TIER 2: MAJOR SOCIAL REFORMS',
  factors: {
    population: {
      score: 0.7,
      reasoning: 'Affects most consumers who purchase services with hidden fees.',
      keyPoints: [
        'Millions buy airline tickets, hotel rooms, event tickets',
        'Cable, internet, and banking fees affect nearly everyone',
        'Broad consumer protection impact',
      ],
    },
    economic: {
      score: 0.2,
      reasoning: 'Low direct economic volume - savings are modest per transaction.',
      keyPoints: [
        'Hidden fees total billions, but spread widely',
        'Individual savings are $10-100 per transaction',
        'Shifts revenue from fees to base prices',
      ],
    },
    intensity: {
      score: 0.4,
      reasoning: 'Low-to-moderate intensity - frustrating but not life-changing.',
      keyPoints: [
        'Reduces consumer frustration and surprise charges',
        'Enables better price comparison shopping',
        'Not existential but improves daily life',
      ],
    },
    duration: {
      score: 0.5,
      reasoning: 'Permanent regulation but companies may find new ways to obscure prices.',
      keyPoints: [
        'Establishes transparency requirements',
        'May need updates as new fee types emerge',
        'Cultural shift toward honest pricing',
      ],
    },
    equity: {
      score: 0.5,
      reasoning: 'Neutral equity - affects consumers across income levels.',
      keyPoints: [
        'Junk fees hit everyone',
        'Low-income consumers may be more price-sensitive',
        'Benefits broadly distributed',
      ],
    },
    externalities: {
      score: 0.3,
      reasoning: 'Limited spillovers - contained to consumer markets.',
      keyPoints: [
        'May improve market efficiency',
        'Reduces cognitive burden of shopping',
        'Sets precedent for price transparency',
      ],
    },
    implementation: {
      score: 0.5,
      reasoning: 'Moderate difficulty - requires defining fees and enforcement across industries.',
      keyPoints: [
        'Industry lobbying against transparency',
        'Need to define what constitutes a "junk fee"',
        'FTC and CFPB have authority to act',
      ],
    },
  },
  overallRationale: 'Affects most consumers (hotels, tickets, airlines), but the per-transaction savings are modest.',
};
