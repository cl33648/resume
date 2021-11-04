package com.crdl.resume.academic;

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
public class AcademicExperience {
    @Id
    @SequenceGenerator(
            name="academic_sequence",
            sequenceName = "academic_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            generator = "academic_sequence",
            strategy = GenerationType.SEQUENCE
    )
    private Long id;
    @NotBlank
    @Column(nullable = false)
    private String institute;
    @NotBlank
    @Column(nullable = false)
    private String positionTitle;
    @NotBlank
    @Column(nullable = false)
    private String duration;
    private String description;
}
