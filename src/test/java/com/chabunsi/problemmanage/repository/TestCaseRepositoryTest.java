package com.chabunsi.problemmanage.repository;

import com.chabunsi.problemmanage.entity.Problem;
import com.chabunsi.problemmanage.entity.TestCase;
import com.chabunsi.problemmanage.service.TestCaseService;
import org.junit.Before;
import org.junit.Test;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.Arrays;
import java.util.List;

@DataJpaTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
@RunWith(SpringRunner.class)
public class TestCaseRepositoryTest {
    @Autowired
    private TestCaseRepository testCaseRepository;

    @Autowired
    private ProblemRepository problemRepository;

    // Given
    public static Problem problem;
    public static List<TestCase> testCaseList;

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

        testCaseList = Arrays.asList(
                TestCase.builder().id(1L).problem(problem).input("1 1 1").output("Test1!").build(),
                TestCase.builder().id(2L).problem(problem).input("2 2 2").output("Test2!").build()
        );
    }

    @Test
    @DisplayName("테스트 케이스 추가 및 조회")
    public void 문제_추가_조회() {
        // given
        problemRepository.save(problem);
        // when

        testCaseRepository.saveAll(testCaseList);
        TestCase addedTestCase = testCaseRepository.findById(1L).orElseThrow();

        // then
        System.out.println(addedTestCase.getId());
        Assertions.assertEquals(testCaseList.get(0).getInput(), addedTestCase.getInput());
    }

    @Test
    @DisplayName("테스트 케이스 삭제")
    public void 테스트_케이스_삭제() {
        // given
        problemRepository.save(problem);
        testCaseRepository.save(testCaseList.get(0));

        // when
        testCaseRepository.deleteById(1L);

        // then
        Assertions.assertNull(testCaseRepository.findById(1L).orElse(null));
    }
}
