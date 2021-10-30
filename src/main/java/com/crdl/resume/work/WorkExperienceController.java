package com.crdl.resume.work;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Arrays;
import java.util.List;

@RestController
@RequestMapping("api/v1/work")
public class WorkExperienceController {

    @GetMapping
    public List<WorkExperience> getWorkExperiences(){
        List<WorkExperience> workExperiences = Arrays.asList(
                new WorkExperience(1L,
                        "American Airlines",
                        "Associate Software Developer - View Res Team",
                        "2021/07 - current",
                        "maintained both legacy and cloud American Airlines software for viewing ticket reservations"),
                new WorkExperience(2L,
                        "Blue Yonder",
                        "Support Engineer - Transportation Management System",
                        "2020/01 - 2021/06",
                        "supported TMS product")
        );

        return workExperiences;
    }

}
