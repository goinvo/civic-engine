import { Archetype, Question, WeightProfile } from '@/types/values';

// The 5 Archetype Presets
export const ARCHETYPES: Archetype[] = [
  {
    id: 'optimizer',
    name: 'The Optimizer',
    description: 'I want policies that help the most people possible with maximum efficiency.',
    shortDescription: 'Maximum aggregate good',
    weights: {
      population: 0.25,      // High
      economic: 0.25,        // High
      intensity: 0.10,
      duration: 0.10,
      equity: 0.10,
      externalities: 0.10,
      implementation: 0.10,
    },
  },
  {
    id: 'advocate',
    name: 'The Advocate',
    description: 'I prioritize policies that protect the most vulnerable and address life-or-death issues.',
    shortDescription: 'Prioritize the vulnerable',
    weights: {
      population: 0.08,
      economic: 0.08,
      intensity: 0.30,       // High
      duration: 0.12,
      equity: 0.30,          // High
      externalities: 0.08,
      implementation: 0.04,
    },
  },
  {
    id: 'realist',
    name: 'The Realist',
    description: 'I want practical policies that can actually get implemented without getting stuck in bureaucracy.',
    shortDescription: 'Practical and feasible',
    weights: {
      population: 0.12,
      economic: 0.20,        // High
      intensity: 0.10,
      duration: 0.10,
      equity: 0.10,
      externalities: 0.10,
      implementation: 0.28,  // High
    },
  },
  {
    id: 'futurist',
    name: 'The Futurist',
    description: 'I care about long-term structural change and managing systemic side effects.',
    shortDescription: 'Long-term thinking',
    weights: {
      population: 0.10,
      economic: 0.10,
      intensity: 0.10,
      duration: 0.30,        // High
      equity: 0.12,
      externalities: 0.28,   // High
      implementation: 0.10,
    },
  },
  {
    id: 'balanced',
    name: 'The Balanced',
    description: 'I weigh all factors equally without strong preferences.',
    shortDescription: 'Equal consideration',
    weights: {
      population: 0.143,
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

// Default balanced weights
export const DEFAULT_WEIGHTS: WeightProfile = {
  population: 0.143,
  economic: 0.143,
  intensity: 0.143,
  duration: 0.143,
  equity: 0.143,
  externalities: 0.143,
  implementation: 0.142,
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
