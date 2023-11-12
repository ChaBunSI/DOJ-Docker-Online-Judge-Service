
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
            "is_passed",
            "is_judged",
            "judge_status",
            "language_code",
            "created_time",
            "start_time",
            "end_time",
        ]
        
class SubmissionDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = Submission
        fields = [
            "id",
            "user_id",
            "is_passed",
            "is_judged",
            "judge_status",
            "source",
            "language_code",
            "created_time",
            "start_time",
            "end_time",
        ]