import { PolicyMethodology } from '../index';

export const junkFeePrevention: PolicyMethodology = {
  policyId: 'junk-fee-prevention',
  policyName: 'Junk Fee Prevention (All-In Pricing)',
  description: 'Ban hidden mandatory fees for hotels, tickets, and airlines by requiring upfront "all-in" pricing, ensuring the advertised price is the final price. This consumer protection measure enjoys rare bipartisan appeal and targets deceptive corporate practices that cost Americans billions.',
  overallRationale: 'This policy has 87% bipartisan support. All ideological lenses view it favorably with an average archetype score in the mid-70s and low polarization. The combination of market transparency, consumer empowerment, and fairness yields a rare scenario of cross-ideological agreement.',
  factors: {
    hayek: {
      score: 0.7,
      reasoning: 'Relatively decentralized solution. Rather than central planning of prices, it simply mandates transparency. Firms still set prices based on local market signals, but must reveal the full cost up front. This avoids requiring any bureaucratic omniscience.',
      keyPoints: [
        'Mandates transparency, not price planning',
        'Firms still set prices based on local market signals',
        'Must reveal full cost up front',
        'Avoids bureaucratic omniscience',
        'Enhances rather than replaces market mechanism',
      ],
      sources: [
        'Hayek - Price signals and knowledge',
        'Consumer protection economic literature',
      ],
    },
    ostrom: {
      score: 0.8,
      reasoning: 'The policy operates at the appropriate scale (federal) for a widespread market problem. Hidden fees in travel and ticketing are national in scope, so a federal rule (or FTC enforcement) matches the problem\'s scale, aligning authority with reach.',
      keyPoints: [
        'Federal scale appropriate for national market problem',
        'Hidden fees are national in scope',
        'FTC enforcement matches problem scale',
        'Authority aligns with reach',
        'Individual businesses implement locally',
      ],
      sources: [
        'FTC enforcement authority',
        'State consumer protection variations',
      ],
    },
    downs: {
      score: 0.9,
      reasoning: 'Highly legible rule. "The price you see is the price you pay" is a clear, one-step mandate. There are minimal loopholes and it\'s easy for consumers and regulators to understand and monitor compliance.',
      keyPoints: [
        '"Price you see is price you pay" - clear mandate',
        'Minimal loopholes possible',
        'Easy for consumers to understand',
        'Easy for regulators to monitor compliance',
        'One-step rule with clear enforcement',
      ],
      sources: [
        'PIRG junk fees consumer protection report',
        'All-in pricing requirements',
      ],
    },
    olson: {
      score: 0.8,
      reasoning: 'Robust against capture. It universally applies across industries like lodging and ticketing, leaving little room for special exemptions. While industry lobbies (hotel and airline groups) oppose it, the simple, broad mandate makes it harder for them to create carve-outs or complex loopholes. Enforcement by the FTC with penalties for violations further deters gaming the system.',
      keyPoints: [
        'Universally applies across industries',
        'Little room for special exemptions',
        'Simple mandate hard to create carve-outs around',
        'FTC enforcement with penalties deters gaming',
        'Industry lobbies oppose but can\'t easily capture',
      ],
      sources: [
        'Navigator Research junk fees polling',
        'White House CEA junk fees report',
      ],
    },
    keynes: {
      score: 0.5,
      reasoning: 'Neutral macroeconomic impact. This transparency rule is not designed as a counter-cyclical economic stabilizer, but it also doesn\'t amplify cycles. Any effects on overall spending are modest; consumers may save money on fees (potentially spending elsewhere), but the primary goal is fairness, not economic stimulus or restraint.',
      keyPoints: [
        'Not designed as counter-cyclical stabilizer',
        'Doesn\'t amplify economic cycles',
        'Modest effects on overall spending',
        'Consumers may redirect fee savings',
        'Primary goal is fairness, not stimulus',
      ],
      sources: [],
    },
    pettit: {
      score: 0.8,
      reasoning: 'Empowers consumers. By eliminating surprise fees, consumers are less at the mercy of corporate tactics. It gives individuals more control and freedom of choice – no longer can a seller spring an arbitrary fee at checkout without disclosure. This reduces dependence on the seller\'s "power to deceive," bolstering consumer independence (an aspect of non-domination).',
      keyPoints: [
        'Eliminates surprise fees empowering consumers',
        'Less at mercy of corporate tactics',
        'More control and freedom of choice',
        'No arbitrary fees sprung at checkout',
        'Reduces seller\'s "power to deceive"',
      ],
      sources: [
        'Consumer protection as non-domination',
        'Behavioral economics on deceptive pricing',
      ],
    },
    hirschman: {
      score: 0.9,
      reasoning: 'Strengthens exit options. With transparent pricing, customers can more easily "exit" bad deals and shop around. Comparison shopping becomes practical again when prices are clear, restoring competitive pressure. The policy doesn\'t create formal voice mechanisms, but by facilitating exit it indirectly pressures firms to improve or lose customers.',
      keyPoints: [
        'Transparent pricing enables shopping around',
        'Customers can "exit" bad deals easily',
        'Comparison shopping becomes practical',
        'Restores competitive pressure',
        'Exit pressure forces firms to improve',
      ],
      sources: [
        'Competition effects of price transparency',
        'White House CEA on junk fees and competition',
      ],
    },
    buchanan: {
      score: 0.8,
      reasoning: 'Broadly Pareto-improving. Virtually all consumers benefit from transparency, and honest businesses benefit from a level playing field. Few feel like "losers" coerced by this rule – aside from companies who profited off confusion. Support for banning junk fees is overwhelmingly bipartisan (87% overall support), suggesting near-consensus consent. The trade-offs are diffuse and outweighed by consumer gains.',
      keyPoints: [
        '87% bipartisan support - near consensus',
        'Virtually all consumers benefit',
        'Honest businesses benefit from level field',
        'Only losers are those who profited from confusion',
        'Pareto-improving for vast majority',
      ],
      sources: [
        'Navigator Research polling',
        'Consumer protection justification',
      ],
    },
    polanyi: {
      score: 0.6,
      reasoning: 'Market practice tempered by fairness. While not about de-commodifying an essential human need, this rule does buffer consumers from a pure caveat-emptor market. It reins in a predatory market behavior, embedding a norm of honesty in transactions. This is a mild move to protect people from hidden costs, aligning the market with social expectations of fairness. It\'s a protective regulation, though not a social safety net or provision of essentials.',
      keyPoints: [
        'Buffers consumers from pure caveat-emptor market',
        'Reins in predatory market behavior',
        'Embeds norm of honesty in transactions',
        'Aligns market with social fairness expectations',
        'Protective but not a social safety net',
      ],
      sources: [],
    },
    rawls: {
      score: 0.6,
      reasoning: 'Slightly progressive effect. The ban on hidden fees isn\'t directly targeted to the poor, but it helps the worst-off avoid exploitative charges. Surprise fees (like overdrafts or ticket add-ons) often hit those who can least afford them. By removing these, lower-income consumers save money proportionally significant to their budget. However, benefits are broad-based, so it\'s only moderately focused on the least advantaged.',
      keyPoints: [
        'Helps worst-off avoid exploitative charges',
        'Surprise fees hit those who can least afford them',
        'Lower-income save proportionally more',
        'Benefits are broad-based, not targeted',
        'Moderately focused on least advantaged',
      ],
      sources: [
        'CFPB junk fee impact studies',
        'Income distribution of fee burden',
      ],
    },
    george: {
      score: 0.8,
      reasoning: 'Cuts down rent-seeking. Junk fees are a form of unearned revenue extracted through consumer lock-in and confusion. Forcing upfront pricing pressures firms to compete on honest prices, effectively eliminating a source of price-gouging rent. The Act doesn\'t explicitly tax away rents, but by banning the hidden-fee strategy it stops companies from reaping profits that aren\'t tied to real value creation – a result very much in line with Georgist principles.',
      keyPoints: [
        'Junk fees are unearned revenue via lock-in/confusion',
        'Upfront pricing forces honest competition',
        'Eliminates source of price-gouging rent',
        'Stops profits not tied to real value creation',
        'Aligns with Georgist anti-rent-seeking principles',
      ],
      sources: [
        'Economic rent from market power',
        'Information asymmetry economics',
      ],
    },
    acemoglu: {
      score: 0.7,
      reasoning: 'Levels the playing field in markets. Transparency in pricing lowers barriers for new entrants (e.g. smaller companies can compete more easily if giants can\'t hide fees to appear cheaper). It fosters a more inclusive market by ensuring consumers base decisions on actual price-value, not fine-print tricks. By undermining an exploitative advantage used by some dominant firms, it nudges the marketplace toward greater openness and competition.',
      keyPoints: [
        'Lowers barriers for new market entrants',
        'Smaller companies can compete more easily',
        'Consumers base decisions on actual value',
        'Undermines exploitative advantages of dominant firms',
        'Fosters more inclusive, open market',
      ],
      sources: [
        'Consumer information access studies',
        'Market participation barriers',
      ],
    },
    walzer: {
      score: 0.5,
      reasoning: 'Appropriate norms in the market sphere. Walzer\'s sphere justice is about using the proper standards in each domain. Here, the policy insists on truth in pricing – a basic fairness norm within the economic sphere. It doesn\'t involve money buying power in a different sphere (like politics or education), but it does curb the ability to use money and deception to gain an unfair edge in commerce. It keeps the market\'s exchange logic honest, but it\'s a relatively minor correction.',
      keyPoints: [
        'Insists on truth in pricing - basic fairness norm',
        'Keeps market exchange logic honest',
        'Curbs deception for unfair commercial edge',
        'Doesn\'t involve cross-sphere corruption',
        'Relatively minor correction to commerce sphere',
      ],
      sources: [
        'Walzer - Spheres of Justice on commerce',
        'Market ethics literature',
      ],
    },
  },
  modifiers: [
    {
      id: 'strong-penalties',
      name: 'Strong Penalty Structure',
      description: 'Significant fines for violations to ensure compliance',
      factorChanges: { olson: 0.1, downs: 0.05 },
    },
    {
      id: 'real-time-pricing',
      name: 'Real-Time Dynamic Pricing Disclosure',
      description: 'Require disclosure when prices change based on demand',
      factorChanges: { downs: 0.05, pettit: 0.1 },
    },
  ],
};
