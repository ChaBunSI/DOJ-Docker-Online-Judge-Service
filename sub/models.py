# django
from django.db import models
from django.utils import timezone

class Submission(models.Model):
    problem_id = models.IntegerField()
    user_id = models.IntegerField()
    is_passed = models.BooleanField(default=False) # has PASSED Judge?
    is_judged = models.BooleanField(default=False) # has ever entered to Judge?
    
    
    judge_status = models.IntegerField(default=0) # 상태 코드
    judge_description = models.TextField(default="", null=True, blank=True)
    error_message = models.TextField(default="", null=True, blank=True)
    
    source = models.TextField(default="")
    language_code = models.IntegerField(default=0) # 언어 종류
    
    created_time = models.DateTimeField(default=timezone.localtime) # 제출 시간
    start_time = models.DateTimeField(default=timezone.localtime, null=True, blank=True) # 채점 시작(서버로 보냄) -> 아직은 애매하다
    end_time = models.DateTimeField(null=True, blank=True) # 채점 시간
    
    # Usage Info
    memory_used = models.IntegerField(default=-1, null=True, blank=True)
    time_used = models.IntegerField(default=-1, null=True, blank=True)