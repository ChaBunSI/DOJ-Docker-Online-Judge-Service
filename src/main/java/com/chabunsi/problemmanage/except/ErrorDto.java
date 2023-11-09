package com.chabunsi.problemmanage.except;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@JsonAutoDetect
@AllArgsConstructor
@Getter
@Builder
public class ErrorDto {
    private int status;
    private String message;
}
