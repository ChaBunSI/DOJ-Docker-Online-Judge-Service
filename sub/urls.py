# django
from django.urls import path
# from django.urls import re_path

# apis
from sub.api import submission, submit, submit_detail, submissions, all_submissions
urlpatterns = [
    path(
        "submit/<int:problem_id>",
         submit,
         name="submit"
    ),
    path(
        "submission/<int:problem_id>",
        submission,
        name="submission",
    ),
    path(
        "submissions", 
        submissions,
        name="all submission from user",
    ),
    path(
        "all_submissions",
        all_submissions,
        name="all submissions from ALL Users",
    ),
    path(
        "submit_detail/<int:id>",
        submit_detail,
        name="submission detail for 1 submit",
    ),
]