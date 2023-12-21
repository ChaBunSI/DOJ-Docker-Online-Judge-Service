package com.chabunsi.problemmanage.service;

import com.chabunsi.problemmanage.dto.request.ProblemBody;
import com.chabunsi.problemmanage.dto.request.TestCaseBody;
import com.chabunsi.problemmanage.repository.TestCaseRepository;
import org.junit.jupiter.api.*;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Arrays;
import java.util.List;

import static org.mockito.ArgumentMatchers.any;

@ExtendWith(MockitoExtension.class)
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
public class TestCaseServiceTest {
    @Mock
    private TestCaseRepository testCaseRepository;

    @InjectMocks
    private TestCaseService testCaseService;

    // Static Given

    @BeforeEach
    public void SetUp() {

    }

    @Test
    @DisplayName("테스트케이스 추가 테스트")
    public void 테스트케이스_추가() {
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

        // then


    }

    @Test
    @DisplayName("테스트케이스 조회 테스트")
    public void 테스트케이스_조회() {
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

        // then

    }

}
