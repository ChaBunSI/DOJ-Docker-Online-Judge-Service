# default

# typing

# django dependencies
from django.core.handlers.wsgi import WSGIRequest
from django.views.decorators.http import require_http_methods
from django.views.decorators.csrf import csrf_exempt
from django.db.models import Q

# models
from sub.models import Submission

# serializers
from sub.serializers import SubmissionBasicSerializer, SubmissionDetailSerializer

# utils
from sub.utils import message_response, parse_value_from_request_or_json, is_authorized, generate_task

# common
from common.topic_manager import publish_message
from common.eureka_manager import ask_problem_to_pm

# literals
from sub.parameters import SOURCE, LANGUAGE, LANGUAGE_DEFAULT, LANGUAGE_C, LANGUAGE_JAVA, LANGUAGE_PYTHON, SOURCE_DEFAULT, USER_ID, ACCESS_TOKEN, LANGUAGE_CPP, JC_NJ, JC_NJ_DESC, JC_AC, TIME_LIMITED, MEM_LIMITED
from settings.literals import AWS_SNS_TOPIC_SUBMIT

@csrf_exempt
@require_http_methods(["POST"])
def submit(request:WSGIRequest, problem_id:int):
    is_success = False
    ret_data = {}
    user_id = request.META.get(USER_ID, None)
    access_token = request.META.get(ACCESS_TOKEN, None)
    
    # 답안 제출
    source = parse_value_from_request_or_json(request, SOURCE, SOURCE_DEFAULT)
    language_code = parse_value_from_request_or_json(request, LANGUAGE, LANGUAGE_DEFAULT)
    language_code = int(language_code)
    
    limit_dict = {}
    
    if(user_id is None or len(source)==0 or language_code not in [LANGUAGE_C, LANGUAGE_JAVA, LANGUAGE_PYTHON, LANGUAGE_CPP]):
        is_success = False
        ret_data = {}
    else:
        # get value from them.
        limit_dict = ask_problem_to_pm(problem_id, {}, access_token)
        sub_object = Submission.objects.create(
            problem_id = problem_id,
            user_id = user_id,
            source = source,
            language_code = language_code,
            judge_status=JC_NJ,
            judge_description = JC_NJ_DESC,
        )
        ret_data = SubmissionBasicSerializer(sub_object).data
        queue_data = SubmissionDetailSerializer(sub_object).data
        
        # ask to problem_manage server
        queue_data[MEM_LIMITED] = limit_dict.get(MEM_LIMITED, 100)
        queue_data[TIME_LIMITED] = limit_dict.get(TIME_LIMITED, 2000)
        is_success = True
        
        generate_task(queue_data)
        
        # 메시지 큐에 보내주도록 하자구
        # publish_message(AWS_SNS_TOPIC_SUBMIT, queue_data)
    
    
    return message_response(ret_data, is_success, is_authorized(request))
    

@csrf_exempt
@require_http_methods(["GET"])
def submission(request:WSGIRequest, problem_id:int=-1):
    # 특정 문제에 대한 사용자의 제출 이력을 확인
    user_id = request.META.get(USER_ID, None)
    target = request.GET.get("target", "me")
    query_object = Q()
    is_success = False
    ret_data = {}
    
    if(user_id is not None and target=="me"):
        query_object.add(Q(user_id=user_id), query_object.AND)
    
    if(problem_id!=-1):
        query_object.add(Q(problem_id=problem_id), query_object.AND)
        queryset = Submission.objects.filter(query_object)
        if(queryset.exists()):
            ret_data = SubmissionBasicSerializer(queryset, many=True).data
            is_success = True
    
    
    return message_response(ret_data, is_success)


@csrf_exempt
@require_http_methods(["GET"])
def submissions(request:WSGIRequest): 
    # 이 유저 혹은 모든 유저의 모든 제출을 확인
    user_id = request.META.get(USER_ID, None)
    query_object = Q()
    target = request.GET.get("target", "me")
    
    is_success = False
    ret_data = {}
    
    if(user_id is not None and target=="me"):
        query_object.add(Q(user_id=user_id), query_object.AND)
        
    queryset = Submission.objects.filter(query_object)
    if(queryset.exists()):
        is_success = True
        ret_data = SubmissionBasicSerializer(queryset, many=True).data
    
    return message_response(ret_data, is_success)

@csrf_exempt
@require_http_methods(["GET"])
def user_submission_stats(request:WSGIRequest, user_id:int=-1):
    # 이 유저의 제출에 의한 문제
    query_object = Q()
    is_success = False
    ret_data = {}
    if(user_id !=-1):
        query_object.add(~Q(judge_status=JC_NJ), query_object.AND)
        queryset = Submission.objects.filter(query_object)
        
        
        success_queryset = queryset.filter(judge_status=JC_AC)
        fail_queryset = queryset.exclude(judge_status=JC_AC)
        
        total_count = len(queryset)
        success_count = len(success_queryset)
        
        success_problems = list(success_queryset.distinct("problem_id"))
        fail_problems = list(fail_queryset.distinct("problem_id"))
        
        success_problems = [item.problem_id for item in success_problems]
        fail_problems = [item.problem_id for item in fail_problems]
        fail_problems = list(filter(lambda x: x not in success_problems, fail_problems))
        fail_count = len(fail_problems)
        
        ret_data["total_count"] = total_count
        ret_data["success_count"] = success_count
        ret_data["fail_count"] = fail_count
        
        ret_data["success_problems"] = success_problems
        ret_data["fail_problems"] = fail_problems
        is_success = True    

    return message_response(ret_data , is_success)
    
        

@csrf_exempt
@require_http_methods(["GET"])
def submit_detail(request:WSGIRequest, id:int):
    # 제출 상세(코드 포함)
    is_success = False
    ret_data = {}
    
    query_object = Q()
    
    if(id!=-1):
        query_object.add(Q(id=id), query_object.AND)
        queryset = Submission.objects.filter(query_object)
        if queryset.exists():
            ret_data = SubmissionDetailSerializer(queryset.first()).data
        
        is_success = True
    
    return message_response(ret_data, is_success)