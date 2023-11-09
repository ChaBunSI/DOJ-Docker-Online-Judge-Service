package com.chabunsi.problemmanage.projection;

public interface ProblemListItem {
    Long    getId();
    String  getTitle();
    int     getSolve_num();
    int     getWrong_num();

}
