'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';
import type { Cohort, GradeLevel, CohortPhase, PacingMode } from '@/types/education';

interface ClassContextType {
  cohorts: Cohort[];
  addCohort: (cohort: Omit<Cohort, 'id' | 'joinCode' | 'createdAt' | 'studentCount' | 'currentPhase' | 'status' | 'pacingMode'> & { pacingMode?: PacingMode }) => Cohort;
  updateCohort: (id: string, updates: Partial<Cohort>) => void;
  deleteCohort: (id: string) => void;
  getCohortById: (id: string) => Cohort | undefined;
}

const ClassContext = createContext<ClassContextType | undefined>(undefined);

const CLASS_STORAGE_KEY = 'civic_engine_classes';

function generateJoinCode(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let code = '';
  for (let i = 0; i < 3; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  code += '-';
  for (let i = 0; i < 4; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

function generateId(): string {
  return `cohort-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

function getStoredClasses(): Cohort[] {
  if (typeof window === 'undefined') return [];
  const stored = localStorage.getItem(CLASS_STORAGE_KEY);
  if (!stored) return [];
  try {
    const parsed = JSON.parse(stored);
    // Convert date strings back to Date objects
    return parsed.map((cohort: Cohort & { createdAt: string; startDate?: string; endDate?: string }) => ({
      ...cohort,
      createdAt: new Date(cohort.createdAt),
      startDate: cohort.startDate ? new Date(cohort.startDate) : undefined,
      endDate: cohort.endDate ? new Date(cohort.endDate) : undefined,
    }));
  } catch {
    return [];
  }
}

function setStoredClasses(classes: Cohort[]): void {
  localStorage.setItem(CLASS_STORAGE_KEY, JSON.stringify(classes));
}

export function ClassProvider({ children }: { children: React.ReactNode }) {
  const [cohorts, setCohorts] = useState<Cohort[]>(() => getStoredClasses());

  const addCohort = useCallback((cohortData: Omit<Cohort, 'id' | 'joinCode' | 'createdAt' | 'studentCount' | 'currentPhase' | 'status' | 'pacingMode'> & { pacingMode?: PacingMode }) => {
    const newCohort: Cohort = {
      ...cohortData,
      id: generateId(),
      joinCode: generateJoinCode(),
      createdAt: new Date(),
      studentCount: 0,
      currentPhase: 'not_started' as CohortPhase,
      status: 'draft',
      pacingMode: cohortData.pacingMode || 'teacher_controlled',
    };

    setCohorts(prev => {
      const updated = [...prev, newCohort];
      setStoredClasses(updated);
      return updated;
    });

    return newCohort;
  }, []);

  const updateCohort = useCallback((id: string, updates: Partial<Cohort>) => {
    setCohorts(prev => {
      const updated = prev.map(cohort =>
        cohort.id === id ? { ...cohort, ...updates } : cohort
      );
      setStoredClasses(updated);
      return updated;
    });
  }, []);

  const deleteCohort = useCallback((id: string) => {
    setCohorts(prev => {
      const updated = prev.filter(cohort => cohort.id !== id);
      setStoredClasses(updated);
      return updated;
    });
  }, []);

  const getCohortById = useCallback((id: string) => {
    return cohorts.find(cohort => cohort.id === id);
  }, [cohorts]);

  const value: ClassContextType = {
    cohorts,
    addCohort,
    updateCohort,
    deleteCohort,
    getCohortById,
  };

  return (
    <ClassContext.Provider value={value}>
      {children}
    </ClassContext.Provider>
  );
}

export function useClasses(): ClassContextType {
  const context = useContext(ClassContext);
  if (context === undefined) {
    throw new Error('useClasses must be used within a ClassProvider');
  }
  return context;
}
