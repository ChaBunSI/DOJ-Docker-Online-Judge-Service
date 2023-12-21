package com.chabunsi.problemmanage.repository;

import com.chabunsi.problemmanage.entity.TestCase;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TestCaseRepository extends JpaRepository<TestCase, Long> {
}
