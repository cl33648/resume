package com.crdl.resume.academic;

import com.crdl.resume.exception.NotFoundException;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@AllArgsConstructor
@Service
public class AcademicExperienceService {

    private final AcademicExperienceRepository academicExperienceRepository;

    public List<AcademicExperience> getAllAcademicExperiences(){
        return academicExperienceRepository.findAll();
    }

    public void addAcademicExperience(AcademicExperience academicExperience){
        academicExperienceRepository.save(academicExperience);
    }

    public void deleteAcademicExperience(Long academicExperienceId){

        if(!academicExperienceRepository.existsById(academicExperienceId)){
            throw new NotFoundException("Academic Experience with id "+academicExperienceId+" does not exist.");
        }

        academicExperienceRepository.deleteById(academicExperienceId);
    }
}
