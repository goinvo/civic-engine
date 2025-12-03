import { PolicyMethodology } from './index';

export const policeAccountabilityStandards: PolicyMethodology = {
  policyId: 'police-accountability-standards',
  policyName: 'Police Accountability Standards',
  description: 'Mandate de-escalation training, ban chokeholds, and create a national misconduct registry to prevent abusive officers from switching agencies. Federal policy in justice reform with ~84% public support.',
  overallRationale: 'Police Accountability Standards scores exceptionally high on rights dimensions (Pettit: 1.0, Buchanan: 0.9) and justice (Rawls: 0.8) reflecting its focus on non-domination and broad consent. It is highly legible (Downs: 0.9) but scores lower on scale match (Ostrom: 0.2) due to federal imposition on local policing. The ~84% bipartisan support demonstrates broad consensus that these reforms are needed to protect communities.',
  factors: {
    hayek: {
      score: 0.3,
      reasoning: 'This reform imposes top-down rules (training mandates, chokehold ban) and a centralized misconduct registry. It relies on a federal standard rather than purely local knowledge, so it leans toward a centralized solution (low Hayek score). While the registry improves information flow across jurisdictions, the overall approach depends on federal directives more than market signals or local improvisation.',
      keyPoints: [
        'Top-down rules: training mandates, chokehold ban',
        'Centralized misconduct registry',
        'Relies on federal standard over local knowledge',
        'Registry improves information flow across jurisdictions',
        'Depends on federal directives over local improvisation',
      ],
      sources: [
        'Federal police reform proposals',
        'National misconduct database proposals',
      ],
    },
    ostrom: {
      score: 0.2,
      reasoning: 'There is a scale mismatch here: policing is typically a local issue, yet the policy is federally imposed. By making federal funding conditional on these standards, a higher level of government is intervening in local law enforcement practices. While the misconduct of police can have national implications, day-to-day policing is local; thus this top-down approach is somewhat mismatched in scale (federal control over a local public safety function).',
      keyPoints: [
        'Scale mismatch: policing is local, policy is federal',
        'Federal funding conditions intervene in local practices',
        'Day-to-day policing is inherently local',
        'Top-down approach mismatched with local function',
        'Higher level government controlling local safety',
      ],
      sources: [
        'Police reform and federalism',
        'Interstate officer mobility studies',
      ],
    },
    downs: {
      score: 0.9,
      reasoning: 'The measures are clear and transparent. For example, "If an officer is fired for abuse, they cannot be hired by another department" or "If chokeholds are used, federal funding is withheld." These straightforward if-then rules make the policy highly legible to the public. Costs and trade-offs are not hidden in complex bureaucracy – the expectations of police behavior and consequences are plainly stated.',
      keyPoints: [
        'Clear if-then rules for accountability',
        '"Fired for abuse = cannot be rehired elsewhere"',
        'Transparent consequences for violations',
        'Expectations of police behavior plainly stated',
        'Highly legible to the public',
      ],
      sources: [
        'Police reform legislation text',
        'Public understanding of accountability measures',
      ],
    },
    olson: {
      score: 0.7,
      reasoning: 'The policy applies broadly (all agencies receiving federal funds) and includes checks (like a universal registry), aiming to be harder to game. However, there is still some capture risk: police unions or departments might find loopholes (e.g. not officially firing bad officers to keep them off the registry, or political pressure to water down enforcement). It\'s not fully capture-proof, but features like a public misconduct database and duty-to-intervene rules make capture or evasion more difficult than status quo.',
      keyPoints: [
        'Applies broadly to all agencies receiving federal funds',
        'Universal registry makes gaming harder',
        'Some capture risk: unions/departments may find loopholes',
        'Duty-to-intervene rules reduce evasion',
        'Not fully capture-proof but better than status quo',
      ],
      sources: [
        'Police union influence on reform',
        'Implementation challenges in police accountability',
      ],
    },
    keynes: {
      score: 0.5,
      reasoning: 'This is not an economic policy per se and has little direct impact on economic cycles. It neither amplifies nor dampens macroeconomic volatility in any significant way. We score it neutral on economic stability (no pro- or counter-cyclical effect).',
      keyPoints: [
        'Not an economic policy',
        'Little direct impact on economic cycles',
        'Neither amplifies nor dampens volatility',
        'Neutral on economic stability',
        'No pro- or counter-cyclical effect',
      ],
      sources: [],
    },
    pettit: {
      score: 1.0,
      reasoning: 'Strongly enhances non-domination. By checking police power (banning chokeholds, requiring de-escalation, accountability for misconduct), the policy reduces the chance that individuals, especially marginalized groups, are subject to arbitrary or unchecked authority. Citizens gain greater assurance that officers cannot abuse power without consequences, which empowers community members and protects their basic rights from domination by the state.',
      keyPoints: [
        'Strongly enhances non-domination',
        'Checks police power through accountability',
        'Reduces arbitrary/unchecked authority',
        'Empowers community members',
        'Protects basic rights from state domination',
      ],
      sources: [
        'Police accountability and civil liberties',
        'Non-domination and state power',
      ],
    },
    hirschman: {
      score: 0.5,
      reasoning: 'Primarily improves voice within and outside police departments. Officers get a "duty to intervene," effectively a mandate to speak up or act (voice) if a colleague is abusing force. Communities gain indirectly because a national registry and oversight give them recourse (voice) against bad actors—those officers can be identified and barred from moving elsewhere. There isn\'t an "exit" option (policing isn\'t a service one can simply switch providers for), but by strengthening internal accountability and public oversight, the policy increases agency for both whistleblower officers and citizens.',
      keyPoints: [
        'Improves voice within police departments',
        'Duty to intervene mandates speaking up',
        'Communities gain recourse against bad actors',
        'National registry provides accountability',
        'Increases agency for whistleblowers and citizens',
      ],
      sources: [
        'Police whistleblower protections',
        'Community oversight boards',
      ],
    },
    buchanan: {
      score: 0.9,
      reasoning: 'The reforms are broadly popular across the spectrum (survey support in the 80%+ range). They don\'t create a clear class of societal "losers" who are being coerced; rather almost everyone stands to benefit from more accountable policing. Bad-faith officers are the ones who "lose" (they face consequences), but this is by design and not a violation of public consent. Given the high bipartisan support (including ~82% of Republicans in one poll), the policy approximates a Pareto improvement or at least a widely consensual change.',
      keyPoints: [
        'Broadly popular: 80%+ support across spectrum',
        'No clear class of societal losers',
        'Bad-faith officers face consequences by design',
        '~82% Republican support in some polls',
        'Approximates Pareto improvement',
      ],
      sources: [
        'Polling on police accountability',
        'Bipartisan support for reform measures',
      ],
    },
    polanyi: {
      score: 0.5,
      reasoning: 'Neutral in terms of de-commodification. This policy is about justice and safety, not directly about buffering citizens from market forces in essentials like food, shelter, or health. It doesn\'t treat people as market inputs; if anything it treats safety and justice as public goods, but policing already isn\'t a market commodity. So we mark it as having no strong effect on the commodification of basic needs.',
      keyPoints: [
        'Neutral on de-commodification',
        'About justice and safety, not market forces',
        'Treats safety and justice as public goods',
        'Policing already isn\'t a market commodity',
        'No strong effect on commodification of basic needs',
      ],
      sources: [],
    },
    rawls: {
      score: 0.8,
      reasoning: 'Improves the position of the worst-off in society. Vulnerable communities (often poor, minority populations) disproportionately suffer from police misconduct; this policy directly addresses that by reducing excessive force and holding officers accountable. Those who have been worst-off in interactions with police (e.g. Black Americans, the poor, mentally ill individuals) should benefit most from de-escalation and accountability standards. It\'s a maximin-oriented reform, elevating protections for those at the bottom of the justice hierarchy without any real detriment to more advantaged groups.',
      keyPoints: [
        'Improves position of worst-off in society',
        'Vulnerable communities benefit most',
        'Directly addresses excessive force issues',
        'Maximin-oriented reform',
        'Elevates protections for those at bottom of justice hierarchy',
      ],
      sources: [
        'Police misconduct and vulnerable populations',
        'Racial disparities in policing',
      ],
    },
    george: {
      score: 0.5,
      reasoning: 'Not applicable to taxing labor or rent. The policy doesn\'t involve taxation or economic rents at all – it neither penalizes productive work nor captures unearned income through taxes. It\'s funded through federal conditions on grants (existing public funds) rather than any new tax on wages or land. Thus, it sits at neutral on the George scale.',
      keyPoints: [
        'Not applicable to taxing labor or rent',
        'No taxation or economic rents involved',
        'Funded through federal grant conditions',
        'No new tax on wages or land',
        'Neutral on George scale',
      ],
      sources: [],
    },
    acemoglu: {
      score: 0.7,
      reasoning: 'Favors inclusive institutions. By preventing "wandering officers" from evading consequences and by imposing standards that apply to all law enforcement agencies, it levels the institutional playing field. It challenges an extractive status quo where some officers could act with impunity (a form of institutional privilege). This reform opens up policing to greater scrutiny and participation (through oversight), fostering more inclusive and trustworthy law enforcement institutions. Barriers to accountability (which protected incumbents/bad actors) are lowered.',
      keyPoints: [
        'Favors inclusive institutions',
        'Prevents officers from evading consequences',
        'Levels institutional playing field',
        'Challenges extractive status quo',
        'Opens policing to greater scrutiny',
      ],
      sources: [
        'Acemoglu - Inclusive institutions',
        'Police reform and institutional change',
      ],
    },
    walzer: {
      score: 0.7,
      reasoning: 'Strengthens the proper moral logic in the sphere of justice. In policing, the good being distributed is safety and justice, which should be governed by rights and fairness, not by money or brute force. By banning chokeholds and enforcing accountability uniformly, the policy helps ensure that police use of force is governed by law and need (appropriate to the situation) rather than arbitrary power. It diminishes the influence of corruption or bias (e.g., officers can\'t "buy" immunity by just moving elsewhere or by union protections). In essence, it keeps the sphere of criminal justice true to its principles.',
      keyPoints: [
        'Strengthens proper moral logic in justice sphere',
        'Safety/justice governed by rights and fairness',
        'Police force governed by law and need',
        'Diminishes influence of corruption or bias',
        'Keeps criminal justice true to its principles',
      ],
      sources: [
        'Walzer - Spheres of Justice',
        'Justice system integrity',
      ],
    },
  },
  modifiers: [
    {
      id: 'end-qualified-immunity',
      name: 'End Qualified Immunity',
      description: 'Allow civil lawsuits against officers who violate constitutional rights',
      factorChanges: { pettit: 0.05, buchanan: -0.1 },
    },
    {
      id: 'independent-prosecutors',
      name: 'Independent Prosecutors',
      description: 'Require independent prosecutors for police misconduct cases',
      factorChanges: { olson: 0.1, rawls: 0.05 },
    },
  ],
};
