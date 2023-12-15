import os

def get_env_value(key:str, default_value:str):
    ret_value = os.getenv(key)
    if ret_value is None:
        ret_value = default_value
        
    # print(f"[ENV] (K: {key} || V: {ret_value}")    
    
    return ret_value

# AWS Feature
AWS_ACCESS_KEY = get_env_value("AWS_ACCESS_KEY", "")
AWS_SECRET_KEY = get_env_value("AWS_SECRET_KEY", "")
AWS_REGION = get_env_value("AWS_REGION", "ap-northeast-2")

# Machine Info
VM_URL = get_env_value("VM_URL", "")

# SQS
AWS_SQS_URL = get_env_value("AWS_SQS_URL", "")
AWS_SQS_QUEUE_RESULT = get_env_value("AWS_SQS_QUEUE_RESULT", "")

# SNS
AWS_SNS_URL = get_env_value("AWS_SNS_URL", "")
AWS_SNS_ARN_SUBMIT = get_env_value("AWS_SNS_ARN_SUBMIT", "")
AWS_SNS_SUBJECT_SUBMIT=get_env_value("AWS_SNS_SUIBJECT_SUBMIT", "submit")
AWS_SNS_MSGGROUPID_SUBMIT=get_env_value("AWS_SNS_MSGGROUPID_SUBMIT", "submit")

# TOPICS
AWS_SNS_TOPIC_SUBMIT = "DOJ-Submission-SubmitTask.fifo"


# EUREKA Stuffs
EUREKA_SERVER=get_env_value("EUREKA_SERVER", "34.64.213.211")
EUREKA_PORT=get_env_value("EUREKA_PORT", 8761)
INSTANCE_HOST=get_env_value("INSTANCE_HOST","10.178.0.3")
INSTANCE_PORT=get_env_value("INSTANCE_PORT", 8081)
INSTANCE_APP_NAME = get_env_value("INSTANCE_APP_NAME", "SUBMISSION-SERVICE")

# Redis Stuffs
REDIS_HOST = get_env_value("REDIS_HOST", "redis")