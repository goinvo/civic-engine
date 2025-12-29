#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { CivicEngineStack } from '../lib/civic-engine-stack';

const app = new cdk.App();

new CivicEngineStack(app, 'CivicEngineStack', {
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: 'us-east-1', // Match existing Remotion Lambda setup
  },
  description: 'Civic Engine Education Platform - Cognito Auth + DynamoDB',
});
