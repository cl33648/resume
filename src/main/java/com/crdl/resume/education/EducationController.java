package com.crdl.resume.education;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("api/v1/education")
@AllArgsConstructor
public class EducationController {
    private final EducationService educationService;

    @GetMapping
    public List<Education> getEducation(){
        return educationService.getAllEducation();
    }

    @PostMapping
    public void addEducation(@Valid @RequestBody Education education){
        educationService.addEducation(education);
    }

    @DeleteMapping(path = "{educationId}")
    public void deleteEducation(@PathVariable("educationId") Long educationId){
        educationService.deleteEducation(educationId);
    }
}
