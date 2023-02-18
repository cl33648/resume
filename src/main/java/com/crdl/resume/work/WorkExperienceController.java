package com.crdl.resume.work;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Arrays;
import java.util.List;

@RestController
@RequestMapping("api/v1/work")
@AllArgsConstructor
public class WorkExperienceController {

    private final WorkExperienceService workExperienceService;

    @GetMapping
    public List<WorkExperience> getWorkExperiences(){
        return workExperienceService.getAllWorkExperiences();
    }

    @PostMapping
    public void addWorkExperience(@Valid @RequestBody WorkExperience workExperience){
        workExperienceService.addWorkExperience(workExperience);
    }

    @PutMapping(path = "{workId}")
    public void editWorkExperience(@PathVariable("workId") Long id, @Valid @RequestBody WorkExperience workExperience){
        workExperienceService.editWorkExperience(id, workExperience);
    }

    @DeleteMapping(path = "{workId}")
    public void deleteWorkExperience(@PathVariable("workId") Long workExperienceId){
        workExperienceService.deleteWorkExperience(workExperienceId);
    }

}
