package com.chabunsi.problemmanage.service;

import com.chabunsi.problemmanage.dto.request.ProblemBody;
import com.chabunsi.problemmanage.dto.request.TestCaseBody;
import com.chabunsi.problemmanage.dto.request.TestCaseListBody;
import com.chabunsi.problemmanage.entity.Problem;
import com.chabunsi.problemmanage.entity.TestCase;

import java.util.List;

public interface TestCaseService {
    List<TestCase>      addTestCases(ProblemBody problemBody, Problem problem);
    List<TestCase>      addTestCases(TestCaseListBody addTestCases);
    void                updateTestCase(TestCaseBody testCaseBody, Long testCaseId);
    void                deleteTestCases(List<Long> testCaseIdList);
}
