package com.mrbin.controllers;

import com.mrbin.models.Organization;
import com.mrbin.service.OrganizationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping(value = "/api/v1/")
public class OrganizationController {

    @Autowired
    OrganizationService organizationService;

    @GetMapping(value = "organizations")
    public ResponseEntity<List<Organization>> getAllOrganizations(){
        return new ResponseEntity<List<Organization>>(organizationService.getAllOrganizations(), HttpStatus.OK) ;
    }

    @PostMapping(value = "organization/new")
    public ResponseEntity<Organization> addOrganization(@RequestBody Organization organization){
        Organization createdOrganization = organizationService.createOrganization((organization));
        return new ResponseEntity<>(createdOrganization, HttpStatus.CREATED);
    }

    // Retrieve a product by ID
    @GetMapping("/organization/{id}")
    public ResponseEntity<Organization> getOrganizationById(@PathVariable String id) {
        Optional<Organization> product = organizationService.getOrganizationById(id);
        return product.map(value -> new ResponseEntity<>(value, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @DeleteMapping("/organization/{id}")
    public ResponseEntity<String> deleteOrganizationById(@PathVariable String id) {
        Optional<Organization> existingOrganization = organizationService.getOrganizationById(id);

        if (existingOrganization.isPresent()) {
            organizationService.deleteOrganizationById(id);
            return new ResponseEntity<>("Organization with ID " + id + " has been deleted.", HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>("Organization with ID " + id + " not found.", HttpStatus.NOT_FOUND);
        }
    }
}
