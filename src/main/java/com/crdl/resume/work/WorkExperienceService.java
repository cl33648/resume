package com.crdl.resume.work;

import com.crdl.resume.exception.NotFoundException;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@AllArgsConstructor
@Service
public class WorkExperienceService {

    private final WorkExperienceRepository workExperienceRepository;

    public List<WorkExperience> getAllWorkExperiences(){
        return workExperienceRepository.findAll();
    }

    public void addWorkExperience(WorkExperience workExperience){
        workExperienceRepository.save(workExperience);
    }

    public void editWorkExperience(Long id, WorkExperience workExperience){
        if(!workExperienceRepository.existsById(id)){
            throw new NotFoundException("Work Experience with id "+id+" does not exist.");
        }
        workExperienceRepository.save(workExperience);
    }

    public void deleteWorkExperience(Long workExperienceId){

        if(!workExperienceRepository.existsById(workExperienceId)){
            throw new NotFoundException("Work Experience with id "+workExperienceId+" does not exist.");
        }

        workExperienceRepository.deleteById(workExperienceId);
    }


}
