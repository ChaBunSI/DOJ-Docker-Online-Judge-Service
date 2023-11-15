# default
import json
import uuid

# typing
from typing import Dict

# pip
import boto3

# custom
import settings.literals as literals

session = boto3.Session(
    aws_access_key_id=literals.AWS_ACCESS_KEY,
    aws_secret_access_key=literals.AWS_SECRET_KEY,
    region_name = literals.AWS_REGION,
)

sns_client = session.client("sns")

def generate_message(data:Dict):
    ret_data = {}
    ret_data["default"] = json.dumps(data)
    ret_data["sns"] = json.dumps(data)
    ret_data["sqs"] = json.dumps(data)
    
    return json.dumps(ret_data)

def publish_message(topic:str, data:Dict):
    res:Dict = sns_client.create_topic(
        Name=topic,                 
        Attributes={
            "FifoTopic": str(True),
            "ContentBasedDeduplication": str(False),
        },
    )
    target_arn = res.get("TopicArn")
    if target_arn is None:
        print(f"not valid topic i presume -> {topic}")
        return
    ret_message = generate_message(data)    
    message_sent = sns_client.publish(
        TopicArn=target_arn,
        Message = ret_message,
        MessageStructure="json",
        MessageGroupId=literals.AWS_SNS_MSGGROUPID_SUBMIT,
        Subject = literals.AWS_SNS_SUBJECT_SUBMIT,
        MessageDeduplicationId=str(uuid.uuid4()),
    )
    print(message_sent)