import { PolicyMethodology } from './index';

export const kidsOnlineSafetyAct: PolicyMethodology = {
  policyId: 'kids-online-safety-act',
  policyName: 'Kids Online Safety Act (KOSA)',
  description: 'Federal legislation requiring social media platforms to implement safeguards protecting minors from harmful content, with duty of care standards and parental controls.',
  overallRationale: 'KOSA has 86% popular support but scores low on several framework factors. Analysis reveals concerns about knowledge problems (Hayek: 0.2), vague standards enabling capture (Downs: 0.2, Olson: 0.3), potential for censorship affecting vulnerable groups (Acemoglu: 0.2, Pettit: 0.2), and minority rights concerns (Buchanan: 0.2). The policy illustrates tensions between child safety goals and implementation through centralized, broadly-defined mandates.',
  factors: {
    hayek: {
      score: 0.2,
      reasoning: 'KOSA imposes a centralized "duty of care" that requires platforms to prevent content deemed harmful by government definitions. This creates an insurmountable knowledge problem: no central authority can determine what content is "harmful" across diverse contexts, communities, and individuals.',
      keyPoints: [
        'Central government defines "harmful" content',
        'Duty of care requires platforms to act on government determinations',
        'Context-dependent harm impossible to centrally specify',
        'Will require constant regulatory updates as harms evolve',
        'EFF: "Inherently puts the government in the position of defining harm"',
      ],
      sources: [
        'KOSA bill text (S. 1409)',
        'Electronic Frontier Foundation analysis of KOSA',
        'First Amendment concerns from ACLU',
      ],
    },
    ostrom: {
      score: 0.4,
      reasoning: 'FTC enforces nationally uniform standards with limited state variation. The internet\'s borderless nature makes local governance difficult, but KOSA provides essentially no polycentric adaptation.',
      keyPoints: [
        'FTC sole enforcer at federal level',
        'Limited state attorney general role',
        'No community-level input mechanisms',
        'Parental controls provide only household-level adaptation',
        'Internet borderless nature limits local governance',
      ],
      sources: [
        'KOSA enforcement provisions',
        'FTC regulatory structure',
      ],
    },
    downs: {
      score: 0.2,
      reasoning: 'While "protect kids online" polls well, actual policy mechanisms are deeply opaque. "Duty of care" is undefined. What constitutes "harm" is contested. How platforms should comply is unclear. This vagueness will produce unpredictable, inconsistent enforcement.',
      keyPoints: [
        '"Duty of care" undefined in operational terms',
        '"Harmful" content definition contested',
        'Compliance mechanisms unclear',
        'Will generate extensive litigation over meaning',
        'Parents cannot understand what protections actually apply',
      ],
      sources: [
        'KOSA legislative text analysis',
        'Legal scholarship on duty of care vagueness',
        'Tech policy analysis of compliance challenges',
      ],
    },
    olson: {
      score: 0.3,
      reasoning: 'Vague "duty of care" standard will be defined through lobbying and litigation. Large platforms will shape compliance standards to disadvantage competitors. State attorneys general with political agendas will selectively enforce.',
      keyPoints: [
        'Large platforms will capture standard-setting',
        'State AGs will enforce selectively based on politics',
        'Compliance costs disadvantage small platforms',
        'Intuit-like capture of "safety" definitions',
        '"Safety theater" benefits incumbents',
      ],
      sources: [
        'Platform lobbying data',
        'Regulatory capture literature',
        'State AG enforcement patterns',
      ],
    },
    keynes: {
      score: 0.5,
      reasoning: 'Not designed as stabilizer, but compliance costs will be substantial and ongoing. These costs are not counter-cyclical.',
      keyPoints: [
        'Not designed as economic stabilizer',
        'Compliance costs substantial but fixed',
        'No counter-cyclical mechanism',
        'Small platform costs proportionally higher',
      ],
      sources: [],
    },
    pettit: {
      score: 0.2,
      reasoning: 'KOSA creates new domination mechanisms. Platforms must surveil all users to identify minors. Government gains power to define "harmful" speech. Age verification systems will track and profile users. LGBTQ+ teens face removal of supportive content.',
      keyPoints: [
        'Age verification requires surveillance of all users',
        'Government defines permissible speech for minors',
        'Platforms become censorship agents for state',
        'LGBTQ+ content likely classified as "harmful" in some states',
        'Minorities face arbitrary exclusion from information',
      ],
      sources: [
        'ACLU analysis of KOSA',
        'EFF on surveillance requirements',
        'LGBTQ+ advocacy group concerns',
        'Trevor Project opposition to KOSA',
      ],
    },
    hirschman: {
      score: 0.3,
      reasoning: 'Exit from internet platforms is largely impossible due to network effects. Voice is reduced: content critical of KOSA or supportive of vulnerable groups may be removed as "harmful."',
      keyPoints: [
        'Exit from major platforms practically impossible',
        'Network effects trap users regardless of policy',
        'Voice reduced: controversial content suppressed',
        'Parental "voice" tools may enable surveillance',
        'No meaningful exit to unregulated alternatives',
      ],
      sources: [
        'Network effects literature',
        'Platform switching costs research',
      ],
    },
    buchanan: {
      score: 0.2,
      reasoning: 'Despite 86% polling support, KOSA creates serious losers: LGBTQ+ youth who rely on online community, teens seeking health information, small platforms that can\'t afford compliance, free speech advocates. Polling doesn\'t capture costs to minorities.',
      keyPoints: [
        '86% support masks harm to vulnerable minorities',
        'LGBTQ+ teens major losers (supportive content removed)',
        'Teens seeking sensitive health info disadvantaged',
        'Small platforms may exit market',
        'Polling question doesn\'t describe actual policy mechanisms',
      ],
      sources: [
        'LGBTQ+ youth online community research',
        'Teen health information seeking patterns',
        'Small platform viability analysis',
      ],
    },
    polanyi: {
      score: 0.6,
      reasoning: 'Genuinely attempts to de-commodify children\'s attention. Reduces platform ability to treat minors as engagement/advertising targets. However, creates new forms of control that may be worse.',
      keyPoints: [
        'Reduces treating children as attention commodities',
        'Limits advertising targeting of minors',
        'De-commodification achieved through surveillance',
        'Trade-off: protection vs. autonomy',
      ],
      sources: [
        'Attention economy literature',
        'Children\'s advertising research',
      ],
    },
    rawls: {
      score: 0.5,
      reasoning: 'Ambiguous effects on worst-off. May protect some vulnerable children from harmful content. But also removes access to supportive communities for LGBTQ+ youth, mental health resources for struggling teens, and information for those without supportive families.',
      keyPoints: [
        'May protect some children from genuinely harmful content',
        'But removes LGBTQ+ community support (critical for worst-off)',
        'Removes health information for teens without supportive families',
        'Wealthy families can work around restrictions',
        'Net effect on worst-off unclear or negative',
      ],
      sources: [
        'Trevor Project on LGBTQ+ teen wellbeing',
        'Research on online support communities',
        'Digital divide research',
      ],
    },
    george: {
      score: 0.5,
      reasoning: 'Doesn\'t target rent directly. Compliance costs fall on platforms but don\'t capture economic rent. May reduce some "attention rent" extraction from minors.',
      keyPoints: [
        'Doesn\'t tax or redistribute platform rents',
        'Compliance costs not tied to rent extraction',
        'May reduce attention rent from minors specifically',
        'Not a rent-targeting policy',
      ],
      sources: [],
    },
    acemoglu: {
      score: 0.2,
      reasoning: 'Creates significant new barriers and exclusions. Age verification excludes some legitimate users. Content restrictions exclude LGBTQ+ teens from supportive communities. Small platforms excluded from market. Creates gatekeeping mechanisms that will be captured.',
      keyPoints: [
        'Age verification creates new exclusion mechanism',
        'LGBTQ+ teens excluded from support communities',
        'Small platforms excluded by compliance costs',
        'Creates extractive gatekeeping mechanisms',
        'Concentrates power in large platforms that can comply',
      ],
      sources: [
        'Acemoglu on institutional extraction',
        'Platform competition analysis',
        'LGBTQ+ online community research',
      ],
    },
    walzer: {
      score: 0.7,
      reasoning: 'Genuinely attempts to apply age-appropriate criteria to content distribution. Recognizes childhood as distinct sphere deserving protection. However, implementation may allow money and political power to determine "appropriate" content.',
      keyPoints: [
        'Recognizes childhood as protected sphere',
        'Age-appropriate distribution is appropriate criterion',
        'But "appropriate" will be determined by power, not principle',
        'State AG politics will shape enforcement',
        'Money will buy compliance interpretation',
      ],
      sources: [
        'Walzer on age-appropriate distribution',
        'Children\'s rights literature',
      ],
    },
  },
  modifiers: [
    {
      id: 'narrow-harm-definition',
      name: 'Narrow Harm Definition',
      description: 'Limit "harm" to specific, objectively measurable categories',
      factorChanges: { downs: 0.3, olson: 0.2, hayek: 0.2 },
    },
    {
      id: 'lgbtq-protection',
      name: 'LGBTQ+ Content Protection',
      description: 'Explicitly protect LGBTQ+ educational and support content',
      factorChanges: { acemoglu: 0.3, rawls: 0.2, buchanan: 0.2 },
    },
    {
      id: 'small-platform-exemption',
      name: 'Small Platform Exemption',
      description: 'Exempt platforms below revenue/user thresholds from compliance',
      factorChanges: { acemoglu: 0.2, olson: 0.1 },
    },
  ],
};
