package com.chabunsi.problemmanage.service;

import com.chabunsi.problemmanage.dto.request.ProblemBody;
import com.chabunsi.problemmanage.dto.response.ProblemWithTestcase;
import com.chabunsi.problemmanage.entity.Problem;
import com.chabunsi.problemmanage.entity.TestCase;
import com.chabunsi.problemmanage.except.CustomException;
import com.chabunsi.problemmanage.except.Errors;
import com.chabunsi.problemmanage.message.dto.receive.ResultSubmit;
import com.chabunsi.problemmanage.message.service.SnsService;
import com.chabunsi.problemmanage.projection.ProblemListItem;
import com.chabunsi.problemmanage.repository.ProblemRepository;
import com.google.gson.Gson;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.stream.Collectors;

@Slf4j
@RequiredArgsConstructor
@Service
public class ProblemServiceImpl implements ProblemService {

    private final ProblemRepository problemRepository;
    private final SnsService snsService;

    @Override
    public List<ProblemListItem> getProblemList() {
        return problemRepository.findAllProblemList();
    }

    @Override
    public ProblemWithTestcase getProblem(Long problemId) {
        Problem problem = problemRepository.findById(problemId).orElseThrow(
                () -> new CustomException(Errors.PROBLEM_NOT_FOUND));
        return new ProblemWithTestcase(problem);
    }

    @Transactional
    @Override
    public Problem addProblem(ProblemBody problemBody) {
        Problem problem = problemBody.toEntity();
        problemRepository.save(problem);

        // 동기화
        if(!problem.getTestCaseList().isEmpty()) {
            Map<String, Object> map = new HashMap<>();
            map.put("eventType", "TestCase_ADD");
            map.put("testCases", problem.getTestCaseList().stream().map(tc -> TestCase.builder().id(tc.getId()).input(tc.getInput()).output(tc.getOutput()).build()).collect(Collectors.toList()));
            snsService.awsSnsPublish("TestCaseQueueing", "TestCaseEvent", map);
        }
        
        return problem;
    }

    @Override
    public void deleteProblem(Long problemId) {
        problemRepository.deleteById(problemId);
    }

    @Transactional
    @Override
    public void updateProblem(ProblemBody problemBody, Long problemId) {
        Problem problem = problemRepository.getReferenceById(problemId);

        problem.setTitle(problemBody.getTitle());
        problem.setContent(problemBody.getContent());
        problem.setMemory_limited(problemBody.getMemory_limited());
        problem.setTime_limited(problemBody.getTime_limited());

    }

    @Transactional
    @Override
    public void updateByResultSubmit(ResultSubmit submit) {
        if(submit.getProblemId() == null || submit.getEventType() == null) {
            throw new CustomException(Errors.PROBLEM_NOT_FOUND);
        }


        Problem problem = problemRepository.getReferenceById(submit.getProblemId());

        if(Objects.equals(submit.getEventType(), "solve")) {
            problem.setSolve_num(problem.getSolve_num() + 1);
        } else if (Objects.equals(submit.getEventType(), "wrong")) {
            problem.setWrong_num(problem.getWrong_num() + 1);
        }
    }


}
