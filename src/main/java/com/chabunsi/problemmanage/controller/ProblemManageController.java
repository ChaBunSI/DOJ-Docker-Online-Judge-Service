package com.chabunsi.problemmanage.controller;

import com.chabunsi.problemmanage.dto.request.AddProblemBody;
import com.chabunsi.problemmanage.entity.Problem;
import com.chabunsi.problemmanage.projection.ProblemListItem;
import com.chabunsi.problemmanage.service.ProblemService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RequiredArgsConstructor
@RequestMapping("/dailyPc")
@RestController
public class ProblemManageController {

    private final ProblemService problemService;

    @GetMapping
    public ResponseEntity<?> getProblemItemList() {
        List<ProblemListItem> problemList = problemService.getProblemList();
        return ResponseEntity.ok(problemList);
    }

    @PostMapping
    public ResponseEntity<?> addProblem(
            @RequestBody @Validated AddProblemBody addProblemBody
    ) {
        Problem problem = problemService.addProblem(addProblemBody);
        return ResponseEntity.ok(problem);
    }

    @DeleteMapping
    public ResponseEntity<?> deleteProblem(
            @RequestParam Long problemId
    ) {
        problemService.deleteProblem(problemId);
        return ResponseEntity.ok("삭제되었습니다.");
    }

}
