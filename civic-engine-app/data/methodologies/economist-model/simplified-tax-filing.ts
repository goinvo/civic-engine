import { PolicyMethodology } from '../index';

export const simplifiedTaxFiling: PolicyMethodology = {
  policyId: 'simplified-tax-filing',
  policyName: 'Simplified Tax Filing (IRS Direct File)',
  description: 'A proposal to make the IRS Direct File system permanent and nationwide. This system allows taxpayers to file their taxes for free directly through the IRS, often with pre-filled returns using data the government already has (like W-2s). It aims to save time and money for filers, eliminate the need to pay private preparers (like TurboTax), and reduce complexity. It\'s optional – taxpayers can still use private software or professionals if they prefer. After a successful pilot (94% satisfaction among users) and strong public interest (~73% of filers would use it), the program\'s expansion is trending upward.',
  overallRationale: 'IRS Direct File scores exceptionally high on scale match (Ostrom: 1.0), legibility (Downs: 0.9), anti-capture (Olson: 0.9), and inclusivity (Acemoglu: 0.9). It eliminates the tax preparation industry\'s rent extraction while making tax compliance radically simpler. 73% support reflects broad appeal despite industry opposition.',
  factors: {
    hayek: {
      score: 0.8,
      reasoning: 'The Direct File program is technically feasible and doesn\'t require unrealistic information from a central authority beyond what it already collects. In fact, it uses information the IRS already centrally has (income reports, etc.) to help citizens, which is efficient. There\'s no heavy-handed central planning of economic activity here – it\'s simply streamlining tax compliance. By leveraging existing data and straightforward rules, it respects the "local knowledge" principle in that individuals can correct or override pre-filled data if needed (the system isn\'t assuming omniscience). This scores high because it\'s a smart use of central data without overstepping into planning; it\'s more about efficiency than central control.',
      keyPoints: [
        'Uses information IRS already possesses',
        'No central planning of economic activity',
        'Individuals can correct or override pre-filled data',
        'Smart use of central data without overstepping',
        'About efficiency, not central control',
      ],
      sources: [
        'IRS information matching',
        'Direct File pilot results',
      ],
    },
    ostrom: {
      score: 1.0,
      reasoning: 'Tax filing is a national issue (federal income taxes), so a federal solution is perfectly matched to the problem\'s scope. The IRS is the appropriate level to implement this, as they manage tax collection nationwide. The program also expanded to many states for state returns, again matching state-level solutions for state taxes. This nested, polycentric approach (federal for federal taxes, state partnerships for state taxes) is exactly what scale matching calls for. It addresses the problem at the correct jurisdictional level with no mismatch, earning a top score here.',
      keyPoints: [
        'Federal taxes require federal administration',
        'IRS is appropriate level for nationwide tax collection',
        'State partnerships for state tax integration',
        'Polycentric approach: federal for federal, state for state',
        'Perfect jurisdictional match with no mismatch',
      ],
      sources: [
        'Federal tax system structure',
        'State tax filing integration',
      ],
    },
    downs: {
      score: 0.9,
      reasoning: 'Direct File makes the tax process much more transparent and user-friendly. Instead of opaque calculations or hidden fees, taxpayers see a clear pre-filled return and can understand "if you earned X, your tax is Y." It exposes the data and calculation plainly, reducing the confusion. Trade-offs (like paying a fee vs. using free service) are clear. The simplicity and time saved mean the system is legible to ordinary people. Only minor complexity remains (users must check the info and possibly input additional details if something\'s missing), so we score this very high for simplifying a traditionally opaque process.',
      keyPoints: [
        'Transparent and user-friendly tax process',
        'Clear pre-filled returns: "if you earned X, tax is Y"',
        'No hidden fees or opaque calculations',
        'Simple and time-saving for ordinary people',
        'Simplifies traditionally opaque process',
      ],
      sources: [
        'IRS Direct File pilot results',
        'User satisfaction surveys',
      ],
    },
    olson: {
      score: 0.9,
      reasoning: 'This policy directly undercuts special-interest capture. For years, the tax prep industry (Intuit, H&R Block, etc.) lobbied to block the IRS from offering a free filing service, effectively capturing policy to maintain their profits. Making Direct File permanent wrests control back to the public interest – it\'s a universal service that\'s hard for private interests to game. With open access and government provision, it\'s less vulnerable to corporate manipulation (though one must ensure ongoing political support so it isn\'t sabotaged). We score it very high because it dilutes a concentrated lobby\'s power and benefits everyone, a textbook case of reducing capture.',
      keyPoints: [
        'Directly undercuts special-interest capture',
        'Wrests control back from tax prep industry',
        'Universal service hard for private interests to game',
        'Government provision less vulnerable to manipulation',
        'Dilutes concentrated lobby power, benefits everyone',
      ],
      sources: [
        'Tax preparation industry lobbying data',
        'Free File Alliance history',
        'ProPublica TurboTax investigation',
      ],
    },
    keynes: {
      score: 0.5,
      reasoning: 'The effect on economic cycles is minimal or neutral. This is an administrative reform – it doesn\'t inject money during recessions or cool off inflation actively. At most, it saves taxpayers some money (filing fees) consistently, which is like a tiny tax cut spread out thinly; this could marginally boost consumer spending, but it\'s not timing-specific to downturns. It certainly isn\'t pro-cyclical (it doesn\'t cut services in bad times or anything). So we give a neutral score: it\'s basically cycle-neutral, focusing on efficiency rather than macroeconomic stabilization.',
      keyPoints: [
        'Minimal effect on economic cycles',
        'Administrative reform, not stimulus',
        'Saves taxpayers money consistently (filing fees)',
        'Not pro-cyclical or counter-cyclical',
        'Focuses on efficiency, not macroeconomic stabilization',
      ],
      sources: [
        'Tax preparation cost data',
        'Refund timing studies',
      ],
    },
    pettit: {
      score: 0.7,
      reasoning: 'By providing a free public option, the policy reduces individuals\' dependence on private companies that might exploit them. Citizens are less subject to the arbitrary pricing and terms of big tax prep firms – they gain a bit more economic independence (keeping more of their refund, not having to share data with a corporation). There is a slight trade-off that one relies on a government system, but the IRS is a public, accountable institution with oversight, not an arbitrary master. Overall, it gives taxpayers a form of freedom-as-non-domination: they have a guaranteed way to fulfill their obligations without having to bend to a company\'s rules.',
      keyPoints: [
        'Reduces dependence on private companies',
        'Citizens less subject to arbitrary pricing/terms',
        'More economic independence: keep more of refund',
        'IRS is public, accountable institution',
        'Guaranteed way to fulfill obligations independently',
      ],
      sources: [
        'Consumer protection in tax prep',
        'Preparer misconduct data',
      ],
    },
    hirschman: {
      score: 0.9,
      reasoning: 'The introduction of Direct File greatly improves "exit" options. Previously, many taxpayers felt "trapped" into using a paid service or complicated forms; now they can exit that situation by choosing the free IRS system. They still retain the choice (exit in the other direction) to use private preparers if they prefer – nothing is mandatory. In terms of voice, as a government service, if issues arise citizens can lobby or provide feedback to the IRS and elected officials for improvements (a form of voice that may be more effective than complaining to a private monopoly). Because individuals have both options (public or private) and a say in how a public system works, agency is high.',
      keyPoints: [
        'Greatly improves exit options from paid services',
        'Can exit to free IRS system',
        'Still retain choice to use private preparers',
        'Voice through feedback to IRS and elected officials',
        'High agency: both options and public input',
      ],
      sources: [
        'Market competition effects',
        'Consumer choice in tax prep',
      ],
    },
    buchanan: {
      score: 0.8,
      reasoning: 'This policy is a near Pareto improvement for the public. Most taxpayers benefit from free filing and easier compliance, and participation is optional. There is no distinct group of citizens being coerced or made worse off by this change – one can still file the old way if desired. The main "losers" are a few private companies (losing some profits) and possibly their shareholders or lobbyists, but they are not the citizenry the social contract most concerns. Given public support is solid (around 73% support in surveys) and no one is forced to use Direct File, the policy enjoys a broad consent.',
      keyPoints: [
        'Near Pareto improvement for public',
        'Most taxpayers benefit, participation optional',
        'No citizens coerced or made worse off',
        'Main losers are private companies, not citizens',
        '~73% public support, broad consent',
      ],
      sources: [
        'Polling on free IRS filing',
        'Tax prep industry economics',
      ],
    },
    polanyi: {
      score: 0.7,
      reasoning: 'Filing taxes is a legal requirement, and previously this essential civic duty was commodified – people often had to pay or rely on the market to accomplish it. By making filing free and easy, the government is de-commodifying a bit of that process, treating it as a public good. This protects especially low-income filers from market exploitation (e.g., paying high fees or getting misled into costly products). It doesn\'t directly deal with food, shelter, or survival, but it does buffer citizens from a predatory market niche. In essence, it says compliance with law shouldn\'t depend on ability to pay, which is a protective stance.',
      keyPoints: [
        'De-commodifies civic duty of tax filing',
        'Treats tax compliance as public good',
        'Protects low-income filers from market exploitation',
        'Buffers citizens from predatory market niche',
        'Compliance shouldn\'t depend on ability to pay',
      ],
      sources: [
        'Public goods theory',
        'Tax administration as public service',
      ],
    },
    rawls: {
      score: 0.8,
      reasoning: 'Simplified tax filing disproportionately helps those with fewer resources and knowledge. Wealthier individuals often have accountants or can afford software, but low and middle-income filers struggle with complex forms or fees. With Direct File, the playing field is leveled: everyone, especially the worst-off (e.g., those who used to qualify for free filing but got upsold, or those confused by forms), can file easily and keep their whole refund. It doesn\'t give cash to the poor, but it removes a burden and potential cost from them. Because it improves access and reduces regressivity in the tax compliance process, it scores high on raising the floor.',
      keyPoints: [
        'Disproportionately helps those with fewer resources',
        'Levels playing field for low/middle-income filers',
        'Removes burden and cost from worst-off',
        'Reduces regressivity in tax compliance',
        'High score for raising the floor',
      ],
      sources: [
        'EITC filing costs',
        'Predatory tax prep research',
      ],
    },
    george: {
      score: 0.6,
      reasoning: 'While not a tax policy per se, this effectively eliminates a form of economic rent – namely the profits tax prep companies earned from a captive market due to a complex tax code and their lobbying. By providing a free alternative, the policy captures that "rent" and returns its value to the public (in the form of savings). There\'s no new tax on labor or sales here; if anything, it reduces the implicit tax (fees) people paid to private firms. It\'s not a classic Georgist land tax, but it does strike at an unearned profit stream (the tax prep industry\'s gains from a monopolized service).',
      keyPoints: [
        'Eliminates form of economic rent',
        'Returns rent value to public as savings',
        'No new tax on labor or sales',
        'Reduces implicit tax (fees) paid to private firms',
        'Strikes at unearned profit stream',
      ],
      sources: [
        'Tax preparation market size',
        'Industry lobbying to prevent free filing',
      ],
    },
    acemoglu: {
      score: 0.9,
      reasoning: 'This reform opens up the system for all and undercuts the advantages held by incumbents. The incumbents here were tax software firms that had an inside track via lobbying and complexity. Removing that barrier means any citizen can comply with tax law easily, which makes institutions more inclusive. It lowers the barrier to participation in the formal economy (filing taxes correctly is part of participating in society). Also, it reduces inequality of access: previously, savvy or wealthier filers could navigate taxes more easily than others; now everyone gets the straightforward option. By leveling the playing field and preventing an extractive arrangement, it\'s highly inclusive.',
      keyPoints: [
        'Opens up system for all citizens',
        'Undercuts advantages held by incumbents',
        'Any citizen can comply with tax law easily',
        'Lowers barrier to formal economy participation',
        'Shifts extractive setup toward inclusive one',
      ],
      sources: [
        'Tax filing accessibility research',
        'Civic participation barriers',
      ],
    },
    walzer: {
      score: 0.9,
      reasoning: 'Tax compliance should arguably not be a commodity for sale, but a neutral obligation of citizenship. This policy reinforces the proper sphere of justice: paying taxes is a civic duty, and helping people fulfill that duty is a public responsibility, not something that should depend on buying a service. By removing money from the equation (for basic filing), it ensures that money isn\'t buying an unfair advantage in the realm of tax filing. Everyone gets equal treatment from the IRS\'s system, whether rich or poor. This is an appropriate separation of spheres: financial resources shouldn\'t dictate one\'s ability to comply with the law.',
      keyPoints: [
        'Tax compliance shouldn\'t be commodity for sale',
        'Fulfilling civic duty is public responsibility',
        'Money removed from equation for basic filing',
        'Equal treatment regardless of wealth',
        'Appropriate separation of financial and civic spheres',
      ],
      sources: [
        'Walzer - Spheres of Justice',
        'Civic duty and market separation',
      ],
    },
  },
  modifiers: [
    {
      id: 'auto-filing',
      name: 'Automatic Filing Option',
      description: 'For simple returns, IRS files automatically unless taxpayer opts out',
      factorChanges: { downs: 0.05, rawls: 0.1 },
    },
    {
      id: 'state-integration',
      name: 'State Tax Integration',
      description: 'Integrate federal and state filing in one system',
      factorChanges: { ostrom: 0.2, downs: 0.05 },
    },
  ],
};
