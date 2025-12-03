import { PolicyMethodology } from './index';

export const freeAndEasyVoterId: PolicyMethodology = {
  policyId: 'free-and-easy-voter-id',
  policyName: '"Free and Easy" Voter ID',
  description: 'Require voter ID but provide free government-issued IDs to all citizens and expand acceptable ID types to include student IDs, utility bills, and affidavits.',
  overallRationale: 'This policy combines voter ID requirements with free ID access and expanded acceptable documents. By addressing both election security concerns and access barriers, it achieves 81% bipartisan support. Scores high on Rawls (1.0) by eliminating barriers that disproportionately affect disadvantaged groups, and 0.9 on multiple factors including Ostrom, Pettit, Hirschman, Buchanan, Polanyi, Acemoglu, and Walzer. The design demonstrates how addressing concerns from multiple perspectives can produce broad agreement.',
  factors: {
    hayek: {
      score: 0.8,
      reasoning: 'Leverages existing distributed ID infrastructure (DMVs, schools, utilities) rather than creating new bureaucracy. Multiple acceptable IDs maximize individual choice. Local poll workers make verification decisions.',
      keyPoints: [
        'Uses existing DMV, school, utility infrastructure',
        'No new central database required',
        'Multiple ID types = individual choice',
        'Local verification at point of voting',
        'Decentralized issuance and verification',
      ],
      sources: [
        'State ID issuance infrastructure data',
        'Poll worker verification procedures',
        'Carter Center election observation standards',
      ],
    },
    ostrom: {
      score: 0.9,
      reasoning: 'Excellent polycentric design: federal floor (free ID access), state implementation variation, local election administration. Matches scale appropriately at each level.',
      keyPoints: [
        'Federal requirement for free access',
        'States choose implementation methods',
        'Local election officials verify',
        'Multiple levels working together',
        'Scale matches function at each level',
      ],
      sources: [
        'Election administration structure',
        'State ID program variations',
        'Ostrom polycentric governance',
      ],
    },
    downs: {
      score: 0.9,
      reasoning: 'Highly legible: "Show ID to vote; free IDs available for anyone who needs one." Simple rule, clear fallbacks (affidavit), transparent purpose. Expands acceptable IDs to reduce confusion.',
      keyPoints: [
        'Simple core rule clearly communicable',
        'Free ID availability clear',
        'Multiple acceptable documents reduces confusion',
        'Affidavit failsafe is simple',
        'Purpose (election integrity + access) clear',
      ],
      sources: [
        'Voter information materials',
        'Poll worker training analysis',
      ],
    },
    olson: {
      score: 0.6,
      reasoning: 'High bipartisan support (81%) provides political protection. However, some partisan actors benefit from voter ID conflict itself, creating opposition to compromise. Neither party\'s base fully satisfied.',
      keyPoints: [
        '81% support provides significant cover',
        'Some activists prefer conflict to compromise',
        'Removes voter suppression as partisan tool',
        'Removes voter fraud as partisan issue',
        'Compromise satisfies neither extreme',
      ],
      sources: [
        'Bipartisan polling on voter ID compromise',
        'Partisan positioning research',
      ],
    },
    keynes: {
      score: 0.5,
      reasoning: 'Not designed as economic stabilizer. Free ID program has modest budget impact. No counter-cyclical design.',
      keyPoints: [
        'Civic infrastructure, not economic policy',
        'Modest budget impact for free IDs',
        'No counter-cyclical mechanism',
        'Could be paired with automatic registration',
      ],
      sources: [
        'Free ID program cost estimates',
      ],
    },
    pettit: {
      score: 0.9,
      reasoning: 'Maximally reduces arbitrary barriers to voting. No citizen subject to ability-to-pay gatekeeping. Multiple ID types prevent discretionary denial. Affidavit option provides failsafe against arbitrary exclusion.',
      keyPoints: [
        'No pay-to-vote barrier',
        'Multiple ID types prevent arbitrary denial',
        'Affidavit prevents any eligible voter exclusion',
        'Voting right not contingent on economic status',
        'No arbitrary state power over ballot access',
      ],
      sources: [
        'Pettit on republican freedom',
        'Voter access barrier research',
        'ID requirement impact studies',
      ],
    },
    hirschman: {
      score: 0.9,
      reasoning: 'Maximally enhances voice by removing barriers to voting. Multiple ID options create multiple pathways to participation. Free access ensures no one silenced by inability to pay.',
      keyPoints: [
        'Removes barriers that silence eligible voters',
        'Multiple pathways to participate',
        'Free access ensures universal voice',
        'Provisional ballot preserves voice when issues arise',
        'Exit not relevant but voice maximized',
      ],
      sources: [
        'Voter turnout and ID requirement research',
        'Participation barrier studies',
      ],
    },
    buchanan: {
      score: 0.9,
      reasoning: '81% bipartisan support on historically divisive issue represents remarkable consensus. Policy specifically designed as compromise satisfying both security and access concerns. Almost no one made worse off.',
      keyPoints: [
        '81% overall bipartisan support',
        'Satisfies Republican security concerns',
        'Satisfies Democratic access concerns',
        'Designed explicitly as consensus compromise',
        'No identifiable losers',
      ],
      sources: [
        'Bipartisan polling data',
        'Compromise policy design literature',
        'Buchanan on constitutional consensus',
      ],
    },
    polanyi: {
      score: 0.9,
      reasoning: 'Strongly de-commodifies voting by ensuring ballot access not contingent on ability to pay. Voting treated as civic right, not market transaction. Public provision of necessary infrastructure.',
      keyPoints: [
        'Free ID removes market barrier',
        'Voting as civic right, not purchase',
        'Public provision of civic infrastructure',
        'Citizenship, not money, determines access',
        'Protective counter-movement for democracy',
      ],
      sources: [
        'Polanyi on de-commodification',
        'Voting rights as public good literature',
      ],
    },
    rawls: {
      score: 1.0,
      reasoning: 'Perfect score: specifically designed to eliminate barrier that disproportionately affects worst-off. Free IDs help those who can\'t afford fees. Expanded ID types help elderly, students, rural residents, minorities. Affidavit catches those who fall through cracks.',
      keyPoints: [
        'Free IDs benefit those who can\'t afford fees',
        'Expanded IDs help elderly, students, rural, minorities',
        'Affidavit catches edge cases',
        'Specifically targets barrier affecting worst-off',
        'Perfect "veil of ignorance" policy',
      ],
      sources: [
        'Brennan Center ID disparity research',
        'Rawls - Theory of Justice',
        'Voter ID demographic impact studies',
      ],
    },
    george: {
      score: 0.5,
      reasoning: 'Not a tax or rent-targeting policy. Pure civic infrastructure provision. Could be funded by rent-based taxation but not inherently.',
      keyPoints: [
        'Not designed as rent policy',
        'Civic infrastructure provision',
        'Could be paired with progressive funding',
        'Neutral on rent taxation',
      ],
      sources: [],
    },
    acemoglu: {
      score: 0.9,
      reasoning: 'Highly inclusive: ensures no eligible voter excluded due to lack of resources. Removes barriers historically used to exclude minorities and poor voters. Creates inclusive democratic institution.',
      keyPoints: [
        'Removes exclusionary barriers',
        'Historically marginalized groups benefit',
        'No economic gatekeeping',
        'Levels playing field for participation',
        'Builds inclusive democratic institution',
      ],
      sources: [
        'Voting Rights Act history',
        'Voter suppression research',
        'Acemoglu on inclusive institutions',
      ],
    },
    walzer: {
      score: 0.9,
      reasoning: 'Voting distributed by citizenship, not money. Free ID ensures economic status cannot determine ballot access. Maintains integrity of democratic sphere separate from market. Paradigmatic sphere protection.',
      keyPoints: [
        'Citizenship criterion for voting',
        'Money cannot buy ballot access',
        'Democratic sphere protected from market',
        'Appropriate criteria for civic participation',
        'Walzerian sphere separation achieved',
      ],
      sources: [
        'Walzer - Spheres of Justice',
        'Democratic theory on voting rights',
        'Civic participation literature',
      ],
    },
  },
  modifiers: [
    {
      id: 'mobile-id-units',
      name: 'Mobile ID Issuance Units',
      description: 'Deploy mobile units to underserved areas for ID issuance',
      factorChanges: { rawls: 0.05, acemoglu: 0.05 },
    },
    {
      id: 'automatic-registration',
      name: 'Automatic Voter Registration',
      description: 'Combine with automatic voter registration when getting ID',
      factorChanges: { hirschman: 0.05, downs: 0.05 },
    },
    {
      id: 'same-day-registration',
      name: 'Same-Day Registration',
      description: 'Allow registration and voting on election day with ID',
      factorChanges: { hirschman: 0.05, acemoglu: 0.05 },
    },
  ],
};
