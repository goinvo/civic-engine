import { Archetype, Question, WeightProfile } from '@/types/values';

// Bibliography for archetype philosophical foundations
export const BIBLIOGRAPHY = [
  {
    key: 'bentham1789',
    citation: 'Bentham, Jeremy. *An Introduction to the Principles of Morals and Legislation*. 1789. Clarendon Press, 1907.',
    url: 'https://oll.libertyfund.org/titles/bentham-an-introduction-to-the-principles-of-morals-and-legislation',
    archetypes: ['optimizer'],
  },
  {
    key: 'mill1863',
    citation: 'Mill, John Stuart. *Utilitarianism*. 2nd ed., Hackett Publishing, 2001.',
    url: 'https://cmc.marmot.org/Record/.b31098083',
    archetypes: ['optimizer'],
  },
  {
    key: 'driver2009',
    citation: 'Driver, Julia. "The History of Utilitarianism." *The Stanford Encyclopedia of Philosophy*, 2009.',
    url: 'https://plato.stanford.edu/entries/utilitarianism-history/',
    archetypes: ['optimizer'],
  },
  {
    key: 'rawls1971',
    citation: 'Rawls, John. *A Theory of Justice*. Revised ed., Harvard University Press, 1999.',
    url: 'https://www.hup.harvard.edu/file/feeds/PDF/9780674000780_sample.pdf',
    archetypes: ['advocate'],
  },
  {
    key: 'buchanan1984',
    citation: 'Buchanan, James M. "Politics Without Romance." *The Logical Foundations of Constitutional Liberty*. Vol. 1, The Collected Works of James M. Buchanan, Liberty Fund, 1999.',
    url: 'https://micros22.classes.ryansafner.com/readings/Buchanan-1984.pdf',
    archetypes: ['realist'],
  },
  {
    key: 'pressman1984',
    citation: 'Pressman, Jeffrey L., and Aaron B. Wildavsky. *Implementation: How Great Expectations in Washington Are Dashed in Oakland*. University of California Press, 1984.',
    url: 'https://archive.org/details/implementationho00pres',
    archetypes: ['realist'],
  },
  {
    key: 'coase1960',
    citation: 'Coase, R. H. "The Problem of Social Cost." *Journal of Law and Economics*, vol. 3, 1960, pp. 1–44.',
    url: 'https://www.sfu.ca/~wainwrig/Econ400/coase-socialcost.pdf',
    archetypes: ['futurist'],
  },
  {
    key: 'olson1965',
    citation: 'Olson, Mancur. *The Logic of Collective Action: Public Goods and the Theory of Groups*. Harvard University Press, 1965.',
    url: 'https://en.wikipedia.org/wiki/The_Logic_of_Collective_Action',
    archetypes: ['futurist'],
  },
  {
    key: 'meadows2008',
    citation: 'Meadows, Donella H. *Thinking in Systems: A Primer*. Chelsea Green Publishing, 2008.',
    url: 'https://en.wikipedia.org/wiki/Thinking_In_Systems:_A_Primer',
    archetypes: ['futurist'],
  },
  {
    key: 'stern2007',
    citation: 'Stern, Nicholas. *The Economics of Climate Change: The Stern Review*. Cambridge University Press, 2007.',
    url: 'https://assets.cambridge.org/97805217/00801/frontmatter/9780521700801_frontmatter.pdf',
    archetypes: ['futurist'],
  },
  {
    key: 'sen1999',
    citation: 'Sen, Amartya. *Development as Freedom*. Alfred A. Knopf, 1999.',
    url: 'https://en.wikipedia.org/wiki/Development_as_Freedom',
    archetypes: ['balanced'],
  },
  {
    key: 'nussbaum1993',
    citation: 'The Quality of Life. Edited by Martha Nussbaum and Amartya Sen, Clarendon Press / Oxford University Press, 1993.',
    url: 'https://chicagounbound.uchicago.edu/books/521/',
    archetypes: ['balanced'],
  },
  {
    key: 'parfit1984',
    citation: 'Parfit, Derek. *Reasons and Persons*. Oxford University Press, 1984.',
    url: 'https://en.wikipedia.org/wiki/Reasons_and_Persons',
    archetypes: ['balanced'],
  },
];

