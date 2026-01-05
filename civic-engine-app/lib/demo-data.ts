// Demo/mock data for education features
// This file provides fake data until the AWS backend is deployed

import type {
  User,
  TeacherProfile,
  StudentProfile,
  Cohort,
  Position,
  DiscussionPost,
  Reflection,
  PolicySet,
  CohortAnalytics,
  Stance,
  GradeLevel,
  CohortPhase,
} from '@/types/education';

// Demo Users
export const demoTeacher: User & { profile: TeacherProfile } = {
  id: 'teacher-demo-001',
  email: 'demo.teacher@school.edu',
  displayName: 'Ms. Johnson',
  role: 'teacher',
  createdAt: new Date('2024-08-15'),
  profile: {
    userId: 'teacher-demo-001',
    schoolName: 'Lincoln High School',
    state: 'California',
    gradeLevels: ['9-10', '11-12'],
  },
};

export const demoStudents: (User & { profile: StudentProfile })[] = [
  {
    id: 'student-demo-001',
    email: 'alex@student.edu',
    displayName: 'Alex',
    role: 'student',
    createdAt: new Date('2024-09-01'),
    profile: { userId: 'student-demo-001', cohortId: 'cohort-demo-001', joinedAt: new Date('2024-09-01') },
  },
  {
    id: 'student-demo-002',
    email: 'jordan@student.edu',
    displayName: 'Jordan',
    role: 'student',
    createdAt: new Date('2024-09-01'),
    profile: { userId: 'student-demo-002', cohortId: 'cohort-demo-001', joinedAt: new Date('2024-09-01') },
  },
  {
    id: 'student-demo-003',
    email: 'taylor@student.edu',
    displayName: 'Taylor',
    role: 'student',
    createdAt: new Date('2024-09-02'),
    profile: { userId: 'student-demo-003', cohortId: 'cohort-demo-001', joinedAt: new Date('2024-09-02') },
  },
  {
    id: 'student-demo-004',
    email: 'morgan@student.edu',
    displayName: 'Morgan',
    role: 'student',
    createdAt: new Date('2024-09-02'),
    profile: { userId: 'student-demo-004', cohortId: 'cohort-demo-001', joinedAt: new Date('2024-09-02') },
  },
  {
    id: 'student-demo-005',
    email: 'casey@student.edu',
    displayName: 'Casey',
    role: 'student',
    createdAt: new Date('2024-09-03'),
    profile: { userId: 'student-demo-005', cohortId: 'cohort-demo-001', joinedAt: new Date('2024-09-03') },
  },
];

// Demo Cohort
export const demoCohort: Cohort = {
  id: 'cohort-demo-001',
  teacherId: 'teacher-demo-001',
  name: 'US Government - Period 3',
  gradeLevel: '11-12' as GradeLevel,
  joinCode: 'ABC-1234',
  status: 'active',
  currentPhase: 'discussion' as CohortPhase,
  studentCount: 24,
  createdAt: new Date('2024-08-20'),
  startDate: new Date('2024-09-01'),
};

export const demoCohorts: Cohort[] = [
  demoCohort,
  {
    id: 'cohort-demo-002',
    teacherId: 'teacher-demo-001',
    name: 'Civics 101 - Period 1',
    gradeLevel: '9-10' as GradeLevel,
    joinCode: 'XYZ-5678',
    status: 'active',
    currentPhase: 'exploration' as CohortPhase,
    studentCount: 28,
    createdAt: new Date('2024-08-22'),
    startDate: new Date('2024-09-05'),
  },
  {
    id: 'cohort-demo-003',
    teacherId: 'teacher-demo-001',
    name: 'AP Government - Period 5',
    gradeLevel: '11-12' as GradeLevel,
    joinCode: 'GOV-9999',
    status: 'draft',
    currentPhase: 'not_started' as CohortPhase,
    studentCount: 0,
    createdAt: new Date('2024-12-01'),
  },
];

// Demo Policy Set
export const demoPolicySet: PolicySet = {
  id: 'policyset-demo-001',
  name: 'Core Civic Issues',
  description: 'A balanced set of 5 policies covering healthcare, economy, and governance',
  isPreset: true,
  policies: [
    { policyId: 'medicare-drug-negotiation', order: 1 },
    { policyId: 'congress-term-limits', order: 2 },
    { policyId: 'universal-background-checks', order: 3 },
    { policyId: 'raise-minimum-wage', order: 4 },
    { policyId: 'congress-stock-ban', order: 5 },
  ],
};

