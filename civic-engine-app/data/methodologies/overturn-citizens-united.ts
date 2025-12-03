import { PolicyMethodology } from './index';

export const overturnCitizensUnited: PolicyMethodology = {
  policyId: 'overturn-citizens-united',
  policyName: 'Overturn Citizens United',
  description: 'Constitutional amendment or legislation to overturn Citizens United v. FEC, allowing Congress to regulate money in politics and limit corporate/union political spending.',
  overallRationale: 'Overturning Citizens United scores exceptionally high on anti-capture (Olson), sphere justice (Walzer), and inclusivity (Acemoglu). The policy directly addresses how money corrupts democratic decision-making. 75% bipartisan support reflects broad agreement that unlimited money has distorted politics.',
  factors: {
    hayek: {
      score: 0.5,
      reasoning: 'Campaign finance regulation involves some centralized rule-making, but the goal is to restore decentralized democratic decision-making distorted by concentrated wealth.',
      keyPoints: [
        'FEC/FCC enforcement requires central authority',
        'Goal is restoring decentralized democracy',
        'Removes distortion from concentrated money',
        'Enables authentic bottom-up political information',
      ],
      sources: [
        'Campaign finance enforcement mechanisms',
        'Democratic theory and information',
      ],
    },
    ostrom: {
      score: 0.6,
      reasoning: 'Federal elections require federal regulation. However, states could have additional restrictions. Multi-level campaign finance regulation possible.',
      keyPoints: [
        'Federal rules for federal elections appropriate',
        'States can impose stricter limits',
        'Local elections could have local rules',
        'Polycentric regulation of different levels',
      ],
      sources: [
        'State campaign finance variations',
        'Multi-level election regulation',
      ],
    },
    downs: {
      score: 0.6,
      reasoning: 'Core message is simple: "Corporations aren\'t people; money isn\'t speech." However, actual campaign finance regulation involves complex rules and disclosure requirements.',
      keyPoints: [
        'Simple core principle: limit money in politics',
        'Implementation involves detailed regulations',
        'Disclosure requirements add transparency',
        'Clear goal, complex mechanism',
      ],
      sources: [
        'Campaign finance law complexity',
        'Disclosure requirements',
      ],
    },
    olson: {
      score: 1.0,
      reasoning: 'This is THE anti-capture policy. Citizens United enabled unlimited concentrated spending that captures policy. Overturning it is the foundational anti-capture reform.',
      keyPoints: [
        'Directly addresses mechanism of capture',
        'Limits concentrated wealth in politics',
        'Reduces lobbying power of narrow interests',
        'Foundational reform enabling other anti-capture policies',
      ],
      sources: [
        'Olson - Logic of Collective Action',
        'Campaign spending and policy outcomes research',
      ],
    },
    keynes: {
      score: 0.3,
      reasoning: 'Not an economic stabilizer. However, reducing capture may enable better counter-cyclical policy by freeing Congress from special interest pressure.',
      keyPoints: [
        'Not designed as economic stabilizer',
        'May enable better economic policy indirectly',
        'Reduces pressure for pro-cyclical tax cuts',
        'Indirect stabilizer through better governance',
      ],
      sources: [],
    },
    pettit: {
      score: 0.9,
      reasoning: 'Reduces domination of ordinary citizens by concentrated wealth in politics. Citizens not subject to arbitrary power of those who can outspend them in the political arena.',
      keyPoints: [
        'Reduces wealthy domination of politics',
        'Citizens\' votes not overwhelmed by money',
        'Political equality reduces arbitrary power',
        'Elected officials less dependent on wealthy donors',
      ],
      sources: [
        'Pettit - Republicanism',
        'Political equality research',
      ],
    },
    hirschman: {
      score: 0.8,
      reasoning: 'Massively amplifies ordinary citizens\' political voice. Currently, voices are drowned out by concentrated spending. Reform restores meaningful voice.',
      keyPoints: [
        'Restores value of ordinary citizens\' voice',
        'Reduces drowning out by wealthy spending',
        'Makes voting and advocacy meaningful',
        'Politicians more responsive to constituents',
      ],
      sources: [
        'Voter influence and campaign spending',
        'Constituent responsiveness research',
      ],
    },
    buchanan: {
      score: 0.7,
      reasoning: '75% bipartisan support represents strong consensus. Some wealthy donors and corporations lose, but democratic legitimacy benefits all. Approaches constitutional moment.',
      keyPoints: [
        '75% overall support including both parties',
        'Losers: concentrated wealthy interests',
        'Winners: democratic legitimacy for all',
        'Near-constitutional consensus on reform',
      ],
      sources: [
        'Polling on Citizens United',
        'Bipartisan reform support',
      ],
    },
    polanyi: {
      score: 0.5,
      reasoning: 'De-commodifies politics by removing price tag from political influence. Democracy not for sale. However, doesn\'t directly de-commodify economic goods.',
      keyPoints: [
        'De-commodifies political influence',
        'Democracy as social right, not purchasable',
        'Separates political sphere from market',
        'Part of protective counter-movement',
      ],
      sources: [
        'Democracy and commodification',
        'Political sphere independence',
      ],
    },
    rawls: {
      score: 0.7,
      reasoning: 'Levels political playing field, benefiting those without wealth to spend on politics. Enables policy that serves worst-off rather than wealthy donors.',
      keyPoints: [
        'Political equality benefits non-wealthy',
        'Enables policies serving worst-off',
        'Removes plutocratic advantage',
        'Fair value of political liberties',
      ],
      sources: [
        'Rawls - Political Liberalism',
        'Fair value of political liberty',
      ],
    },
    george: {
      score: 0.4,
      reasoning: 'Indirectly addresses rent-seeking by reducing political mechanism through which rents are protected. Does not directly target economic rent.',
      keyPoints: [
        'Reduces protection of rent through politics',
        'Limits lobbying for rent-preserving policy',
        'Doesn\'t directly tax rent',
        'Enables rent-targeting policy reform',
      ],
      sources: [
        'Lobbying and rent-seeking',
        'Political protection of economic rent',
      ],
    },
    acemoglu: {
      score: 0.9,
      reasoning: 'Foundational reform for inclusive institutions. Unlimited money creates extractive politics serving narrow interests. Reform enables broad-based policy-making.',
      keyPoints: [
        'Reduces extractive political capture',
        'Enables inclusive policy-making',
        'Levels playing field for political participation',
        'Prerequisite for other inclusive reforms',
      ],
      sources: [
        'Acemoglu & Robinson - Why Nations Fail',
        'Money in politics and extraction',
      ],
    },
    walzer: {
      score: 1.0,
      reasoning: 'The paradigm case of sphere corruption: money buying political power. Overturning Citizens United restores separation between economic and political spheres.',
      keyPoints: [
        'Money buying politics = sphere corruption',
        'Restores appropriate political criteria',
        'Citizenship, not wealth, determines political voice',
        'Paradigmatic Walzerian reform',
      ],
      sources: [
        'Walzer - Spheres of Justice',
        'Money and political sphere',
      ],
    },
  },
  modifiers: [
    {
      id: 'constitutional-amendment',
      name: 'Constitutional Amendment Path',
      description: 'Pursue constitutional amendment for permanent solution',
      factorChanges: { buchanan: 0.1, downs: -0.1 },
    },
    {
      id: 'public-financing',
      name: 'Public Campaign Financing',
      description: 'Pair with public financing of campaigns',
      factorChanges: { rawls: 0.1, acemoglu: 0.1 },
    },
  ],
};
