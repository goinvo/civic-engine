# Civic Engine Education System Setup

This document describes how to set up the education system backend with AWS Cognito (authentication) and DynamoDB (database).

## Quick Start

```bash
# 1. Install dependencies
cd civic-engine-app
npm install

cd infrastructure
npm install

# 2. Bootstrap CDK (first time only)
npx cdk bootstrap aws://YOUR_ACCOUNT_ID/us-east-1

# 3. Deploy infrastructure
npm run deploy

# 4. Copy outputs to .env (see below)

# 5. Start the app
cd ..
npm run dev
```

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                      Next.js App                            │
├─────────────────────────────────────────────────────────────┤
│  Frontend (React)          │  API Routes (/api/*)          │
│  - AuthProvider            │  - /auth/register, login      │
│  - useAuth() hook          │  - /cohorts                   │
│  - Protected components    │  - /join/[joinCode]           │
│                            │  - /positions, /discussions   │
└────────────┬───────────────┴───────────────┬────────────────┘
             │                               │
             ▼                               ▼
┌─────────────────────────┐    ┌─────────────────────────────┐
│    AWS Cognito          │    │      AWS DynamoDB           │
│    (Authentication)     │    │      (Database)             │
├─────────────────────────┤    ├─────────────────────────────┤
│ - User Pool             │    │ - CivicEngineEducation      │
│ - Teachers group        │    │ - Single-table design       │
│ - Students group        │    │ - 3 GSIs for queries        │
│ - Email verification    │    │ - Pay-per-request billing   │
└─────────────────────────┘    └─────────────────────────────┘
```

## File Structure

```
civic-engine-app/
├── infrastructure/           # AWS CDK infrastructure
│   ├── bin/
│   │   └── civic-engine-infra.ts
│   ├── lib/
│   │   └── civic-engine-stack.ts
│   ├── package.json
│   └── README.md            # Detailed deployment docs
│
├── lib/
│   ├── auth/                # Authentication utilities
│   │   ├── cognito-client.ts    # Cognito SDK wrapper
│   │   ├── auth-context.tsx     # React auth context
│   │   └── verify-token.ts      # JWT verification
│   │
│   └── db/                  # Database layer
│       ├── dynamodb-client.ts   # DynamoDB client
│       └── repositories/        # Data access
│           ├── user-repository.ts
│           ├── cohort-repository.ts
│           ├── position-repository.ts
│           ├── discussion-repository.ts
│           └── reflection-repository.ts
│
├── app/api/                 # API routes
│   ├── auth/
│   │   ├── register/route.ts
│   │   ├── login/route.ts
│   │   ├── verify/route.ts
│   │   └── me/route.ts
│   ├── cohorts/
│   │   ├── route.ts
│   │   └── [cohortId]/route.ts
│   ├── join/
│   │   └── [joinCode]/route.ts
│   ├── positions/route.ts
│   └── discussions/route.ts
│
└── types/
    └── education.ts         # TypeScript types
```

## Environment Variables

After deploying CDK, update `.env`:

```env
# AWS Region
NEXT_PUBLIC_AWS_REGION=us-east-1

# Cognito (from CDK outputs)
NEXT_PUBLIC_COGNITO_USER_POOL_ID=us-east-1_xxxxxxxxx
NEXT_PUBLIC_COGNITO_CLIENT_ID=xxxxxxxxxxxxxxxxxx
NEXT_PUBLIC_COGNITO_DOMAIN=civic-engine-edu.auth.us-east-1.amazoncognito.com

# DynamoDB
DYNAMODB_TABLE_NAME=CivicEngineEducation

# AWS credentials (for DynamoDB access)
# Option 1: Use existing Remotion credentials if they have DynamoDB access
# Option 2: Add new credentials with DynamoDB permissions
AWS_ACCESS_KEY_ID=your_key
AWS_SECRET_ACCESS_KEY=your_secret
```

## API Endpoints

### Authentication

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/auth/register` | POST | Register teacher (email, password, school info) |
| `/api/auth/login` | POST | Sign in (returns tokens) |
| `/api/auth/verify` | POST | Verify email with code |
| `/api/auth/me` | GET | Get current user profile |

### Cohorts (Teachers)

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/cohorts` | GET | List teacher's cohorts |
| `/api/cohorts` | POST | Create new cohort |
| `/api/cohorts/[id]` | GET | Get cohort details |
| `/api/cohorts/[id]` | PUT | Update cohort |
| `/api/cohorts/[id]` | POST | Advance cohort phase |

### Student Join

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/join/[code]` | GET | Validate join code |
| `/api/join/[code]` | POST | Join cohort as student |

### Positions & Discussions

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/positions` | GET | Get positions (student's own or by policy) |
| `/api/positions` | POST | Submit position |
| `/api/discussions` | GET | Get discussion threads |
| `/api/discussions` | POST | Create post/reply |

## Using Authentication in Components

```tsx
'use client';
import { useAuth } from '@/lib/auth/auth-context';

export function MyComponent() {
  const { user, isAuthenticated, isLoading, signIn, signOut } = useAuth();

  if (isLoading) return <div>Loading...</div>;

  if (!isAuthenticated) {
    return <button onClick={() => signIn('email@example.com', 'password')}>Sign In</button>;
  }

  return (
    <div>
      <p>Welcome, {user?.displayName}</p>
      <p>Role: {user?.role}</p>
      <button onClick={signOut}>Sign Out</button>
    </div>
  );
}
```

## Making Authenticated API Calls

```tsx
import { getAccessToken } from '@/lib/auth/auth-context';

async function fetchCohorts() {
  const token = getAccessToken();

  const response = await fetch('/api/cohorts', {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  return response.json();
}
```

## User Flows

### Teacher Registration
1. POST `/api/auth/register` with email, password, role="teacher", schoolName, state
2. Check email for verification code
3. POST `/api/auth/verify` with email and code
4. POST `/api/auth/login` to get tokens

### Student Join
1. Teacher creates cohort, gets 6-character join code
2. Student registers (or uses existing account)
3. GET `/api/join/[code]` to validate code
4. POST `/api/join/[code]` to join cohort

### Cohort Phases
1. `not_started` - Cohort created, not yet active
2. `exploration` - Students read policies
3. `positions` - Students submit positions
4. `discussion` - Students discuss policies
5. `revision` - Students can revise positions
6. `reflection` - Students submit final reflection
7. `completed` - Cohort finished

## Cost Estimates

| Service | Pricing | Typical Monthly Cost |
|---------|---------|---------------------|
| DynamoDB | $1.25/M writes, $0.25/M reads | < $5 |
| Cognito | Free up to 50K MAU | $0 |
| **Total** | | **< $5/month** |

## Troubleshooting

### "Unauthorized" errors
- Check that the access token is being sent in the Authorization header
- Tokens expire after 1 hour; use refresh token to get new access token
- Verify the Cognito User Pool ID and Client ID in .env match CDK outputs

### "User not found" in DynamoDB
- Ensure the user was created in both Cognito AND DynamoDB
- The register endpoint creates records in both

### CDK deployment issues
- See `infrastructure/README.md` for detailed troubleshooting
