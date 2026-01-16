/**
 * Sources for the contextual statistics shown on the landing page.
 * These stats appear in floating windows alongside policy percentages.
 */

export type ChartType = 'bar' | 'comparison' | 'trend' | 'donut';

export interface ChartData {
  type: ChartType;
  data: { name: string; value: number; color?: string }[];
}

export interface StatItem {
  label: string;
  value: string;
  source: string;
  url?: string;
  year?: number;
  notes?: string;
  chart?: ChartData;
}

export interface StatSource {
  policyId: string;
  stats: StatItem[];
}

export const statSources: StatSource[] = [
  {
    policyId: 'congress-stock-ban',
    stats: [
      {
        label: '2024 trades',
        value: '$706M',
        source: 'Capitol Trades',
        url: 'https://www.capitoltrades.com/',
        year: 2024,
        notes:
          '"113 members of Congress made 9,261 trades in 2024 involving 706 million shares or other assets"',
        chart: {
          type: 'trend',
          data: [
            { name: '\'22', value: 290 },
            { name: '\'23', value: 450 },
            { name: '\'24', value: 706 },
          ],
        },
      },
      {
        label: 'Beat S&P 500',
        value: '48',
        source: 'Unusual Whales',
        url: 'https://unusualwhales.com/congress-trading-report-2024',
        year: 2024,
        notes:
          '"48 of the 113 members of Congress that traded stocks in 2024 beat the S&P 500, up from 33 in 2023"',
        chart: {
          type: 'comparison',
          data: [
            { name: 'Beat', value: 48 },
            { name: 'Didn\'t', value: 65 },
          ],
        },
      },
    ],
  },
  {
    policyId: 'congress-term-limits',
    stats: [
      {
        label: 'Avg tenure',
        value: '8.6 / 11.2',
        source: 'Congressional Research Service',
        url: 'https://www.congress.gov/crs-product/R41545',
        year: 2025,
        notes:
          '"Average years of service for Members elected to the 119th Congress was 8.6 years for the House and 11.2 years for the Senate"',
        chart: {
          type: 'comparison',
          data: [
            { name: 'House', value: 86 },
            { name: 'Senate', value: 112 },
          ],
        },
      },
      {
        label: 'Since 1880s',
        value: '3× longer',
        source: 'Congressional Research Service',
        url: 'https://www.congress.gov/crs-product/R41545',
        year: 2025,
        notes:
          '"Average tenure of Representatives has increased from approximately three years during the early 1880s to approximately nine years"',
        chart: {
          type: 'trend',
          data: [
            { name: '1880', value: 3 },
            { name: '1960', value: 6 },
            { name: '2024', value: 9 },
          ],
        },
      },
    ],
  },
  {
    policyId: 'medicare-drug-negotiation',
    stats: [
      {
        label: 'US vs world',
        value: '2.78×',
        source: 'RAND Corporation',
        url: 'https://www.rand.org/news/press/2024/02/01.html',
        year: 2024,
        notes:
          '"U.S. prices were 2.78 times those in 33 other high-income countries"',
        chart: {
          type: 'comparison',
          data: [
            { name: 'US', value: 278 },
            { name: 'Other', value: 100 },
          ],
        },
      },
      {
        label: 'Brand drugs',
        value: '4.22×',
        source: 'RAND Corporation',
        url: 'https://www.rand.org/news/press/2024/02/01.html',
        year: 2024,
        notes:
          '"The gap is even larger for brand-name drugs, with U.S. prices averaging 4.22 times those in comparison nations"',
        chart: {
          type: 'bar',
          data: [
            { name: 'US', value: 422, color: '#C91A2B' },
            { name: 'UK', value: 100, color: '#2F3BBD' },
            { name: 'JP', value: 125, color: '#888' },
          ],
        },
      },
    ],
  },
  {
    policyId: 'campaign-finance-disclosure',
    stats: [
      {
        label: 'Dark $ trend',
        value: '$1.9B',
        source: 'Brennan Center',
        url: 'https://www.brennancenter.org/our-work/research-reports/dark-money-hit-record-high-19-billion-2024-federal-races',
        year: 2024,
        notes:
          '"Dark money groups plowed more than $1.9 billion into the 2024 election cycle, a dramatic increase from the prior record of $1 billion in 2020"',
        chart: {
          type: 'trend',
          data: [
            { name: '\'16', value: 180 },
            { name: '\'20', value: 1000 },
            { name: '\'24', value: 1900 },
          ],
        },
      },
      {
        label: 'Since 2010',
        value: '↑ 14,000%',
        source: 'Wikipedia / FEC data',
        url: 'https://en.wikipedia.org/wiki/Dark_money',
        year: 2024,
        notes:
          '"Dark campaign spending increased from less than $5.2 million in 2006 to $1.9 billion in 2024"',
      },
    ],
  },
  {
    policyId: 'vocational-training',
    stats: [
      {
        label: 'Unfilled by 2030',
        value: '2.1M',
        source: 'NAM / Deloitte',
        url: 'https://nam.org/2-1-million-manufacturing-jobs-could-go-unfilled-by-2030-13743/',
        year: 2024,
        notes:
          '"The manufacturing skills gap in the U.S. could result in 2.1 million unfilled jobs by 2030"',
        chart: {
          type: 'donut',
          data: [
            { name: 'Unfilled', value: 2100, color: '#C91A2B' },
            { name: 'Filled', value: 10500, color: '#22C55E' },
          ],
        },
      },
      {
        label: 'Construction gap',
        value: '501K',
        source: 'ABC',
        url: 'https://www.abc.org/News-Media/News-Releases/abc-2024-construction-workforce-shortage-tops-half-a-million',
        year: 2024,
        notes:
          '"The construction industry will need to attract an estimated 501,000 additional workers on top of the normal pace of hiring in 2024"',
        chart: {
          type: 'trend',
          data: [
            { name: '\'19', value: 287 },
            { name: '\'22', value: 350 },
            { name: '\'24', value: 501 },
          ],
        },
      },
    ],
  },
  {
    policyId: 'free-easy-voter-id',
    stats: [
      {
        label: 'Party gap',
        value: '26 pts',
        source: 'Pew Research',
        url: 'https://www.pewresearch.org/politics/2024/02/07/bipartisan-support-for-early-in-person-voting-voter-id-election-day-national-holiday/',
        year: 2024,
        notes:
          '"81% overall support... Republicans 95%, Democrats 69%" - Free IDs bridge the gap',
        chart: {
          type: 'bar',
          data: [
            { name: 'Dem', value: 69, color: '#2F3BBD' },
            { name: 'GOP', value: 95, color: '#C91A2B' },
            { name: 'Ind', value: 80 },
          ],
        },
      },
      {
        label: 'The deal',
        value: 'ID + Free',
        source: 'Pew Research',
        url: 'https://www.pewresearch.org/politics/2024/02/07/bipartisan-support-for-early-in-person-voting-voter-id-election-day-national-holiday/',
        year: 2024,
        notes: 'Security (GOP) + Access (Dem) = 81% Consensus',
      },
    ],
  },
  {
    policyId: 'childcare-tax-credit',
    stats: [
      {
        label: 'Kids lifted out',
        value: '3.6M',
        source: 'Columbia Poverty Center',
        url: 'https://povertycenter.columbia.edu/news-internal/monthly-poverty-october-2021',
        year: 2021,
        notes:
          '"The October 2021 Child Tax Credit payment kept 3.6 million children from poverty"',
        chart: {
          type: 'trend',
          data: [
            { name: 'Jun', value: 15.8 },
            { name: 'Aug', value: 11.9 },
            { name: 'Oct', value: 12.1 },
          ],
        },
      },
      {
        label: 'Poverty cut',
        value: '43%',
        source: 'Columbia Poverty Center',
        url: 'https://povertycenter.columbia.edu/publication/2021-child-poverty-reduction',
        year: 2021,
        notes:
          '"The expanded Child Tax Credit by itself cut child poverty by 43 percent"',
        chart: {
          type: 'comparison',
          data: [
            { name: 'Before', value: 100 },
            { name: 'After', value: 57 },
          ],
        },
      },
    ],
  },
  {
    policyId: 'scotus-term-limits',
    stats: [
      {
        label: 'Party support',
        value: '78%',
        source: 'Program for Public Consultation',
        url: 'https://publicconsultation.org',
        year: 2023,
        notes: 'Bipartisan support for SCOTUS term limits',
        chart: {
          type: 'bar',
          data: [
            { name: 'Dem', value: 82, color: '#2F3BBD' },
            { name: 'GOP', value: 57, color: '#C91A2B' },
            { name: 'Ind', value: 70 },
          ],
        },
      },
      {
        label: 'Appts/term',
        value: '2',
        source: 'Fix the Court',
        url: 'https://fixthecourt.com',
        year: 2024,
        notes: 'Each president would appoint exactly 2 justices per 4-year term',
        chart: {
          type: 'donut',
          data: [
            { name: 'Rotate', value: 2, color: '#2F3BBD' },
            { name: 'Stay', value: 7, color: '#888' },
          ],
        },
      },
    ],
  },
  {
    policyId: 'ultra-millionaire-tax',
    stats: [
      {
        label: 'Party support',
        value: '67%',
        source: 'Data for Progress',
        url: 'https://www.dataforprogress.org',
        year: 2024,
        notes: 'Support varies significantly by party',
        chart: {
          type: 'bar',
          data: [
            { name: 'Dem', value: 85, color: '#2F3BBD' },
            { name: 'GOP', value: 50, color: '#C91A2B' },
            { name: 'Ind', value: 65 },
          ],
        },
      },
      {
        label: 'Threshold',
        value: '$50M+',
        source: 'Tax Foundation',
        url: 'https://taxfoundation.org',
        year: 2024,
        notes: 'Only affects top 0.1% of households',
        chart: {
          type: 'donut',
          data: [
            { name: 'Affected', value: 1, color: '#2F3BBD' },
            { name: 'Not', value: 999, color: '#E5E7EB' },
          ],
        },
      },
    ],
  },
  {
    policyId: 'hospital-price-transparency',
    stats: [
      {
        label: 'Price variance',
        value: '3× gap',
        source: 'Baker Institute',
        url: 'https://www.bakerinstitute.org/research/revisiting-price-transparency-texas-medical-center-hospitals',
        year: 2024,
        notes:
          '"Mean negotiated prices at the highest-priced provider were nearly three times higher ($1,698) than those at the lowest-priced provider ($584)"',
        chart: {
          type: 'comparison',
          data: [
            { name: 'Expensive', value: 1698 },
            { name: 'Cheapest', value: 584 },
          ],
        },
      },
      {
        label: 'Comply w/ law',
        value: '21%',
        source: 'Patient Rights Advocate',
        url: 'https://www.healthcaredive.com/news/hospital-price-transparency-continues-drop-patient-rights-advocate/733703/',
        year: 2024,
        notes:
          '"Hospitals in full compliance with federal price transparency rules fell from 34.5% to 21.1% in 2024"',
        chart: {
          type: 'trend',
          data: [
            { name: '\'22', value: 16 },
            { name: '\'23', value: 35 },
            { name: '\'24', value: 21 },
          ],
        },
      },
    ],
  },
  {
    policyId: 'school-mental-health-services',
    stats: [
      {
        label: 'Students/counselor',
        value: '376 → 250',
        source: 'ASCA',
        url: 'https://www.schoolcounselor.org/About-School-Counseling/School-Counselor-Roles-Ratios',
        year: 2024,
        notes:
          '"The national average student-to-school-counselor ratio is 376:1 for 2023-24, above the ASCA recommended ratio of 250:1"',
        chart: {
          type: 'comparison',
          data: [
            { name: 'Now', value: 376 },
            { name: 'Target', value: 250 },
          ],
        },
      },
      {
        label: 'Underfunded',
        value: '56%',
        source: 'KFF',
        url: 'https://www.kff.org/mental-health/the-landscape-of-school-based-mental-health-services/',
        year: 2024,
        notes:
          '"56% of schools report inadequate funding for mental health services"',
        chart: {
          type: 'donut',
          data: [
            { name: 'Underfunded', value: 56, color: '#C91A2B' },
            { name: 'Adequate', value: 44, color: '#2F3BBD' },
          ],
        },
      },
    ],
  },
  {
    policyId: 'school-phone-restrictions',
    stats: [
      {
        label: 'Test score boost',
        value: '+1.4%',
        source: 'NBER',
        url: 'https://www.nber.org/digest/202512/school-cell-phone-bans-and-student-achievement',
        year: 2024,
        notes:
          '"An all-day cell phone ban improved test scores by 1.4 percentiles among male students"',
      },
      {
        label: 'In-school use',
        value: '43 min',
        source: 'IES / NCES',
        url: 'https://ies.ed.gov/learn/press-release/more-half-public-school-leaders-say-cell-phones-hurt-academic-performance',
        year: 2024,
        notes:
          '"97% of students aged 11-17 used phones during school day, with median 43 minutes screen time"',
        chart: {
          type: 'bar',
          data: [
            { name: 'Low', value: 10, color: '#22C55E' },
            { name: 'Median', value: 43, color: '#EAB308' },
            { name: 'High', value: 390, color: '#C91A2B' },
          ],
        },
      },
    ],
  },
  {
    policyId: 'medicare-dental-coverage',
    stats: [
      {
        label: 'US vs G7',
        value: '$518',
        source: 'WellnessPulse / ValuePenguin',
        url: 'https://wellnesspulse.com/research/smiles-across-the-g7-a-study-of-dental-care-expenses/',
        year: 2024,
        notes:
          '"The United States has the highest dental care expenses among G7 countries, with an average cost of $518 across common procedures"',
        chart: {
          type: 'bar',
          data: [
            { name: 'US', value: 518, color: '#C91A2B' },
            { name: 'CA', value: 414, color: '#888' },
            { name: 'DE', value: 320, color: '#888' },
          ],
        },
      },
      {
        label: 'No coverage',
        value: '47%',
        source: 'KFF',
        url: 'https://www.kff.org/medicare/medicare-and-dental-coverage-a-closer-look/',
        year: 2024,
        notes:
          '"Nearly half of Medicare beneficiaries (47%), or 24 million people, do not have dental coverage"',
        chart: {
          type: 'donut',
          data: [
            { name: 'Without', value: 47, color: '#C91A2B' },
            { name: 'With', value: 53, color: '#2F3BBD' },
          ],
        },
      },
    ],
  },
  {
    policyId: 'insulin-cap-35',
    stats: [
      {
        label: 'US vs world',
        value: '9.7×',
        source: 'RAND Corporation',
        url: 'https://www.rand.org/news/press/2024/02/01/index1.html',
        year: 2024,
        notes:
          '"U.S. manufacturer gross prices per 100 international units of insulin were on average 9.71 times those in OECD comparison countries"',
        chart: {
          type: 'comparison',
          data: [
            { name: 'US', value: 971 },
            { name: 'OECD', value: 100 },
          ],
        },
      },
      {
        label: 'Price drop',
        value: '-70%',
        source: 'Visual Capitalist',
        url: 'https://www.visualcapitalist.com/cp/rising-cost-of-insulin-us/',
        year: 2024,
        notes:
          '"Eli Lilly announced it would reduce prices of insulin by 70% towards the end of 2023, bringing 10mL Humalog to $66.40"',
        chart: {
          type: 'trend',
          data: [
            { name: '\'16', value: 255 },
            { name: '\'17', value: 275 },
            { name: '\'24', value: 66 },
          ],
        },
      },
    ],
  },
  {
    policyId: 'minimum-wage-17',
    stats: [
      {
        label: '1968 peak',
        value: '$14.47',
        source: 'EPI',
        url: 'https://www.epi.org/publication/the-federal-minimum-wage-has-been-eroded-by-decades-of-inaction/',
        year: 2024,
        notes:
          '"The federal minimum wage\'s purchasing power peaked in 1968, at $1.60 (which equals $14.47 in 2024 dollars)"',
        chart: {
          type: 'comparison',
          data: [
            { name: '\'68', value: 1447 },
            { name: '\'24', value: 725 },
          ],
        },
      },
      {
        label: 'Real value',
        value: '-46%',
        source: 'Statista',
        url: 'https://www.statista.com/statistics/1065466/real-nominal-value-minimum-wage-us/',
        year: 2024,
        notes:
          '"The real value of the federal minimum wage has decreased by 46% since its inflation-adjusted peak in February 1968"',
      },
    ],
  },
  {
    policyId: 'paid-family-leave',
    stats: [
      {
        label: 'US vs OECD',
        value: '0 wks',
        source: 'Bipartisan Policy Center',
        url: 'https://bipartisanpolicy.org/explainer/paid-family-leave-across-oecd-countries/',
        year: 2024,
        notes:
          '"The U.S. is the only OECD member country—and one of only six countries in the world—without a national paid parental leave policy"',
        chart: {
          type: 'bar',
          data: [
            { name: 'US', value: 0, color: '#C91A2B' },
            { name: 'UK', value: 39, color: '#888' },
            { name: 'DE', value: 58, color: '#888' },
          ],
        },
      },
      {
        label: 'OECD avg',
        value: '19 wks',
        source: 'OECD',
        url: 'https://www.oecd.org/els/soc/pf2_1_parental_leave_systems.pdf',
        year: 2024,
        notes:
          '"On average across OECD countries, mothers are entitled to just under 19 weeks of paid maternity leave around childbirth"',
      },
    ],
  },
  {
    policyId: 'end-citizens-united',
    stats: [
      {
        label: 'Outside $',
        value: '$16B+',
        source: 'OpenSecrets',
        url: 'https://www.opensecrets.org',
        year: 2024,
        notes: 'Outside spending in federal elections since Citizens United (2010)',
        chart: {
          type: 'trend',
          data: [
            { name: '2010', value: 300 },
            { name: '2014', value: 560 },
            { name: '2018', value: 1100 },
            { name: '2022', value: 2600 },
          ],
        },
      },
      {
        label: 'Party support',
        value: '76%',
        source: 'Pew Research Center',
        url: 'https://pewresearch.org',
        year: 2023,
        notes: 'Support for limiting campaign spending',
        chart: {
          type: 'bar',
          data: [
            { name: 'Dem', value: 88, color: '#2F3BBD' },
            { name: 'GOP', value: 62, color: '#C91A2B' },
            { name: 'Ind', value: 76 },
          ],
        },
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
