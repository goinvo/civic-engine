'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  UserValuesProfile,
  WeightProfile,
  ArchetypeId,
  QuestionnaireResponses,
  LikertScale,
  ScoringModelVersion,
  V2QuestionnaireResponses,
  V3ArchetypeId,
  V3NeedWeights,
  V3QuestionnaireResponses,
  V4ArchetypeId,
  V4WeightProfile,
  V4QuestionnaireResponses,
} from '@/types/values';
import {
  V2ArchetypeId,
  V2WeightProfile,
  V2Factor,
} from '@/types/consensus';
import { DEFAULT_WEIGHTS, ARCHETYPES } from '@/data/values';
import {
  V2_ARCHETYPES,
  V2_DEFAULT_WEIGHTS,
  V2_FACTORS,
  V1_TO_V2_ARCHETYPE_MAP,
} from '@/data/archetypesV2';
import {
  V3_ARCHETYPES,
  DEFAULT_V3_WEIGHTS,
} from '@/data/archetypesV3';
import {
  V4_ARCHETYPES,
  DEFAULT_V4_WEIGHTS,
} from '@/data/v4Methodology';

interface ValuesContextType {
  profile: UserValuesProfile | null;
  setArchetype: (archetypeId: ArchetypeId) => void;
  updateResponse: (questionId: string, value: LikertScale) => void;
  calculateWeightsFromResponses: (responses: QuestionnaireResponses) => WeightProfile;
  saveProfile: (profile: UserValuesProfile) => void;
  clearProfile: () => void;
  hasCompletedOnboarding: boolean;

  // V2 scoring model support
  setScoringModel: (version: ScoringModelVersion) => void;
  setV2Archetype: (archetypeId: V2ArchetypeId) => void;
  updateV2Response: (questionId: string, value: LikertScale) => void;
  calculateV2WeightsFromResponses: (responses: V2QuestionnaireResponses) => V2WeightProfile;
  dismissAutoMapBanner: () => void;
  showAutoMapBanner: boolean;

  // V3 scoring model support
  setV3Archetype: (archetypeId: V3ArchetypeId) => void;
  saveV2Profile: (data: { v2ArchetypeId: V2ArchetypeId; v2Weights: V2WeightProfile; v2Responses?: V2QuestionnaireResponses; v2AutoMapped?: boolean }) => void;
  saveV3Profile: (data: { v3ArchetypeId: V3ArchetypeId; v3NeedWeights: V3NeedWeights; v3Responses?: V3QuestionnaireResponses }) => void;

  // V4 unified model support
  setV4Archetype: (archetypeId: V4ArchetypeId) => void;
  saveV4Profile: (data: { v4ArchetypeId: V4ArchetypeId; v4Weights: V4WeightProfile; v4Responses?: V4QuestionnaireResponses }) => void;
}

const ValuesContext = createContext<ValuesContextType | undefined>(undefined);

const STORAGE_KEY = 'civic-engine-values-profile';

