package com.crdl.resume.account;

import java.util.List;

public interface ClientService {
    List<Client> getAllClients();
    Client saveClient(Client client);
    Role saveRole(Role role);
    void addRoleToClient(String username, String roleName);
    Client getClient(String username);
}
