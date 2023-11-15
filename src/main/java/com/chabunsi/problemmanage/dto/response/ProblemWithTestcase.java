package com.chabunsi.problemmanage.dto.response;

import com.chabunsi.problemmanage.entity.Problem;
import com.chabunsi.problemmanage.entity.TestCase;
import com.fasterxml.jackson.annotation.JsonAutoDetect;
import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
@JsonAutoDetect
public class ProblemWithTestcase {
    private Long id;
    private String title;
    private String content;
    private int solve_num;
    private int wrong_num;
    private int memory_limited;   // MB
    private int time_limited;   // msec
    private List<TestCase> testCaseList;

    @Builder
    public ProblemWithTestcase(
            Problem problem) {
        this.id = problem.getId();
        this.title = problem.getTitle();
        this.content = problem.getContent();
        this.solve_num = problem.getSolve_num();
        this.wrong_num = problem.getWrong_num();
        this.memory_limited = problem.getMemory_limited();
        this.time_limited = problem.getTime_limited();
        this.testCaseList = problem.getTestCaseList();
    }


}
