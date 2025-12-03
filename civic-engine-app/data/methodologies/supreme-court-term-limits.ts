import { PolicyMethodology } from './index';

export const supremeCourtTermLimits: PolicyMethodology = {
  policyId: 'supreme-court-term-limits',
  policyName: 'Supreme Court Term Limits',
  description: 'Establish 18-year term limits for Supreme Court justices, with one vacancy occurring every two years, making appointments regular and predictable.',
  overallRationale: 'Supreme Court term limits score high on anti-capture (Olson), inclusivity (Acemoglu), and legibility (Downs) by making the Court more accountable and reducing the stakes of any single appointment. 75% bipartisan support reflects broad desire for Court reform.',
  factors: {
    hayek: {
      score: 0.5,
      reasoning: 'Judicial appointments remain decentralized across administrations. However, constitutional interpretation remains centralized. Policy doesn\'t change centralization of judicial power itself.',
      keyPoints: [
        'Distributes appointments across more administrations',
        'Doesn\'t change centralized nature of constitutional review',
        'Regularizes what was previously random timing',
        'Reduces single-president Court-shaping power',
      ],
      sources: [
        'Constitutional design literature',
        'Comparative judicial systems',
      ],
    },
    ostrom: {
      score: 0.5,
      reasoning: 'Supreme Court remains national institution. Policy doesn\'t create polycentric judicial system. However, regular rotation better reflects evolving national consensus.',
      keyPoints: [
        'Court remains single national body',
        'No multi-level judicial reform',
        'Better reflects changing electorate over time',
        'Doesn\'t address federal/state court balance',
      ],
      sources: [
        'Federal judicial structure',
        'Polycentric governance theory',
      ],
    },
    downs: {
      score: 0.8,
      reasoning: 'Highly transparent: one vacancy every two years, each justice serves 18 years. Removes randomness and gamesmanship. Clear, predictable rules.',
      keyPoints: [
        'Simple rule: 18 years, one vacancy per presidential term',
        'Removes random timing of vacancies',
        'Eliminates strategic retirement games',
        'Every president gets equal appointments',
      ],
      sources: [
        'Fix the Court proposals',
        'Term limit legislation details',
      ],
    },
    olson: {
      score: 0.8,
      reasoning: 'Reduces ability of any faction to "capture" the Court for generations. Regular turnover prevents entrenchment. Broad support (75%) resists partisan capture.',
      keyPoints: [
        'No faction can capture Court for 40+ years',
        'Regular turnover prevents entrenchment',
        'Reduces stakes of any single appointment',
        '75% bipartisan support protects reform',
      ],
      sources: [
        'Polling on Court reform',
        'Capture theory and judicial tenure',
      ],
    },
    keynes: {
      score: 0.2,
      reasoning: 'Not an economic policy. No macroeconomic stabilization function. Institutional reform of judiciary.',
      keyPoints: [
        'Institutional reform, not economic policy',
        'No counter-cyclical function',
        'Judicial stability may indirectly support economic stability',
        'Not designed as stabilizer',
      ],
      sources: [],
    },
    pettit: {
      score: 0.7,
      reasoning: 'Reduces arbitrary power concentrated in any single generation of justices. Regular turnover ensures Court reflects contemporary rather than historical majority.',
      keyPoints: [
        'Reduces dead-hand control of past majorities',
        'Living citizens have ongoing say through regular appointments',
        'Limits arbitrary power of any appointment cohort',
        'Reduces domination by historical accidents of timing',
      ],
      sources: [
        'Democratic theory on judicial review',
        'Pettit - Republicanism and institutions',
      ],
    },
    hirschman: {
      score: 0.6,
      reasoning: 'Enhances democratic "voice" by ensuring regular connection between elections and Court composition. Citizens can\'t exit judicial authority but gain more voice.',
      keyPoints: [
        'Every election affects Court composition',
        'Citizens have predictable voice through elections',
        'Reduces feeling of powerlessness over Court',
        'Exit not possible but voice enhanced',
      ],
      sources: [
        'Democratic accountability literature',
        'Electoral connection to courts',
      ],
    },
    buchanan: {
      score: 0.7,
      reasoning: '75% bipartisan support represents strong consensus. Both parties would benefit from predictability over time. Reduces zero-sum nature of appointments.',
      keyPoints: [
        '75% overall bipartisan support',
        'Both parties benefit from predictability',
        'Reduces extreme stakes of any appointment',
        'Losers today become winners later predictably',
      ],
      sources: [
        'Polling on term limits',
        'Bipartisan reform support',
      ],
    },
    polanyi: {
      score: 0.3,
      reasoning: 'Not primarily a de-commodification policy. Institutional reform of judiciary. Does not directly buffer people from market forces.',
      keyPoints: [
        'Institutional reform, not market protection',
        'May indirectly protect rights through better Court',
        'Not designed for economic de-commodification',
        'Judicial policy, not economic policy',
      ],
      sources: [],
    },
    rawls: {
      score: 0.6,
      reasoning: 'May improve Court\'s responsiveness to contemporary needs of worst-off. Regular turnover prevents entrenchment of past majorities\' interests.',
      keyPoints: [
        'More responsive Court may better protect vulnerable',
        'Reduces entrenchment of historical privilege',
        'Regular turnover reflects evolving understanding of justice',
        'Not directly redistributive but may enable redistributive policy',
      ],
      sources: [
        'Court composition and rights protection',
        'Judicial responsiveness research',
      ],
    },
    george: {
      score: 0.2,
      reasoning: 'Not a fiscal or tax policy. No rent-targeting mechanism. Pure institutional reform.',
      keyPoints: [
        'No tax or revenue component',
        'Institutional, not fiscal reform',
        'Does not address economic rent',
        'Neutral on rent vs. labor taxation',
      ],
      sources: [],
    },
    acemoglu: {
      score: 0.8,
      reasoning: 'Makes Court more inclusive institution by ensuring regular democratic input. Reduces entrenchment that can make institutions extractive. Regular rotation promotes accountability.',
      keyPoints: [
        'Regular democratic input into Court composition',
        'Prevents entrenchment of narrow interests',
        'More accountable institution over time',
        'Reduces extractive potential of lifetime tenure',
      ],
      sources: [
        'Acemoglu & Robinson - Inclusive institutions',
        'Judicial accountability research',
      ],
    },
    walzer: {
      score: 0.6,
      reasoning: 'Ensures judicial sphere doesn\'t become permanently captured by one political moment. Maintains appropriate criteria (legal expertise, appointment) while adding accountability.',
      keyPoints: [
        'Maintains legal expertise as criterion',
        'Adds democratic accountability over time',
        'Prevents money from permanently buying Court control',
        'Balances judicial independence with democratic connection',
      ],
      sources: [
        'Separation of powers theory',
        'Judicial independence literature',
      ],
    },
  },
  modifiers: [
    {
      id: 'senior-status',
      name: 'Senior Status Option',
      description: 'Allow term-limited justices to serve on lower courts',
      factorChanges: { buchanan: 0.1, hayek: 0.1 },
    },
    {
      id: 'ethics-code',
      name: 'Binding Ethics Code',
      description: 'Pair with mandatory ethics code for justices',
      factorChanges: { olson: 0.1, downs: 0.1 },
    },
  ],
};
