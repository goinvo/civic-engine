import { PolicyMethodology } from './index';

export const raiseMinimumWage: PolicyMethodology = {
  policyId: 'raise-minimum-wage',
  policyName: 'Raise Minimum Wage to $17/hour',
  description: 'Increase the federal minimum wage to $17/hour indexed to inflation, phased in over several years. Federal policy in labor/economy with ~62% public support.',
  overallRationale: 'Raising the minimum wage scores exceptionally high on protection (Polanyi: 0.9) and the floor (Rawls: 0.9) by directly lifting wages for the lowest-paid workers. It performs well on non-domination (Pettit: 0.8) by reducing worker vulnerability to employer power. The policy faces trade-offs on information feasibility (Hayek: 0.4) due to price-setting concerns, though modern research on monopsony power suggests these concerns are overstated in many labor markets.',
  factors: {
    hayek: {
      score: 0.4,
      reasoning: 'A minimum wage is a government-imposed price floor, which Hayekians view skeptically as interfering with price signals that coordinate economic activity. However, the labor market is not a frictionless commodity market – workers have local knowledge about their own needs and circumstances that a pure wage reflects imperfectly. Modern economics recognizes employer monopsony power, meaning many labor markets are not truly competitive. In monopsonistic markets, minimum wages can actually improve outcomes by counteracting employer power. Still, the policy involves significant central determination of prices.',
      keyPoints: [
        'Price floor interferes with market wage signals',
        'Labor market is not frictionless commodity market',
        'Workers have local knowledge about their needs',
        'Monopsony power means markets are not purely competitive',
        'Central price-setting but in imperfect markets',
      ],
      sources: [
        'Cafe Hayek - minimum wage analysis',
        'Berkeley IRLE - monopsony research',
      ],
    },
    ostrom: {
      score: 0.5,
      reasoning: 'Minimum wage policy involves trade-offs in scale. A federal floor makes sense because labor markets are interconnected nationally and race-to-the-bottom dynamics can undermine state-level wages. However, cost of living varies enormously across regions – $17/hour means different things in rural Mississippi versus San Francisco. Ideal design might set a federal floor with regional adjustments, or allow states to go higher. Current proposal is national, which matches labor market integration but not cost-of-living variation.',
      keyPoints: [
        'Federal floor prevents race-to-the-bottom',
        'Labor markets interconnected nationally',
        'Cost of living varies enormously by region',
        '$17 means different things in different places',
        'Federal floor with state flexibility may be optimal',
      ],
      sources: [
        'Regional cost of living data',
        'State minimum wage variation studies',
      ],
    },
    downs: {
      score: 0.8,
      reasoning: 'The minimum wage is one of the most legible policies imaginable: if you work, you must be paid at least $X per hour. Employers know the rule, workers know their rights, enforcement is straightforward. The simplicity is a major advantage – there are no complex eligibility determinations, no bureaucratic intermediaries, no obscure formulas. The trade-off (potential job losses vs. higher wages) is visible and debated openly. Indexing to inflation adds slight complexity but maintains long-term legibility.',
      keyPoints: [
        'Extremely simple rule: minimum $X per hour',
        'Employers and workers both understand it',
        'Enforcement is straightforward',
        'No complex eligibility or bureaucracy',
        'Trade-offs are visible and openly debated',
      ],
      sources: [
        'Minimum wage enforcement studies',
        'Policy simplicity research',
      ],
    },
    olson: {
      score: 0.7,
      reasoning: 'The minimum wage is relatively resistant to capture because it is a simple, universal rule. There is no program to administer that can be captured by contractors, no exemptions to be lobbied for (though some exist for tipped workers, young workers, etc.). The main capture risk is in preventing or weakening the policy – business lobbies have historically fought minimum wage increases. But once enacted, the rule is hard to game. Broad-based benefits to millions of workers create a constituency that can defend the policy.',
      keyPoints: [
        'Simple universal rule is hard to capture',
        'No program administration to game',
        'Main capture risk is preventing increases',
        'Business lobbying against is transparent',
        'Broad worker constituency defends policy',
      ],
      sources: [
        'Minimum wage politics research',
        'Labor policy lobbying studies',
      ],
    },
    keynes: {
      score: 0.7,
      reasoning: 'The minimum wage has significant counter-cyclical properties. Low-wage workers have high marginal propensity to consume – they spend additional income rather than saving it. Raising wages for this group directly supports aggregate demand. During recessions, maintaining wage floors prevents deflationary spirals where falling wages lead to falling demand. The automatic nature of the floor means it does not require legislative action during downturns. Indexing to inflation further stabilizes purchasing power.',
      keyPoints: [
        'Low-wage workers spend additional income',
        'High marginal propensity to consume',
        'Supports aggregate demand directly',
        'Prevents deflationary wage spirals',
        'Inflation indexing stabilizes purchasing power',
      ],
      sources: [
        'EPI minimum wage and demand research',
        'Consumption patterns by income',
      ],
    },
    pettit: {
      score: 0.8,
      reasoning: 'The minimum wage directly reduces the arbitrary power of employers over workers. Without a floor, employers in low-wage labor markets can offer take-it-or-leave-it wages to workers with few options. This is a form of domination – the worker depends on the employer\'s discretion. A minimum wage sets a non-negotiable baseline that protects workers from the worst forms of exploitation. It provides a form of "F-you money" – workers can refuse truly degrading offers because some floor exists.',
      keyPoints: [
        'Reduces arbitrary employer power over wages',
        'Protects workers with few options',
        'Sets non-negotiable baseline against exploitation',
        'Workers can refuse degrading offers',
        'Limits dependence on employer discretion',
      ],
      sources: [
        'Pettit - non-domination theory',
        'Labor market power research',
      ],
    },
    hirschman: {
      score: 0.6,
      reasoning: 'The minimum wage primarily affects voice rather than exit. It gives workers leverage in wage negotiations by establishing a floor – they cannot be pushed below a certain point. This enhances voice within employment relationships. For exit, the effect is mixed: higher wages may reduce turnover (workers want to stay), but also give workers resources to leave bad situations. The policy does not directly create new exit options but makes staying less exploitative.',
      keyPoints: [
        'Establishes floor for wage negotiations',
        'Enhances voice within employment',
        'Higher wages may reduce turnover',
        'Resources to leave bad situations',
        'Does not create new exit options directly',
      ],
      sources: [
        'Worker turnover and wage studies',
        'Labor market mobility research',
      ],
    },
    buchanan: {
      score: 0.5,
      reasoning: 'The minimum wage has clear winners (low-wage workers who keep jobs and earn more) and potential losers (workers who might lose jobs, employers paying more, consumers facing higher prices). With ~62% support, it has majority but not overwhelming backing. The key empirical question is employment effects – modern research suggests minimal job losses in most markets, making this closer to a Pareto improvement than critics suggest. However, the existence of potential losers and ongoing debate means consent is contested.',
      keyPoints: [
        'Clear winners: low-wage workers who earn more',
        'Potential losers: some job losses, higher prices',
        '~62% public support – majority but contested',
        'Modern research: minimal employment effects',
        'Closer to Pareto than critics suggest',
      ],
      sources: [
        'Minimum wage employment research',
        'Public opinion polling',
      ],
    },
    polanyi: {
      score: 0.9,
      reasoning: 'The minimum wage is a classic example of society setting limits on the commodification of labor. It says that human work has inherent dignity and cannot be purchased below a certain price regardless of market conditions. This is precisely the Polanyian "double movement" – society protecting itself from the disembedding effects of pure market logic. The ILO\'s founding principle that "labour is not a commodity" is directly operationalized through minimum wage laws.',
      keyPoints: [
        'Sets limits on labor commodification',
        'Human work has inherent dignity',
        'Cannot be purchased below dignity floor',
        'Classic double movement protection',
        'ILO principle: labor is not a commodity',
      ],
      sources: [
        'Academia - Labour is Not a Commodity essay',
        'Polanyi - The Great Transformation',
      ],
    },
    rawls: {
      score: 0.9,
      reasoning: 'The minimum wage is almost definitionally a maximin policy – it directly raises the floor for the lowest-paid workers. Those earning minimum wage are among the worst-off in the labor market; raising their wages is exactly what the difference principle demands. EPI research shows the federal minimum wage has fallen to a poverty wage – full-time work at $7.25/hour leaves a family below the poverty line. Raising to $17/hour lifts millions out of poverty-level wages.',
      keyPoints: [
        'Directly raises floor for lowest-paid',
        'Minimum wage workers are worst-off in labor market',
        'Current $7.25 is below poverty threshold',
        '$17 lifts millions from poverty wages',
        'Exactly what difference principle demands',
      ],
      sources: [
        'EPI - minimum wage as poverty wage',
        'Rawls - A Theory of Justice',
      ],
    },
    george: {
      score: 0.4,
      reasoning: 'The minimum wage does not directly address land or economic rent – it focuses on labor income, not unearned income. From a Georgist perspective, it does not shift taxation from labor to rent-seeking. However, one could argue it indirectly supports Georgist goals by ensuring labor is fairly compensated, making the case for taxing unearned income more politically viable. But this is not a primary feature; the policy is orthogonal to land value taxation.',
      keyPoints: [
        'Does not address land or economic rent',
        'Focuses on labor income, not unearned',
        'Does not shift tax burden to rent-seekers',
        'Ensures labor fairly compensated',
        'Orthogonal to Georgist taxation goals',
      ],
      sources: [],
    },
    acemoglu: {
      score: 0.7,
      reasoning: 'The minimum wage contributes to inclusive institutions by ensuring that work provides a living and that economic growth is shared with those at the bottom. It prevents a race to the bottom in wages that could create an underclass of working poor. However, it does not directly address barriers to entry or create new opportunities – it improves the terms for those already in the labor market. For those excluded from employment, the benefits are indirect at best.',
      keyPoints: [
        'Ensures work provides a living',
        'Shares growth with bottom of labor market',
        'Prevents race to the bottom in wages',
        'Does not directly create new opportunities',
        'Benefits those in labor market, not excluded',
      ],
      sources: [
        'Acemoglu - Inclusive institutions',
        'Wage inequality research',
      ],
    },
    walzer: {
      score: 0.7,
      reasoning: 'The minimum wage asserts that the sphere of work should operate on criteria beyond pure market power. It says that wages should reflect some notion of fair compensation for labor, not just whatever employers can get away with paying. This is sphere-appropriate: work is not merely a commodity transaction but a social relationship with dignity implications. However, the specific level ($17) is somewhat arbitrary – there is no natural criterion for exactly where the floor should be.',
      keyPoints: [
        'Work sphere beyond pure market power',
        'Wages should reflect fair compensation',
        'Work is social relationship, not just transaction',
        'Dignity implications in employment',
        'Specific level is somewhat arbitrary',
      ],
      sources: [
        'Walzer - Spheres of Justice',
        'Work and dignity research',
      ],
    },
  },
  modifiers: [
    {
      id: 'regional-adjustment',
      name: 'Regional Cost-of-Living Adjustment',
      description: 'Adjust minimum wage based on regional cost of living',
      factorChanges: { ostrom: 0.2, hayek: 0.1, downs: -0.1 },
    },
    {
      id: 'small-business-phase-in',
      name: 'Extended Small Business Phase-In',
      description: 'Give small businesses longer to phase in the increase',
      factorChanges: { buchanan: 0.1, rawls: -0.05 },
    },
    {
      id: 'youth-subminimum',
      name: 'Youth Training Wage',
      description: 'Allow subminimum wage for young workers in first 90 days',
      factorChanges: { hayek: 0.1, rawls: -0.1, polanyi: -0.1 },
    },
  ],
};
