package com.crdl.resume.certificate;

import com.crdl.resume.exception.NotFoundException;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@AllArgsConstructor
@Service
public class CertificateService {
    private final CertificateRepository certificateRepository;

    public List<Certificate> getAllCertificates() {
        return certificateRepository.findAll();
    }

    public void addCertificate(Certificate certificate) {
        certificateRepository.save(certificate);
    }

    public void editCertificate(Long id, Certificate certificate) {
        if(!certificateRepository.existsById(id)){
            throw new NotFoundException("Certificate with id "+id+" does not exist.");
        }
        certificateRepository.save(certificate);
    }

    public void deleteCertificate(Long certificateId) {
        if(!certificateRepository.existsById(certificateId)){
            throw new NotFoundException("Certificate with id "+certificateId+" does not exist.");
        }
        certificateRepository.deleteById(certificateId);
    }
}
