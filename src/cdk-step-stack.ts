import { Runtime } from '@aws-cdk/aws-lambda';
import { NodejsFunction } from '@aws-cdk/aws-lambda-nodejs';
import { Chain, Choice, Condition, Fail, StateMachine, Task } from '@aws-cdk/aws-stepfunctions';
import { InvokeFunction } from '@aws-cdk/aws-stepfunctions-tasks';
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

    const assignCase = new Task(this, 'Assign Case', {
      task: new InvokeFunction(assignCaseLambda),
    });

    const closeCase = new Task(this, 'Close Case', {
      task: new InvokeFunction(closeCaseLambda),
    });

    const escalateCase = new Task(this, 'Escalate Case', {
      task: new InvokeFunction(escalateCaseLambda),
    });

    const openCase = new Task(this, 'Open Case', {
      task: new InvokeFunction(openCaseLambda),
    });

    const workOnCase = new Task(this, 'Work On Case', {
      task: new InvokeFunction(workOnCaseLambda),
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
