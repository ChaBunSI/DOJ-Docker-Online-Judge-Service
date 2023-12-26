# AWS Keys
AWS_ACCESS_KEY=
AWS_SECRET_KEY=

# SNS Settings
DOJ_Judge_JudgeDone_name=
DOJ_Judge_JudgeDone_arn=
DOJ_Submission_SubmitTask_name=
DOJ_Submission_SubmitTask_arn=
DOJ_TestCase_Queueing_name=
DOJ_TestCase_Queueing_arn=


# SQS Settings

JudgeRT_ARN=arn:aws:sqs:
JudgeRT_URL=https://sqs.

JudgeTask_ARN=arn:aws:sqs:
JudgeTask_URL=https://sqs.

ScoreQueue_ARN=arn:aws:sqs:
ScoreQueue_URL=https://sqs.

SubmissionDone_ARN=arn:aws:sqs:
SubmissionDone_URL=https://sqs.

ProblemManageQueue_NAME=
ProblemManageQueue_ARN=arn:aws:sqs:
ProblemManageQueue_URL=https://sqs.

# Create Env files
echo "[STEP 1] Create ENV Files"

cd ./DOJ_ms_submission
rm .env
echo "AWS_ACCESS_KEY=$AWS_ACCESS_KEY" >> .env
echo "AWS_SECRET_KEY=$AWS_SECRET_KEY" >> .env
echo "AWS_REGION=ap-northeast-2" >> .env
echo "AWS_SQS_URL=1" >> .env
echo "AWS_SNS_ARN_SUBMIT=$DOJ_Submission_SubmitTask_arn" >> .env
echo "AWS_SNS_SUBJECT_SUBMIT=submit" >> .env
echo "AWS_SNS_MSGGROUPID_SUBMIT=submit" >> .env

cd ../RT-SERVICE
rm .env
echo "AWS_ACCESS_KEY=$AWS_ACCESS_KEY" >> .env
echo "AWS_SECRET_KEY=$AWS_SECRET_KEY" >> .env
echo "QUEUE_URL=$JudgeRT_URL" >> .env

cd ../

# Docker Image Build
# build repositories
echo "[STEP 2] Building repositories..."

# build discovery image and create container
cd DISCOVERY-SERVICE
echo "[STEP 2] Building DISCOVERY-SERVICE..."
docker build -t doj-discovery-service .

# build gateway image and create container
cd ../GATEWAY-SERVICE
echo "[STEP 2] Building GATEWAY-SERVICE..."
docker build -t doj-gateway-service .

# build auth image and create container
cd ../AUTH-SERVICE
echo "[STEP 2] Building AUTH-SERVICE..."
docker build -t doj-auth-service .

# build submission image and create container
cd ../DOJ_ms_submission
echo "[STEP 2] Building DOJ_ms_submission..."
docker build -t submission-service .


# build rt image and create container
cd ../RT-SERVICE
echo "[STEP 2] Building RT-SERVICE..."
docker build -t rt-service .


# build ProblemManage image and create container
cd ../ProblemManage
echo "[STEP 2] Building ProblemManage..."
docker build -t problem-manage-service \
--build-arg access_key=$AWS_ACCESS_KEY \
--build-arg secret_key=$AWS_<sqs_name>SECRET_KEY \
--build-arg region=ap-northeast-2 \
--build-arg topic_arn=$DOJ_TestCase_Queueing_arn \
--build-arg sqs_name=$ProblemManageQueue_NAME \
--build-arg sqs_url=$ProblemManageQueue_URL .

# docker pull peace0096/proglram_manage_service:Submit
# docker run -d -p 4000:3306 --name ProgramManageDB -e MARIADB_ROOT_PASSWORD=1234 --env MARIADB_DATABASE=ProblemManageDB  mariadb
# docker run -d -p 8080:8080 --name ProblemManage-container --link ProgramManageDB:ProblemManageDB peace0096/program_manage_service:Submit


# build client image and create container
cd ../CLIENT-SERVICE
echo "[STEP 2] Building CLIENT-SERVICE..."
docker build -t client-service .


