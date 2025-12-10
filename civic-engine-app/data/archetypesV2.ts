import {
  V2Archetype,
  V2Factor,
  V2FactorGroup,
  V2FactorInfo,
  V2WeightProfile,
  PolicyModifier,
  V2ArchetypeId,
} from '@/types/consensus';
import { ArchetypeId } from '@/types/values';

// ===========================================
// FACTOR GROUPINGS
// ===========================================

export const V2_FACTOR_GROUPS: Record<V2FactorGroup, V2Factor[]> = {
  mechanics: ['hayek', 'ostrom', 'downs', 'olson', 'keynes'],
  rights: ['pettit', 'hirschman', 'buchanan', 'polanyi'],
  justice: ['rawls', 'george', 'acemoglu', 'walzer'],
};

export const V2_FACTOR_GROUP_NAMES: Record<V2FactorGroup, string> = {
  mechanics: 'Mechanics & Structure',
  rights: 'Rights & Dynamics',
  justice: 'Justice & Distribution',
};

// ===========================================
// FACTOR METADATA
// ===========================================

export const V2_FACTOR_INFO: Record<V2Factor, V2FactorInfo> = {
  // Group A: Mechanics & Structure
  hayek: {
    id: 'hayek',
    name: 'Info Feasibility',
    thinker: 'Hayek',
    group: 'mechanics',
    lowAnchor: 'Central Planning: Requires bureaucratic omniscience',
    highAnchor: 'Decentralized: Relies on local price signals/knowledge',
    description: 'Does the policy leverage distributed knowledge or require centralized control?',
  },
  ostrom: {
    id: 'ostrom',
    name: 'Scale Match',
    thinker: 'Ostrom',
    group: 'mechanics',
    lowAnchor: 'Mismatched: Federal control of local issue (or vice versa)',
    highAnchor: 'Polycentric: Decision power matches the problem scope',
    description: 'Is governance authority aligned with the scale of the problem?',
  },
  downs: {
    id: 'downs',
    name: 'Legibility',
    thinker: 'Downs',
    group: 'mechanics',
    lowAnchor: 'Opaque: Complex, hidden costs, hard to audit',
    highAnchor: 'Clear: "If X then Y." Transparent trade-offs',
    description: 'Can citizens understand what the policy does and at what cost?',
  },
  olson: {
    id: 'olson',
    name: 'Anti-Capture',
    thinker: 'Olson',
    group: 'mechanics',
    lowAnchor: 'Vulnerable: Easy for lobbies/special interests to hijack',
    highAnchor: 'Robust: Sunset clauses, universal application, hard to game',
    description: 'Is the policy resistant to capture by concentrated interests?',
  },
  keynes: {
    id: 'keynes',
    name: 'Stability',
    thinker: 'Keynes',
    group: 'mechanics',
    lowAnchor: 'Pro-Cyclical: Amplifies economic shocks/volatility',
    highAnchor: 'Counter-Cyclical: Automatic stabilizer; dampens shocks',
    description: 'Does the policy stabilize or destabilize the economy during downturns?',
  },

  // Group B: Rights & Dynamics
  pettit: {
    id: 'pettit',
    name: 'Non-Domination',
    thinker: 'Pettit',
    group: 'rights',
    lowAnchor: 'Dependent: Creates reliance on arbitrary power (boss/state)',
    highAnchor: 'Independent: Provides "F-You Money" or unalienable rights',
    description: 'Does the policy reduce arbitrary power over individuals?',
  },
  hirschman: {
    id: 'hirschman',
    name: 'Exit/Voice',
    thinker: 'Hirschman',
    group: 'rights',
    lowAnchor: 'Trapped: No alternatives and no grievance mechanism',
    highAnchor: 'Agency: Easy to switch providers or easy to reform from within',
    description: 'Can people leave or change the system if it fails them?',
  },
  buchanan: {
    id: 'buchanan',
    name: 'Consent',
    thinker: 'Buchanan',
    group: 'rights',
    lowAnchor: 'Imposed: Creates distinct "losers" who are coerced',
    highAnchor: 'Pareto: Near-unanimous benefit; compensates losers',
    description: 'Does the policy have broad consent or create clear losers?',
  },
  polanyi: {
    id: 'polanyi',
    name: 'Protection',
    thinker: 'Polanyi',
    group: 'rights',
    lowAnchor: 'Commodified: Treats survival/humans purely as market inputs',
    highAnchor: 'Buffered: De-commodifies essentials (health, housing, food)',
    description: 'Does the policy protect people from pure market logic in essential areas?',
  },

  // Group C: Justice & Distribution
  rawls: {
    id: 'rawls',
    name: 'The Floor',
    thinker: 'Rawls',
    group: 'justice',
    lowAnchor: 'Regressive: Benefits accrue to the already advantaged',
    highAnchor: 'Maximin: Primary benefit flows to the worst-off',
    description: 'Does the policy prioritize improving conditions for those at the bottom?',
  },
  george: {
    id: 'george',
    name: 'Rent Target',
    thinker: 'George',
    group: 'justice',
    lowAnchor: 'Penalizes Labor: Taxes work, creation, or trade',
    highAnchor: 'Captures Rent: Taxes land, monopoly, or static wealth',
    description: 'Does the policy target unearned rents rather than productive activity?',
  },
  acemoglu: {
    id: 'acemoglu',
    name: 'Inclusivity',
    thinker: 'Acemoglu',
    group: 'justice',
    lowAnchor: 'Extractive: High barriers to entry; protects incumbents',
    highAnchor: 'Inclusive: Levels the playing field; lowers barriers',
    description: 'Does the policy open opportunities or protect existing power?',
  },
  walzer: {
    id: 'walzer',
    name: 'Sphere Justice',
    thinker: 'Walzer',
    group: 'justice',
    lowAnchor: 'Corrupt: Uses money to buy rights/justice/health',
    highAnchor: 'Appropriate: Uses correct logic for the good (Need vs. Merit)',
    description: 'Does the policy use the right criterion for distributing goods?',
  },
};

