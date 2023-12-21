package com.chabunsi.problemmanage.message.service;

import com.chabunsi.problemmanage.config.AwsConfig;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import software.amazon.awssdk.services.sqs.model.*;

import java.util.List;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ExecutionException;

@Service
@AllArgsConstructor
public class SqsService {

    private final AwsConfig awsConfig;

    public List<String> awsSqsBatchDelete(List<Message> messages) throws ExecutionException, InterruptedException {

        DeleteMessageBatchRequest request = DeleteMessageBatchRequest.builder()
                .queueUrl(awsConfig.getSqsUrl())
                .build();

        List<DeleteMessageBatchRequestEntry> entries = request.entries();
        messages.forEach(m -> entries.add(DeleteMessageBatchRequestEntry.builder()
                .id(m.messageId())
                .receiptHandle(m.receiptHandle())
                .build()
        ));

        CompletableFuture<DeleteMessageBatchResponse> future = awsConfig.getSqsAsyncClient().deleteMessageBatch(request);


        return future.get().failed().stream()
                .map(e -> "id : " + e.id() + ", " + "message : " + e.message())
                .toList();

    }
}
