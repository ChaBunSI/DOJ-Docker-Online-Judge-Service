package com.chabunsi.problemmanage.except;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

/*
    Error Code & Messages
*/
@Getter
@AllArgsConstructor
public enum Errors {
    // 4XX
    PROBLEM_NOT_FOUND(404, "문제를 찾을 수 없습니다."),
    TESTCASE_NOT_FOUND(404, "테스트케이스를 찾을 수 없습니다."),

    // 5XX
    PROBLEM_ADD_FAILED(500, "문제 데이터 생성에 실패했습니다.");

    private final int code;
    private final String message;
}
