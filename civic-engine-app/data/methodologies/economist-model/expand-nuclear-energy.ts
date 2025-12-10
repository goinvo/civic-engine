import { PolicyMethodology } from '../index';

export const expandNuclearEnergy: PolicyMethodology = {
  policyId: 'expand-nuclear-energy',
  policyName: 'Expand Nuclear Energy (ADVANCE Act)',
  description: 'The ADVANCE Act of 2024 streamlines NRC licensing, cuts fees, introduces DOE prize competitions for first-of-a-kind reactors, and enables reuse of retired coal plant sites for nuclear projects. Federal policy in energy with overwhelming bipartisan support (88-2 Senate, 393-14 House).',
  overallRationale: 'The ADVANCE Act scores exceptionally well on scale match (Ostrom: 0.9) and inclusivity (Acemoglu: 0.9) by lowering barriers for new reactor companies while maintaining federal safety oversight. It achieves high consent (Buchanan: 0.8) through near-unanimous bipartisan support. The policy harnesses market competition and decentralized innovation rather than central planning, earning a strong Hayek score (0.8).',
  factors: {
    hayek: {
      score: 0.8,
      reasoning: 'Rather than central planning, the policy harnesses market competition and decentralized innovation. By reducing bureaucratic hurdles and costs, it lets private reactor developers respond to price signals and local knowledge (e.g. pursuing advanced designs) without heavy-handed directives.',
      keyPoints: [
        'Harnesses market competition over central planning',
        'Reduces bureaucratic hurdles and costs',
        'Private developers respond to price signals',
        'Enables pursuit of advanced designs',
        'No heavy-handed directives on technology choices',
      ],
      sources: [
        'DOE ADVANCE Act analysis',
        'Harvard Law Review nuclear regulation',
      ],
    },
    ostrom: {
      score: 0.9,
      reasoning: 'Nuclear energy involves national-scale challenges (climate, grid stability, safety), and the federal-level reforms align well with that scope. Empowering the federal NRC to modernize licensing for advanced reactors is appropriate to the nationwide nature of nuclear regulation, while also enabling local projects (like microreactors on military bases) within a national framework.',
      keyPoints: [
        'National-scale challenges match federal approach',
        'Climate and grid stability are nationwide issues',
        'NRC modernization appropriate for national scope',
        'Enables local projects within national framework',
        'Microreactors can serve specific local needs',
      ],
      sources: [
        'DOE nuclear deployment analysis',
        'Federal nuclear regulation structure',
      ],
    },
    downs: {
      score: 0.6,
      reasoning: "The Act's measures are relatively transparent in intent – e.g. \"halve fees, expedite licenses\" – but nuclear regulations remain technical. The policy's trade-offs (faster approvals vs. potential safety reviews burden) are somewhat complex. Still, it sets clear criteria (five \"first reactor\" prize categories, streamlined microreactor rules in 18 months) that make the policy's effects understandable.",
      keyPoints: [
        'Intent is transparent: halve fees, expedite licenses',
        'Nuclear regulations remain technical',
        'Trade-offs between speed and safety are complex',
        'Clear criteria for prize categories',
        'Streamlined microreactor rules with timeline',
      ],
      sources: [
        'Harvard Law Review ADVANCE Act analysis',
        'NRC licensing process',
      ],
    },
    olson: {
      score: 0.6,
      reasoning: "The reforms apply broadly to all \"advanced reactor\" projects, rather than a narrow subsidy to one firm, which limits favoritism. The inclusion of sunset-like incentives (prizes only for first movers) and maintaining NRC independence guard against industry capture. However, the policy was driven by the nuclear industry's interests (to lower costs), so there is some lobby influence – for example, a Gates-funded company is poised to benefit from the fee reimbursement prize.",
      keyPoints: [
        'Reforms apply broadly to all advanced reactors',
        'Prizes only for first movers limit ongoing capture',
        'NRC independence maintained',
        'Some industry lobby influence present',
        'Gates-funded TerraPower may benefit',
      ],
      sources: [
        'Nuclear industry lobbying analysis',
        'ADVANCE Act provisions',
      ],
    },
    keynes: {
      score: 0.5,
      reasoning: "This policy is not designed as an economic stabilizer in recessions or booms. Its impacts (building reactors) will unfold over years irrespective of short-term cycles. On one hand, investing in infrastructure like reactors can be counter-cyclical if timed during downturns, but the Act provides no automatic mechanism for that – it's a structural policy aimed at long-term growth, essentially neutral on the economic cycle.",
      keyPoints: [
        'Not designed as economic stabilizer',
        'Impacts unfold over years regardless of cycle',
        'Infrastructure investment can be counter-cyclical',
        'No automatic counter-cyclical mechanism',
        'Structural policy for long-term growth',
      ],
      sources: [],
    },
    pettit: {
      score: 0.5,
      reasoning: "The Act doesn't directly grant individuals new rights or bargaining power vis-à-vis authorities – it's mainly industry-facing. One could argue it strengthens national energy independence (reducing reliance on foreign oil/gas) and thus reduces domination by external forces, but for ordinary workers and communities the effect is indirect. Communities hosting new reactors may gain jobs, yet they remain subject to NRC and utility decisions.",
      keyPoints: [
        'Mainly industry-facing policy',
        'May strengthen energy independence',
        'Reduces reliance on foreign energy',
        'Indirect effects for workers and communities',
        'Communities still subject to NRC decisions',
      ],
      sources: [
        'Energy independence research',
      ],
    },
    hirschman: {
      score: 0.5,
      reasoning: "The policy broadens the energy mix by making nuclear more viable, but it doesn't obviously increase \"exit\" options or voice for consumers in the short run. Electric customers cannot easily choose their power source, though a more robust nuclear sector could prevent energy shortages (an exit from blackouts). Affected communities and companies do have a voice through NRC's public comment processes (which the Act leaves intact).",
      keyPoints: [
        'Broadens energy mix options',
        'Consumers cannot easily choose power source',
        'May prevent energy shortages',
        'NRC public comment processes intact',
        'Enables new suppliers to enter market',
      ],
      sources: [],
    },
    buchanan: {
      score: 0.8,
      reasoning: "The benefits (clean energy, jobs, innovation) are diffuse and broadly shared, while any costs or risks are relatively diffuse as well. No specific group is singled out to bear costs coercively. The legislation was passed with near-unanimous political support (88-2 Senate, 393-14 House), indicating a high degree of consensus. Potential \"losers\" (e.g. fossil fuel competitors) are not coerced by the Act, just faced with market competition.",
      keyPoints: [
        'Benefits broadly shared: clean energy, jobs, innovation',
        'Costs and risks diffuse',
        'No group singled out to bear costs',
        'Near-unanimous political support',
        'Fossil fuel competitors face competition, not coercion',
      ],
      sources: [
        'ADVANCE Act voting records',
        'Bipartisan support analysis',
      ],
    },
    polanyi: {
      score: 0.5,
      reasoning: "This policy doesn't directly decommodify any basic good or provide social safety nets; it operates within the market for energy tech. It neither treats labor as a mere commodity nor provides workers a new protective buffer like welfare. One indirect aspect: by facilitating nuclear, it might help secure an essential service – electricity – in the long run, but it's still provided via market utilities.",
      keyPoints: [
        'Does not decommodify basic goods',
        'Operates within market for energy tech',
        'No new protective buffer for workers',
        'May help secure electricity long-term',
        'Energy still provided via market utilities',
      ],
      sources: [],
    },
    rawls: {
      score: 0.6,
      reasoning: "Expanding nuclear energy is not a targeted antipoverty program, but it can aid the worst-off indirectly. By transitioning from fossil fuels, it may prevent climate harm that disproportionately affects vulnerable communities. The Act also specifically encourages projects at retiring coal plant sites to retain jobs in struggling \"energy communities\", which suggests an attempt to help less-advantaged regions.",
      keyPoints: [
        'Not a targeted antipoverty program',
        'Climate benefits help vulnerable communities',
        'Encourages projects at retiring coal sites',
        'Preserves jobs in energy communities',
        'Primary beneficiaries include firms and skilled workers',
      ],
      sources: [
        'Climate justice research',
        'Energy community transition analysis',
      ],
    },
    george: {
      score: 0.5,
      reasoning: "The Act neither introduces new taxes nor explicitly captures unearned rents. In fact, it reduces fees (which can be seen as reducing a tax on productive activity). It doesn't shift the tax burden onto land or monopoly rents. Essentially neutral on Henry George's ideal – funded by general revenue and incentives, not by taxing labor or capturing resource rents.",
      keyPoints: [
        'Does not introduce new taxes',
        'Reduces fees on productive activity',
        'Does not shift burden to land or monopoly rents',
        'Funded by general revenue',
        'Neutral on Georgist principles',
      ],
      sources: [],
    },
    acemoglu: {
      score: 0.9,
      reasoning: 'The policy lowers barriers to entry in the nuclear industry. By cutting onerous fees and accelerating licensing, it enables new and smaller reactor companies (not just established utilities) to participate. It also permits foreign investment and cooperation in nuclear development, broadening the field of participants. These moves create a more inclusive, level playing field for innovation.',
      keyPoints: [
        'Lowers barriers to entry in nuclear industry',
        'Enables new and smaller reactor companies',
        'Not just established utilities can participate',
        'Permits foreign investment and cooperation',
        'Level playing field for innovation',
      ],
      sources: [
        'Acemoglu - Inclusive institutions',
        'Nuclear industry entry barriers',
      ],
    },
    walzer: {
      score: 0.8,
      reasoning: "The Act respects the distinct \"sphere\" of nuclear safety regulation while easing economic burdens. It does not allow money to purchase leniency on safety – NRC's independence is maintained – but it removes purely financial obstacles that kept some worthy projects from advancing. In distributing licenses and incentives, it uses meritocratic and need-based logic (first-of-a-kind reactors in key categories get support) rather than simply market power.",
      keyPoints: [
        'Respects safety regulation sphere',
        'Money cannot purchase safety leniency',
        'NRC independence maintained',
        'Removes financial obstacles to worthy projects',
        'Meritocratic allocation based on innovation',
      ],
      sources: [
        'Walzer - Spheres of Justice',
        'NRC independence analysis',
      ],
    },
  },
  modifiers: [
    {
      id: 'extended-prize-program',
      name: 'Extended Prize Program',
      description: 'Expand DOE prizes beyond first-of-a-kind to include second and third deployments',
      factorChanges: { olson: -0.1, acemoglu: 0.05 },
    },
    {
      id: 'community-benefit-agreements',
      name: 'Community Benefit Agreements',
      description: 'Require community benefit agreements for projects at former coal sites',
      factorChanges: { rawls: 0.1, pettit: 0.1 },
    },
  ],
};
