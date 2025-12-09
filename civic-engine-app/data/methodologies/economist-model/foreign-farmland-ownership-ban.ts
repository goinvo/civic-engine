import { PolicyMethodology } from '../index';

export const foreignFarmlandOwnershipBan: PolicyMethodology = {
  policyId: 'foreign-farmland-ownership-ban',
  policyName: 'Ban on Foreign Ownership of Farmland',
  description: 'A federal policy to prohibit individuals or entities from designated adversarial nations (e.g., China, Russia, and others deemed national security risks) from purchasing U.S. agricultural land. The goal is to protect food security and prevent strategic footholds near sensitive sites. This idea has broad popular support (~82% nationally) and many states (29 states) have enacted similar restrictions, prompting a push for a consistent federal rule.',
  overallRationale: 'This policy has ~82% bipartisan support. It scores very high on scale match (Ostrom: 0.9) and protection (Polanyi: 0.8) as it treats farmland as more than a commodity. However, it scores lower on Hayek (0.4) as it restricts market transactions based on nationality. The policy balances national security concerns with property rights, requiring careful implementation to avoid discrimination.',
  factors: {
    hayek: {
      score: 0.4,
      reasoning: 'This policy is a blunt restriction on market transactions based on nationality. It doesn\'t require complex central planning of the economy (the government isn\'t running farms, just vetting buyers), so it avoids the most extreme "knowledge problem". However, it does sideline price signals to a degree – certain high bidders (foreign adversaries) are excluded regardless of price. In a pure Hayekian sense, that\'s a move away from free-market allocation of resources, potentially causing some inefficiency. The government must also continuously identify which countries count as "adversaries" and track ownership through bureaucracy (CFIUS and other mechanisms), which is an informational and administrative burden.',
      keyPoints: [
        'Blunt restriction on market transactions by nationality',
        'Avoids extreme knowledge problem: not running farms',
        'Sidelines some price signals by excluding buyers',
        'Move away from free-market allocation',
        'Administrative burden to track ownership',
      ],
      sources: [
        'CFIUS review process',
        'Foreign investment restrictions analysis',
      ],
    },
    ostrom: {
      score: 0.9,
      reasoning: 'National security and foreign investment are national-level problems, so a federal policy is well-scaled to address this. Individual states acting alone (as many have) can be circumvented (foreign buyers could purchase in a state with no ban or via loopholes), so a nationwide rule better matches the scope of the issue. This ensures uniform protection of farmland across all states. The policy leverages federal tools like CFIUS (Committee on Foreign Investment in the U.S.) for enforcement, aligning decision-making with the national scope of the threat.',
      keyPoints: [
        'National security requires federal-level policy',
        'State-only approaches can be circumvented',
        'Nationwide rule matches scope of issue',
        'Uniform protection across all states',
        'Leverages federal tools like CFIUS',
      ],
      sources: [
        'State foreign ownership laws',
        'CFIUS jurisdiction and authority',
      ],
    },
    downs: {
      score: 0.7,
      reasoning: 'On the surface, the rule is simple to state: "Land cannot be sold to companies or citizens from countries on the adversary list." This clarity helps it score well. However, the details introduce some complexity: who is classified as a "foreign adversary" (defined by law or security agencies), how to handle dual citizenship or shell companies, and how sales are monitored or blocked can become technical. The trade-off (national security vs. property rights and nondiscrimination) is somewhat transparent in public debates, but the actual enforcement mechanism might be opaque to an average citizen.',
      keyPoints: [
        'Simple core rule: no sales to adversary nations',
        'Complexity in defining "foreign adversary"',
        'Technical challenges: dual citizenship, shell companies',
        'Trade-offs debated publicly',
        'Enforcement mechanism may be opaque',
      ],
      sources: [
        'Foreign adversary designations',
        'Ownership verification challenges',
      ],
    },
    olson: {
      score: 0.5,
      reasoning: 'There is significant popular support and a national security rationale, which helps guard against the typical economic special-interest capture (since the usual powerful interests – big agribusiness, real estate developers – are generally not opposed, unless they sought foreign capital). However, there are risks of political misuse: the definition of "adversary" could be manipulated by interest groups or shifting politics. Also, without careful limits, such laws might be used to advantage certain domestic buyers or to stoke xenophobic sentiments. The policy would need robust, uniform criteria (and perhaps a sunset or review clause if geopolitical conditions change) to avoid capture by nativist or protectionist lobbies.',
      keyPoints: [
        'Popular support guards against typical capture',
        'National security rationale provides protection',
        'Risk of political misuse in defining adversaries',
        'Could be used to advantage domestic buyers',
        'Needs robust criteria to avoid nativist capture',
      ],
      sources: [
        'Foreign ownership policy debates',
        'National security vs protectionism',
      ],
    },
    keynes: {
      score: 0.6,
      reasoning: 'Banning some foreign purchases of farmland has a limited but slightly positive effect on economic stability. In normal times, it doesn\'t influence the business cycle. In extraordinary times, one could argue it prevents a scenario where an adversary owning farmland might destabilize food supply or land prices deliberately. Also, by curbing speculative foreign inflows, it may reduce asset price volatility in farmland (a small, specific effect). That said, it\'s not a counter-cyclical policy in the traditional sense – it won\'t automatically boost the economy in a recession or cool it in a boom.',
      keyPoints: [
        'Limited but slightly positive stability effect',
        'Doesn\'t influence normal business cycle',
        'Prevents potential adversary destabilization',
        'May reduce farmland price volatility',
        'Not counter-cyclical in traditional sense',
      ],
      sources: [
        'Foreign investment and asset prices',
        'Food security and economic stability',
      ],
    },
    pettit: {
      score: 0.8,
      reasoning: 'This policy is fundamentally about protecting independence from foreign domination. At a national level, it prevents the possibility of a foreign government or state-influenced company (especially from authoritarian regimes) gaining control over American land and potentially leveraging it against the American public. That enhances collective self-determination – the nation and local communities won\'t be reliant on or fearful of an outside power\'s decisions about critical resources. For individual farmers or residents, it ensures they aren\'t suddenly dealing with landlords or agribusiness owners that answer to adversarial governments.',
      keyPoints: [
        'Protects independence from foreign domination',
        'Prevents adversarial control over critical land',
        'Enhances collective self-determination',
        'Communities not reliant on outside powers',
        'Protects farmers from adversarial landlords',
      ],
      sources: [
        'National sovereignty and land ownership',
        'Food security and independence',
      ],
    },
    hirschman: {
      score: 0.5,
      reasoning: 'For the average citizen, this policy doesn\'t directly trap or liberate them in terms of exit or voice – hence a neutral score. However, consider stakeholders: A U.S. landowner has slightly reduced "exit" options (they cannot exit ownership by selling to certain buyers, though many other buyers remain). Foreign investors from the banned countries have no entry at all. From the community perspective, voice might be enhanced since local voices win out over foreign capital. Overall, regular people aren\'t locked into a service or institution here, so "exit" isn\'t at stake, and "voice" was exercised in making this policy.',
      keyPoints: [
        'Neutral effect on average citizen exit/voice',
        'Landowners have slightly reduced exit options',
        'Banned foreign investors have no entry',
        'Local voices win out over foreign capital',
        'Voice exercised in policy-making process',
      ],
      sources: [
        'Property rights and sale restrictions',
        'Community input on land policy',
      ],
    },
    buchanan: {
      score: 0.6,
      reasoning: 'With ~82% public approval, this policy has a clear democratic mandate, which indicates a large degree of consent. Most Americans feel safer or better off with this restriction. However, it does create a set of "losers," albeit not a large or domestically concentrated one: some landowners might get lower prices or fewer bids when selling (they lose a potential high bidder), and certain foreign individuals or firms are outright blocked from a market (they certainly don\'t consent, though they aren\'t constituents). Also, some civil rights advocates voice concerns, likening it to past discriminatory laws.',
      keyPoints: [
        '~82% public approval shows democratic mandate',
        'Most Americans feel safer with restriction',
        'Some landowners may get lower prices',
        'Blocked foreign buyers don\'t consent',
        'Civil rights concerns about discrimination',
      ],
      sources: [
        'Polling on foreign land ownership',
        'Historical alien land law comparisons',
      ],
    },
    polanyi: {
      score: 0.8,
      reasoning: 'This ban is a classic example of society pushing back to protect a vital resource (food/farmland) from unfettered market forces and potentially hostile actors. It partially de-commodifies farmland by saying: "Land isn\'t just a commodity to be sold to anyone with money; it has social and security importance." By restricting who can own land, the policy prioritizes national welfare and food security over the market freedom of buyers and sellers. This provides a buffer for communities – ensuring local agriculture and food supply can\'t be entirely subject to global capital whims or foreign state agendas.',
      keyPoints: [
        'Society protects vital resource from unfettered market',
        'Partially de-commodifies farmland',
        'Land has social and security importance beyond market',
        'Prioritizes national welfare over market freedom',
        'Buffers communities from global capital whims',
      ],
      sources: [
        'Polanyi - The Great Transformation',
        'Food sovereignty movements',
      ],
    },
    rawls: {
      score: 0.6,
      reasoning: 'This policy\'s distributional effects are mixed but slightly favorable to less advantaged groups. On one hand, it doesn\'t directly transfer resources to the poor or anything; it\'s a restriction, not a redistributive program. However, consider small farmers or rural communities: by limiting wealthy foreign bidders, local farmers (who are often not rich) might have a better chance to purchase or keep land at reasonable prices, rather than be priced out. This can help aspiring young farmers or local co-ops access land. It also protects the general population\'s interest in food security.',
      keyPoints: [
        'Mixed but slightly favorable to less advantaged',
        'Not a redistributive program',
        'Local farmers may have better chance at land',
        'Helps aspiring young farmers access land',
        'Protects general population\'s food security',
      ],
      sources: [
        'Land access for young farmers',
        'Food security and vulnerable populations',
      ],
    },
    george: {
      score: 0.5,
      reasoning: 'This ban isn\'t a tax or a way to capture economic rent for public use; it\'s a restriction on who can extract rent. It doesn\'t penalize labor directly, nor does it explicitly tax land or monopoly rents. If anything, it might slightly reduce land values in some cases (which means slightly less unearned rent for land sellers), but those savings aren\'t collected as public revenue – they remain with the domestic buyers who got a lower price. It also doesn\'t reduce any taxes on labor or production. In Henry George terms, the policy is orthogonal: it changes ownership rules but doesn\'t reform the tax structure.',
      keyPoints: [
        'Not a tax or rent capture for public use',
        'Restriction on who can extract rent',
        'Doesn\'t penalize labor directly',
        'May slightly reduce land values',
        'Orthogonal to Georgist tax reform',
      ],
      sources: [],
    },
    acemoglu: {
      score: 0.6,
      reasoning: 'This policy has an element of protecting inclusive access within the national community, but also a hint of exclusivity in terms of global inclusion. For U.S. institutions, it can be seen as preserving broad domestic access to land ownership and preventing potentially extractive foreign interference. Local farmers and businesses stay in the game without being outbid by foreign state-backed giants, which levels the playing field for domestic participants. However, by definition it excludes a class of actors (certain foreigners) from the market, which is exclusive on an international level – though justified by adversary status.',
      keyPoints: [
        'Protects inclusive access within national community',
        'Preserves domestic access to land ownership',
        'Levels playing field for domestic participants',
        'Excludes certain foreigners from market',
        'Inclusive nationally, exclusive internationally',
      ],
      sources: [
        'Acemoglu - Inclusive institutions',
        'National vs international inclusivity',
      ],
    },
    walzer: {
      score: 0.8,
      reasoning: 'The core principle here is treating farmland and national security as distinct from normal market commodities, which is an example of appropriate sphere reasoning. In Walzer\'s terms, the policy says that something as vital as land tied to food supply and sovereignty shouldn\'t simply go to the highest bidder; political/community criteria (like national security, communal ownership) rightly override pure market logic. This is using the correct principles for the sphere of national survival and agriculture – communal security over profit. However, we must note the concern: if the policy is applied in a blanket way against certain ethnic groups or without nuance, it could mix the spheres of racial justice with security in a problematic way.',
      keyPoints: [
        'Treats farmland/security as distinct from commodities',
        'Appropriate sphere reasoning',
        'Political criteria override pure market logic',
        'Communal security over profit',
        'Must avoid mixing racial justice with security spheres',
      ],
      sources: [
        'Walzer - Spheres of Justice',
        'Land as non-commodity good',
      ],
    },
  },
  modifiers: [
    {
      id: 'broader-country-list',
      name: 'Expanded Adversary List',
      description: 'Expand the list of countries from which purchases are restricted',
      factorChanges: { pettit: 0.05, buchanan: -0.1 },
    },
    {
      id: 'divestiture-requirement',
      name: 'Divestiture Requirement',
      description: 'Require divestiture of existing holdings within 5 years',
      factorChanges: { pettit: 0.1, hayek: -0.1 },
    },
  ],
};
