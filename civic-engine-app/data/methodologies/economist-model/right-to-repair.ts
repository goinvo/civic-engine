import { PolicyMethodology } from '../index';

export const rightToRepair: PolicyMethodology = {
  policyId: 'right-to-repair',
  policyName: 'National Right to Repair Act',
  description: 'Mandate that manufacturers provide consumers and independent shops with the data, tools, and parts needed to repair vehicles and electronics.',
  overallRationale: 'This policy has 83% public support (84% Republicans, 82% Democrats), representing rare bipartisan consensus. Over 90% of vehicle owners want freedom to choose where their car is repaired. The policy addresses anti-competitive practices where manufacturers restrict repairs to their own dealerships, increasing costs for consumers.',
  factors: {
    hayek: {
      score: 0.9,
      reasoning: 'This policy heavily favors decentralized knowledge and local problem-solving. By freeing repair information and tools, it relies on owners and independent mechanics (using their local knowledge) rather than assuming a central authority knows best. This decentralizes repair decisions that were previously locked behind manufacturer control (a "repair monopoly").',
      keyPoints: [
        'Favors decentralized knowledge and local problem-solving',
        'Relies on owners and mechanics using local knowledge',
        'Does not assume central authority knows best',
        'Decentralizes repair decisions previously locked by manufacturers',
        'Breaks manufacturer "repair monopoly"',
      ],
      sources: [
        'REPAIR Act legislative text',
        'Right to repair - Wikipedia',
      ],
    },
    ostrom: {
      score: 0.8,
      reasoning: 'The Right to Repair Act is a federal solution addressing a broad, nationwide issue of manufacturer-imposed repair restrictions. Given that manufacturers and electronics markets operate at national (or global) scale, a federal law is an appropriately scaled response. It aligns decision power (national legislation) with problem scope (nationwide corporate practices), reflecting a polycentric approach rather than leaving the issue to fragmented local rules.',
      keyPoints: [
        'Federal solution for nationwide issue',
        'Manufacturers operate at national/global scale',
        'Decision power aligns with problem scope',
        'Polycentric approach at appropriate governance level',
        'Avoids fragmented local rules',
      ],
      sources: [
        'State right-to-repair legislation',
        'Massachusetts automotive repair law',
      ],
    },
    downs: {
      score: 1.0,
      reasoning: 'The mechanism is very transparent and easy for the public to grasp – essentially, "If you own a device, you (or your chosen mechanic) can access the parts and data needed to fix it." The trade-offs are clear: consumers gain repair options, manufacturers lose their exclusive hold on repairs. There are no hidden or convoluted cost structures; it\'s a straightforward mandate that increases consumer choice.',
      keyPoints: [
        'Maximally transparent and easy to understand',
        '"If you own it, you can fix it" principle',
        'Trade-offs are clear and legible',
        'No hidden or convoluted cost structures',
        'Straightforward mandate increasing consumer choice',
      ],
      sources: [
        'Consumer polling on repair rights',
        'National Survey on consumer repair support',
      ],
    },
    olson: {
      score: 0.7,
      reasoning: 'The policy\'s broad and universal requirements (applying to all manufacturers) make it harder for any one company to carve out loopholes, but industry lobbyists could still seek exemptions (for example, citing safety or IP concerns). Ideally, a robust Right to Repair law would include provisions (like covering software, telematics, etc.) that prevent manufacturers from finding new ways to restrict repairs. Assuming the act is well-written, it is relatively robust against capture. However, vigilance is needed to ensure special interests don\'t water it down.',
      keyPoints: [
        'Broad universal requirements limit loopholes',
        'Industry lobbyists may seek exemptions',
        'Must cover software and telematics to be robust',
        'Relatively robust against capture if well-written',
        'Vigilance needed against special interest influence',
      ],
      sources: [
        'CollisionWeek 2025 polling data',
        'MEMA industry analysis',
      ],
    },
    keynes: {
      score: 0.5,
      reasoning: 'This policy is largely neutral in macroeconomic cyclical terms. It neither significantly stimulates nor dampens economic cycles directly, as it\'s not a fiscal or monetary measure. Indirectly, by reducing repair costs, it could provide a mild stabilizing effect on household finances (people save money on repairs especially in downturns). But overall, its impact on economic volatility or counter-cyclical stabilization is minimal.',
      keyPoints: [
        'Largely neutral in macroeconomic cyclical terms',
        'Not a fiscal or monetary measure',
        'May mildly stabilize household finances',
        'People save on repairs especially in downturns',
        'Minimal impact on economic volatility',
      ],
      sources: [],
    },
    pettit: {
      score: 0.9,
      reasoning: 'Right to Repair empowers individuals and small businesses, freeing them from dependence on manufacturers\' arbitrary power. Currently, owners are often at the mercy of corporate policies (needing the manufacturer\'s permission or services to fix their equipment – a form of "digital feudalism"). By guaranteeing repair rights, the law grants people independence in maintaining their property, reducing domination by manufacturers. Owners gain a form of "F-You money" in the sense that they can say, "I don\'t have to bow to the dealer or throw away my device; I can fix it myself or go to someone I trust."',
      keyPoints: [
        'Empowers individuals and small businesses',
        'Frees from dependence on manufacturers\' arbitrary power',
        'Ends "digital feudalism" over purchased products',
        'Grants independence in maintaining property',
        'Owners can choose their own repair path',
      ],
      sources: [
        'FTC "Nixing the Fix" report 2021',
        'American Farm Bureau Federation testimony',
      ],
    },
    hirschman: {
      score: 1.0,
      reasoning: 'This policy maximizes exit options. Consumers and mechanics are no longer "trapped" into the manufacturer\'s repair ecosystem – they can take their business elsewhere (independent repair shops or DIY). It thus introduces competition and alternative choices where previously there was none, addressing the lack of choice inherent in manufacturer repair monopolies. Nearly 98% of car owners say having the choice of where to repair their vehicle is important. Voice is also enhanced indirectly: manufacturers might improve services once consumers have exit alternatives.',
      keyPoints: [
        'Maximizes exit options for consumers',
        'No longer trapped in manufacturer ecosystem',
        'Introduces competition and alternative choices',
        '98% of car owners want repair location choice',
        'Voice enhanced through exit alternatives',
      ],
      sources: [
        'Auto repair market competition data',
        'National Survey on repair choice importance',
      ],
    },
    buchanan: {
      score: 0.8,
      reasoning: 'The Right to Repair Act enjoys near-universal public support (over 80% across Democrats, Republicans, and independents). It is a Pareto-improvement for the vast majority of people: consumers save money and gain freedom, independent businesses gain opportunities, and even the environment benefits (through less waste). The only distinct "losers" are certain manufacturers who can no longer enforce repair monopolies and extract excessive rents. While those companies are not "compensated" per se, the broad consensus and clear social benefit indicate a high degree of implicit consent.',
      keyPoints: [
        'Over 80% support across all political groups',
        'Pareto-improvement for vast majority',
        'Consumers, businesses, and environment benefit',
        'Only losers are manufacturers losing monopoly rents',
        'Broad consensus indicates high implicit consent',
      ],
      sources: [
        'CollisionWeek 2025 polling',
        'MEMA bipartisan analysis',
      ],
    },
    polanyi: {
      score: 0.6,
      reasoning: 'This factor evaluates whether the policy de-commodifies something essential or protects people from being treated as mere market objects. Right to Repair does not deal with basic needs like housing or healthcare directly, but it does protect consumers from exploitation in the repair market. For many (farmers with tractors, people who rely on electronics for work or daily life), the ability to repair equipment is crucial for livelihood. By ensuring access to repairs, the policy buffers individuals from the full brunt of market forces. It treats ownership and repair as a right attached to the product, rather than an extra commodified service.',
      keyPoints: [
        'Protects consumers from repair market exploitation',
        'Repair is crucial for farmers and workers',
        'Buffers individuals from market forces',
        'Treats ownership and repair as rights',
        'Moderate but significant protective aspect',
      ],
      sources: [],
    },
    rawls: {
      score: 0.8,
      reasoning: 'The benefits of Right to Repair flow in particular to the "least advantaged" in relative terms: those who cannot easily afford expensive dealer repairs or new replacements. It makes upkeep of phones, appliances, cars, and farm equipment more affordable, which is especially helpful for low-income consumers, rural communities, and small businesses. The wealthy may not notice much difference, but those with tighter budgets gain a safety net in the form of repair options and cost savings. By reducing the burden of repair costs, it tends to improve the situation of the worse-off more proportionally than the rich.',
      keyPoints: [
        'Benefits flow to those who cannot afford dealer repairs',
        'Makes upkeep more affordable for low-income consumers',
        'Especially helps rural communities and small businesses',
        'Provides safety net through repair options',
        'Improves situation of worse-off proportionally more',
      ],
      sources: [
        'Rural repair access studies',
        'Farmer testimony on repair barriers',
      ],
    },
    george: {
      score: 1.0,
      reasoning: 'This policy squarely targets rent-seeking behavior. Manufacturer repair monopolies are a classic form of extracting rent – leveraging control over parts/software to overcharge consumers after the sale. The Act effectively removes or taxes that "repair rent" by forcing companies to share tools and information, thus redirecting value back to consumers and independent repairers. In Henry George terms, it\'s akin to eliminating an unproductive toll or capturing an economic rent for public benefit. It doesn\'t tax labor or innovation; instead it curtails monopoly privilege.',
      keyPoints: [
        'Squarely targets rent-seeking behavior',
        'Manufacturer repair monopolies are classic rent extraction',
        'Removes "repair rent" by requiring sharing',
        'Redirects value to consumers and independent repairers',
        'Curtails monopoly privilege, not labor or innovation',
      ],
      sources: [
        'iFixit repair cost comparisons',
        'FTC study on repair market competition',
      ],
    },
    acemoglu: {
      score: 0.9,
      reasoning: 'By lowering barriers to entry for repair services (independent shops can compete) and allowing owners to participate in repairs, the policy makes economic institutions more inclusive. It prevents a small elite (big manufacturers) from hoarding the benefits of the aftermarket and levels the playing field for small businesses. Farmers, hobbyists, and local mechanics can all partake in the maintenance economy on fair terms. This undermines extractive arrangements and fosters broader participation and innovation in repair.',
      keyPoints: [
        'Lowers barriers to entry for repair services',
        'Prevents manufacturers from hoarding aftermarket benefits',
        'Levels playing field for small businesses',
        'Farmers, hobbyists, mechanics partake on fair terms',
        'Undermines extractive arrangements',
      ],
      sources: [
        'MEMA shop survey data',
        'Small business advocacy',
      ],
    },
    walzer: {
      score: 0.7,
      reasoning: 'Walzer\'s idea of sphere justice is about distributing goods by the appropriate criteria, not letting money in one sphere buy dominance in another. Right to Repair resonates with the notion that ownership of an item should confer the right to fix it – a kind of moral logic of property and functionality. It\'s inappropriate (unjust) for a company to use its economic power to dictate what you can do with your own car or phone. By correcting this, the Act ensures the sphere of personal property and use is governed by rights and needs rather than solely by the manufacturer\'s profit logic.',
      keyPoints: [
        'Ownership should confer right to fix',
        'Inappropriate for companies to dictate property use',
        'Sphere of personal property governed by rights and needs',
        'Stops money from buying undue control',
        'More just alignment of values',
      ],
      sources: [
        'Property rights philosophy',
        'Consumer ownership research',
      ],
    },
  },
  modifiers: [
    {
      id: 'include-medical-devices',
      name: 'Include Medical Devices',
      description: 'Extend right to repair to hospital and medical equipment',
      factorChanges: { rawls: 0.1, acemoglu: 0.05 },
    },
    {
      id: 'security-safeguards',
      name: 'Cybersecurity Safeguards',
      description: 'Include provisions to protect vehicle cybersecurity while enabling repair',
      factorChanges: { olson: 0.1, downs: 0.0 },
    },
  ],
};
