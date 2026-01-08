/**
 * Problem Areas Data
 *
 * The 6 core problem areas users can explore and rate implementation approaches for.
 */

import type { ProblemArea } from '@/types/problem-areas';

export const problemAreas: ProblemArea[] = [
  {
    id: 'healthcare-costs',
    title: 'Healthcare Costs',
    shortTitle: 'Healthcare',
    description:
      'Americans pay more for healthcare than any other developed nation — about $13,000 per person annually — yet have worse outcomes on many measures. Medical debt is the leading cause of bankruptcy. Many people avoid care because of cost, ration medications, or stay in jobs they hate for insurance.',
    icon: 'HeartPulse',
    color: '#C91A2B',
    coreQuestion:
      'How should we make healthcare affordable and accessible for all Americans?',
    consensus:
      'Healthcare costs too much. The system is confusing and frustrating. Something should change.',
    disagreement:
      'Why it costs so much and what should change. Is it too much government or too little? Can healthcare function as a market? How much disruption is acceptable?',
    approachCount: 5,
    order: 1,
  },
  {
    id: 'housing-affordability',
    title: 'Housing Affordability',
    shortTitle: 'Housing',
    description:
      'Housing costs have risen faster than wages for decades. Many Americans spend more than 30% of income on housing, limiting savings, economic mobility, and family stability. The median home price is now over 5x median household income nationally, and significantly higher in major metros.',
    icon: 'Home',
    color: '#2F3BBD',
    coreQuestion:
      'How should we ensure Americans can afford safe, stable housing?',
    consensus:
      'Housing costs are too high. Something should be done.',
    disagreement:
      'What should be done — different approaches reflect different values about markets, government, and community. Help current residents or make room for new ones? Immediate relief or systemic change?',
    approachCount: 5,
    order: 2,
  },
  {
    id: 'childcare-family',
    title: 'Childcare & Family Support',
    shortTitle: 'Childcare',
    description:
      'Childcare costs have soared while wages have stagnated. Many families spend more on childcare than rent. Parents face impossible choices between careers and caregiving. The US is an outlier among developed nations in lacking universal paid leave or childcare support.',
    icon: 'Baby',
    color: '#7C3AED',
    coreQuestion:
      'How should we support families with young children?',
    consensus:
      'Raising children is hard and expensive. Families need more support. Something should change.',
    disagreement:
      'Should government provide childcare directly, subsidize it, or give families cash to choose? Who should pay? Should we incentivize work or support stay-at-home parenting equally?',
    approachCount: 5,
    order: 3,
  },
  {
    id: 'democratic-reform',
    title: 'Democratic Reform',
    shortTitle: 'Democracy',
    description:
      'Many Americans feel the political system doesn\'t represent them. Voter turnout lags other democracies. Gerrymandering creates "safe seats." Big money dominates campaigns. Trust in elections has declined.',
    icon: 'Vote',
    color: '#0891B2',
    coreQuestion:
      'How should we make our democracy work better for everyone?',
    consensus:
      'The system isn\'t working as well as it should. Politicians are too focused on donors and partisans. Many people\'s votes don\'t seem to matter.',
    disagreement:
      'What\'s broken and how to fix it. Some see voter suppression; others see voter fraud. Some want more participation; others want more security. Implementation approaches reflect genuinely different theories of the problem.',
    approachCount: 5,
    order: 4,
  },
  {
    id: 'economic-opportunity',
    title: 'Economic Opportunity & Wages',
    shortTitle: 'Economy',
    description:
      'Wages for most American workers have stagnated for decades when adjusted for inflation, even as productivity and corporate profits have grown. Many full-time workers can\'t afford basic expenses. Economic mobility — the chance that your kids do better than you — has declined.',
    icon: 'TrendingUp',
    color: '#059669',
    coreQuestion:
      'How should we ensure that work pays enough to live a decent life?',
    consensus:
      'Working people should be able to afford a decent life. The economy isn\'t working for everyone. Something is broken when full-time workers need food stamps.',
    disagreement:
      'Why wages have stagnated and what to do about it. Is it globalization, automation, weak unions, or bad policy? Should we raise wages directly, subsidize low earners, or focus on skills?',
    approachCount: 5,
    order: 5,
  },
  {
    id: 'education-quality',
    title: 'Education Quality',
    shortTitle: 'Education',
    description:
      'American K-12 education produces widely unequal outcomes. Students in wealthy districts attend well-resourced schools; students in poor districts often don\'t. Teachers are underpaid and leaving the profession. Parents feel they have little say in what their children learn.',
    icon: 'GraduationCap',
    color: '#EA580C',
    coreQuestion:
      'How should we ensure every child gets a quality education?',
    consensus:
      'Every child deserves a quality education. Too many schools are failing. Teachers matter enormously. Something needs to change.',
    disagreement:
      'What quality means, why schools struggle, and who should control education. Is it about money, choice, curriculum, accountability, or parents? These reflect different visions of childhood, community, and democracy.',
    approachCount: 5,
    order: 6,
  },
];

/**
 * Get problem area IDs in order
 */
export const problemAreaIds = problemAreas.map((area) => area.id);
