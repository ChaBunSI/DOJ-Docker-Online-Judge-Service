# default
import time
from threading import Thread

# typing 
from typing import List

# pip
import boto3

# custom
from settings import literals

session = boto3.Session(
    aws_access_key_id=literals.AWS_ACCESS_KEY,
    aws_secret_access_key=literals.AWS_SECRET_KEY,
    region_name=literals.AWS_REGION,
)

sqs = session.resource("sqs")
def sqs_consume(queue_name:str):
    target_queue = sqs.get_queue_by_name(QueueName=queue_name)
    while True:
        messages = target_queue.receive_messages(
            MessageAttributeNames=["All"],
            MaxNumberOfMessages=10,
            WaitTimeSeconds=10,
        )
        for message in messages:
            print("=================================================")
            print(f"[{queue_name}] => {message.body}")
            print("===================================================")
    
    
def sqs_thread_exec(queue_names:List[str]):
    print(f"SQS Thread(sqs: {sqs}) Ready")
    t = Thread(target=sqs_consume, kwargs={"queue_name": queue_names[0]})
    t.daemon=True
    t.start()
    print(f"SQS Thread(sqs: {sqs}) Start -> {queue_names}")