package com.chabunsi.problemmanage.service;

import com.chabunsi.problemmanage.dto.request.AddTestCase;
import com.chabunsi.problemmanage.entity.Problem;
import com.chabunsi.problemmanage.entity.TestCase;
import com.chabunsi.problemmanage.repository.TestCaseRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@RequiredArgsConstructor
@Service
public class TestCaseServiceImpl implements TestCaseService {

    private final TestCaseRepository testCaseRepository;

    @Override
    public List<TestCase> findTestCasesByProblem(Long problemId) {
        return null;
    }

    @Override
    public List<TestCase> addTestCases(List<AddTestCase> addTestCases, Problem problem) {
        List<TestCase> testCases = addTestCases
                .stream()
                .map(e -> new TestCase(e, problem))
                .collect(Collectors.toList());

        testCaseRepository.saveAll(testCases);
        return testCases;
    }

    @Override
    public void deleteTestCases() {

    }
}
