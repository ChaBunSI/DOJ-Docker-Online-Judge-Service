# Parameters
SOURCE="source"
LANGUAGE="language"
USER_ID="user_id"
ACCESS_TOKEN = "access_token"
PROBLEM_ID="problem_id"

# Language Codes
LANGUAGE_DEFAULT=9
LANGUAGE_C=0
LANGUAGE_CPP=1
LANGUAGE_JAVA=2
LANGUAGE_PYTHON=3

# SOURCE CODE
SOURCE_DEFAULT=""

# JUDGE STATUS -> Judge 쪽 따라가서 그대로 복붙 예정
JUDGE_SUCCESS=200
JUDGE_CREATED=301
JUDGE_PENDING=302
JUDGE_RUNNING=303
JUDGE_FAILURE=400
JUDGE_ERROR_COMPILE=500
JUDGE_ERROR_RUNTIME=500

JC_NJ = 0
JC_AC = 1
JC_WA = 2
JC_CE = 3
JC_RE = 4
JC_TLE = 5
JC_MLE = 6
JC_OLE = 7
JC_SE = 8
JC_INQ = 9

JC_NJ_DESC = "Not Judged"
JC_AC_DESC = "Accepted"
JC_WA_DESC = "Wrong Answer"
JC_CE_DESC = "Compile Error"
JC_RE_DESC = "Runtime Error"
JC_TLE_DESC = "Time Limit Exceeded"
JC_MLE_DESC = "Memory Limit Exceeded"
JC_OLE_DESC = "Output Limit Exceeded"
JC_SE_DESC = "Sandbox Error"
JC_INQ_DESC ="In Queue"


JC_DICT = {
    JC_NJ: JC_NJ_DESC,
    JC_AC: JC_AC_DESC,
    JC_WA: JC_WA_DESC,
    JC_CE: JC_CE_DESC,
    JC_RE: JC_RE_DESC,
    JC_TLE: JC_TLE_DESC, 
    JC_MLE: JC_MLE_DESC,
    JC_OLE: JC_OLE_DESC,
    JC_SE: JC_SE_DESC,
}


# APP
APP_NAME_PM = "PROBLEM-MANAGE-SERVICE"
APP_NAME_AUTH = "AUTH-SERVICE"

# PARAMETERS
MEM_LIMITED = "memory_limited"
TIME_LIMITED="time_limited"
MEM_USED = "memory_used"
TIME_USED="time_used"
