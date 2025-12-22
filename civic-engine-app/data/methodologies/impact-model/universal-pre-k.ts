import { V1PolicyMethodology } from '../../v1Methodology';

export const universalPreKMethodology: V1PolicyMethodology = {
  policyId: 'universal-pre-k',
  policyName: 'Universal Pre-K',
  description: 'Provide free, high-quality pre-kindergarten education to all 3-4 year olds.',
  totalScore: 65,
  tier: 'TIER 2: MAJOR SOCIAL REFORMS',
  factors: {
    population: {
      score: 0.4,
      reasoning: 'Directly affects families with young children - a significant but not majority population.',
      keyPoints: [
        'About 8 million 3-4 year olds in the US',
        'Affects working parents who need childcare',
        'Benefits compound across cohorts over time',
      ],
    },
    economic: {
      score: 0.5,
      reasoning: 'Moderate economic scale - $50-100B annually, but transforms early childhood market.',
      keyPoints: [
        'Childcare costs average $10,000+ per year per child',
        'Enables parents to work who otherwise could not',
        'Long-term economic returns estimated at 7:1',
      ],
    },
    intensity: {
      score: 0.8,
      reasoning: 'Very high intensity for young families - childcare is often the largest household expense.',
      keyPoints: [
        'Childcare exceeds rent in many cities',
        'Educational benefits persist for decades',
        'Reduces family stress and improves child outcomes',
      ],
    },
    duration: {
      score: 0.7,
      reasoning: 'Creates permanent educational infrastructure with lasting developmental benefits.',
      keyPoints: [
        'Brain development in early years is critical',
        'Benefits compound through K-12 and beyond',
        'Creates generational educational improvement',
      ],
    },
    equity: {
      score: 0.8,
      reasoning: 'Highly progressive - low-income families least able to afford quality early education.',
      keyPoints: [
        'Wealthy families already access quality pre-K',
        'Closes achievement gaps before kindergarten',
        'Particularly benefits children of working parents',
      ],
    },
    externalities: {
      score: 0.8,
      reasoning: 'Massive positive spillovers to workforce participation and long-term human capital.',
      keyPoints: [
        'Increases female workforce participation',
        'Reduces special education needs later',
        'Decreases crime rates in long-term studies',
      ],
    },
    implementation: {
      score: 0.8,
      reasoning: 'Requires building nationwide school infrastructure from scratch.',
      keyPoints: [
        'Need millions of new classroom slots',
        'Requires trained early childhood educators',
        'Varies by state - some have programs, others none',
      ],
    },
  },
  overallRationale: 'High intensity for young families. Massive positive externalities for the workforce, but requires building a new nationwide school infrastructure (High Implementation).',
};
