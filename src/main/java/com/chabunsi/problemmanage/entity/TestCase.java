package com.chabunsi.problemmanage.entity;

import com.chabunsi.problemmanage.dto.request.TestCaseBody;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "test_case")
@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class TestCase {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @JoinColumn(name="problem_id")
    @ManyToOne
    @JsonIgnore
    private Problem problem;

    @Column
    private String input;

    @Column
    private String output;

    public TestCase(TestCaseBody testCaseBody, Problem problem) {
        this.problem = problem;
        this.input = testCaseBody.getInput();;
        this.output = testCaseBody.getOutput();
    }

}
