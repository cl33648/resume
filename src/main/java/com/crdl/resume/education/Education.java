package com.crdl.resume.education;

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
public class Education {
    @Id
    @SequenceGenerator(
            name="education_sequence",
            sequenceName = "education_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            generator = "education_sequence",
            strategy = GenerationType.SEQUENCE
    )
    private Long id;
    @NotBlank
    @Column(nullable = false)
    private String institute;
    @NotBlank
    @Column(nullable = false)
    private String degree;
    @NotBlank
    @Column(nullable = false)
    private String major;
    @NotBlank
    @Column(nullable = false)
    private String startDate;
    private String graduationDate;
    private String description;
}
