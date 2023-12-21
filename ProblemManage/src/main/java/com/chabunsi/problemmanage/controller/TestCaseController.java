package com.chabunsi.problemmanage.controller;

import com.chabunsi.problemmanage.dto.request.TestCaseBody;
import com.chabunsi.problemmanage.dto.request.TestCaseListBody;
import com.chabunsi.problemmanage.entity.TestCase;
import com.chabunsi.problemmanage.service.TestCaseService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RequiredArgsConstructor
@RequestMapping("/testCase")
@RestController
public class TestCaseController {


    private final TestCaseService testCaseService;

    // Add list By Problem ID
    @PostMapping("")
    public ResponseEntity<?> addTestcase(
            @RequestBody TestCaseListBody addTestCases
    ) {
        List<TestCase> testCases = testCaseService.addTestCases(addTestCases);
        return ResponseEntity.ok(testCases);
    }

    @PutMapping("{testCaseId}")
    public ResponseEntity<?> updateTestCase(
            @PathVariable(name = "testCaseId") Long testCaseId,
            @RequestBody TestCaseBody testCaseBody
            )
    {
        testCaseService.updateTestCase(testCaseBody, testCaseId);
        return ResponseEntity.ok("수정되었습니다.");
    }

    // Delete list
    @DeleteMapping("")
    public ResponseEntity<?> deleteTestCase(
            @RequestParam List<Long> ids
    ) {
        testCaseService.deleteTestCases(ids);
        return ResponseEntity.ok("삭제되었습니다.");
    }





}
