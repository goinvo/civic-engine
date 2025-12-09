/**
 * V3 Archetypes: Needs-Based Model Profiles
 *
 * These archetypes define different weighting preferences for the
 * Maslow-inspired need categories in the V3 scoring model.
 */

import { NeedCategory, NEED_CATEGORY_DEFINITIONS } from './v3Methodology';
import { V3ArchetypeId, V3NeedWeights } from '@/types/values';

export interface V3Archetype {
  id: V3ArchetypeId;
  name: string;
  description: string;
  shortDescription: string;
  philosopher?: string;
  philosophyName?: string;
  philosophyDescription?: string;
  weights: V3NeedWeights;
}

// Default weights from the V3 methodology
export const DEFAULT_V3_WEIGHTS: V3NeedWeights = {
  physiological: 0.25,
  safety: 0.30,
  community: 0.15,
  opportunity: 0.20,
  selfActualization: 0.10,
};

export const V3_ARCHETYPES: V3Archetype[] = [
  {
    id: 'balanced',
    name: 'Balanced',
    description: 'Uses the default Maslow-inspired weights that prioritize safety and physiological needs while still valuing community, opportunity, and self-actualization.',
    shortDescription: 'Default balanced weights',
    philosopher: 'Abraham Maslow',
    philosophyName: 'Hierarchy of Needs',
    philosophyDescription: 'Human needs form a hierarchy where basic physiological and safety needs must be met before higher-level needs like belonging, esteem, and self-actualization can be pursued.',
    weights: { ...DEFAULT_V3_WEIGHTS },
  },
  {
    id: 'survivalist',
    name: 'Survivalist',
    description: 'Prioritizes policies that address basic survival needs - food, shelter, healthcare, and physical/financial security. Believes government should focus on ensuring everyone has their fundamental needs met.',
    shortDescription: 'Focus on basic survival needs',
    philosopher: 'Thomas Hobbes',
    philosophyName: 'Social Contract for Security',
    philosophyDescription: 'The primary purpose of government is to provide security and protect citizens from a "nasty, brutish, and short" existence in the state of nature.',
    weights: {
      physiological: 0.40,
      safety: 0.35,
      community: 0.10,
      opportunity: 0.10,
      selfActualization: 0.05,
    },
  },
  {
    id: 'communitarian',
    name: 'Communitarian',
    description: 'Values policies that strengthen social bonds, civic participation, and economic opportunity. Believes thriving communities and accessible opportunities are key to human flourishing.',
    shortDescription: 'Community and opportunity focused',
    philosopher: 'Amitai Etzioni',
    philosophyName: 'Communitarianism',
    philosophyDescription: 'Individual rights must be balanced with social responsibilities. Strong communities provide the foundation for individual development and collective well-being.',
    weights: {
      physiological: 0.15,
      safety: 0.20,
      community: 0.30,
      opportunity: 0.25,
      selfActualization: 0.10,
    },
  },
  {
    id: 'idealist',
    name: 'Idealist',
    description: 'Emphasizes policies that enable human potential - education, arts, creativity, and personal growth. Believes once basic needs are met, society should invest in helping people reach their full potential.',
    shortDescription: 'Human potential and fulfillment',
    philosopher: 'John Stuart Mill',
    philosophyName: 'Higher Pleasures',
    philosophyDescription: 'Human happiness comes not just from satisfying basic needs but from developing our higher faculties - intellectual, aesthetic, and moral capacities.',
    weights: {
      physiological: 0.15,
      safety: 0.15,
      community: 0.25,
      opportunity: 0.20,
      selfActualization: 0.25,
    },
  },
  {
    id: 'pragmatist',
    name: 'Pragmatist',
    description: 'Focuses on safety, security, and practical economic opportunity. Values policies that provide stability and clear pathways to advancement without ideological excess.',
    shortDescription: 'Security and practical opportunity',
    philosopher: 'John Dewey',
    philosophyName: 'Pragmatic Democracy',
    philosophyDescription: 'Policy should be judged by its practical consequences. Focus on what works to improve security and expand opportunity rather than abstract principles.',
    weights: {
      physiological: 0.20,
      safety: 0.35,
      community: 0.10,
      opportunity: 0.30,
      selfActualization: 0.05,
    },
  },
];

/**
 * Get a V3 archetype by ID
 */
export function getV3Archetype(id: V3ArchetypeId): V3Archetype | undefined {
  return V3_ARCHETYPES.find(a => a.id === id);
}

/**
 * Get default V3 weights for a given archetype
 */
export function getV3ArchetypeWeights(id: V3ArchetypeId): V3NeedWeights {
  const archetype = getV3Archetype(id);
  return archetype?.weights || DEFAULT_V3_WEIGHTS;
}

/**
 * Need category display info for UI components
 */
export const V3_NEED_INFO: Record<NeedCategory, {
  name: string;
  description: string;
  icon: string;
  color: string;
}> = {
  physiological: {
    name: NEED_CATEGORY_DEFINITIONS.physiological.name,
    description: NEED_CATEGORY_DEFINITIONS.physiological.description,
    icon: '🏠',
    color: 'bg-emerald-500',
  },
  safety: {
    name: NEED_CATEGORY_DEFINITIONS.safety.name,
    description: NEED_CATEGORY_DEFINITIONS.safety.description,
    icon: '🛡️',
    color: 'bg-blue-500',
  },
  community: {
    name: NEED_CATEGORY_DEFINITIONS.community.name,
    description: NEED_CATEGORY_DEFINITIONS.community.description,
    icon: '🤝',
    color: 'bg-purple-500',
  },
  opportunity: {
    name: NEED_CATEGORY_DEFINITIONS.opportunity.name,
    description: NEED_CATEGORY_DEFINITIONS.opportunity.description,
    icon: '📈',
    color: 'bg-orange-500',
  },
  selfActualization: {
    name: NEED_CATEGORY_DEFINITIONS.selfActualization.name,
    description: NEED_CATEGORY_DEFINITIONS.selfActualization.description,
    icon: '✨',
    color: 'bg-pink-500',
  },
};

/**
 * Order for displaying need categories (matches Maslow hierarchy)
 */
export const NEED_CATEGORY_ORDER: NeedCategory[] = [
  'physiological',
  'safety',
  'community',
  'opportunity',
  'selfActualization',
];
