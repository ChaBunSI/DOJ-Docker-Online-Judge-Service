package com.chabunsi.problemmanage.message.listener;

import com.chabunsi.problemmanage.message.dto.receive.MessagePayload;
import com.chabunsi.problemmanage.message.dto.receive.ResultSubmit;
import com.chabunsi.problemmanage.service.ProblemService;
import com.google.gson.Gson;
import io.awspring.cloud.sqs.annotation.SqsListener;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.handler.annotation.Headers;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.stereotype.Component;

import java.util.Map;

@Slf4j
@AllArgsConstructor
@Component
public class ReceiveListener {

    private final ProblemService problemService;

    // on_success 로 기본 설정되어있음
    @SqsListener(value = "${cloud.aws.sqs.queue.name}")
    public void messageListener(@Payload MessagePayload message, @Headers Map<String, String> headers) {
        System.out.println(message);
        Gson gson = new Gson();

        // TODO : Judge Done 메세지 타입에 따라 수정해야 함.
        problemService.updateByResultSubmit(gson.fromJson(message.getMessage(), ResultSubmit.class));


    }
}
