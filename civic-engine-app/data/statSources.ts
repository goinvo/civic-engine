/**
 * Sources for the contextual statistics shown on the landing page.
 * These stats appear in floating windows alongside policy percentages.
 */

export interface StatSource {
  policyId: string;
  stats: {
    label: string;
    value: string;
    source: string;
    url?: string;
    year?: number;
    notes?: string;
  }[];
}

export const statSources: StatSource[] = [
  {
    policyId: 'congress-stock-ban',
    stats: [
      {
        label: 'Exposed trades',
        value: '$600M+',
        source: 'Unusual Whales Congressional Trading Report',
        url: 'https://unusualwhales.com/politics',
        year: 2024,
        notes: 'Total value of stock trades by members of Congress in 2023-2024',
      },
      {
        label: 'GOP support',
        value: '87%',
        source: 'Pew Research Center',
        url: 'https://pewresearch.org',
        year: 2024,
        notes: 'Republican voter support for banning congressional stock trading',
      },
    ],
  },
  {
    policyId: 'congress-term-limits',
    stats: [
      {
        label: 'Avg tenure',
        value: '9.4 yrs',
        source: 'Congressional Research Service',
        url: 'https://crsreports.congress.gov',
        year: 2023,
        notes: 'Average length of service in the House of Representatives',
      },
      {
        label: 'Term model',
        value: '4H / 2S',
        source: 'U.S. Term Limits',
        url: 'https://www.termlimits.com',
        year: 2024,
        notes: 'Most popular proposal: 4 terms in House (8 years), 2 terms in Senate (12 years)',
      },
    ],
  },
  {
    policyId: 'medicare-drug-negotiation',
    stats: [
      {
        label: 'US vs EU cost',
        value: '2-3×',
        source: 'RAND Corporation',
        url: 'https://www.rand.org/pubs/research_reports/RR2956.html',
        year: 2021,
        notes: 'Americans pay 2-3x more for prescription drugs than Europeans on average',
      },
      {
        label: 'GOP support',
        value: '77%',
        source: 'Kaiser Family Foundation',
        url: 'https://www.kff.org',
        year: 2024,
        notes: 'Republican voter support for allowing Medicare to negotiate drug prices',
      },
    ],
  },
  {
    policyId: 'campaign-finance-disclosure',
    stats: [
      {
        label: 'Dark money',
        value: '$1B+',
        source: 'OpenSecrets',
        url: 'https://www.opensecrets.org/dark-money',
        year: 2024,
        notes: 'Estimated dark money spending in federal elections since 2010',
      },
      {
        label: 'Foreign ban',
        value: '88%',
        source: 'Program for Public Consultation',
        url: 'https://publicconsultation.org',
        year: 2023,
        notes: 'Bipartisan support for banning foreign money in US elections',
      },
    ],
  },
  {
    policyId: 'vocational-training',
    stats: [
      {
        label: 'Skills hire',
        value: '92%',
        source: 'LinkedIn Workforce Report',
        url: 'https://economicgraph.linkedin.com',
        year: 2024,
        notes: '92% of employers open to skills-based hiring over degree requirements',
      },
      {
        label: 'Unfilled jobs',
        value: '2M+',
        source: 'Bureau of Labor Statistics',
        url: 'https://www.bls.gov/jlt/',
        year: 2024,
        notes: 'Unfilled skilled trades positions in the United States',
      },
    ],
  },
  {
    policyId: 'free-easy-voter-id',
    stats: [
      {
        label: 'GOP support',
        value: '95%',
        source: 'Pew Research Center',
        url: 'https://pewresearch.org',
        year: 2025,
        notes: 'Republican support for voter ID requirements',
      },
      {
        label: 'Dem support',
        value: '69%',
        source: 'Pew Research Center',
        url: 'https://pewresearch.org',
        year: 2025,
        notes: 'Democratic support for voter ID when IDs are made free and accessible',
      },
    ],
  },
  {
    policyId: 'childcare-tax-credit',
    stats: [
      {
        label: 'Poverty drop',
        value: '50%',
        source: 'Columbia University Center on Poverty and Social Policy',
        url: 'https://www.povertycenter.columbia.edu',
        year: 2021,
        notes: 'Child poverty rate dropped nearly 50% during expanded CTC in 2021',
      },
      {
        label: 'Per child',
        value: '$3-4K',
        source: 'Tax Policy Center',
        url: 'https://www.taxpolicycenter.org',
        year: 2024,
        notes: 'Proposed expanded Child Tax Credit amounts per child',
      },
    ],
  },
  {
    policyId: 'scotus-term-limits',
    stats: [
      {
        label: 'Term length',
        value: '18 yrs',
        source: 'Fix the Court',
        url: 'https://fixthecourt.com',
        year: 2024,
        notes: 'Most common proposal: 18-year terms with staggered appointments',
      },
      {
        label: 'Appts/term',
        value: '2',
        source: 'Program for Public Consultation',
        url: 'https://publicconsultation.org',
        year: 2023,
        notes: 'Each president would appoint exactly 2 justices per 4-year term',
      },
    ],
  },
  {
    policyId: 'ultra-millionaire-tax',
    stats: [
      {
        label: 'Threshold',
        value: '$50M+',
        source: 'Senator Elizabeth Warren Proposal',
        url: 'https://www.warren.senate.gov',
        year: 2023,
        notes: 'Wealth tax would only apply to households with net worth over $50 million',
      },
      {
        label: 'Rate',
        value: '2-3%',
        source: 'Tax Foundation',
        url: 'https://taxfoundation.org',
        year: 2024,
        notes: '2% on wealth $50M-$1B, 3% on wealth over $1 billion',
      },
    ],
  },
  {
    policyId: 'end-citizens-united',
    stats: [
      {
        label: 'Since 2010',
        value: '$16B+',
        source: 'OpenSecrets',
        url: 'https://www.opensecrets.org',
        year: 2024,
        notes: 'Outside spending in federal elections since Citizens United (2010)',
      },
      {
        label: 'Dem support',
        value: '88%',
        source: 'Pew Research Center',
        url: 'https://pewresearch.org',
        year: 2023,
        notes: 'Democratic support for limiting campaign spending',
      },
    ],
  },
];

/**
 * Get stat sources for a specific policy
 */
export function getStatSourcesForPolicy(policyId: string): StatSource | undefined {
  return statSources.find(s => s.policyId === policyId);
}

/**
 * Get all unique source organizations
 */
export function getAllSourceOrganizations(): string[] {
  const orgs = new Set<string>();
  statSources.forEach(policy => {
    policy.stats.forEach(stat => {
      orgs.add(stat.source);
    });
  });
  return Array.from(orgs).sort();
}
