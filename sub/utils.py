# default
import json

# typing
from typing import Dict, Any, List

# pip

# django
from django.http import JsonResponse
from django.core.handlers.wsgi import WSGIRequest
from django.db.models import Q
from django.utils import timezone

# custom
from sub.models import Submission
from sub.parameters import JC_DICT, USER_ID, TIME_LIMITED, MEM_LIMITED

# common
from common.redis_client import RedisQueue
from common.eureka_manager import ask_problem_to_pm


def create_message(message:Dict, is_success:bool=True):
    ret_data = {}
    ret_data["data"] = message
    ret_data["is_success"] = is_success
    return ret_data

def is_authorized(request:WSGIRequest) -> bool:
    user_id = request.META.get(USER_ID, None)
    return user_id is not None

def message_response(message:Dict, is_success:bool=True, is_authorized:bool=True):
    ret_data = create_message(message, is_success)
    status_code = 200
    if not is_success:
        status_code = 400
    if not is_authorized:
        status_code = 401
    return JsonResponse(ret_data, status=status_code)

def parse_value_from_request_or_json(
    request: WSGIRequest,
    keyword: str,
    default_value: Any,
    ignore_typecheck: bool = False,
):
    ret_value = default_value
    try:
        ret_value = request.POST.get(keyword, "")
        if ret_value == "":
            temp_data = json.loads(request.body)
            ret_value = temp_data.get(keyword)
            if not ignore_typecheck:
                if not isinstance(ret_value, type(default_value)):
                    ret_value = default_value
    except Exception:
        ret_value = default_value
    return ret_value
    
    
def process_submission(message_batch:List[Dict]):
    query_object = Q()
    target_submissions = []
    sub_update_bulk_list = []
    temp_dict = {} # id: value
        
        
    for msg_item in message_batch:
        submission_id = msg_item.get("id")
        judge_result = msg_item.get("judge_result")
        error_message = msg_item.get("error_message")
        memory_used = msg_item.get("memory_used")
        time_used = msg_item.get("time_used")
        if judge_result is not None:
            judge_result = int(judge_result)
            judge_descsription = JC_DICT.get(judge_result, "")
            query_object.add(Q(id=submission_id), query_object.OR)
            temp_dict[submission_id] = {"judge_status": judge_result, "error_message":error_message, "judge_description": judge_descsription, "time_used":time_used, "memory_used":memory_used}
    
    if query_object:
        target_submissions = list(Submission.objects.filter(query_object))
        for sub_item in target_submissions:
            sub_id = sub_item.id
            temp_item = temp_dict.get(sub_id)
            if temp_item is not None:
                print(f"temp-item -> {temp_item}")
                sub_item.judge_status = temp_item.get("judge_status")
                sub_item.judge_description = temp_item.get("judge_description", "")
                sub_item.error_message = temp_item.get("error_message", "")
                sub_item.memory_used = temp_item.get("memory_used")
                sub_item.time_used = temp_item.get("time_used")
                sub_item.end_time = timezone.localtime()
                sub_update_bulk_list.append(sub_item)
        

    if sub_update_bulk_list:
        Submission.objects.bulk_update(
            sub_update_bulk_list, 
            fields = [
                "judge_status",
                "judge_description",
                "error_message",
                "end_time",
                "memory_used",
                "time_used",
            ]
        )
        
    print(f"Updated {len(sub_update_bulk_list)} Submissions")

def get_limitations(problem_id:int, token:str)->Dict:
    limit_dict = {}
    redis_queue = RedisQueue(name="limit", host="redis", port=6379, db=0)
    
    time_limited = redis_queue.get_from_key(f"tl_{problem_id}")
    memory_limited = redis_queue.get_from_key(f"ml_{problem_id}")
    
    if(time_limited is not None and memory_limited is not None):
        time_limited = int(time_limited)
        memory_limited = int(memory_limited)
        limit_dict[TIME_LIMITED] = time_limited
        limit_dict[MEM_LIMITED] = memory_limited
    else:
        eureka_result = ask_problem_to_pm(problem_id, {}, token)
        time_limited = eureka_result.get(TIME_LIMITED)
        memory_limited = eureka_result.get(MEM_LIMITED)
        redis_queue.set_from_key(f"tl_{problem_id}", time_limited)
        redis_queue.set_from_key(f"ml_{problem_id}", memory_limited)
        limit_dict[TIME_LIMITED] = time_limited
        limit_dict[MEM_LIMITED] = memory_limited

    
    return limit_dict

def generate_task(queue_data:Dict):
    redis_queue = RedisQueue(name="task", host="redis", port=6379, db=0)
    queue_data["timestamp"] = str(timezone.localtime())
    queue_str = json.dumps(queue_data)
    redis_queue.put(queue_str)
    
