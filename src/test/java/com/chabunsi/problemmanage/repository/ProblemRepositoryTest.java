package com.chabunsi.problemmanage.repository;

import com.chabunsi.problemmanage.entity.Problem;
import com.chabunsi.problemmanage.except.CustomException;
import com.chabunsi.problemmanage.except.Errors;
import org.junit.Before;
import org.junit.jupiter.api.*;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.junit4.SpringRunner;

@DataJpaTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
public class ProblemRepositoryTest {

    public static Problem problem;

    @Autowired
    private ProblemRepository problemRepository;

    @BeforeEach
    public void SetUp() {
        problem = Problem.builder()
                .id(1L)
                .title("TestTitle")
                .content("TestContent")
                .solve_num(0)
                .wrong_num(0)
                .time_limited(200)
                .memory_limited(100).build();
    }

    @Test
    @Order(3)
    @DisplayName("문제 삭제")
    public void 문제_삭제() {
        // given
        problemRepository.save(problem);

        // when
        problemRepository.deleteById(problem.getId());

        // then
        Assertions.assertNull(problemRepository.findById(1L).orElse(null));
    }

    @Test
    @Order(1)
    @DisplayName("문제 추가")
    public void 문제_추가() {
        // given

        // when
        problemRepository.save(problem);
        Problem addedProblem = problemRepository.findById(problem.getId()).orElseThrow(
                () -> new CustomException(Errors.PROBLEM_NOT_FOUND)
        );

        // then
        System.out.println(addedProblem.getTitle());
        Assertions.assertEquals(problem.getTitle(), addedProblem.getTitle());
    }

    @Test
    @Order(2)
    @DisplayName("문제 조회")
    public void 문제_조회() {
        // given
        this.문제_추가();

        // when
        Problem addedProblem = problemRepository.findById(problem.getId()).orElseThrow();

        // then
        System.out.println(addedProblem.getTitle());
        Assertions.assertEquals(problem.getTitle(), addedProblem.getTitle());
    }


}
