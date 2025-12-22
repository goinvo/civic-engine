import { V1PolicyMethodology } from '../../v1Methodology';

export const ultraMillionaireTaxMethodology: V1PolicyMethodology = {
  policyId: 'ultra-millionaire-tax',
  policyName: 'Ultra-Millionaire Wealth Tax',
  description: 'Annual tax on wealth above $50 million (2%) and $1 billion (3%).',
  totalScore: 55,
  tier: 'TIER 2: MAJOR SOCIAL REFORMS',
  factors: {
    population: {
      score: 0.1,
      reasoning: 'Directly affects only ~180,000 households (top 0.1%), but revenue benefits everyone.',
      keyPoints: [
        'Only affects those with $50M+ in wealth',
        'Roughly 180,000 households nationally',
        'Revenue could fund universal programs',
      ],
    },
    economic: {
      score: 0.7,
      reasoning: 'Would generate $200-300B annually - significant revenue for social programs.',
      keyPoints: [
        'Large revenue potential from concentrated wealth',
        'Could fund major social investments',
        'May affect investment patterns of ultra-wealthy',
      ],
    },
    intensity: {
      score: 0.6,
      reasoning: 'Moderate intensity even for those affected - 2-3% of wealth is significant but not devastating.',
      keyPoints: [
        'Annual 2% on wealth above $50M',
        'Ultra-wealthy still remain ultra-wealthy',
        'May require asset sales in some cases',
      ],
    },
    duration: {
      score: 0.7,
      reasoning: 'Permanent tax code change with ongoing revenue generation.',
      keyPoints: [
        'Annual recurring tax',
        'Compounds over time to reduce concentration',
        'Structural change to wealth accumulation',
      ],
    },
    equity: {
      score: 1.0,
      reasoning: 'Maximum equity score - exclusively targets the wealthiest Americans.',
      keyPoints: [
        'Only affects top 0.1%',
        'Addresses extreme wealth concentration',
        'Revenue can fund progressive programs',
      ],
    },
    externalities: {
      score: 0.6,
      reasoning: 'Moderate spillovers to philanthropy, investment behavior, and political discourse.',
      keyPoints: [
        'May accelerate philanthropic giving',
        'Could affect capital allocation patterns',
        'Shifts political conversation on wealth',
      ],
    },
    implementation: {
      score: 0.8,
      reasoning: 'Very difficult - valuation challenges, avoidance schemes, and constitutional questions.',
      keyPoints: [
        'Requires annual wealth valuation',
        'Private business valuations are complex',
        'Constitutional challenges likely',
      ],
    },
  },
  overallRationale: 'Maximum Equity score. Low Population score (affects a tiny fraction of households), but high Economic volume. Implementation is difficult due to avoidance/valuation.',
};
