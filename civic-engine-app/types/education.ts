// Education Module Types

// ============================================
// USER TYPES
// ============================================

export type UserRole = 'teacher' | 'student';

export interface User {
  id: string;
  email: string;
  displayName: string;
  role: UserRole;
  createdAt: Date;
}

export interface TeacherProfile {
  userId: string;
  schoolName: string;
  state: string;
  gradeLevels: GradeLevel[];
}

export interface StudentProfile {
  userId: string;
  cohortId: string;
  joinedAt: Date;
}

// ============================================
// COHORT TYPES
// ============================================

export type GradeLevel = 'K-5' | '6-8' | '9-10' | '11-12' | 'college';
export type CohortStatus = 'draft' | 'active' | 'archived';
export type CohortPhase = 'not_started' | 'exploration' | 'positions' | 'discussion' | 'revision' | 'reflection' | 'completed';
export type PacingMode = 'teacher_controlled' | 'self_paced';

export interface Cohort {
  id: string;
  teacherId: string;
  name: string;
  gradeLevel: GradeLevel;
  joinCode: string;
  status: CohortStatus;
  currentPhase: CohortPhase;
  pacingMode: PacingMode;
  studentCount: number;
  createdAt: Date;
  startDate?: Date;
  endDate?: Date;
}

export interface CohortWithDetails extends Cohort {
  teacher?: {
    displayName: string;
    schoolName: string;
  };
  policySet?: PolicySet;
}

// ============================================
// POLICY SET TYPES
// ============================================

export interface PolicySet {
  id: string;
  name: string;
  description: string;
  isPreset: boolean;
  createdBy?: string;
  policies: PolicySetItem[];
}

export interface PolicySetItem {
  policyId: string;
  order: number;
  displayTitle?: string; // Optional override for kid-friendly names
  displayDescription?: string; // Optional simplified description
}

export interface PolicySetPreset {
  id: string;
  name: string;
  description: string;
  estimatedTime: string;
  policyIds: string[];
}

// ============================================
// POSITION TYPES
// ============================================

export type Stance = 'strongly_support' | 'somewhat_support' | 'neutral' | 'somewhat_oppose' | 'strongly_oppose';

export interface Position {
  id: string;
  studentId: string;
  cohortId: string;
  policyId: string;
  stance: Stance;
  reasoning: string;
  steelman: string;
  createdAt: Date;
  isRevision: boolean;
  originalPositionId?: string;
}

export interface PositionRevision {
  id: string;
  originalPositionId: string;
  newStance: Stance;
  changeReasoning: string;
  createdAt: Date;
}

// ============================================
// DISCUSSION TYPES
// ============================================

export interface DiscussionPost {
  id: string;
  cohortId: string;
  policyId: string;
  authorId: string;
  authorName: string;
  authorStance?: Stance;
  parentId?: string;
  content: string;
  createdAt: Date;
  editedAt?: Date;
  isFlagged: boolean;
  replyCount: number;
}

export interface DiscussionThread {
  post: DiscussionPost;
  replies: DiscussionPost[];
}

// ============================================
// EXPLORATION TYPES
// ============================================

export interface PolicyExploration {
  studentId: string;
  cohortId: string;
  policyId: string;
  startedAt: Date;
  completedAt?: Date;
  readingLevelUsed: 'simplified' | 'standard' | 'advanced';
  comprehensionScore?: number;
}

export interface ComprehensionQuestion {
  id: string;
  policyId: string;
  question: string;
  options: string[];
  correctIndex: number;
}

// ============================================
// REFLECTION TYPES
// ============================================

export interface Reflection {
  id: string;
  studentId: string;
  cohortId: string;
  topPriorities: string[]; // policy IDs, ordered
  priorityReasoning: string;
  learningReflection: string;
  discussionReflection: string;
  completedAt: Date;
}

// ============================================
// ANALYTICS TYPES
// ============================================

export interface CohortAnalytics {
  cohortId: string;
  totalStudents: number;
  activeStudents: number;
  positionsSubmitted: number;
  discussionPosts: number;
  averagePostLength: number;
  positionsRevised: number;
  completedReflections: number;
  stanceDistribution: Record<string, StanceDistribution>;
  topPriorities: PriorityCount[];
}

export interface StanceDistribution {
  strongly_support: number;
  somewhat_support: number;
  neutral: number;
  somewhat_oppose: number;
  strongly_oppose: number;
}

export interface PriorityCount {
  policyId: string;
  policyName: string;
  count: number;
  percentage: number;
}

// ============================================
// GRADING TYPES
// ============================================

export type RubricLevel = 1 | 2 | 3;

export interface RubricCriteria {
  name: string;
  description: string;
  levels: {
    level: RubricLevel;
    label: string;
    description: string;
    example: string;
  }[];
}

export interface AnonymizedResponse {
  id: string; // anonymized ID
  type: 'position' | 'reflection';
  policyId?: string;
  stance?: Stance;
  reasoning: string;
  steelman?: string;
  priorityReasoning?: string;
  learningReflection?: string;
  discussionReflection?: string;
}
