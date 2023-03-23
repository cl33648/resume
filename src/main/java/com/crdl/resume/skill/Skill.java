package com.crdl.resume.skill;

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
public class Skill {
    @Id
    @SequenceGenerator(
            name="skill_sequence",
            sequenceName = "skill_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            generator = "skill_sequence",
            strategy = GenerationType.SEQUENCE
    )
    private Long id;
    @NotBlank
    @Column(nullable = false)
    private String skill;
    private String skillDescription;
}