export function ValuesProvider({ children }: { children: React.ReactNode }) {
  const [profile, setProfile] = useState<UserValuesProfile | null>(null);
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(false);
  const [showAutoMapBanner, setShowAutoMapBanner] = useState(false);

  // Load from localStorage on mount (with migration for legacy profiles)
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        // Migrate legacy profiles that don't have scoringModel field
        if (!parsed.scoringModel) {
          parsed.scoringModel = 'v1';
          parsed.updatedAt = new Date().toISOString();
        }
        setProfile(parsed);
        setHasCompletedOnboarding(true);
        // Show banner if user has auto-mapped v2 profile
        if (parsed.v2AutoMapped && parsed.scoringModel === 'v2') {
          setShowAutoMapBanner(true);
        }
      } catch (e) {
        console.error('Failed to parse stored values profile:', e);
      }
    }
  }, []);

  // Save to localStorage whenever profile changes
  useEffect(() => {
    if (profile) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
    }
  }, [profile]);

  const setArchetype = (archetypeId: ArchetypeId) => {
    const archetype = ARCHETYPES.find((a) => a.id === archetypeId);
    if (!archetype) return;

    const newProfile: UserValuesProfile = {
      archetypeId,
      weights: archetype.weights,
      responses: undefined,
      scoringModel: profile?.scoringModel || 'v1',
      // Preserve V2 fields if they exist
      v2ArchetypeId: profile?.v2ArchetypeId,
      v2Weights: profile?.v2Weights,
      v2Responses: profile?.v2Responses,
      v2AutoMapped: profile?.v2AutoMapped,
      createdAt: profile?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setProfile(newProfile);
    setHasCompletedOnboarding(true);
  };

  const updateResponse = (questionId: string, value: LikertScale) => {
    const newResponses = {
      ...(profile?.responses || {}),
      [questionId]: value,
    };

    // Recalculate weights from responses
    const newWeights = calculateWeightsFromResponses(newResponses);

    const newProfile: UserValuesProfile = {
      archetypeId: 'custom',
      weights: newWeights,
      responses: newResponses,
      scoringModel: profile?.scoringModel || 'v1',
      // Preserve V2 fields if they exist
      v2ArchetypeId: profile?.v2ArchetypeId,
      v2Weights: profile?.v2Weights,
      v2Responses: profile?.v2Responses,
      v2AutoMapped: profile?.v2AutoMapped,
      createdAt: profile?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setProfile(newProfile);
  };

  const calculateWeightsFromResponses = (responses: QuestionnaireResponses): WeightProfile => {
    // Start with baseline points
    const baselinePoints = 10;

    // Map Likert to multipliers
    const multipliers: Record<LikertScale, number> = {
      1: 0.5,
      2: 0.75,
      3: 1.0,
      4: 1.5,
      5: 2.0,
    };

    // Calculate points for each factor
    const points: Record<string, number> = {
      population: baselinePoints * multipliers[responses.q_scope || 3],
      economic: baselinePoints * multipliers[responses.q_money || 3],
      intensity: baselinePoints * multipliers[responses.q_depth || 3],
      duration: baselinePoints * multipliers[responses.q_time || 3],
      equity: baselinePoints * multipliers[responses.q_equity || 3],
      externalities: baselinePoints * multipliers[responses.q_systems || 3],
      implementation: baselinePoints * multipliers[responses.q_risk || 3],
    };

    // Normalize to weights (sum = 1.0)
    const total = Object.values(points).reduce((sum, p) => sum + p, 0);
    const weights: WeightProfile = {
      population: points.population / total,
      economic: points.economic / total,
      intensity: points.intensity / total,
      duration: points.duration / total,
      equity: points.equity / total,
      externalities: points.externalities / total,
      implementation: points.implementation / total,
    };

    return weights;
  };

  const saveProfile = (newProfile: UserValuesProfile) => {
    setProfile(newProfile);
    setHasCompletedOnboarding(true);
  };

  const clearProfile = () => {
    localStorage.removeItem(STORAGE_KEY);
    setProfile(null);
    setHasCompletedOnboarding(false);
    setShowAutoMapBanner(false);
  };

  // ===========================================
  // V2 SCORING MODEL FUNCTIONS
  // ===========================================

  /**
   * Switch between scoring models (v1, v2, or v3)
   * When switching to v2 without existing v2 profile, auto-map from v1
   * When switching to v3 without existing v3 profile, set default archetype
   */
  const setScoringModel = (version: ScoringModelVersion) => {
    if (!profile) return;

    const now = new Date().toISOString();

    // If switching to v2 and no v2 profile exists, auto-map from v1
    if (version === 'v2' && !profile.v2ArchetypeId) {
      const mappedV2ArchetypeId = V1_TO_V2_ARCHETYPE_MAP[profile.archetypeId];
      const v2Archetype = V2_ARCHETYPES.find((a) => a.id === mappedV2ArchetypeId);

      const newProfile: UserValuesProfile = {
        ...profile,
        scoringModel: 'v2',
        v2ArchetypeId: mappedV2ArchetypeId,
        v2Weights: v2Archetype?.weights || V2_DEFAULT_WEIGHTS,
        v2AutoMapped: true,
        updatedAt: now,
      };

      setProfile(newProfile);
      setShowAutoMapBanner(true);
    } else if (version === 'v3' && !profile.v3ArchetypeId) {
      // If switching to v3 and no v3 profile exists, set default balanced archetype
      const newProfile: UserValuesProfile = {
        ...profile,
        scoringModel: 'v3',
        v3ArchetypeId: 'balanced',
        v3NeedWeights: DEFAULT_V3_WEIGHTS,
        updatedAt: now,
      };

      setProfile(newProfile);
    } else if (version === 'v4' && !profile.v4ArchetypeId) {
      // If switching to v4 and no v4 profile exists, set default balanced archetype
      const newProfile: UserValuesProfile = {
        ...profile,
        scoringModel: 'v4',
        v4ArchetypeId: 'balanced',
        v4Weights: DEFAULT_V4_WEIGHTS,
        updatedAt: now,
      };

      setProfile(newProfile);
    } else {
      // Just switch the model
      setProfile({
        ...profile,
        scoringModel: version,
        updatedAt: now,
      });
    }
  };

  /**
   * Set V2 archetype directly
   */
  const setV2Archetype = (archetypeId: V2ArchetypeId) => {
    const archetype = V2_ARCHETYPES.find((a) => a.id === archetypeId);
    if (!archetype && archetypeId !== 'custom_v2') return;

    const now = new Date().toISOString();
    const weights = archetype?.weights || V2_DEFAULT_WEIGHTS;

    const newProfile: UserValuesProfile = {
      // Preserve V1 fields
      archetypeId: profile?.archetypeId || 'balanced',
      weights: profile?.weights || DEFAULT_WEIGHTS,
      responses: profile?.responses,
      // Update V2 fields
      scoringModel: 'v2',
      v2ArchetypeId: archetypeId,
      v2Weights: weights,
      v2Responses: undefined, // Clear responses when selecting preset archetype
      v2AutoMapped: false, // No longer auto-mapped since user chose explicitly
      createdAt: profile?.createdAt || now,
      updatedAt: now,
    };

    setProfile(newProfile);
    setShowAutoMapBanner(false);
    setHasCompletedOnboarding(true);
  };

  /**
   * Update V2 questionnaire response
   */
  const updateV2Response = (questionId: string, value: LikertScale) => {
    const newResponses: V2QuestionnaireResponses = {
      ...(profile?.v2Responses || {}),
      [questionId]: value,
    };

    // Recalculate V2 weights from responses
    const newWeights = calculateV2WeightsFromResponses(newResponses);

    const now = new Date().toISOString();
    const newProfile: UserValuesProfile = {
      // Preserve V1 fields
      archetypeId: profile?.archetypeId || 'balanced',
      weights: profile?.weights || DEFAULT_WEIGHTS,
      responses: profile?.responses,
      // Update V2 fields
      scoringModel: 'v2',
      v2ArchetypeId: 'custom_v2',
      v2Weights: newWeights,
      v2Responses: newResponses,
      v2AutoMapped: false,
      createdAt: profile?.createdAt || now,
      updatedAt: now,
    };

    setProfile(newProfile);
    setShowAutoMapBanner(false);
  };

  /**
   * Calculate V2 weights from questionnaire responses
   * Uses same Likert multiplier approach as V1
   */
  const calculateV2WeightsFromResponses = (responses: V2QuestionnaireResponses): V2WeightProfile => {
    const baselinePoints = 10;

    // Map Likert to multipliers
    const multipliers: Record<LikertScale, number> = {
      1: 0.5,
      2: 0.75,
      3: 1.0,
      4: 1.5,
      5: 2.0,
    };

    // Calculate points for each factor using v2_q_ prefix
    const points: Partial<Record<V2Factor, number>> = {};
    for (const factor of V2_FACTORS) {
      const questionId = `v2_q_${factor}`;
      const response = responses[questionId] as LikertScale | undefined;
      points[factor] = baselinePoints * multipliers[response || 3];
    }

    // Normalize to weights (sum = 1.0)
    const total = Object.values(points).reduce((sum, p) => sum + (p || 0), 0);

    const weights: V2WeightProfile = {
      hayek: (points.hayek || 0) / total,
      ostrom: (points.ostrom || 0) / total,
      downs: (points.downs || 0) / total,
      olson: (points.olson || 0) / total,
      keynes: (points.keynes || 0) / total,
      pettit: (points.pettit || 0) / total,
      hirschman: (points.hirschman || 0) / total,
      buchanan: (points.buchanan || 0) / total,
      polanyi: (points.polanyi || 0) / total,
      rawls: (points.rawls || 0) / total,
      george: (points.george || 0) / total,
      acemoglu: (points.acemoglu || 0) / total,
      walzer: (points.walzer || 0) / total,
    };

    return weights;
  };

  /**
   * Dismiss the auto-map banner
   */
  const dismissAutoMapBanner = () => {
    setShowAutoMapBanner(false);
  };

  // ===========================================
  // V3 SCORING MODEL FUNCTIONS
  // ===========================================

  /**
   * Set V3 archetype directly
   */
  const setV3Archetype = (archetypeId: V3ArchetypeId) => {
    const archetype = V3_ARCHETYPES.find((a) => a.id === archetypeId);
    if (!archetype && archetypeId !== 'custom_v3') return;

    const now = new Date().toISOString();
    const weights = archetype?.weights || DEFAULT_V3_WEIGHTS;

    const newProfile: UserValuesProfile = {
      // Preserve V1 fields
      archetypeId: profile?.archetypeId || 'balanced',
      weights: profile?.weights || DEFAULT_WEIGHTS,
      responses: profile?.responses,
      // Preserve V2 fields
      v2ArchetypeId: profile?.v2ArchetypeId,
      v2Weights: profile?.v2Weights,
      v2Responses: profile?.v2Responses,
      v2AutoMapped: profile?.v2AutoMapped,
      // Update V3 fields
      scoringModel: 'v3',
      v3ArchetypeId: archetypeId,
      v3NeedWeights: weights,
      createdAt: profile?.createdAt || now,
      updatedAt: now,
    };

    setProfile(newProfile);
    setHasCompletedOnboarding(true);
  };

  /**
   * Save V2 profile from questionnaire
   */
  const saveV2Profile = (data: {
    v2ArchetypeId: V2ArchetypeId;
    v2Weights: V2WeightProfile;
    v2Responses?: V2QuestionnaireResponses;
    v2AutoMapped?: boolean;
  }) => {
    const now = new Date().toISOString();

    const newProfile: UserValuesProfile = {
      // Preserve or set default V1 fields
      archetypeId: profile?.archetypeId || 'balanced',
      weights: profile?.weights || DEFAULT_WEIGHTS,
      responses: profile?.responses,
      // Set V2 fields
      scoringModel: 'v2',
      v2ArchetypeId: data.v2ArchetypeId,
      v2Weights: data.v2Weights,
      v2Responses: data.v2Responses,
      v2AutoMapped: data.v2AutoMapped || false,
      // Preserve V3 fields if they exist
      v3ArchetypeId: profile?.v3ArchetypeId,
      v3NeedWeights: profile?.v3NeedWeights,
      v3Responses: profile?.v3Responses,
      createdAt: profile?.createdAt || now,
      updatedAt: now,
    };

    setProfile(newProfile);
    setHasCompletedOnboarding(true);
    setShowAutoMapBanner(false);
  };

  /**
   * Save V3 profile from questionnaire
   */
  const saveV3Profile = (data: {
    v3ArchetypeId: V3ArchetypeId;
    v3NeedWeights: V3NeedWeights;
    v3Responses?: V3QuestionnaireResponses;
  }) => {
    const now = new Date().toISOString();

    const newProfile: UserValuesProfile = {
      // Preserve or set default V1 fields
      archetypeId: profile?.archetypeId || 'balanced',
      weights: profile?.weights || DEFAULT_WEIGHTS,
      responses: profile?.responses,
      // Preserve V2 fields if they exist
      v2ArchetypeId: profile?.v2ArchetypeId,
      v2Weights: profile?.v2Weights,
      v2Responses: profile?.v2Responses,
      v2AutoMapped: profile?.v2AutoMapped,
      // Set V3 fields
      scoringModel: 'v3',
      v3ArchetypeId: data.v3ArchetypeId,
      v3NeedWeights: data.v3NeedWeights,
      v3Responses: data.v3Responses,
      createdAt: profile?.createdAt || now,
      updatedAt: now,
    };

    setProfile(newProfile);
    setHasCompletedOnboarding(true);
  };

  // ===========================================
  // V4 UNIFIED MODEL FUNCTIONS
  // ===========================================

  /**
   * Set V4 archetype directly
   */
  const setV4Archetype = (archetypeId: V4ArchetypeId) => {
    const archetype = V4_ARCHETYPES.find((a) => a.id === archetypeId);
    if (!archetype && archetypeId !== 'custom_v4') return;

    const now = new Date().toISOString();
    const weights = archetype?.weights || DEFAULT_V4_WEIGHTS;

    const newProfile: UserValuesProfile = {
      // Preserve V1 fields
      archetypeId: profile?.archetypeId || 'balanced',
      weights: profile?.weights || DEFAULT_WEIGHTS,
      responses: profile?.responses,
      // Preserve V2 fields
      v2ArchetypeId: profile?.v2ArchetypeId,
      v2Weights: profile?.v2Weights,
      v2Responses: profile?.v2Responses,
      v2AutoMapped: profile?.v2AutoMapped,
      // Preserve V3 fields
      v3ArchetypeId: profile?.v3ArchetypeId,
      v3NeedWeights: profile?.v3NeedWeights,
      v3Responses: profile?.v3Responses,
      // Set V4 fields
      scoringModel: 'v4',
      v4ArchetypeId: archetypeId,
      v4Weights: weights,
      createdAt: profile?.createdAt || now,
      updatedAt: now,
    };

    setProfile(newProfile);
    setHasCompletedOnboarding(true);
  };

  /**
   * Save V4 profile from questionnaire
   */
  const saveV4Profile = (data: {
    v4ArchetypeId: V4ArchetypeId;
    v4Weights: V4WeightProfile;
    v4Responses?: V4QuestionnaireResponses;
  }) => {
    const now = new Date().toISOString();

    const newProfile: UserValuesProfile = {
      // Preserve or set default V1 fields
      archetypeId: profile?.archetypeId || 'balanced',
      weights: profile?.weights || DEFAULT_WEIGHTS,
      responses: profile?.responses,
      // Preserve V2 fields if they exist
      v2ArchetypeId: profile?.v2ArchetypeId,
      v2Weights: profile?.v2Weights,
      v2Responses: profile?.v2Responses,
      v2AutoMapped: profile?.v2AutoMapped,
      // Preserve V3 fields if they exist
      v3ArchetypeId: profile?.v3ArchetypeId,
      v3NeedWeights: profile?.v3NeedWeights,
      v3Responses: profile?.v3Responses,
      // Set V4 fields
      scoringModel: 'v4',
      v4ArchetypeId: data.v4ArchetypeId,
      v4Weights: data.v4Weights,
      v4Responses: data.v4Responses,
      createdAt: profile?.createdAt || now,
      updatedAt: now,
    };

    setProfile(newProfile);
    setHasCompletedOnboarding(true);
  };

  return (
    <ValuesContext.Provider
      value={{
        profile,
        setArchetype,
        updateResponse,
        calculateWeightsFromResponses,
        saveProfile,
        clearProfile,
        hasCompletedOnboarding,
        // V2 functions
        setScoringModel,
        setV2Archetype,
        updateV2Response,
        calculateV2WeightsFromResponses,
        dismissAutoMapBanner,
        showAutoMapBanner,
        // V3 functions
        setV3Archetype,
        // V4 functions
        setV4Archetype,
        // Save profile functions
        saveV2Profile,
        saveV3Profile,
        saveV4Profile,
      }}
    >
      {children}
    </ValuesContext.Provider>
  );
}

export function useValues() {
  const context = useContext(ValuesContext);
  if (context === undefined) {
    throw new Error('useValues must be used within a ValuesProvider');
  }
  return context;
}
