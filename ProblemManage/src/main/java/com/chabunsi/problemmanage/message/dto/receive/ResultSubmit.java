package com.chabunsi.problemmanage.message.dto.receive;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

@Getter
@Builder
@JsonAutoDetect
@ToString
public class ResultSubmit {
    private Long id;
    private Long user_id;
    private Long problem_id;
    private int language_code;
    private int memory_limited;
    private int time_limited;
    private int judge_result;
    private String error_message;

}
