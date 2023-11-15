package com.chabunsi.problemmanage.message.dto;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

@Getter
@Builder
@JsonAutoDetect
@ToString
public class ResultSubmit {
    private Long problemId;
    private String eventType;

}
