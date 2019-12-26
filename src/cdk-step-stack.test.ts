import { expect as expectCDK, MatchStyle, matchTemplate } from '@aws-cdk/assert';
import cdk = require('@aws-cdk/core');

import CdkStep = require('./cdk-step-stack');

test('Step Functions for Cases', () => {
  const app = new cdk.App();
  // WHEN
  const stack = new CdkStep.CdkStepStack(app, 'MyTestStack');
  // THEN
  expectCDK(stack).to(
    matchTemplate(
      {
        Resources: {
          assignCaseFunctionServiceRole: {
            Type: 'AWS::IAM::Role',
            Properties: {
              AssumeRolePolicyDocument: {
                Statement: [
                  {
                    Action: 'sts:AssumeRole',
                    Effect: 'Allow',
                    Principal: {
                      Service: 'lambda.amazonaws.com',
                    },
                  },
                ],
                Version: '2012-10-17',
              },
              ManagedPolicyArns: [
                {
                  'Fn::Join': [
                    '',
                    [
                      'arn:',
                      {
                        Ref: 'AWS::Partition',
                      },
                      ':iam::aws:policy/service-role/AWSLambdaBasicExecutionRole',
                    ],
                  ],
                },
              ],
            },
          },
          assignCaseFunction: {
            Type: 'AWS::Lambda::Function',
            Properties: {
              Code: {
                S3Bucket: {
                  Ref: 'LambdaBucket',
                },
                S3Key: {
                  'Fn::Join': [
                    '',
                    [
                      {
                        'Fn::Select': [
                          0,
                          {
                            'Fn::Split': [
                              '||',
                              {
                                Ref: 'S3VersionKey',
                              },
                            ],
                          },
                        ],
                      },
                      {
                        'Fn::Select': [
                          1,
                          {
                            'Fn::Split': [
                              '||',
                              {
                                Ref: 'S3VersionKey',
                              },
                            ],
                          },
                        ],
                      },
                    ],
                  ],
                },
              },
              Handler: 'assign-case-fn.handler',
              Role: {
                'Fn::GetAtt': ['assignCaseFunctionServiceRole', 'Arn'],
              },
              Runtime: 'nodejs12.x',
            },
            DependsOn: ['assignCaseFunctionServiceRole'],
          },
          closeCaseFunctionServiceRole: {
            Type: 'AWS::IAM::Role',
            Properties: {
              AssumeRolePolicyDocument: {
                Statement: [
                  {
                    Action: 'sts:AssumeRole',
                    Effect: 'Allow',
                    Principal: {
                      Service: 'lambda.amazonaws.com',
                    },
                  },
                ],
                Version: '2012-10-17',
              },
              ManagedPolicyArns: [
                {
                  'Fn::Join': [
                    '',
                    [
                      'arn:',
                      {
                        Ref: 'AWS::Partition',
                      },
                      ':iam::aws:policy/service-role/AWSLambdaBasicExecutionRole',
                    ],
                  ],
                },
              ],
            },
          },
          closeCaseFunction: {
            Type: 'AWS::Lambda::Function',
            Properties: {
              Code: {
                S3Bucket: {
                  Ref: 'LambdaBucket',
                },
                S3Key: {
                  'Fn::Join': [
                    '',
                    [
                      {
                        'Fn::Select': [
                          0,
                          {
                            'Fn::Split': [
                              '||',
                              {
                                Ref: 'S3VersionKey',
                              },
                            ],
                          },
                        ],
                      },
                      {
                        'Fn::Select': [
                          1,
                          {
                            'Fn::Split': [
                              '||',
                              {
                                Ref: 'S3VersionKey',
                              },
                            ],
                          },
                        ],
                      },
                    ],
                  ],
                },
              },
              Handler: 'close-case-fn.handler',
              Role: {
                'Fn::GetAtt': ['closeCaseFunctionServiceRole', 'Arn'],
              },
              Runtime: 'nodejs12.x',
            },
            DependsOn: ['closeCaseFunctionServiceRole'],
          },
          escalateCaseFunctionServiceRole: {
            Type: 'AWS::IAM::Role',
            Properties: {
              AssumeRolePolicyDocument: {
                Statement: [
                  {
                    Action: 'sts:AssumeRole',
                    Effect: 'Allow',
                    Principal: {
                      Service: 'lambda.amazonaws.com',
                    },
                  },
                ],
                Version: '2012-10-17',
              },
              ManagedPolicyArns: [
                {
                  'Fn::Join': [
                    '',
                    [
                      'arn:',
                      {
                        Ref: 'AWS::Partition',
                      },
                      ':iam::aws:policy/service-role/AWSLambdaBasicExecutionRole',
                    ],
                  ],
                },
              ],
            },
          },
          escalateCaseFunction: {
            Type: 'AWS::Lambda::Function',
            Properties: {
              Code: {
                S3Bucket: {
                  Ref: 'LambdaBucket',
                },
                S3Key: {
                  'Fn::Join': [
                    '',
                    [
                      {
                        'Fn::Select': [
                          0,
                          {
                            'Fn::Split': [
                              '||',
                              {
                                Ref: 'S3VersionKey',
                              },
                            ],
                          },
                        ],
                      },
                      {
                        'Fn::Select': [
                          1,
                          {
                            'Fn::Split': [
                              '||',
                              {
                                Ref: 'S3VersionKey',
                              },
                            ],
                          },
                        ],
                      },
                    ],
                  ],
                },
              },
              Handler: 'escalate-case-fn.handler',
              Role: {
                'Fn::GetAtt': ['escalateCaseFunctionServiceRole', 'Arn'],
              },
              Runtime: 'nodejs12.x',
            },
            DependsOn: ['escalateCaseFunctionServiceRole'],
          },
          openCaseFunctionServiceRole: {
            Type: 'AWS::IAM::Role',
            Properties: {
              AssumeRolePolicyDocument: {
                Statement: [
                  {
                    Action: 'sts:AssumeRole',
                    Effect: 'Allow',
                    Principal: {
                      Service: 'lambda.amazonaws.com',
                    },
                  },
                ],
                Version: '2012-10-17',
              },
              ManagedPolicyArns: [
                {
                  'Fn::Join': [
                    '',
                    [
                      'arn:',
                      {
                        Ref: 'AWS::Partition',
                      },
                      ':iam::aws:policy/service-role/AWSLambdaBasicExecutionRole',
                    ],
                  ],
                },
              ],
            },
          },
          openCaseFunction: {
            Type: 'AWS::Lambda::Function',
            Properties: {
              Code: {
                S3Bucket: {
                  Ref: 'LambdaBucket',
                },
                S3Key: {
                  'Fn::Join': [
                    '',
                    [
                      {
                        'Fn::Select': [
                          0,
                          {
                            'Fn::Split': [
                              '||',
                              {
                                Ref: 'S3VersionKey',
                              },
                            ],
                          },
                        ],
                      },
                      {
                        'Fn::Select': [
                          1,
                          {
                            'Fn::Split': [
                              '||',
                              {
                                Ref: 'S3VersionKey',
                              },
                            ],
                          },
                        ],
                      },
                    ],
                  ],
                },
              },
              Handler: 'open-case-fn.handler',
              Role: {
                'Fn::GetAtt': ['openCaseFunctionServiceRole', 'Arn'],
              },
              Runtime: 'nodejs12.x',
            },
            DependsOn: ['openCaseFunctionServiceRole'],
          },
          workOnCaseFunctionServiceRole: {
            Type: 'AWS::IAM::Role',
            Properties: {
              AssumeRolePolicyDocument: {
                Statement: [
                  {
                    Action: 'sts:AssumeRole',
                    Effect: 'Allow',
                    Principal: {
                      Service: 'lambda.amazonaws.com',
                    },
                  },
                ],
                Version: '2012-10-17',
              },
              ManagedPolicyArns: [
                {
                  'Fn::Join': [
                    '',
                    [
                      'arn:',
                      {
                        Ref: 'AWS::Partition',
                      },
                      ':iam::aws:policy/service-role/AWSLambdaBasicExecutionRole',
                    ],
                  ],
                },
              ],
            },
          },
          workOnCaseFunction: {
            Type: 'AWS::Lambda::Function',
            Properties: {
              Code: {
                S3Bucket: {
                  Ref: 'LambdaBucket',
                },
                S3Key: {
                  'Fn::Join': [
                    '',
                    [
                      {
                        'Fn::Select': [
                          0,
                          {
                            'Fn::Split': [
                              '||',
                              {
                                Ref: 'S3VersionKey',
                              },
                            ],
                          },
                        ],
                      },
                      {
                        'Fn::Select': [
                          1,
                          {
                            'Fn::Split': [
                              '||',
                              {
                                Ref: 'S3VersionKey',
                              },
                            ],
                          },
                        ],
                      },
                    ],
                  ],
                },
              },
              Handler: 'work-on-case-fn.handler',
              Role: {
                'Fn::GetAtt': ['workOnCaseFunctionServiceRole', 'Arn'],
              },
              Runtime: 'nodejs12.x',
            },
            DependsOn: ['workOnCaseFunctionServiceRole'],
          },
          StateMachineRole: {
            Type: 'AWS::IAM::Role',
            Properties: {
              AssumeRolePolicyDocument: {
                Statement: [
                  {
                    Action: 'sts:AssumeRole',
                    Effect: 'Allow',
                    Principal: {
                      Service: {
                        'Fn::Join': [
                          '',
                          [
                            'states.',
                            {
                              Ref: 'AWS::Region',
                            },
                            '.amazonaws.com',
                          ],
                        ],
                      },
                    },
                  },
                ],
                Version: '2012-10-17',
              },
            },
          },
          StateMachineRoleDefaultPolicy: {
            Type: 'AWS::IAM::Policy',
            Properties: {
              PolicyDocument: {
                Statement: [
                  {
                    Action: 'lambda:InvokeFunction',
                    Effect: 'Allow',
                    Resource: {
                      'Fn::GetAtt': ['openCaseFunction', 'Arn'],
                    },
                  },
                  {
                    Action: 'lambda:InvokeFunction',
                    Effect: 'Allow',
                    Resource: {
                      'Fn::GetAtt': ['assignCaseFunction', 'Arn'],
                    },
                  },
                  {
                    Action: 'lambda:InvokeFunction',
                    Effect: 'Allow',
                    Resource: {
                      'Fn::GetAtt': ['workOnCaseFunction', 'Arn'],
                    },
                  },
                  {
                    Action: 'lambda:InvokeFunction',
                    Effect: 'Allow',
                    Resource: {
                      'Fn::GetAtt': ['closeCaseFunction', 'Arn'],
                    },
                  },
                  {
                    Action: 'lambda:InvokeFunction',
                    Effect: 'Allow',
                    Resource: {
                      'Fn::GetAtt': ['escalateCaseFunction', 'Arn'],
                    },
                  },
                ],
                Version: '2012-10-17',
              },
              PolicyName: 'StateMachineRoleDefaultPolicy',
              Roles: [
                {
                  Ref: 'StateMachineRole',
                },
              ],
            },
          },
          StateMachine: {
            Type: 'AWS::StepFunctions::StateMachine',
            Properties: {
              DefinitionString: {
                'Fn::Join': [
                  '',
                  [
                    '{"StartAt":"Open Case","States":{"Open Case":{"Next":"Assign Case","Type":"Task","Resource":"',
                    {
                      'Fn::GetAtt': ['openCaseFunction', 'Arn'],
                    },
                    '"},"Assign Case":{"Next":"Work On Case","Type":"Task","Resource":"',
                    {
                      'Fn::GetAtt': ['assignCaseFunction', 'Arn'],
                    },
                    '"},"Work On Case":{"Next":"Is Case Resolved","Type":"Task","Resource":"',
                    {
                      'Fn::GetAtt': ['workOnCaseFunction', 'Arn'],
                    },
                    '"},"Is Case Resolved":{"Type":"Choice","Choices":[{"Variable":"$.Status","NumericEquals":1,"Next":"Close Case"},{"Variable":"$.Status","NumericEquals":0,"Next":"Escalate Case"}]},"Close Case":{"End":true,"Type":"Task","Resource":"',
                    {
                      'Fn::GetAtt': ['closeCaseFunction', 'Arn'],
                    },
                    '"},"Escalate Case":{"Next":"Fail","Type":"Task","Resource":"',
                    {
                      'Fn::GetAtt': ['escalateCaseFunction', 'Arn'],
                    },
                    '"},"Fail":{"Type":"Fail","Cause":"Engage Tier 2 Support"}}}',
                  ],
                ],
              },
              RoleArn: {
                'Fn::GetAtt': ['StateMachineRole', 'Arn'],
              },
            },
          },
        },
        Parameters: {
          LambdaBucket: {
            Type: 'String',
            Description: 'S3 bucket for asset "123456J"',
          },
          S3VersionKey: {
            Type: 'String',
            Description: 'S3 key for asset version "123456J"',
          },
          AssetParameters123456JArtifactHash7D69176A: {
            Type: 'String',
            Description: 'Artifact hash for asset "123456J"',
          },
        },
      },
      MatchStyle.NO_REPLACES,
    ),
  );
});
