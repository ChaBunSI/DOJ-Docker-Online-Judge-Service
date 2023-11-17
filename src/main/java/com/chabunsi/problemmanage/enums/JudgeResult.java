package com.chabunsi.problemmanage.enums;


import lombok.Getter;

@Getter
public enum JudgeResult {
    NJ(0), AC(1), WA(2), CE(3), RE(4), TLE(5), MLE(6), OLE(7), SE(8);

    private final int value;
    private JudgeResult(int value) {
        this.value = value;
    }
}

/*
    NJ: Not Judged
    AC: Aceepted
    WA: Wrong Answer
    CE: Compile Error
    RE: Runtime Error
    TLE: Time Limit Exceeded
    MLE: Memory Limit Exceeded
    OLE: Output Limit Exceeded
    SE: Sandbox Execution Error
 */