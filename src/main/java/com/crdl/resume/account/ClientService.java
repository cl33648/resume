package com.crdl.resume.account;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@AllArgsConstructor
@Slf4j
@Service
public class ClientService implements UserDetailsService {

    private final ClientRepository clientRepository;
    private final RoleRepository roleRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Client user = clientRepository.findByUsername(username);
        if(user == null){
            log.error("User not found in database");
            throw new UsernameNotFoundException("User not found in database");
        }else{
            log.info("User {} found in database", username);
        }

        Collection<SimpleGrantedAuthority> authorities = new ArrayList<>();
        user.getRoles().forEach(role -> {
            authorities.add(new SimpleGrantedAuthority(role.getName()));
        });
        return new org.springframework.security.core.userdetails.User(user.getUsername(), user.getPassword(), authorities);
    }

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

    public void addRoleToClient(String username, String roleName) {
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
