import { CognitoJwtVerifier } from 'aws-jwt-verify';

// Verifier for access tokens (API authorization)
const accessTokenVerifier = CognitoJwtVerifier.create({
  userPoolId: process.env.NEXT_PUBLIC_COGNITO_USER_POOL_ID!,
  tokenUse: 'access',
  clientId: process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID!,
});

// Verifier for ID tokens (user identity)
const idTokenVerifier = CognitoJwtVerifier.create({
  userPoolId: process.env.NEXT_PUBLIC_COGNITO_USER_POOL_ID!,
  tokenUse: 'id',
  clientId: process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID!,
});

export interface VerifiedUser {
  userId: string;
  email: string;
  role: 'teacher' | 'student';
  groups: string[];
}

export async function verifyAccessToken(token: string): Promise<VerifiedUser> {
  try {
    const payload = await accessTokenVerifier.verify(token);

    return {
      userId: payload.sub,
      email: payload.username || '',
      role: 'student', // Default, will be overridden by groups
      groups: (payload['cognito:groups'] as string[]) || [],
    };
  } catch (error) {
    throw new Error('Invalid access token');
  }
}

export async function verifyIdToken(token: string): Promise<VerifiedUser> {
  try {
    const payload = await idTokenVerifier.verify(token);

    const role = (payload['custom:role'] as 'teacher' | 'student') || 'student';
    const groups = (payload['cognito:groups'] as string[]) || [];

    return {
      userId: payload.sub,
      email: payload.email as string,
      role,
      groups,
    };
  } catch (error) {
    throw new Error('Invalid ID token');
  }
}

// Helper to extract token from Authorization header
export function extractBearerToken(authHeader: string | null): string | null {
  if (!authHeader) return null;
  if (!authHeader.startsWith('Bearer ')) return null;
  return authHeader.slice(7);
}

// Middleware helper for API routes
export async function authenticateRequest(
  request: Request
): Promise<VerifiedUser | null> {
  const authHeader = request.headers.get('Authorization');
  const token = extractBearerToken(authHeader);

  if (!token) {
    return null;
  }

  try {
    return await verifyAccessToken(token);
  } catch {
    return null;
  }
}

// Check if user is a teacher
export function isTeacher(user: VerifiedUser): boolean {
  return user.role === 'teacher' || user.groups.includes('teachers');
}

// Check if user is a student
export function isStudent(user: VerifiedUser): boolean {
  return user.role === 'student' || user.groups.includes('students');
}
