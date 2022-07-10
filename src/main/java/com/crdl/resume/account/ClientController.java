package com.crdl.resume.account;

import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("api/v1/account")
@RequiredArgsConstructor
public class ClientController {
    private final ClientService clientService;

    @GetMapping("/clients")
    public ResponseEntity<List<Client>> getClients(){
        return ResponseEntity.ok().body(clientService.getAllClients());
    }

    @PostMapping("/client/save")
    public ResponseEntity<Client> saveClients(@RequestBody Client client){
        URI uri = URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path("/api/v1/account/client/save").toUriString());
        return ResponseEntity.created(uri).body(clientService.saveClient(client));
    }

    @PostMapping("/role/save")
    public ResponseEntity<Role> saveRole(@RequestBody Role role){
        URI uri = URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path("/api/v1/account/role/save").toUriString());
        return ResponseEntity.created(uri).body(clientService.saveRole(role));
    }

    @PostMapping("/role/addtoclient")
    public ResponseEntity<?> addRoleToClient(@RequestBody RoleToUserForm form){
        clientService.addRoleToClient(form.getUsername(),form.getRoleName());
        return ResponseEntity.ok().build(); //return 200 ok response
    }
}

@Data
class RoleToUserForm {
    private String username;
    private String roleName;
}
