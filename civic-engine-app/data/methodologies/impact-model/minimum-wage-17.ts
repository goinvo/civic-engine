import { V1PolicyMethodology } from '../../v1Methodology';

export const minimumWage17Methodology: V1PolicyMethodology = {
  policyId: 'minimum-wage-17',
  policyName: 'Raise Minimum Wage to $17',
  description: 'Increase the federal minimum wage from $7.25 to $17 per hour.',
  totalScore: 61,
  tier: 'TIER 2: MAJOR SOCIAL REFORMS',
  factors: {
    population: {
      score: 0.4,
      reasoning: 'Directly affects low-wage workers - significant but not majority of workforce.',
      keyPoints: [
        'About 30 million workers earn under $17/hour',
        'Ripple effects on wages just above minimum',
        'Particularly affects service and retail sectors',
      ],
    },
    economic: {
      score: 0.6,
      reasoning: 'Significant wage volume shift - billions in additional worker earnings annually.',
      keyPoints: [
        'Would raise wages for ~20% of workforce',
        'Transfers billions from employers to workers',
        'May affect prices in labor-intensive industries',
      ],
    },
    intensity: {
      score: 0.7,
      reasoning: 'High intensity for affected workers - doubling income is life-changing.',
      keyPoints: [
        'Current minimum is poverty-level wage',
        '$17 enables basic self-sufficiency',
        'Reduces need for public assistance',
      ],
    },
    duration: {
      score: 0.8,
      reasoning: 'Permanent wage floor with ongoing effects, though inflation erodes over time.',
      keyPoints: [
        'Establishes new minimum permanently',
        'Benefits compound with raises above floor',
        'May need future adjustments for inflation',
      ],
    },
    equity: {
      score: 0.9,
      reasoning: 'Highly progressive - directly targets lowest-wage workers.',
      keyPoints: [
        'Minimum wage workers are disproportionately minorities',
        'Single parents and young workers benefit most',
        'Reduces working poverty significantly',
      ],
    },
    externalities: {
      score: 0.6,
      reasoning: 'Moderate spillovers to labor markets, prices, and employment levels.',
      keyPoints: [
        'May reduce turnover and improve productivity',
        'Some price increases in affected industries',
        'Employment effects debated but likely small',
      ],
    },
    implementation: {
      score: 0.3,
      reasoning: 'Relatively easy - just a law change, businesses must comply.',
      keyPoints: [
        'Simple legislative change',
        'Existing enforcement mechanisms',
        'Phased implementation reduces shock',
      ],
    },
  },
  overallRationale: 'High Equity score as it targets the working poor. Moderate implementation friction (business compliance).',
};
