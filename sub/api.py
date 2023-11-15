# default

# typing
from typing import Dict

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
from sub.utils import message_response, parse_value_from_request_or_json

# common
from common.topic_manager import publish_message

# literals
from sub.parameters import SOURCE, LANGUAGE, LANGUAGE_DEFAULT, LANGUAGE_C, LANGUAGE_JAVA, LANGUAGE_PYTHON, SOURCE_DEFAULT, USER_ID
from settings.literals import AWS_SNS_TOPIC_SUBMIT

# GET
@csrf_exempt
@require_http_methods(["GET"])
def hello(request:WSGIRequest):
    ret_dict = {
        "is_success":"true",
        "message":"good",
    }
    return message_response(ret_dict)

# POST
@csrf_exempt
@require_http_methods(["POST"])
def submit(request:WSGIRequest, problem_id:int):
    is_success = False
    ret_data = {}
    user_id = request.META.get(USER_ID, None)
    
    # 답안 제출
    source = parse_value_from_request_or_json(request, SOURCE, SOURCE_DEFAULT)
    language_code = parse_value_from_request_or_json(request, LANGUAGE, LANGUAGE_DEFAULT)
    language_code = int(language_code)
    
    if(user_id is None or len(source)==0 or language_code not in [LANGUAGE_C, LANGUAGE_JAVA, LANGUAGE_PYTHON]):
        is_success = False
        ret_data = {}
    else:
        sub_object = Submission.objects.create(
            problem_id = problem_id,
            user_id = user_id,
            source = source,
            language_code = language_code,
        )
        ret_data = SubmissionBasicSerializer(sub_object).data
        queue_data = SubmissionDetailSerializer(sub_object).data
        is_success = True
        
        
        # 응답은 준비 완료
        
        # 메시지 큐에 보내주도록 하자구
        publish_message(AWS_SNS_TOPIC_SUBMIT, queue_data)
    
    
    return message_response(ret_data, is_success)
    

@csrf_exempt
@require_http_methods(["GET"])
def submission(request:WSGIRequest, problem_id:int=-1):
    # 특정 문제에 대한 사용자의 제출 이력을 확인
    user_id = request.META.get(USER_ID, None)
    query_object = Q()
    is_success = False
    ret_data = {}
    
    if(problem_id!=-1 and user_id is not None):
        query_object.add(Q(user_id=user_id), query_object.AND)
        query_object.add(Q(problem_id=problem_id), query_object.AND)
        submission_result = Submission.objects.filter(query_object)
        
        queryset = Submission.objects.filter(submission_result)
        if(queryset.exists()):
            ret_data = SubmissionBasicSerializer(queryset, many=True).data
            is_success = True
    
    
    return message_response(ret_data, is_success)


@csrf_exempt
@require_http_methods(["GET"])
def submissions(request:WSGIRequest): 
    # 이 유저의 모든 제출을 확인
    user_id = request.META.get(USER_ID, None)
    query_object = Q()
    
    is_success = False
    ret_data = {}
    
    if(user_id is not None):
        is_success = True
        query_object.add(Q(user_id=user_id), query_object.AND)
        queryset = Submission.objects.filter(query_object)
        if(queryset.exists()):
            ret_data = SubmissionBasicSerializer(queryset, many=True).data
        
    
    return message_response(ret_data, is_success)

@csrf_exempt
@require_http_methods(["GET"])
def submit_detail(request:WSGIRequest, id:int):
    # 제출 상세(코드 포함)
    is_success = False
    ret_data = {}
    
    user_id = request.META.get(USER_ID, None)
    query_object = Q()
    
    if(user_id is not None and id!=-1):
        query_object.add(Q(id=id), query_object.AND)
        query_object.add(Q(user_id=user_id), query_object.AND)
        queryset = Submission.objects.filter(query_object)
        if queryset.exists():
            ret_data = SubmissionDetailSerializer(queryset.first()).data
        
        is_success = True
    
    return message_response(ret_data, is_success)
