package com.chabunsi.problemmanage.repository;

import com.chabunsi.problemmanage.entity.Problem;
import org.apache.juli.logging.Log;
import org.junit.Before;
import org.junit.Test;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.context.annotation.Import;
import org.springframework.test.context.junit4.SpringRunner;

@DataJpaTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
@RunWith(SpringRunner.class)
public class ProblemRepositoryTest {

    public static Problem problem;

    @Autowired
    private ProblemRepository problemRepository;

    @Before
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
    @DisplayName("문제 추가")
    public void 문제_추가() {
        // given

        // when
        problemRepository.save(problem);
        Problem addedProblem = problemRepository.findById(1L).orElseThrow();

        // then
        System.out.println(addedProblem.getTitle());
        Assertions.assertEquals(problem.getTitle(), addedProblem.getTitle());
    }

    @Test
    @DisplayName("문제 조회")
    public void 문제_조회() {
        // given
        this.문제_추가();

        // when
        Problem addedProblem = problemRepository.findById(1L).orElseThrow();

        // then
        System.out.println(addedProblem.getTitle());
        Assertions.assertEquals(problem.getTitle(), addedProblem.getTitle());
    }

    @Test
    @DisplayName("문제 삭제")
    public void 문제_삭제() {
        // given
        problemRepository.save(problem);

        // when
        problemRepository.deleteById(1L);

        // then
        Assertions.assertNull(problemRepository.findById(1L).orElse(null));
    }
}
