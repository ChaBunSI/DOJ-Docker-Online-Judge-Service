# DOJ_ms_submission
Submission Service

django + (SQS, SNS)

필요 기능
- 기본 API
- SNS -> Topic {DOJ-Submission-SubmitTask.fifo} 에 {사용자의 제출 정보} 를 포함한 메시지 발행
- SQS -> Topic {채점 서버에서 완료후 생성하는 것} 를 구독중인 SQS로부터 {채점 결과} 데이터를 받음


구현 진행 상황
- SQS Subscribe -> Daemon Thread 서버 기동시에 실행
- SNS Publish -> 일회성으로 연결 생성 후 종료시킴
- Eureka HeartBeat -> 서버 기동시에 실행
- 기본적인 API 기능
- 코드 업로드한 내용을 SNS Topic 으로 발행

TODO
- 환경 변수 관리
- 배포 환경 설정 및 실제 배포
- 유레카에서 IP 환경변수화
- 채점 완료 메시지 생성될 시 그에 따른 변화 처리