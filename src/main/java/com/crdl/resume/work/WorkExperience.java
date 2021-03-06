package com.crdl.resume.work;

import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
@EqualsAndHashCode
@Entity
@Table
public class WorkExperience {
    @Id
    @SequenceGenerator(
            name="work_sequence",
            sequenceName = "work_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            generator = "work_sequence",
            strategy = GenerationType.SEQUENCE
    )
    private Long id;
    @NotBlank
    @Column(nullable = false)
    private String company;
    @NotBlank
    @Column(nullable = false)
    private String jobTitle;
    @NotBlank
    @Column(nullable = false)
    private String workDuration;
    private String description;
}
