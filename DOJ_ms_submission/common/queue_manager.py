# default
from threading import Thread
import json
import os
import traceback
import time

# typing 
from typing import List, Dict

# pip
import boto3
import django

# Should be done before import apps
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "settings.settings")
django.setup()

# custom
from settings import literals
from sub.utils import process_submission

session = boto3.Session(
    aws_access_key_id=literals.AWS_ACCESS_KEY,
    aws_secret_access_key=literals.AWS_SECRET_KEY,
    region_name=literals.AWS_REGION,
)

sqs = session.resource("sqs")
def sqs_consume(queue_name:str):
    target_queue = sqs.get_queue_by_name(QueueName=queue_name)
    while True:
        time.sleep(5)
        messages = target_queue.receive_messages(
            MessageAttributeNames=["All"],
            MaxNumberOfMessages=10,
            WaitTimeSeconds=10,
        )
        delete_batch = []
        message_batch = []
        id_list = []
        for msg in messages:
            message_body = msg.body
            receipt_handle = msg.receipt_handle
            message_id = msg.message_id
            delete_batch.append(
                {
                    "Id": message_id,
                    "ReceiptHandle": receipt_handle,
                }
            )
            
            body_object = json.loads(message_body)
            message_raw = body_object.get("Message")
            message_item = None
            try:
                message_item:Dict = json.loads(message_raw)
            except json.JSONDecodeError as e:
                print(f"This is Message Is NOT Valid! -> {e}")
                message_item = None
            
            if message_item is not None:
                try:
                    # do Database Actions (in bulk)
                    submission_id = message_item.get("id")
                    judge_result = message_item.get("judge_result")
                    error_message = message_item.get("error_message")
                    memory_used = message_item.get("memory_used")
                    time_used = message_item.get("time_used")
                    
                    id_list.append(submission_id)
                    message_batch.append(
                        {
                            "id": submission_id,
                            "judge_result": judge_result,
                            "error_message": error_message,
                            "memory_used": memory_used,
                            "time_used":time_used,
                        }
                    )
                except Exception as e:
                    traceback.print_exc()
                    print(e)
                    
            
        if message_batch:
            print(f"Processing {len(message_batch)} Submissions..")
            process_submission(message_batch)
        
        if delete_batch:
            target_queue.delete_messages(Entries = delete_batch)
            print(f"Deleting {len(delete_batch)} items")
    
    
def sqs_thread_exec(queue_names:List[str]):
    print(f"SQS Thread(sqs: {sqs}) Ready")
    t = Thread(target=sqs_consume, kwargs={"queue_name": queue_names[0]})
    t.daemon=True
    t.start()
    print(f"SQS Thread(sqs: {sqs}) Start -> {queue_names}")