// All V2 factors in order
export const V2_FACTORS: V2Factor[] = [
  'hayek', 'ostrom', 'downs', 'olson', 'keynes',
  'pettit', 'hirschman', 'buchanan', 'polanyi',
  'rawls', 'george', 'acemoglu', 'walzer',
];

// ===========================================
// V2 ARCHETYPES
// ===========================================

export const V2_ARCHETYPES: V2Archetype[] = [
  {
    id: 'classical_liberal',
    name: 'The Classical Liberal',
    description: 'Prioritizes decentralized knowledge, consent, and taxing rents over labor. Skeptical of central planning and concentrated power.',
    philosopher: 'F.A. Hayek & James Buchanan',
    philosophyName: 'Spontaneous Order',
    philosophyDescription: 'Markets coordinate through price signals better than central planning. Constitutional constraints protect individual liberty from majoritarian excess.',
    thinkerBio: 'Friedrich Hayek (1899-1992) was an Austrian-British economist who won the Nobel Prize in 1974. His work emphasized that markets aggregate dispersed knowledge better than central planners ever could. James Buchanan (1919-2013) was an American economist who founded public choice theory, analyzing politics with the same self-interest assumptions used for markets. Together, they argued for constitutional limits on government power and skepticism toward centralized decision-making.',
    weights: {
      hayek: 0.20,
      buchanan: 0.15,
      pettit: 0.10,
      downs: 0.10,
      george: 0.10,
      olson: 0.10,
      ostrom: 0.10,
      hirschman: 0.10,
      keynes: 0.05,
      acemoglu: 0.0,
      walzer: 0.0,
      polanyi: 0.0,
      rawls: 0.0,
    },
  },
  {
    id: 'social_democrat',
    name: 'The Social Democrat',
    description: 'Prioritizes the safety net, stability, and helping the worst-off. Believes in buffering people from pure market logic.',
    philosopher: 'John Rawls & Karl Polanyi',
    philosophyName: 'Democratic Welfare State',
    philosophyDescription: 'The economy should be embedded in society, not the reverse. A just society maximizes the welfare of its least advantaged members.',
    thinkerBio: 'John Rawls (1921-2002) was an American political philosopher whose "A Theory of Justice" (1971) revived social contract theory. His "veil of ignorance" thought experiment asks what principles we would choose not knowing our place in society, leading to his "difference principle": inequalities are only justified if they benefit the worst-off. Karl Polanyi (1886-1964) was a Hungarian economic historian whose "The Great Transformation" argued that markets must be embedded in social institutions, not the reverse, to prevent social devastation.',
    weights: {
      rawls: 0.20,
      polanyi: 0.20,
      keynes: 0.15,
      acemoglu: 0.10,
      walzer: 0.10,
      hirschman: 0.10,
      pettit: 0.05,
      george: 0.05,
      ostrom: 0.05,
      hayek: 0.0,
      buchanan: 0.0,
      downs: 0.0,
      olson: 0.0,
    },
  },
  {
    id: 'civic_republican',
    name: 'The Civic Republican',
    description: 'Prioritizes non-domination, inclusive institutions, and active agency. Believes freedom means not being subject to arbitrary power.',
    philosopher: 'Philip Pettit & Daron Acemoglu',
    philosophyName: 'Freedom as Non-Domination',
    philosophyDescription: 'True freedom requires inclusive institutions that prevent any entity from wielding arbitrary power over citizens.',
    thinkerBio: 'Philip Pettit (b. 1945) is an Irish political philosopher at Princeton who revived republican political theory. His concept of "freedom as non-domination" argues that true liberty means not being subject to the arbitrary will of others—even a benevolent master diminishes freedom. Daron Acemoglu (b. 1967) is a Turkish-American economist at MIT whose work on institutions shows how "inclusive" versus "extractive" institutions determine whether nations prosper or fail. Together, they emphasize that freedom requires institutional design, not just absence of interference.',
    weights: {
      pettit: 0.25,
      acemoglu: 0.20,
      hirschman: 0.15,
      ostrom: 0.10,
      walzer: 0.10,
      buchanan: 0.10,
      downs: 0.05,
      polanyi: 0.05,
      hayek: 0.0,
      rawls: 0.0,
      george: 0.0,
      olson: 0.0,
      keynes: 0.0,
    },
  },
  {
    id: 'institutionalist',
    name: 'The Institutionalist',
    description: 'Focuses on system health, durability, and resistance to decay. Believes good institutions create good outcomes.',
    philosopher: 'Mancur Olson & Elinor Ostrom',
    philosophyName: 'Institutional Resilience',
    philosophyDescription: 'Long-term prosperity depends on institutions that resist capture, match problems to appropriate governance scales, and maintain legitimacy.',
    thinkerBio: 'Mancur Olson (1932-1998) was an American economist who explained why small, concentrated interests often defeat the public good: organizing costs matter. His work on collective action shows why institutions need explicit safeguards against capture. Elinor Ostrom (1933-2012) was an American political economist who won the Nobel Prize in 2009 for showing how communities can successfully manage common resources without privatization or government control—if institutions match the scale of the problem. Together, they emphasize institutional design as the key to sustainable governance.',
    weights: {
      olson: 0.25,
      ostrom: 0.15,
      downs: 0.15,
      hayek: 0.10,
      keynes: 0.10,
      acemoglu: 0.10,
      buchanan: 0.10,
      hirschman: 0.05,
      pettit: 0.0,
      polanyi: 0.0,
      rawls: 0.0,
      george: 0.0,
      walzer: 0.0,
    },
  },
];

