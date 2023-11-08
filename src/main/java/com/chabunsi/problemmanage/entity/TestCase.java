package com.chabunsi.problemmanage.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;
import org.checkerframework.checker.units.qual.C;

@Entity
@Table(name = "test_case")
@Builder
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

}
