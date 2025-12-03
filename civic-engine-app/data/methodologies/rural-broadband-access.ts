import { PolicyMethodology } from './index';

export const ruralBroadbandAccess: PolicyMethodology = {
  policyId: 'rural-broadband-access',
  policyName: 'Universal Broadband & Municipal Internet',
  description: 'Fund universal high-speed internet for rural areas and legalize municipal (local government-run) broadband networks to spur competition. Federal policy in infrastructure with ~76% public support.',
  overallRationale: 'Universal Broadband & Municipal Internet scores exceptionally well across most dimensions. It excels in scale match (Ostrom: 0.9) combining federal funding with local implementation, and strongly advances inclusivity (Acemoglu: 0.9) and protection of essential services (Polanyi: 0.8). The policy treats internet access as essential infrastructure rather than a luxury commodity, with broad bipartisan support reflecting near-consensus on the need to bridge the digital divide.',
  factors: {
    hayek: {
      score: 0.8,
      reasoning: 'This policy largely respects decentralized, local solutions while the federal role is mainly to fund and remove legal barriers. The municipal broadband approach lets local governments and co-ops decide for themselves whether and how to build networks – a very decentralized model. The federal government does not dictate network design or run the ISPs; it empowers local knowledge by enabling local decision-making about infrastructure. The only central element is funding and preemption of state bans (i.e., removing artificial legal obstacles that prevent local solutions). The policy avoids heavy-handed central planning: it does not create a national monopoly or specify exactly how communities must get online, instead fostering experimentation.',
      keyPoints: [
        'Respects decentralized, local solutions',
        'Federal role is funding and removing legal barriers',
        'Municipal broadband lets localities decide for themselves',
        'Enables local knowledge and decision-making',
        'Avoids heavy-handed central planning',
      ],
      sources: [
        'Municipal broadband case studies',
        'Federal broadband funding mechanisms',
      ],
    },
    ostrom: {
      score: 0.9,
      reasoning: 'This is a strong example of polycentric governance. The problem (lack of broadband) varies in scale: it is a national issue in aggregate (millions lack access across the country) but each community\'s connectivity challenge is local and specific. The proposed solution matches decision-making to scope well: federal grants and preemptions provide resources and remove barriers at a high level, while local governments and cooperatives implement actual networks tailored to their geography and needs. Federal policy sets a floor (everyone deserves access), while local entities determine the approach. This polycentric structure mirrors successful rural electrification in the 20th century.',
      keyPoints: [
        'Strong example of polycentric governance',
        'National issue in aggregate, local challenges in specifics',
        'Federal grants and preemptions at high level',
        'Local implementation tailored to geography and needs',
        'Mirrors successful rural electrification model',
      ],
      sources: [
        'Rural electrification history',
        'Polycentric broadband governance models',
      ],
    },
    downs: {
      score: 0.8,
      reasoning: 'The policy is relatively simple to understand: "Money goes to underserved areas to build broadband, and cities are allowed to do it themselves if they choose." The if-then logic is clear – if a community lacks adequate internet service, federal funds can flow there; if a city wants to build a network, it can legally do so (assuming federal preemption of state bans). Costs and trade-offs are largely visible: we can see what is being spent and where. Users will know whether they now have internet or not. The policy is not laden with obscure formulas or hidden transfers – it\'s a straightforward infrastructure initiative.',
      keyPoints: [
        'Simple to understand: money to underserved areas',
        'Clear if-then logic for eligibility',
        'Cities allowed to build networks themselves',
        'Costs and trade-offs visible',
        'Straightforward infrastructure initiative',
      ],
      sources: [
        'Broadband funding transparency',
        'Municipal network authorization',
      ],
    },
    olson: {
      score: 0.7,
      reasoning: 'By opening the door to municipal and cooperative broadband, this policy explicitly undercuts the monopoly grip of large telecom incumbents. Historically, ISPs have lobbied state legislatures to ban municipal networks to protect their market power – classic rent-seeking. The federal preemption that this policy would involve is directly anti-capture: it stops incumbents from using political influence to block competition. The risk of capture exists in how funds are distributed, but the emphasis on competition and diverse providers reduces that risk. Overall, the policy is designed to level the playing field rather than entrench incumbents.',
      keyPoints: [
        'Undercuts monopoly grip of telecom incumbents',
        'Federal preemption stops rent-seeking lobbying',
        'Designed to level the playing field',
        'Emphasis on competition and diverse providers',
        'Risk in fund distribution but mitigated by design',
      ],
      sources: [
        'ISP lobbying against municipal broadband',
        'Competition policy in telecommunications',
      ],
    },
    keynes: {
      score: 0.6,
      reasoning: 'Broadband infrastructure spending can have mild counter-cyclical features: it creates jobs (construction, installation) and can be ramped up during economic downturns as a form of fiscal stimulus. However, the policy isn\'t explicitly designed as an automatic stabilizer – it doesn\'t ramp up spending automatically when unemployment rises. It could be designed with faster disbursement during recessions. As proposed, it\'s a steady investment rather than a targeted recession-fighter. Still, infrastructure investment generally supports demand, so it\'s not pro-cyclical either.',
      keyPoints: [
        'Infrastructure spending has mild counter-cyclical features',
        'Creates jobs in construction and installation',
        'Not explicitly designed as automatic stabilizer',
        'Steady investment rather than recession-fighter',
        'Generally supports demand without being pro-cyclical',
      ],
      sources: [
        'Infrastructure as economic stimulus',
        'Broadband deployment job creation',
      ],
    },
    pettit: {
      score: 0.8,
      reasoning: 'Providing universal broadband empowers communities and individuals who were previously reliant on monopoly ISPs or left out entirely. In rural areas, being without internet can mean dependence on distant institutions or lack of access to critical services – a form of powerlessness. With municipal or co-op broadband, these communities gain a tool of independence: they can access information, work remotely, engage in commerce, and communicate on their own terms. The policy reduces domination by telecom companies who could otherwise dictate terms to captive markets. People gain the ability to participate in modern society.',
      keyPoints: [
        'Empowers previously reliant communities',
        'Reduces dependence on monopoly ISPs',
        'Communities gain tools of independence',
        'Access to information, work, and commerce',
        'Reduces domination by telecom companies',
      ],
      sources: [
        'Digital inclusion and empowerment',
        'Broadband as essential service',
      ],
    },
    hirschman: {
      score: 0.8,
      reasoning: 'This policy significantly enhances both exit and voice. For exit: it creates new options – if a private ISP offers poor service, citizens in a municipality with a public option can "exit" to the public network. Before, they were often trapped with a single provider or none at all. The legalization of municipal broadband gives communities the ability to exit the status quo and build their own solution. For voice: the push for this policy itself has been driven by community advocacy. Communities have used voice to demand better connectivity, and a federal policy enabling local networks amplifies that voice by giving them the legal and financial tools to act.',
      keyPoints: [
        'Creates new options for consumers',
        'Citizens can exit to public network if ISP is poor',
        'Ends situation of being trapped with single provider',
        'Communities can build their own solutions',
        'Policy driven by community advocacy and voice',
      ],
      sources: [
        'Consumer choice in broadband',
        'Community broadband advocacy',
      ],
    },
    buchanan: {
      score: 0.8,
      reasoning: 'There is strong and broad support for broadband expansion (~70%+ across parties). Virtually everyone agrees that rural communities should have internet access, so this policy approaches a near-consensus public good. The costs are borne by general taxpayers (spread very thinly), and the benefits go to underserved areas – a classic public investment scenario. No significant group is "losing" from having more broadband built. ISPs might resist due to competition, but they are not coerced into anything – they simply face a more competitive market. Given that even Republicans and Democrats agree on this, it reflects a broad social contract endorsement.',
      keyPoints: [
        '70%+ support across parties',
        'Near-consensus that rural areas need internet',
        'Costs spread thinly across taxpayers',
        'No significant group is losing',
        'Broad social contract endorsement',
      ],
      sources: [
        'Polling on rural broadband',
        'Bipartisan infrastructure support',
      ],
    },
    polanyi: {
      score: 0.8,
      reasoning: 'This policy treats internet access as essential infrastructure, akin to roads or electricity, rather than just a luxury commodity. By funding universal access and enabling public provision, it de-commodifies broadband to a significant extent: even if you live where it\'s not profitable for a company to serve you, you will still get service. This is a case of society stepping in to ensure a basic need (connectivity in the modern era) is met for all, not just those in profitable markets. The municipal option in particular says communities can provide this good publicly, outside the pure market logic.',
      keyPoints: [
        'Treats internet as essential infrastructure',
        'De-commodifies broadband significantly',
        'Service provided even where unprofitable',
        'Society ensures basic need is met for all',
        'Municipal option outside pure market logic',
      ],
      sources: [
        'Internet as essential utility',
        'Public provision of infrastructure',
      ],
    },
    rawls: {
      score: 0.8,
      reasoning: 'The primary beneficiaries are those currently worst-off in terms of connectivity: rural residents, low-income areas, and tribal communities with no or inadequate internet. This is a maximin policy in the digital realm – it aims to raise the floor so that even the least connected Americans have quality access. The already-connected (typically urban, higher-income) don\'t need this help as much; it\'s explicitly targeted at underserved populations. This addresses a significant inequality (the digital divide) that disadvantages the poor and rural in education, healthcare, and economic opportunity.',
      keyPoints: [
        'Benefits worst-off in connectivity',
        'Targets rural, low-income, and tribal communities',
        'Maximin policy in digital realm',
        'Raises the floor for least connected',
        'Addresses digital divide inequality',
      ],
      sources: [
        'Digital divide research',
        'Broadband access disparities',
      ],
    },
    george: {
      score: 0.5,
      reasoning: 'The policy does not primarily involve taxing land or monopoly rents – it\'s funded through general appropriations. However, one could argue it indirectly strikes at monopoly rents: large ISPs have enjoyed quasi-monopoly power (earning rents from lack of competition), and by fostering municipal competition, those rents could be eroded. But this is a second-order effect, not a direct mechanism. The policy doesn\'t involve a land value tax or explicit rent capture. It\'s neutral on George\'s specific ideal, though philosophically aligned with reducing extractive monopoly behavior.',
      keyPoints: [
        'Not primarily about taxing land or monopoly rents',
        'Funded through general appropriations',
        'Indirectly erodes ISP monopoly rents',
        'Second-order effect, not direct mechanism',
        'Neutral on Georgist ideal but reduces extraction',
      ],
      sources: [],
    },
    acemoglu: {
      score: 0.9,
      reasoning: 'Universal broadband and municipal networks are strongly inclusive. They remove barriers to entry: barriers for citizens to access the internet, and barriers for communities to provide it themselves. By breaking the monopoly stranglehold, the policy ensures that participation in the digital economy is not restricted to those lucky enough to live where a private company chose to invest. This levels the playing field enormously – a rural entrepreneur can compete online just like an urban one. It also levels the political playing field by giving underserved communities tools to advocate and organize. Extremely inclusive institutional design.',
      keyPoints: [
        'Removes barriers to internet access',
        'Breaks monopoly stranglehold',
        'Levels economic playing field',
        'Rural entrepreneurs can compete with urban',
        'Extremely inclusive institutional design',
      ],
      sources: [
        'Acemoglu - Inclusive institutions',
        'Digital economy participation',
      ],
    },
    walzer: {
      score: 0.8,
      reasoning: 'This policy asserts that basic connectivity is a good that should be distributed by need and civic equality, not purely by ability to pay or profit potential. In a Walzerian sense, the sphere of communications and information access should operate on criteria of citizenship and need – everyone in a modern democracy needs to be able to access information and services. By funding universal access and allowing public provision, the policy prevents the sphere of communications from being entirely dominated by market logic (which left some out). It\'s sphere-appropriate: connectivity is treated as a public interest matter, not just a private transaction.',
      keyPoints: [
        'Connectivity distributed by need and civic equality',
        'Sphere of communications operates on citizenship criteria',
        'Everyone in democracy needs information access',
        'Prevents market logic from excluding people',
        'Sphere-appropriate: public interest matter',
      ],
      sources: [
        'Walzer - Spheres of Justice',
        'Communications as public good',
      ],
    },
  },
  modifiers: [
    {
      id: 'fiber-only-requirement',
      name: 'Fiber-Only Funding',
      description: 'Require that federal funds go only to fiber-optic networks (future-proof technology)',
      factorChanges: { hayek: -0.1, rawls: 0.05 },
    },
    {
      id: 'expanded-municipal-preemption',
      name: 'Full State Preemption',
      description: 'Completely preempt all state laws restricting municipal broadband',
      factorChanges: { ostrom: -0.1, hirschman: 0.1 },
    },
  ],
};
