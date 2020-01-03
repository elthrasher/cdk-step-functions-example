# Learning CDK and Step Functions

I started with this highly useful but slightly outdated tutorial [Create a Serverless Workflow](https://aws.amazon.com/getting-started/tutorials/create-a-serverless-workflow-step-functions-lambda/).

I rewrote it in [cdk](https://aws.amazon.com/cdk/).

Read my post on [dev.to](https://dev.to/elthrasher/exploring-aws-cdk-step-functions-1d1e).

## Useful commands

- `npm install` do this first
- `npm run lint` check your style
- `npm run build` transpile TypeScript
- `npm run watch` watch for changes
- `npm test` perform the jest unit tests
- `cdk deploy` deploy this stack to your default AWS account/region
- `cdk diff` compare deployed stack with current state
- `cdk synth` emits the synthesized CloudFormation template

## Lambdas via SAM

- `cdk synth --no-staging > template.yaml` to create the template for SAM.
- `sam local invoke <FN name from template.yaml> -e ./inputs/<JSON input>` to run the function locally.
