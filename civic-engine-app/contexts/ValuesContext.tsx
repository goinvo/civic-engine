'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  UserValuesProfile,
  WeightProfile,
  ArchetypeId,
  QuestionnaireResponses,
  LikertScale,
} from '@/types/values';
import { DEFAULT_WEIGHTS, ARCHETYPES } from '@/data/values';

interface ValuesContextType {
  profile: UserValuesProfile | null;
  setArchetype: (archetypeId: ArchetypeId) => void;
  updateResponse: (questionId: string, value: LikertScale) => void;
  calculateWeightsFromResponses: (responses: QuestionnaireResponses) => WeightProfile;
  saveProfile: (profile: UserValuesProfile) => void;
  clearProfile: () => void;
  hasCompletedOnboarding: boolean;
}

const ValuesContext = createContext<ValuesContextType | undefined>(undefined);

const STORAGE_KEY = 'civic-engine-values-profile';

export function ValuesProvider({ children }: { children: React.ReactNode }) {
  const [profile, setProfile] = useState<UserValuesProfile | null>(null);
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setProfile(parsed);
        setHasCompletedOnboarding(true);
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
