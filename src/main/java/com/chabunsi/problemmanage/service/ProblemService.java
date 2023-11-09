package com.chabunsi.problemmanage.service;

import com.chabunsi.problemmanage.dto.request.AddProblemBody;
import com.chabunsi.problemmanage.entity.Problem;
import com.chabunsi.problemmanage.projection.ProblemListItem;

import java.util.List;
import java.util.Optional;

public interface ProblemService {
    List<ProblemListItem>   getProblemList();
    Problem                 getProblem(Long problemId);
    Problem                 addProblem(AddProblemBody addProblemBody);
    void                    deleteProblem(Long problemId);

}
