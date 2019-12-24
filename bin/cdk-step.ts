#!/usr/bin/env node
import 'source-map-support/register';
import cdk = require('@aws-cdk/core');
import { CdkStepStack } from '../lib/cdk-step-stack';

const app = new cdk.App();
new CdkStepStack(app, 'CdkStepStack');
