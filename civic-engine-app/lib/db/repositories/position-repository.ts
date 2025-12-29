import {
  putItem,
  getItem,
  queryItems,
  Keys,
  EntityType,
  generateId,
} from '../dynamodb-client';
import type { Position, Stance } from '@/types/education';

// DynamoDB item type
interface PositionItem {
  PK: string;
  SK: string;
  GSI2PK: string;
  GSI2SK: string;
  GSI3PK: string;
  GSI3SK: string;
  entityType: string;
  id: string;
  studentId: string;
  cohortId: string;
  policyId: string;
  stance: Stance;
  reasoning: string;
  steelman: string;
  createdAt: string;
  isRevision: boolean;
  originalPositionId?: string;
}

// Convert DB item to domain model
function toPosition(item: PositionItem): Position {
  return {
    id: item.id,
    studentId: item.studentId,
    cohortId: item.cohortId,
    policyId: item.policyId,
    stance: item.stance,
    reasoning: item.reasoning,
    steelman: item.steelman,
    createdAt: new Date(item.createdAt),
    isRevision: item.isRevision,
    originalPositionId: item.originalPositionId,
  };
}

// Create position input
export interface CreatePositionInput {
  studentId: string;
  cohortId: string;
  policyId: string;
  stance: Stance;
  reasoning: string;
  steelman: string;
  isRevision?: boolean;
  originalPositionId?: string;
}

// Repository functions
export async function createPosition(input: CreatePositionInput): Promise<Position> {
  const id = generateId();
  const now = new Date();
  const keys = Keys.position(input.cohortId, id);

  const item: PositionItem = {
    ...keys,
    GSI2PK: `COHORT#${input.cohortId}`,
    GSI2SK: `POLICY#${input.policyId}#POSITION#${now.toISOString()}`,
    GSI3PK: `STUDENT#${input.studentId}`,
    GSI3SK: `COHORT#${input.cohortId}#POSITION#${input.policyId}`,
    entityType: EntityType.POSITION,
    id,
    studentId: input.studentId,
    cohortId: input.cohortId,
    policyId: input.policyId,
    stance: input.stance,
    reasoning: input.reasoning,
    steelman: input.steelman,
    createdAt: now.toISOString(),
    isRevision: input.isRevision || false,
    originalPositionId: input.originalPositionId,
  };

  await putItem(item);
  return toPosition(item);
}

export async function getPositionById(
  cohortId: string,
  positionId: string
): Promise<Position | null> {
  const keys = Keys.position(cohortId, positionId);
  const item = await getItem<PositionItem>(keys.PK, keys.SK);
  return item ? toPosition(item) : null;
}

export async function getPositionsByStudent(
  studentId: string,
  cohortId: string
): Promise<Position[]> {
  const items = await queryItems<PositionItem>({
    IndexName: 'GSI3',
    KeyConditionExpression: 'GSI3PK = :pk AND begins_with(GSI3SK, :sk)',
    ExpressionAttributeValues: {
      ':pk': `STUDENT#${studentId}`,
      ':sk': `COHORT#${cohortId}#POSITION`,
    },
  });

  return items.map(toPosition);
}

export async function getPositionByStudentAndPolicy(
  studentId: string,
  cohortId: string,
  policyId: string
): Promise<Position | null> {
  const items = await queryItems<PositionItem>({
    IndexName: 'GSI3',
    KeyConditionExpression: 'GSI3PK = :pk AND GSI3SK = :sk',
    ExpressionAttributeValues: {
      ':pk': `STUDENT#${studentId}`,
      ':sk': `COHORT#${cohortId}#POSITION#${policyId}`,
    },
    Limit: 1,
  });

  return items.length > 0 ? toPosition(items[0]) : null;
}

export async function getPositionsByPolicy(
  cohortId: string,
  policyId: string
): Promise<Position[]> {
  const items = await queryItems<PositionItem>({
    IndexName: 'GSI2',
    KeyConditionExpression: 'GSI2PK = :pk AND begins_with(GSI2SK, :sk)',
    ExpressionAttributeValues: {
      ':pk': `COHORT#${cohortId}`,
      ':sk': `POLICY#${policyId}#POSITION`,
    },
    ScanIndexForward: false, // Most recent first
  });

  return items.map(toPosition);
}

export async function getAllPositionsInCohort(cohortId: string): Promise<Position[]> {
  const items = await queryItems<PositionItem>({
    KeyConditionExpression: 'PK = :pk AND begins_with(SK, :sk)',
    ExpressionAttributeValues: {
      ':pk': `COHORT#${cohortId}`,
      ':sk': 'POSITION#',
    },
  });

  return items.map(toPosition);
}

// Create a revision of an existing position
export async function createPositionRevision(
  originalPositionId: string,
  cohortId: string,
  input: Omit<CreatePositionInput, 'isRevision' | 'originalPositionId'>
): Promise<Position> {
  return createPosition({
    ...input,
    isRevision: true,
    originalPositionId,
  });
}

// Get stance distribution for a policy in a cohort (for analytics)
export async function getStanceDistribution(
  cohortId: string,
  policyId: string
): Promise<Record<Stance, number>> {
  const positions = await getPositionsByPolicy(cohortId, policyId);

  // Only count non-revision positions (or latest if revisions exist)
  const latestByStudent = new Map<string, Position>();
  for (const position of positions) {
    const existing = latestByStudent.get(position.studentId);
    if (!existing || position.createdAt > existing.createdAt) {
      latestByStudent.set(position.studentId, position);
    }
  }

  const distribution: Record<Stance, number> = {
    strongly_support: 0,
    somewhat_support: 0,
    neutral: 0,
    somewhat_oppose: 0,
    strongly_oppose: 0,
  };

  for (const position of latestByStudent.values()) {
    distribution[position.stance]++;
  }

  return distribution;
}
