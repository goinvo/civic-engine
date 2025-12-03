import { PolicyMethodology } from './index';

export const universalBasicIncome: PolicyMethodology = {
  policyId: 'universal-basic-income',
  policyName: 'Universal Basic Income (UBI)',
  description: 'A universal, unconditional cash payment to all individuals, intended to provide a minimum floor of income.',
  overallRationale: 'UBI scores exceptionally high on simplicity, freedom, stability, and protection factors due to its universal, unconditional nature. The main weakness is scale match (one-size-fits-all nationally) and rent targeting (depends on funding mechanism).',
  factors: {
    hayek: {
      score: 0.9,
      reasoning: 'UBI is highly decentralized in information use. The government does not need detailed knowledge of individuals\' needs – it provides cash, and individuals decide how to spend it based on their local knowledge.',
      keyPoints: [
        'Cash transfers leverage individual choice over bureaucratic planning',
        'Hayek argued cash is superior to in-kind welfare',
        'Minimizes administrative decision-making',
        '"Just give everyone cash" sidesteps complex targeting',
      ],
      sources: [
        'Niskanen Center - Hayekian case for cash transfers',
        'World Bank - Simplicity of UBI grants',
      ],
    },
    ostrom: {
      score: 0.3,
      reasoning: 'UBI is typically implemented at the national level with a uniform benefit. A flat U.S. UBI may overshoot needs in cheap rural areas and undershoot in expensive cities. There is no polycentric tailoring by region.',
      keyPoints: [
        'One-size-fits-all national scope',
        'No local cost-of-living adjustment',
        'Doesn\'t empower local governance or variation',
        'Poverty alleviation is arguably a broad-scale federal issue',
      ],
      sources: [],
    },
    downs: {
      score: 1.0,
      reasoning: 'UBI is extremely simple and transparent. It can be explained as: "Every citizen gets $X per month, no strings attached." This is the opposite of opaque means-tested programs.',
      keyPoints: [
        '"If you are a citizen, you receive the check"',
        'No complex eligibility rules or conditions',
        'Costs and benefits highly visible in budgets',
        'Would streamline safety net by consolidating programs',
      ],
      sources: [
        'World Economic Forum - Simplicity of UBI',
      ],
    },
    olson: {
      score: 0.7,
      reasoning: 'UBI\'s universal nature makes it relatively robust against interest-group capture. Because everyone gets the benefit, it\'s hard for a narrow lobby to twist it for exclusive gain.',
      keyPoints: [
        'No special exemptions or loopholes to lobby for',
        'Universality thwarts clientelism',
        'Broad constituency defends the program',
        'Some risk: funding decisions could be captured',
      ],
      sources: [],
    },
    keynes: {
      score: 1.0,
      reasoning: 'UBI acts as an automatic stabilizer in the economy. Payments continue regardless of employment status, propping up consumer demand during recessions.',
      keyPoints: [
        'Counter-cyclical: maintains demand when private earnings fall',
        'Low-income households spend most of their UBI',
        'Avoids pro-cyclical austerity unlike unemployment insurance',
        'Floor of income "below which nobody need fall"',
      ],
      sources: [
        'Roosevelt Institute - UBI as permanent fiscal stimulus',
      ],
    },
    pettit: {
      score: 1.0,
      reasoning: 'UBI greatly enhances individual freedom from arbitrary power. By providing income independent of employment, it reduces workers\' dependence on bosses or abusive partners.',
      keyPoints: [
        'Provides "F-you money" – ability to refuse exploitation',
        'Workers can quit jobs without immediate ruin',
        'Reduces vulnerability to coercion from poverty',
        'Hayek endorsed minimum income to protect from domination',
      ],
      sources: [
        'Pettit - Republican freedom theory',
        'Niskanen Center - Hayek and non-coercion',
      ],
    },
    hirschman: {
      score: 0.8,
      reasoning: 'UBI expands people\'s exit options. With an income floor, individuals can exit bad jobs, leave localities, or avoid exploitative contracts because they won\'t starve if they do so.',
      keyPoints: [
        'Credible exit option improves voice',
        'Reduces "job lock" where people stay solely for survival',
        'Enables entrepreneurship as fallback exists',
        'Doesn\'t directly create new voice mechanisms',
      ],
      sources: [],
    },
    buchanan: {
      score: 0.6,
      reasoning: 'UBI approaches a Pareto improvement – almost everyone gets something. However, high-income individuals are net contributors, and some object philosophically or fiscally.',
      keyPoints: [
        'Universal benefit to all citizens',
        'Everyone pays in via taxes, everyone gets cash out',
        'Gains support from libertarians and social democrats',
        'Not near-unanimous: some clear losers (wealthy taxpayers)',
      ],
      sources: [],
    },
    polanyi: {
      score: 0.9,
      reasoning: 'UBI de-commodifies a basic portion of life by guaranteeing income regardless of labor market status. Nobody should fall below a basic floor, even if they cannot sell their labor.',
      keyPoints: [
        'Provides buffer against market failures',
        'Empowers caregivers, students, creatives',
        'Treats people not merely as market inputs',
        'Trials show improved nutrition, health, schooling',
      ],
      sources: [
        'Polanyi - Fictitious commodity theory',
        'Evidence from Namibia and India pilots',
      ],
    },
    rawls: {
      score: 1.0,
      reasoning: 'UBI squarely aims to lift up the worst-off. Because it gives an equal amount to everyone, in absolute terms the poor gain far more relative to their current income than the rich.',
      keyPoints: [
        '$12k UBI is life-changing for $0 income, trivial for millionaires',
        'Primary benefit flows to those at the bottom',
        'Roosevelt Institute: $1k/month could cut poverty by half',
        'Provides floor below which nobody need fall',
      ],
      sources: [
        'Roosevelt Institute - Poverty reduction simulation',
        'Hayek - Minimum income floor endorsement',
      ],
    },
    george: {
      score: 0.5,
      reasoning: 'By itself, UBI does not target unearned income; its funding determines the George factor. Most proposals use income tax or VAT, not land or rent taxes. Neutral score reflects that the policy itself neither targets nor ignores rent – it depends entirely on funding mechanism.',
      keyPoints: [
        'Alaska\'s UBI (oil royalties) would score high',
        'Most proposals use income/VAT – not rent-targeted',
        'Could score much higher if funded by LVT',
        'Many Georgists advocate "citizen\'s dividend" from land rents',
      ],
      sources: [
        'Henry George - Progress and Poverty',
      ],
    },
    acemoglu: {
      score: 0.8,
      reasoning: 'UBI is inclusive in both access and effect. It treats every citizen equally with no gatekeepers, helping level the playing field and empower marginalized groups.',
      keyPoints: [
        'Zero entry barriers to receiving support',
        'Empowers minorities, rural populations, the poor',
        'Enables training, small business, education access',
        'Reduces power of "extractive" elites',
      ],
      sources: [
        'Acemoglu & Robinson - Why Nations Fail',
      ],
    },
    walzer: {
      score: 0.7,
      reasoning: 'UBI upholds a kind of equality in the sphere of basic needs: everyone gets the same allowance to secure their needs. It stops short of fully separating essential goods from money.',
      keyPoints: [
        'Membership alone entitles share of economic resources',
        'Doesn\'t fully separate essentials from money',
        'Reduces wealth dominance in accessing necessities',
        'Still relies on markets to supply goods (cash, not provision)',
      ],
      sources: [
        'Walzer - Spheres of Justice',
      ],
    },
  },
  modifiers: [
    {
      id: 'fund-via-lvt',
      name: 'Fund via Land Value Tax',
      description: 'Finance UBI through a land value tax instead of income/VAT',
      factorChanges: { george: 0.6 },
    },
    {
      id: 'regional-cost-adjustment',
      name: 'Regional Cost Adjustment',
      description: 'Adjust UBI amount based on local cost of living',
      factorChanges: { ostrom: 0.4 },
    },
  ],
};
