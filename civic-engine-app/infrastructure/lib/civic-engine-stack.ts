import * as cdk from 'aws-cdk-lib';
import * as dynamodb from 'aws-cdk-lib/aws-dynamodb';
import * as cognito from 'aws-cdk-lib/aws-cognito';
import { Construct } from 'constructs';

export class CivicEngineStack extends cdk.Stack {
  public readonly userPool: cognito.UserPool;
  public readonly userPoolClient: cognito.UserPoolClient;
  public readonly table: dynamodb.Table;

  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // ============================================
    // DynamoDB Table - Single Table Design
    // ============================================
    this.table = new dynamodb.Table(this, 'CivicEngineTable', {
      tableName: 'CivicEngineEducation',
      partitionKey: { name: 'PK', type: dynamodb.AttributeType.STRING },
      sortKey: { name: 'SK', type: dynamodb.AttributeType.STRING },
      billingMode: dynamodb.BillingMode.PAY_PER_REQUEST,
      removalPolicy: cdk.RemovalPolicy.RETAIN,
      pointInTimeRecovery: true,
      encryption: dynamodb.TableEncryption.AWS_MANAGED,
    });

    // GSI1: Email lookups (login), Join code lookups (student join)
    this.table.addGlobalSecondaryIndex({
      indexName: 'GSI1',
      partitionKey: { name: 'GSI1PK', type: dynamodb.AttributeType.STRING },
      sortKey: { name: 'GSI1SK', type: dynamodb.AttributeType.STRING },
      projectionType: dynamodb.ProjectionType.ALL,
    });

    // GSI2: Teacher's cohorts, Students in cohort, Positions/Discussions by policy
    this.table.addGlobalSecondaryIndex({
      indexName: 'GSI2',
      partitionKey: { name: 'GSI2PK', type: dynamodb.AttributeType.STRING },
      sortKey: { name: 'GSI2SK', type: dynamodb.AttributeType.STRING },
      projectionType: dynamodb.ProjectionType.ALL,
    });

    // GSI3: Student-based queries (positions, explorations by student)
    this.table.addGlobalSecondaryIndex({
      indexName: 'GSI3',
      partitionKey: { name: 'GSI3PK', type: dynamodb.AttributeType.STRING },
      sortKey: { name: 'GSI3SK', type: dynamodb.AttributeType.STRING },
      projectionType: dynamodb.ProjectionType.ALL,
    });

    // ============================================
    // Cognito User Pool
    // ============================================
    this.userPool = new cognito.UserPool(this, 'CivicEngineUserPool', {
      userPoolName: 'civic-engine-education',

      // Sign-in configuration
      signInAliases: {
        email: true,
        username: false,
      },

      // Self-service sign-up (teachers register, students join via code)
      selfSignUpEnabled: true,

      // Email verification
      autoVerify: {
        email: true,
      },

      // Password policy
      passwordPolicy: {
        minLength: 8,
        requireLowercase: true,
        requireUppercase: true,
        requireDigits: true,
        requireSymbols: false,
        tempPasswordValidity: cdk.Duration.days(7),
      },

      // Account recovery
      accountRecovery: cognito.AccountRecovery.EMAIL_ONLY,

      // Standard attributes
      standardAttributes: {
        email: {
          required: true,
          mutable: true,
        },
      },

      // Custom attributes for role, school info
      customAttributes: {
        'role': new cognito.StringAttribute({ mutable: true }),
        'schoolName': new cognito.StringAttribute({ mutable: true }),
        'state': new cognito.StringAttribute({ mutable: true }),
      },

      // MFA (optional for teachers)
      mfa: cognito.Mfa.OPTIONAL,
      mfaSecondFactor: {
        sms: false,
        otp: true,
      },

      // Email settings - using Cognito default for now
      // Can be upgraded to SES for production
    });

    // User Pool Domain for hosted UI
    const userPoolDomain = this.userPool.addDomain('CivicEngineDomain', {
      cognitoDomain: {
        domainPrefix: 'civic-engine-edu',
      },
    });

    // User Pool Client (for Next.js browser app)
    this.userPoolClient = this.userPool.addClient('WebClient', {
      userPoolClientName: 'civic-engine-web',

      // Authentication flows
      authFlows: {
        userPassword: true,
        userSrp: true,
      },

      // OAuth settings
      oAuth: {
        flows: {
          authorizationCodeGrant: true,
          implicitCodeGrant: false,
        },
        scopes: [
          cognito.OAuthScope.EMAIL,
          cognito.OAuthScope.OPENID,
          cognito.OAuthScope.PROFILE,
        ],
        callbackUrls: [
          'http://localhost:3000/api/auth/callback',
          'https://civic-engine.app/api/auth/callback',
        ],
        logoutUrls: [
          'http://localhost:3000',
          'https://civic-engine.app',
        ],
      },

      // Token validity
      accessTokenValidity: cdk.Duration.hours(1),
      idTokenValidity: cdk.Duration.hours(1),
      refreshTokenValidity: cdk.Duration.days(30),

      // No secret for browser-based apps
      generateSecret: false,

      // Readable attributes
      readAttributes: new cognito.ClientAttributes()
        .withStandardAttributes({ email: true })
        .withCustomAttributes('role', 'schoolName', 'state'),

      // Writable attributes
      writeAttributes: new cognito.ClientAttributes()
        .withStandardAttributes({ email: true })
        .withCustomAttributes('schoolName', 'state'),
    });

    // ============================================
    // User Pool Groups
    // ============================================
    new cognito.CfnUserPoolGroup(this, 'TeacherGroup', {
      userPoolId: this.userPool.userPoolId,
      groupName: 'teachers',
      description: 'Teachers who create and manage cohorts',
      precedence: 1,
    });

    new cognito.CfnUserPoolGroup(this, 'StudentGroup', {
      userPoolId: this.userPool.userPoolId,
      groupName: 'students',
      description: 'Students who participate in cohorts',
      precedence: 2,
    });

    // ============================================
    // Outputs
    // ============================================
    new cdk.CfnOutput(this, 'UserPoolId', {
      value: this.userPool.userPoolId,
      description: 'Cognito User Pool ID',
      exportName: 'CivicEngineUserPoolId',
    });

    new cdk.CfnOutput(this, 'UserPoolClientId', {
      value: this.userPoolClient.userPoolClientId,
      description: 'Cognito User Pool Client ID',
      exportName: 'CivicEngineUserPoolClientId',
    });

    new cdk.CfnOutput(this, 'UserPoolDomain', {
      value: `${userPoolDomain.domainName}.auth.${this.region}.amazoncognito.com`,
      description: 'Cognito Hosted UI Domain',
      exportName: 'CivicEngineCognitoDomain',
    });

    new cdk.CfnOutput(this, 'DynamoDBTableName', {
      value: this.table.tableName,
      description: 'DynamoDB Table Name',
      exportName: 'CivicEngineDynamoTableName',
    });

    new cdk.CfnOutput(this, 'DynamoDBTableArn', {
      value: this.table.tableArn,
      description: 'DynamoDB Table ARN',
      exportName: 'CivicEngineDynamoTableArn',
    });

    new cdk.CfnOutput(this, 'Region', {
      value: this.region,
      description: 'AWS Region',
    });
  }
}