// The 5 Archetype Presets
export const ARCHETYPES: Archetype[] = [
  {
    id: 'optimizer',
    name: 'The Optimizer',
    description: 'I want policies that help the most people possible with maximum efficiency.',
    shortDescription: 'Maximum aggregate good',
    philosopher: 'Jeremy Bentham & John Stuart Mill',
    philosophyName: 'Classical Utilitarianism',
    philosophyDescription: 'You prioritize maximizing total welfare across the population. Like Bentham and Mill, you believe the best policy is one that creates "the greatest good for the greatest number." You focus on aggregate outcomes and efficient resource allocation.',
    weights: {
      population: 0.32,      // Very high - breadth of impact is primary
      economic: 0.28,        // Very high - resource efficiency
      intensity: 0.08,       // Low - individual depth less important
      duration: 0.10,
      equity: 0.06,          // Low - aggregate > distribution
      externalities: 0.08,
      implementation: 0.08,
    },
  },
  {
    id: 'advocate',
    name: 'The Advocate',
    description: 'I prioritize policies that protect the most vulnerable and address life-or-death issues.',
    shortDescription: 'Prioritize the vulnerable',
    philosopher: 'John Rawls',
    philosophyName: 'Rawlsian Justice',
    philosophyDescription: 'You align with Rawls\' "veil of ignorance" principle: evaluate policies by how they affect the worst-off. You prioritize equity and individual impact over aggregate efficiency, believing a just society measures success by how it treats those with the least.',
    weights: {
      population: 0.04,      // Very low - breadth doesn't matter
      economic: 0.04,        // Very low - money isn't the metric
      intensity: 0.36,       // Very high - depth of individual impact
      duration: 0.10,
      equity: 0.38,          // Very high - fairness for vulnerable
      externalities: 0.04,
      implementation: 0.04,
    },
  },
  {
    id: 'realist',
    name: 'The Realist',
    description: 'I want practical policies that can actually get implemented without getting stuck in bureaucracy.',
    shortDescription: 'Practical and feasible',
    philosopher: 'James Buchanan & Public Choice Theory',
    philosophyName: 'Pragmatic Institutionalism',
    philosophyDescription: 'You share Buchanan\'s skepticism about ambitious reforms. You value policies that account for real-world constraints: political feasibility, administrative capacity, and implementation costs. Perfect on paper means nothing if it can\'t survive the messy reality of governance.',
    weights: {
      population: 0.08,
      economic: 0.20,        // High - tangible economic results
      intensity: 0.08,
      duration: 0.08,
      equity: 0.08,
      externalities: 0.10,
      implementation: 0.38,  // Very high - can it actually happen?
    },
  },
  {
    id: 'futurist',
    name: 'The Futurist',
    description: 'I care about long-term structural change and managing systemic side effects.',
    shortDescription: 'Long-term thinking',
    philosopher: 'Ronald Coase & Mancur Olson',
    philosophyName: 'Systems Thinking & Collective Action',
    philosophyDescription: 'Like Coase and Olson, you think in terms of transaction costs, collective action problems, and long-run equilibria. You ask: "What second-order effects will this create? How does this reshape incentives? What institutions will this build or destroy over time?"',
    weights: {
      population: 0.06,
      economic: 0.06,
      intensity: 0.08,
      duration: 0.38,        // Very high - lasting change
      equity: 0.08,
      externalities: 0.30,   // Very high - ripple effects
      implementation: 0.04,
    },
  },
  {
    id: 'balanced',
    name: 'The Balanced',
    description: 'I weigh all dimensions equally, refusing to prioritize any single factor.',
    shortDescription: 'True multi-dimensional balance',
    philosopher: 'Amartya Sen',
    philosophyName: 'Capability Approach',
    philosophyDescription: 'You align with Sen\'s holistic framework: good policy isn\'t about maximizing one metric, but expanding human capabilities across multiple dimensions. You resist single-factor optimization and instead evaluate policies through a multi-dimensional lens of wellbeing, freedom, and opportunity.',
    weights: {
      population: 0.143,     // Equal weight across all 7 factors
      economic: 0.143,
      intensity: 0.143,
      duration: 0.143,
      equity: 0.143,
      externalities: 0.143,
      implementation: 0.142, // Slightly less to sum to 1.0
    },
  },
];

