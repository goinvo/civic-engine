import { PolicyMethodology } from './index';

export const federalJobGuarantee: PolicyMethodology = {
  policyId: 'federal-job-guarantee',
  policyName: 'Federal Job Guarantee (FJG)',
  description: 'A program assuring a public job at a liveable wage to all who want work, making the government an employer of last resort.',
  overallRationale: 'FJG scores exceptionally high on stability (automatic stabilizer), protection (decommodifies labor), and exit/voice (workers can always leave bad employers). Lower scores on consent (creates some losers) and rent targeting (depends on funding).',
  factors: {
    hayek: {
      score: 0.5,
      reasoning: 'A job guarantee is more centralized than UBI but incorporates decentralized elements. Local governments and nonprofits identify projects while federal funding supports those jobs.',
      keyPoints: [
        'Local officials with on-ground knowledge design job projects',
        'Polycentric delivery reduces knowledge burden on central planner',
        'Historical precedent: WPA provided millions of jobs',
        'Uses general rules ("anyone who wants a job gets one")',
      ],
      sources: [
        'CBPP - Federal Job Guarantee proposal',
      ],
    },
    ostrom: {
      score: 0.8,
      reasoning: 'FJG is designed with multiple levels of governance. Federal funding and guidelines meet macro goals, but local entities shape jobs to fit local conditions.',
      keyPoints: [
        'Federal resources + local execution = polycentric structure',
        'One town hires caregivers, another builds flood defenses',
        'National funding, local implementation (like India\'s NREGA)',
        'Matches scale: federal for unemployment, local for specific needs',
      ],
      sources: [
        'CBPP - Multi-scale administration design',
      ],
    },
    downs: {
      score: 0.7,
      reasoning: 'The core idea is simple: "If you want work, the government will provide a public job at $X wage." However, execution involves bureaucracy for creating roles and managing projects.',
      keyPoints: [
        'Clear guarantee, easily understood by public',
        'Straightforward eligibility: show up, get a job',
        'More complex than UBI due to operational program',
        'Historical WPA was understood ("I got a WPA job")',
      ],
      sources: [],
    },
    olson: {
      score: 0.6,
      reasoning: 'Universal availability makes capture harder, but risks include patronage in local implementation and industry lobbying to keep wages low.',
      keyPoints: [
        'Open to all citizens who want to work',
        'Safeguards prevent replacing existing workers',
        'Risk: local patronage or nepotism',
        'Fixed wage/benefits prevent sweetheart deals',
      ],
      sources: [
        'CBPP - Safeguards in JG design',
      ],
    },
    keynes: {
      score: 1.0,
      reasoning: 'The job guarantee is often hailed as the ultimate automatic stabilizer. In a recession, workers immediately take JG jobs; in a boom, they leave for private sector jobs.',
      keyPoints: [
        'Counter-cyclical: government spending rises automatically in downturns',
        'Maintains full employment without igniting inflation',
        'Acts as buffer stock of jobs',
        'Prevents long-term scarring of unemployment',
      ],
      sources: [
        'CBPP - JG as robust automatic stabilizer',
      ],
    },
    pettit: {
      score: 0.9,
      reasoning: 'FJG empowers workers by eliminating the threat of unemployment. No one is forced to accept abusive employment because they have a dignified alternative.',
      keyPoints: [
        '"Bring power back to the workers"',
        'Workers can leave bad jobs for public option',
        'Sets minimum standard for workplace conditions',
        'Eliminates humiliating powerlessness of unemployment',
      ],
      sources: [
        'Jacobin - JG strengthens worker power',
        'FDR - Economic Bill of Rights',
      ],
    },
    hirschman: {
      score: 1.0,
      reasoning: 'Any worker can exit any unsatisfactory job because a fallback is guaranteed. This also strengthens voice through collective action – workers can press grievances without fear.',
      keyPoints: [
        'Credible exit forces employers to be more responsive',
        'Workers bolder in pressing grievances or joining unions',
        'Greatly improves bargaining position throughout economy',
        'Communities gain leverage against monopsony employers',
      ],
      sources: [
        'CBPP - Improved bargaining position',
      ],
    },
    buchanan: {
      score: 0.4,
      reasoning: 'FJG creates distinct groups who bear costs: taxpayers funding the program and low-wage employers who must raise wages. Not a Pareto improvement.',
      keyPoints: [
        'Beneficiaries: unemployed, underemployed, communities',
        'Losers: taxpayers (especially wealthy), low-wage employers',
        'Social contract: everyone who works contributes, society ensures work',
        'Not near-unanimous but has historical bipartisan acknowledgment',
      ],
      sources: [
        '1946 Employment Act, 1978 Humphrey-Hawkins Act',
      ],
    },
    polanyi: {
      score: 1.0,
      reasoning: 'FJG is a bold step in decommodifying labor. If the private market doesn\'t buy your labor, the public will – at a dignified wage.',
      keyPoints: [
        'No human\'s ability to work is treated as disposable',
        'Shields people from market fluctuations',
        'Prevents unemployment\'s personal and social ills',
        'Treats employment as human right, not conditional privilege',
      ],
      sources: [
        'Polanyi - Labor as "fictitious commodity"',
        'Coretta Scott King - Economic rights advocacy',
      ],
    },
    rawls: {
      score: 0.9,
      reasoning: 'FJG primarily benefits the worst-off workers. It eliminates involuntary unemployment and working poverty for those willing and able to work.',
      keyPoints: [
        'Disproportionately helps disadvantaged minorities and youth',
        'Closes racial employment gaps',
        'Non-poverty wage raises floor of labor conditions',
        'Argentina\'s Jefes: bottom household incomes rose ~13%',
      ],
      sources: [
        'CBPP - Closing racial employment gaps',
        'Argentina Jefes program data',
      ],
    },
    george: {
      score: 0.3,
      reasoning: 'FJG is a spending program, not a tax policy. Likely funded by general revenue including income taxes, not specifically rent taxes.',
      keyPoints: [
        'Indirectly reduces monopsony "rent" by forcing fair wages',
        'Gross cost (~3% GDP) offset by reduced welfare, higher output',
        'Not specifically funded by land or rent taxes',
        'Could score higher if paired with rent tax funding',
      ],
      sources: [],
    },
    acemoglu: {
      score: 0.8,
      reasoning: 'FJG makes economic institutions more inclusive by opening employment to literally everyone. Removes barriers like discriminatory hiring or lack of jobs in depressed regions.',
      keyPoints: [
        'Every person willing to work is included in production',
        'Directly closes racial unemployment gap',
        'Gains of growth go to working people, not just capital',
        'Employed citizens more likely to participate civically',
      ],
      sources: [
        'Acemoglu & Robinson - Inclusive institutions theory',
      ],
    },
    walzer: {
      score: 0.9,
      reasoning: 'FJG ensures money and market position do not dictate access to employment and its fruits. It distributes the good of employment by willingness to work, not market success.',
      keyPoints: [
        'Right to work is a social good everyone deserves',
        'Failure in market employment doesn\'t mean deprivation',
        'Prevents money from buying cheap labor on coercive terms',
        '"Correct logic" for distributing livelihood',
      ],
      sources: [
        'Walzer - Complex equality theory',
      ],
    },
  },
  modifiers: [
    {
      id: 'fund-via-wealth-tax',
      name: 'Fund via Wealth/Rent Tax',
      description: 'Finance JG through taxes on wealth or economic rent',
      factorChanges: { george: 0.4, buchanan: 0.1 },
    },
  ],
};
