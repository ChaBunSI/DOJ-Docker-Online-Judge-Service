# django
from django.db import models
from django.utils import timezone

class Submission(models.Model):
    problem_id = models.IntegerField()
    user_id = models.IntegerField()
    is_passed = models.BooleanField(default=False) # has PASSED Judge?
    is_judged = models.BooleanField(default=False) # has ever entered to Judge?
    judge_status = models.IntegerField(default=301) # 상태 코드
    source = models.TextField(default="")
    language_code = models.IntegerField(default=0) # 언어 종류
    
    created_time = models.DateTimeField(default=timezone.localtime) # 제출 시간
    start_time = models.DateTimeField(default=timezone.localtime, null=True, blank=True) # 채점 시작(서버로 보냄) -> 아직은 애매하다
    end_time = models.DateTimeField(null=True, blank=True) # 채점 시간
    
    # 기타 Limitation 관련 내용들은 일단 포함시키지 않도록 하자