package com.chabunsi.problemmanage.dto.request;

import com.chabunsi.problemmanage.entity.Problem;
import com.chabunsi.problemmanage.entity.TestCase;
import com.fasterxml.jackson.annotation.JsonAutoDetect;
import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
@Builder
@JsonAutoDetect
public class AddTestCase {
    private String input;
    private String output;

}