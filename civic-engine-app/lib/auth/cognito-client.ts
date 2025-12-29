import {
  CognitoIdentityProviderClient,
  SignUpCommand,
  ConfirmSignUpCommand,
  InitiateAuthCommand,
  RespondToAuthChallengeCommand,
  ForgotPasswordCommand,
  ConfirmForgotPasswordCommand,
  GetUserCommand,
  GlobalSignOutCommand,
  AdminAddUserToGroupCommand,
  AdminGetUserCommand,
} from '@aws-sdk/client-cognito-identity-provider';

const cognitoClient = new CognitoIdentityProviderClient({
  region: process.env.NEXT_PUBLIC_AWS_REGION || 'us-east-1',
});

const CLIENT_ID = process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID!;
const USER_POOL_ID = process.env.NEXT_PUBLIC_COGNITO_USER_POOL_ID!;

export interface AuthTokens {
  accessToken: string;
  idToken: string;
  refreshToken: string;
  expiresIn: number;
}

export interface SignUpInput {
  email: string;
  password: string;
  role: 'teacher' | 'student';
  schoolName?: string;
  state?: string;
}

export interface SignInInput {
  email: string;
  password: string;
}

export interface CognitoUser {
  userId: string;
  email: string;
  role: 'teacher' | 'student';
  schoolName?: string;
  state?: string;
  emailVerified: boolean;
}

// Sign up a new user
export async function signUp(input: SignUpInput): Promise<{ userSub: string }> {
  const userAttributes = [
    { Name: 'email', Value: input.email },
    { Name: 'custom:role', Value: input.role },
  ];

  if (input.schoolName) {
    userAttributes.push({ Name: 'custom:schoolName', Value: input.schoolName });
  }
  if (input.state) {
    userAttributes.push({ Name: 'custom:state', Value: input.state });
  }

  const command = new SignUpCommand({
    ClientId: CLIENT_ID,
    Username: input.email,
    Password: input.password,
    UserAttributes: userAttributes,
  });

  const response = await cognitoClient.send(command);

  if (!response.UserSub) {
    throw new Error('Failed to create user');
  }

  return { userSub: response.UserSub };
}

// Confirm email verification code
export async function confirmSignUp(email: string, code: string): Promise<void> {
  const command = new ConfirmSignUpCommand({
    ClientId: CLIENT_ID,
    Username: email,
    ConfirmationCode: code,
  });

  await cognitoClient.send(command);
}

// Sign in with email and password
export async function signIn(input: SignInInput): Promise<AuthTokens> {
  const command = new InitiateAuthCommand({
    ClientId: CLIENT_ID,
    AuthFlow: 'USER_PASSWORD_AUTH',
    AuthParameters: {
      USERNAME: input.email,
      PASSWORD: input.password,
    },
  });

  const response = await cognitoClient.send(command);

  if (!response.AuthenticationResult) {
    throw new Error('Authentication failed');
  }

  return {
    accessToken: response.AuthenticationResult.AccessToken!,
    idToken: response.AuthenticationResult.IdToken!,
    refreshToken: response.AuthenticationResult.RefreshToken!,
    expiresIn: response.AuthenticationResult.ExpiresIn || 3600,
  };
}

// Refresh access token
export async function refreshTokens(refreshToken: string): Promise<AuthTokens> {
  const command = new InitiateAuthCommand({
    ClientId: CLIENT_ID,
    AuthFlow: 'REFRESH_TOKEN_AUTH',
    AuthParameters: {
      REFRESH_TOKEN: refreshToken,
    },
  });

  const response = await cognitoClient.send(command);

  if (!response.AuthenticationResult) {
    throw new Error('Token refresh failed');
  }

  return {
    accessToken: response.AuthenticationResult.AccessToken!,
    idToken: response.AuthenticationResult.IdToken!,
    refreshToken: refreshToken, // Refresh token stays the same
    expiresIn: response.AuthenticationResult.ExpiresIn || 3600,
  };
}

// Get current user from access token
export async function getCurrentUser(accessToken: string): Promise<CognitoUser> {
  const command = new GetUserCommand({
    AccessToken: accessToken,
  });

  const response = await cognitoClient.send(command);

  const getAttribute = (name: string) => {
    const attr = response.UserAttributes?.find((a) => a.Name === name);
    return attr?.Value;
  };

  return {
    userId: getAttribute('sub')!,
    email: getAttribute('email')!,
    role: (getAttribute('custom:role') as 'teacher' | 'student') || 'student',
    schoolName: getAttribute('custom:schoolName'),
    state: getAttribute('custom:state'),
    emailVerified: getAttribute('email_verified') === 'true',
  };
}

// Sign out (global sign out)
export async function signOut(accessToken: string): Promise<void> {
  const command = new GlobalSignOutCommand({
    AccessToken: accessToken,
  });

  await cognitoClient.send(command);
}

// Initiate forgot password flow
export async function forgotPassword(email: string): Promise<void> {
  const command = new ForgotPasswordCommand({
    ClientId: CLIENT_ID,
    Username: email,
  });

  await cognitoClient.send(command);
}

// Confirm new password with reset code
export async function confirmForgotPassword(
  email: string,
  code: string,
  newPassword: string
): Promise<void> {
  const command = new ConfirmForgotPasswordCommand({
    ClientId: CLIENT_ID,
    Username: email,
    ConfirmationCode: code,
    Password: newPassword,
  });

  await cognitoClient.send(command);
}

// Admin function: Add user to group (requires admin credentials)
export async function addUserToGroup(
  userId: string,
  groupName: 'teachers' | 'students'
): Promise<void> {
  const command = new AdminAddUserToGroupCommand({
    UserPoolId: USER_POOL_ID,
    Username: userId,
    GroupName: groupName,
  });

  await cognitoClient.send(command);
}

// Parse JWT to get claims (client-side only, not for verification)
export function parseIdToken(idToken: string): Record<string, unknown> {
  const payload = idToken.split('.')[1];
  const decoded = Buffer.from(payload, 'base64').toString('utf-8');
  return JSON.parse(decoded);
}
