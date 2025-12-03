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
   * Switch between scoring models (v1 or v2)
   * When switching to v2 without existing v2 profile, auto-map from v1
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

    // Question ID to factor mapping
    const questionToFactor: Record<string, V2Factor> = {
      q_hayek: 'hayek',
      q_ostrom: 'ostrom',
      q_downs: 'downs',
      q_olson: 'olson',
      q_keynes: 'keynes',
      q_pettit: 'pettit',
      q_hirschman: 'hirschman',
      q_buchanan: 'buchanan',
      q_polanyi: 'polanyi',
      q_rawls: 'rawls',
      q_george: 'george',
      q_acemoglu: 'acemoglu',
      q_walzer: 'walzer',
    };

    // Calculate points for each factor
    const points: Partial<Record<V2Factor, number>> = {};
    for (const factor of V2_FACTORS) {
      const questionId = `q_${factor}`;
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
