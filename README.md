# Learning CDK and Step Functions

I started with this highly useful but slightly outdated tutorial [Create a Serverless Workflow](https://aws.amazon.com/getting-started/tutorials/create-a-serverless-workflow-step-functions-lambda/).

I rewrote it in [cdk](https://aws.amazon.com/cdk/).

Read my post on [dev.to](https://dev.to/elthrasher/exploring-aws-cdk-step-functions-1d1e).

Now updated to CDK v2!

## Useful commands

- `npm install` do this first
- `npm run lint` check your style
- `npm test` perform the jest unit tests
- `npx cdk bootstrap` the first time only to prep your environment
- `npm run deploy` deploy this stack to your default AWS account/region
- `npx cdk diff` compare deployed stack with current state
- `npm run synth` emits the synthesized CloudFormation template
- `npx run destroy` removes your stack

## Lambda functionss via SAM

- `npm run synth` to create the template for SAM.
- `sam local invoke <FN name from template.yaml> -e ./inputs/<JSON input>` to run the function locally.
