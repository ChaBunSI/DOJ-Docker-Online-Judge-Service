package com.chabunsi.problemmanage.message;

import com.chabunsi.problemmanage.config.AwsConfig;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import software.amazon.awssdk.services.sqs.model.Message;
import software.amazon.awssdk.services.sqs.model.ReceiveMessageRequest;

import java.util.List;

@Service
@AllArgsConstructor
public class SqsService {
    private final AwsConfig awsConfig;

    public void awsSqsReceive() {
        ReceiveMessageRequest request = ReceiveMessageRequest.builder()
                .queueUrl(awsConfig.getSqsUrl())
                .maxNumberOfMessages(10)
                .waitTimeSeconds(5)
                .build();

        List<Message> messages = awsConfig.getSqsClient().receiveMessage(request).messages();
        // TODO : 이 messages를 처리하는 부분 개발 필요
    }
}
