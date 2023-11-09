package com.chabunsi.problemmanage.dto.request;

import com.chabunsi.problemmanage.entity.Problem;
import com.chabunsi.problemmanage.entity.TestCase;
import com.fasterxml.jackson.annotation.JsonAutoDetect;
import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
@Builder
@JsonAutoDetect
public class AddProblemBody {
    private String title;
    private String content;
    private int memory_limited;   // MB
    private int time_limited;   // sec

    private List<AddTestCase> addTestCaseList;

    public Problem Make() {
        return Problem.builder()
                .title(title)
                .content(content)
                .solve_num(0)
                .wrong_num(0)
                .memory_limited(memory_limited)
                .time_limited(time_limited).build();
    }

}
