'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';
import {
  demoTeacher,
  demoStudents,
  demoCohorts,
  demoCohort,
  type DemoUserType,
} from '@/lib/demo-data';
import type { User, Cohort, GradeLevel } from '@/types/education';

interface DemoAuthState {
  isAuthenticated: boolean;
  userType: DemoUserType;
  user: (User & { profile?: unknown }) | null;
  currentCohort: Cohort | null;
  gradeLevel: GradeLevel;
  isLoading: boolean;
}

interface DemoAuthContextType extends DemoAuthState {
  loginAsTeacher: () => void;
  loginAsStudent: (studentIndex?: number) => void;
  logout: () => void;
  selectCohort: (cohort: Cohort) => void;
  setGradeLevel: (level: GradeLevel) => void;
  getCohorts: () => Cohort[];
}

const DemoAuthContext = createContext<DemoAuthContextType | undefined>(undefined);

const DEMO_STORAGE_KEY = 'civic_engine_demo_auth';

interface StoredDemoAuth {
  userType: DemoUserType;
  studentIndex?: number;
  cohortId?: string;
  gradeLevel?: GradeLevel;
}

function getStoredAuth(): StoredDemoAuth | null {
  if (typeof window === 'undefined') return null;
  const stored = localStorage.getItem(DEMO_STORAGE_KEY);
  if (!stored) return null;
  try {
    return JSON.parse(stored);
  } catch {
    return null;
  }
}

function setStoredAuth(auth: StoredDemoAuth | null): void {
  if (auth) {
    localStorage.setItem(DEMO_STORAGE_KEY, JSON.stringify(auth));
  } else {
    localStorage.removeItem(DEMO_STORAGE_KEY);
  }
}

export function DemoAuthProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<DemoAuthState>(() => {
    // Initialize from localStorage if available
    const stored = getStoredAuth();
    const defaultGradeLevel: GradeLevel = stored?.gradeLevel || '9-10';

    if (stored) {
      if (stored.userType === 'teacher') {
        return {
          isAuthenticated: true,
          userType: 'teacher',
          user: demoTeacher,
          currentCohort: stored.cohortId
            ? demoCohorts.find(c => c.id === stored.cohortId) || null
            : null,
          gradeLevel: defaultGradeLevel,
          isLoading: false,
        };
      } else if (stored.userType === 'student') {
        const student = demoStudents[stored.studentIndex || 0];
        return {
          isAuthenticated: true,
          userType: 'student',
          user: student,
          currentCohort: demoCohort,
          gradeLevel: defaultGradeLevel,
          isLoading: false,
        };
      }
    }
    return {
      isAuthenticated: false,
      userType: 'none',
      user: null,
      currentCohort: null,
      gradeLevel: defaultGradeLevel,
      isLoading: false,
    };
  });

  const loginAsTeacher = useCallback(() => {
    setState(prev => ({
      isAuthenticated: true,
      userType: 'teacher',
      user: demoTeacher,
      currentCohort: null,
      gradeLevel: prev.gradeLevel,
      isLoading: false,
    }));
    setStoredAuth({ userType: 'teacher' });
  }, []);

  const loginAsStudent = useCallback((studentIndex: number = 0) => {
    const student = demoStudents[studentIndex % demoStudents.length];
    setState(prev => ({
      isAuthenticated: true,
      userType: 'student',
      user: student,
      currentCohort: demoCohort,
      gradeLevel: prev.gradeLevel,
      isLoading: false,
    }));
    setStoredAuth({ userType: 'student', studentIndex, cohortId: demoCohort.id });
  }, []);

  const logout = useCallback(() => {
    setState(prev => ({
      isAuthenticated: false,
      userType: 'none',
      user: null,
      currentCohort: null,
      gradeLevel: prev.gradeLevel,
      isLoading: false,
    }));
    setStoredAuth(null);
  }, []);

  const setGradeLevel = useCallback((level: GradeLevel) => {
    setState(prev => ({ ...prev, gradeLevel: level }));
    const stored = getStoredAuth();
    if (stored) {
      setStoredAuth({ ...stored, gradeLevel: level });
    } else {
      // Store grade level even when not logged in
      localStorage.setItem('civic_engine_grade_level', level);
    }
  }, []);

  const selectCohort = useCallback((cohort: Cohort) => {
    setState(prev => ({ ...prev, currentCohort: cohort }));
    const stored = getStoredAuth();
    if (stored) {
      setStoredAuth({ ...stored, cohortId: cohort.id });
    }
  }, []);

  const getCohorts = useCallback(() => {
    return demoCohorts;
  }, []);

  const value: DemoAuthContextType = {
    ...state,
    loginAsTeacher,
    loginAsStudent,
    logout,
    selectCohort,
    setGradeLevel,
    getCohorts,
  };

  return (
    <DemoAuthContext.Provider value={value}>
      {children}
    </DemoAuthContext.Provider>
  );
}

export function useDemoAuth(): DemoAuthContextType {
  const context = useContext(DemoAuthContext);
  if (context === undefined) {
    throw new Error('useDemoAuth must be used within a DemoAuthProvider');
  }
  return context;
}

// Helper hook to check if running in demo mode
export function useIsDemo(): boolean {
  // For now, always return true since AWS isn't set up
  // Later, this can check for actual Cognito configuration
  return true;
}
