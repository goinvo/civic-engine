import { PolicyMethodology } from './index';

export const expandedChildTaxCredit: PolicyMethodology = {
  policyId: 'expanded-child-tax-credit',
  policyName: 'Expanded Child Tax Credit',
  description: 'Expand the Child Tax Credit to $3,000-$3,600 per child, make it fully refundable, and deliver monthly payments to families regardless of income.',
  overallRationale: 'This policy has 85% bipartisan support. It scores exceptionally high on the floor (Rawls) and protection (Polanyi) factors given its direct poverty-reducing effect. The 2021 expansion cut child poverty by 46% in a single year. It combines market-respecting cash delivery (Hayek score 0.6) with strong social protection, producing a broad coalition effect.',
  factors: {
    hayek: {
      score: 0.6,
      reasoning: 'This policy delivers cash, not in-kind services, which is a nod to market principles – parents (dispersed decision-makers) allocate the funds based on their knowledge of their children\'s needs. However, it is a large government program that bypasses market earning, effectively redistributing income. It doesn\'t price or plan markets for families, but it does represent central allocation of purchasing power. From a Hayekian view, cash is better than a top-down food or childcare program (because parents choose how to spend), but it\'s still a federal solution rather than an emergent local or market one. We give it a moderate score: it respects dispersed consumer choice in spending but relies on centralized funding and delivery.',
      keyPoints: [
        'Cash delivery respects dispersed decision-making',
        'Parents allocate funds based on local knowledge',
        'Better than top-down in-kind programs',
        'Still a federal centralized program',
        'Moderate score for cash-based but government-funded approach',
      ],
      sources: [
        'Economic impact studies of 2021 CTC expansion',
      ],
    },
    ostrom: {
      score: 0.8,
      reasoning: 'Child poverty is a national issue that arguably warrants a unified federal response. The policy is administered through the IRS tax system, a federal mechanism. One could argue local or state programs might tailor to regional cost-of-living, but practically, the federal CTC ensures a consistent floor everywhere. It is reasonable that a national government handles a national issue (like providing a baseline income for children), so matching scale to scope is fairly appropriate. The score would be even higher if it explicitly partnered with state child-care programs or allowed local top-offs, but a federal cash benefit for a widespread problem is not mismatched. We score high on matching governance scale.',
      keyPoints: [
        'Child poverty is national issue warranting federal response',
        'IRS administration provides consistent nationwide floor',
        'Federal scope appropriate for baseline child income',
        'Could be enhanced with state program partnerships',
        'Governance scale matches problem scale',
      ],
      sources: [
        'IRS CTC delivery mechanism',
        'State child benefit program analysis',
      ],
    },
    downs: {
      score: 0.7,
      reasoning: 'The rule is conceptually simple: \"if you have a child, you get X dollars per month.\" That\'s highly legible. Complexity arises in the details: phase-outs at higher incomes, determining eligibility through tax filings, and past non-refundability causing confusion. The 2021 expansion (fully refundable, monthly payments) actually made it more transparent (people saw direct deposits). Assuming the expanded version is straightforward (e.g., every family with kids gets $3,000–$3,600 per child), it earns a fairly high legibility score. We mark it 0.7 as there is slight complexity in implementation (taxes, phase-outs), but the concept is easy to grasp.',
      keyPoints: [
        'Simple concept: dollars per child per month',
        'Monthly payments made benefit tangible in 2021',
        'Full refundability removes complex phase-in rules',
        'Some complexity in phase-outs and tax filing requirements',
        'Concept easy to grasp despite implementation details',
      ],
      sources: [
        '2021 CTC expansion implementation studies',
        'IRS delivery mechanism data',
      ],
    },
    olson: {
      score: 0.7,
      reasoning: 'The CTC has broad support and beneficiaries (all families with children), which gives it broad political resilience. Since it\'s nearly universal among families, no small special interest can easily capture or skew it. That said, the devil is in details: past lobbying has led to phase-outs, non-refundability rules, etc. If well-designed (like a universal benefit), it is robust. Opponents (like those worried about budget costs) may lobby to pare it down. Given its wide, diffuse beneficiary base and 85% bipartisan support, special interest capture risk is low but not zero – budgetary pressures and political tradeoffs could affect it. We score moderately high, acknowledging the policy\'s broad appeal tends to protect it.',
      keyPoints: [
        'Broad beneficiary base: all families with children',
        '85% bipartisan support provides political protection',
        'Nearly universal design resists special interest capture',
        'Past lobbying created complexity (phase-outs, non-refundability)',
        'Diffuse constituency makes capture difficult',
      ],
      sources: [
        'KFF polling on CTC support',
        'Political economy of universal programs',
      ],
    },
    keynes: {
      score: 0.9,
      reasoning: 'As a direct transfer to families, the Expanded CTC is an excellent automatic stabilizer. If expanded permanently, in a recession, it would continue to put money in families\' hands (many of whom will spend it quickly, supporting demand). Low-income families have high marginal propensity to consume, so dollars out go back into the economy. Unlike unemployment insurance (which activates only on job loss), the CTC would be ongoing support regardless of employment status – buffering any shock. The 2021 CTC had measurable impact on stabilizing child poverty during the pandemic recovery. We rate this policy very high on counter-cyclical effect, as it\\'s essentially automatic cash support that stabilizes household consumption.',
      keyPoints: [
        'Excellent automatic stabilizer for families',
        'Continues in recessions without legislative action needed',
        'High marginal propensity to consume for recipients',
        'Stabilizes household consumption during downturns',
        '2021 expansion demonstrated impact on poverty reduction',
      ],
      sources: [
        'CTC spending impact studies',
        'Automatic stabilizer literature',
        'Columbia University poverty analysis 2021',
      ],
    },
    pettit: {
      score: 0.8,
      reasoning: 'The CTC provides families with income that is not contingent on the will of an employer or any particular actor – it\'s a legal entitlement. This reduces parents\' dependence on potentially exploitative work situations or abusive relationships just to support their children. In a non-domination framework, a guaranteed income floor means one\'s ability to care for children isn\'t subject to arbitrary power. However, the CTC isn\'t fully non-dominating since it still comes from the government (Congress could change it) and doesn\'t completely free families from market dependency – it\'s a supplement. Still, a meaningful cash benefit is empowering and reduces vulnerability.',
      keyPoints: [
        'Income not contingent on employer\'s will',
        'Legal entitlement reduces dependence on exploitative situations',
        'Parents less vulnerable to workplace or partner domination',
        'Guaranteed income floor for child-rearing',
        'Meaningful supplement though not full independence',
      ],
      sources: [
        'Economic security and autonomy research',
        'Family income stability studies',
      ],
    },
    hirschman: {
      score: 0.7,
      reasoning: 'The CTC doesn\'t change the structure of any institution (like school or childcare) to give families more voice or exit options directly. However, having money in hand does give families more exit power in markets – e.g., a parent could use the funds to afford a different childcare arrangement or housing. It\'s an indirect effect: resources enable exit from situations of dependency. For voice, there\'s no mechanism for beneficiaries to influence CTC policy except through normal democratic channels. We consider it moderately positive – cash is a tool that can enhance exit options in life generally.',
      keyPoints: [
        'Cash provides resources for exit options',
        'Families can afford different arrangements',
        'Indirect effect: resources enable exit from dependency',
        'No direct voice mechanism in policy structure',
        'Money as tool enhancing life choices generally',
      ],
      sources: [
        'Family resource studies',
        'Economic mobility research',
      ],
    },
    buchanan: {
      score: 0.5,
      reasoning: 'This policy is a significant redistribution – funded by taxpayers to be given to families with children. Those without children are clear net losers (they pay but don\'t receive). High-income taxpayers fund a large part, benefiting lower-income families more in relative terms. While 85% of Americans may support it, that still means some oppose, and notably childless individuals or higher-earners may feel aggrieved. There\'s no compensation to those taxed to fund it beyond the social benefit of less child poverty. Given the split, this is far from unanimous; the winners are families with kids, the losers are childless taxpayers and those whose taxes increase. Still, one could argue supporting children has broad social contract buy-in. We score neutral-to-moderate: substantial redistribution with good but not universal consent.',
      keyPoints: [
        'Significant redistribution from taxpayers to families with children',
        'Childless individuals are net losers',
        '85% support but some oppose',
        'No direct compensation to those taxed',
        'Social contract argument for investing in children',
      ],
      sources: [
        'Tax policy distributional analysis',
        'Polling on CTC expansion',
      ],
    },
    polanyi: {
      score: 0.9,
      reasoning: 'This policy substantially decommodifies a critical need – raising children – by providing income independent of labor market performance. Parents\' ability to care for their children is buffered from market swings. It recognizes that families should not be wholly exposed to the \"cash nexus\" for something as essential as child-rearing. In Polanyian terms, this is protective legislation ensuring a basic standard of living for children (and their caregivers) outside of market luck. It scores very high on shielding families from market vulnerability.',
      keyPoints: [
        'Substantially decommodifies child-rearing',
        'Income independent of labor market performance',
        'Buffers families from market swings',
        'Recognizes child-rearing as essential need',
        'Protective legislation ensuring basic living standard',
      ],
      sources: [
        'Care economy literature',
        'Polanyi on labor as fictitious commodity',
      ],
    },
    rawls: {
      score: 0.9,
      reasoning: 'The Expanded CTC directly improves the worst-off: children in poverty and their families. The 2021 expansion cut child poverty by 46%. Full refundability ensures the poorest families (who previously got nothing if they owed no tax) now receive the full benefit. This is nearly a maximin intervention – every dollar goes to raising the floor for families with children, especially beneficial to those with the least. We score this extremely high on the difference principle.',
      keyPoints: [
        'Directly improves worst-off: children in poverty',
        '2021 expansion cut child poverty by 46%',
        'Full refundability ensures poorest receive full benefit',
        'Maximin intervention raising the floor',
        'Largest relative benefit to lowest-income families',
      ],
      sources: [
        'Columbia University child poverty analysis',
        'Census Bureau poverty data 2021',
        '2021 CTC poverty impact studies',
      ],
    },
    george: {
      score: 0.5,
      reasoning: 'The CTC is a spending program, not a tax on rent. It does not specifically target unearned income or land values. One could fund it via taxing rent or wealth (which would align it with Georgist finance), but the policy itself is agnostic to funding source. Typically it\'s funded through general revenue, which may include income taxes (taxing earned income – counter to Georgist preference). Because there\'s no explicit rent capture or land value mechanism, we score it neutral on this factor. It neither encourages nor discourages rent-seeking directly; it just redistributes through a general program.',
      keyPoints: [
        'Spending program, not tax on rent',
        'Does not target unearned income or land values',
        'Agnostic to funding source',
        'Funded through general revenue including income tax',
        'Neither encourages nor discourages rent-seeking',
      ],
      sources: [
        'Tax policy funding analysis',
      ],
    },
    acemoglu: {
      score: 0.9,
      reasoning: 'By making the credit fully refundable and broadly available, the policy includes the poorest families who were previously excluded. The old non-refundable CTC was somewhat extractive in effect: poorer families got less benefit. The expanded version is inclusive – virtually every family with children gets support, removing barriers that excluded the least advantaged. The investment in children\'s human capital can also be seen as fostering long-term growth and opportunity. It levels an aspect of the playing field (kids from poor families get resources that rich families already have). Very high marks for inclusive institution-building.',
      keyPoints: [
        'Full refundability includes poorest families',
        'Removes barriers that excluded least advantaged',
        'Old non-refundable version was somewhat extractive',
        'Investment in children\'s human capital',
        'Levels playing field for children from poor families',
      ],
      sources: [
        'Child investment and mobility research',
        'Intergenerational poverty studies',
        '2021 CTC distributional analysis',
      ],
    },
    walzer: {
      score: 0.9,
      reasoning: 'Children\'s well-being should be distributed according to need and equal concern for all children, not according to parents\' market success. The Expanded CTC uses a criterion of \"having children\" (and need) to distribute goods (money), which is appropriate for the sphere of family support. It prevents the market sphere (where some earn more) from fully determining outcomes in the sphere of childhood welfare. The policy aligns with Walzer\'s idea that each sphere should have its own criteria – for children, society\'s obligation to the young trumps parental wealth differences. Very high alignment.',
      keyPoints: [
        'Children\'s well-being distributed by need, not market success',
        'Criterion of \"having children\" appropriate for family support sphere',
        'Prevents market sphere from determining childhood welfare',
        'Society\'s obligation to young trumps parental wealth differences',
        'Each sphere governed by appropriate criteria',
      ],
      sources: [
        'Walzer - Spheres of Justice on childhood',
        'Children\'s rights literature',
      ],
    },
  },
  modifiers: [
    {
      id: 'permanent-expansion',
      name: 'Make Permanent',
      description: 'Permanently authorize expanded CTC at 2021 levels',
      factorChanges: { keynes: 0.05, rawls: 0.05 },
    },
    {
      id: 'regional-adjustment',
      name: 'Regional Cost Adjustment',
      description: 'Adjust benefit by regional cost of living',
      factorChanges: { ostrom: 0.1 },
    },
  ],
};
