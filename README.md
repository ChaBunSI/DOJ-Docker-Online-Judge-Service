# ProblemManage
DOJ의 문제 관리 서비스입니다.

## 기능
문제 CRUD

## DB

### Problem Table
| key             | type | Description |
|-----------------|------|-------------|
| id(PK)          | Long |             |
| title           | Text |             |
| solve_num       | int  |             |
| wrong_num       | int  |             |
| time_limited    | int  |             |
| memory limited  | int  |             | 

### TestCase Table
| key            | type | Description |
|----------------|------|-------------|
| id(PK)         | Long |             |
| problem_id(FK) | Long |             |
| input          | Text |             |
| output         | Text |             |

## API
몰루

