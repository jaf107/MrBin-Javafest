package com.mrbin.repository;

import com.mrbin.models.EStates.EAccountState;
import com.mrbin.models.Organization;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrganizationRepository extends MongoRepository<Organization, String> {

    List<Organization> findAllByAccountState(EAccountState state);
}