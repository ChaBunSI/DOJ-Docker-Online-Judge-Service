# default
import asyncio
import json
import traceback

# typing
from typing import Dict

# pip
from py_eureka_client import eureka_client

# literals
from settings import literals
from sub import parameters
ec_instance = eureka_client.init(
    eureka_server = f"{literals.EUREKA_SERVER}:{literals.EUREKA_PORT}",
    app_name = literals.INSTANCE_APP_NAME,
    instance_host=literals.INSTANCE_HOST,
    instance_port=literals.INSTANCE_PORT,
)

async def eureka_request_wrapper(app_name:str, service_name:str, data:Dict, method:str="GET", token:str="",):
    res = None
    try:
        headers = {"Authorization": token} if token is not None else {}
        method = method.upper()
        res = await ec_instance.do_service(
            app_name = app_name,
            service = service_name,
            headers = headers,
            method = method,
            data = data,
            timeout=1,
        )
    except Exception as e:
        traceback.print_exc()
        print(f"eureka error -> {e}")
        res = None
    return res

def eureka_request(app_name:str, service_name:str, data:Dict, method:str="GET", token:str=""):
    res = asyncio.run(eureka_request_wrapper(app_name, service_name, data, method, token))
    return res


def ask_problem_to_pm(problem_id:int, data:Dict, token:str="")->Dict:
    ret_obj = {"memory_limited": 1000, "time_limited": 100}
    res:str = eureka_request(   
        app_name = parameters.APP_NAME_PM,
        service_name=f"/problem/{problem_id}",
        data = data,
        method = "GET",
        token = token,
    )
    try:
        if res is not None:
            problem_obj:Dict = json.loads(res)
            memory_limited = problem_obj.get(parameters.MEM_LIMITED, 100)
            time_limited = problem_obj.get(parameters.TIME_LIMITED, 100)
            ret_obj[parameters.MEM_LIMITED] = memory_limited
            ret_obj[parameters.TIME_LIMITED] = time_limited * 1000
            print(f"Get Limit Info -> {ret_obj}")
    except Exception as e: 
        print(e)
        ret_obj = {parameters.MEM_LIMITED:100, parameters.TIME_LIMITED:2000}
    return ret_obj