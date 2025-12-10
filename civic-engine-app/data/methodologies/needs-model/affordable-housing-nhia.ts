/**
 * V3 Needs-Based Methodology: Affordable Housing Supply (Neighborhood Homes Investment Act)
 *
 * Policy: Create tax credits for building and renovating homes in distressed areas to
 * close the "appraisal gap" and increase housing supply.
 *
 * Overall Score: ~7.5/10 (Very Beneficial)
 */

import { V3PolicyMethodology } from '../../v3Methodology';

export const affordableHousingNhiaMethodology: V3PolicyMethodology = {
  policyId: 'affordable-housing-supply',
  policyName: 'Affordable Housing Supply (NHIA)',
  description:
    'Create tax credits for building and renovating homes in distressed urban, suburban, and rural communities to close the "appraisal gap" and increase housing supply. The Neighborhood Homes Investment Act (NHIA) would make it profitable to create affordable homes for low- and middle-income families in areas where private developers currently won\'t build because costs exceed market value.',

  needCategories: {
    physiological: {
      score: 9,
      reasoning:
        'Very high positive. Housing is one of the most essential physiological needs alongside food, water, and healthcare. This policy directly expands access to shelter. Lack of affordable shelter leads to homelessness and insecurity with severe health and mortality implications. By focusing on entry-level homes and repairs, this helps families achieve stable living conditions.',
    },
    safety: {
      score: 8,
      reasoning:
        'Very positive. Stable housing provides safety and security. In distressed areas with vacant homes, this removes dangerous abandoned structures, reduces crime associated with blight, and decreases homelessness – all improving public health and safety. Housing security is a prerequisite for employment, education, and overall well-being.',
    },
    community: {
      score: 8,
      reasoning:
        'Very positive. By focusing on distressed neighborhoods with vacant or blighted properties, the policy revitalizes declining areas and prevents displacement. Turning blighted homes into occupied, tax-paying properties strengthens social bonds and community cohesion. It provides homeownership opportunities without displacing communities.',
    },
    opportunity: {
      score: 8,
      reasoning:
        'Very positive. Promotes economic opportunity through homeownership and community revitalization. Over a decade, projected to create 1.1 million jobs in construction and generate $151 billion in economic activity. Homeownership builds wealth and stability for families, expanding their opportunities.',
    },
    selfActualization: {
      score: 6,
      reasoning:
        'Moderate positive. With stable housing secured, families can pursue higher-level goals. Homeownership provides dignity, pride of ownership, and the security needed to invest in personal growth, education, and community involvement.',
    },
  },

  dimensions: {
    populationAffected: {
      score: 7,
      reasoning:
        'Wide-reaching benefits, especially in high-need areas. Projected to support construction or rehab of 500,000 affordable homes for moderate-income buyers over the next decade. That\'s half a million households directly gaining stable housing, plus surrounding neighborhoods benefit. Indirectly, increasing supply can relieve housing cost pressure regionally.',
      keyPoints: [
        '500,000 affordable homes over 10 years',
        '1.1 million construction jobs created',
        '$151 billion in economic activity',
        'Benefits urban, suburban, and rural distressed communities',
      ],
    },
    essentialToSurvival: {
      score: 8,
      reasoning:
        'Highly essential for those lacking housing. Housing is part of basic physiological needs. Lack of affordable shelter leads to homelessness with severe health and mortality implications. This policy helps families achieve stable living conditions – a prerequisite for employment, education, and overall well-being. Removes dangerous abandoned structures.',
      keyPoints: [
        'Housing is a fundamental physiological need',
        'Addresses homelessness and housing insecurity',
        'Stable housing enables employment and education',
        'Removes dangerous abandoned structures',
      ],
    },
    timeToOutcome: {
      score: 5,
      reasoning:
        'Moderate timeframe – benefits accrue in the mid-term. Housing construction and rehabilitation take time (months to years per project). Effects on housing supply and affordability accumulate over several years. Initial results may start within a year of enactment, but significant nationwide impact unfolds over 5-10 years as hundreds of thousands of homes come online.',
      keyPoints: [
        'Construction takes months to years per project',
        'Tax credits allocated annually to developers',
        'Impact unfolds over 5-10 years',
        'Leverages private investment for faster turnaround',
      ],
    },
    feasibility: {
      score: 7,
      reasoning:
        'High public and cross-party support makes it quite feasible. NHIA was reintroduced in 2025 with renewed bipartisan backing. 71% of Americans support major federal investment in building or repairing affordable homes. 73% favor tax credits for building middle-income affordable homes (63% Republicans, 85% Democrats). Coalition of 40+ organizations lobbying for it. Similar LIHTC credits have long bipartisan support.',
      keyPoints: [
        '71% support federal investment in affordable housing',
        '73% favor tax credits for affordable homes',
        'Bipartisan backing (63% GOP, 85% Dem)',
        '40+ organizations lobbying for NHIA',
        'Market-friendly tax credit approach',
      ],
    },
  },

  overallRationale:
    'The Affordable Housing Supply (NHIA) policy scores approximately 7.5/10 (Very Beneficial). It directly addresses the fundamental physiological need for shelter by unlocking development in areas the market has left behind. By closing the appraisal gap and incentivizing private developers, it fills a crucial niche: providing homeownership opportunities and affordable housing without displacing communities. Outcomes include revitalized neighborhoods, improved financial stability for homeowner families, and benefits to renters as overall supply increases. Given strong bipartisan support (71-73%) and achievable design, this policy would significantly increase housing security and economic vitality in places that need it most.',

  sources: [
    'community-progress-nhia',
    'public-consultation-housing',
    'bpc-housing-vouchers-poll',
  ],
};

export default affordableHousingNhiaMethodology;
