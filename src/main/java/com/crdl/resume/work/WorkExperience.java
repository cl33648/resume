package com.crdl.resume.work;

import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
@EqualsAndHashCode
public class WorkExperience {
    private Long id;
    private String company;
    private String jobTitle;
    private String workDuration;
    private String description;
}
