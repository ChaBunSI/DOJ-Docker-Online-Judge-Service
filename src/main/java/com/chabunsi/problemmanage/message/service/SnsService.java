package com.chabunsi.problemmanage.message.service;

import com.chabunsi.problemmanage.config.AwsConfig;
import com.google.gson.Gson;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import software.amazon.awssdk.services.sns.SnsClient;
import software.amazon.awssdk.services.sns.model.PublishRequest;
import software.amazon.awssdk.services.sns.model.PublishResponse;

import java.util.Map;


/*
    TODO : 어떻게 보낼지 의논 필요.
 */
@Service
@AllArgsConstructor
public class SnsService {
    private final AwsConfig awsConfig;

    public PublishResponse awsSnsPublish(String subject, String messageGroupId, Map<String, Object> data) {
        Gson gson = new Gson();

        PublishRequest publishRequest = PublishRequest.builder()
                .topicArn(awsConfig.getSnsTopicARN())
                .subject(subject)
                .message(gson.toJson(data))
                .messageGroupId(messageGroupId)
                .build();

        SnsClient snsClient = awsConfig.getSnsClient();
        PublishResponse publishResponse = snsClient.publish(publishRequest);

        return publishResponse;
    }
}
