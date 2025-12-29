import {
  putItem,
  getItem,
  queryItems,
  updateItem,
  Keys,
  EntityType,
  TABLE_NAME,
} from '../dynamodb-client';
import type { User, TeacherProfile, StudentProfile, GradeLevel } from '@/types/education';

// DynamoDB item types
interface UserItem {
  PK: string;
  SK: string;
  GSI1PK: string;
  GSI1SK: string;
  entityType: string;
  id: string;
  email: string;
  displayName: string;
  role: 'teacher' | 'student';
  createdAt: string;
}

interface TeacherProfileItem {
  PK: string;
  SK: string;
  entityType: string;
  userId: string;
  schoolName: string;
  state: string;
  gradeLevels: GradeLevel[];
  createdAt: string;
}

interface StudentProfileItem {
  PK: string;
  SK: string;
  GSI2PK: string;
  GSI2SK: string;
  entityType: string;
  userId: string;
  cohortId: string;
  joinedAt: string;
}

// Convert DB item to domain model
function toUser(item: UserItem): User {
  return {
    id: item.id,
    email: item.email,
    displayName: item.displayName,
    role: item.role,
    createdAt: new Date(item.createdAt),
  };
}

function toTeacherProfile(item: TeacherProfileItem): TeacherProfile {
  return {
    userId: item.userId,
    schoolName: item.schoolName,
    state: item.state,
    gradeLevels: item.gradeLevels,
  };
}

function toStudentProfile(item: StudentProfileItem): StudentProfile {
  return {
    userId: item.userId,
    cohortId: item.cohortId,
    joinedAt: new Date(item.joinedAt),
  };
}

// Repository functions
export async function createUser(
  user: Omit<User, 'createdAt'> & { createdAt?: Date }
): Promise<User> {
  const now = user.createdAt || new Date();
  const keys = Keys.user(user.id);
  const emailKeys = Keys.userByEmail(user.email);

  const item: UserItem = {
    ...keys,
    ...emailKeys,
    entityType: EntityType.USER,
    id: user.id,
    email: user.email.toLowerCase(),
    displayName: user.displayName,
    role: user.role,
    createdAt: now.toISOString(),
  };

  await putItem(item);
  return toUser(item);
}

export async function getUserById(userId: string): Promise<User | null> {
  const keys = Keys.user(userId);
  const item = await getItem<UserItem>(keys.PK, keys.SK);
  return item ? toUser(item) : null;
}

export async function getUserByEmail(email: string): Promise<User | null> {
  const emailKeys = Keys.userByEmail(email);

  const items = await queryItems<UserItem>({
    IndexName: 'GSI1',
    KeyConditionExpression: 'GSI1PK = :pk AND GSI1SK = :sk',
    ExpressionAttributeValues: {
      ':pk': emailKeys.GSI1PK,
      ':sk': emailKeys.GSI1SK,
    },
    Limit: 1,
  });

  return items.length > 0 ? toUser(items[0]) : null;
}

export async function updateUser(
  userId: string,
  updates: Partial<Pick<User, 'displayName'>>
): Promise<void> {
  const keys = Keys.user(userId);
  const expressions: string[] = [];
  const values: Record<string, unknown> = {};

  if (updates.displayName !== undefined) {
    expressions.push('displayName = :displayName');
    values[':displayName'] = updates.displayName;
  }

  if (expressions.length > 0) {
    await updateItem(
      keys.PK,
      keys.SK,
      `SET ${expressions.join(', ')}`,
      values
    );
  }
}

// Teacher Profile
export async function createTeacherProfile(
  profile: TeacherProfile
): Promise<TeacherProfile> {
  const keys = Keys.teacherProfile(profile.userId);

  const item: TeacherProfileItem = {
    ...keys,
    entityType: EntityType.TEACHER_PROFILE,
    userId: profile.userId,
    schoolName: profile.schoolName,
    state: profile.state,
    gradeLevels: profile.gradeLevels,
    createdAt: new Date().toISOString(),
  };

  await putItem(item);
  return toTeacherProfile(item);
}

export async function getTeacherProfile(
  userId: string
): Promise<TeacherProfile | null> {
  const keys = Keys.teacherProfile(userId);
  const item = await getItem<TeacherProfileItem>(keys.PK, keys.SK);
  return item ? toTeacherProfile(item) : null;
}

export async function updateTeacherProfile(
  userId: string,
  updates: Partial<Omit<TeacherProfile, 'userId'>>
): Promise<void> {
  const keys = Keys.teacherProfile(userId);
  const expressions: string[] = [];
  const values: Record<string, unknown> = {};

  if (updates.schoolName !== undefined) {
    expressions.push('schoolName = :schoolName');
    values[':schoolName'] = updates.schoolName;
  }
  if (updates.state !== undefined) {
    expressions.push('#state = :state');
    values[':state'] = updates.state;
  }
  if (updates.gradeLevels !== undefined) {
    expressions.push('gradeLevels = :gradeLevels');
    values[':gradeLevels'] = updates.gradeLevels;
  }

  if (expressions.length > 0) {
    await updateItem(
      keys.PK,
      keys.SK,
      `SET ${expressions.join(', ')}`,
      values,
      updates.state !== undefined ? { '#state': 'state' } : undefined
    );
  }
}

// Student Profile
export async function createStudentProfile(
  profile: Omit<StudentProfile, 'joinedAt'> & { joinedAt?: Date }
): Promise<StudentProfile> {
  const now = profile.joinedAt || new Date();
  const keys = Keys.studentProfile(profile.userId, profile.cohortId);

  const item: StudentProfileItem = {
    ...keys,
    GSI2PK: `COHORT#${profile.cohortId}`,
    GSI2SK: `STUDENT#${profile.userId}`,
    entityType: EntityType.STUDENT_PROFILE,
    userId: profile.userId,
    cohortId: profile.cohortId,
    joinedAt: now.toISOString(),
  };

  await putItem(item);
  return toStudentProfile(item);
}

export async function getStudentProfile(
  userId: string,
  cohortId: string
): Promise<StudentProfile | null> {
  const keys = Keys.studentProfile(userId, cohortId);
  const item = await getItem<StudentProfileItem>(keys.PK, keys.SK);
  return item ? toStudentProfile(item) : null;
}

export async function getStudentCohorts(userId: string): Promise<StudentProfile[]> {
  const items = await queryItems<StudentProfileItem>({
    KeyConditionExpression: 'PK = :pk AND begins_with(SK, :sk)',
    ExpressionAttributeValues: {
      ':pk': `USER#${userId}`,
      ':sk': 'STUDENT#',
    },
  });

  return items.map(toStudentProfile);
}

export async function getStudentsInCohort(cohortId: string): Promise<StudentProfile[]> {
  const items = await queryItems<StudentProfileItem>({
    IndexName: 'GSI2',
    KeyConditionExpression: 'GSI2PK = :pk AND begins_with(GSI2SK, :sk)',
    ExpressionAttributeValues: {
      ':pk': `COHORT#${cohortId}`,
      ':sk': 'STUDENT#',
    },
  });

  return items.map(toStudentProfile);
}
