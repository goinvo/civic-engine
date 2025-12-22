import { PolicyMethodology } from '../index';

export const medicareDrugNegotiation: PolicyMethodology = {
  policyId: 'medicare-drug-negotiation',
  policyName: 'Universal Drug Price Negotiation',
  description: 'Expand Medicare\'s power to negotiate prices for all prescription drugs and cap annual drug price increases at inflation.',
  overallRationale: 'This policy has 85% public support (92% Democrats, 89% independents, 77% Republicans). It builds on the 2022 Inflation Reduction Act\'s limited negotiation authority to cover all drugs. The policy addresses pharmaceutical monopoly pricing that the public views as the primary driver of high drug costs.',
  factors: {
    hayek: {
      score: 0.3,
      reasoning: 'On the Hayekian knowledge scale, this policy leans toward central planning (low score). Rather than prices emerging from decentralized market competition, a government entity (Medicare) would centrally negotiate and set drug prices for the whole market of Medicare recipients. It assumes the state (through Medicare negotiators) can determine fair prices, as opposed to relying purely on dispersed market signals. That said, one might argue the current system isn\'t a free market either – pharma companies enjoy patent monopolies and can raise prices arbitrarily. Nonetheless, empowering Medicare to negotiate is a top-down intervention requiring bureaucratic pricing decisions.',
      keyPoints: [
        'Leans toward central planning approach',
        'Government negotiates prices centrally',
        'Assumes state can determine fair prices',
        'Current pharma monopolies also distort markets',
        'Top-down intervention for pricing decisions',
      ],
      sources: [
        'VA drug pricing comparisons',
        'International drug price negotiation models',
      ],
    },
    ostrom: {
      score: 0.9,
      reasoning: 'The scope of the problem (skyrocketing drug prices driven by national-level industry practices and federal patent laws) is national, so giving power to a federal program (Medicare) appropriately matches the scale. A single state or local government cannot effectively rein in prices for drugs sold nationally; Medicare, covering a huge swath of the population, has the clout and scope to tackle this national issue. In fact, only a large-scale actor like the federal government can negotiate with big pharma on equal footing. The design is polycentric/federally matched to a national market problem.',
      keyPoints: [
        'National problem requires national solution',
        'Medicare has clout to negotiate with big pharma',
        'States cannot effectively rein in national drug prices',
        'Federal scale matches pharmaceutical industry scale',
        'Polycentric design for national market problem',
      ],
      sources: [
        'State insulin price caps',
        'IRA implementation structure',
      ],
    },
    downs: {
      score: 0.8,
      reasoning: 'The policy is reasonably straightforward in concept: "If Medicare buys your drug, Medicare will negotiate a fair price (instead of just paying whatever list price), and your price hikes can\'t exceed inflation." This is clear enough for most voters, evidenced by its popularity. There are some complexities (how negotiations are conducted, enforcement of inflation caps, potential exceptions), but compared to many healthcare policies, it\'s transparent. People can easily grasp the cause-and-effect: government negotiation → lower drug prices; inflation cap → no more outrageous annual price hikes.',
      keyPoints: [
        'Straightforward concept: Medicare negotiates fair prices',
        'Clear inflation cap rule',
        'Easy cause-and-effect: negotiation leads to lower prices',
        'More legible than opaque rebate systems',
        'Trade-off (pharma earns less) is apparent',
      ],
      sources: [
        'KFF polling on drug price understanding',
        'Public opinion research',
      ],
    },
    olson: {
      score: 0.6,
      reasoning: 'The idea of universal negotiation authority and inflation caps applied broadly is meant to be robust against pharmaceutical lobbying – it\'s a sweeping rule, hard for any one company to exempt itself from. However, the pharmaceutical industry will undoubtedly attempt to influence implementation (e.g. defining which drugs are "negotiated" when, or trying to weaken the penalties for non-compliance). If the policy is enacted cleanly, it minimizes loopholes and special treatment. Still, given pharma\'s political influence, one concern is future regulatory capture or carve-outs. The framework is broad (positive for anti-capture), but execution details and ongoing political pressure could affect resistance to special interests.',
      keyPoints: [
        'Sweeping rule hard for companies to escape',
        'Pharma will attempt to influence implementation',
        'Clean enactment minimizes loopholes',
        'Risk of future regulatory capture',
        'Broad framework but execution matters',
      ],
      sources: [
        'OpenSecrets pharmaceutical lobbying data 2022',
        'KFF tracking of PhRMA advertising spending',
      ],
    },
    keynes: {
      score: 0.7,
      reasoning: 'While not a classic counter-cyclical policy, drug price negotiation can have stabilizing economic effects. By curbing excessive drug prices, it helps control healthcare inflation, which is beneficial for the economy\'s long-term stability (healthcare cost crises can strain government budgets and consumers, acting as a drag especially during downturns). It also reduces volatility in patients\' out-of-pocket expenses, which can prevent personal financial crises. Additionally, if Medicare spends less on drugs, it potentially has more fiscal room to maintain benefits during recessions. The policy leans counter-cyclical through indirect stabilizing benefits.',
      keyPoints: [
        'Helps control healthcare inflation',
        'Reduces volatility in patient expenses',
        'Prevents personal financial crises from drug costs',
        'More fiscal room for Medicare during recessions',
        'Indirect stabilizing economic effects',
      ],
      sources: [],
    },
    pettit: {
      score: 0.8,
      reasoning: 'Currently, many patients (especially seniors on Medicare) are dominated by pharmaceutical companies\' pricing power – if you need a life-sustaining drug, you must pay whatever price is set, or suffer health consequences. That\'s a form of domination by an unaccountable private power. This policy shifts some power back to the public realm, subjecting pharma prices to negotiation and limits. It means individuals are less dependent on the arbitrary will of pharma executives. In essence, it provides a measure of freedom: a life-saving medicine is less of a tool of coercion ("pay or die/suffer"). Given widespread support (even 77% of Republicans favor it), the policy reflects a collective assertion of non-domination over pharma monopolies.',
      keyPoints: [
        'Patients currently dominated by pharma pricing power',
        '"Pay or die" is a form of domination',
        'Shifts power back to public realm',
        'Less dependence on arbitrary pharma will',
        'Collective assertion of non-domination',
      ],
      sources: [
        'KFF health tracking poll on prescription affordability',
        'JAMA studies on insulin rationing and mortality',
      ],
    },
    hirschman: {
      score: 0.7,
      reasoning: 'In the status quo, patients often have no exit – you can\'t "shop around" for a cheaper alternative if only one company makes your drug. Nor do individual patients have much voice to negotiate prices. By empowering Medicare, the policy creates a sort of collective voice mechanism: the government negotiator speaks for millions of patients. It\'s not giving each person direct say, but it is an institutional voice aggregating consumer interests. Exit options remain limited (a patient still typically must use the drug their doctor prescribes), but by capping price increases it at least prevents exploitation of the lack of exit. The score is moderately high because it significantly improves agency for consumers through collective bargaining power.',
      keyPoints: [
        'Patients have no exit when only one company makes their drug',
        'Individual patients have no voice to negotiate',
        'Medicare creates collective voice mechanism',
        'Institutional voice aggregates consumer interests',
        'Improves agency through collective bargaining',
      ],
      sources: [],
    },
    buchanan: {
      score: 0.8,
      reasoning: 'The negotiation policy is extremely popular with the public at large (around 85% support), meaning there\'s near-consensus that it\'s beneficial. Almost everyone (across political lines) stands to gain either directly or via budgetary savings. The losers are a distinct, narrow group: pharmaceutical companies (and possibly their shareholders) who would see profit margins trimmed. They are indeed being coerced into a new system and not compensated for lost future revenue – hence it\'s not a pure Pareto improvement. However, from a social contract view, the policy has overwhelming democratic legitimacy and the "losers" have been profiting from what many consider unfair practices. Since those losing out are large firms extracting rents, the consent criterion remains high.',
      keyPoints: [
        'Around 85% public support, near-consensus',
        'Almost everyone gains directly or via savings',
        'Only losers are pharma companies and shareholders',
        'Not pure Pareto improvement but overwhelming legitimacy',
        'Losers were profiting from unfair practices',
      ],
      sources: [
        'KFF polling data',
        'Pennsylvania Independent healthcare costs reporting',
      ],
    },
    polanyi: {
      score: 0.8,
      reasoning: 'This factor asks if essentials are de-commodified or buffered from market forces. Medicine is widely seen as an essential good that should not be treated like a pure market commodity when people\'s lives and well-being depend on it. The policy doesn\'t make drugs free or fully public, but it significantly reins in the market by government negotiation and pricing rules. It\'s a step toward de-commodification of health necessities – ensuring access is based less on ability to pay and more on medical need. By capping price growth to inflation and forcing prices down through talks, it protects patients from the harshest profit-driven pricing.',
      keyPoints: [
        'Medicine widely seen as essential, not pure commodity',
        'Reins in market through negotiation and rules',
        'Step toward de-commodification of health necessities',
        'Access based more on need, less on ability to pay',
        'Protects from harshest profit-driven pricing',
      ],
      sources: [
        'Healthcare access and affordability research',
      ],
    },
    rawls: {
      score: 0.9,
      reasoning: 'Who benefits most from universal drug price negotiation? Primarily, the sick and the poor (and especially those who are both). High drug prices hurt vulnerable groups: elderly on fixed incomes, low-income families, people with chronic illnesses. Lowering drug costs and slowing their increase will disproportionately help those for whom even small co-pays are a burden. It reduces the chance that someone has to skip medications due to cost – a situation that often hits the worst-off hardest. Because this policy stands to improve the condition of those least advantaged (e.g., a senior choosing between medicine and groceries) in a very direct way, it scores very high on the Rawlsian metric.',
      keyPoints: [
        'Benefits primarily the sick and the poor',
        'High prices hurt elderly, low-income, chronically ill',
        'Disproportionately helps those burdened by co-pays',
        'Reduces medication skipping due to cost',
        'Most transformative for those struggling with costs',
      ],
      sources: [
        'Medicare Rights Center analysis',
        'KFF drug cost burden research',
      ],
    },
    george: {
      score: 1.0,
      reasoning: 'This is a textbook case of clawing back monopoly rent. Pharma companies, protected by patents (legal monopolies), often charge well above the cost of production, yielding extraordinary profits – classic economic rent. Allowing Medicare to negotiate is effectively the government capturing some of that excessive profit and redirecting it to the public (through savings for patients and taxpayers). It\'s not a tax, but the effect is similar to taxing away unearned monopoly gains. Notably, it does not penalize productive activity like developing a new drug (they still can profit, just not exploitively so), and it doesn\'t tax labor or open-market competition – it targets the static rent that comes from exclusivity.',
      keyPoints: [
        'Textbook case of clawing back monopoly rent',
        'Patent monopolies yield extraordinary profits',
        'Redirects excessive profit to public',
        'Does not penalize productive drug development',
        'Targets static rent from exclusivity, not labor',
      ],
      sources: [
        'PNAS study "Contribution of NIH funding to new drug approvals" (2018)',
        'RAND Corporation international drug price comparisons',
      ],
    },
    acemoglu: {
      score: 0.8,
      reasoning: 'Inclusive institutions distribute power and benefits broadly, whereas extractive ones concentrate them. The current pharmaceutical pricing system is rather extractive: a few companies (and their investors) reap immense financial gains, while many patients and taxpayers foot the bill. By negotiating prices, the government changes the rules of the game to be more inclusive – broadening who benefits from the pharmaceutical sector\'s productivity. The savings go to millions of people instead of being extracted as profits for a few. Additionally, making drugs more affordable means more people can participate in society fully (staying healthy, productive, and financially stable).',
      keyPoints: [
        'Current system is extractive: few gain, many pay',
        'Negotiation changes rules to be more inclusive',
        'Savings go to millions instead of few',
        'More people can participate fully in society',
        'Levels playing field in pharmaceutical sector',
      ],
      sources: [
        'Healthcare access research',
      ],
    },
    walzer: {
      score: 0.8,
      reasoning: 'In Walzer\'s terms, health and life should not be allocated purely by money – they belong to a sphere where equality or need should dominate. The drug negotiation policy aligns with this: it uses public power to ensure medications (a good in the health sphere) are more in line with need and fairness rather than ability to pay or corporate profit. It\'s an attempt to correct a "corrupt" distribution where wealth has been buying longer life or better health. By capping price hikes and lowering costs, it moves toward the norm that medicine should be affordable for those who medically need it, not a luxury good.',
      keyPoints: [
        'Health and life should not be allocated by money',
        'Uses public power to align with need and fairness',
        'Corrects corrupt distribution where wealth buys health',
        'Moves toward medicine affordable for those who need it',
        'Right criteria: need-based rather than market-based',
      ],
      sources: [
        'Walzer on healthcare distribution',
        'Medical ethics literature',
      ],
    },
  },
  modifiers: [
    {
      id: 'international-reference',
      name: 'International Reference Pricing',
      description: 'Tie negotiated prices to international benchmarks',
      factorChanges: { george: 0.0, downs: 0.05 },
    },
    {
      id: 'extend-to-private',
      name: 'Extend to Private Insurance',
      description: 'Allow negotiated prices to apply to private insurance purchases',
      factorChanges: { rawls: 0.05, acemoglu: 0.1 },
    },
  ],
};
