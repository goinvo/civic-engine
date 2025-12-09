import { PolicyMethodology } from '../index';

export const ultraMillionaireWealthTax: PolicyMethodology = {
  policyId: 'ultra-millionaire-wealth-tax',
  policyName: 'Ultra-Millionaire Wealth Tax',
  description: 'Impose an annual 2% tax on net wealth above $50 million, and 3% on wealth above $1 billion, in order to raise revenue for social programs and reduce extreme inequality.',
  overallRationale: 'The wealth tax has ~68% public support including ~57% of Republicans. It scores exceptionally high on rent targeting (George: 0.8), the floor (Rawls: 1.0), and inclusivity (Acemoglu: 0.9). It directly addresses wealth concentration that creates extractive institutions. Projected revenue of $3-4 trillion over 10 years could fund major social programs. Lower scores on consent (Buchanan: 0.3) reflect that it creates concentrated losers among the ultra-wealthy.',
  factors: {
    hayek: {
      score: 0.4,
      reasoning: 'A wealth tax requires the state to assess the market value of a wide array of assets (stocks, businesses, real estate, art, etc.) annually. This is a knowledge-intensive task for a bureaucracy – valuations can be complex or subjective. It\'s not as "decentralized" as a simple sales tax or carbon tax where market prices automatically do the work; instead, it leans toward central measurement and enforcement. However, modern proposals include mechanisms to handle this: e.g. using existing estate tax valuation methods and new tools for hard-to-value assets. It\'s feasible with a well-resourced IRS, but effective implementation demands detailed information and administration.',
      keyPoints: [
        'Requires annual asset valuation by bureaucracy',
        'Knowledge-intensive task for complex assets',
        'Not as decentralized as consumption taxes',
        'Uses existing estate tax valuation methods',
        'Feasible with well-resourced IRS',
      ],
      sources: [
        'Warren wealth tax proposal details',
        'IRS asset reporting requirements',
      ],
    },
    ostrom: {
      score: 0.8,
      reasoning: 'Wealth concentration and tax policy are national (even global) issues, and the U.S. federal government is the appropriate scale to address an ultra-millionaire tax. A local or state wealth tax alone would be undermined by capital flight to other jurisdictions. Indeed, only the federal level (and ideally international coordination) can tax billionaire wealth effectively. The proposal\'s scope (federal law) matches the problem\'s scope. Plans often involve international tax information exchange to prevent evasion via offshore shelters.',
      keyPoints: [
        'Federal scope matches national wealth concentration',
        'State-level tax undermined by capital flight',
        'Only federal level can tax billionaire wealth effectively',
        'International coordination ideal for offshore shelters',
        'Wealth is mobile – requires national enforcement',
      ],
      sources: [
        'Cross-border wealth taxation literature',
        'Federal tax administration research',
      ],
    },
    downs: {
      score: 0.7,
      reasoning: 'The concept of a millionaire/billionaire wealth tax is quite transparent in principle: "If your net worth is over $50M, pay 2% on the amount above $50M (and 3% on amount above $1B)". For 99.9% of people, it\'s simply not applicable (pay $0), which is easy to understand. The trade-offs are also clear: only the ultra-rich pay significantly, generating revenue for public programs. However, the details (how assets are valued, how the tax is enforced yearly) add complexity that most people won\'t follow. Still, compared to many tax policies, this one-line rule is straightforward.',
      keyPoints: [
        'Simple rate structure: 2% over $50M, 3% over $1B',
        'Clear dollar thresholds',
        'For 99.9% of people, simply not applicable',
        'Trade-offs clear: ultra-rich pay for public programs',
        'Asset valuation adds complexity under the hood',
      ],
      sources: [
        'Warren/Sanders wealth tax proposals',
        'Public understanding polling',
      ],
    },
    olson: {
      score: 0.6,
      reasoning: 'This policy is explicitly designed to be broad-based on the rich with no special exemptions, making it harder for any one interest group to carve out exceptions. By targeting wealth universally above a threshold, it minimizes loopholes. It also builds in anti-evasion and enforcement measures (boosting IRS funding, mandatory audits for the ultra-wealthy). However, the wealthy will undoubtedly lobby and seek loopholes; history shows capital can be agile in avoiding taxation. The ultra-rich may influence regulations or push for repeal in future. It\'s harder to game than an income tax full of deductions, but it directly targets the most powerful economic actors who have means to fight it.',
      keyPoints: [
        'Broad-based with no special exemptions',
        'Minimizes loopholes by targeting all wealth above threshold',
        'Includes anti-evasion and enforcement measures',
        'Wealthy will lobby and seek loopholes',
        'Targets most powerful actors who can fight it',
      ],
      sources: [
        'Tax lobbying data',
        'Wealth tax enforcement proposals',
      ],
    },
    keynes: {
      score: 0.4,
      reasoning: 'A wealth tax isn\'t primarily designed as a counter-cyclical stabilizer; if anything, it could have pro-cyclical aspects. In economic downturns, asset values fall, so wealth tax revenue would drop automatically, possibly reducing government spending capacity when it\'s needed most – a mildly pro-cyclical effect. On the other hand, by funding robust social programs or automatic stabilizers, it could indirectly stabilize demand. The wealth tax\'s revenue is tied to market valuations, which can be volatile. It\'s not an automatic stabilizer like unemployment insurance; rather, its yield could swing with the economic cycle.',
      keyPoints: [
        'Not designed as counter-cyclical stabilizer',
        'Revenue tied to volatile asset valuations',
        'Could have mildly pro-cyclical effect',
        'Revenue drops when asset values fall in recessions',
        'Could fund counter-cyclical programs if revenue used that way',
      ],
      sources: [
        'Wealth volatility data',
        'Tax revenue and business cycles research',
      ],
    },
    pettit: {
      score: 0.9,
      reasoning: 'An ultra-millionaire tax strongly advances freedom as non-domination for society at large. Extreme wealth concentration often translates into outsized power – economic and political – of a tiny elite over the rest. By modestly reducing vast fortunes and channeling some of that wealth to public uses, the policy curbs the ability of oligarchs to dominate public life. It effectively says no individual\'s financial power can be so unchecked that it undermines others\' independence. Furthermore, the revenue can fund programs (housing, healthcare, education) that give ordinary people more independence and "fallback" resources.',
      keyPoints: [
        'Curbs oligarchic domination of public life',
        'Limits unchecked financial power over others',
        'Revenue funds programs giving ordinary people independence',
        'Empowers the many relative to the few',
        'Reduces arbitrary power of extreme wealth',
      ],
      sources: [
        'Wealth and political influence research',
        'Pettit - Non-domination and inequality',
      ],
    },
    hirschman: {
      score: 0.5,
      reasoning: 'Voice: The wealth tax is highly popular among voters of all stripes, indicating the public\'s voice is demanding this policy as a response to inequality. If implemented, it is a result of democratic voice translating into action. It also could amplify the political voice of the non-wealthy in the long run. Exit: On the flip side, wealthy individuals might try to "exit" by moving assets or themselves abroad to escape the tax. Recognizing this, proponents include measures like an expatriation exit tax (40% on wealth over $50M if one renounces citizenship) to deter fleeing. This restricts exit for the taxed minority but preserves the policy\'s effectiveness.',
      keyPoints: [
        'Highly popular, democratic voice demanding action',
        'Could amplify political voice of non-wealthy',
        'Wealthy may try to exit via capital flight',
        'Exit tax (40%) deters renouncing citizenship',
        'Balances majority voice against minority exit',
      ],
      sources: [
        'Data for Progress polling',
        'Wealth emigration studies',
      ],
    },
    buchanan: {
      score: 0.3,
      reasoning: 'By design, this policy imposes costs on a distinct minority (the ultra-wealthy) to benefit the broader public. It\'s not a Pareto improvement – billionaires and hundred-millionaires will certainly be "losers" in the sense of paying more taxes. While public support is high (surveys show ~68% of Americans overall, including ~57% of Republicans, favor a wealth tax on the rich), that still means some oppose. There is no direct compensation to the wealthy for their loss. From a strict consent perspective, the policy is somewhat coercive: a small group is outvoted and made to contribute significantly more. The sharp redistribution from rich to poor makes this a lower scoring factor.',
      keyPoints: [
        '~68% support but creates clear losers',
        'Ultra-wealthy not compensated for loss',
        'Small group outvoted and made to contribute more',
        'Not a Pareto improvement',
        'Sharp redistribution, not consensual from payers\' view',
      ],
      sources: [
        'Data for Progress polling',
        'Polling on wealth tax support',
      ],
    },
    polanyi: {
      score: 0.8,
      reasoning: 'The wealth tax can be seen as society protecting itself from the dislocations of unfettered markets. Polanyi\'s idea of the "double movement" is that society will push back and buffer citizens when market forces create instability or inequity. By taxing concentrated wealth, the policy reins in the commodification of power and provides resources for de-commodifying essential goods. The revenue is explicitly intended to fund social programs like healthcare, housing, education – goods that when provided publicly free people from total dependence on labor markets. It de-commodifies survival needs using funds taken from excess private capital.',
      keyPoints: [
        'Society protecting itself from unfettered markets',
        'Classic "double movement" against commodification',
        'Revenue funds de-commodifying programs',
        'Healthcare, housing, education freed from market dependence',
        'Asserts market outcomes must be tempered for humanity',
      ],
      sources: [
        'Polanyi - Great Transformation',
        'Wealth and commodification research',
      ],
    },
    rawls: {
      score: 1.0,
      reasoning: 'This policy is almost the embodiment of a Rawlsian approach to justice. It asks how to arrange economic duties so that any inequality benefits the least-advantaged. Taxing the richest 0.1% and using the proceeds for public investment is directly aimed at improving the position of those with less. The primary beneficiaries are intended to be people who rely on government programs – typically the poor and middle class who need better schools, healthcare, housing. Because it maximally benefits the worst-off (in relative terms) by redistributing resources downward and closing wealth gaps, it scores at the maximum.',
      keyPoints: [
        'Textbook Rawlsian approach to justice',
        'Only affects richest 0.1% of households',
        'Revenue funds programs for worst-off',
        'Reduces inequality that limits opportunity',
        'Maximin principle embodied in design',
      ],
      sources: [
        'Rawls - Justice as Fairness',
        'Wealth distribution data',
      ],
    },
    george: {
      score: 0.8,
      reasoning: 'The wealth tax targets accumulated fortunes – much of which can be considered economic rents rather than fruits of current labor. By taxing net worth (including unrealized gains, inheritances, monopoly rents, etc.), it focuses on wealth that often grows passively or through market advantages, as opposed to taxing wages or productive entrepreneurial income. This policy does not tax work at all, only the stock of past extracted wealth. Many billionaires\' wealth comes from outsized equity stakes, intellectual property monopolies, or sheer luck of market positioning – akin to rent extraction. Taxing that pool captures value for the public without deterring ordinary work effort.',
      keyPoints: [
        'Targets accumulated fortunes, not labor',
        'Much wealth is economic rent, not labor fruit',
        'Does not tax work, only stock of wealth',
        'Captures value from passive growth and market advantages',
        'Taxes entrenched wealth over productive new labor',
      ],
      sources: [
        'Henry George - Progress and Poverty',
        'Land value in ultra-wealthy portfolios',
      ],
    },
    acemoglu: {
      score: 0.9,
      reasoning: 'Extreme inequality is often associated with extractive institutions – where elites use their wealth to entrench their power and extract more from the economy. A wealth tax strikes at this cycle by redistributing resources and limiting how much influence any one economic elite can accumulate. It makes the economic playing field more level over time. By generating revenue to invest in broad public goods (education, infrastructure, healthcare), it also fosters inclusive economic institutions that enable broad participation in prosperity. It aims to reverse an extractive dynamic and bring more people into the benefits of growth.',
      keyPoints: [
        'Strikes at extractive wealth-power cycle',
        'Levels economic playing field over time',
        'Revenue invests in broad public goods',
        'Fosters inclusive institutions enabling broad participation',
        'Reverses extractive dynamic toward pluralism',
      ],
      sources: [
        'Acemoglu & Robinson - Why Nations Fail',
        'Wealth concentration and institutions research',
      ],
    },
    walzer: {
      score: 0.7,
      reasoning: 'In Walzer\'s terms, the wealth tax helps ensure that money (the sphere of wealth) does not automatically convert into dominance in other spheres like politics, education, or health. By siphoning some money out of the purely private accumulation sphere and using it to bolster the public sphere, it maintains more appropriate boundaries. Instead of billionaires alone deciding which causes get funded through philanthropy or lobbying, a wealth tax allows democratic allocation of resources for needs determined by collective decision. It essentially says: beyond a certain point, wealth must serve the common good, not just remain a private privilege.',
      keyPoints: [
        'Prevents money dominating other spheres',
        'Maintains boundaries between wealth and politics',
        'Democratic allocation replaces billionaire discretion',
        'Wealth must serve common good beyond a point',
        'Limits how far money can go in buying power',
      ],
      sources: [
        'Walzer - Spheres of Justice',
        'Wealth and sphere corruption research',
      ],
    },
  },
  modifiers: [
    {
      id: 'exit-tax',
      name: 'Exit Tax on Emigration',
      description: '40% tax on wealth over $50M if renouncing citizenship to prevent evasion',
      factorChanges: { olson: 0.2, hirschman: -0.1 },
    },
    {
      id: 'higher-billionaire-rate',
      name: 'Higher Billionaire Rate (6%)',
      description: 'Increase rate to 6% on wealth over $1 billion',
      factorChanges: { rawls: 0.1, george: 0.1 },
    },
    {
      id: 'irs-enforcement',
      name: 'Enhanced IRS Enforcement',
      description: 'Guaranteed audits and increased IRS budget for wealth tax enforcement',
      factorChanges: { olson: 0.2, downs: 0.1 },
    },
  ],
};
