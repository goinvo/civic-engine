import { PolicyMethodology } from '../index';

export const healthcarePublicOption: PolicyMethodology = {
  policyId: 'healthcare-public-option',
  policyName: 'Healthcare Public Option',
  description: 'Create a government-run health insurance plan that competes with private insurers, available to all Americans who want it. Federal policy in healthcare with ~68% public support.',
  overallRationale: 'The Healthcare Public Option scores well across most dimensions by offering choice rather than mandate. It excels on exit/voice (Hirschman: 0.9) by creating a new option for those dissatisfied with private insurers, and performs strongly on protection (Polanyi: 0.8) and the floor (Rawls: 0.8). Unlike single-payer, it preserves market competition while adding a public competitor, scoring higher on Hayekian information feasibility (0.6) and Buchanan consent (0.7) due to its voluntary nature.',
  factors: {
    hayek: {
      score: 0.6,
      reasoning: 'The public option preserves market competition and individual choice – people can choose between private plans and the public option based on their own knowledge of their needs. This is more decentralized than single-payer. However, the public option itself involves government administration and price-setting. The key insight is that healthcare markets have significant failures (information asymmetries, adverse selection) that pure markets handle poorly. A public option provides a benchmark and fallback without eliminating private alternatives.',
      keyPoints: [
        'Preserves market competition and individual choice',
        'More decentralized than single-payer',
        'Government sets prices for public option',
        'Healthcare markets have significant failures',
        'Public benchmark without eliminating private options',
      ],
      sources: [
        'KFF - public option design questions',
        'Healthcare market failure research',
      ],
    },
    ostrom: {
      score: 0.7,
      reasoning: 'A federal public option makes sense for the scope of health insurance – risk pooling benefits from large scale, and portability across states requires federal structure. However, healthcare delivery remains local. The public option can be designed with regional administrators or state-level variations while maintaining national standards. This matches resources (federal) to the appropriate scale while allowing local adaptation in delivery networks and provider relationships.',
      keyPoints: [
        'Federal structure matches insurance risk pooling',
        'Portability requires federal standards',
        'Delivery remains local',
        'Can have regional administrators',
        'National standards with local adaptation',
      ],
      sources: [
        'KFF - public option structure',
        'Federal vs state health insurance research',
      ],
    },
    downs: {
      score: 0.7,
      reasoning: 'The public option is moderately legible: people understand "a government insurance plan you can choose." However, the details of how it interacts with existing programs (Medicare, Medicaid, ACA exchanges), how it is priced, and what it covers add complexity. Compared to single-payer ("everyone gets Medicare"), the public option requires more explanation. But compared to the current system of multiple private plans with different rules, it simplifies by offering one clear public alternative.',
      keyPoints: [
        'Core concept is understandable',
        'Interactions with existing programs add complexity',
        'More complex than single-payer to explain',
        'Simpler than current multiple private plan system',
        'One clear public alternative',
      ],
      sources: [
        'Public option communication research',
        'Health insurance literacy studies',
      ],
    },
    olson: {
      score: 0.6,
      reasoning: 'The public option faces capture risks from multiple directions: private insurers lobbying to weaken it or load it with sicker patients (adverse selection), providers lobbying for higher reimbursement rates, and opponents trying to underfund or administratively burden it. However, its competitive nature provides some protection – if the public option is not competitive, people will choose private alternatives, creating pressure for efficiency. The threat of public option expansion also disciplines private insurers.',
      keyPoints: [
        'Capture risks from multiple directions',
        'Private insurers may try to weaken it',
        'Risk of adverse selection dumping',
        'Competition provides efficiency pressure',
        'Threat of expansion disciplines private market',
      ],
      sources: [
        'Health policy lobbying research',
        'Public option political economy',
      ],
    },
    keynes: {
      score: 0.7,
      reasoning: 'A public option has counter-cyclical properties because eligibility is not tied to employment. During recessions, when people lose jobs and employer coverage, they can enroll in the public option rather than becoming uninsured. MACPAC research on Medicaid shows how public health coverage can serve as an automatic stabilizer. The public option would expand enrollment automatically during downturns, maintaining healthcare access and household financial stability.',
      keyPoints: [
        'Eligibility not tied to employment',
        'Enrollment expands during recessions',
        'Maintains coverage when people lose jobs',
        'Acts as automatic stabilizer',
        'Protects household financial stability',
      ],
      sources: [
        'MACPAC - countercyclical Medicaid financing',
        'Health coverage and recession research',
      ],
    },
    pettit: {
      score: 0.8,
      reasoning: 'The public option reduces domination by giving people an exit from private insurer power. Currently, many people are dependent on their employer\'s choice of insurance plan or limited options on exchanges. A public option provides an alternative that is not subject to private insurer profit motives or arbitrary coverage decisions. It gives people a form of "F-you" option – they can always choose the public plan if private options are exploitative.',
      keyPoints: [
        'Exit from private insurer power',
        'Alternative to employer-tied coverage',
        'Not subject to private profit motives',
        'Escape from arbitrary coverage decisions',
        '"F-you" option against exploitation',
      ],
      sources: [
        'Pettit - non-domination theory',
        'Health insurance and freedom research',
      ],
    },
    hirschman: {
      score: 0.9,
      reasoning: 'The public option is quintessentially about enhancing exit. It creates a new option that did not exist before – if you are unhappy with private insurance, you can exit to the public plan. This competitive pressure also amplifies voice: private insurers must respond to customer concerns or lose them to the public alternative. The public option itself, being government-run, is subject to democratic voice through elections and policy advocacy.',
      keyPoints: [
        'Creates new exit option from private insurers',
        'Competitive pressure amplifies voice to private market',
        'Public plan subject to democratic voice',
        'Exit and voice both enhanced',
        'Market competition improves responsiveness',
      ],
      sources: [
        'Hirschman - Exit, Voice, and Loyalty',
        'Health insurance competition research',
      ],
    },
    buchanan: {
      score: 0.7,
      reasoning: 'The public option is voluntary – no one is forced into it or out of their current coverage. This respects individual consent more than a mandate. With ~68% support, it has solid majority backing. The main losers are private insurers who face new competition, but they are not banned – they can compete. Some argue a "level playing field" is impossible (government has advantages), but the voluntary nature means those satisfied with private insurance can keep it. Approaches Pareto by expanding options.',
      keyPoints: [
        'Voluntary – respects individual consent',
        '~68% public support',
        'Private insurers face competition, not ban',
        'Those satisfied with private can keep it',
        'Expands options – approaches Pareto',
      ],
      sources: [
        'Public option polling',
        'Voluntary vs mandatory health reform',
      ],
    },
    polanyi: {
      score: 0.8,
      reasoning: 'The public option partially decommodifies healthcare by providing a non-profit alternative to market-based insurance. It says that access to health coverage should not depend entirely on ability to pay market prices or satisfy private insurer profit requirements. However, it does not fully decommodify – healthcare remains partly a market good, and the public option competes within that market. It is a significant step toward recognizing healthcare as a social right.',
      keyPoints: [
        'Provides non-profit alternative',
        'Access not purely dependent on market',
        'Does not fully decommodify healthcare',
        'Competes within market system',
        'Step toward healthcare as social right',
      ],
      sources: [
        'Polanyi - The Great Transformation',
        'Healthcare decommodification research',
      ],
    },
    rawls: {
      score: 0.8,
      reasoning: 'The public option primarily benefits those currently uninsured or underinsured – often lower-income individuals who cannot afford private coverage or whose employers do not offer it. By providing an affordable alternative, it lifts the floor for healthcare access. RAND research shows public options reduce premiums and uninsurance. Those already well-served by employer coverage see little change, while those worst-off gain meaningful new access.',
      keyPoints: [
        'Benefits uninsured and underinsured most',
        'Affordable alternative for lower-income',
        'Lifts floor for healthcare access',
        'RAND: reduces premiums and uninsurance',
        'Worst-off gain most from new access',
      ],
      sources: [
        'RAND - public option effects study',
        'Health coverage disparities research',
      ],
    },
    george: {
      score: 0.5,
      reasoning: 'The public option does not directly address land or economic rent. However, it does capture some healthcare-sector rents: by competing with private insurers, it can reduce excessive profit margins and administrative overhead that represent rent extraction. Government negotiating power for the public option can also capture some pharmaceutical and provider rents. But this is incidental to the policy\'s main purpose rather than a primary design feature.',
      keyPoints: [
        'Does not directly address land rent',
        'May reduce insurer profit margins',
        'Government negotiating power captures some rents',
        'Incidental rent reduction, not primary purpose',
        'Neutral on Georgist taxation goals',
      ],
      sources: [
        'Healthcare rent extraction research',
        'Insurance profit margin studies',
      ],
    },
    acemoglu: {
      score: 0.8,
      reasoning: 'The public option creates more inclusive access to healthcare coverage. It removes barriers that prevent people from obtaining insurance – lack of employer coverage, pre-existing conditions in some markets, inability to afford premiums. By providing a public backstop, it ensures that economic participation is not limited by health coverage status. Healthcare security allows people to take entrepreneurial risks, change jobs, and participate fully in economic life.',
      keyPoints: [
        'Removes barriers to insurance access',
        'Public backstop for all',
        'Economic participation not limited by coverage',
        'Enables entrepreneurship and job mobility',
        'More inclusive healthcare institutions',
      ],
      sources: [
        'Acemoglu - Inclusive institutions',
        'Health coverage and economic mobility',
      ],
    },
    walzer: {
      score: 0.8,
      reasoning: 'The public option moves healthcare distribution toward need-based criteria rather than pure market criteria. It provides a non-market alternative for those who cannot or do not want to navigate commercial insurance. Healthcare is a sphere where Walzer argues distribution should be by need – the public option partially realizes this by ensuring an option exists outside profit-driven markets. It does not fully separate spheres (market insurance persists) but creates sphere-appropriate access.',
      keyPoints: [
        'Moves toward need-based distribution',
        'Non-market alternative available',
        'Healthcare sphere: distribution by need',
        'Does not fully separate from market',
        'Creates sphere-appropriate access option',
      ],
      sources: [
        'Walzer - Spheres of Justice',
        'Healthcare distribution ethics',
      ],
    },
  },
  modifiers: [
    {
      id: 'medicare-rates',
      name: 'Pay Medicare Rates',
      description: 'Public option pays providers at Medicare reimbursement rates',
      factorChanges: { george: 0.1, buchanan: -0.1 },
    },
    {
      id: 'opt-out-states',
      name: 'State Opt-Out',
      description: 'Allow states to opt out if they provide equivalent coverage',
      factorChanges: { ostrom: 0.15, buchanan: 0.1, rawls: -0.1 },
    },
    {
      id: 'employer-buy-in',
      name: 'Employer Buy-In Allowed',
      description: 'Allow employers to purchase public option for their employees',
      factorChanges: { acemoglu: 0.1, hirschman: 0.1 },
    },
  ],
};
