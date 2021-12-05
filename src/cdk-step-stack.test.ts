import { Template } from 'aws-cdk-lib/assertions';
import { App } from 'aws-cdk-lib';

import { CdkStepStack } from './cdk-step-stack';

test('Step Functions for Cases', () => {
  const app = new App();
  const stack = new CdkStepStack(app, 'MyTestStack');
  const template = Template.fromStack(stack);

  template.resourceCountIs('AWS::IAM::Policy', 1);
  template.resourceCountIs('AWS::IAM::Role', 6);
  template.resourceCountIs('AWS::Lambda::Function', 5);
  template.resourceCountIs('AWS::StepFunctions::StateMachine', 1);

  expect(template.toJSON()).toMatchSnapshot();
});
