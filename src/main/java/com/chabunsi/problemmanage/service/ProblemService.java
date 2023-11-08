package com.chabunsi.problemmanage.service;

import com.chabunsi.problemmanage.entity.Problem;

import java.util.List;
import java.util.Optional;

public interface ProblemService {
    List<Problem>       getProblemList();
    Optional<Problem>   getProblem();
    Long                addProblem();
    void                deleteProblem();

}
