import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import {
  DynamoDBDocumentClient,
  PutCommand,
  GetCommand,
  QueryCommand,
  UpdateCommand,
  DeleteCommand,
  BatchWriteCommand,
  type PutCommandInput,
  type GetCommandInput,
  type QueryCommandInput,
  type UpdateCommandInput,
  type DeleteCommandInput,
} from '@aws-sdk/lib-dynamodb';

const client = new DynamoDBClient({
  region: process.env.NEXT_PUBLIC_AWS_REGION || 'us-east-1',
});

export const docClient = DynamoDBDocumentClient.from(client, {
  marshallOptions: {
    removeUndefinedValues: true,
    convertEmptyValues: false,
  },
  unmarshallOptions: {
    wrapNumbers: false,
  },
});

export const TABLE_NAME = process.env.DYNAMODB_TABLE_NAME || 'CivicEngineEducation';

// Entity type prefixes for single-table design
export const EntityType = {
  USER: 'USER',
  TEACHER_PROFILE: 'TEACHER_PROFILE',
  STUDENT_PROFILE: 'STUDENT_PROFILE',
  COHORT: 'COHORT',
  POLICY_SET: 'POLICY_SET',
  POSITION: 'POSITION',
  DISCUSSION: 'DISCUSSION',
  EXPLORATION: 'EXPLORATION',
  REFLECTION: 'REFLECTION',
} as const;

// Key builders for consistent key construction
export const Keys = {
  // User keys
  user: (userId: string) => ({
    PK: `USER#${userId}`,
    SK: 'PROFILE',
  }),
  userByEmail: (email: string) => ({
    GSI1PK: `EMAIL#${email.toLowerCase()}`,
    GSI1SK: 'USER',
  }),
  teacherProfile: (userId: string) => ({
    PK: `USER#${userId}`,
    SK: 'TEACHER_PROFILE',
  }),
  studentProfile: (userId: string, cohortId: string) => ({
    PK: `USER#${userId}`,
    SK: `STUDENT#${cohortId}`,
  }),

  // Cohort keys
  cohort: (cohortId: string) => ({
    PK: `COHORT#${cohortId}`,
    SK: 'METADATA',
  }),
  cohortByJoinCode: (joinCode: string) => ({
    GSI1PK: `JOINCODE#${joinCode.toUpperCase()}`,
    GSI1SK: 'COHORT',
  }),
  cohortsByTeacher: (teacherId: string) => ({
    GSI2PK: `TEACHER#${teacherId}`,
  }),
  studentsInCohort: (cohortId: string) => ({
    GSI2PK: `COHORT#${cohortId}`,
  }),

  // Position keys
  position: (cohortId: string, positionId: string) => ({
    PK: `COHORT#${cohortId}`,
    SK: `POSITION#${positionId}`,
  }),
  positionsByPolicy: (cohortId: string, policyId: string) => ({
    GSI2PK: `COHORT#${cohortId}`,
    GSI2SK: `POLICY#${policyId}#POSITION`,
  }),
  positionsByStudent: (studentId: string, cohortId: string) => ({
    GSI3PK: `STUDENT#${studentId}`,
    GSI3SK: `COHORT#${cohortId}#POSITION`,
  }),

  // Discussion keys
  discussion: (cohortId: string, postId: string) => ({
    PK: `COHORT#${cohortId}`,
    SK: `DISCUSSION#${postId}`,
  }),
  discussionsByPolicy: (cohortId: string, policyId: string) => ({
    GSI2PK: `COHORT#${cohortId}`,
    GSI2SK: `POLICY#${policyId}#DISCUSSION`,
  }),

  // Exploration keys
  exploration: (cohortId: string, studentId: string, policyId: string) => ({
    PK: `COHORT#${cohortId}`,
    SK: `EXPLORATION#${studentId}#${policyId}`,
  }),
  explorationsByStudent: (studentId: string, cohortId: string) => ({
    GSI3PK: `STUDENT#${studentId}`,
    GSI3SK: `COHORT#${cohortId}#EXPLORATION`,
  }),

  // Reflection keys
  reflection: (cohortId: string, reflectionId: string) => ({
    PK: `COHORT#${cohortId}`,
    SK: `REFLECTION#${reflectionId}`,
  }),
  reflectionByStudent: (studentId: string, cohortId: string) => ({
    GSI3PK: `STUDENT#${studentId}`,
    GSI3SK: `COHORT#${cohortId}#REFLECTION`,
  }),

  // Policy Set keys
  policySet: (policySetId: string) => ({
    PK: `POLICYSET#${policySetId}`,
    SK: 'METADATA',
  }),
};

// Helper functions for common operations
export async function putItem(
  item: object
): Promise<void> {
  const params: PutCommandInput = {
    TableName: TABLE_NAME,
    Item: item,
  };
  await docClient.send(new PutCommand(params));
}

export async function getItem<T>(
  pk: string,
  sk: string
): Promise<T | null> {
  const params: GetCommandInput = {
    TableName: TABLE_NAME,
    Key: { PK: pk, SK: sk },
  };
  const result = await docClient.send(new GetCommand(params));
  return (result.Item as T) || null;
}

export async function queryItems<T>(
  params: Omit<QueryCommandInput, 'TableName'>
): Promise<T[]> {
  const result = await docClient.send(
    new QueryCommand({
      TableName: TABLE_NAME,
      ...params,
    })
  );
  return (result.Items as T[]) || [];
}

export async function queryItemsWithPagination<T>(
  params: Omit<QueryCommandInput, 'TableName'>,
  limit?: number
): Promise<{ items: T[]; lastKey?: Record<string, unknown> }> {
  const result = await docClient.send(
    new QueryCommand({
      TableName: TABLE_NAME,
      ...params,
      Limit: limit,
    })
  );
  return {
    items: (result.Items as T[]) || [],
    lastKey: result.LastEvaluatedKey,
  };
}

export async function updateItem(
  pk: string,
  sk: string,
  updateExpression: string,
  expressionAttributeValues: Record<string, unknown>,
  expressionAttributeNames?: Record<string, string>
): Promise<void> {
  const params: UpdateCommandInput = {
    TableName: TABLE_NAME,
    Key: { PK: pk, SK: sk },
    UpdateExpression: updateExpression,
    ExpressionAttributeValues: expressionAttributeValues,
    ExpressionAttributeNames: expressionAttributeNames,
  };
  await docClient.send(new UpdateCommand(params));
}

export async function deleteItem(pk: string, sk: string): Promise<void> {
  const params: DeleteCommandInput = {
    TableName: TABLE_NAME,
    Key: { PK: pk, SK: sk },
  };
  await docClient.send(new DeleteCommand(params));
}

// Generate a unique ID
export function generateId(): string {
  return crypto.randomUUID();
}

// Generate a join code (6 uppercase alphanumeric characters)
export function generateJoinCode(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // Exclude similar chars (0,O,1,I)
  let code = '';
  for (let i = 0; i < 6; i++) {
    code += chars[Math.floor(Math.random() * chars.length)];
  }
  return code;
}
