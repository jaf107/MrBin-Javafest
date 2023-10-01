package com.mrbin;

import com.mrbin.service.RoleService;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class MrBin {

	@Autowired
	private RoleService roleService;

	public static void main(String[] args) {
		SpringApplication.run(MrBin.class, args);
	}

	@PostConstruct
	private void initializeRole() {
		roleService.initializeRoles();
	}
}
