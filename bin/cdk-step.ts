#!/usr/bin/env node
import 'source-map-support/register';

import { App } from '@aws-cdk/core';

import { CdkStepStack } from '../src/cdk-step-stack';

const app = new App();
new CdkStepStack(app, 'CdkStepStack');
