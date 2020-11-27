import { Runtime } from '@aws-cdk/aws-lambda';
import { NodejsFunction } from '@aws-cdk/aws-lambda-nodejs';
import { Chain, Choice, Condition, Fail, StateMachine } from '@aws-cdk/aws-stepfunctions';
import { LambdaInvoke } from '@aws-cdk/aws-stepfunctions-tasks';
import { Construct, Stack, StackProps } from '@aws-cdk/core';

const lambdaPath = `${__dirname}/lambda`;

export class CdkStepStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const assignCaseLambda = new NodejsFunction(this, 'assignCaseFunction', {
      entry: `${lambdaPath}/assign-case.ts`,
      handler: 'handler',
      runtime: Runtime.NODEJS_12_X,
    });

    const closeCaseLambda = new NodejsFunction(this, 'closeCaseFunction', {
      entry: `${lambdaPath}/close-case.ts`,
      handler: 'handler',
      runtime: Runtime.NODEJS_12_X,
    });

    const escalateCaseLambda = new NodejsFunction(this, 'escalateCaseFunction', {
      entry: `${lambdaPath}/escalate-case.ts`,
      handler: 'handler',
      runtime: Runtime.NODEJS_12_X,
    });

    const openCaseLambda = new NodejsFunction(this, 'openCaseFunction', {
      entry: `${lambdaPath}/open-case.ts`,
      handler: 'handler',
      runtime: Runtime.NODEJS_12_X,
    });

    const workOnCaseLambda = new NodejsFunction(this, 'workOnCaseFunction', {
      entry: `${lambdaPath}/work-on-case.ts`,
      handler: 'handler',
      runtime: Runtime.NODEJS_12_X,
    });

    const assignCase = new LambdaInvoke(this, 'Assign Case', {
      lambdaFunction: assignCaseLambda,
    });

    const closeCase = new LambdaInvoke(this, 'Close Case', {
      lambdaFunction: closeCaseLambda,
    });

    const escalateCase = new LambdaInvoke(this, 'Escalate Case', {
      lambdaFunction: escalateCaseLambda,
    });

    const openCase = new LambdaInvoke(this, 'Open Case', {
      lambdaFunction: openCaseLambda,
    });

    const workOnCase = new LambdaInvoke(this, 'Work On Case', {
      lambdaFunction: workOnCaseLambda,
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
