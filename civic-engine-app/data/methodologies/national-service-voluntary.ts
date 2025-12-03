import { PolicyMethodology } from './index';

export const nationalServiceVoluntary: PolicyMethodology = {
  policyId: 'national-service-voluntary',
  policyName: 'National Service (Voluntary)',
  description: 'Expand voluntary national service programs (like AmeriCorps) with significant incentives including education benefits, living wages, and career pathways.',
  overallRationale: 'Voluntary national service scores high on inclusivity (Acemoglu), sphere justice (Walzer), and consent (Buchanan). It provides pathways for all young people while addressing unmet community needs. 80% bipartisan support reflects broad appeal of voluntary civic engagement.',
  factors: {
    hayek: {
      score: 0.6,
      reasoning: 'Voluntary participation respects individual choice. Local program design leverages community knowledge. Federal funding with local implementation balances central resources and local knowledge.',
      keyPoints: [
        'Voluntary: respects individual choice',
        'Local organizations design programs',
        'Federal funding, local implementation',
        'Participants choose service areas',
      ],
      sources: [
        'AmeriCorps program structure',
        'Voluntary service literature',
      ],
    },
    ostrom: {
      score: 0.8,
      reasoning: 'Excellent polycentric design: federal funding and standards, local/nonprofit implementation, community-identified needs. Matches scale of funding to scope while localizing service.',
      keyPoints: [
        'Federal funding for national infrastructure',
        'Local nonprofits implement programs',
        'Communities identify service needs',
        'Multiple levels of governance working together',
      ],
      sources: [
        'AmeriCorps partnership model',
        'Community service organization structure',
      ],
    },
    downs: {
      score: 0.7,
      reasoning: 'Simple core concept: "Serve your community, get education benefits." However, multiple program types and eligibility create some complexity.',
      keyPoints: [
        'Core message clear: service for benefits',
        'Multiple program pathways add complexity',
        'GI Bill-style benefits easy to understand',
        'Application process could be streamlined',
      ],
      sources: [
        'AmeriCorps program marketing',
        'Service program participation data',
      ],
    },
    olson: {
      score: 0.6,
      reasoning: 'Broad bipartisan support (80%) provides political protection. No concentrated opposition. Some risk of program capture by large nonprofit organizations.',
      keyPoints: [
        '80% bipartisan support',
        'No organized opposition',
        'Risk: large nonprofits dominate programs',
        'Broad benefit (young people) creates constituency',
      ],
      sources: [
        'Polling on national service',
        'Program participation demographics',
      ],
    },
    keynes: {
      score: 0.6,
      reasoning: 'Could be modestly counter-cyclical if expanded during recessions when young people face limited job prospects. Provides employment alternative.',
      keyPoints: [
        'Could expand in recessions when jobs scarce',
        'Provides income during economic downturns',
        'Not automatic but could be designed as stabilizer',
        'Alternative to unemployment for young people',
      ],
      sources: [
        'Youth unemployment and service',
        'Counter-cyclical service expansion proposals',
      ],
    },
    pettit: {
      score: 0.7,
      reasoning: 'Voluntary nature ensures non-domination. Provides pathway for those without resources. Education benefits reduce future dependence. Creates independent citizens.',
      keyPoints: [
        'Voluntary: no coercion',
        'Pathway for those without college resources',
        'Education benefits increase future independence',
        'Living wage during service prevents exploitation',
      ],
      sources: [
        'AmeriCorps living allowance',
        'Education benefit structure',
      ],
    },
    hirschman: {
      score: 0.7,
      reasoning: 'Provides exit from limited options (dead-end jobs, unaffordable college). Creates voice through civic engagement. Participants develop community connections.',
      keyPoints: [
        'Exit from limited opportunity paths',
        'Voice through community engagement',
        'Builds civic skills for future participation',
        'Creates alternative to expensive higher education',
      ],
      sources: [
        'Service program outcomes',
        'Civic engagement research',
      ],
    },
    buchanan: {
      score: 0.8,
      reasoning: '80% bipartisan support represents strong consensus. Voluntary nature means no one compelled. Benefits flow broadly to participants and communities served.',
      keyPoints: [
        '80% overall bipartisan support',
        'Voluntary: only participants who choose to',
        'Communities benefit from service',
        'No clear losers except through opportunity cost',
      ],
      sources: [
        'Polling on national service',
        'Community impact studies',
      ],
    },
    polanyi: {
      score: 0.6,
      reasoning: 'Partially de-commodifies young adult transition by providing non-market pathway. Service valued for civic contribution, not market price. However, still provides market-valued benefits.',
      keyPoints: [
        'Non-market pathway for young adults',
        'Service valued for civic contribution',
        'Provides education access outside market',
        'Still operates with market incentives (stipend, benefits)',
      ],
      sources: [
        'Non-market service value',
        'Alternative to market pathways',
      ],
    },
    rawls: {
      score: 0.8,
      reasoning: 'Primarily benefits those without resources for college or career pathways. Provides floor for young people regardless of family wealth. Equalizes opportunity.',
      keyPoints: [
        'Pathway for those without college resources',
        'Education benefits regardless of family wealth',
        'Levels playing field for young adults',
        'Disproportionately benefits lower-income youth',
      ],
      sources: [
        'AmeriCorps participant demographics',
        'Educational mobility research',
      ],
    },
    george: {
      score: 0.3,
      reasoning: 'Spending program, not rent-targeting. General revenue funding. Does not specifically capture economic rent.',
      keyPoints: [
        'Spending program, not tax reform',
        'General revenue funding',
        'Does not target rent',
        'Could be paired with rent-based funding',
      ],
      sources: [],
    },
    acemoglu: {
      score: 0.9,
      reasoning: 'Highly inclusive: creates pathway for all young people regardless of background. Reduces barriers to education and career. Builds human capital broadly.',
      keyPoints: [
        'Open to all young people',
        'Removes financial barriers to advancement',
        'Builds human capital across backgrounds',
        'Creates inclusive civic institution',
      ],
      sources: [
        'Acemoglu - Human capital and institutions',
        'Service program accessibility',
      ],
    },
    walzer: {
      score: 0.8,
      reasoning: 'Distributes civic service opportunity by willingness to serve, not wealth. Education benefits earned through service, not purchased. Appropriate criteria for civic sphere.',
      keyPoints: [
        'Service opportunity by willingness, not wealth',
        'Education earned through civic contribution',
        'Separates advancement from family resources',
        'Appropriate civic sphere distribution',
      ],
      sources: [
        'Walzer - Spheres of Justice',
        'Civic service and education access',
      ],
    },
  },
  modifiers: [
    {
      id: 'universal-option',
      name: 'Universal Service Option',
      description: 'Guarantee service slot for every young person who wants one',
      factorChanges: { acemoglu: 0.1, rawls: 0.1 },
    },
    {
      id: 'enhanced-benefits',
      name: 'Enhanced Education Benefits',
      description: 'Increase education benefits to full tuition equivalent',
      factorChanges: { rawls: 0.1, pettit: 0.1 },
    },
  ],
};
