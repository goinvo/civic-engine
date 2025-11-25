'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type VoteType = 'support' | 'oppose';

export interface Vote {
  policyId: string;
  policyTitle: string;
  averageSupport: number;
  vote: VoteType;
  votedAt: string;
}

interface VotingContextType {
  votes: Record<string, Vote>;
  addVote: (policyId: string, policyTitle: string, averageSupport: number, vote: VoteType) => void;
  removeVote: (policyId: string) => void;
  getVote: (policyId: string) => Vote | undefined;
  hasVoted: (policyId: string) => boolean;
}

const VotingContext = createContext<VotingContextType | undefined>(undefined);

export function VotingProvider({ children }: { children: ReactNode }) {
  const [votes, setVotes] = useState<Record<string, Vote>>({});
  const [isLoaded, setIsLoaded] = useState(false);

  // Load votes from localStorage on mount
  useEffect(() => {
    const savedVotes = localStorage.getItem('civic-engine-votes');
    if (savedVotes) {
      try {
        setVotes(JSON.parse(savedVotes));
      } catch (e) {
        console.error('Failed to load votes:', e);
      }
    }
    setIsLoaded(true);
  }, []);

  // Save votes to localStorage whenever they change
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('civic-engine-votes', JSON.stringify(votes));
    }
  }, [votes, isLoaded]);

  const addVote = (policyId: string, policyTitle: string, averageSupport: number, vote: VoteType) => {
    setVotes(prev => ({
      ...prev,
      [policyId]: {
        policyId,
        policyTitle,
        averageSupport,
        vote,
        votedAt: new Date().toISOString(),
      },
    }));
  };

  const removeVote = (policyId: string) => {
    setVotes(prev => {
      const newVotes = { ...prev };
      delete newVotes[policyId];
      return newVotes;
    });
  };

  const getVote = (policyId: string) => {
    return votes[policyId];
  };

  const hasVoted = (policyId: string) => {
    return policyId in votes;
  };

  return (
    <VotingContext.Provider value={{ votes, addVote, removeVote, getVote, hasVoted }}>
      {children}
    </VotingContext.Provider>
  );
}

export function useVoting() {
  const context = useContext(VotingContext);
  if (context === undefined) {
    throw new Error('useVoting must be used within a VotingProvider');
  }
  return context;
}
