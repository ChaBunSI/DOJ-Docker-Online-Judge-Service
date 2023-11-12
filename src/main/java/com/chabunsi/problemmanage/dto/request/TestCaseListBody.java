package com.chabunsi.problemmanage.dto.request;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
@Builder
@JsonAutoDetect
public class TestCaseListBody {
    private Long problemId;
    private List<TestCaseBody> testCases;

}
