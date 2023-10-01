package com.mrbin.controllers;

import com.mrbin.models.Order;
import com.mrbin.models.Organization;
import com.mrbin.models.Recycler;
import com.mrbin.models.User;
import com.mrbin.payload.request.UpdateAccountPrivilegeRequest;
import com.mrbin.payload.response.MessageResponse;
import com.mrbin.service.OrderService;
import com.mrbin.service.OrganizationService;
import com.mrbin.service.RecyclerService;
import com.mrbin.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Stream;

@RestController
@PreAuthorize("hasAnyRole('ADMIN')")
@RequestMapping(value = "/api/v1/admin/")
public class AdminController {
    @Autowired
    UserService userService;

    @Autowired
    RecyclerService recyclerService;

    @Autowired
    OrganizationService organizationService;

    @Autowired
    OrderService orderService;

    @GetMapping(value = "users")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<User>> getAllUsers(){
        return new ResponseEntity<List<User>>(userService.getAllUsers(), HttpStatus.OK) ;
    }

    @GetMapping(value = "recyclers")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<Recycler>> getAllRecyclers(){
        return new ResponseEntity<List<Recycler>>(recyclerService.getAllRecyclers(), HttpStatus.OK) ;
    }
    @GetMapping(value = "organizations")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<Organization>> getAllOrganizations(){
        return new ResponseEntity<List<Organization>>(organizationService.getAllOrganizations(), HttpStatus.OK) ;
    }

    @GetMapping("orders")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<Order>> getAllOrder() {
        return new ResponseEntity<>(orderService.getAllOrder(), HttpStatus.OK);
    }

    @GetMapping("/get-all/privilege-request")
    public ResponseEntity<?> getAllAccountPrivilegeRequest() {
        List<Recycler> recyclerList = recyclerService.getAllRecyclerRequest();
        List<Organization> organizationList = organizationService.getAllOrganizationRequest();

        List<?> responseList = Stream.concat(recyclerList.stream(), organizationList.stream()).toList();

        if(!responseList.isEmpty()) {
            return new ResponseEntity<>(responseList, HttpStatus.OK);
        }
        return new ResponseEntity<>(new MessageResponse("No request found"), HttpStatus.NOT_FOUND);
    }

    @PutMapping("/update/privilege-request")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> updateAccountPrivilegeState(@RequestBody UpdateAccountPrivilegeRequest updateAccountPrivilegeRequest) {
        if(updateAccountPrivilegeRequest.getPrivilegeType().equalsIgnoreCase("recycler")){
            boolean operationStatus = recyclerService.updateRecyclerPrivilegeStatus(updateAccountPrivilegeRequest.getRequestId(), updateAccountPrivilegeRequest.getAccountState());

            if(operationStatus) return new ResponseEntity<>(new MessageResponse("Successfully updated recycler status"), HttpStatus.OK);
            else                return new ResponseEntity<>(new MessageResponse("Recycler or user not found"), HttpStatus.NOT_FOUND);
        }

        else if(updateAccountPrivilegeRequest.getPrivilegeType().equalsIgnoreCase("organization")) {
            boolean operationStatus = organizationService.updateRecyclerPrivilegeStatus(updateAccountPrivilegeRequest.getRequestId(), updateAccountPrivilegeRequest.getAccountState());

            if(operationStatus) return new ResponseEntity<>(new MessageResponse("Successfully updated organization status"), HttpStatus.OK);
            else                return new ResponseEntity<>(new MessageResponse("Organization or user not found"), HttpStatus.NOT_FOUND);
        }

        return new ResponseEntity<>(new MessageResponse("Bad request"), HttpStatus.BAD_REQUEST);
    }
}



















