# DOJ_ms_submission
submission service

django + psql + (celery, redis ..)

django + celery 로 구성될 것이다
https://paikgyeong.tistory.com/17

Celery 사용은 일단은 선택적
우선은 기본적인 CRUD + 메시지 큐 연결해주는데 집중하도록 하자

DB는 일단은 볼륨 옵션 제거, 배포 설정 시에 필요

현재 테이블은 Subbmission 하나 (제출 하나)