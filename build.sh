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

# Docker Image Build
cd ./ProblemManage
docker-compose build

# TODO : 환경변수 전달하는 파라미터 만들어줘야 함.
cd ../DOJ_ms_submission
docker-compose build

cd ../AUTH-SERVICE
docker build -t auth-service .

cd ../CLIENT-SERVICE
docker build -t client-service .

cd ../AUTH-SERVICE
docker build -t auth-service .

cd ../DOSCOVERY-SERVICE
docker build -t discovery-service .

cd ../AUTH-SERVICE
docker build -t auth-service .

cd ../GATEWAY-SERVICE
docker build -t gateway-service .

cd ../AUTH-SERVICE
docker build -t auth-service .

cd ../CLIENT-SERVICE
docker build -t client-service .

cd ../RT-SERVICE
docker build -t rt-service .
