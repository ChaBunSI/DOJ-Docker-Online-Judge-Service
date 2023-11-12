package com.chabunsi.problemmanage.service;

import com.chabunsi.problemmanage.dto.request.ProblemBody;
import com.chabunsi.problemmanage.dto.request.TestCaseBody;
import com.chabunsi.problemmanage.dto.request.TestCaseListBody;
import com.chabunsi.problemmanage.entity.Problem;
import com.chabunsi.problemmanage.entity.TestCase;
import com.chabunsi.problemmanage.repository.ProblemRepository;
import com.chabunsi.problemmanage.repository.TestCaseRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@RequiredArgsConstructor
@Service
public class TestCaseServiceImpl implements TestCaseService {

    private final TestCaseRepository testCaseRepository;
    private final ProblemRepository problemRepository;

    @Override
    public List<TestCase> addTestCases(ProblemBody problemBody, Problem problem) {
        List<TestCase> testCases = problemBody.toTestCaseEntity(problem);

        testCaseRepository.saveAll(testCases);
        return testCases;
    }

    @Override
    public List<TestCase> addTestCases(TestCaseListBody addTestCases) {

        Problem problem = problemRepository.getReferenceById(addTestCases.getProblemId());
        List<TestCase> testCases = addTestCases.getTestCases().stream().map(tc -> new TestCase(tc, problem)).collect(Collectors.toList());
        testCaseRepository.saveAll(testCases);
        return testCases;
    }

    @Transactional
    @Override
    public void updateTestCase(TestCaseBody testCaseBody, Long testCaseId) {
        TestCase testCase = testCaseRepository.getReferenceById(testCaseId);
        testCase.setOutput(testCaseBody.getOutput());
        testCase.setInput(testCaseBody.getInput());
    }

    @Override
    public void deleteTestCases(List<Long> testCaseIdList) {
        testCaseRepository.deleteAllById(testCaseIdList);

    }
}
