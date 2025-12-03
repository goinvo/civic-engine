import { PolicyMethodology } from './index';

export const simplifiedTaxFiling: PolicyMethodology = {
  policyId: 'simplified-tax-filing',
  policyName: 'Simplified Tax Filing (IRS Direct File)',
  description: 'Free, simple tax filing directly through the IRS, with pre-populated returns for most taxpayers who can file online in minutes.',
  overallRationale: 'IRS Direct File scores exceptionally high on legibility (Downs), rent targeting (George), and inclusivity (Acemoglu). It eliminates the tax preparation industry\'s rent extraction while making tax compliance radically simpler. 73% support reflects broad appeal despite industry opposition.',
  factors: {
    hayek: {
      score: 0.7,
      reasoning: 'IRS already has the information; Direct File uses existing data rather than requiring citizens to re-enter it. Reduces central planning by eliminating duplicative reporting.',
      keyPoints: [
        'Uses information IRS already possesses',
        'Reduces redundant data entry',
        'Citizens choose whether to use free option',
        'Decentralized choice with centralized efficiency',
      ],
      sources: [
        'IRS information matching',
        'Direct File pilot results',
      ],
    },
    ostrom: {
      score: 0.5,
      reasoning: 'Federal tax system is inherently national scope. Direct File is centralized by necessity. However, allows individual taxpayers to manage their own returns.',
      keyPoints: [
        'Federal taxes require federal administration',
        'Individual filing remains decentralized choice',
        'Could integrate with state direct file options',
        'Centralized efficiency, individual control',
      ],
      sources: [
        'Federal tax system structure',
        'State tax filing integration',
      ],
    },
    downs: {
      score: 1.0,
      reasoning: 'Maximum legibility: the entire purpose is simplification. Pre-populated returns show exactly what IRS knows. Most taxpayers can file in minutes. No hidden complexity.',
      keyPoints: [
        'Core purpose IS simplification',
        'Pre-populated returns maximize transparency',
        'Simple returns filed in minutes',
        '2024 pilot: 90% satisfaction, average 21 minutes',
      ],
      sources: [
        'IRS Direct File pilot results',
        'User satisfaction surveys',
      ],
    },
    olson: {
      score: 0.5,
      reasoning: '73% support provides political base, but concentrated opposition from TurboTax/H&R Block who profit from complexity. Classic Olsonian problem: diffuse benefit vs. concentrated industry opposition.',
      keyPoints: [
        '73% public support',
        'Concentrated industry opposition (Intuit lobbying)',
        'Tax prep industry spent millions against',
        'Free File Alliance captured previous reform attempt',
      ],
      sources: [
        'Tax preparation industry lobbying data',
        'Free File Alliance history',
        'ProPublica TurboTax investigation',
      ],
    },
    keynes: {
      score: 0.3,
      reasoning: 'Not designed as economic stabilizer. May slightly improve consumer spending by reducing tax prep costs. Could enable faster refund delivery.',
      keyPoints: [
        'Not designed as stabilizer',
        'Saves households $150-400 in prep fees',
        'Faster refunds could boost spending',
        'Modest macroeconomic impact',
      ],
      sources: [
        'Tax preparation cost data',
        'Refund timing studies',
      ],
    },
    pettit: {
      score: 0.7,
      reasoning: 'Frees taxpayers from dependence on expensive preparers. No arbitrary gatekeeping between citizens and government. Direct relationship replaces intermediary power.',
      keyPoints: [
        'Eliminates dependence on costly intermediaries',
        'Direct citizen-government relationship',
        'No preparer upselling or manipulation',
        'Taxpayer controls own filing',
      ],
      sources: [
        'Consumer protection in tax prep',
        'Preparer misconduct data',
      ],
    },
    hirschman: {
      score: 0.7,
      reasoning: 'Provides free exit from expensive tax prep industry. Clear alternative to commercial options. Voice to IRS directly rather than through intermediary.',
      keyPoints: [
        'Free exit from commercial preparers',
        'Direct voice to IRS',
        'No lock-in to preparer software',
        'Competition improves commercial options too',
      ],
      sources: [
        'Market competition effects',
        'Consumer choice in tax prep',
      ],
    },
    buchanan: {
      score: 0.7,
      reasoning: '73% support is strong majority. Clear losers (tax prep industry) but they are extracting rent, not providing proportionate value. Broad benefit to taxpayers.',
      keyPoints: [
        '73% overall support',
        'Losers: tax prep industry',
        'Winners: all taxpayers (time and money)',
        'Industry loss is rent extraction, not value creation',
      ],
      sources: [
        'Polling on free IRS filing',
        'Tax prep industry economics',
      ],
    },
    polanyi: {
      score: 0.5,
      reasoning: 'Makes tax compliance a public service rather than market transaction. Doesn\'t de-commodify broader economic life but removes one unnecessary market.',
      keyPoints: [
        'Civic obligation without market intermediary',
        'Public provision of filing service',
        'Reduces marketization of tax compliance',
        'Government provides what it should provide',
      ],
      sources: [
        'Public goods theory',
        'Tax administration as public service',
      ],
    },
    rawls: {
      score: 0.8,
      reasoning: 'Benefits lower-income taxpayers most: they spend larger share of income on prep fees, are more likely to be targeted by predatory preparers, and benefit most from simplicity.',
      keyPoints: [
        'Lower-income pay higher percentage in prep fees',
        'Predatory preparers target EITC filers',
        'Simple filing helps those with less tax knowledge',
        'Free service eliminates regressive cost',
      ],
      sources: [
        'EITC filing costs',
        'Predatory tax prep research',
      ],
    },
    george: {
      score: 0.8,
      reasoning: 'Directly targets rent extraction by tax prep industry. $15+ billion market largely exists because IRS is prevented from offering free service. Classic rent capture.',
      keyPoints: [
        'Tax prep industry extracts $15B+ annually',
        'Industry lobbies to maintain complexity',
        'Rent exists only because of artificial barrier',
        'Free filing eliminates rent entirely',
      ],
      sources: [
        'Tax preparation market size',
        'Industry lobbying to prevent free filing',
      ],
    },
    acemoglu: {
      score: 0.9,
      reasoning: 'Highly inclusive: removes barrier to tax compliance. Everyone can file easily regardless of income or education. Eliminates gatekeeper industry that extracts from filing.',
      keyPoints: [
        'Universal free access to tax filing',
        'Removes educational/financial barriers',
        'Eliminates gatekeeper extraction',
        'Equal access to civic obligation fulfillment',
      ],
      sources: [
        'Tax filing accessibility research',
        'Civic participation barriers',
      ],
    },
    walzer: {
      score: 0.8,
      reasoning: 'Tax compliance is civic obligation that should not require market payment. Money should not buy easier compliance with civic duty. Appropriate public provision.',
      keyPoints: [
        'Civic obligation shouldn\'t require market payment',
        'Public provision for civic duty',
        'Wealth shouldn\'t buy easier compliance',
        'Appropriate separation of spheres',
      ],
      sources: [
        'Walzer - Spheres of Justice',
        'Civic duty and market separation',
      ],
    },
  },
  modifiers: [
    {
      id: 'auto-filing',
      name: 'Automatic Filing Option',
      description: 'For simple returns, IRS files automatically unless taxpayer opts out',
      factorChanges: { downs: 0.05, rawls: 0.1 },
    },
    {
      id: 'state-integration',
      name: 'State Tax Integration',
      description: 'Integrate federal and state filing in one system',
      factorChanges: { ostrom: 0.2, downs: 0.05 },
    },
  ],
};
