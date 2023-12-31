package com.chabunsi.problemmanage.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "problem")
@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Problem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private String title;

    @Column(columnDefinition = "TEXT")
    private String content;

    @Column(columnDefinition = "TEXT")
    private String input_description;

    @Column(columnDefinition = "TEXT")
    private String output_description;

    @Column
    private int solve_num;

    @Column
    private int wrong_num;

    @OneToMany(mappedBy = "problem", cascade = {CascadeType.PERSIST, CascadeType.REMOVE})
    private List<TestCase> testCaseList = new ArrayList<>();

    @Column
    private int time_limited;

    @Column
    private int memory_limited;

}
