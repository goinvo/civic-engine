import { PolicyMethodology } from './index';

export const ultraMillionaireWealthTax: PolicyMethodology = {
  policyId: 'ultra-millionaire-wealth-tax',
  policyName: 'Ultra-Millionaire Wealth Tax',
  description: 'A 2% annual tax on wealth above $50 million and 3% above $1 billion, targeting extreme wealth concentration and generating revenue for public investment.',
  overallRationale: 'The wealth tax scores exceptionally high on rent targeting (George), the floor (Rawls), and inclusivity (Acemoglu). It directly addresses wealth concentration that creates extractive institutions. 68% support reflects broad but not universal consensus, with practical implementation concerns moderating some scores.',
  factors: {
    hayek: {
      score: 0.4,
      reasoning: 'Requires annual wealth assessment, which involves significant information-gathering. However, targets clear thresholds ($50M, $1B) rather than complex calculations. Decentralized wealth holders make their own decisions about asset allocation.',
      keyPoints: [
        'Clear thresholds reduce administrative discretion',
        'Wealth assessment requires sophisticated valuation',
        'Targets stock, not flow – harder to measure',
        'Wealthy already report assets; extends existing system',
      ],
      sources: [
        'Warren wealth tax proposal details',
        'IRS asset reporting requirements',
      ],
    },
    ostrom: {
      score: 0.5,
      reasoning: 'Wealth inequality is a national/global issue appropriate for federal action. However, implementation is centralized at IRS. Could allow state piggyback taxes for polycentric element.',
      keyPoints: [
        'Federal scope matches national wealth concentration',
        'IRS-administered (centralized)',
        'Wealth is mobile – requires national enforcement',
        'Could enable state-level additional taxes',
      ],
      sources: [
        'Cross-border wealth taxation literature',
        'Federal tax administration',
      ],
    },
    downs: {
      score: 0.7,
      reasoning: 'Simple concept: "2% on wealth over $50 million." Clear thresholds easily understood. However, asset valuation introduces some complexity.',
      keyPoints: [
        'Simple rate structure: 2% over $50M, 3% over $1B',
        'Clear dollar thresholds',
        'Asset valuation adds complexity',
        'Most people easily understand basic concept',
      ],
      sources: [
        'Warren/Sanders wealth tax proposals',
        'Public understanding polling',
      ],
    },
    olson: {
      score: 0.5,
      reasoning: 'Targets narrow wealthy elite who have outsized political influence. However, that same elite intensely opposes and may capture implementation through lobbying for exemptions.',
      keyPoints: [
        '68% support provides political base',
        'Ultra-wealthy have immense lobbying resources',
        'Narrow target means concentrated opposition',
        'Tax avoidance industry will seek loopholes',
      ],
      sources: [
        'Wealth and political influence research',
        'Tax lobbying data',
      ],
    },
    keynes: {
      score: 0.4,
      reasoning: 'Not primarily a stabilizer; revenue is annual regardless of cycle. Could be mildly counter-cyclical if revenue funds automatic stabilizers. Wealth itself is pro-cyclical.',
      keyPoints: [
        'Annual tax, not automatic stabilizer',
        'Could fund counter-cyclical programs',
        'Wealth values decline in recessions (tax revenue falls)',
        'Not designed as stabilizer',
      ],
      sources: [
        'Wealth volatility data',
        'Tax revenue and business cycles',
      ],
    },
    pettit: {
      score: 0.8,
      reasoning: 'Reduces extreme wealth that translates to domination power. Concentrated wealth enables purchase of political influence and economic coercion. Tax reduces this power asymmetry.',
      keyPoints: [
        'Extreme wealth enables political domination',
        'Reduces power to buy elections and policy',
        'Limits concentration that enables economic coercion',
        'Shifts power balance toward ordinary citizens',
      ],
      sources: [
        'Wealth and political influence research',
        'Pettit - Non-domination and inequality',
      ],
    },
    hirschman: {
      score: 0.5,
      reasoning: 'Doesn\'t directly create exit or voice for ordinary people. Indirectly may improve voice by reducing plutocratic influence. Ultra-wealthy have exit options (emigration) policy must consider.',
      keyPoints: [
        'Reduces wealthy voice in politics (indirectly)',
        'May improve ordinary citizens\' relative voice',
        'Wealthy have exit options that need addressing',
        'Revenue could fund voice-enhancing programs',
      ],
      sources: [
        'Wealth emigration studies',
        'Political influence and voice',
      ],
    },
    buchanan: {
      score: 0.5,
      reasoning: '68% support is majority but not consensus. Creates clear losers (ultra-wealthy) who are not compensated. However, those losers have benefited from systems that enabled wealth accumulation.',
      keyPoints: [
        '68% support – majority but not near-unanimous',
        'Clear losers: those with $50M+ wealth',
        'Argument: wealth benefited from public investment',
        'Social contract perspective on wealth accumulation',
      ],
      sources: [
        'Polling on wealth tax',
        'Social contract theory of wealth',
      ],
    },
    polanyi: {
      score: 0.6,
      reasoning: 'Reduces wealth concentration that commodifies everything – land, politics, labor. Wealth tax is part of "double movement" against pure market society.',
      keyPoints: [
        'Limits wealth that commodifies all spheres',
        'Revenue can fund de-commodifying programs',
        'Part of protective counter-movement',
        'Doesn\'t directly de-commodify but enables it',
      ],
      sources: [
        'Polanyi - Great Transformation',
        'Wealth and commodification',
      ],
    },
    rawls: {
      score: 0.9,
      reasoning: 'Maximally progressive: only affects the very top of wealth distribution. Revenue can fund programs benefiting the worst-off. Reduces inequality that undermines fair equality of opportunity.',
      keyPoints: [
        'Affects only top 0.05% of households',
        'Revenue funds programs for worst-off',
        'Reduces inequality that limits opportunity',
        'Difference principle supports wealth redistribution',
      ],
      sources: [
        'Rawls - Justice as Fairness',
        'Wealth distribution data',
      ],
    },
    george: {
      score: 0.9,
      reasoning: 'Directly targets wealth, including land and capital gains from appreciation rather than labor. Comes closest to taxing "unearned increment" among modern proposals.',
      keyPoints: [
        'Taxes wealth (including land) not labor',
        'Captures appreciation, not just income',
        'Targets rentier wealth accumulation',
        'Most Georgist of mainstream tax proposals',
      ],
      sources: [
        'Henry George - Progress and Poverty',
        'Land value in ultra-wealthy portfolios',
      ],
    },
    acemoglu: {
      score: 0.9,
      reasoning: 'Directly attacks extreme wealth concentration that creates extractive institutions. Reduces barrier to entry and competition that concentrated wealth enables. Promotes inclusive economic institutions.',
      keyPoints: [
        'Reduces wealth that captures institutions',
        'Limits ability to buy barriers to entry',
        'Revenue invests in broad human capital',
        'Shifts from extractive toward inclusive',
      ],
      sources: [
        'Acemoglu & Robinson - Why Nations Fail',
        'Wealth concentration and institutions',
      ],
    },
    walzer: {
      score: 0.7,
      reasoning: 'Limits wealth that corrupts other spheres (politics, education, justice). Prevents money from buying everything. However, doesn\'t directly reform those spheres.',
      keyPoints: [
        'Reduces wealth that corrupts democratic sphere',
        'Limits purchase of political influence',
        'Doesn\'t prevent all sphere corruption',
        'Revenue can fund sphere-appropriate distribution',
      ],
      sources: [
        'Walzer - Spheres of Justice',
        'Wealth and sphere corruption',
      ],
    },
  },
  modifiers: [
    {
      id: 'exit-tax',
      name: 'Exit Tax on Emigration',
      description: 'Add tax on wealth transferred abroad to prevent evasion',
      factorChanges: { hirschman: -0.1, olson: 0.1 },
    },
    {
      id: 'irs-enforcement',
      name: 'Enhanced IRS Enforcement',
      description: 'Fund IRS to properly enforce wealth reporting',
      factorChanges: { olson: 0.2, downs: 0.1 },
    },
  ],
};
