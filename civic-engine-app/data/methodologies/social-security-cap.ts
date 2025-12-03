import { PolicyMethodology } from './index';

export const socialSecurityCap: PolicyMethodology = {
  policyId: 'social-security-cap',
  policyName: 'Shore Up Social Security ("Donut Hole")',
  description: 'Applies the payroll tax to earnings above $400,000 (while keeping the current cap at ~$169,000), capturing new revenue from high earners to eliminate about 60% of Social Security\'s long-term shortfall. This protects middle-income taxpayers and future beneficiaries by shoring up the Trust Fund without cutting benefits.',
  overallRationale: 'This policy has 87% national support including large majorities of both Republicans (83-89%) and Democrats (83-92%). It would eliminate about 60% of Social Security\'s long-term funding shortfall while protecting 98% of earners from any tax increase. The "donut hole" design specifically protects upper-middle incomes while targeting only the top 1-2% of earners.',
  factors: {
    hayek: {
      score: 0.4,
      reasoning: 'This is a top-down fiscal fix. It sets a uniform federal tax rule on high incomes, rather than leveraging local knowledge or market price signals. While straightforward (not requiring complex economic planning), it doesn\'t rely on decentralized information in the way a market-based solution would, landing it below the midpoint on Hayek\'s scale.',
      keyPoints: [
        'Top-down fiscal fix setting uniform federal tax rule',
        'Does not leverage local knowledge or market price signals',
        'Straightforward implementation, not complex planning',
        'Below midpoint as it doesn\'t use decentralized information',
      ],
      sources: [
        'Social Security Administration payroll tax systems',
        'Congressional Budget Office scoring methodology',
      ],
    },
    ostrom: {
      score: 1.0,
      reasoning: 'The solvency of Social Security is a national issue, and the solution is implemented at the federal level. This alignment is ideal: decision power matches the scope of the problem. A federal program is being fixed by a federal policy, exemplifying a polycentric approach (appropriate scale of governance for the issue).',
      keyPoints: [
        'Social Security solvency is inherently a national issue',
        'Federal solution matches federal program scope',
        'Decision power aligns with scope of problem',
        'Exemplifies polycentric approach with appropriate governance scale',
      ],
      sources: [
        'Social Security Act structure',
        'Federal payroll tax administration',
      ],
    },
    downs: {
      score: 0.9,
      reasoning: 'The policy is highly transparent and easy to understand: essentially, "if you earn above $400k, that extra income is subject to Social Security tax." There are no hidden complexities or fine-print exceptions for special groups. The trade-off is clear and legible to the public – high earners pay more to strengthen Social Security – embodying an "If X then Y" clarity.',
      keyPoints: [
        'Highly transparent: if you earn above $400k, pay SS tax',
        'No hidden complexities or fine-print exceptions',
        'Clear trade-off legible to public',
        '"If X then Y" clarity embodied in design',
      ],
      sources: [
        'Public consultation studies on Social Security reform',
        'Polling on understanding of proposal',
      ],
    },
    olson: {
      score: 0.6,
      reasoning: 'By design, the donut hole tax applies broadly to all individuals with wages over $400k, which limits opportunities for interest-group loopholes or carve-outs. This universality makes the policy more robust against lobbying influence (it\'s hard for a special interest to exempt just themselves). However, some gaming is possible (for instance, wealthy individuals might reclassify income as capital gains not subject to payroll tax). While fairly resistant to capture, it\'s not foolproof.',
      keyPoints: [
        'Applies broadly to all high earners, limiting loopholes',
        'Universality makes policy robust against lobbying',
        'Hard for special interests to exempt themselves',
        'Some gaming possible via income reclassification',
        'Fairly resistant to capture, not foolproof',
      ],
      sources: [
        'Voice of the People swing state surveys (2023)',
        'Moneywise national polling (2024)',
        'AARP policy position statements',
      ],
    },
    keynes: {
      score: 0.7,
      reasoning: 'Ensuring Social Security\'s solvency has a stabilizing influence in the long run. It prevents a future scenario of sudden benefit cuts (which would be pro-cyclical, hurting retirees especially during downturns). By taxing those most able to pay, it acts somewhat counter-cyclically – high earners\' consumption is less likely to drop drastically due to a tax, and the Social Security system itself functions as an automatic stabilizer.',
      keyPoints: [
        'Long-run stabilizing influence on retirement security',
        'Prevents pro-cyclical sudden benefit cuts',
        'Taxes those most able to pay',
        'Acts somewhat counter-cyclically',
        'Social Security functions as automatic stabilizer',
      ],
      sources: [
        'Social Security as automatic stabilizer research',
      ],
    },
    pettit: {
      score: 0.7,
      reasoning: 'Strengthening Social Security via this tax bolsters individuals\' independence in old age. With a solvent fund, retirees (especially those of modest means) can rely on their benefits and are less subject to mercy of employers or family to survive. By guaranteeing an earned social insurance, the policy provides a measure of economic security – a form of "F-you money" in retirement – enhancing freedom from arbitrary power or domination in one\'s later years.',
      keyPoints: [
        'Bolsters independence in old age',
        'Retirees less subject to mercy of employers or family',
        'Provides "F-you money" in retirement',
        'Enhances freedom from arbitrary power in later years',
        'Guarantees earned social insurance',
      ],
      sources: [
        'Social Security and retirement security research',
      ],
    },
    hirschman: {
      score: 0.5,
      reasoning: 'The core structure of Social Security remains mandatory and without direct competition (no new "exit" option for workers), so this policy doesn\'t create alternatives or markets to opt out to. However, it does reflect the public\'s voice: an overwhelmingly popular solution that emerged from public consultation. It shows the system responding to citizen input (avoiding a scenario where people are trapped in a failing program with no recourse). Overall, it neither traps individuals nor radically increases choice.',
      keyPoints: [
        'No new "exit" option created for workers',
        'Social Security remains mandatory',
        'Reflects public voice through popular solution',
        'System responding to citizen input',
        'Avoids trapping people in failing program',
      ],
      sources: [
        'Public opinion on Social Security reform',
      ],
    },
    buchanan: {
      score: 0.3,
      reasoning: 'The policy imposes a cost on a specific minority (wealthy earners over $400k) for the benefit of the majority. Those high earners are "losers" in the short run, paying more into the system without equivalent new benefits, and they likely wouldn\'t unanimously consent to this change. While the social contract rationale is strong (everyone gets a more secure program, and public support is high), it\'s not a Pareto improvement. There is coercion of a few for the good of many.',
      keyPoints: [
        'Imposes cost on wealthy minority for majority benefit',
        'High earners are "losers" in short run',
        'Not a Pareto improvement',
        'Coercion of few for good of many',
        'Social contract rationale is strong but not unanimous',
      ],
      sources: [
        'Voice of the People surveys',
        'Moneywise polling data',
      ],
    },
    polanyi: {
      score: 0.9,
      reasoning: 'This greatly buffers a basic need (retirement security) from market dependence. By funding Social Security robustly, it protects seniors from having their livelihood entirely subject to private savings or market fluctuations. In Polanyian terms, it de-commodifies a key aspect of life (income in old age is secured as a social right rather than a mere outcome of one\'s ability to labor or invest). This is a strong protective action for human welfare.',
      keyPoints: [
        'Buffers retirement security from market dependence',
        'Protects seniors from reliance on private savings/markets',
        'De-commodifies income in old age',
        'Secures retirement as social right',
        'Strong protective action for human welfare',
      ],
      sources: [
        'Social Security as social insurance literature',
        'Polanyi\'s market embedding theory',
      ],
    },
    rawls: {
      score: 1.0,
      reasoning: 'The donut hole fix is explicitly progressive and aimed at benefiting the worst-off. It asks the most advantaged (top earners) to contribute more so that the least advantaged (reliant retirees, low-income workers who depend on Social Security) don\'t face cuts. This maximizes the minimum by shoring up a universal safety net. In Rawlsian terms, it\'s a textbook case of lifting the floor and prioritizing the needs of the less fortunate.',
      keyPoints: [
        'Explicitly progressive policy design',
        'Most advantaged contribute more for least advantaged',
        'Prevents benefit cuts for reliant retirees',
        'Maximizes the minimum via universal safety net',
        'Textbook case of lifting the floor',
      ],
      sources: [
        'Social Security Administration benefit distribution data',
        'Center on Budget and Policy Priorities poverty analysis',
        'SSA Trustees Report on insolvency timeline',
      ],
    },
    george: {
      score: 0.2,
      reasoning: 'The revenue comes from taxing labor earnings (even if very high earnings), not from land value or economic rents. Georgist philosophy prefers tapping unearned income (like land rent, monopoly gains) over taxing work. Here, productive income of high earners is being taxed more, which is closer to penalizing labor/talent than capturing a pure rent. While one could argue extremely high salaries sometimes include rents (e.g. monopoly profits or positional advantages), this policy isn\'t designed around that distinction.',
      keyPoints: [
        'Taxes labor earnings, not land or economic rents',
        'Georgist philosophy prefers taxing unearned income',
        'Closer to penalizing labor/talent than capturing rent',
        'Policy not designed around rent distinction',
        'High salaries may include some rents but not targeted',
      ],
      sources: [],
    },
    acemoglu: {
      score: 0.5,
      reasoning: 'Social Security\'s enhancement via this tax doesn\'t directly overhaul institutions or power structures, but it does slightly level the field economically. By asking elites to pay more into a public program, it reins in inequality marginally and ensures broader inclusion in the gains of growth (everyone gets their benefits protected). Still, it\'s not a structural change to political inclusion or market entry barriers – it doesn\'t create new opportunities for the marginalized or dismantle monopolies.',
      keyPoints: [
        'Does not directly overhaul institutions',
        'Slightly levels field economically',
        'Reins in inequality marginally',
        'Ensures broader inclusion in growth gains',
        'Not structural change to political inclusion',
      ],
      sources: [
        'Social Security as inclusive institution',
      ],
    },
    walzer: {
      score: 0.8,
      reasoning: 'This policy helps keep the logic of welfare provision separate from pure market logic. In the sphere of social provision (retirement security), need and rights are taking precedence over wealth. By taxing the wealthy to fund a universal benefit, it asserts that a decent retirement shouldn\'t be something only money can buy – it\'s allocated by social citizenship and need, not by who has the fattest 401(k). This guards against the corruption of the social safety net by market inequality.',
      keyPoints: [
        'Keeps welfare provision separate from market logic',
        'Need and rights take precedence over wealth',
        'Retirement allocated by citizenship, not wealth',
        'Asserts decent retirement not just for rich',
        'Guards against corruption of safety net by inequality',
      ],
      sources: [
        'Social insurance philosophy',
        'Walzer\'s Spheres of Justice',
      ],
    },
  },
  modifiers: [
    {
      id: 'eliminate-cap-entirely',
      name: 'Eliminate Cap Entirely',
      description: 'Remove the donut hole and tax all earnings above current cap',
      factorChanges: { rawls: 0.0, buchanan: -0.1 },
    },
    {
      id: 'benefit-adjustment',
      name: 'Pair with Modest Benefit Adjustment',
      description: 'Combine with small benefit changes for highest earners',
      factorChanges: { buchanan: 0.1, downs: -0.05 },
    },
  ],
};
