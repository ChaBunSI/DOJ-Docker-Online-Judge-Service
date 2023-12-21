# DOJ-Docker-Online-Judge-Service
Docker로 배포하는 MSA 기반 Online Judge 서비스입니다.

# What is DOJ?
---
DOJ는 도커 환경에서 배포되는 Online Judge 서비스입니다. 온라인 저지란, 백준과 프로그래머스처럼 알고리즘 문제를 작성하고 채점을 하는 서비스입니다. MSA 기반으로 작성되었으며, 일부 AWS 인프라에 의존되어 있습니다. 

# DOJ Architecture
---
![Alt text](images/architecture.png)

# Event-Driven-Architecture
![Alt text](images/EventDrivenArchitecture.png)

# Quick Start
---
## Set AWS Infra
AWS의 SNS와 SQS를 사용하기 때문에 해당 인프라를 만들어야 합니다. 기본적으로 fifo 큐를 사용하며, 하나의 SNS 토픽에 여러 개의 SQS가 구독하고, 각 SQS는 서비스에서 메세지를 풀링하는 Fanout Pattern을 따르고 있습니다.

구성해야 하는 SNS와 SQS는 다음과 같습니다.

### SNS
- DOJ-Judge-JudgeDone.fifo


- DOJ-Submission-SubmitTask.fifo


- DOJ-TestCase-Queueing.fifo



### SQS
SNS 토픽을 구독하는 메세지 대기열 시스템입니다. 환경구성을 위해 SQS의 ARN과 URL이 필요합니다. 기본적으로 FIFO 형식이여야 합니다(ProblemManage Queue는 표준 Queue여도 가능합니다).

- __JudgeCPP.fifo__
Sub : No Topic
Pulled by : JudgeService(Workers)

- __JudgeNotCPP.fifo__
Sub : No Topic
Pulled by : JudgeService(Workers)

- __JudgeRT.fifo__
Sub : No Topic
Pulled by : RTService

- __JudgeTask.fifo__
Sub : DOJ-Submission-SubmitTask
Pulled by : JudgeService(Broker)

- __ScoreQueue.fifo__
Sub : DOJ-TestCase-Queueing.fifo
Pulled by : JudgeService(Broker)

- __SubmissionDone.fifo__
Sub : DOJ-Judge-JudgeDone.fifo
Pulled by : SubmissionService


- __ProblemManageQueue__
Sub : DOJ-Judge-JudgeDone.fifo
Pulled by : ProblemManage Service


## Build Docker Image through build.sh
배포할 도커 이미지를 빌드하는 실행파일입니다.

```build.sh```는 채점 서비스 외 모든 서비스의 이미지를, ```build_Judge.sh```는 채점 서비스의 이미지를 빌드합니다.
실행하기 전, sh파일 내 환경변수를 작성해주셔야 합니다.

__build.sh__
```bash
# AWS Keys
ACCESS_KEY=
SECRET_KEY=

# SNS Settings
JudgeCPP_TopicArn=arn:aws:sns:
JudgeNotCPP_TopicArn=arn:aws:sns:
JudgeRT_TopicArn=arn:aws:sns:
JudgeTask_TopicArn=arn:aws:sns:
ScoreQueue_TopicArn=arn:aws:sns:
SubmissionDone_TopicArn=arn:aws:sns:
ProblemManageQueue_TopicArn=arn:aws:sns:

# SQS Settings
JudgeCPP_ARN=arn:aws:sqs:
JudgeCPP_URL=https://sqs.

JudgeNotCPP_ARN=arn:aws:sqs:
JudgeNotCPP_URL=https://sqs.

JudgeRT_ARN=arn:aws:sqs:
JudgeRT_URL=https://sqs.

JudgeTask_ARN=arn:aws:sqs:
JudgeTask_URL=https://sqs.

ScoreQueue_ARN=arn:aws:sqs:
ScoreQueue_URL=https://sqs.

SubmissionDone_ARN=arn:aws:sqs:
SubmissionDone_URL=https://sqs.

ProblemManageQueue_ARN=arn:aws:sqs:
ProblemManageQueue_URL=https://sqs.

...
```

## Deploy Docker container


# Microservice Descriptions
---

# Dev Roles
---

# Refs
---