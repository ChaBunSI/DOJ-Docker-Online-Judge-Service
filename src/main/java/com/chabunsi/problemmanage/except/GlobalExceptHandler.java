package com.chabunsi.problemmanage.except;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

/*
    전역 에러 관리 핸들러
 */
@RestControllerAdvice
public class GlobalExceptHandler {
    @ExceptionHandler({ CustomException.class })
    protected ResponseEntity handleCustomException(CustomException ex) {
        return new ResponseEntity(new ErrorDto(ex.getErrors().getCode(), ex.getErrors().getMessage()), HttpStatus.valueOf(ex.getErrors().getCode()));
    }
}
