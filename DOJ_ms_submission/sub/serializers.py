
# pip
from rest_framework import serializers

# models
from sub.models import Submission

class SubmissionBasicSerializer(serializers.ModelSerializer):
    class Meta:
        model = Submission
        fields = [
            "id",
            "problem_id",
            "user_id",
            "is_passed",
            "is_judged",
            "judge_status",
            "judge_description",
            "language_code",
            "created_time",
            "start_time",
            "end_time",
            "memory_used",
            "time_used",
        ]
        
class SubmissionDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = Submission
        fields = [
            "id",
            "problem_id",
            "user_id",
            "judge_status",
            "source",
            "language_code",
            "judge_status",
            "judge_description",
            "error_message",
            "created_time",
            "start_time",
            "end_time",
            "memory_used",
            "time_used",
        ]