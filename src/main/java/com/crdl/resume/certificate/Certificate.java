package com.crdl.resume.certificate;

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
public class Certificate {
    @Id
    @SequenceGenerator(
            name="certificate_sequence",
            sequenceName = "certificate_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            generator = "certificate_sequence",
            strategy = GenerationType.SEQUENCE
    )
    private Long id;
    @NotBlank
    @Column(nullable = false)
    private String certificateTitle;
    @NotBlank
    @Column(nullable = false)
    private String acquiredDate;
    private String expirationDate;
    private String description;
}
