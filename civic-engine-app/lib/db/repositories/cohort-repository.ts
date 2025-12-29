import {
  putItem,
  getItem,
  queryItems,
  updateItem,
  Keys,
  EntityType,
  generateId,
  generateJoinCode,
} from '../dynamodb-client';
import type { Cohort, CohortStatus, CohortPhase, GradeLevel } from '@/types/education';

// DynamoDB item type
interface CohortItem {
  PK: string;
  SK: string;
  GSI1PK: string;
  GSI1SK: string;
  GSI2PK: string;
  GSI2SK: string;
  entityType: string;
  id: string;
  teacherId: string;
  name: string;
  gradeLevel: GradeLevel;
  joinCode: string;
  status: CohortStatus;
  currentPhase: CohortPhase;
  studentCount: number;
  policySetId?: string;
  createdAt: string;
  startDate?: string;
  endDate?: string;
}

// Convert DB item to domain model
function toCohort(item: CohortItem): Cohort {
  return {
    id: item.id,
    teacherId: item.teacherId,
    name: item.name,
    gradeLevel: item.gradeLevel,
    joinCode: item.joinCode,
    status: item.status,
    currentPhase: item.currentPhase,
    studentCount: item.studentCount,
    createdAt: new Date(item.createdAt),
    startDate: item.startDate ? new Date(item.startDate) : undefined,
    endDate: item.endDate ? new Date(item.endDate) : undefined,
  };
}

// Create cohort input
export interface CreateCohortInput {
  teacherId: string;
  name: string;
  gradeLevel: GradeLevel;
  policySetId?: string;
}

// Repository functions
export async function createCohort(input: CreateCohortInput): Promise<Cohort> {
  const id = generateId();
  const joinCode = generateJoinCode();
  const now = new Date();
  const keys = Keys.cohort(id);
  const joinCodeKeys = Keys.cohortByJoinCode(joinCode);

  const item: CohortItem = {
    ...keys,
    ...joinCodeKeys,
    GSI2PK: `TEACHER#${input.teacherId}`,
    GSI2SK: `COHORT#${now.toISOString()}`,
    entityType: EntityType.COHORT,
    id,
    teacherId: input.teacherId,
    name: input.name,
    gradeLevel: input.gradeLevel,
    joinCode,
    status: 'draft',
    currentPhase: 'not_started',
    studentCount: 0,
    policySetId: input.policySetId,
    createdAt: now.toISOString(),
  };

  await putItem(item);
  return toCohort(item);
}

export async function getCohortById(cohortId: string): Promise<Cohort | null> {
  const keys = Keys.cohort(cohortId);
  const item = await getItem<CohortItem>(keys.PK, keys.SK);
  return item ? toCohort(item) : null;
}

export async function getCohortByJoinCode(joinCode: string): Promise<Cohort | null> {
  const joinCodeKeys = Keys.cohortByJoinCode(joinCode);

  const items = await queryItems<CohortItem>({
    IndexName: 'GSI1',
    KeyConditionExpression: 'GSI1PK = :pk AND GSI1SK = :sk',
    ExpressionAttributeValues: {
      ':pk': joinCodeKeys.GSI1PK,
      ':sk': joinCodeKeys.GSI1SK,
    },
    Limit: 1,
  });

  return items.length > 0 ? toCohort(items[0]) : null;
}

export async function getCohortsByTeacher(teacherId: string): Promise<Cohort[]> {
  const items = await queryItems<CohortItem>({
    IndexName: 'GSI2',
    KeyConditionExpression: 'GSI2PK = :pk AND begins_with(GSI2SK, :sk)',
    ExpressionAttributeValues: {
      ':pk': `TEACHER#${teacherId}`,
      ':sk': 'COHORT#',
    },
    ScanIndexForward: false, // Most recent first
  });

  return items.map(toCohort);
}

export async function updateCohort(
  cohortId: string,
  updates: Partial<Pick<Cohort, 'name' | 'status' | 'currentPhase' | 'startDate' | 'endDate'>>
): Promise<void> {
  const keys = Keys.cohort(cohortId);
  const expressions: string[] = [];
  const values: Record<string, unknown> = {};
  const names: Record<string, string> = {};

  if (updates.name !== undefined) {
    expressions.push('#name = :name');
    values[':name'] = updates.name;
    names['#name'] = 'name';
  }
  if (updates.status !== undefined) {
    expressions.push('#status = :status');
    values[':status'] = updates.status;
    names['#status'] = 'status';
  }
  if (updates.currentPhase !== undefined) {
    expressions.push('currentPhase = :currentPhase');
    values[':currentPhase'] = updates.currentPhase;
  }
  if (updates.startDate !== undefined) {
    expressions.push('startDate = :startDate');
    values[':startDate'] = updates.startDate.toISOString();
  }
  if (updates.endDate !== undefined) {
    expressions.push('endDate = :endDate');
    values[':endDate'] = updates.endDate.toISOString();
  }

  if (expressions.length > 0) {
    await updateItem(
      keys.PK,
      keys.SK,
      `SET ${expressions.join(', ')}`,
      values,
      Object.keys(names).length > 0 ? names : undefined
    );
  }
}

export async function incrementStudentCount(cohortId: string): Promise<void> {
  const keys = Keys.cohort(cohortId);
  await updateItem(
    keys.PK,
    keys.SK,
    'SET studentCount = studentCount + :inc',
    { ':inc': 1 }
  );
}

export async function decrementStudentCount(cohortId: string): Promise<void> {
  const keys = Keys.cohort(cohortId);
  await updateItem(
    keys.PK,
    keys.SK,
    'SET studentCount = studentCount - :dec',
    { ':dec': 1 }
  );
}

export async function advancePhase(cohortId: string): Promise<CohortPhase> {
  const cohort = await getCohortById(cohortId);
  if (!cohort) {
    throw new Error('Cohort not found');
  }

  const phaseOrder: CohortPhase[] = [
    'not_started',
    'exploration',
    'positions',
    'discussion',
    'revision',
    'reflection',
    'completed',
  ];

  const currentIndex = phaseOrder.indexOf(cohort.currentPhase);
  if (currentIndex === -1 || currentIndex >= phaseOrder.length - 1) {
    return cohort.currentPhase; // Already at last phase or unknown
  }

  const nextPhase = phaseOrder[currentIndex + 1];
  await updateCohort(cohortId, { currentPhase: nextPhase });

  // If moving to 'exploration', set start date
  if (nextPhase === 'exploration' && !cohort.startDate) {
    await updateCohort(cohortId, {
      status: 'active',
      startDate: new Date()
    });
  }

  // If completing, set end date
  if (nextPhase === 'completed') {
    await updateCohort(cohortId, { endDate: new Date() });
  }

  return nextPhase;
}
