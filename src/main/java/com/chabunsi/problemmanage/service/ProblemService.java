package com.chabunsi.problemmanage.service;

import com.chabunsi.problemmanage.dto.request.ProblemBody;
import com.chabunsi.problemmanage.dto.response.ProblemWithTestcase;
import com.chabunsi.problemmanage.entity.Problem;
import com.chabunsi.problemmanage.message.dto.ResultSubmit;
import com.chabunsi.problemmanage.projection.ProblemListItem;

import java.util.List;

public interface ProblemService {
    List<ProblemListItem>   getProblemList();
    ProblemWithTestcase     getProblem(Long problemId);
    Problem                 addProblem(ProblemBody problemBody);
    void                    deleteProblem(Long problemId);
    void                    updateProblem(ProblemBody problemBody, Long problemId);
    void                    updateByResultSubmit(ResultSubmit submit);

}
