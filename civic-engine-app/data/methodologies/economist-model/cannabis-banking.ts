import { PolicyMethodology } from '../index';

export const cannabisBanking: PolicyMethodology = {
  policyId: 'cannabis-banking',
  policyName: 'Cannabis Banking (SAFER Banking Act)',
  description: 'The SAFER Banking Act prohibits federal regulators from penalizing banks for serving state-legal cannabis businesses, ending the cash-only status quo and bringing the industry into the regulated financial mainstream. Federal policy in finance/justice with broad bipartisan support (~57-point margin in polls).',
  overallRationale: 'The SAFER Banking Act scores exceptionally well across multiple dimensions. It excels on Hayekian decentralization (0.9) by removing federal constraints and letting banks use local knowledge. It achieves near-perfect Buchanan consent (0.9) as a Pareto-improving policy with broad support. Strong scores on non-domination (Pettit: 0.9) and inclusivity (Acemoglu: 0.9) reflect how it frees cannabis businesses from arbitrary legal hurdles and opens formal financial systems to excluded groups.',
  factors: {
    hayek: {
      score: 0.9,
      reasoning: "The SAFER Act removes a federal constraint and lets decentralized market knowledge prevail. Banks and credit unions can use their judgment to price and manage risk for cannabis clients, rather than a blanket prohibition. It ends a requirement for bureaucratic omniscience (treating all cannabis money as illicit) and trusts localized information – e.g. lenders assessing a dispensary's creditworthiness – consistent with Hayekian decentralization.",
      keyPoints: [
        'Removes federal constraint on banking decisions',
        'Banks use judgment to price and manage risk',
        'Ends blanket prohibition approach',
        'Trusts localized information over central rules',
        'Lenders assess creditworthiness individually',
      ],
      sources: [
        'SAFE Banking Act Wikipedia',
        'ABA SAFER Banking Act analysis',
      ],
    },
    ostrom: {
      score: 0.9,
      reasoning: 'Cannabis legality is determined at the state level, but banking is federally regulated – a classic scale mismatch. This policy bridges the federal-state divide by respecting state decisions within those jurisdictions. It creates a polycentric approach: states regulate cannabis, and the federal banking system adapts accordingly. By aligning federal banking rules with state policy, it ensures the level of governance matches the problem scope.',
      keyPoints: [
        'Bridges federal-state regulatory divide',
        'Respects state cannabis decisions',
        'Creates polycentric governance approach',
        'Federal banking adapts to state policy',
        'Governance level matches problem scope',
      ],
      sources: [
        'Federal-state cannabis law conflict',
        'Polycentric governance research',
      ],
    },
    downs: {
      score: 0.8,
      reasoning: "The legal situation moves from murky (banks relying on informal guidance and operating in fear of sudden enforcement) to clear and rule-bound. The Act's provisions are straightforward: \"a bank shall not be penalized solely for serving a state-legal cannabis business\". It explicitly defines protected activities (providing loans, insurance, payment processing). This clarity makes compliance easier to understand.",
      keyPoints: [
        'Moves from murky to clear legal status',
        'Straightforward core provision',
        'Explicitly defines protected activities',
        'Clarity improves compliance',
        'Standard AML monitoring still applies',
      ],
      sources: [
        'SAFER Banking Act provisions',
        'Banking compliance analysis',
      ],
    },
    olson: {
      score: 0.8,
      reasoning: 'The reform has broad applicability (any financial institution and any state-licensed cannabis business), which limits special-interest carve-outs. It was driven by a coalition of stakeholders – not only cannabis firms, but also bankers, insurers, and state officials – rather than a single narrow lobby. The Act includes provisions to prevent abuse, like forbidding regulators from arbitrarily closing accounts under the guise of "reputation risk".',
      keyPoints: [
        'Broad applicability limits carve-outs',
        'Coalition-driven, not single lobby',
        'Includes bankers, insurers, state officials',
        'Prevents arbitrary account closures',
        'Standard oversight mechanisms apply',
      ],
      sources: [
        'SAFER Banking Act stakeholder coalition',
        'Anti-capture provisions',
      ],
    },
    keynes: {
      score: 0.5,
      reasoning: "This policy is largely macroeconomically neutral. It doesn't institute counter-cyclical spending or automatic stabilizers, but by integrating a shadow sector (cash cannabis economy) into the formal banking system, it could modestly enhance financial stability (reducing large cash hoards and crime risk). Any stimulative effect (easier credit for businesses) is steady-state rather than targeted to recessions or booms.",
      keyPoints: [
        'Macroeconomically neutral',
        'No counter-cyclical mechanism',
        'Integrates shadow sector into formal banking',
        'May modestly enhance financial stability',
        'Steady-state rather than cyclical effect',
      ],
      sources: [],
    },
    pettit: {
      score: 0.9,
      reasoning: "The current situation forces cannabis entrepreneurs to operate at the mercy of cash couriers, armed security, or predatory services, since mainstream banks shut them out. That leaves them vulnerable and dependent on informal networks. By legalizing access to banking, the Act gives these businesses (often small and minority-owned) more independence and security – they gain the financial equivalent of \"F-you money,\" the ability to conduct affairs without fear of arbitrary account closures or asset forfeiture.",
      keyPoints: [
        'Ends dependence on cash couriers and armed security',
        'Frees businesses from informal networks',
        'Provides independence and security',
        'Removes fear of arbitrary account closures',
        'Employees get normal paychecks and loans',
      ],
      sources: [
        'Cannabis industry banking challenges',
        'Financial inclusion research',
      ],
    },
    hirschman: {
      score: 0.8,
      reasoning: 'The reform creates exit options and voice in several ways. Cannabis businesses will have many banking alternatives (multiple banks and credit unions may compete for their accounts). This choice enhances their exit power if they dislike one bank\'s fees or services. Additionally, bringing the industry into normal finance channels gives stakeholders more voice in policy. Previously, participants were largely trapped in a cash economy with no recourse.',
      keyPoints: [
        'Creates multiple banking alternatives',
        'Enhances exit power to switch banks',
        'Brings industry into normal finance channels',
        'Stakeholders gain voice in policy',
        'Ends being trapped in cash economy',
      ],
      sources: [
        'Banking competition analysis',
        'Financial voice mechanisms',
      ],
    },
    buchanan: {
      score: 0.9,
      reasoning: "The policy is as close to Pareto-improving as one can get in public policy. Legitimate businesses, financial institutions, workers, and local communities all benefit from safer transactions and economic growth. No large group is explicitly worse off – even law enforcement benefits by having transactions above-board. With broad public and bipartisan political support (57-point margin), it reflects a near-consensual change.",
      keyPoints: [
        'Near Pareto-improving policy',
        'All stakeholders benefit',
        'No large group worse off',
        'Law enforcement benefits from transparency',
        '57-point margin in public support',
      ],
      sources: [
        'Cannabis banking polling',
        'Bipartisan support analysis',
      ],
    },
    polanyi: {
      score: 0.5,
      reasoning: "This act doesn't provide a social safety net or decommodify a vital good; it operates within the market realm. It does, however, protect a class of entrepreneurs and workers from a peculiar legal-market failure. By normalizing banking, it could be seen as society protecting itself from the unintended social harms (robberies, insecurity) of a pure market/legal disconnect. Still, fundamentally it's integrating cannabis commerce into capitalism more smoothly.",
      keyPoints: [
        'Does not decommodify vital goods',
        'Operates within market realm',
        'Protects from legal-market failure',
        'Reduces robberies and insecurity',
        'Integrates commerce into capitalism',
      ],
      sources: [],
    },
    rawls: {
      score: 0.7,
      reasoning: 'State-legal cannabis industry includes many small businesses, including minority and economically disadvantaged entrepreneurs (given social equity licensing programs in many states). Those worst off under the status quo – e.g. a cash-only mom-and-pop dispensary facing high risks and costs – stand to gain the most from access to banking and credit. It also improves public safety in high-crime neighborhoods by reducing cash-related robberies.',
      keyPoints: [
        'Benefits small and minority-owned businesses',
        'Social equity licensees gain most',
        'Levels financial playing field',
        'Improves public safety in vulnerable areas',
        'Not primarily redistributive welfare',
      ],
      sources: [
        'Cannabis social equity programs',
        'Small business banking access',
      ],
    },
    george: {
      score: 0.5,
      reasoning: "The Act does not involve taxation. It neither imposes new taxes on labor or commerce (it arguably removes an implicit \"tax\" on cannabis trade by removing banking barriers) nor does it capture any form of economic rent. There's no element of shifting the tax base to land or monopoly; it's purely a regulatory change that leaves the existing tax structure untouched.",
      keyPoints: [
        'Does not involve taxation changes',
        'Removes implicit tax on cannabis trade',
        'Does not capture economic rent',
        'Purely regulatory change',
        'Neutral on Georgist principles',
      ],
      sources: [],
    },
    acemoglu: {
      score: 0.9,
      reasoning: 'This policy is a textbook case of making institutions more inclusive. It opens up the formal financial system to a group that was excluded due to legal incongruity. By lowering barriers to entry (small cannabis firms can now get loans and banking services like any other business), it reduces the advantages that only wealthy operators had. The rule of law extends to everyone in that market, rather than forcing some to operate in extralegal shadows.',
      keyPoints: [
        'Opens formal financial system to excluded group',
        'Lowers barriers to entry',
        'Reduces advantages of wealthy operators',
        'Rule of law extends to all',
        'Levels playing field among businesses',
      ],
      sources: [
        'Acemoglu - Inclusive institutions',
        'Financial inclusion research',
      ],
    },
    walzer: {
      score: 0.8,
      reasoning: 'Under the old regime, the distribution of financial services was dictated by the clash of legal spheres – even upstanding businesses were denied banking because of a moral/legal stigma. The SAFER Act corrects this by ensuring that in the economic sphere, the criterion is compliance with state law and financial soundness, not moralistic or extraneous judgments. It uses the proper logic for banking: is the business legitimate locally and financially viable?',
      keyPoints: [
        'Corrects clash of legal spheres',
        'Criterion becomes state law compliance',
        'Removes moralistic judgments from banking',
        'Uses proper logic for financial sphere',
        'Respects democratic state choices',
      ],
      sources: [
        'Walzer - Spheres of Justice',
        'Banking criteria analysis',
      ],
    },
  },
  modifiers: [
    {
      id: 'full-legalization',
      name: 'Federal Legalization Included',
      description: 'Pair banking reform with federal cannabis legalization',
      factorChanges: { ostrom: 0.05, buchanan: -0.1, rawls: 0.1 },
    },
    {
      id: 'social-equity-lending',
      name: 'Social Equity Lending Requirements',
      description: 'Require banks to provide favorable terms for social equity licensees',
      factorChanges: { rawls: 0.15, hayek: -0.1 },
    },
  ],
};
