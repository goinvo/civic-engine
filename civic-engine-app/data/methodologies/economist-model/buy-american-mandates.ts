import { PolicyMethodology } from '../index';

export const buyAmericanMandates: PolicyMethodology = {
  policyId: 'buy-american-mandates',
  policyName: '"Buy American" Mandates',
  description: 'Require government purchases to favor domestically made products, even if not cheapest. The Buy American Act (1933) and 2021 infrastructure law expansions mandate U.S.-made iron, steel, and goods in federal contracts. ~97% of federal contract dollars already go to U.S. firms.',
  overallRationale: '"Buy American" mandates score well on Polanyian protection (0.7) by buffering domestic workers from global market competition, but poorly on Hayekian information feasibility (0.2) by overriding price signals. Low scores on anti-capture (Olson: 0.3), consent (Buchanan: 0.3), and inclusivity (Acemoglu: 0.3) reflect how the policy creates rents for domestic producers and excludes foreign competitors. The policy embodies trade-offs between protecting domestic industry and economic efficiency.',
  factors: {
    hayek: {
      score: 0.2,
      reasoning: '"Buy American" policies override price signals and local knowledge in procurement. Instead of allowing agencies to simply buy the best product at the best price (which reflects dispersed information about quality and cost), a centralized rule imposes a preference irrespective of price. This assumes policymakers know that supporting domestic industry justifies the efficiency loss – essentially a top-down value judgment closer to planning than market outcome.',
      keyPoints: [
        'Overrides price signals in procurement',
        'Centralized rule ignores local cost-benefit',
        'Top-down value judgment over markets',
        'Assumes policymakers know better than prices',
        'Requires bureaucratic omniscience',
      ],
      sources: [
        'US Chamber of Commerce Buy American analysis',
        'Procurement efficiency research',
      ],
    },
    ostrom: {
      score: 0.5,
      reasoning: 'The issue at hand is national economic security and job preservation, which arguably is appropriately addressed at the national level. Federal procurement rules are the right scale for a national manufacturing concern. However, problems arise when one-size-fits-all rules hit local projects. A strictly national policy on what is really a global economic system can misfire. Overall, it targets U.S. federal spending appropriately but may not account for the nuanced, multi-level nature of modern supply chains.',
      keyPoints: [
        'National scale appropriate for economic security',
        'Federal procurement rules match concern',
        'One-size-fits-all can harm local projects',
        'Global supply chains are multi-level',
        'May mismatch with international trade realities',
      ],
      sources: [
        'Federal procurement policy',
        'Supply chain governance',
      ],
    },
    downs: {
      score: 0.6,
      reasoning: 'On the surface, "Buy American" is a simple principle easily communicated ("use our tax dollars on American goods"). However, when implemented, it spawns complex regulations defining domestic content, exceptions for unreasonable cost increases, lists of nonavailable items, etc. These details can become opaque and bureaucratic, hidden in Federal Acquisition Regulations. The slogan is clear but the policy reality is less so.',
      keyPoints: [
        'Simple principle easy to communicate',
        'Implementation spawns complex regulations',
        'Domestic content definitions are opaque',
        'Exceptions and waivers add complexity',
        'Trade-offs hidden in regulations',
      ],
      sources: [
        'Federal Acquisition Regulations',
        'Buy American implementation',
      ],
    },
    olson: {
      score: 0.3,
      reasoning: 'Domestic content mandates are susceptible to interest-group capture. Specific industries lobby to be included or to tighten rules in their favor (e.g. U.S. steel producers). Companies that qualify as "American-made" have a captive market and can charge higher prices – a form of rent-seeking. Benefits concentrate in certain firms and unions, making it classic concentrated-benefit, diffuse-cost. The mandates lack sunset clauses and tend to get tighter over time due to lobbying.',
      keyPoints: [
        'Susceptible to industry capture',
        'Steel producers lobby for strict rules',
        'Creates captive market for domestic firms',
        'Concentrated benefits, diffuse costs',
        'No sunset clauses, rules only tighten',
      ],
      sources: [
        'Steel industry lobbying',
        'Protectionist policy capture',
      ],
    },
    keynes: {
      score: 0.5,
      reasoning: '"Buy American" rules do not adjust with the business cycle – they are always in force. In a downturn, they could arguably keep more money onshore and support domestic jobs (a mild counter-cyclical effect). Conversely, they might raise infrastructure costs and reduce project volume unless extra funding is provided. During major recessions, governments sometimes relax procurement rules to get things done cheaper/faster. Essentially neutral on economic stability.',
      keyPoints: [
        'Does not adjust with business cycle',
        'May keep money onshore in downturns',
        'Higher costs may reduce project volume',
        'Sometimes relaxed during recessions',
        'Structural policy, not stabilizer',
      ],
      sources: [],
    },
    pettit: {
      score: 0.5,
      reasoning: '"Buy American" empowers certain workers by shielding them from domination by global market forces (like sudden import competition). A steelworker\'s livelihood is less at the mercy of foreign steel dumping. However, it simultaneously makes government agencies dependent on a narrower supplier base – if there\'s only one domestic source, that company gains power. Taxpayers might be "dominated" by an ideology forcing them to pay more. Effects balance out.',
      keyPoints: [
        'Shields workers from global market forces',
        'Reduces dependence on foreign suppliers',
        'Creates dependence on narrow domestic base',
        'Sole-source suppliers gain power',
        'Mixed effects on domination overall',
      ],
      sources: [
        'Trade protection and workers',
        'Supplier market power',
      ],
    },
    hirschman: {
      score: 0.4,
      reasoning: '"Buy American" limits exit options in the procurement sphere. A government agency or contractor can\'t freely switch to a foreign supplier, even if that supplier offers a superior deal. This can lead to complacency by domestic suppliers, since they know buyers have fewer outside options. Voice mechanisms are bureaucratic and political rather than direct feedback. Foreign firms and those relying on foreign components are just shut out.',
      keyPoints: [
        'Limits exit options for procurement',
        'Cannot switch to foreign suppliers',
        'Domestic suppliers may become complacent',
        'Voice only through political lobbying',
        'Foreign firms shut out entirely',
      ],
      sources: [
        'Procurement competition research',
        'Supplier exit options',
      ],
    },
    buchanan: {
      score: 0.3,
      reasoning: 'These mandates create clear "losers": foreign producers are explicitly excluded, and domestic taxpayers often pay more for projects than they would otherwise. The policy deliberately coerces procurement officials to choose costlier options for a redistributive goal. Those who bear the cost aren\'t directly compensated, except by diffuse "stronger domestic industry" benefits. Not everyone consents to paying more, and trade partners certainly don\'t consent.',
      keyPoints: [
        'Creates clear losers: foreign producers',
        'Taxpayers pay more for projects',
        'Coerces officials to choose costlier options',
        'Costs not compensated to bearers',
        'Trade partners excluded without consent',
      ],
      sources: [
        'Trade policy consent',
        'Cost-benefit distribution',
      ],
    },
    polanyi: {
      score: 0.7,
      reasoning: "This is explicitly a protective policy for domestic labor and industry. It is society's conscious intervention to buffer workers from the full brunt of global market competition. Instead of treating all goods as generic commodities to be sourced at lowest price worldwide, the rule carves out protected demand for American labor's products. This resonates with Polanyi's \"double movement,\" where society protects itself from market dislocations.",
      keyPoints: [
        'Explicitly protective policy',
        'Buffers workers from global competition',
        'Carves out protected demand for domestic labor',
        'Double movement: society protects itself',
        'Cushions workers and regions from shocks',
      ],
      sources: [
        'Polanyi - The Great Transformation',
        'Trade protection as social policy',
      ],
    },
    rawls: {
      score: 0.4,
      reasoning: 'The beneficiaries are a mix of middle-income manufacturing workers and companies, not the poorest or most marginalized. The mandates could make infrastructure more expensive, which can indirectly hurt lower-income people (e.g., fewer public transit projects). Already advantaged – owners of U.S. factories, skilled unionized workers in protected industries – tend to capture much benefit. More nationalist than egalitarian.',
      keyPoints: [
        'Benefits middle-income workers, not poorest',
        'Higher costs may reduce public projects',
        'Could hurt transit-dependent poor',
        'Already advantaged capture benefits',
        'More nationalist than egalitarian',
      ],
      sources: [
        'Income distribution of trade protection',
        'Infrastructure cost impacts',
      ],
    },
    george: {
      score: 0.3,
      reasoning: 'These mandates do not create taxes on land or monopoly rents; instead, they can create economic rents for domestic producers by shielding them from competition. American firms with guaranteed government business might charge higher prices – earning a rent courtesy of the policy. This is the opposite of Georgist intent. The policy forgoes potential savings to grant pricing power to certain producers.',
      keyPoints: [
        'Does not tax land or monopoly rents',
        'Creates rents for domestic producers',
        'Firms can charge higher prices',
        'Opposite of Georgist intent',
        'Grants pricing power instead of capturing rent',
      ],
      sources: [
        'Rent creation through protection',
        'Economic efficiency losses',
      ],
    },
    acemoglu: {
      score: 0.3,
      reasoning: 'Preferential procurement protects incumbents – firms that are already U.S.-based and established. New, innovative foreign competitors are excluded by definition, and even domestic startups might struggle if they rely on global supply chains. It erects barriers to entry and reduces competition and incentive to innovate among lucky insiders. Creates a more closed, less competitive market – characteristic of extractive tendencies.',
      keyPoints: [
        'Protects incumbent U.S. firms',
        'Excludes innovative foreign competitors',
        'Domestic startups with global chains struggle',
        'Erects barriers to entry',
        'Characteristic of extractive tendencies',
      ],
      sources: [
        'Acemoglu - Extractive institutions',
        'Competition and innovation',
      ],
    },
    walzer: {
      score: 0.6,
      reasoning: "There's a moral logic invoked: public money should benefit our community. This is using the sphere of membership (citizenship/national solidarity) to govern economic benefit. Many would argue government contracts aren't just about efficiency; they're also about loyalty and social cohesion. However, introducing \"American-made\" as a criterion allows an unrelated factor to influence economic decisions, somewhat akin to favoritism. Walzer might accept some economic nationalism but caution against letting politics decide in the wrong arena.",
      keyPoints: [
        'Uses membership/solidarity for economic decisions',
        'Government contracts about more than efficiency',
        'Arguments for loyalty and social cohesion',
        'Introduces potentially unrelated criterion',
        'Balances communal principle with merit',
      ],
      sources: [
        'Walzer - Spheres of Justice',
        'Economic nationalism ethics',
      ],
    },
  },
  modifiers: [
    {
      id: 'waiver-flexibility',
      name: 'Expanded Waiver Authority',
      description: 'Allow more flexibility for waivers when domestic sources unavailable or costs excessive',
      factorChanges: { hayek: 0.15, downs: 0.1, olson: -0.1 },
    },
    {
      id: 'allied-nations',
      name: 'Allied Nations Exception',
      description: 'Include products from NATO allies and trade partners',
      factorChanges: { acemoglu: 0.2, buchanan: 0.15, polanyi: -0.15 },
    },
    {
      id: 'small-business-preference',
      name: 'Small Business Preference',
      description: 'Prioritize small and minority-owned domestic businesses',
      factorChanges: { rawls: 0.15, acemoglu: 0.1 },
    },
  ],
};
