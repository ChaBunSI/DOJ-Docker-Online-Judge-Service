package com.chabunsi.problemmanage.config;

import lombok.Getter;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import software.amazon.awssdk.auth.credentials.AwsBasicCredentials;
import software.amazon.awssdk.auth.credentials.AwsCredentialsProvider;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.sns.SnsClient;
import software.amazon.awssdk.services.sqs.SqsClient;

@Getter
@Configuration
public class AwsConfig {

    @Value("${cloud.aws.credentials.access-key}")
    private String awsAccessKey;

    @Value("${cloud.aws.credentials.secret-key}")
    private String awsSecretKey;

    @Value("${}")
    private String awsRegion;

    @Value("${cloud.aws.sns.topic.arn}")
    private String snsTopicARN;

    @Value("${cloud.aws.sqs.queue.name}")
    private String sqsName;

    @Value("${cloud.aws.sqs.queue.url}")
    private String sqsUrl;

    public SnsClient getSnsClient() {
        return SnsClient.builder()
                .credentialsProvider(
                        getAwsCredentials(this.awsAccessKey, this.awsSecretKey)
                ).region(Region.of(this.awsRegion))
                .build();
    }

    public SqsClient getSqsClient() {
        AwsBasicCredentials awsBasicCredentials = AwsBasicCredentials.create(awsAccessKey, awsSecretKey);
        return SqsClient.builder()
                .credentialsProvider(
                        getAwsCredentials(this.awsAccessKey, this.awsSecretKey)
                )
                .region(Region.of(this.awsRegion))
                .build();

    }

    public AwsCredentialsProvider getAwsCredentials(String accessKey, String secretKey) {
        AwsBasicCredentials awsBasicCredentials = AwsBasicCredentials.create(accessKey, secretKey);

        return () -> awsBasicCredentials;
    }


}
