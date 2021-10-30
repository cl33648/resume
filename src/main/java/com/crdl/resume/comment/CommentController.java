package com.crdl.resume.comment;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Arrays;
import java.util.List;

@RestController
@RequestMapping("api/v1/comment")
public class CommentController {

    @GetMapping
    public List<Comment> getComments(){
        List<Comment> comments = Arrays.asList(
                new Comment(1L,
                        "commenter",
                        "wow! the resume is looking great!"),
                new Comment(2L,
                        "commenter2",
                        "meh, you need to work on it more.")
        );

        return comments;
    }

}
