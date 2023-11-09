package com.chabunsi.problemmanage.service;

import com.chabunsi.problemmanage.dto.request.AddProblemBody;
import com.chabunsi.problemmanage.dto.request.AddTestCase;
import com.chabunsi.problemmanage.entity.Problem;
import com.chabunsi.problemmanage.repository.ProblemRepository;
import com.chabunsi.problemmanage.repository.TestCaseRepository;
import org.junit.jupiter.api.*;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Arrays;
import java.util.List;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

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
    @DisplayName("문제 추가 테스트")
    public void 문제_추가() {
        // given
        List<AddTestCase> addTestCases = Arrays.asList(
                AddTestCase.builder()
                        .input("1 1 1\n1 1")
                        .output("Test1!").build(),
                AddTestCase.builder()
                        .input("2 2 2\n2 2")
                        .output("Test2!").build());

        AddProblemBody addProblemBody = AddProblemBody.builder()
                .title("TestTitle")
                .content("TestContent")
                .time_limited(200)
                .addTestCaseList(addTestCases)
                .memory_limited(100).build();


        // when

        // then


    }

    @Test
    @DisplayName("문제 조회 테스트")
    public void 문제_조회() {
        // given
        List<AddTestCase> addTestCases = Arrays.asList(
                AddTestCase.builder()
                        .input("1 1 1\n1 1")
                        .output("Test1!").build(),
                AddTestCase.builder()
                        .input("2 2 2\n2 2")
                        .output("Test2!").build());

        AddProblemBody addProblemBody = AddProblemBody.builder()
                .title("TestTitle")
                .content("TestContent")
                .time_limited(200)
                .addTestCaseList(addTestCases)
                .memory_limited(100).build();

        // when

        // then

    }

}
