FROM openjdk:17-slim

# copy
COPY . /app

# install java and build gradlew
RUN apt-get update
RUN apt-get upgrade -y

WORKDIR /app
RUN chmod +x gradlew
RUN ./gradlew build

# run
CMD ["java", "-jar", "/app/build/libs/discovery-0.0.1-SNAPSHOT.jar"]