package com.chabunsi.problemmanage.dto.request;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
@JsonAutoDetect
public class TestCaseBody {
    private String input;
    private String output;

}