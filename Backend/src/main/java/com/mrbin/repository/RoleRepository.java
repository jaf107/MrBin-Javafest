package com.mrbin.repository;

import java.util.Optional;

import com.mrbin.models.EStates.ERole;
import com.mrbin.models.Role;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface RoleRepository extends MongoRepository<Role, String> {
  Optional<Role> findByName(ERole name);
}
