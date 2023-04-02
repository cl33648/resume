package com.crdl.resume.admin;

import com.crdl.resume.exception.NotFoundException;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@AllArgsConstructor
@Service
public class AdminService {
    private final AdminRepository adminRepository;

    public List<Admin> getAllAdmins(){
        return adminRepository.findAll();
    }

    public void addAdmin(Admin admin){
        adminRepository.save(admin);
    }

    public void editAdmin(Long id, Admin admin){
        if(!adminRepository.existsById(id)){
            throw new NotFoundException("admin with id "+id+" does not exist.");
        }
        adminRepository.save(admin);
    }

    public void deleteAdmin(Long adminId){
        if(!adminRepository.existsById(adminId)){
            throw new NotFoundException("admin with id "+adminId+" does not exist.");
        }
        adminRepository.deleteById(adminId);
    }
}
