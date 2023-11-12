# django
from django.urls import path
# from django.urls import re_path

# apis
from sub.api import hello, submission, submit, submit_detail, submissions

urlpatterns = [
    path(
        "hello",
        hello,
        name="hello",
    ),
    path(
        "submit/<int:problem_id>",
         submit,
         name="submit"
    ),
    path(
        "submission",
        submission,
        name="submission",
    ),
    path(
        "submissions", 
        submissions,
        name="all submission from user",
    ),
    path(
        "submit_detail/<int:id>",
        submit_detail,
        name="submission detail for 1 submit",
    ),
]