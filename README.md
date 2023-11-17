# DOJ_ms_submission
## 설명& 기능
Submission Service
django + (SQS, SNS)

## 아키텍처 & 기술 목록


## DB Table
현재는 Submission Table 하나만이 존재한다

| 이름 | 타입 | 설명 |
|----- | ------ | ------|
| id   | primary key   | 제출에 대한 ID|
| user_id | integer  | 제출한 사용자에 대한 ID, JWT에 포함된 것 사용|
| is_passed | boolean | 맞았는지 -> 사용 안할수도 있음|
| is_judged | boolean | 채점되었는지 -> 사용 안할수도 있음|
| judge_status | integer | 채점 상태 코드|
| judge_description | string | 채점 상태 설명 |
| error_message | string | 발생한 에러 상세 |
| source | string | 사용자 제출 소스 |
| language_code | integer | 사용자의 언어 코드 |
| created_time | datetime | 제출 시각 |
| start_time | datetime | 채점 시작 시간 -> 아마 안쓸것 |
| end_time | datetime | 채점 완료 시각 | 



## API 목록
다음과 같은 API들이 존재한다
- 문제 제출
- 제출 상세 확인
- 특정 문제에 대한 사용자의 제출 목록 확인
- 사용자의 모든 제출 목록 확인
- 모든 사용자의 모든 제출 목록 확인

** 모든 요청에는 JWT 를 포함해줘야 한다 **

### 1. 문제 제출 
- URL: POST /submit/{problem_id:int}

- REQUEST

JSON 으로 보내면 됨

| 이름 | 타입 | 설명 |
|----- | ------ | ------|
| language   | int   | 제출하는 언어의 번호(0:C/ 1:CPP / 2: Java / 3: Python) |
| source | string | 사용자가 제출한 코드 |

example
```
POST /submit/1

{
    "language": 1,
    "source": "#include<iostream>\nint main(void){\n    cout<<\"2\"<<endl;\n    return 0;\n}"
}

-> CPP 코드 제출 케이스
```

- RESPONSE
```
{
    "data": {
        "id": 11,
        "user_id",
        "problem_id": 1,
        "is_passed": false,
        "is_judged": false,
        "judge_status": 0,
        "judge_description": "Not Judged",
        "language_code": 1,
        "created_time": "2023-11-17T18:23:50.615399+09:00",
        "start_time": "2023-11-17T18:23:50.616629+09:00",
        "end_time": null
    },
    "is_success": true
}
```

### 2. 제출 상세 확인
- GET /submit_detail/{submit_id:int}

- RESPONSE
```
{
    "data": {
        "id": 10,
        "user_id": 1,
        "is_passed": false,
        "is_judged": false,
        "judge_status": 0,
        "source": "#include<iostream>\nint main(void){\n    cout<<\"2\"<<endl;\n    return 0;\n}",
        "language_code": 1,
        "judge_description": "Wrong Answer",
        "error_message": "",
        "created_time": "2023-11-17T18:21:33.606742+09:00",
        "start_time": "2023-11-17T18:21:33.607729+09:00",
        "end_time": null
    },
    "is_success": true
}
```

### 3. 특정 문제에 대한 사용자의 제출 목록 확인
- GET /submission/{problem_id:int}

- RESPONSE 
```
{
    "data": [
        {
            "id": 11,
            "problem_id": 1,
            "user_id": 1,
            "is_passed": false,
            "is_judged": false,
            "judge_status": 0,
            "judge_description": "Not Judged",
            "language_code": 1,
            "created_time": "2023-11-17T18:23:50.615399+09:00",
            "start_time": "2023-11-17T18:23:50.616629+09:00",
            "end_time": null
        }
    ],
    "is_success": true
}
```

### 4. 사용자의 모든 문제의 모든 제출 목록 확인
- GET /submissions

- RESPONSE
```
{
    "data": [
        {
            "id": 11,
            "user_id":1,
            "problem_id": 1,
            "is_passed": false,
            "is_judged": false,
            "judge_status": 0,
            "judge_description": "Not Judged",
            "language_code": 1,
            "created_time": "2023-11-17T18:23:50.615399+09:00",
            "start_time": "2023-11-17T18:23:50.616629+09:00",
            "end_time": null
        }
    ],
    "is_success": true
}
```

### 5. 모든 사용자의 모든 제출 목록 확인
- GET /all_submissions

```
{
    "data": [
        {
            "id": 1,
            "problem_id": 1,
            "user_id": 1,
            "is_passed": false,
            "is_judged": false,
            "judge_status": 0,
            "judge_description": "Not Judged",
            "language_code": 1,
            "created_time": "2023-11-17T18:35:20.112064+09:00",
            "start_time": "2023-11-17T18:35:20.113885+09:00",
            "end_time": null
        }
    ],
    "is_success": true
}

```

## 구현 진행 상황
- SQS Subscribe -> Daemon Thread 서버 기동시에 실행
- SNS Publish -> 일회성으로 연결 생성 후 종료시킴
- Eureka HeartBeat -> 서버 기동시에 실행
- 기본적인 API 기능
- 코드 제출한 내용을 SNS Topic 으로 발행
- 문제 관리 서비스에 제한 정보 물어보는 로직 추가(eureka 사용)
- 채점 완료 Topic에 대한 SQS(SubmissionDone.fifo) 와 그에 대한 행동 처리

## TODO
- 문제 관리 서비스에 Eureka 로 물어보는 로직 연동(현재 name-resolution failure)
- 배포 관련