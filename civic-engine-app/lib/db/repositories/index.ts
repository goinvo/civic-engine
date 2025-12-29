// User operations
export {
  createUser,
  getUserById,
  getUserByEmail,
  updateUser,
  createTeacherProfile,
  getTeacherProfile,
  updateTeacherProfile,
  createStudentProfile,
  getStudentProfile,
  getStudentCohorts,
  getStudentsInCohort,
} from './user-repository';

// Re-export addUserToGroup from cognito-client for convenience
export { addUserToGroup } from '@/lib/auth/cognito-client';

// Cohort operations
export {
  createCohort,
  getCohortById,
  getCohortByJoinCode,
  getCohortsByTeacher,
  updateCohort,
  incrementStudentCount,
  decrementStudentCount,
  advancePhase,
  type CreateCohortInput,
} from './cohort-repository';

// Position operations
export {
  createPosition,
  getPositionById,
  getPositionsByStudent,
  getPositionByStudentAndPolicy,
  getPositionsByPolicy,
  getAllPositionsInCohort,
  createPositionRevision,
  getStanceDistribution,
  type CreatePositionInput,
} from './position-repository';

// Discussion operations
export {
  createDiscussionPost,
  getDiscussionPostById,
  getDiscussionsByPolicy,
  getTopLevelPosts,
  getReplies,
  updateDiscussionPost,
  flagPost,
  deleteDiscussionPost,
  getDiscussionStats,
  type CreateDiscussionPostInput,
} from './discussion-repository';

// Reflection operations
export {
  createReflection,
  getReflectionById,
  getReflectionByStudent,
  getReflectionsInCohort,
  getPriorityRankings,
  getReflectionCompletionRate,
  type CreateReflectionInput,
} from './reflection-repository';
