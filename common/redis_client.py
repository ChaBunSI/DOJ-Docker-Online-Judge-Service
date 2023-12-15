import redis
import json
from typing import Dict
import time

from common.topic_manager import publish_message
from settings.literals import AWS_SNS_TOPIC_SUBMIT
from threading import Thread
class RedisQueue(object):
    """
        Redis Lists are an ordered list, First In First Out Queue
        Redis List pushing new elements on the head (on the left) of the list.
        The max length of a list is 4,294,967,295
    """
    def __init__(self, name, **redis_kwargs):
        """
            host='localhost', port=6379, db=0
        """
        self.key = name
        self.rq = redis.Redis(**redis_kwargs)

    def size(self): # 큐 크기 확인
        return self.rq.llen(self.key)

    def isEmpty(self): # 비어있는 큐인지 확인
        return self.size() == 0

    def put(self, element): # 데이터 넣기
        self.rq.lpush(self.key, element) # left push

    def get(self, isBlocking=False, timeout=None): # 데이터 꺼내기
        if isBlocking:
            element = self.rq.brpop(self.key, timeout=timeout) # blocking right pop
            element = element[1] # key[0], value[1]
        else:
            element = self.rq.rpop(self.key) # right pop
        return element

    def get_without_pop(self): # 꺼낼 데이터 조회
        if self.isEmpty():
            return None
        element = self.rq.lindex(self.key, -1)
        return element
    
    
def consume_task():
    redis_queue = RedisQueue(name="task", host="redis", port=6379, db=0)
    while True:
        message = redis_queue.get(isBlocking=False)
        if message is not None:
            time.sleep(1)
            print("Fetched From Queue of my own")
            message_obj:Dict = json.loads(message)
            if(message_obj.get("timestamp")):
                message_obj.pop("timestamp")
            publish_message(AWS_SNS_TOPIC_SUBMIT, message_obj)
            
            
def consumer_thread_exec():
    t = Thread(target=consume_task)
    t.daemon=True
    t.start()
    print("Consuming On Progress")