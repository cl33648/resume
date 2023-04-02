package com.crdl.resume.admin;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("api/v1/admin")
@AllArgsConstructor
public class AdminController {
    private final AdminService adminService;

    @GetMapping
    public List<Admin> getAdmin(){
        return adminService.getAllAdmins();
    }

    @PostMapping
    public void addAdmin(@Valid @RequestBody Admin admin){
        adminService.addAdmin(admin);
    }

    @PutMapping(path = "{adminId}")
    public void editAdmin(@PathVariable("adminId") Long id, @Valid @RequestBody Admin admin){
        adminService.editAdmin(id, admin);
    }

    @DeleteMapping(path = "{adminId}")
    public void deleteAdmin(@PathVariable("adminId") Long adminId){
        adminService.deleteAdmin(adminId);
    }
}
