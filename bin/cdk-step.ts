#!/usr/bin/env node
import { App } from 'aws-cdk-lib';

import { CdkStepStack } from '../src/cdk-step-stack';

const app = new App();
new CdkStepStack(app, 'CdkStepStack');