// Demo Positions
export const demoPositions: Position[] = [
  {
    id: 'pos-001',
    studentId: 'student-demo-001',
    cohortId: 'cohort-demo-001',
    policyId: 'medicare-drug-negotiation',
    stance: 'strongly_support' as Stance,
    reasoning: 'I believe allowing Medicare to negotiate drug prices would help make medications more affordable for seniors and reduce overall healthcare costs. My grandmother struggles to afford her prescriptions.',
    steelman: 'Those who oppose this might argue that price controls could reduce pharmaceutical company profits, potentially leading to less investment in research and development of new life-saving drugs.',
    createdAt: new Date('2024-09-15'),
    isRevision: false,
  },
  {
    id: 'pos-002',
    studentId: 'student-demo-002',
    cohortId: 'cohort-demo-001',
    policyId: 'medicare-drug-negotiation',
    stance: 'somewhat_support' as Stance,
    reasoning: 'While I support the idea of lowering drug costs, I think we need to be careful about how we implement it to avoid unintended consequences in the pharmaceutical industry.',
    steelman: 'Opponents might correctly point out that drug development is expensive and risky, and that companies need profits to fund the next generation of treatments.',
    createdAt: new Date('2024-09-15'),
    isRevision: false,
  },
  {
    id: 'pos-003',
    studentId: 'student-demo-003',
    cohortId: 'cohort-demo-001',
    policyId: 'congress-term-limits',
    stance: 'strongly_support' as Stance,
    reasoning: 'Career politicians often become disconnected from their constituents. Term limits would bring fresh perspectives and reduce the influence of special interests.',
    steelman: 'Critics argue that experienced legislators are more effective at navigating complex policy issues and that voters already have the power to vote out representatives they don\'t like.',
    createdAt: new Date('2024-09-16'),
    isRevision: false,
  },
];

// Demo Discussion Posts
export const demoDiscussions: DiscussionPost[] = [
  {
    id: 'disc-001',
    cohortId: 'cohort-demo-001',
    policyId: 'medicare-drug-negotiation',
    authorId: 'student-demo-001',
    authorName: 'Alex',
    authorStance: 'strongly_support' as Stance,
    content: 'I think the most compelling argument for this policy is that other countries already do it successfully. Why should Americans pay more for the same drugs?',
    createdAt: new Date('2024-09-20T10:30:00'),
    isFlagged: false,
    replyCount: 2,
  },
  {
    id: 'disc-002',
    cohortId: 'cohort-demo-001',
    policyId: 'medicare-drug-negotiation',
    authorId: 'student-demo-002',
    authorName: 'Jordan',
    authorStance: 'somewhat_support' as Stance,
    parentId: 'disc-001',
    content: 'That\'s a good point about other countries. But I wonder if their healthcare systems are different enough that we can\'t directly compare. Does anyone know more about how Canada\'s system works?',
    createdAt: new Date('2024-09-20T11:15:00'),
    isFlagged: false,
    replyCount: 0,
  },
  {
    id: 'disc-003',
    cohortId: 'cohort-demo-001',
    policyId: 'medicare-drug-negotiation',
    authorId: 'student-demo-004',
    authorName: 'Morgan',
    authorStance: 'neutral' as Stance,
    parentId: 'disc-001',
    content: 'I looked this up - in Canada, a government board reviews drug prices and can refuse to cover drugs that are too expensive. It\'s more complex than just "negotiation".',
    createdAt: new Date('2024-09-20T14:22:00'),
    isFlagged: false,
    replyCount: 0,
  },
  {
    id: 'disc-004',
    cohortId: 'cohort-demo-001',
    policyId: 'congress-term-limits',
    authorId: 'student-demo-003',
    authorName: 'Taylor',
    authorStance: 'strongly_support' as Stance,
    content: 'Looking at the data, the average tenure in Congress has grown from about 4 years in the 1800s to over 9 years today. Is this what the founders intended?',
    createdAt: new Date('2024-09-21T09:00:00'),
    isFlagged: false,
    replyCount: 1,
  },
  {
    id: 'disc-005',
    cohortId: 'cohort-demo-001',
    policyId: 'congress-term-limits',
    authorId: 'student-demo-005',
    authorName: 'Casey',
    authorStance: 'somewhat_oppose' as Stance,
    parentId: 'disc-004',
    content: 'But the founders also didn\'t include term limits in the Constitution, so maybe they trusted voters to make that choice? I\'m torn on this one.',
    createdAt: new Date('2024-09-21T10:45:00'),
    isFlagged: false,
    replyCount: 0,
  },
];

