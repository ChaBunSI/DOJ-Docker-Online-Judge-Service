package com.chabunsi.problemmanage.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "problem")
@Builder
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class Problem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private String title;

    @Column
    private String content;

    @Column
    private int solve_num;

    @Column
    private int wrong_num;

    @Column
    private int time_limited;

    @Column
    private int memory_limited;

}
