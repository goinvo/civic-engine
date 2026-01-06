import { CognitoJwtVerifier } from 'aws-jwt-verify';

// Lazy-initialized verifiers to avoid build-time errors when env vars aren't set
let _accessTokenVerifier: ReturnType<typeof CognitoJwtVerifier.create> | null = null;
let _idTokenVerifier: ReturnType<typeof CognitoJwtVerifier.create> | null = null;

function getAccessTokenVerifier() {
  if (!_accessTokenVerifier) {
    const userPoolId = process.env.NEXT_PUBLIC_COGNITO_USER_POOL_ID;
    const clientId = process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID;

    if (!userPoolId || !clientId) {
      throw new Error('Cognito configuration not available');
    }

    _accessTokenVerifier = CognitoJwtVerifier.create({
      userPoolId,
      tokenUse: 'access',
      clientId,
    });
  }
  return _accessTokenVerifier;
}

function getIdTokenVerifier() {
  if (!_idTokenVerifier) {
    const userPoolId = process.env.NEXT_PUBLIC_COGNITO_USER_POOL_ID;
    const clientId = process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID;

    if (!userPoolId || !clientId) {
      throw new Error('Cognito configuration not available');
    }

    _idTokenVerifier = CognitoJwtVerifier.create({
      userPoolId,
      tokenUse: 'id',
      clientId,
    });
  }
  return _idTokenVerifier;
}

export interface VerifiedUser {
  userId: string;
  email: string;
  role: 'teacher' | 'student';
  groups: string[];
}

export async function verifyAccessToken(token: string): Promise<VerifiedUser> {
  try {
    const payload = await getAccessTokenVerifier().verify(token);

    return {
      userId: payload.sub,
      email: (payload.username as string) || '',
      role: 'student', // Default, will be overridden by groups
      groups: (payload['cognito:groups'] as string[]) || [],
    };
  } catch (error) {
    throw new Error('Invalid access token');
  }
}

export async function verifyIdToken(token: string): Promise<VerifiedUser> {
  try {
    const payload = await getIdTokenVerifier().verify(token);

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
