# django
from django.urls import path
# from django.urls import re_path

# apis
from sub.api import submission, submit, submit_detail, submissions, user_submission_stats
urlpatterns = [
    path(
        "submit/<int:problem_id>",
         submit,
         name="제출 행위 처리"
    ),
    path(
        "submission/<int:problem_id>",
        submission,
        name="문제에 대한 제출 이력을 확인 target=all 로 보내면 남의 것 확인",
    ),
    path(
        "submissions", 
        submissions,
        name="내 모든 제출 이력을 확인 target=all 로 보내면 남의 것 확인",
    ),
    path(
        "submit_detail/<int:id>",
        submit_detail,
        name="특정 제출 하나의 상세 내용을 확인",
    ),
    path(
        "user-submission-stats/<int:user_id>",
        user_submission_stats,
        name="user_submission stats"
    ),
]