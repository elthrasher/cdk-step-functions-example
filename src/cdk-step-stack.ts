import { Runtime } from 'aws-cdk-lib/aws-lambda';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import { Chain, Choice, Condition, Fail, StateMachine } from 'aws-cdk-lib/aws-stepfunctions';
import { LambdaInvoke } from 'aws-cdk-lib/aws-stepfunctions-tasks';
import { Stack, StackProps } from 'aws-cdk-lib/core';
import { Construct } from 'constructs';

const lambdaPath = `${__dirname}/lambda`;

export class CdkStepStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const lambdaProps = {
      handler: 'handler',
      runtime: Runtime.NODEJS_14_X,
    };

    const assignCaseLambda = new NodejsFunction(this, 'assignCaseFunction', {
      ...lambdaProps,
      entry: `${lambdaPath}/assign-case.ts`,
    });

    const closeCaseLambda = new NodejsFunction(this, 'closeCaseFunction', {
      ...lambdaProps,
      entry: `${lambdaPath}/close-case.ts`,
    });

    const escalateCaseLambda = new NodejsFunction(this, 'escalateCaseFunction', {
      ...lambdaProps,
      entry: `${lambdaPath}/escalate-case.ts`,
    });

    const openCaseLambda = new NodejsFunction(this, 'openCaseFunction', {
      ...lambdaProps,
      entry: `${lambdaPath}/open-case.ts`,
    });

    const workOnCaseLambda = new NodejsFunction(this, 'workOnCaseFunction', {
      ...lambdaProps,
      entry: `${lambdaPath}/work-on-case.ts`,
    });

    const assignCase = new LambdaInvoke(this, 'Assign Case', {
      lambdaFunction: assignCaseLambda,
      outputPath: '$.Payload',
    });

    const closeCase = new LambdaInvoke(this, 'Close Case', {
      lambdaFunction: closeCaseLambda,
      outputPath: '$.Payload',
    });

    const escalateCase = new LambdaInvoke(this, 'Escalate Case', {
      lambdaFunction: escalateCaseLambda,
      outputPath: '$.Payload',
    });

    const openCase = new LambdaInvoke(this, 'Open Case', {
      lambdaFunction: openCaseLambda,
      outputPath: '$.Payload',
    });

    const workOnCase = new LambdaInvoke(this, 'Work On Case', {
      lambdaFunction: workOnCaseLambda,
      outputPath: '$.Payload',
    });

    const jobFailed = new Fail(this, 'Fail', {
      cause: 'Engage Tier 2 Support',
    });

    const isComplete = new Choice(this, 'Is Case Resolved');

    const chain = Chain.start(openCase)
      .next(assignCase)
      .next(workOnCase)
      .next(
        isComplete
          .when(Condition.numberEquals('$.Status', 1), closeCase)
          .when(Condition.numberEquals('$.Status', 0), escalateCase.next(jobFailed)),
      );

    new StateMachine(this, 'StateMachine', {
      definition: chain,
    });
  }
}
