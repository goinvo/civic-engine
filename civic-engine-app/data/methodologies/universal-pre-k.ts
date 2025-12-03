import { PolicyMethodology } from './index';

export const universalPreK: PolicyMethodology = {
  policyId: 'universal-pre-k',
  policyName: 'Universal Pre-K (Preschool for All)',
  description: 'Provide high-quality preschool education to all 3- and 4-year-olds free of charge via public funding. Evidence shows benefits exceeding costs by 2.6:1 with lasting gains in graduation and college enrollment. Federal/state policy in education with broad bipartisan support.',
  overallRationale: 'Universal Pre-K scores exceptionally well on protection (Polanyi: 0.9) by de-commodifying early childhood education and on sphere justice (Walzer: 0.9) by distributing education by need rather than wealth. Strong scores on inclusivity (Acemoglu: 0.9) and the floor (Rawls: 0.8) reflect how it expands opportunity for disadvantaged children. Lower Hayek score (0.4) reflects the centralized planning nature of universal public education.',
  factors: {
    hayek: {
      score: 0.4,
      reasoning: 'A universal pre-K program represents a significant government-planned expansion of education. It relies on public authorities to set curricula, standards, and capacity, rather than spontaneous market coordination. While it can incorporate decentralized elements (community providers, local school boards), the core design assumes government knows that offering pre-K to all will yield positive outcomes – a benevolent social plan backed by research, but still a centralized policy.',
      keyPoints: [
        'Government-planned expansion of education',
        'Public authorities set curricula and standards',
        'Not spontaneous market coordination',
        'Can incorporate decentralized elements',
        'Benevolent plan backed by research',
      ],
      sources: [
        'Pre-K program design research',
        'Education policy analysis',
      ],
    },
    ostrom: {
      score: 0.6,
      reasoning: 'Education is often best managed at local and state levels, and indeed universal pre-K plans usually involve federal funding but local implementation. This tends toward a polycentric model: the problem (early education and childcare) is widespread, and the solution is delivered in countless community schools and centers. Funding comes from the larger scale (federal/state) to ensure equity, while decisions like curriculum are tailored locally.',
      keyPoints: [
        'Federal funding with local implementation',
        'Polycentric delivery model',
        'Problem is widespread, solution is local',
        'Funding ensures equity across regions',
        'Curriculum tailored locally',
      ],
      sources: [
        'Pre-K governance models',
        'Federal-state education partnerships',
      ],
    },
    downs: {
      score: 0.7,
      reasoning: '"Free pre-K for all children" is a slogan that\'s easy to grasp. The policy\'s promise is clear: if your child is of age, they can enroll at no cost. The trade-off (higher public expenditure funded by taxes) is generally transparent in debates, and parents immediately understand the benefit. It\'s an expansion of the familiar public school system down to younger ages, which the public can easily visualize.',
      keyPoints: [
        'Simple slogan: free pre-K for all',
        'Clear eligibility: if child is of age, enroll free',
        'Trade-offs transparent in debates',
        'Expansion of familiar public school system',
        'Parents immediately understand benefit',
      ],
      sources: [
        'Pre-K communication research',
        'Policy legibility studies',
      ],
    },
    olson: {
      score: 0.7,
      reasoning: "Universal programs by nature reduce selectivity and special loopholes – everyone gets access, which leaves little room for privileging one group over another. This broad coverage tends to guard against narrow interest capture. The policy's beneficiaries (families with young children, future society) are a large, diffuse group, not a small lobby. Safeguards can be built in (quality standards, mixed delivery models) to prevent any one faction from gaming the system.",
      keyPoints: [
        'Universal access reduces special loopholes',
        'Broad coverage guards against capture',
        'Beneficiaries are large, diffuse group',
        'Quality standards prevent gaming',
        'Mixed delivery models add protection',
      ],
      sources: [
        'Universal program design',
        'Anti-capture mechanisms',
      ],
    },
    keynes: {
      score: 0.6,
      reasoning: 'Funding universal pre-K means government hiring more educators and building out services, which can act as an automatic stabilizer to a mild extent. In a recession, the program wouldn\'t shrink – those teacher salaries still get paid, injecting purchasing power into the economy. By increasing labor force participation (especially of mothers), it makes the economy more resilient and stable.',
      keyPoints: [
        'Government hiring acts as mild stabilizer',
        'Program does not shrink in recessions',
        'Teacher salaries inject purchasing power',
        'Enables parental workforce participation',
        'Makes economy more resilient',
      ],
      sources: [
        'Childcare and economic stability',
        'Labor force participation research',
      ],
    },
    pettit: {
      score: 0.8,
      reasoning: 'Universal pre-K empowers individuals in subtle but significant ways. For parents, especially mothers, it provides an avenue to pursue employment or education without being wholly dependent on costly private daycare or a single earner\'s income. This reduces domination in the family and workplace: a parent can say "no" to a bad job or an overbearing partner if affordable childcare is assured.',
      keyPoints: [
        'Empowers parents, especially mothers',
        'Reduces dependence on private daycare costs',
        'Enables pursuit of employment or education',
        'Parent can refuse bad jobs or situations',
        'Children guaranteed access as a right',
      ],
      sources: [
        'Childcare and economic freedom',
        'Non-domination research',
      ],
    },
    hirschman: {
      score: 0.7,
      reasoning: 'Under universal pre-K, parents gain voice in that public programs are subject to democratic governance – they can attend school board meetings, vote for officials who shape education policy, and demand quality improvements. Exit options remain: enrollment is voluntary, so parents can opt out or choose private preschool if they prefer. Parents are less "trapped" by inability to pay.',
      keyPoints: [
        'Parents gain democratic voice',
        'Can attend school board meetings',
        'Enrollment is voluntary - exit preserved',
        'Can choose private alternatives',
        'Less trapped by inability to pay',
      ],
      sources: [
        'Democratic governance of education',
        'School choice research',
      ],
    },
    buchanan: {
      score: 0.6,
      reasoning: 'There are clear broad winners: children get education, parents get childcare and future society gets a more educated workforce. But there are some who bear costs – namely taxpayers generally, including those without young children. However, public education has long been justified by social contract – virtually everyone accepted K-12 education funding as a common good. Near bipartisan support suggests a large degree of societal consent.',
      keyPoints: [
        'Clear winners: children, parents, society',
        'Costs borne by general taxpayers',
        'Public education has social contract basis',
        'Extends accepted K-12 model',
        'Near bipartisan support shows consent',
      ],
      sources: [
        'Pre-K public support polling',
        'Social contract theory',
      ],
    },
    polanyi: {
      score: 0.9,
      reasoning: "This is a strong move to de-commodify an essential service – early childhood education/care. Instead of toddlers' development being left to what families can afford on the market, universal pre-K treats it as a social right, provided collectively. It directly addresses the problem of childcare as a commodity that many struggling families can't purchase in sufficient quality or quantity.",
      keyPoints: [
        'De-commodifies early childhood education',
        'Treats pre-K as social right',
        'Provided collectively, not by market',
        'Addresses childcare affordability crisis',
        'Protects from harsh market trade-offs',
      ],
      sources: [
        'Childcare as essential service',
        'De-commodification research',
      ],
    },
    rawls: {
      score: 0.8,
      reasoning: 'Universal pre-K is often justified in terms of closing the opportunity gap for the least advantaged children. Research indicates the biggest gains occur for low-income and at-risk kids, who often start kindergarten far behind. Studies in places like Tulsa show disadvantaged students from universal pre-K maintain better academic skills years later. Universality reduces stigma and ensures the worst-off are truly served.',
      keyPoints: [
        'Closes opportunity gap for disadvantaged',
        'Biggest gains for low-income and at-risk kids',
        'Tulsa studies show lasting benefits',
        'Universality reduces stigma',
        'Worst-off truly served by quality program',
      ],
      sources: [
        'Georgetown pre-K research',
        'Tulsa pre-K longitudinal study',
      ],
    },
    george: {
      score: 0.5,
      reasoning: "Paying for universal pre-K typically involves general taxes. Unless designed otherwise, it may be funded by income taxes, sales taxes, or deficit spending – none of which specifically target economic rent. There's no inherent mechanism here to tax land value or monopoly profits. The policy is about spending, not reforming the tax system toward land/rent.",
      keyPoints: [
        'Funded by general taxes',
        'No mechanism to tax land value',
        'Does not target monopoly profits',
        'Policy is about spending, not tax reform',
        'Neutral on Georgist principles',
      ],
      sources: [],
    },
    acemoglu: {
      score: 0.9,
      reasoning: 'This policy is fundamentally about inclusive institutions – expanding the education system to include all young children. It removes barriers that kept many kids (especially those from marginalized groups) from accessing quality early education. By leveling the playing field from early childhood, it breaks the cycle of advantage and gives a boost to those born without privilege.',
      keyPoints: [
        'Expands education to all young children',
        'Removes barriers for marginalized groups',
        'Levels playing field from early childhood',
        'Breaks cycle of advantage',
        'Lowers barriers to workforce for parents',
      ],
      sources: [
        'Acemoglu - Inclusive institutions',
        'Early childhood and opportunity',
      ],
    },
    walzer: {
      score: 0.9,
      reasoning: "Walzer's idea of \"sphere justice\" means distributing goods by criteria appropriate to their sphere. Education, especially for children, arguably should be distributed by need and equality, not by wealth. Universal pre-K embodies that: it says every child, by virtue of being a child in the community, gets access to learning – no matter if their parents are rich or poor. It removes money from the equation of early education.",
      keyPoints: [
        'Education distributed by need, not wealth',
        'Every child gets access by virtue of age',
        'Removes money from education equation',
        'Appropriate criteria for education sphere',
        'Treats early education as public good',
      ],
      sources: [
        'Walzer - Spheres of Justice',
        'Education as public good',
      ],
    },
  },
  modifiers: [
    {
      id: 'targeted-approach',
      name: 'Targeted to Low-Income',
      description: 'Limit free pre-K to families below income threshold',
      factorChanges: { rawls: 0.05, buchanan: 0.1, walzer: -0.15 },
    },
    {
      id: 'mixed-delivery',
      name: 'Mixed Delivery System',
      description: 'Include private providers and community centers alongside public schools',
      factorChanges: { hayek: 0.15, hirschman: 0.1, olson: -0.05 },
    },
    {
      id: 'full-day-program',
      name: 'Full-Day Program',
      description: 'Extend from half-day to full-day pre-K',
      factorChanges: { pettit: 0.1, keynes: 0.05, buchanan: -0.05 },
    },
  ],
};
