package com.crdl.resume.academic;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AcademicExperienceRepository extends JpaRepository<AcademicExperience, Long> {
}
