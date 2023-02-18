package com.crdl.resume.education;

import com.crdl.resume.exception.NotFoundException;
import com.crdl.resume.work.WorkExperience;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@AllArgsConstructor
@Service
public class EducationService {
    private final EducationRepository educationRepository;

    public List<Education> getAllEducation(){
        return educationRepository.findAll();
    }

    public void addEducation(Education education){
        educationRepository.save(education);
    }

    public void editEducation(Long id, Education education){
        if(!educationRepository.existsById(id)){
            throw new NotFoundException("Education with id "+id+" does not exist.");
        }
        educationRepository.save(education);
    }

    public void deleteEducation(Long educationId){
        if(!educationRepository.existsById(educationId)){
            throw new NotFoundException("Education with id "+educationId+" does not exist.");
        }
        educationRepository.deleteById(educationId);
    }
}
