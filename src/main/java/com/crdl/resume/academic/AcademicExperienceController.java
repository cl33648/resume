package com.crdl.resume.academic;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("api/v1/academic")
@AllArgsConstructor
public class AcademicExperienceController {

    private final AcademicExperienceService academicExperienceService;

    @GetMapping
    public List<AcademicExperience> getAcademicExperiences(){
        return academicExperienceService.getAllAcademicExperiences();
    }

    @PostMapping
    public void addAcademicExperience(@Valid @RequestBody AcademicExperience academicExperience){
        academicExperienceService.addAcademicExperience(academicExperience);
    }

    @DeleteMapping(path = "{academicId}")
    public void deleteAcademicExperience(@PathVariable("academicId") Long academicExperienceId){
        academicExperienceService.deleteAcademicExperience(academicExperienceId);
    }
}
