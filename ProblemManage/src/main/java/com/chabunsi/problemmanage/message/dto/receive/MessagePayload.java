package com.chabunsi.problemmanage.message.dto.receive;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

@ToString
@Getter
@Builder
@JsonAutoDetect
public class MessagePayload {

    private String Type;
    private String MessageId;
    private String SequenceNumber;
    private String TopicArn;
    private String Subject;
    private String Message;
    private String Timestamp;
    private String UnsubscribeURL;
}
