import { PolicyMethodology } from './index';

export const supremeCourtTermLimits: PolicyMethodology = {
  policyId: 'supreme-court-term-limits',
  policyName: 'Supreme Court Term Limits',
  description: 'Limit U.S. Supreme Court Justices to non-renewable 18-year terms, with a new Justice appointed every two years, to regularize appointments and reduce politicization of the Court.',
  overallRationale: 'This reform would affect the entire population, though it has minimal direct economic impact. 67-78% of Americans support Supreme Court term limits, including majorities of Republicans and Democrats. The policy scores high on legibility (Downs: 1.0), scale match (Ostrom: 0.9), and inclusivity (Acemoglu: 0.8) by making the Court more accountable and reducing the stakes of any single appointment.',
  factors: {
    hayek: {
      score: 0.7,
      reasoning: 'The policy is straightforward and procedural, not requiring ongoing central planning or complex economic calculations. Once implemented by law or amendment, it runs on a fixed schedule (appointment every two years) rather than bureaucratic micro-management. This makes it relatively information-efficient and "rules-based," leveraging simple timing signals (vacancies every two years) instead of requiring omniscient oversight.',
      keyPoints: [
        'Straightforward procedural reform',
        'Fixed schedule, not bureaucratic micro-management',
        'Information-efficient and rules-based',
        'Simple timing signals replace random vacancies',
        'No continuous data processing required',
      ],
      sources: [
        'American Academy of Arts & Sciences term limits analysis',
        'Constitutional design literature',
      ],
    },
    ostrom: {
      score: 0.9,
      reasoning: 'The issue (lifetime tenure on the federal Supreme Court) is addressed at the proper federal level. An 18-year term limit aligns national decision power with a national problem. Every major democracy except the U.S. already limits high court terms, suggesting the scale of reform matches the scope of the institution.',
      keyPoints: [
        'Federal issue addressed at federal level',
        'National decision power matches national problem',
        'Every major democracy except U.S. limits high court terms',
        'Amendment involves states in ratification (3/4 approval)',
        'Polycentric approach with appropriate governance scale',
      ],
      sources: [
        'Brennan Center for Justice - Supreme Court Term Limits',
        'Comparative judicial systems research',
      ],
    },
    downs: {
      score: 1.0,
      reasoning: 'The reform is highly legible and transparent. The rule "each Justice serves 18 years, with appointments every two years" is simple for the public to understand. The trade-offs are explicit: each president gets 2 appointments per term, and Justices retire on a known schedule, ending the random "actuarial lottery" of vacancies. This clarity contrasts with the opaque, life-tenure system where timing of vacancies is unpredictable.',
      keyPoints: [
        'Extremely simple: 18 years, one vacancy per presidential term',
        'Each president gets equal appointments',
        'Ends random "actuarial lottery" of vacancies',
        'Trade-offs explicit and transparent',
        'No hidden clauses or complex rules',
      ],
      sources: [
        'Fix the Court proposals',
        'Public understanding polling',
      ],
    },
    olson: {
      score: 0.8,
      reasoning: 'Term limits are designed to be robust against partisan or special-interest capture. By guaranteeing regular turnover, no single political faction can dominate the Court for decades via strategic retirements or young appointees. The universal and permanent nature of the rule (applied to all future Justices) makes it hard to game – there\'s no loophole or exemption for special cases. The reform also often includes safeguards like senior status for rotating Justices to preserve judicial independence.',
      keyPoints: [
        'Regular turnover prevents faction domination',
        'Universal rule applied to all future Justices',
        'No loopholes or exemptions for special cases',
        'Senior status safeguard preserves independence',
        'Hard to game once implemented',
      ],
      sources: [
        'American Academy of Arts & Sciences on term limits',
        'Constitutional entrenchment analysis',
      ],
    },
    keynes: {
      score: 0.5,
      reasoning: 'This policy is neutral in macroeconomic cyclical terms (it doesn\'t directly affect economic booms or busts). But it does aim to stabilize the political cycle: regularizing appointments could dampen volatile swings in the Court\'s composition due to random deaths or strategic retirements. It provides a stabilizing rhythm (new Justice every 2 years) regardless of external shocks. On balance, it neither significantly amplifies nor counteracts economic fluctuations.',
      keyPoints: [
        'No direct macroeconomic stabilization effect',
        'Stabilizes political cycle, not economic cycle',
        'Provides rhythm regardless of external shocks',
        'Neither amplifies nor counteracts economic fluctuations',
        'Neutral on Keynesian stabilization axis',
      ],
      sources: [],
    },
    pettit: {
      score: 0.8,
      reasoning: 'The reform curtails the concentration of power and arbitrary influence in the judiciary. It prevents any single Justice from exerting outsized, decades-long influence over Americans\' rights. Regular turnover ensures that no Court can dominate the interpretation of law for a whole generation, which better secures citizens from enduring domination by past political forces. It gives the people (through their elected presidents and senators) a predictable, periodic say in the Court\'s makeup, enhancing liberty as non-domination.',
      keyPoints: [
        'Curtails concentration of judicial power',
        'Prevents decades-long influence by single Justice',
        'Secures citizens from domination by past political forces',
        'Predictable periodic democratic input',
        'Preserves judicial independence during term',
      ],
      sources: [
        'Republican freedom theory',
        'Judicial accountability research',
      ],
    },
    hirschman: {
      score: 0.6,
      reasoning: 'Voice: Term limits amplify the "voice" of the people in Supreme Court composition. Because every president will appoint two Justices, voters in each presidential election indirectly influence the Court\'s makeup in a reliable way. This reform addresses the feeling of powerlessness (lack of voice) that citizens might have when a Court vacancy is a rare chance event. Exit: For Justices, an 18-year term provides a known retirement point, reducing pressure to stay on the bench until death. Overall, the policy increases agency for the public through electoral voice.',
      keyPoints: [
        'Every presidential election influences Court makeup',
        'Addresses voter powerlessness over Court composition',
        'Known retirement point for Justices',
        'Increases public agency through electoral voice',
        'Exit not possible but voice enhanced',
      ],
      sources: [
        'Democratic accountability literature',
        'Electoral connection to courts research',
      ],
    },
    buchanan: {
      score: 0.7,
      reasoning: 'This reform enjoys broad support across the political spectrum, suggesting a high degree of consent. Polls show about 67-78% of Americans support Supreme Court term limits, including majorities of Republicans and Democrats. It doesn\'t create a clear class of "losers" among the public; everyone plays by the same rules of a rotating Court. Most proposals apply only to future appointments to respect implicit contracts with sitting Justices. The policy approaches a consensual improvement rather than a coercive imposition.',
      keyPoints: [
        '67-78% public support including both parties',
        'No clear class of losers among public',
        'Everyone plays by same rules',
        'Prospective application respects sitting Justices',
        'Approaches consensual improvement',
      ],
      sources: [
        'Newsweek polling on term limits',
        'Bipartisan reform support data',
      ],
    },
    polanyi: {
      score: 0.5,
      reasoning: 'Neutral. This factor concerns protection of people from pure market or survival pressures. Supreme Court term limits don\'t directly address market commodification or social safety nets. Indirectly, one could argue that a depoliticized, regularly refreshed Court will better protect rights and guard public interests. However, such effects are speculative and downstream. The reform itself is a procedural governance change that neither commodifies individuals nor directly decommodifies any essential good.',
      keyPoints: [
        'Does not directly address market commodification',
        'Procedural governance change',
        'Neither commodifies nor decommodifies essential goods',
        'Indirect effects on protection speculative',
        'Neutral on Polanyi\'s concerns',
      ],
      sources: [],
    },
    rawls: {
      score: 0.5,
      reasoning: 'By itself, term limits don\'t redistribute resources or explicitly prioritize the worst-off. However, a more balanced and periodically refreshed Supreme Court could indirectly benefit the worst-off in society by enabling reforms (e.g. campaign finance, labor rights, healthcare) to survive judicial review. In the long run, this reform "lowers the political temperature" and may yield a Court that better reflects contemporary values. Still, since any Rawlsian benefit is indirect and dependent on how future Courts rule, we score this neutral.',
      keyPoints: [
        'No direct redistribution or prioritization of worst-off',
        'Could indirectly benefit worst-off through better Court',
        'May enable reforms favorable to marginalized groups',
        'Effects dependent on how future Courts rule',
        'Neutral: neither harms nor specifically helps poorest',
      ],
      sources: [
        'Court composition and rights protection research',
      ],
    },
    george: {
      score: 0.5,
      reasoning: 'The policy neither imposes taxes nor directly addresses economic rents. It replaces lifetime tenure (which could be seen as a kind of positional "rent" for Justices) with a rotation, but this is more about power-sharing than capturing unearned income. It does prevent long-standing incumbency (a form of rent-seeking by aging Justices hanging onto power). But it doesn\'t involve taxing land, monopoly, or redirecting economic rent to productive use – traditional Georgist criteria. It doesn\'t penalize labor or innovation; it mainly removes an arbitrary privilege.',
      keyPoints: [
        'No tax or revenue component',
        'Replaces lifetime tenure with rotation',
        'Prevents incumbency rent-seeking',
        'Does not address traditional Georgist concerns',
        'Neutral: removes arbitrary privilege, not rent capture',
      ],
      sources: [],
    },
    acemoglu: {
      score: 0.8,
      reasoning: 'Term limits foster more inclusive institutions by leveling the playing field of judicial influence. Instead of an extractive setup where the timing of vacancies can massively advantage or disadvantage certain political actors, every president and by extension every electorate gets an equal opportunity to shape the Court. This reduces the extractive element of a few lucky or strategically-timed actors capturing decades of judicial power. Over time, an inclusive rotation ensures the Court\'s composition responds to a broader range of public decision-makers.',
      keyPoints: [
        'Levels playing field of judicial influence',
        'Every president gets equal opportunity to shape Court',
        'Reduces extractive timing advantages',
        'Opens institution to more diverse membership',
        'Inclusive rotation responds to broader decision-makers',
      ],
      sources: [
        'Acemoglu & Robinson - Inclusive institutions',
        'Judicial accountability research',
      ],
    },
    walzer: {
      score: 0.7,
      reasoning: 'From a Walzerian perspective of keeping each social "sphere" governed by appropriate principles, this reform helps ensure the judicial sphere is governed by merit and democratic legitimacy rather than luck or partisan manipulation. It tries to prevent the corruption of the judicial sphere by political gamesmanship. By instituting regular appointments, the logic of the judicial sphere (impartial justice) is better insulated from the money and politics sphere. The principle of equal rotation is more appropriate to the role of a Justice.',
      keyPoints: [
        'Judicial sphere governed by merit, not luck',
        'Prevents corruption by political gamesmanship',
        'Insulates from money and politics sphere',
        'Equal rotation appropriate to Justice role',
        'Restores fairness in judicial power allocation',
      ],
      sources: [
        'Walzer - Spheres of Justice',
        'Separation of powers theory',
      ],
    },
  },
  modifiers: [
    {
      id: 'constitutional-amendment',
      name: 'Constitutional Amendment Path',
      description: 'Pursue via formal constitutional amendment for permanent entrenchment',
      factorChanges: { olson: 0.2, buchanan: -0.1 },
    },
    {
      id: 'prospective-application',
      name: 'Prospective Application Only',
      description: 'Apply term limits only to future Justices, not current ones',
      factorChanges: { buchanan: 0.1, keynes: 0.1 },
    },
    {
      id: 'senior-status',
      name: 'Senior Status Option',
      description: 'Allow term-limited justices to serve on lower courts',
      factorChanges: { buchanan: 0.1, hayek: 0.1 },
    },
  ],
};
