# Civic Engine AWS Infrastructure

This directory contains the AWS CDK infrastructure for the Civic Engine education platform.

## Architecture

- **AWS Cognito** - User authentication (teachers & students)
- **AWS DynamoDB** - Database (single-table design)
- **Region**: us-east-1

## Prerequisites

1. **AWS CLI** configured with credentials
   ```bash
   aws configure
   ```

2. **Node.js** 18+ installed

3. **AWS CDK CLI** (installed as dev dependency, or globally)
   ```bash
   npm install -g aws-cdk
   ```

## Setup

### 1. Install Dependencies

```bash
cd civic-engine-app/infrastructure
npm install
```

### 2. Bootstrap CDK (First Time Only)

Bootstrap creates the CDK toolkit stack in your AWS account:

```bash
# Replace YOUR_ACCOUNT_ID with your AWS account ID
npx cdk bootstrap aws://YOUR_ACCOUNT_ID/us-east-1
```

To find your account ID:
```bash
aws sts get-caller-identity --query Account --output text
```

### 3. Deploy the Stack

```bash
npm run deploy
```

Or with the CDK CLI directly:
```bash
npx cdk deploy
```

You'll be prompted to confirm the IAM changes. Type `y` to proceed.

### 4. Note the Outputs

After deployment, CDK will output values like:

```
Outputs:
CivicEngineStack.UserPoolId = us-east-1_xxxxxxxxx
CivicEngineStack.UserPoolClientId = xxxxxxxxxxxxxxxxxx
CivicEngineStack.UserPoolDomain = civic-engine-edu.auth.us-east-1.amazoncognito.com
CivicEngineStack.DynamoDBTableName = CivicEngineEducation
CivicEngineStack.DynamoDBTableArn = arn:aws:dynamodb:us-east-1:...
CivicEngineStack.Region = us-east-1
```

### 5. Update Environment Variables

Copy the outputs to your `.env` file in the `civic-engine-app` root:

```env
# AWS Region
NEXT_PUBLIC_AWS_REGION=us-east-1

# Cognito (from CDK outputs)
NEXT_PUBLIC_COGNITO_USER_POOL_ID=us-east-1_xxxxxxxxx
NEXT_PUBLIC_COGNITO_CLIENT_ID=xxxxxxxxxxxxxxxxxx
NEXT_PUBLIC_COGNITO_DOMAIN=civic-engine-edu.auth.us-east-1.amazoncognito.com

# DynamoDB
DYNAMODB_TABLE_NAME=CivicEngineEducation
```

### 6. Configure AWS Credentials for Next.js

The Next.js app needs AWS credentials to access DynamoDB and Cognito. Options:

**Option A: Use existing Remotion credentials**
Your existing `REMOTION_AWS_ACCESS_KEY_ID` and `REMOTION_AWS_SECRET_ACCESS_KEY` can be used if they have DynamoDB permissions.

**Option B: Create a new IAM user**
1. Go to AWS IAM Console
2. Create a new user with programmatic access
3. Attach the following policies:
   - `AmazonDynamoDBFullAccess` (or a custom policy for just the table)
   - `AmazonCognitoPowerUser` (for admin operations like adding users to groups)

4. Add credentials to `.env`:
```env
AWS_ACCESS_KEY_ID=your_access_key
AWS_SECRET_ACCESS_KEY=your_secret_key
```

**Option C: Use IAM roles (production)**
For production deployments, use IAM roles instead of access keys.

## CDK Commands

```bash
# Synthesize CloudFormation template (preview)
npm run synth

# Compare deployed stack with current state
npm run diff

# Deploy stack
npm run deploy

# Destroy stack (WARNING: deletes all resources)
npm run destroy
```

## Infrastructure Details

### DynamoDB Table: `CivicEngineEducation`

Single-table design with the following access patterns:

| Entity | PK | SK |
|--------|----|----|
| User | `USER#<id>` | `PROFILE` |
| Teacher Profile | `USER#<id>` | `TEACHER_PROFILE` |
| Student Profile | `USER#<id>` | `STUDENT#<cohortId>` |
| Cohort | `COHORT#<id>` | `METADATA` |
| Position | `COHORT#<id>` | `POSITION#<positionId>` |
| Discussion | `COHORT#<id>` | `DISCUSSION#<postId>` |
| Reflection | `COHORT#<id>` | `REFLECTION#<id>` |
| Policy Set | `POLICYSET#<id>` | `METADATA` |

**Global Secondary Indexes:**

| GSI | Purpose |
|-----|---------|
| GSI1 | Email lookups, join code lookups |
| GSI2 | Teacher's cohorts, students in cohort, positions/discussions by policy |
| GSI3 | Student's positions, explorations, reflections |

### Cognito User Pool: `civic-engine-education`

- **Sign-in**: Email only
- **Self-signup**: Enabled
- **Email verification**: Required
- **Password policy**: 8+ chars, uppercase, lowercase, digit
- **MFA**: Optional (TOTP)
- **Groups**: `teachers`, `students`

**Custom Attributes:**
- `custom:role` - "teacher" or "student"
- `custom:schoolName` - Teacher's school
- `custom:state` - Teacher's state

## Troubleshooting

### "Resource already exists"
If you get this error, the resource (like the Cognito domain) may already exist. Either:
- Change the domain prefix in `civic-engine-stack.ts`
- Delete the existing resource manually

### "Bootstrap required"
Run `npx cdk bootstrap` as described above.

### "No credentials"
Ensure AWS CLI is configured: `aws configure`

### Stack rollback
If deployment fails mid-way, CloudFormation may rollback. Check the AWS Console for error details, fix the issue, and redeploy.

## Costs

With PAY_PER_REQUEST billing:
- **DynamoDB**: ~$1.25 per million writes, ~$0.25 per million reads
- **Cognito**: Free for first 50,000 MAU, then $0.0055/MAU

For a typical classroom use case, costs should be minimal (<$5/month).
