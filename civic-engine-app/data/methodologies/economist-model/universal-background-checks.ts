import { PolicyMethodology } from '../index';

export const universalBackgroundChecks: PolicyMethodology = {
  policyId: 'universal-background-checks',
  policyName: 'Universal Background Checks for Gun Purchases',
  description: 'Require background checks for all firearm sales, including private sales and gun shows, closing the "private sale loophole" in current federal law.',
  overallRationale: 'Universal background checks have 90%+ support including 89% of Republicans and 77% of gun owners. The policy builds on existing NICS infrastructure (Hayek: 0.7), has strong polycentric implementation through state/local dealers (Ostrom: 0.9), and is highly legible—most Americans assume it\'s already the law (Downs: 0.9). High consent score (Buchanan: 0.9) reflects broad agreement across political lines. Scores moderately on Olson (0.8) because concentrated opposition has historically blocked implementation despite widespread support.',
  factors: {
    hayek: {
      score: 0.7,
      reasoning: 'Builds on existing NICS infrastructure rather than new bureaucracy. Uses distributed network of licensed dealers. Simple eligibility determination (prohibited person list) requires minimal central planning.',
      keyPoints: [
        'Uses existing FBI NICS system',
        'Distributed dealer network conducts checks',
        'Binary yes/no determination',
        'No new bureaucratic apparatus',
        'Leverages existing criminal justice data',
      ],
      sources: [
        'FBI NICS operations data',
        'ATF licensed dealer statistics',
        'RAND Corporation gun policy research',
      ],
    },
    ostrom: {
      score: 0.9,
      reasoning: 'Excellent polycentric structure: federal NICS database, state point-of-contact options, local dealer implementation. 21 states already have universal checks, demonstrating multi-level governance working.',
      keyPoints: [
        'Federal database, state implementation options',
        'Local dealers conduct actual checks',
        '21 states already have some form of universal checks',
        'State point-of-contact system allows variation',
        'Interstate trafficking requires federal floor',
      ],
      sources: [
        'Giffords Law Center state law comparison',
        'FBI NICS state participation data',
        'RAND multi-level gun policy analysis',
      ],
    },
    downs: {
      score: 0.9,
      reasoning: 'Maximally legible: "All gun sales require background checks." Most Americans already assume this is the law. Clear binary outcome. Extends existing system rather than creating new complexity.',
      keyPoints: [
        'One sentence policy: check all sales',
        'Polling shows most assume already is law',
        'Clear yes/no determination',
        'Uses existing known system',
        'No complex eligibility calculations',
      ],
      sources: [
        'Polling on assumptions about current law',
        'FBI NICS processing statistics',
        'Public opinion research on gun laws',
      ],
    },
    olson: {
      score: 0.8,
      reasoning: '90%+ support provides exceptional political protection. However, concentrated gun lobby opposition (NRA) has historically blocked implementation. Score reflects that broad support should eventually overcome narrow opposition.',
      keyPoints: [
        '90%+ support provides massive political cover',
        'NRA opposition is paradigm case of concentrated interest',
        'Policy failure demonstrates Olsonian problem',
        'Broad support eventually should prevail',
        'No lobby profits from opposing checks',
      ],
      sources: [
        'NRA lobbying expenditure data',
        'Campaign contribution patterns',
        'Olson - Logic of Collective Action',
      ],
    },
    keynes: {
      score: 0.5,
      reasoning: 'Not designed as stabilizer. Minimal macroeconomic impact. However, reducing gun violence has economic benefits that compound over time.',
      keyPoints: [
        'Not designed as economic policy',
        'Minimal direct macro impact',
        'Violence reduction has economic benefits',
        'Healthcare cost reduction over time',
      ],
      sources: [
        'Economic cost of gun violence studies',
      ],
    },
    pettit: {
      score: 0.8,
      reasoning: 'Significantly reduces domination. Prohibited persons (domestic abusers, violent felons) cannot easily obtain weapons to dominate others. Protects potential victims from armed threats. Minor burden on eligible purchasers.',
      keyPoints: [
        'Prevents domestic abusers from arming',
        'Reduces stalker access to weapons',
        'Minimal burden on eligible buyers (minutes)',
        'Protects vulnerable from armed domination',
        'Liberty interest of potential victims protected',
      ],
      sources: [
        'Domestic violence and firearm access studies',
        'Stalking and gun violence research',
        'Johns Hopkins gun policy research',
      ],
    },
    hirschman: {
      score: 0.5,
      reasoning: 'Provides voice through democratic gun regulation. Maintains exit options for legal purchasers. Does not create new voice mechanisms but reflects existing voice.',
      keyPoints: [
        'Democratic voice on gun safety',
        'Legal buyers retain full access',
        'Appeals process for false denials',
        'Reflects 90%+ democratic will',
      ],
      sources: [
        'NICS appeals process data',
      ],
    },
    buchanan: {
      score: 0.9,
      reasoning: 'Near-unanimous consent: 90%+ overall, 89% Republicans, 77% gun owners. Only "losers" are prohibited persons who are already legally barred. Approaches Buchanan\'s unanimity principle.',
      keyPoints: [
        '90%+ overall support',
        '89% Republican support',
        '77% gun owner support',
        'Only losers already legally prohibited',
        'Approaches constitutional unanimity',
      ],
      sources: [
        'Gallup polling data',
        'Pew gun owner polling',
        'Buchanan - Calculus of Consent',
      ],
    },
    polanyi: {
      score: 0.9,
      reasoning: 'Strongly de-commodifies gun access by imposing safety criteria on market transactions. Treats public safety as value that cannot be sold away. Gun access becomes civic matter, not pure market exchange.',
      keyPoints: [
        'Imposes non-market criteria on transactions',
        'Public safety not purchasable',
        'Treats guns as civic matter',
        'Market alone cannot determine access',
        'Protective counter-movement against pure commodification',
      ],
      sources: [
        'Polanyi - Great Transformation',
        'Gun market regulation literature',
      ],
    },
    rawls: {
      score: 0.8,
      reasoning: 'Significantly benefits worst-off: domestic violence victims, residents of high-violence areas, those threatened by prohibited persons. Gun violence disproportionately affects disadvantaged communities.',
      keyPoints: [
        'Domestic violence victims primary beneficiaries',
        'High-violence communities benefit most',
        'Disadvantaged areas have highest gun death rates',
        'Studies show intimate partner homicide reduction',
        'Worst-off face greatest gun violence risk',
      ],
      sources: [
        'Johns Hopkins background check study',
        'Geographic gun violence data',
        'Domestic violence firearm research',
      ],
    },
    george: {
      score: 0.5,
      reasoning: 'Not a tax or direct rent-targeting policy. However, does capture some regulatory rent by imposing compliance costs on transactions. Not designed to redistribute.',
      keyPoints: [
        'Not designed as rent policy',
        'Some compliance costs imposed',
        'Does not redistribute revenue',
        'Could be paired with gun tax',
      ],
      sources: [],
    },
    acemoglu: {
      score: 0.7,
      reasoning: 'Moderately inclusive: reduces violence that excludes vulnerable from participation. Does not create new barriers for eligible purchasers. Creates safer environment for economic and civic activity.',
      keyPoints: [
        'Reduces exclusionary violence',
        'No new barriers for eligible buyers',
        'Safer environment for participation',
        'Gun violence concentrates in disadvantaged areas',
      ],
      sources: [
        'Violence and economic participation research',
        'Gun violence geography studies',
      ],
    },
    walzer: {
      score: 0.9,
      reasoning: 'Clearly separates gun access from pure market ability. Applies safety/eligibility criteria appropriate to weapons. Money alone cannot purchase guns for prohibited persons. Appropriate sphere separation.',
      keyPoints: [
        'Gun access by safety criteria, not just money',
        'Appropriate criteria for dangerous goods',
        'Market cannot override eligibility',
        'Public safety sphere protected',
        'Citizenship sphere (rights) balanced with safety',
      ],
      sources: [
        'Walzer - Spheres of Justice',
        'Gun rights and public safety literature',
      ],
    },
  },
  modifiers: [
    {
      id: 'free-public-access',
      name: 'Free Public NICS Access',
      description: 'Allow private sellers to access NICS directly without dealer fee',
      factorChanges: { buchanan: 0.05, rawls: 0.1 },
    },
    {
      id: 'state-implementation',
      name: 'State Implementation Flexibility',
      description: 'Allow states to implement through various mechanisms',
      factorChanges: { ostrom: 0.1, hayek: 0.1 },
    },
    {
      id: 'prohibited-list-update',
      name: 'Updated Prohibited Person List',
      description: 'Expand prohibited categories to include domestic violence misdemeanants and stalkers',
      factorChanges: { pettit: 0.1, rawls: 0.1 },
    },
  ],
};
