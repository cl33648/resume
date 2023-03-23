package com.crdl.resume.skill;

import com.crdl.resume.exception.NotFoundException;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@AllArgsConstructor
@Service
public class SkillService {
    private final SkillRepository skillRepository;

    public List<Skill> getAllSkills(){
        return skillRepository.findAll();
    }

    public void addSkill(Skill skill){
        skillRepository.save(skill);
    }

    public void editSkill(Long id, Skill skill){
        if(!skillRepository.existsById(id)){
            throw new NotFoundException("Skill with id "+id+" does not exist.");
        }
        skillRepository.save(skill);
    }

    public void deleteSkill(Long skillId){
        if(!skillRepository.existsById(skillId)){
            throw new NotFoundException("Skill with id "+skillId+" does not exist.");
        }
        skillRepository.deleteById(skillId);
    }
}
