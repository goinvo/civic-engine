import { PolicyMethodology } from './index';

export const medicareForAll: PolicyMethodology = {
  policyId: 'medicare-for-all',
  policyName: 'Universal Single-Payer Healthcare (Medicare for All)',
  description: 'A universal, national health insurance program that covers all residents for medically necessary care, with the government as the single payer.',
  overallRationale: 'M4A scores highest on protection (decommodifies healthcare) and sphere justice (distributes by need, not wealth). Strong on non-domination and the floor. Lower on info feasibility (central financing) and consent (creates concentrated losers in insurance industry).',
  factors: {
    hayek: {
      score: 0.3,
      reasoning: 'Single-payer involves centralized financing and significant planning. The government sets prices for services and decides coverage rules, requiring substantial information-processing capacity.',
      keyPoints: [
        'Central price-setting rather than market signals',
        'Healthcare has market failures (info asymmetries, externalities)',
        'Patients still have free choice of doctors (decentralized element)',
        'Delivery often private and responsive to clinical judgment',
      ],
      sources: [
        'Hayek acknowledged role for government in health services',
      ],
    },
    ostrom: {
      score: 0.7,
      reasoning: 'National pooling of risk makes sense for universal coverage. However, healthcare delivery is local. Good single-payer allows regional administration (like Canada\'s provincial system).',
      keyPoints: [
        'Federal financing fits broad scope of universal coverage',
        'Drug pricing benefits from national bargaining power',
        'Can allow regional administration for local needs',
        'One risk pool for the country is logical',
      ],
      sources: [
        'Canada and UK NHS models',
      ],
    },
    downs: {
      score: 0.9,
      reasoning: 'M4A simplifies healthcare to one payer and one set of rules. Everyone knows: "I\'m covered for all medically necessary care, free at point of use."',
      keyPoints: [
        'Eliminates navigating dozens of insurance plans',
        'No networks, deductibles, copay confusion',
        'Administrative costs drastically reduced',
        'Trade-offs (taxes vs premiums) visible in one budget',
      ],
      sources: [
        'EPI - M4A and labor market benefits',
      ],
    },
    olson: {
      score: 0.5,
      reasoning: 'Eliminates private insurance industry capture but concentrates decision power, attracting intense lobbying from pharma, hospitals, and device companies.',
      keyPoints: [
        'Removes insurance industry rent extraction',
        'Universal rules harder for interest groups to fragment',
        'Risk: pharma/hospital lobbying for high reimbursements',
        'Transparency makes capture attempts more visible',
      ],
      sources: [
        'Medicare drug negotiation prohibition example',
      ],
    },
    keynes: {
      score: 0.6,
      reasoning: 'Not primarily a counter-cyclical tool, but decouples insurance from employment. Coverage continues even if you lose your job, maintaining household stability.',
      keyPoints: [
        'Households less likely to cut consumption in bad times',
        'Reduces precautionary saving from medical bill fear',
        'Healthcare spending stable regardless of business cycle',
        'Prevents destabilizing "coverage shock" mechanism',
      ],
      sources: [
        'EPI - Job mobility and economic stability',
      ],
    },
    pettit: {
      score: 0.8,
      reasoning: 'Universal healthcare frees people from domination by employers and insurers. Healthcare becomes a right, not contingent on anyone\'s discretion.',
      keyPoints: [
        'Eliminates "job lock" from insurance dependence',
        'Can start business or leave toxic workplace freely',
        'Removes insurance company denial power',
        'Healthcare decisions become matter of right, not privilege',
      ],
      sources: [
        'ACA expanded coverage reduced job lock',
        'EPI - M4A boosts job mobility',
      ],
    },
    hirschman: {
      score: 0.7,
      reasoning: 'Under single-payer, patients have free choice of any provider (not restricted to networks). Citizens exercise voice through democratic channels on coverage decisions.',
      keyPoints: [
        'Free choice of doctor/hospital (major exit freedom)',
        'Healthcare becomes top electoral issue (voice)',
        'Unified system easier to audit and gather feedback',
        'Trade market exit for political voice (good trade for vital need)',
      ],
      sources: [
        'Canada and original Medicare models',
      ],
    },
    buchanan: {
      score: 0.5,
      reasoning: 'M4A has potential for broad support but creates clear losers: private insurance companies, some high earners, and potentially healthcare providers seeing lower reimbursements.',
      keyPoints: [
        'Winners: all citizens with health security',
        'Losers: insurance industry, some wealthy, pharma profits',
        'Most families except very wealthy come out ahead',
        'Once enacted, becomes consensus (like Canada)',
      ],
      sources: [
        'Studies: M4A raises net income for bottom 90%',
      ],
    },
    polanyi: {
      score: 1.0,
      reasoning: 'M4A is a prime example of decommodifying a vital need. It treats healthcare not as a market commodity but as a right provided based on need.',
      keyPoints: [
        'No one denied care for inability to pay',
        'Profit motive curtailed in favor of social need',
        'Eliminates medical bankruptcy',
        'Uses logic of need, not wealth, to distribute healthcare',
      ],
      sources: [
        'Walzer - Health care distributed by need',
        'Polanyi - Double movement theory',
      ],
    },
    rawls: {
      score: 1.0,
      reasoning: 'Universal healthcare strongly prioritizes improving the situation of the least advantaged. For the poor, M4A is life-changing; for the wealthy, it changes little.',
      keyPoints: [
        'Literally saves lives among the worst-off',
        'Reduces infant mortality, manages chronic diseases',
        'Medicaid expansions reduced mortality and financial hardship',
        'Lower-income households save higher percentage of income',
      ],
      sources: [
        'Urban Institute - Lower-income savings under M4A',
        'EPI - Minimum wage workers gain most',
      ],
    },
    george: {
      score: 0.6,
      reasoning: 'M4A implicitly captures some economic rents in healthcare: monopoly drug prices, hospital markups, and insurer profits. Removes the "penalty on labor" of employer-provided insurance.',
      keyPoints: [
        'Government negotiating drug prices captures pharma rent',
        'Hospital billing above costs curbed by global budgets',
        'Eliminates employer insurance costs (penalty on employing)',
        'Funding proposals include taxes on high incomes, capital gains',
      ],
      sources: [
        'Sanders M4A financing proposals',
      ],
    },
    acemoglu: {
      score: 0.9,
      reasoning: 'Universal healthcare ensures everyone has access to services needed to participate in society. Levels the playing field economically – workers not tied to employers for benefits.',
      keyPoints: [
        'Everyone included regardless of income or status',
        'Lowers barrier to entrepreneurship',
        'Reduces inequality of health outcomes',
        'Helps close racial health disparities',
      ],
      sources: [
        'Studies: new business startups increase without job lock',
      ],
    },
    walzer: {
      score: 1.0,
      reasoning: 'Walzer argued health care should be distributed according to need, not ability to pay. M4A realizes that principle – a janitor and CEO show the same card at the hospital.',
      keyPoints: [
        'Ends money buying better or faster medical treatment',
        'Healthcare is social right, not market privilege',
        'Priority by medical criteria, not wealth',
        '"Deepest shared meaning of health care is distribution by need"',
      ],
      sources: [
        'Walzer - Spheres of Justice',
      ],
    },
  },
  modifiers: [
    {
      id: 'allow-supplementary-private',
      name: 'Allow Supplementary Private Insurance',
      description: 'Permit private insurance for non-essential services',
      factorChanges: { hirschman: 0.1, buchanan: 0.1, walzer: -0.1 },
    },
    {
      id: 'regional-administration',
      name: 'Regional Administration',
      description: 'Delegate implementation to states/regions (like Canada)',
      factorChanges: { ostrom: 0.2, hayek: 0.1 },
    },
  ],
};
