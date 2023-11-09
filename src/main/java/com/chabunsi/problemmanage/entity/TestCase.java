package com.chabunsi.problemmanage.entity;

import com.chabunsi.problemmanage.dto.request.AddTestCase;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.checkerframework.checker.units.qual.C;

@Entity
@Table(name = "test_case")
@Builder
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class TestCase {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @JoinColumn(name="problem_id")
    @ManyToOne
    private Problem problem;

    @Column
    private String input;

    @Column
    private String output;

    public TestCase(AddTestCase addTestCase, Problem problem) {
        this.problem = problem;
        this.input = addTestCase.getInput();;
        this.output = addTestCase.getOutput();
    }

}
