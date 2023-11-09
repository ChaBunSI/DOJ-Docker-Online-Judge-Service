# ProblemManage
DOJ의 문제 관리 서비스입니다.

## 기능
문제 CRUD

## DB

### Problem Table
| key            | type | Description |
|----------------|------|-------------|
| id(PK)         | Long | 고유키         |
| title          | Text | 문제 제목       |
| content        | Text | 문제 내용       |
| solve_num      | int  | 맞춘 횟수       |
| wrong_num      | int  | 틀린 횟수       |
| time_limited   | int  | 시간 제한(msec) |
| memory limited | int  | 메모리 제한(mb)  | 

### TestCase Table
| key            | type | Description |
|----------------|------|-------------|
| id(PK)         | Long | 고유키         |
| problem_id(FK) | Long | 문제 아이디      |
| input          | Text | Input 예제    |
| output         | Text | Output 예제   |

## API
몰루

