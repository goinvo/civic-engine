import { PolicyMethodology } from './index';

export const affordableHousingSupply: PolicyMethodology = {
  policyId: 'affordable-housing-supply',
  policyName: 'Affordable Housing Supply (Neighborhood Homes Investment Act)',
  description: 'Use tax credits to spur building or renovating homes in distressed areas, closing the "appraisal gap" and increasing affordable housing supply. Focus on owner-occupied homes (no corporate investors). Federal policy in economic/housing sector with ~71% public support.',
  overallRationale: 'Affordable Housing Supply (NHIA) excels in distributional justice (Rawls: 0.9) and inclusivity (Acemoglu: 0.8), though as a tax credit program it has lower legibility (Downs: 0.4) and does not de-commodify housing (Polanyi: 0.2). The policy targets areas where market investment has failed, using tax credits to incentivize private builders while requiring owner-occupancy to prevent speculation.',
  factors: {
    hayek: {
      score: 0.6,
      reasoning: 'The policy blends market signals with targeted intervention, landing somewhat on the decentralized side. It doesn\'t attempt detailed central planning of housing – developers and local actors decide which projects to undertake, guided by the incentive of the tax credit closing the financing gap. This uses local knowledge (builders identify viable rehabs in distressed areas) and price signals (the credit makes formerly unprofitable projects profitable) rather than bureaucrats dictating exactly where to build. However, it is a federal program setting the terms, so it\'s not purely organic market action. It leverages decentralized decision-making (individual developers responding to incentives) even as it\'s enabled by a broad federal policy framework.',
      keyPoints: [
        'Blends market signals with targeted intervention',
        'Developers and local actors decide which projects to undertake',
        'Uses local knowledge and price signals',
        'Federal program sets terms, not purely organic market action',
        'Leverages decentralized decision-making via incentives',
      ],
      sources: [
        'Neighborhood Homes Investment Act summary',
        'Tax credit housing policy analysis',
      ],
    },
    ostrom: {
      score: 0.6,
      reasoning: 'Housing affordability has local manifestations (neighborhood blight, community decline) but is widespread enough to justify federal involvement. The policy\'s scale mostly matches the problem\'s scope: it is a national tax credit, but it targets specific distressed locales through eligibility rules. Local governments alone often struggle to address appraisal gaps, so federal resources help meet a nationwide pattern of market failure. The federal level provides funding and a framework, while actual building is done locally – a polycentric approach. One could argue for even more local tailoring (state or city-run programs), but NHIA-style credits create a partnership: federal money, local execution.',
      keyPoints: [
        'Housing affordability has local manifestations but is widespread',
        'National tax credit targets specific distressed locales',
        'Federal resources help meet nationwide market failure',
        'Federal funding and framework, local execution',
        'Polycentric partnership: federal money, local building',
      ],
      sources: [
        'NHIA state allocation framework',
        'Federal-state housing partnerships',
      ],
    },
    downs: {
      score: 0.4,
      reasoning: 'As a tax credit program, this policy is less immediately transparent to the average person. It\'s not as simple as a rule anyone can see; it works through the tax code and development finance. Terms like "appraisal gap" and how credits are allocated involve technical details. While the basic idea ("incentivize building in needy areas via credits") can be explained, the actual implementation may seem opaque or bureaucratic. Developers must apply for credits, meet criteria, and investors might monetize credits – these complexities make the trade-offs and costs less visible to voters. It leans toward the opaque side, though it\'s still a straightforward credit if understood properly.',
      keyPoints: [
        'Tax credit program less immediately transparent',
        'Works through tax code and development finance',
        'Technical terms like "appraisal gap" involved',
        'Implementation may seem opaque or bureaucratic',
        'Trade-offs and costs less visible to voters',
      ],
      sources: [
        'NHIA program structure',
        'Tax credit accessibility research',
      ],
    },
    olson: {
      score: 0.5,
      reasoning: 'There is some risk of capture or gaming in a program like this. Real estate developers and investors might lobby to broaden the criteria or concentrate benefits on themselves. While the policy tries to prevent abuse (e.g., excluding corporate investors, requiring owner-occupancy), developers could still inflate costs or "flip" benefits by coordinating with buyers. The program\'s success depends on good implementation (like preventing fraud and ensuring credits actually lead to affordable sales). Without built-in sunset clauses or broad universality (it\'s targeted to certain areas), continuous political support will be needed.',
      keyPoints: [
        'Some risk of capture or gaming',
        'Developers might lobby to broaden criteria',
        'Owner-occupancy requirement prevents some abuse',
        'Success depends on good implementation',
        'Continuous political support needed',
      ],
      sources: [
        'Tax credit program integrity',
        'Housing development lobbying',
      ],
    },
    keynes: {
      score: 0.5,
      reasoning: 'The housing tax credit is not designed as a macroeconomic stabilizer, but it could have mild counter-cyclical benefits. Housing construction often lags in downturns, and a tax credit could spur building in underserved areas even when the economy is slow (thus supporting jobs and activity in construction). However, this effect is indirect and not automatic (the credit is continuous, not specifically ramped up in recessions). It\'s roughly neutral for economic stability on the surface, so we give it a middle score, acknowledging there might be a slight stabilizing influence by boosting housing supply in weaker markets.',
      keyPoints: [
        'Not designed as macroeconomic stabilizer',
        'Mild counter-cyclical benefits possible',
        'Could spur building during downturns',
        'Effect is indirect and not automatic',
        'Slight stabilizing influence in weaker markets',
      ],
      sources: [
        'Housing construction and economic cycles',
        'Tax credit timing effects',
      ],
    },
    pettit: {
      score: 0.7,
      reasoning: 'By expanding access to affordable homeownership, the policy can increase individual independence. Owning a home (versus renting) often grants families more security and autonomy – a form of economic power that lets them avoid domination by landlords or unstable housing situations. Revitalizing distressed areas also empowers communities that were previously neglected, giving residents more control over their living conditions. While it\'s not as direct as cash assistance, facilitating home ownership for moderate-income folks bolsters their ability to say "no" to bad jobs or landlords.',
      keyPoints: [
        'Expands access to affordable homeownership',
        'Homeownership grants security and autonomy',
        'Empowers previously neglected communities',
        'Gives residents control over living conditions',
        'Bolsters ability to exit bad situations',
      ],
      sources: [
        'Homeownership and economic independence',
        'Community empowerment through housing',
      ],
    },
    hirschman: {
      score: 0.8,
      reasoning: 'This policy mainly enhances exit options in housing. Increasing the supply of affordable homes means renters have the option to exit the rental market and become homeowners, or residents of struggling neighborhoods have the option to stay (exit from leaving the community) because their area sees investment. With more housing choice, people aren\'t as trapped paying high rent or living in substandard conditions – they can move to a renovated home or benefit from neighborhood improvements. In terms of voice, it indirectly responds to community voices calling for reinvestment.',
      keyPoints: [
        'Enhances exit options in housing',
        'Renters can exit to homeownership',
        'Residents can stay as area improves',
        'More housing choice reduces being trapped',
        'Responds to community voices for reinvestment',
      ],
      sources: [
        'Housing mobility research',
        'Community reinvestment outcomes',
      ],
    },
    buchanan: {
      score: 0.8,
      reasoning: 'The benefits of this policy are broadly distributed, and no large group is coerced into sacrifice, indicating a high degree of consent in principle. Tax credits (foregone government revenue) are the primary cost, which is spread across taxpayers generally and tends not to be controversial, especially given the policy\'s popularity. Nearly three-quarters of Americans, including majorities of both parties, support such housing supply measures, suggesting that most people consent to this trade-off. The policy also seeks to avoid creating "losers" in communities – by revitalizing neighborhoods without gentrifying displacement. Because it compensates for a market failure rather than taking something from one group to give to another, it approaches a Pareto improvement.',
      keyPoints: [
        'Benefits broadly distributed, no coerced sacrifice',
        'Tax credits spread across taxpayers generally',
        'Nearly three-quarters of Americans support it',
        'Seeks to avoid creating losers in communities',
        'Approaches Pareto improvement',
      ],
      sources: [
        'Polling on housing investment',
        'Bipartisan housing policy support',
      ],
    },
    polanyi: {
      score: 0.2,
      reasoning: 'This is largely a market-driven solution and does not de-commodify housing; rather, it works through the market to increase supply. It doesn\'t make housing free or a right – it uses tax incentives to entice profit-seeking developers to build for lower-income buyers. In Polanyian terms, it\'s not pulling housing fully out of the market sphere (like public housing would), but it is a government mitigation of a market gap. One could say it partially buffers a basic need (housing) by offsetting unprofitable economics in poor areas, but housing remains a commodity bought and sold. Since the core mechanism is a tax credit for private development and purchase, the policy keeps housing within the market logic (albeit with a nudge).',
      keyPoints: [
        'Market-driven solution, does not de-commodify housing',
        'Uses tax incentives for profit-seeking developers',
        'Not pulling housing out of market sphere',
        'Housing remains a commodity bought and sold',
        'Keeps housing within market logic with a nudge',
      ],
      sources: [
        'Housing as basic need',
        'Market failure in distressed communities',
      ],
    },
    rawls: {
      score: 0.9,
      reasoning: 'The primary beneficiaries are residents of distressed, low-income communities – those often among the worst-off in terms of housing quality and wealth. By targeting neighborhoods that are struggling (where home values are too low to attract investment), the policy directs resources to where they are most needed. It helps aspiring low-income homebuyers (through more available, modest-cost homes) and improves blighted areas for existing low-income residents. This is a maximin-oriented policy, aiming to lift up the poorest neighborhoods and provide a floor for housing quality.',
      keyPoints: [
        'Primary beneficiaries are worst-off communities',
        'Targets struggling neighborhoods',
        'Directs resources where most needed',
        'Helps aspiring low-income homebuyers',
        'Maximin-oriented: lifts poorest neighborhoods',
      ],
      sources: [
        'NHIA targeting criteria',
        'Housing inequality research',
      ],
    },
    george: {
      score: 0.3,
      reasoning: 'The financing mechanism here (tax credits) does not particularly target unearned rents; if anything, it\'s an expenditure of public funds (through tax breaks) rather than a capture of land or monopoly rents. It\'s not funded by a land value tax or by taxing speculative gains – rather, it forgoes some general tax revenue to incentivize developers. In fact, by boosting property values in distressed areas, it could create some land value gains (though in blighted zones, this is about restoring value, not extracting it). It doesn\'t shift taxation off labor/productive activity onto rent, and it doesn\'t exemplify Georgist principles. Overall it\'s a subsidy to encourage creation, not a scheme to tax socially-generated land value.',
      keyPoints: [
        'Tax credits don\'t target unearned rents',
        'Expenditure of public funds, not rent capture',
        'Not funded by land value tax',
        'May create land value gains in distressed areas',
        'Subsidy to encourage creation, not rent taxation',
      ],
      sources: [],
    },
    acemoglu: {
      score: 0.8,
      reasoning: 'This policy tends to open up opportunities and level the economic playing field. It lowers barriers to entry for homeownership in communities that have been excluded from investment. By providing incentives to build in neglected areas, it fights an extractive dynamic where only wealthy areas see development. It also includes anti-speculation measures (owner-occupancy requirement) to ensure the benefits go to ordinary families rather than big investors, thus preventing elites from capturing the gains. All of this contributes to a more inclusive economy.',
      keyPoints: [
        'Opens opportunities in excluded communities',
        'Lowers barriers to homeownership',
        'Fights extractive dynamic favoring wealthy areas',
        'Anti-speculation measures protect families',
        'Contributes to more inclusive economy',
      ],
      sources: [
        'Acemoglu - Inclusive institutions',
        'Housing access and economic inclusion',
      ],
    },
    walzer: {
      score: 0.7,
      reasoning: 'The policy uses public resources (tax credits) to ensure housing—a social good—is allocated more by need/community merit than by raw market forces. In just distribution terms, it recognizes that homes in disinvested areas should be improved because people deserve decent housing regardless of the current market price. By insisting the renovated homes be sold to owner-occupants (families who will live there), it aligns with the idea that housing\'s purpose is to shelter and stabilize families (need-based logic) rather than purely to be an investment asset for profit.',
      keyPoints: [
        'Public resources ensure housing allocated by need',
        'Homes improved because people deserve decent housing',
        'Owner-occupancy aligns with shelter purpose',
        'Need-based logic over investment logic',
        'Appropriate matching of means to social end',
      ],
      sources: [
        'Walzer - Spheres of Justice',
        'Housing distribution principles',
      ],
    },
  },
  modifiers: [
    {
      id: 'expanded-eligibility',
      name: 'Expanded Area Eligibility',
      description: 'Include more neighborhoods based on broader distress criteria',
      factorChanges: { rawls: 0.05, olson: -0.1 },
    },
    {
      id: 'community-land-trust',
      name: 'Community Land Trust Integration',
      description: 'Partner with community land trusts to ensure permanent affordability',
      factorChanges: { polanyi: 0.1, walzer: 0.1 },
    },
  ],
};
