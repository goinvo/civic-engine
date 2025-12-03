import { PolicyMethodology } from './index';

export const overturnCitizensUnited: PolicyMethodology = {
  policyId: 'overturn-citizens-united',
  policyName: 'Overturn Citizens United',
  description: 'Constitutional amendment to establish that corporations are not entitled to the same constitutional rights as natural persons and that money is not speech, thereby allowing Congress and states to set reasonable limits on campaign spending.',
  overallRationale: 'This amendment has ~75% public support including majorities of both Republicans and Democrats. It scores at the maximum on multiple factors (Ostrom: 1.0, Pettit: 1.0, Polanyi: 1.0, Acemoglu: 1.0, Walzer: 1.0) because it addresses the fundamental corruption of the political sphere by money. By restoring the ability to regulate political spending, it removes the mechanism by which concentrated wealth dominates democratic outcomes.',
  factors: {
    hayek: {
      score: 0.9,
      reasoning: 'This amendment is not about central planning of economic activity. It is a meta-rule – a constitutional principle – that sets the framework for democracy without requiring ongoing bureaucratic planning. Once enacted, it simply allows legislatures (federal and state) to set campaign limits as they see fit, using decentralized legislative processes. It actually decentralizes power by breaking up the concentrated influence of billionaires and mega-corporations who currently dominate political messaging. In a sense, it restores an information market where many voices can compete, rather than one dominated by those with the most dollars.',
      keyPoints: [
        'Meta-rule, not ongoing bureaucratic planning',
        'Allows decentralized legislative processes',
        'Breaks up concentrated influence of billionaires',
        'Restores information market where many voices compete',
        'Simple constitutional principle, not complex regulation',
      ],
      sources: [
        'Constitutional amendment design',
        'Democratic theory and information',
      ],
    },
    ostrom: {
      score: 1.0,
      reasoning: 'The problem of money in politics is pervasive at all levels of governance: federal, state, and local elections are all subject to the influence of big money since Citizens United. This amendment would empower each level of government to address its own elections. Congress can regulate federal races; state legislatures can regulate state races; and local governments (subject to state law) can regulate local races. That is a quintessentially polycentric approach – recognizing that one size may not fit all and enabling tailored solutions. The amendment itself is appropriately a national constitutional provision (since it addresses a nationwide problem stemming from a Supreme Court decision), but it does not mandate a single solution: it grants authority back to the relevant polities.',
      keyPoints: [
        'Empowers each level of government to regulate its elections',
        'Federal, state, and local can tailor solutions',
        'Quintessentially polycentric approach',
        'Amendment is national but enables local variation',
        'Grants authority back to relevant polities',
      ],
      sources: [
        'Federalism in campaign finance',
        'Multi-level election regulation',
      ],
    },
    downs: {
      score: 0.9,
      reasoning: '"Corporations are not people; money is not speech; Congress may regulate campaign finance." This is extremely legible. The core principle is easily understood by virtually everyone. While subsequent implementing legislation will have more detailed rules, the amendment itself is transparent and straightforward. The trade-off is clear to voters: allow some regulation of political spending in order to prevent wealthy interests from dominating elections. Notably, this reform enjoys high public support (~75%) precisely because people understand the issue and feel strongly about it – an indication that the rationale is transparent.',
      keyPoints: [
        'Extremely legible: corporations not people, money not speech',
        'Core principle understood by virtually everyone',
        'Clear trade-off: regulation vs wealthy domination',
        '~75% support indicates transparent rationale',
        'Amendment itself simple even if implementing laws detailed',
      ],
      sources: [
        'Polling on Citizens United understanding',
        'Campaign finance reform messaging',
      ],
    },
    olson: {
      score: 0.9,
      reasoning: 'This is essentially an anti-capture policy. Citizens United enabled unlimited spending by corporations and billionaires, which is the textbook mechanism for small, concentrated interests to capture policy at the expense of the diffuse public. By permitting regulation of such spending, the amendment enables laws that diminish the influence of well-organized wealthy lobbies. It levels the playing field between, say, the fossil fuel industry (concentrated interests) and the general public (diffuse interests concerned about climate). Constitutional entrenchment of this principle makes it harder for future lobbying to undo the reform. Score is near-maximum as this directly attacks the machinery of capture.',
      keyPoints: [
        'Directly attacks machinery of special interest capture',
        'Addresses how concentrated wealth dominates diffuse public',
        'Levels playing field between industry lobbies and citizens',
        'Constitutional entrenchment resists future lobby pressure',
        'Near-maximum as foundational anti-capture reform',
      ],
      sources: [
        'Olson - Logic of Collective Action',
        'Campaign spending and policy outcomes research',
      ],
    },
    keynes: {
      score: 0.5,
      reasoning: 'This amendment has no direct effect on economic fluctuations. It is a political reform, not a fiscal or monetary policy. Over time, one could speculate that a less captured Congress might enact better counter-cyclical policies (for instance, be more willing to tax the wealthy in booms and spend in downturns without being blocked by powerful lobbies), but that is a very indirect and speculative link. We score this neutral on the stabilization dimension.',
      keyPoints: [
        'No direct effect on economic fluctuations',
        'Political reform, not fiscal or monetary policy',
        'Indirect link to better counter-cyclical policy speculative',
        'Neutral on stabilization dimension',
      ],
      sources: [],
    },
    pettit: {
      score: 1.0,
      reasoning: 'This amendment is fundamentally about preventing domination. When corporations or billionaires can spend unlimited sums to influence elections, ordinary citizens are dominated – their political voice can be drowned out and their representatives effectively beholden to those with deep pockets. This is a form of arbitrary power: the ability of the wealthy to shape the political arena at will. By allowing limits on such spending, the amendment restores a measure of equal political voice, meaning citizens\\' choices are not at the mercy of who has the most money. It directly advances freedom as non-domination by checking an enormous source of power imbalance.',
      keyPoints: [
        'Prevents domination by unlimited wealthy spending',
        'Ordinary citizens not drowned out by deep pockets',
        'Checks arbitrary power of wealthy over political arena',
        'Restores equal political voice',
        'Directly advances freedom as non-domination',
      ],
      sources: [
        'Pettit - Republicanism',
        'Political equality research',
      ],
    },
    hirschman: {
      score: 0.8,
      reasoning: 'Voice: This reform amplifies the political voice of ordinary citizens relative to wealthy interests. When big money is unchecked, the voice of average voters is drowned out. By permitting regulation of political spending, the amendment restores the relative weight of small donors, grassroots advocacy, and sheer voter numbers. Exit: Not directly relevant – citizens cannot \"exit\" their country easily, but the reform could reduce the sense of hopelessness that makes citizens disengage (a form of internal \"exit\" from political participation). We score this quite high on the voice dimension, as it is explicitly about making the political system more responsive to citizens\\' voices rather than dollars.',
      keyPoints: [
        'Amplifies political voice of ordinary citizens',
        'Restores relative weight of small donors and grassroots',
        'Reduces sense of hopelessness driving disengagement',
        'Makes political system responsive to votes not dollars',
        'High score on voice dimension',
      ],
      sources: [
        'Voter influence and campaign spending',
        'Constituent responsiveness research',
      ],
    },
    buchanan: {
      score: 0.9,
      reasoning: 'Polling shows roughly 75% of Americans (majorities of both Republicans and Democrats) support overturning Citizens United. This is an extraordinary level of consensus for a constitutional change. The \"losers\" – those whose unlimited spending would be curtailed – are a very small group (wealthy individuals and corporations seeking to influence elections). Essentially, the vast majority consents to limit the power of a few, and even the few may recognize the legitimacy of democratic governance over pure wealth-power. One could argue everyone wins a fairer political process in the long run. The near-unanimity of public support suggests this approaches a true social contract moment.',
      keyPoints: [
        '~75% support from both Republicans and Democrats',
        'Extraordinary consensus for constitutional change',
        'Losers are small group of wealthy interests',
        'Vast majority consents to limit power of few',
        'Approaches true social contract moment',
      ],
      sources: [
        'Polling on Citizens United',
        'Bipartisan reform support',
      ],
    },
    polanyi: {
      score: 1.0,
      reasoning: 'In Polanyian terms, Citizens United represented a drastic commodification of democracy itself – turning political speech into a market where the highest bidder wins. This amendment is a classic example of the \"double movement\": society pushing back to protect its democratic institutions from being overrun by market logic. It de-commodifies political influence by saying that elections and lawmakers should not be for sale. This embeds the political sphere back within social values (equality of citizenship, fairness) rather than letting it be dominated by market power. Very high score for reasserting social control over a crucial non-market domain.',
      keyPoints: [
        'Citizens United commodified democracy itself',
        'Amendment is classic \"double movement\" pushback',
        'De-commodifies political influence',
        'Embeds political sphere in social values',
        'Reasserts social control over non-market domain',
      ],
      sources: [
        'Polanyi - Great Transformation',
        'Democracy and commodification research',
      ],
    },
    rawls: {
      score: 0.8,
      reasoning: 'Rawls emphasizes the fair value of political liberties – everyone should have not just formal political rights but real, effective political voice. Citizens United undermined the fair value of political liberties by allowing the wealthy to dominate the political conversation. This amendment restores the ability to ensure fair value by limiting disparities in political speech. Moreover, by enabling regulation of money in politics, the amendment could lead to policies more oriented toward the least advantaged (since they can no longer be easily outspent in advocacy). It helps ensure equal opportunity to influence the political process. High score for restoring fair value of political liberties.',
      keyPoints: [
        'Restores fair value of political liberties',
        'Currently wealthy dominate political conversation',
        'Enables limiting disparities in political speech',
        'Could lead to policies more oriented to least advantaged',
        'Ensures equal opportunity to influence process',
      ],
      sources: [
        'Rawls - Political Liberalism',
        'Fair value of political liberty research',
      ],
    },
    george: {
      score: 0.6,
      reasoning: 'This amendment does not directly tax land or economic rent. However, it can be seen as addressing one mechanism by which rentiers protect their rents – namely, by using their wealth to influence politics in their favor. By curbing money in politics, it could make it harder for monopolists and landowners to lobby for rent-preserving regulations. In a second-order way, this enables future legislation that might capture more rent (e.g., a land value tax or anti-monopoly laws) because their beneficiaries would have less political clout to block them. The score is above neutral due to these indirect effects but not high because the amendment itself doesn\'t directly target rent.',
      keyPoints: [
        'Does not directly tax land or economic rent',
        'Addresses mechanism by which rentiers protect rents',
        'Curbs money lobbying for rent-preserving regulations',
        'Enables future rent-capturing legislation',
        'Above neutral for indirect effects, not high for direct targeting',
      ],
      sources: [
        'Lobbying and rent-seeking',
        'Political protection of economic rent',
      ],
    },
    acemoglu: {
      score: 1.0,
      reasoning: 'When a small elite can spend unlimited money to control politics, you get extractive institutions – policies are shaped to benefit a narrow group. Citizens United was a step toward oligarchy. This amendment is a clear move toward inclusive institutions: it prevents the concentration of political power in the hands of the wealthy few and opens the political playing field to broader participation. It directly addresses the \"capture\" dynamic that Acemoglu and Robinson warn about. Enabling limits on money in politics helps ensure that political institutions reflect the interests of the many, not just those with deep pockets.',
      keyPoints: [
        'Prevents concentration of political power in wealthy few',
        'Directly addresses capture dynamic',
        'Move toward inclusive institutions',
        'Opens political playing field to broader participation',
        'Ensures institutions reflect interests of many',
      ],
      sources: [
        'Acemoglu & Robinson - Why Nations Fail',
        'Money in politics and extraction',
      ],
    },
    walzer: {
      score: 1.0,
      reasoning: 'This is the textbook example of sphere corruption that Walzer warns against: the sphere of money (the market) invading the sphere of politics. In a just society, political power should be distributed according to citizenship and democratic participation, not according to bank accounts. Citizens United allowed money to buy influence over political outcomes, collapsing the boundary between economic and political spheres. This amendment restores the boundary. The criterion for political voice becomes citizenship and votes, not dollars. It is essentially a manifesto for sphere integrity in Walzerian terms.',
      keyPoints: [
        'Textbook example of sphere corruption: money invading politics',
        'Political power should follow citizenship, not bank accounts',
        'Citizens United collapsed economic/political boundary',
        'Amendment restores boundary between spheres',
        'Manifesto for sphere integrity',
      ],
      sources: [
        'Walzer - Spheres of Justice',
        'Money and political sphere research',
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
