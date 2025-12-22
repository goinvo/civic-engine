/**
 * V2 Economics Lens Questionnaire
 *
 * 13 questions mapping to the 13 political economy factors.
 * Each question probes the user's priorities in policy evaluation.
 */

import { V2Factor } from '@/types/consensus';

export interface V2Question {
  id: string;
  factor: V2Factor;
  text: string;
  explanation: string;
  lowLabel: string;
  highLabel: string;
}

export const V2_QUESTIONS: V2Question[] = [
  // Group A: Mechanics & Structure
  {
    id: 'v2_q_hayek',
    factor: 'hayek',
    text: 'Government agencies can coordinate complex systems like healthcare or energy better than markets and local actors can.',
    explanation: 'This measures your view on centralized vs. decentralized decision-making.',
    lowLabel: 'Prefer central planning',
    highLabel: 'Trust distributed knowledge',
  },
  {
    id: 'v2_q_ostrom',
    factor: 'ostrom',
    text: 'Most policy problems should be solved at the federal level to ensure consistency across states.',
    explanation: 'This measures whether you prefer centralized or locally-matched governance.',
    lowLabel: 'Federal solutions',
    highLabel: 'Local governance',
  },
  {
    id: 'v2_q_downs',
    factor: 'downs',
    text: 'I am comfortable with policies that have complex trade-offs, even if most voters cannot fully understand them.',
    explanation: 'This measures how much you value transparency and legibility in policy.',
    lowLabel: 'Accept complexity',
    highLabel: 'Demand clarity',
  },
  {
    id: 'v2_q_olson',
    factor: 'olson',
    text: 'Special interest groups like industry lobbies are a natural part of democracy that we should work with, not against.',
    explanation: 'This measures your concern about policies being captured by concentrated interests.',
    lowLabel: 'Accept lobbying',
    highLabel: 'Resist capture',
  },
  {
    id: 'v2_q_keynes',
    factor: 'keynes',
    text: 'During economic downturns, government should cut spending just like households do.',
    explanation: 'This measures whether you value counter-cyclical stabilization.',
    lowLabel: 'Cut in downturns',
    highLabel: 'Stabilize economy',
  },

  // Group B: Rights & Dynamics
  {
    id: 'v2_q_pettit',
    factor: 'pettit',
    text: 'It is acceptable for workers to depend heavily on a single employer or landlord if they chose that arrangement voluntarily.',
    explanation: 'This measures how much you value freedom from arbitrary power.',
    lowLabel: 'Accept dependence',
    highLabel: 'Ensure independence',
  },
  {
    id: 'v2_q_hirschman',
    factor: 'hirschman',
    text: 'If a government program is failing citizens, they should just vote for better politicians rather than being able to opt out.',
    explanation: 'This measures whether you value exit options and voice mechanisms.',
    lowLabel: 'Voice through voting',
    highLabel: 'Exit and alternatives',
  },
  {
    id: 'v2_q_buchanan',
    factor: 'buchanan',
    text: 'It is acceptable for a policy to create clear losers (like displaced workers) if it benefits the majority.',
    explanation: 'This measures how much you value consent and compensation for those harmed.',
    lowLabel: 'Majority rules',
    highLabel: 'Compensate losers',
  },
  {
    id: 'v2_q_polanyi',
    factor: 'polanyi',
    text: 'Healthcare, housing, and basic food should be treated like any other market good, with prices set by supply and demand.',
    explanation: 'This measures whether you want to buffer essential needs from pure market logic.',
    lowLabel: 'Market pricing',
    highLabel: 'Protect essentials',
  },

  // Group C: Justice & Distribution
  {
    id: 'v2_q_rawls',
    factor: 'rawls',
    text: 'A policy that grows the economy by 5% is good even if all the gains go to the top 10%.',
    explanation: 'This measures whether you prioritize helping those at the bottom.',
    lowLabel: 'Growth matters most',
    highLabel: 'Help worst-off first',
  },
  {
    id: 'v2_q_george',
    factor: 'george',
    text: 'Taxes on land, inheritance, and monopoly profits are more harmful than taxes on wages and business activity.',
    explanation: 'This measures whether you prefer taxing rents vs. productive activity.',
    lowLabel: 'Tax all equally',
    highLabel: 'Target unearned wealth',
  },
  {
    id: 'v2_q_acemoglu',
    factor: 'acemoglu',
    text: 'Regulations that make it harder to start new businesses are acceptable if they protect existing jobs and industries.',
    explanation: 'This measures whether you value inclusive institutions that lower barriers.',
    lowLabel: 'Protect incumbents',
    highLabel: 'Open opportunity',
  },
  {
    id: 'v2_q_walzer',
    factor: 'walzer',
    text: 'It is fine for wealthy people to buy better healthcare, education, or legal representation than others can afford.',
    explanation: 'This measures whether money should determine access to essential goods.',
    lowLabel: 'Money talks',
    highLabel: 'Separate spheres',
  },
];

// Likert scale labels for V2
export const V2_LIKERT_LABELS = {
  1: 'Strongly Disagree',
  2: 'Disagree',
  3: 'Neutral',
  4: 'Agree',
  5: 'Strongly Agree',
};

// Question ID to factor mapping for quick lookup
export const V2_QUESTION_FACTOR_MAP: Record<string, V2Factor> = V2_QUESTIONS.reduce(
  (acc, q) => ({ ...acc, [q.id]: q.factor }),
  {} as Record<string, V2Factor>
);
