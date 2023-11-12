# default
import json

# typing
from typing import Dict, Any

# pip

# django
from django.http import JsonResponse
from django.core.handlers.wsgi import WSGIRequest

def create_message(message:Dict, is_success:bool=True):
    ret_data = {}
    ret_data["data"] = message
    ret_data["is_success"] = is_success
    return ret_data

def message_response(message:Dict, is_success:bool=True):
    ret_data = create_message(message, is_success)
    status_code = 200 if is_success else 400
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
