import { PolicyMethodology } from '../index';

export const investVocationalTraining: PolicyMethodology = {
  policyId: 'invest-vocational-training',
  policyName: 'Invest in Vocational Training',
  description: 'Expand federal funding for apprenticeships, community college career programs, and employer-based skills training. Federal policy in education/workforce with ~82% public support.',
  overallRationale: 'Invest in Vocational Training scores exceptionally well on inclusivity (Acemoglu: 0.9) by opening pathways to good jobs without requiring a 4-year degree. It performs strongly on scale match (Ostrom: 0.8) through federal funding combined with local implementation, and on raising the floor (Rawls: 0.8) by targeting workers without college degrees. The policy has broad bipartisan support and relatively low capture risk when designed with employer partnerships and outcome-based metrics.',
  factors: {
    hayek: {
      score: 0.7,
      reasoning: 'Vocational training programs can be designed to leverage local and employer knowledge rather than relying on central planning. When structured as grants to community colleges, apprenticeship programs, and employer partnerships, the federal role is primarily funding while decisions about what skills to teach are made locally by those with direct knowledge of labor market needs. The key is avoiding top-down mandates about specific curricula and instead letting employers and local institutions respond to market signals about needed skills.',
      keyPoints: [
        'Local employers know what skills they need',
        'Community colleges respond to regional labor markets',
        'Apprenticeships embed training in actual workplace knowledge',
        'Federal role is funding, not curriculum design',
        'Decentralized implementation leverages local information',
      ],
      sources: [
        'J-PAL vocational training meta-analysis',
        'Local labor market responsiveness research',
      ],
    },
    ostrom: {
      score: 0.8,
      reasoning: 'This policy exemplifies good scale matching: federal funding addresses the national interest in workforce development and provides resources that poorer regions could not generate alone, while implementation happens at the community college, apprenticeship program, and employer level where knowledge of local needs resides. The problem (skills gaps) varies by region and industry, so a one-size-fits-all federal program would fail. The proposed structure – federal grants flowing to diverse local providers – matches resources to the appropriate decision-making level.',
      keyPoints: [
        'Federal funding addresses national workforce interest',
        'Local implementation matches regional labor markets',
        'Skills gaps vary by region and industry',
        'Community colleges and employers know local needs',
        'Polycentric: resources from above, decisions below',
      ],
      sources: [
        'Workforce development governance models',
        'Regional labor market research',
      ],
    },
    downs: {
      score: 0.7,
      reasoning: 'The basic concept is straightforward: government invests in training programs so workers gain marketable skills. However, the details of implementation can become complex – which programs qualify, how outcomes are measured, what counts as success. Well-designed programs with clear metrics (job placement rates, wage gains) are legible; poorly designed ones with vague goals are not. The policy scores moderately high because the core logic is clear, though execution complexity is a real concern.',
      keyPoints: [
        'Core concept is simple: fund skills training',
        'Outcome metrics can be clear (jobs, wages)',
        'Implementation details can get complex',
        'Multiple program types add some opacity',
        'Employer partnerships increase transparency',
      ],
      sources: [
        'Program evaluation methodologies',
        'Workforce development metrics',
      ],
    },
    olson: {
      score: 0.6,
      reasoning: 'Vocational training programs have historically been vulnerable to capture. The GAO documented abuses in the Job Training Partnership Act where politically connected providers received funding regardless of outcomes. However, modern designs with outcome-based funding, employer co-investment requirements, and independent evaluation reduce capture risk. The broad beneficiary base (workers across many industries) makes it harder for narrow interests to dominate. Risk remains from training providers lobbying for easy metrics.',
      keyPoints: [
        'Historical vulnerability to provider capture',
        'GAO documented JTPA abuses',
        'Outcome-based funding reduces capture',
        'Employer co-investment aligns incentives',
        'Broad beneficiary base harder to capture',
      ],
      sources: [
        'GAO JTPA oversight reports',
        'Workforce program evaluation research',
      ],
    },
    keynes: {
      score: 0.6,
      reasoning: 'Vocational training has some counter-cyclical properties: programs can expand during recessions when workers need retraining and have time for it, and contracted during booms when labor markets are tight. However, training takes time, so it is not an immediate stabilizer like unemployment insurance. The policy is better viewed as structural rather than cyclical – building long-term human capital rather than smoothing short-term demand. Some stabilization benefit from maintaining household income during training.',
      keyPoints: [
        'Can expand during recessions for retraining',
        'Training takes time – not immediate stabilizer',
        'Structural policy more than cyclical',
        'Some income support during training periods',
        'Long-term human capital investment',
      ],
      sources: [
        'Counter-cyclical workforce policy research',
        'Training program timing studies',
      ],
    },
    pettit: {
      score: 0.7,
      reasoning: 'Skills and credentials reduce workers\' dependence on any particular employer. A worker with recognized, portable skills has more options and bargaining power – they can leave a bad situation because others will hire them. Vocational training expands the range of jobs available to someone, reducing their vulnerability to exploitation in any one position. However, employer-specific training may create some lock-in. Portable, credential-based training scores higher on non-domination.',
      keyPoints: [
        'Portable skills increase worker options',
        'More options means less dependence on any employer',
        'Credentials recognized across employers',
        'Reduces vulnerability to exploitation',
        'Employer-specific training may create some lock-in',
      ],
      sources: [
        'Labor mobility and skills research',
        'Credential portability studies',
      ],
    },
    hirschman: {
      score: 0.7,
      reasoning: 'Vocational training enhances exit options for workers by giving them skills that other employers value. A trained electrician can leave one employer for another; an untrained worker may be stuck. The policy also gives voice to workers in their current jobs – skilled workers are harder to replace and thus have more leverage to advocate for better conditions. Training programs themselves should have voice mechanisms for participants to provide feedback.',
      keyPoints: [
        'Skills enable exit to other employers',
        'Trained workers have more labor market options',
        'Skills give voice through harder-to-replace leverage',
        'Programs should include participant feedback',
        'Enhances both exit and voice in labor market',
      ],
      sources: [
        'Labor market mobility research',
        'Worker voice and skills studies',
      ],
    },
    buchanan: {
      score: 0.7,
      reasoning: 'With ~82% public support across party lines, vocational training investment approaches broad consensus. Workers gain skills, employers get trained workers, taxpayers invest in productive capacity. There are few clear losers – perhaps some colleges competing for students, or workers in training competing with incumbents. The policy is largely positive-sum: better matching of workers to jobs creates value rather than just redistributing it. The main debate is over how much to spend, not whether to spend.',
      keyPoints: [
        '~82% bipartisan public support',
        'Workers, employers, and society all benefit',
        'Few clear losers from training investment',
        'Positive-sum: creates value through better matching',
        'Debate is over magnitude, not principle',
      ],
      sources: [
        'National Skills Coalition polling',
        'Bipartisan workforce policy support',
      ],
    },
    polanyi: {
      score: 0.6,
      reasoning: 'Vocational training partially decommodifies labor by recognizing that workers need support to develop skills, rather than leaving them entirely to market forces. It embeds the labor market in social institutions (schools, apprenticeships) that help workers adapt to economic change. However, the goal is ultimately to make workers more marketable – it works within market logic rather than against it. It is protective in the sense of helping workers navigate market transitions.',
      keyPoints: [
        'Recognizes workers need support for skill development',
        'Embeds labor market in social institutions',
        'Helps workers navigate market transitions',
        'Works within market logic, making workers marketable',
        'Protective but not fully decommodifying',
      ],
      sources: [
        'Labor market institutions research',
        'Social protection and training',
      ],
    },
    rawls: {
      score: 0.8,
      reasoning: 'Vocational training primarily benefits workers without college degrees – a group that has seen stagnant wages and declining opportunities over decades. By providing pathways to good jobs without requiring expensive 4-year degrees, the policy targets those who have been left behind by the knowledge economy. J-PAL research shows properly designed programs can raise wages by ~15% for participants. The worst-off in the labor market gain the most from expanded training opportunities.',
      keyPoints: [
        'Benefits workers without college degrees',
        'Targets those left behind by knowledge economy',
        'Pathways to good jobs without expensive degrees',
        'J-PAL: ~15% wage gains from good programs',
        'Worst-off in labor market gain most',
      ],
      sources: [
        'J-PAL vocational training meta-analysis',
        'Non-college worker wage trends',
      ],
    },
    george: {
      score: 0.5,
      reasoning: 'Vocational training does not directly address land or economic rent. It focuses on human capital rather than taxing unearned income. However, it does shift investment toward productive capacity (skilled workers) rather than rent-seeking activities. One could argue it indirectly supports Georgist goals by making labor more productive and valuable relative to passive income sources. But this is not a primary feature of the policy.',
      keyPoints: [
        'Does not directly address land or rent',
        'Focuses on human capital investment',
        'Shifts investment toward productive capacity',
        'Indirectly supports productive vs passive income',
        'Not a primary Georgist policy',
      ],
      sources: [],
    },
    acemoglu: {
      score: 0.9,
      reasoning: 'Vocational training is highly inclusive: it creates pathways to economic participation for those who might otherwise be excluded. Workers without college degrees, those in declining industries, and young people without family connections to good jobs all gain access to opportunities. The policy lowers barriers to entry into skilled occupations and spreads the benefits of economic growth more broadly. It is fundamentally about expanding who can participate in the productive economy.',
      keyPoints: [
        'Creates pathways for those otherwise excluded',
        'Workers without degrees gain access to good jobs',
        'Lowers barriers to skilled occupations',
        'Spreads benefits of growth more broadly',
        'Expands economic participation',
      ],
      sources: [
        'Acemoglu - Inclusive institutions',
        'Economic mobility research',
      ],
    },
    walzer: {
      score: 0.7,
      reasoning: 'Vocational training distributes economic opportunity based on willingness to learn and work rather than solely on existing wealth or credentials. It uses appropriate criteria for the sphere of work: demonstrated capability and effort. However, access to training programs should itself be fair – if slots are limited, distribution by lottery or need is more sphere-appropriate than by ability to pay. The policy moves toward meritocratic distribution of work opportunities.',
      keyPoints: [
        'Distributes opportunity by willingness to learn',
        'Uses appropriate criteria: capability and effort',
        'Access to training should be fair',
        'Moves toward meritocratic distribution',
        'Work opportunities based on skill, not just credentials',
      ],
      sources: [
        'Walzer - Spheres of Justice',
        'Meritocracy and training access',
      ],
    },
  },
  modifiers: [
    {
      id: 'outcome-based-funding',
      name: 'Outcome-Based Funding',
      description: 'Tie funding to job placement and wage outcomes rather than enrollment',
      factorChanges: { olson: 0.15, downs: 0.1 },
    },
    {
      id: 'employer-co-investment',
      name: 'Employer Co-Investment Required',
      description: 'Require employers to co-fund training for their workers',
      factorChanges: { hayek: 0.1, olson: 0.1, buchanan: -0.05 },
    },
    {
      id: 'portable-credentials',
      name: 'Portable National Credentials',
      description: 'Create nationally recognized credentials that transfer across employers',
      factorChanges: { pettit: 0.1, hirschman: 0.1 },
    },
  ],
};
