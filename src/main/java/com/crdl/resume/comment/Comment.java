package com.crdl.resume.comment;

import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
@EqualsAndHashCode
public class Comment {

    private Long id;
    private String name;
    private String comment;

}
