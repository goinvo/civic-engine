'use client';

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import {
  signIn as cognitoSignIn,
  signUp as cognitoSignUp,
  signOut as cognitoSignOut,
  confirmSignUp as cognitoConfirmSignUp,
  getCurrentUser,
  refreshTokens,
  forgotPassword as cognitoForgotPassword,
  confirmForgotPassword as cognitoConfirmForgotPassword,
  type AuthTokens,
  type SignUpInput,
  type CognitoUser,
} from './cognito-client';

interface AuthState {
  user: CognitoUser | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}

interface AuthContextType extends AuthState {
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (input: SignUpInput) => Promise<{ userSub: string }>;
  signOut: () => Promise<void>;
  confirmSignUp: (email: string, code: string) => Promise<void>;
  forgotPassword: (email: string) => Promise<void>;
  confirmForgotPassword: (email: string, code: string, newPassword: string) => Promise<void>;
  refreshSession: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const TOKEN_STORAGE_KEY = 'civic_engine_auth';

interface StoredTokens {
  accessToken: string;
  idToken: string;
  refreshToken: string;
  expiresAt: number;
}

function getStoredTokens(): StoredTokens | null {
  if (typeof window === 'undefined') return null;
  const stored = localStorage.getItem(TOKEN_STORAGE_KEY);
  if (!stored) return null;
  try {
    return JSON.parse(stored);
  } catch {
    return null;
  }
}

function setStoredTokens(tokens: AuthTokens): void {
  const stored: StoredTokens = {
    accessToken: tokens.accessToken,
    idToken: tokens.idToken,
    refreshToken: tokens.refreshToken,
    expiresAt: Date.now() + tokens.expiresIn * 1000,
  };
  localStorage.setItem(TOKEN_STORAGE_KEY, JSON.stringify(stored));
}

function clearStoredTokens(): void {
  localStorage.removeItem(TOKEN_STORAGE_KEY);
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AuthState>({
    user: null,
    isLoading: true,
    isAuthenticated: false,
  });

  // Load user on mount
  useEffect(() => {
    async function loadUser() {
      const tokens = getStoredTokens();
      if (!tokens) {
        setState({ user: null, isLoading: false, isAuthenticated: false });
        return;
      }

      // Check if token is expired
      if (tokens.expiresAt < Date.now()) {
        // Try to refresh
        try {
          const newTokens = await refreshTokens(tokens.refreshToken);
          setStoredTokens(newTokens);
          const user = await getCurrentUser(newTokens.accessToken);
          setState({ user, isLoading: false, isAuthenticated: true });
        } catch {
          clearStoredTokens();
          setState({ user: null, isLoading: false, isAuthenticated: false });
        }
        return;
      }

      // Token still valid, get user
      try {
        const user = await getCurrentUser(tokens.accessToken);
        setState({ user, isLoading: false, isAuthenticated: true });
      } catch {
        clearStoredTokens();
        setState({ user: null, isLoading: false, isAuthenticated: false });
      }
    }

    loadUser();
  }, []);

  const signIn = useCallback(async (email: string, password: string) => {
    setState((prev) => ({ ...prev, isLoading: true }));
    try {
      const tokens = await cognitoSignIn({ email, password });
      setStoredTokens(tokens);
      const user = await getCurrentUser(tokens.accessToken);
      setState({ user, isLoading: false, isAuthenticated: true });
    } catch (error) {
      setState((prev) => ({ ...prev, isLoading: false }));
      throw error;
    }
  }, []);

  const signUp = useCallback(async (input: SignUpInput) => {
    return cognitoSignUp(input);
  }, []);

  const confirmSignUp = useCallback(async (email: string, code: string) => {
    await cognitoConfirmSignUp(email, code);
  }, []);

  const signOut = useCallback(async () => {
    const tokens = getStoredTokens();
    if (tokens) {
      try {
        await cognitoSignOut(tokens.accessToken);
      } catch {
        // Ignore errors, clear local state anyway
      }
    }
    clearStoredTokens();
    setState({ user: null, isLoading: false, isAuthenticated: false });
  }, []);

  const forgotPassword = useCallback(async (email: string) => {
    await cognitoForgotPassword(email);
  }, []);

  const confirmForgotPassword = useCallback(
    async (email: string, code: string, newPassword: string) => {
      await cognitoConfirmForgotPassword(email, code, newPassword);
    },
    []
  );

  const refreshSession = useCallback(async () => {
    const tokens = getStoredTokens();
    if (!tokens) {
      throw new Error('No session to refresh');
    }
    const newTokens = await refreshTokens(tokens.refreshToken);
    setStoredTokens(newTokens);
    const user = await getCurrentUser(newTokens.accessToken);
    setState({ user, isLoading: false, isAuthenticated: true });
  }, []);

  const value: AuthContextType = {
    ...state,
    signIn,
    signUp,
    signOut,
    confirmSignUp,
    forgotPassword,
    confirmForgotPassword,
    refreshSession,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

// Hook to get access token for API calls
export function useAccessToken(): string | null {
  const tokens = getStoredTokens();
  if (!tokens) return null;
  if (tokens.expiresAt < Date.now()) return null;
  return tokens.accessToken;
}

// Get access token (for API routes)
export function getAccessToken(): string | null {
  const tokens = getStoredTokens();
  if (!tokens) return null;
  return tokens.accessToken;
}
