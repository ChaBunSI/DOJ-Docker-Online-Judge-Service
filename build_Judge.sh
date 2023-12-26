# AWS Keys
AWS_ACCESS_KEY=
AWS_SECRET_KEY=

# SNS Settings
DOJ_Judge_JudgeDone_NAME=DOJ-Judge-JudgeDone.fifo
DOJ_Judge_JudgeDone_ARN=

# SQS Settings
JudgeCPP_NAME=JudgeCPP.fifo
JudgeCPP_ARN=arn:aws:sqs:
JudgeCPP_URL=https://sqs.

JudgeNotCPP_NAME=JudgeNotCPP.fifo
JudgeNotCPP_ARN=arn:aws:sqs:
JudgeNotCPP_URL=https://sqs.

JudgeRT_NAME=JudgeRT.fifo
JudgeRT_ARN=arn:aws:sqs:
JudgeRT_URL=https://sqs.

JudgeTask_NAME=JudgeTask.fifo
JudgeTask_ARN=arn:aws:sqs:
JudgeTask_URL=https://sqs.

ScoreQueue_NAME=ScoreQueue.fifo
ScoreQueue_ARN=arn:aws:sqs:
ScoreQueue_URL=https://sqs.

# Create Env File
cd ./JUDGE-SERVICE
rm ./judge_aws.h

echo "#ifndef JUDGE_AWS_H" >> judge_aws.h
echo "#define JUDGE_AWS_H" >> judge_aws.h
echo "#include <aws/core/Aws.h>" >> judge_aws.h
echo "#include <aws/core/auth/AWSCredentials.h>" >> judge_aws.h
echo "const Aws::String JT_QUEUE_NAME = \"$JudgeTask_NAME\";" >> judge_aws.h
echo "const Aws::String JT_QUEUE_URL = \"$JudgeTask_URL\";" >> judge_aws.h
echo "const Aws::String JT_QUEUE_ARN = \"$JudgeTask_ARN\";" >> judge_aws.h
echo "const Aws::String RT_QUEUE_NAME = \"$JudgeRT_NAME\";" >> judge_aws.h
echo "const Aws::String RT_QUEUE_URL = \"$JudgeRT_ARN\";" >> judge_aws.h
echo "const Aws::String RT_QUEUE_ARN = \"$JudgeRT_ARN\";" >> judge_aws.h
echo "const Aws::String TOPIC_NAME = \"$DOJ_Judge_JudgeDone_NAME\";" >> judge_aws.h
echo "const Aws::String TOPIC_ARN = \"$DOJ_Judge_JudgeDone_ARN\";" >> judge_aws.h
echo "const Aws::String CRUD_QUEUE_NAME = \"$ScoreQueue_NAME\";" >> judge_aws.h
echo "const Aws::String CRUD_QUEUE_URL = \"$ScoreQueue_URL\";" >> judge_aws.h
echo "const Aws::String CRUD_QUEUE_ARN = \"$ScoreQueue_ARN\";" >> judge_aws.h
echo "const Aws::String CPP_QUEUE_NAME = \"$JudgeCPP_NAME\";" >> judge_aws.h
echo "const Aws::String CPP_QUEUE_URL = \"$JudgeCPP_URL\";" >> judge_aws.h
echo "const Aws::String CPP_QUEUE_ARN = \"$JudgeCPP_ARN\";" >> judge_aws.h
echo "const Aws::String NotCPP_QUEUE_NAME = \"$JudgeNotCPP_NAME\";" >> judge_aws.h
echo "const Aws::String NotCPP_QUEUE_URL = \"$JudgeNotCPP_URL\";" >> judge_aws.h
echo "const Aws::String NotCPP_QUEUE_ARN = \"$JudgeNotCPP_ARN\";" >> judge_aws.h

echo "const Aws::String ACCESS_KEY = \"$AWS_ACCESS_KEY\";" >> judge_aws.h
echo "const Aws::String SECRET_KEY = \"$AWS_SECRET_KEY\";" >> judge_aws.h

# Build Docker Image
docker buildx build -t jduge_service_<category> .