package com.chabunsi.problemmanage.message.dto.send;

import com.chabunsi.problemmanage.entity.TestCase;
import com.fasterxml.jackson.annotation.JsonAutoDetect;
import lombok.Getter;

import java.util.List;

@Getter
@JsonAutoDetect
public class TestCaseMessage {

    private String eventType;
    List<TestCase> testCases;
}
