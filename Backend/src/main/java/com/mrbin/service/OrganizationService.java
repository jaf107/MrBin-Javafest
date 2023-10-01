package com.mrbin.service;

import com.mrbin.models.EStates.EAccountState;
import com.mrbin.models.EStates.ERole;
import com.mrbin.models.Organization;
import com.mrbin.models.Recycler;
import com.mrbin.repository.OrganizationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class OrganizationService {
    @Autowired
    private OrganizationRepository organizationRepository;

    @Autowired
    private UserService userService;

    public Organization createOrganization(Organization organization) {
        return organizationRepository.save(organization);
    }
    public List<Organization> getAllOrganizations(){
        return organizationRepository.findAll();
    }

    public List<Organization> getAllOrganizationRequest() {
        return organizationRepository.findAllByAccountState(EAccountState.VERIFICATION_PENDING);
    }

    public boolean updateRecyclerPrivilegeStatus(String id, EAccountState state) {
        Optional<Organization> organizationQuery = organizationRepository.findById(id);

        if(organizationQuery.isPresent()) {
            Organization organization = organizationQuery.get();
            organization.setAccountState(state);

            boolean addRoleOperation = false;
            if(state == EAccountState.VERIFIED) {
                String organizationUserName = organization.getName();
                addRoleOperation = userService.addRole(organizationUserName, ERole.ROLE_ORGANIZATION);
            }

            if(addRoleOperation) {
                organizationRepository.save(organization);
                return true;
            }
            return false;
        }
        return false;
    }

    public Optional<Organization> getOrganizationById(String id){
        return organizationRepository.findById(id);
    }
    public void deleteOrganizationById(String id) {
        organizationRepository.deleteById(id);
    }

}