// Demo Reflections
export const demoReflections: Reflection[] = [
  {
    id: 'ref-001',
    studentId: 'student-demo-001',
    cohortId: 'cohort-demo-001',
    topPriorities: ['medicare-drug-negotiation', 'raise-minimum-wage', 'congress-stock-ban'],
    priorityReasoning: 'I prioritized policies that directly affect everyday people\'s lives - healthcare costs, wages, and government ethics. These feel most urgent to me.',
    learningReflection: 'I learned that many issues I thought were "partisan" actually have broad support across parties. This made me more optimistic about our political system.',
    discussionReflection: 'Hearing Morgan\'s research about Canada\'s drug pricing system made me realize these policies are more complex than they first appear. I appreciate seeing different perspectives.',
    completedAt: new Date('2024-09-25'),
  },
];

// Demo Analytics
export const demoCohortAnalytics: CohortAnalytics = {
  cohortId: 'cohort-demo-001',
  totalStudents: 24,
  activeStudents: 22,
  positionsSubmitted: 98,
  discussionPosts: 156,
  averagePostLength: 142,
  positionsRevised: 12,
  completedReflections: 18,
  stanceDistribution: {
    'medicare-drug-negotiation': {
      strongly_support: 8,
      somewhat_support: 10,
      neutral: 3,
      somewhat_oppose: 2,
      strongly_oppose: 1,
    },
    'congress-term-limits': {
      strongly_support: 12,
      somewhat_support: 6,
      neutral: 2,
      somewhat_oppose: 3,
      strongly_oppose: 1,
    },
  },
  topPriorities: [
    { policyId: 'medicare-drug-negotiation', policyName: 'Medicare Drug Negotiation', count: 15, percentage: 68 },
    { policyId: 'congress-term-limits', policyName: 'Congressional Term Limits', count: 12, percentage: 55 },
    { policyId: 'raise-minimum-wage', policyName: 'Raise Minimum Wage', count: 10, percentage: 45 },
  ],
};

// Current demo user state (for demo mode)
export type DemoUserType = 'none' | 'teacher' | 'student';

export interface DemoState {
  userType: DemoUserType;
  user: User | null;
  currentCohort: Cohort | null;
}

export const initialDemoState: DemoState = {
  userType: 'none',
  user: null,
  currentCohort: null,
};

// Helper to get a random student for demo
export function getRandomDemoStudent() {
  return demoStudents[Math.floor(Math.random() * demoStudents.length)];
}

// Phase descriptions for UI
export const phaseDescriptions: Record<CohortPhase, { title: string; description: string; studentAction: string }> = {
  not_started: {
    title: 'Not Started',
    description: 'The class hasn\'t begun yet. Students can join using the class code.',
    studentAction: 'Wait for your teacher to start the class.',
  },
  exploration: {
    title: 'Policy Exploration',
    description: 'Students read and learn about the selected policies.',
    studentAction: 'Read through each policy and gather your thoughts.',
  },
  positions: {
    title: 'Position Submission',
    description: 'Students form and submit their initial positions on each policy.',
    studentAction: 'Submit your stance and reasoning for each policy.',
  },
  discussion: {
    title: 'Class Discussion',
    description: 'Students discuss policies and engage with different perspectives.',
    studentAction: 'Discuss with classmates and consider other viewpoints.',
  },
  revision: {
    title: 'Position Revision',
    description: 'Students can revise their positions based on discussions.',
    studentAction: 'Update your positions if your thinking has changed.',
  },
  reflection: {
    title: 'Final Reflection',
    description: 'Students reflect on what they learned and prioritize issues.',
    studentAction: 'Complete your final reflection on the experience.',
  },
  completed: {
    title: 'Completed',
    description: 'The civic engagement unit is complete.',
    studentAction: 'View your civic profile and share your journey.',
  },
};
