package com.chabunsi.problemmanage.repository;

import com.chabunsi.problemmanage.entity.Problem;
import com.chabunsi.problemmanage.projection.ProblemListItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ProblemRepository extends JpaRepository<Problem, Long> {

    @Query(value = "SELECT id, title, content, solve_num, wrong_num\n" +
            "from problem", nativeQuery = true)
    List<ProblemListItem> findAllProblemList();
}
