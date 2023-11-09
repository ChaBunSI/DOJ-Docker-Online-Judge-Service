package com.chabunsi.problemmanage.service;

import com.chabunsi.problemmanage.dto.request.AddTestCase;
import com.chabunsi.problemmanage.entity.Problem;
import com.chabunsi.problemmanage.entity.TestCase;

import java.util.List;

public interface TestCaseService {
    List<TestCase>      findTestCasesByProblem(Long problemId);
    List<TestCase>      addTestCases(List<AddTestCase> addTestCases, Problem problem);
    void                deleteTestCases();
}
