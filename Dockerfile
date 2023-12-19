# 공개용 Dockerfile입니다.
FROM openjdk:17 as builder
# First : AWS 환경변수 기입 / Builder 세팅

# AWS Credentials
ENV access_key=${access_key:-NULL}
ENV secret_key=${secret_key:-NULL}
ENV region=${region:-NULL}

# AWS SNS / SQS Env
ENV topic_arn=${topic_arn:-NULL}
ENV sqs_name=${sqs_name:-NULL}
ENV sqs_url=${sqs_url:-NULL}

COPY gradlew .
COPY gradle gradle
COPY build.gradle build.gradle
COPY settings.gradle .
COPY src src
RUN chmod +x ./gradlew

RUN ["echo", "cloud.aws.credentials.access-key=${access_key}", ">>", "src/main/resources/application-subject.properties"]
RUN ["echo", "cloud.aws.credentials.secret-key=${secret_key}", ">>", "src/main/resources/application-subject.properties"]
RUN ["echo", "cloud.aws.region.static=${region}", ">>", "src/main/resources/application-subject.properties"]
RUN ["echo", "cloud.aws.region.auto=false", ">>", "src/main/resources/application-subject.properties"]

RUN ["echo", "cloud.aws.sns.topic.arn=${topic_arn}", ">>", "src/main/resources/application-subject.properties"]
RUN ["echo", "cloud.aws.sqs.queue.name=${sqs_name}", ">>", "src/main/resources/application-subject.properties"]
RUN ["echo", "cloud.aws.sqs.queue.url=${sqs_url}", ">>", "src/main/resources/application-subject.properties"]
RUN ["cat", "src/main/resources/application-subject.properties"]

# Second : Jar 빌드
RUN microdnf install findutils
RUN ["./gradlew", "bootjar"]

# Third : 엔트리포인트 등록
FROM openjdk:17
ARG JAR_FILE=build/libs/*.jar
COPY --from=builder ${JAR_FILE} app.jar

ENTRYPOINT ["java","-jar","/app.jar"]
