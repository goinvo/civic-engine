import { PolicyMethodology } from '../index';

export const campaignFinanceDisclosure: PolicyMethodology = {
  policyId: 'campaign-finance-disclosure',
  policyName: 'Mandate "Dark Money" Disclosure',
  description: 'Pass the DISCLOSE Act to require Super PACs to make major donors public and ban foreign spending on ballot measures. Federal policy in governance with ~85% public support.',
  overallRationale: 'Dark Money Disclosure scores exceptionally high on transparency (Downs: 0.9), anti-capture (Olson: 0.9), and inclusive institutions (Acemoglu: 0.9). The policy is fundamentally about increasing information transparency in democracy, which aligns strongly with multiple factors. With ~85% bipartisan support, it represents near-consensus that voters deserve to know who is funding political campaigns.',
  factors: {
    hayek: {
      score: 0.8,
      reasoning: 'This policy is about improving information flow, not central control. It does not impose ideological restrictions on speech or dictate content – it simply requires disclosure of who is speaking (or paying for speech). In fact, transparency aids decentralized decision-making by giving voters and market participants better information. Political donors are still free to donate; they just cannot hide their identity. This is closer to providing a "label" (like labeling on products) than to planning. It actually leverages the "marketplace of ideas" by ensuring consumers (voters) know the source of information.',
      keyPoints: [
        'Improves information flow, not central control',
        'No restrictions on speech, only disclosure',
        'Aids decentralized decision-making',
        'Donors free to donate but cannot hide identity',
        'Leverages marketplace of ideas with better labeling',
      ],
      sources: [
        'DISCLOSE Act provisions',
        'Transparency and informed decision-making',
      ],
    },
    ostrom: {
      score: 0.8,
      reasoning: 'Campaign finance is a national issue (federal elections, constitutional rights) that appropriately falls under federal jurisdiction. A federal disclosure law makes sense because it creates uniform rules for federal elections across all 50 states – solving the problem of a patchwork where some states have strong disclosure and others don\'t. Federal elections involve national-level campaigns (presidential, congressional), so a federal rule matches the scope. The policy also addresses foreign interference, which is inherently a national-level concern. Polycentric elements remain: states can have additional disclosure rules for state-level races.',
      keyPoints: [
        'Campaign finance appropriately federal jurisdiction',
        'Uniform rules for federal elections across states',
        'Solves patchwork disclosure problem',
        'Foreign interference is national-level concern',
        'States can add rules for state-level races',
      ],
      sources: [
        'Federal election law jurisdiction',
        'State disclosure law variations',
      ],
    },
    downs: {
      score: 0.9,
      reasoning: 'This is a transparency policy, so by definition it scores very high on legibility. The entire point is to make political spending and its sources visible to the public. An opaque political system (dark money) is precisely the opposite of what this policy creates. After implementation, voters can know who funds ads and super PACs – a clear if-then: "If you spend significant money on political ads, then your identity must be disclosed." The rule is simple and its effect is to illuminate what was previously hidden. Costs (some burden on donors to report) are minimal and obvious.',
      keyPoints: [
        'Transparency policy by definition',
        'Makes political spending sources visible',
        'Clear if-then rule for disclosure',
        'Illuminates what was previously hidden',
        'Minimal and obvious compliance costs',
      ],
      sources: [
        'DISCLOSE Act transparency requirements',
        'Voter information and disclosure',
      ],
    },
    olson: {
      score: 0.9,
      reasoning: 'This policy is specifically designed to counter capture and corruption in the political process. Dark money allows special interests to secretly influence elections – the epitome of Olsonian capture (concentrated interests spending to get policies that benefit them at public expense). By mandating disclosure, the policy exposes these attempts, making it harder for special interests to operate in the shadows. It levels the playing field between well-funded insiders and ordinary citizens who can now at least see who is trying to influence their vote. Broad, uniform disclosure is inherently anti-capture: everyone must play by the same transparent rules.',
      keyPoints: [
        'Designed to counter capture and corruption',
        'Exposes special interest influence',
        'Levels playing field between insiders and citizens',
        'Everyone plays by same transparent rules',
        'Makes secret influence operations visible',
      ],
      sources: [
        'Dark money and political corruption',
        'Disclosure as anti-capture mechanism',
      ],
    },
    keynes: {
      score: 0.5,
      reasoning: 'This is a governance/transparency policy, not an economic policy. It has no direct impact on the business cycle or macroeconomic stability. It doesn\'t create jobs or stimulate demand in a recession, nor does it cool an overheating economy. Its effects are political rather than economic. We score it neutral on this dimension.',
      keyPoints: [
        'Governance policy, not economic',
        'No direct impact on business cycle',
        'Doesn\'t create jobs or stimulate demand',
        'Effects are political, not economic',
        'Neutral on economic stability dimension',
      ],
      sources: [],
    },
    pettit: {
      score: 0.8,
      reasoning: 'Dark money allows wealthy individuals or foreign actors to exercise hidden influence over elections, which is a form of domination – affecting outcomes without accountability. When big money secretly funds political campaigns, ordinary voters are subject to manipulation without knowing who is behind it. Disclosure empowers voters: they can identify who is trying to influence them and make more autonomous decisions. It shifts power from hidden elites back to the public. The ban on foreign spending particularly protects citizens from foreign domination of domestic politics.',
      keyPoints: [
        'Dark money enables hidden domination',
        'Disclosure empowers voter autonomy',
        'Shifts power from hidden elites to public',
        'Citizens can identify who influences them',
        'Foreign spending ban protects from foreign domination',
      ],
      sources: [
        'Voter autonomy and disclosure',
        'Foreign influence in elections',
      ],
    },
    hirschman: {
      score: 0.7,
      reasoning: 'The policy primarily enhances voice in democracy. When voters know who is funding campaigns, they can more effectively "voice" their opinions about that influence – they can hold politicians accountable for their donors, and they can criticize or support donors publicly. Transparency amplifies voice by giving it information to act on. As for exit: voters can\'t really "exit" the political system, but they can exit specific candidates or parties if they learn those are funded by interests the voter opposes. The policy makes voice more potent by ensuring it is informed.',
      keyPoints: [
        'Enhances voice in democracy',
        'Voters can hold politicians accountable for donors',
        'Transparency amplifies voice with information',
        'Voters can exit candidates funded by opposing interests',
        'Makes voice more potent through information',
      ],
      sources: [
        'Transparency and democratic participation',
        'Voter decision-making research',
      ],
    },
    buchanan: {
      score: 0.8,
      reasoning: 'With ~85% support across party lines (even 83% of Republicans), this policy has overwhelming public consent. The vast majority of Americans agree that they should know who is funding political ads. There is no significant group being coerced: donors can still donate, they just can\'t hide. The only "losers" are those who wanted to spend secretly, but hiding one\'s political influence is not a widely sympathized position. The policy imposes minimal burden (disclosure paperwork) for a substantial public benefit (transparency). This approaches a near-Pareto improvement in democratic process.',
      keyPoints: [
        '~85% support across party lines',
        'Overwhelming public consent demonstrated',
        'No significant group coerced',
        'Donors can still donate, just transparently',
        'Near-Pareto improvement in democratic process',
      ],
      sources: [
        'Polling on campaign finance disclosure',
        'Bipartisan transparency support',
      ],
    },
    polanyi: {
      score: 0.6,
      reasoning: 'This policy is somewhat tangential to the commodification of essentials. However, one could argue that political influence itself is being "commodified" when it can be bought secretly. By mandating disclosure, the policy pushes back against treating democracy as something to be bought and sold in the shadows. It asserts that the political sphere is not just another market where whoever has the most money wins anonymously. In a sense, it re-embeds political speech in a framework of accountability rather than pure market exchange. This is a moderate Polanyian fit – it protects democratic institutions from being purely market-driven.',
      keyPoints: [
        'Pushes back against commodified political influence',
        'Democracy not just a market for anonymous buyers',
        'Re-embeds political speech in accountability framework',
        'Protects democratic institutions from market logic',
        'Moderate fit with Polanyian principles',
      ],
      sources: [
        'Democracy and market influence',
        'Political speech and accountability',
      ],
    },
    rawls: {
      score: 0.6,
      reasoning: 'The distributional impact is indirect but positive for the least advantaged. Dark money tends to benefit wealthy interests who can afford to spend large sums secretly, often against the interests of the poor or marginalized (e.g., spending to defeat policies that would help the poor). By exposing these flows, the policy empowers ordinary voters and levels the information playing field. However, disclosure alone doesn\'t transfer resources to the poor – it\'s a procedural reform. The worst-off benefit from a fairer political process where hidden money doesn\'t dominate, but the effect is second-order.',
      keyPoints: [
        'Indirect but positive impact for least advantaged',
        'Dark money often works against poor interests',
        'Empowers ordinary voters with information',
        'Procedural reform, not direct transfer',
        'Fairer process benefits worst-off second-order',
      ],
      sources: [
        'Campaign finance and inequality',
        'Political equality research',
      ],
    },
    george: {
      score: 0.4,
      reasoning: 'This policy does not involve taxation of land or monopoly rents. It is a transparency regulation, not a tax policy. It doesn\'t shift the tax burden off labor onto rent-seeking activities. One might stretch to say that dark money is a form of rent-seeking (using wealth to extract political favors), and disclosure exposes that, but the policy doesn\'t capture that rent as public revenue. It simply makes the rent-seeking visible. Therefore, it\'s largely orthogonal to Georgist principles, scoring low on this specific dimension.',
      keyPoints: [
        'Not about taxation of land or monopoly rents',
        'Transparency regulation, not tax policy',
        'Doesn\'t shift tax burden off labor',
        'Makes rent-seeking visible but doesn\'t capture it',
        'Largely orthogonal to Georgist principles',
      ],
      sources: [],
    },
    acemoglu: {
      score: 0.9,
      reasoning: 'Disclosure rules are fundamentally inclusive: they ensure that political information is available to everyone, not just insiders. In an extractive system, elites can secretly buy influence while ordinary people are kept in the dark. A transparent system levels the playing field – every voter has access to the same information about who is funding campaigns. This prevents the concentration of hidden power and supports a more inclusive political economy. The ban on foreign spending also protects domestic institutions from external extractive influence. Extremely high alignment with inclusive institutional design.',
      keyPoints: [
        'Political information available to everyone',
        'Levels playing field between insiders and voters',
        'Prevents concentration of hidden power',
        'Supports inclusive political economy',
        'Foreign ban protects from external extraction',
      ],
      sources: [
        'Acemoglu - Inclusive institutions',
        'Political transparency and inclusion',
      ],
    },
    walzer: {
      score: 0.9,
      reasoning: 'Political influence should be distributed by citizenship and democratic participation, not by money. Dark money corrupts the political sphere by allowing wealth to dominate it. Disclosure helps keep the spheres distinct: those with wealth can express opinions, but they cannot secretly overwhelm the democratic sphere. By requiring transparency, the policy ensures that democratic discourse is governed by democratic norms (accountability, public reason) rather than purely by purchasing power. The foreign spending ban is particularly sphere-appropriate: foreigners should not have a say in domestic elections (the political good of voting belongs to citizens).',
      keyPoints: [
        'Political influence by citizenship, not money',
        'Dark money corrupts democratic sphere',
        'Wealth can express opinions but not secretly dominate',
        'Democratic discourse governed by democratic norms',
        'Foreign ban: voting belongs to citizens',
      ],
      sources: [
        'Walzer - Spheres of Justice',
        'Democracy and sphere separation',
      ],
    },
  },
  modifiers: [
    {
      id: 'lower-threshold',
      name: 'Lower Disclosure Threshold',
      description: 'Require disclosure for donations as low as $200 (currently $5,000+)',
      factorChanges: { downs: 0.05, hayek: -0.1 },
    },
    {
      id: 'real-time-disclosure',
      name: 'Real-Time Disclosure',
      description: 'Require disclosure within 24-48 hours of donation',
      factorChanges: { olson: 0.05, hirschman: 0.1 },
    },
  ],
};
