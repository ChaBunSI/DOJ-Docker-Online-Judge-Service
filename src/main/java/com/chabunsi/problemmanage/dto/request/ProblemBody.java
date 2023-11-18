package com.chabunsi.problemmanage.dto.request;

import com.chabunsi.problemmanage.entity.Problem;
import com.chabunsi.problemmanage.entity.TestCase;
import com.fasterxml.jackson.annotation.JsonAutoDetect;
import lombok.Builder;
import lombok.Getter;

import java.util.List;
import java.util.stream.Collectors;

@Getter
@Builder
@JsonAutoDetect
public class ProblemBody {
    private String title;
    private String content;
    private String input_description;
    private String output_description;
    private int memory_limited;   // MB
    private int time_limited;   // msec

    private List<TestCaseBody> testCaseBodyList;

    public Problem toEntity() {

        Problem problem = Problem.builder()
                .title(title)
                .content(content)
                .input_description(input_description)
                .output_description(output_description)
                .solve_num(0)
                .wrong_num(0)
                .memory_limited(memory_limited)
                .time_limited(time_limited).build();

        List<TestCase> testCaseEntity = toTestCaseEntity(problem);
        problem.setTestCaseList(testCaseEntity);

        return problem;
    }

    public List<TestCase> toTestCaseEntity(Problem problem) {
        return testCaseBodyList.stream().map(tc -> new TestCase(tc, problem)).collect(Collectors.toList());
    }

}
