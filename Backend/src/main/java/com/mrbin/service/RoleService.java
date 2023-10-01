package com.mrbin.service;

import com.mrbin.models.EStates.ERole;
import com.mrbin.models.Role;
import com.mrbin.repository.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class RoleService {

    @Autowired
    private RoleRepository roleRepository;

    public void initializeRoles() {
        createRoleIfNotExists(ERole.ROLE_GUEST);
        createRoleIfNotExists(ERole.ROLE_USER);
        createRoleIfNotExists(ERole.ROLE_MODERATOR);
        createRoleIfNotExists(ERole.ROLE_ADMIN);
        createRoleIfNotExists(ERole.ROLE_RECYCLER);
        createRoleIfNotExists(ERole.ROLE_ORGANIZATION);
    }

    private void createRoleIfNotExists(ERole role) {
        Optional<Role> roleQuery = roleRepository.findByName(role);
        if (roleQuery.isEmpty()) {
            Role newRole = new Role();
            newRole.setName(role);
            roleRepository.save(newRole);
        }
    }
}
