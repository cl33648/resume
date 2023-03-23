package com.crdl.resume.skill;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("api/v1/skill")
@AllArgsConstructor
public class SkillController {
    private final SkillService skillService;

    @GetMapping
    public List<Skill> getSkill(){
        return skillService.getAllSkills();
    }

    @PostMapping
    public void addSkill(@Valid @RequestBody Skill skill){
        skillService.addSkill(skill);
    }

    @PutMapping(path = "{skillId}")
    public void editSkill(@PathVariable("skillId") Long id, @Valid @RequestBody Skill skill){
        skillService.editSkill(id, skill);
    }

    @DeleteMapping(path = "{skillId}")
    public void deleteSkill(@PathVariable("skillId") Long skillId){
        skillService.deleteSkill(skillId);
    }
}
