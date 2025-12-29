import {
  putItem,
  getItem,
  queryItems,
  Keys,
  EntityType,
  generateId,
} from '../dynamodb-client';
import type { Reflection } from '@/types/education';

// DynamoDB item type
interface ReflectionItem {
  PK: string;
  SK: string;
  GSI3PK: string;
  GSI3SK: string;
  entityType: string;
  id: string;
  studentId: string;
  cohortId: string;
  topPriorities: string[];
  priorityReasoning: string;
  learningReflection: string;
  discussionReflection: string;
  completedAt: string;
}

// Convert DB item to domain model
function toReflection(item: ReflectionItem): Reflection {
  return {
    id: item.id,
    studentId: item.studentId,
    cohortId: item.cohortId,
    topPriorities: item.topPriorities,
    priorityReasoning: item.priorityReasoning,
    learningReflection: item.learningReflection,
    discussionReflection: item.discussionReflection,
    completedAt: new Date(item.completedAt),
  };
}

// Create reflection input
export interface CreateReflectionInput {
  studentId: string;
  cohortId: string;
  topPriorities: string[];
  priorityReasoning: string;
  learningReflection: string;
  discussionReflection: string;
}

// Repository functions
export async function createReflection(
  input: CreateReflectionInput
): Promise<Reflection> {
  const id = generateId();
  const now = new Date();
  const keys = Keys.reflection(input.cohortId, id);

  const item: ReflectionItem = {
    ...keys,
    GSI3PK: `STUDENT#${input.studentId}`,
    GSI3SK: `COHORT#${input.cohortId}#REFLECTION`,
    entityType: EntityType.REFLECTION,
    id,
    studentId: input.studentId,
    cohortId: input.cohortId,
    topPriorities: input.topPriorities,
    priorityReasoning: input.priorityReasoning,
    learningReflection: input.learningReflection,
    discussionReflection: input.discussionReflection,
    completedAt: now.toISOString(),
  };

  await putItem(item);
  return toReflection(item);
}

export async function getReflectionById(
  cohortId: string,
  reflectionId: string
): Promise<Reflection | null> {
  const keys = Keys.reflection(cohortId, reflectionId);
  const item = await getItem<ReflectionItem>(keys.PK, keys.SK);
  return item ? toReflection(item) : null;
}

export async function getReflectionByStudent(
  studentId: string,
  cohortId: string
): Promise<Reflection | null> {
  const items = await queryItems<ReflectionItem>({
    IndexName: 'GSI3',
    KeyConditionExpression: 'GSI3PK = :pk AND GSI3SK = :sk',
    ExpressionAttributeValues: {
      ':pk': `STUDENT#${studentId}`,
      ':sk': `COHORT#${cohortId}#REFLECTION`,
    },
    Limit: 1,
  });

  return items.length > 0 ? toReflection(items[0]) : null;
}

export async function getReflectionsInCohort(cohortId: string): Promise<Reflection[]> {
  const items = await queryItems<ReflectionItem>({
    KeyConditionExpression: 'PK = :pk AND begins_with(SK, :sk)',
    ExpressionAttributeValues: {
      ':pk': `COHORT#${cohortId}`,
      ':sk': 'REFLECTION#',
    },
  });

  return items.map(toReflection);
}

// Get priority rankings across all students in a cohort
export async function getPriorityRankings(
  cohortId: string
): Promise<{ policyId: string; count: number; averageRank: number }[]> {
  const reflections = await getReflectionsInCohort(cohortId);

  const policyStats = new Map<string, { count: number; totalRank: number }>();

  for (const reflection of reflections) {
    reflection.topPriorities.forEach((policyId, index) => {
      const rank = index + 1; // 1-indexed rank
      const existing = policyStats.get(policyId) || { count: 0, totalRank: 0 };
      policyStats.set(policyId, {
        count: existing.count + 1,
        totalRank: existing.totalRank + rank,
      });
    });
  }

  const rankings = Array.from(policyStats.entries()).map(([policyId, stats]) => ({
    policyId,
    count: stats.count,
    averageRank: stats.count > 0 ? stats.totalRank / stats.count : 0,
  }));

  // Sort by count (descending), then by average rank (ascending)
  rankings.sort((a, b) => {
    if (b.count !== a.count) return b.count - a.count;
    return a.averageRank - b.averageRank;
  });

  return rankings;
}

// Get completion rate for reflections in a cohort
export async function getReflectionCompletionRate(
  cohortId: string,
  totalStudents: number
): Promise<number> {
  const reflections = await getReflectionsInCohort(cohortId);
  if (totalStudents === 0) return 0;
  return Math.round((reflections.length / totalStudents) * 100);
}
