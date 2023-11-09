package com.chabunsi.problemmanage.service;

import com.chabunsi.problemmanage.dto.request.AddProblemBody;
import com.chabunsi.problemmanage.entity.Problem;
import com.chabunsi.problemmanage.entity.TestCase;
import com.chabunsi.problemmanage.except.CustomException;
import com.chabunsi.problemmanage.except.Errors;
import com.chabunsi.problemmanage.projection.ProblemListItem;
import com.chabunsi.problemmanage.repository.ProblemRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Slf4j
@RequiredArgsConstructor
@Service
public class ProblemServiceImpl implements ProblemService {

    private final ProblemRepository problemRepository;

    @Override
    public List<ProblemListItem> getProblemList() {
        return problemRepository.findAllProblemList();
    }

    @Override
    public Problem getProblem(Long problemId) {
        return problemRepository.findById(problemId).orElseThrow(
                () -> new CustomException(Errors.PROBLEM_NOT_FOUND));
    }

    @Override
    public Problem addProblem(AddProblemBody addProblemBody) {
        Problem problem = addProblemBody.Make();
        problemRepository.save(problem);

        return problem;
    }

    @Override
    public void deleteProblem(Long problemId) {
        problemRepository.deleteById(problemId);
    }
}