// The 7 Questions (Values Pulse Questionnaire)
export const QUESTIONS: Question[] = [
  {
    id: 'q_scope',
    factor: 'population',
    text: 'I prefer policies that help everyone a little bit over policies that help a few people a lot.',
    explanation: 'This measures whether you value wide reach vs. concentrated impact.',
  },
  {
    id: 'q_money',
    factor: 'economic',
    text: "If a policy doesn't move a significant amount of money or resources, it's not worth focusing on.",
    explanation: 'This measures how much you value economic scale.',
  },
  {
    id: 'q_depth',
    factor: 'intensity',
    text: 'We should focus on fixing life-or-death issues (like homelessness) before we worry about convenience issues.',
    explanation: 'This measures whether you prioritize depth of individual impact.',
  },
  {
    id: 'q_time',
    factor: 'duration',
    text: 'I am willing to accept pain today if it solves a problem permanently for the next generation.',
    explanation: 'This measures your time horizon preference.',
  },
  {
    id: 'q_equity',
    factor: 'equity',
    text: 'A policy is failing if it benefits the rich but leaves the poor behind, even if it grows the overall economy.',
    explanation: 'This measures how much you prioritize distributional justice.',
  },
  {
    id: 'q_systems',
    factor: 'externalities',
    text: 'I worry most about the unintended side effects (like pollution or cultural shifts) that come from new laws.',
    explanation: 'This measures your concern for systemic ripple effects.',
  },
  {
    id: 'q_risk',
    factor: 'implementation',
    text: 'I would rather support a boring, modest plan that is 100% guaranteed to work than a perfect plan that might get stuck in court.',
    explanation: 'This measures whether you prioritize feasibility over ambition.',
  },
];

// Default weights - adjusted to reflect average American priorities
// Boost intensity/equity (life-changing impacts matter most)
// Reduce population/economic (don't over-favor big-tent policies)
// Lower externalities (side effects matter less to average person)
// Lower implementation (don't penalize ambitious policies)
export const DEFAULT_WEIGHTS: WeightProfile = {
  population: 0.12,
  economic: 0.12,
  intensity: 0.20,
  duration: 0.16,
  equity: 0.20,
  externalities: 0.10,
  implementation: 0.10,
};

// Likert scale labels
export const LIKERT_LABELS = {
  1: 'Strongly Disagree',
  2: 'Disagree',
  3: 'Neutral',
  4: 'Agree',
  5: 'Strongly Agree',
};

// Factor display names
export const FACTOR_NAMES: Record<string, string> = {
  population: 'Population Reach',
  economic: 'Economic Scale',
  intensity: 'Individual Impact',
  duration: 'Time Horizon',
  equity: 'Equity & Justice',
  externalities: 'Side Effects',
  implementation: 'Feasibility',
};

// Factor descriptions
export const FACTOR_DESCRIPTIONS: Record<string, string> = {
  population: 'How many people are affected',
  economic: 'Volume of resources moved',
  intensity: 'Depth of impact on individuals',
  duration: 'How long the effects last',
  equity: 'How fairly benefits are distributed',
  externalities: 'Unintended consequences',
  implementation: 'Likelihood of successful execution',
};

// Value factors combined
export const VALUE_FACTORS = [
  { id: 'population', name: 'Population Reach', description: 'How many people are affected' },
  { id: 'economic', name: 'Economic Scale', description: 'Volume of resources moved' },
  { id: 'intensity', name: 'Individual Impact', description: 'Depth of impact on individuals' },
  { id: 'duration', name: 'Time Horizon', description: 'How long the effects last' },
  { id: 'equity', name: 'Equity & Justice', description: 'How fairly benefits are distributed' },
  { id: 'externalities', name: 'Side Effects', description: 'Unintended consequences' },
  { id: 'implementation', name: 'Feasibility', description: 'Likelihood of successful execution' },
];
