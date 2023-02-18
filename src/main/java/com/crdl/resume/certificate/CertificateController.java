package com.crdl.resume.certificate;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("api/v1/certificate")
@AllArgsConstructor
public class CertificateController {
    private final CertificateService certificateService;

    @GetMapping
    public List<Certificate> getCertificates(){
        return certificateService.getAllCertificates();
    }

    @PostMapping
    public void addCertificate(@Valid @RequestBody Certificate certificate){
        certificateService.addCertificate(certificate);
    }

    @PutMapping(path = "{certificateId}")
    public void editCertificate(@PathVariable("certificateId") Long id, @Valid @RequestBody Certificate certificate){
        certificateService.editCertificate(id, certificate);
    }

    @DeleteMapping(path = "{certificateId}")
    public void deleteCertificate(@PathVariable("certificateId") Long certificate){
        certificateService.deleteCertificate(certificate);
    }
}
