package com.chabunsi.problemmanage.repository;

import com.chabunsi.problemmanage.entity.Problem;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProblemRepository extends JpaRepository<Problem, Long> {

}
