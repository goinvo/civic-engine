import type { Policy } from '@/types/policy';
import type { PolicyWrappedProfile } from '@/types/profile';

export const POLICY_WRAPPED_STORAGE_KEY = 'civic-engine.policy-wrapped.v1';

export const DEFAULT_MAX_PRIORITIES = 10;

function safeJsonParse<T>(raw: string | null): T | null {
  if (!raw) return null;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

export function isBrowser(): boolean {
  return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';
}

export function loadWrappedProfile(): PolicyWrappedProfile | null {
  if (!isBrowser()) return null;

  const parsed = safeJsonParse<PolicyWrappedProfile>(window.localStorage.getItem(POLICY_WRAPPED_STORAGE_KEY));
  if (!parsed) return null;

  if (!Array.isArray(parsed.selectedPolicyIds)) return null;
  if (typeof parsed.updatedAt !== 'string') return null;

  return {
    firstName: typeof parsed.firstName === 'string' ? parsed.firstName : undefined,
    selectedPolicyIds: parsed.selectedPolicyIds.filter((x) => typeof x === 'string'),
    updatedAt: parsed.updatedAt,
  };
}

export function saveWrappedProfile(profile: PolicyWrappedProfile): void {
  if (!isBrowser()) return;
  window.localStorage.setItem(POLICY_WRAPPED_STORAGE_KEY, JSON.stringify(profile));
}

export function clearWrappedProfile(): void {
  if (!isBrowser()) return;
  window.localStorage.removeItem(POLICY_WRAPPED_STORAGE_KEY);
}

export function upsertWrappedProfile(patch: Partial<Omit<PolicyWrappedProfile, 'updatedAt'>>): PolicyWrappedProfile {
  const current = loadWrappedProfile();
  const next: PolicyWrappedProfile = {
    firstName: patch.firstName ?? current?.firstName,
    selectedPolicyIds: patch.selectedPolicyIds ?? current?.selectedPolicyIds ?? [],
    updatedAt: new Date().toISOString(),
  };
  saveWrappedProfile(next);
  return next;
}

export function getDisplayName(firstName?: string): string {
  const trimmed = (firstName ?? '').trim();
  return trimmed ? `${trimmed}'s Key Issues` : 'Your Key Issues';
}

const LABEL_BY_CATEGORY: Partial<Record<Policy['category'], string>> = {
  healthcare: 'Healthcare Hawk',
  environment: 'Climate Realist',
  economy: 'Pocketbook Guardian',
  governance: 'Democracy Rebuilder',
  justice: 'Justice Watch',
  education: 'Opportunity Builder',
  infrastructure: 'Builder Mode',
  technology: 'Tech Guardrail',
  security: 'Security Sentinel',
  society: 'Community Connector',
  'civil-rights': 'Rights Defender',
  defense: 'Defense Pragmatist',
  other: 'Consensus Seeker',
};

export type WrappedDerivedStats = {
  label: string;
  avgConsensusSupport: number;
  topCategory?: Policy['category'];
};

export function deriveWrappedStats(selectedPolicies: Policy[]): WrappedDerivedStats {
  const categoryCounts = new Map<Policy['category'], number>();
  let sumSupport = 0;

  for (const p of selectedPolicies) {
    sumSupport += p.averageSupport;
    categoryCounts.set(p.category, (categoryCounts.get(p.category) ?? 0) + 1);
  }

  let topCategory: Policy['category'] | undefined;
  let topCount = 0;
  for (const [cat, count] of categoryCounts.entries()) {
    if (count > topCount) {
      topCategory = cat;
      topCount = count;
    }
  }

  const avgConsensusSupport =
    selectedPolicies.length > 0 ? Math.round(sumSupport / selectedPolicies.length) : 0;

  const label =
    (topCategory ? LABEL_BY_CATEGORY[topCategory] : undefined) ??
    LABEL_BY_CATEGORY.other ??
    'Consensus Seeker';

  return { label, avgConsensusSupport, topCategory };
}


