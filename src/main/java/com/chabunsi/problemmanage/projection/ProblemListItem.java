package com.chabunsi.problemmanage.projection;

public interface ProblemListItem {
    Long    getId();
    String  getTitle();
    String getContent();
    int     getSolve_num();
    int     getWrong_num();

}
