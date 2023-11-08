package com.chabunsi.problemmanage.service;

import com.chabunsi.problemmanage.entity.TestCase;

import java.util.List;

public interface TestCaseService {
    List<TestCase>  getTestCases();  // TODO : DTO 추가해야 함
    List<Long>      addTestCases();  // TODO : DTO 추가해야 함
    void            deleteTestCases();
}
