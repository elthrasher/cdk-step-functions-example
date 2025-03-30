import { Runtime } from 'aws-cdk-lib/aws-lambda';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import { RetentionDays } from 'aws-cdk-lib/aws-logs';
import { Chain, Choice, Condition, DefinitionBody, Fail, StateMachine, TaskInput } from 'aws-cdk-lib/aws-stepfunctions';
import { LambdaInvoke } from 'aws-cdk-lib/aws-stepfunctions-tasks';
import { Stack, StackProps } from 'aws-cdk-lib/core';
import { Construct } from 'constructs';

const lambdaPath = `${__dirname}/lambda`;

export class CdkStepStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const lambdaProps = {
      logRetention: RetentionDays.ONE_DAY,
      runtime: Runtime.NODEJS_LATEST,
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

    const jsonataprops = {
      assign: {
        message: '{% $states.result.Payload.message %}',
        status: '{% $states.result.Payload.status %}',
      },
      payload: TaskInput.fromObject({
        caseId: '{% $caseId %}',
        message: '{% $message %}',
        status: '{% $status %}',
      }),
    };

    const assignCase = LambdaInvoke.jsonata(this, 'Assign Case', {
      ...jsonataprops,
      lambdaFunction: assignCaseLambda,
    });

    const closeCase = LambdaInvoke.jsonata(this, 'Close Case', { ...jsonataprops, lambdaFunction: closeCaseLambda });

    const escalateCase = LambdaInvoke.jsonata(this, 'Escalate Case', {
      ...jsonataprops,
      lambdaFunction: escalateCaseLambda,
    });

    const openCase = LambdaInvoke.jsonata(this, 'Open Case', {
      assign: {
        caseId: '{% $states.input.inputCaseID %}',
        message: '{% $states.result.Payload.message %}',
        status: '{% $states.result.Payload.status %}',
      },
      lambdaFunction: openCaseLambda,
    });

    const workOnCase = LambdaInvoke.jsonata(this, 'Work On Case', {
      ...jsonataprops,
      lambdaFunction: workOnCaseLambda,
    });

    const jobFailed = Fail.jsonata(this, 'Fail', {
      cause: 'Engage Tier 2 Support',
    });

    const isComplete = Choice.jsonata(this, 'Is Case Resolved');

    const chain = Chain.start(openCase)
      .next(assignCase)
      .next(workOnCase)
      .next(
        isComplete
          .when(Condition.jsonata('{% $status = "closed" %}'), closeCase)
          .when(Condition.jsonata('{% $status = "escalated" %}'), escalateCase.next(jobFailed)),
      );

    new StateMachine(this, 'StateMachine', {
      definitionBody: DefinitionBody.fromChainable(chain),
    });
  }
}