// ===========================================
// DEFAULT WEIGHTS (Equal distribution)
// ===========================================

export const V2_DEFAULT_WEIGHTS: V2WeightProfile = {
  hayek: 0.077,
  ostrom: 0.077,
  downs: 0.077,
  olson: 0.077,
  keynes: 0.077,
  pettit: 0.077,
  hirschman: 0.077,
  buchanan: 0.077,
  polanyi: 0.077,
  rawls: 0.077,
  george: 0.077,
  acemoglu: 0.077,
  walzer: 0.076, // Slight adjustment to sum to 1.0
};

// ===========================================
// V1 TO V2 ARCHETYPE MAPPING
// ===========================================

export const V1_TO_V2_ARCHETYPE_MAP: Record<ArchetypeId, V2ArchetypeId> = {
  optimizer: 'classical_liberal',    // Efficiency/aggregate focus
  advocate: 'social_democrat',       // Equity/vulnerable focus
  realist: 'institutionalist',       // Implementation/feasibility focus
  futurist: 'civic_republican',      // Systems/externalities focus
  balanced: 'institutionalist',      // Default mapping
  custom: 'custom_v2',
};

// ===========================================
// POLICY MODIFIERS
// ===========================================

export const POLICY_MODIFIERS: PolicyModifier[] = [
  // Funding modifiers
  {
    id: 'fund-lvt',
    name: 'Fund via Land Value Tax',
    category: 'funding',
    description: 'Fund the policy by taxing land rents rather than income or sales.',
    delta: { george: 0.4, buchanan: 0.1, olson: 0.1 },
  },
  {
    id: 'fund-income-tax',
    name: 'Fund via Income Tax',
    category: 'funding',
    description: 'Fund the policy through progressive income taxation.',
    delta: { george: -0.2, rawls: 0.1, polanyi: 0.05 },
  },
  {
    id: 'fund-deficit',
    name: 'Fund via Deficit Spending',
    category: 'funding',
    description: 'Fund the policy through government borrowing.',
    delta: { keynes: 0.2, buchanan: -0.2, olson: -0.1 },
  },

  // Implementation modifiers
  {
    id: 'impl-federal-mandate',
    name: 'Federal Mandate',
    category: 'implementation',
    description: 'Implement as a federal requirement on all states.',
    delta: { ostrom: -0.3, hayek: -0.2, buchanan: -0.1 },
  },
  {
    id: 'impl-state-option',
    name: 'State Option (Block Grants)',
    category: 'implementation',
    description: 'Allow states to opt in and customize implementation.',
    delta: { ostrom: 0.3, hayek: 0.2, downs: -0.1 },
  },
  {
    id: 'impl-public-private',
    name: 'Public-Private Partnership',
    category: 'implementation',
    description: 'Implement through collaboration with private sector.',
    delta: { hayek: 0.2, olson: -0.2, hirschman: 0.1 },
  },

  // Enforcement modifiers
  {
    id: 'enforce-automatic',
    name: 'Automatic Enrollment',
    category: 'enforcement',
    description: 'Default people into the program with opt-out option.',
    delta: { buchanan: -0.15, keynes: 0.1, polanyi: 0.15 },
  },
  {
    id: 'enforce-means-tested',
    name: 'Means-Tested Eligibility',
    category: 'enforcement',
    description: 'Restrict benefits to those who prove financial need.',
    delta: { rawls: 0.2, downs: -0.2, olson: -0.15 },
  },
  {
    id: 'enforce-universal',
    name: 'Universal Application',
    category: 'enforcement',
    description: 'Apply the policy equally to all citizens.',
    delta: { olson: 0.2, downs: 0.15, buchanan: 0.1, rawls: -0.1 },
  },

  // Timeline modifiers
  {
    id: 'time-sunset',
    name: 'Sunset Clause (5 years)',
    category: 'timeline',
    description: 'Policy automatically expires unless renewed by Congress.',
    delta: { olson: 0.25, buchanan: 0.15, hirschman: 0.1 },
  },
  {
    id: 'time-phase-in',
    name: 'Gradual Phase-In (10 years)',
    category: 'timeline',
    description: 'Implement the policy gradually over a decade.',
    delta: { buchanan: 0.1, keynes: -0.1, downs: 0.1 },
  },
  {
    id: 'time-immediate',
    name: 'Immediate Implementation',
    category: 'timeline',
    description: 'Full implementation within 1 year.',
    delta: { keynes: 0.15, buchanan: -0.1, downs: -0.05 },
  },
];

// ===========================================
// CONSENSUS STATE LABELS
// ===========================================

export const CONSENSUS_STATE_INFO = {
  'super-consensus': {
    label: 'Super-Consensus',
    description: 'All philosophical perspectives strongly support this policy.',
    color: 'green',
  },
  'hidden-agreement': {
    label: 'Hidden Agreement',
    description: 'Despite different priorities, all perspectives find merit in this policy.',
    color: 'gradient', // blue-to-red gradient
  },
  'battleground': {
    label: 'Battleground',
    description: 'Sharp disagreement between perspectives on this policy.',
    color: 'yellow',
  },
  'universal-reject': {
    label: 'Universal Reject',
    description: 'All perspectives rate this policy poorly.',
    color: 'red',
  },
  'mixed': {
    label: 'Mixed',
    description: 'Moderate variation in how perspectives view this policy.',
    color: 'gray',
  },
};
