export type PolicyWrappedProfile = {
  /**
   * Optional first name for display only (e.g. "Shirley" -> "Shirley's Key Issues").
   * Intentionally not a unique profile name/handle.
   */
  firstName?: string;
  /**
   * Policy IDs selected as the user's "votes" / priorities.
   */
  selectedPolicyIds: string[];
  /**
   * ISO timestamp when the profile was last updated.
   */
  updatedAt: string;
};


