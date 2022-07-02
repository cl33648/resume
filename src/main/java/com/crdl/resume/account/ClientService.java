package com.crdl.resume.account;

import com.crdl.resume.education.Education;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@AllArgsConstructor
@Slf4j
@Service
public class ClientService {

    private final ClientRepository clientRepository;
    private final RoleRepository roleRepository;

    public List<Client> getAllClients(){
        return clientRepository.findAll();
    }

    public Client saveClient(Client client) {
        log.info("Saving client {} to the database", client.getUsername());
        return clientRepository.save(client);
    }

    public Role saveRole(Role role) {
        log.info("Saving role {} to the database", role.getName());
        return roleRepository.save(role);
    }

    public void addRoleToUser(String username, String roleName) {
        log.info("Adding role {} to the client {}", roleName, username);
        Client client = clientRepository.findByUsername(username);
        Role role = roleRepository.findByName(roleName);
        client.getRoles().add(role);
    }

    public Client getClient(String username) {
        log.info("Fetching client {}", username);
        return clientRepository.findByUsername(username);
    }
}
