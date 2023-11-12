package com.chabunsi.problemmanage.controller;

import com.chabunsi.problemmanage.dto.request.ProblemBody;
import com.chabunsi.problemmanage.dto.response.ProblemWithTestcase;
import com.chabunsi.problemmanage.entity.Problem;
import com.chabunsi.problemmanage.entity.TestCase;
import com.chabunsi.problemmanage.projection.ProblemListItem;
import com.chabunsi.problemmanage.service.ProblemService;
import com.chabunsi.problemmanage.service.TestCaseService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RequiredArgsConstructor
@RequestMapping("/problem")
@RestController
public class ProblemManageController {

    private final ProblemService problemService;
    private final TestCaseService testCaseService;

    // Read all item
    @GetMapping("/all")
    public ResponseEntity<?> getProblemItemList() {
        List<ProblemListItem> problemList = problemService.getProblemList();
        return ResponseEntity.ok(problemList);
    }

    // Read detail one
    @GetMapping("{problemId}")
    public ResponseEntity<?> getProblemWithTestCase(
            @PathVariable(name = "problemId")   Long problemId
    ) {
        ProblemWithTestcase problem = problemService.getProblem(problemId);
        return ResponseEntity.ok(problem);
    }

    // Add one
    @PostMapping("")
    public ResponseEntity<?> addProblem(
            @RequestBody @Validated ProblemBody problemBody
    ) {
        Problem problem = problemService.addProblem(problemBody);
        List<TestCase> testCases = testCaseService.addTestCases(problemBody, problem);

        return ResponseEntity.ok(problem);
    }

    @PutMapping("{problemId}")
    public ResponseEntity<?> updateProblem(
            @RequestBody @Validated ProblemBody problemBody,
            @PathVariable(name = "problemId")   Long problemId
    ) {
        problemService.updateProblem(problemBody, problemId);
        return ResponseEntity.ok("수정되었습니다.");
    }

    // Delete one
    @DeleteMapping("{problemId}")
    public ResponseEntity<?> deleteProblem(
            @PathVariable(name = "problemId")   Long problemId
    ) {
        problemService.deleteProblem(problemId);
        return ResponseEntity.ok("삭제되었습니다.");
    }

}
