/**
 * V3 Needs-Based Methodology: Ultra-Millionaire Wealth Tax
 *
 * Policy: Impose a 2% annual tax on net wealth above $50 million and 3% above $1 billion,
 * targeting the top ~0.05% richest households to fund social programs.
 *
 * Overall Score: ~7.3/10 (Very Beneficial)
 */

import { V3PolicyMethodology } from '../../v3Methodology';

export const ultraMillionaireWealthTaxMethodology: V3PolicyMethodology = {
  policyId: 'ultra-millionaire-wealth-tax',
  policyName: 'Ultra-Millionaire Wealth Tax',
  description:
    'Impose a 2% annual tax on net wealth above $50 million and 3% above $1 billion, targeting the top ~0.05% richest households. Revenue (estimated ~$3 trillion over 10 years) would fund social programs (e.g. childcare, education, infrastructure) and reduce economic inequality. Average public support is approximately 67%.',

  needCategories: {
    physiological: {
      score: 8,
      reasoning:
        'Strong positive. By funding healthcare, housing, nutrition and other aid, a wealth tax can directly improve millions of Americans\' access to food, shelter, and medical care. Revenue could be invested in child care, education, and infrastructure benefitting families in need. This addresses fundamental survival needs for a significant population. Proponents note it would help families "struggling to put food on the table, keep the heat on, and pay the rent" by investing trillions into communities.',
    },
    safety: {
      score: 7,
      reasoning:
        'Moderate positive. Reducing extreme inequality can improve social stability and security over time. A fairer economy with less wealth concentration may lead to a more stable society (less risk of unrest) and greater economic security for average people. However, some economists warn that a wealth tax could dampen economic growth or drive capital flight, potentially affecting long-term financial stability. On balance, the infusion of public investment and reduction in inequality improve safety nets more than any potential economic side-effects.',
    },
    community: {
      score: 8,
      reasoning:
        'Strong positive. By narrowing the wealth gap (including the racial wealth gap), this policy could foster greater social cohesion and a sense that everyone plays by the same rules. Public investments funded by the tax (e.g. in schools, infrastructure) strengthen communities and civic life. Many Americans support it because they feel "the system is rigged to benefit the wealthy," and this would restore fairness. A more equitable society tends to have higher trust and civic participation.',
    },
    opportunity: {
      score: 7,
      reasoning:
        'Moderate positive. The wealth tax\'s funds for education, childcare, and infrastructure directly expand opportunities for working families. Improved schools and services mean better employment and mobility prospects for those who currently lack them. On the other hand, critics argue that wealth taxes can reduce private investment or entrepreneurship (by pulling capital out, or prompting wealthy individuals to relocate). Still, the net effect likely favors opportunity for the many over potential drawbacks: the revenue (~$300 billion/year) is substantial for opportunity-boosting programs.',
    },
    selfActualization: {
      score: 6,
      reasoning:
        'Slight positive. This policy is less directly tied to arts or personal fulfillment, but some funding could go to cultural programs or simply free more individuals from extreme poverty, enabling them to pursue personal development. By reducing inequality, it might uplift overall life satisfaction for disadvantaged groups. Any effect here is indirect and modest.',
    },
  },

  dimensions: {
    populationAffected: {
      score: 9,
      reasoning:
        'Very high indirect impact. Directly, only the wealthiest ~100k households (0.05%) pay the tax. Indirectly, the entire population could benefit from the trillions in new public investments funded by this tax, since 99.95% of households are not taxed but stand to gain from improved public goods.',
      keyPoints: [
        'Only top 0.05% (~100k households) pay directly',
        '99.95% of households benefit from funded programs',
        '~$3 trillion in revenue over 10 years',
        'Funds healthcare, education, childcare, infrastructure',
        'Entire population benefits from improved public goods',
      ],
    },
    essentialToSurvival: {
      score: 8,
      reasoning:
        'High. By funding priorities like healthcare, housing, food aid, education, etc., this policy targets basic needs. Proponents note it would help families "struggling to put food on the table, keep the heat on, and pay the rent" by investing trillions of dollars into communities. The revenue would be directed toward programs that address fundamental survival needs.',
      keyPoints: [
        'Funds healthcare, housing, food aid programs',
        'Helps families struggling with basics',
        'Trillions invested in communities',
        'Addresses fundamental survival needs',
        'Targets those most in need through funded programs',
      ],
    },
    timeToOutcome: {
      score: 6,
      reasoning:
        'Moderate. Some benefits (revenue collection) would begin within the first year of enactment, but outcomes like reduced inequality or improved services unfold over several years as funds are allocated to programs. It\'s not instantaneous relief, but within a few budget cycles the impacts on poverty and services could be felt.',
      keyPoints: [
        'Revenue collection begins first year',
        'Program funding takes multiple budget cycles',
        'Inequality reduction unfolds over years',
        'Service improvements visible within few years',
        'Not immediate relief but steady progress',
      ],
    },
    feasibility: {
      score: 5,
      reasoning:
        'Challenging. Public support is fairly high (~67% overall) and bipartisan to a degree, but enacting this faces legal and political hurdles. It would likely trigger Supreme Court challenges over whether a wealth tax is a constitutional form of taxation. Politically, intense opposition from wealthy interests is expected. Implementation complexity (asset valuation, enforcement) is non-trivial, though other countries have attempted versions of wealth taxes.',
      keyPoints: [
        '~67% public support overall',
        'Potential Supreme Court constitutional challenges',
        'Intense opposition from wealthy interests',
        'Asset valuation and enforcement complexity',
        'Some countries have attempted similar taxes',
        'Political barriers despite public support',
      ],
    },
  },

  overallRationale:
    'The Ultra-Millionaire Wealth Tax scores approximately 7.3/10, indicating it is Very Beneficial. The high scores in critical need areas yield a net score in the 7+ range. Despite implementation challenges, if enacted the ultra-wealth tax is projected to meaningfully improve basic living standards and equity in society. Revenue would fund programs addressing physiological needs, strengthen community cohesion by reducing inequality, and expand opportunities through education and infrastructure investments.',

  sources: [
    'warren-ultra-millionaire-tax',
    'reason-wealth-tax-impacts',
  ],
};

export default ultraMillionaireWealthTaxMethodology;
