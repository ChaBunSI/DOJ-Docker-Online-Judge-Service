package com.chabunsi.problemmanage.service;

import com.chabunsi.problemmanage.dto.request.ProblemBody;
import com.chabunsi.problemmanage.dto.request.TestCaseBody;
import com.chabunsi.problemmanage.entity.Problem;
import com.chabunsi.problemmanage.repository.ProblemRepository;
import org.junit.jupiter.api.*;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Arrays;
import java.util.List;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
public class ProblemServiceTest {
    @Mock
    private ProblemRepository problemRepository;

    @InjectMocks
    private ProblemServiceImpl problemService;

    // Static Given

    @BeforeEach
    public void SetUp() {

    }

    @Test
    @DisplayName("문제 추가 및 조회 테스트")
    public void 문제_추가_조회() {
        // given
        List<TestCaseBody> testCaseBodies = Arrays.asList(
                TestCaseBody.builder()
                        .input("1 1 1\n1 1")
                        .output("Test1!").build(),
                TestCaseBody.builder()
                        .input("2 2 2\n2 2")
                        .output("Test2!").build());

        ProblemBody problemBody = ProblemBody.builder()
                .title("TestTitle")
                .content("TestContent")
                .time_limited(200)
                .testCaseBodyList(testCaseBodies)
                .memory_limited(100).build();

        // when
        when(problemRepository.save(any())).thenReturn(problemBody.toEntity());

        // then
        Problem addedProblem = problemService.addProblem(problemBody);
        Assertions.assertEquals(problemBody.toEntity().getTitle() ,addedProblem.getTitle());

    }

    @Test
    @DisplayName("문제 삭제 테스트")
    public void 문제_삭제() {
        // given
       Long problemId = 1L;
       this.문제_추가_조회();

        // when
        problemService.deleteProblem(problemId);

        // then
        verify(problemRepository, Mockito.times(1)).deleteById(problemId);
    }

}
