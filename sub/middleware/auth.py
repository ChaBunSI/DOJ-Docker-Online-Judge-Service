# default

# typing
from typing import Dict

# pip
import jwt

# django dependencies
from django.core.handlers.wsgi import WSGIRequest

def auth_middleware(get_response):
    def middleware(request:WSGIRequest):
        access_token: str = request.headers.get("Authorization")
        try:
            token_type, token_value = access_token.split(" ")
            token_data: Dict = jwt.decode(
                token_value, options={"verify_signature": False}
            )
            user_id = token_data["user_id"]
            request.META["access_token"] = access_token
            request.META["user_id"] = user_id
        except:
            pass
        
        
        ## should make allow/disallow rules based on token
        response = get_response(request)
        
        return response
    return middleware
        

