package com.mrbin.controllers;

import java.util.*;
import java.util.stream.Collectors;

import com.mrbin.models.Role;
import com.mrbin.models.User;
import jakarta.validation.Valid;

import org.json.simple.*;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;

import com.mrbin.models.EStates.ERole;
import com.mrbin.payload.request.LoginRequest;
import com.mrbin.payload.request.SignupRequest;
import com.mrbin.payload.response.JwtResponse;
import com.mrbin.payload.response.MessageResponse;
import com.mrbin.repository.RoleRepository;
import com.mrbin.repository.UserRepository;
import com.mrbin.security.jwt.JwtUtils;
import com.mrbin.security.services.UserDetailsImpl;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/v1/")
public class AuthController {
	@Autowired
	AuthenticationManager authenticationManager;

	@Autowired
	UserRepository userRepository;

	@Autowired
	RoleRepository roleRepository;

	@Autowired
	PasswordEncoder encoder;

	@Autowired
	JwtUtils jwtUtils;

	@PostMapping("login")
	public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {

		Authentication authentication = authenticationManager.authenticate(
				new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));

		SecurityContextHolder.getContext().setAuthentication(authentication);
		String jwt = jwtUtils.generateJwtToken(authentication);
		
		UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();		
		List<String> roles = userDetails.getAuthorities().stream()
				.map(item -> item.getAuthority())
				.collect(Collectors.toList());

		return ResponseEntity.ok(new JwtResponse(jwt, 
												 userDetails.getId(), 
												 userDetails.getUsername(), 
												 userDetails.getEmail(),
												 userDetails.getPhone(),
												 roles));
	}

	@PostMapping("register")
	public ResponseEntity<?> registerUser(@Valid @RequestBody SignupRequest signUpRequest) {
		if (userRepository.existsByUsername(signUpRequest.getUsername())) {
			return ResponseEntity
					.badRequest()
					.body(new MessageResponse("Error: Username is already taken!"));
		}

		if (userRepository.existsByEmail(signUpRequest.getEmail())) {
			return ResponseEntity
					.badRequest()
					.body(new MessageResponse("Error: Email is already in use!"));
		}

		// Create new user's account
		User user = new User(
				signUpRequest.getName(),
				signUpRequest.getUsername(),
				signUpRequest.getEmail(),
				signUpRequest.getAddress(),
			 	encoder.encode(signUpRequest.getPassword()),
				signUpRequest.getPhone());

		Set<String> strRoles = signUpRequest.getRoles();
		Set<Role> roles = new HashSet<>();

		if (strRoles == null) {
			Role userRole = roleRepository.findByName(ERole.ROLE_USER)
					.orElseThrow(() -> new RuntimeException("Error: Role is not found."));
			roles.add(userRole);
		} else {
			strRoles.forEach(role -> {
				switch (role) {
				case "admin":
					Role adminRole = roleRepository.findByName(ERole.ROLE_ADMIN)
							.orElseThrow(() -> new RuntimeException("Error: Role is not found."));
					roles.add(adminRole);

					break;
				case "mod":
					Role modRole = roleRepository.findByName(ERole.ROLE_MODERATOR)
							.orElseThrow(() -> new RuntimeException("Error: Role is not found."));
					roles.add(modRole);

					break;
				case "user":
					Role userRole = roleRepository.findByName(ERole.ROLE_USER)
							.orElseThrow(() -> new RuntimeException("Error: Role is not found."));
					roles.add(userRole);

					break;
				default:
					Role guestRole = roleRepository.findByName(ERole.ROLE_GUEST)
							.orElseThrow(() -> new RuntimeException("Error: Role is not found."));
					roles.add(guestRole);
				}
			});
		}

		user.setRoles(roles);
		userRepository.save(user);

		return ResponseEntity.ok(new MessageResponse("User registered successfully!"));
	}

	@GetMapping("me")
	public ResponseEntity<?> getUserDetails(@RequestHeader("Authorization") String authToken) throws ParseException {
		Base64.Decoder decoder = Base64.getUrlDecoder();
		String jwtString = null;
		if (StringUtils.hasText(authToken) && authToken.startsWith("Bearer ")) {
			jwtString = authToken.substring(7, authToken.length());
		}

		if (jwtString != null && jwtUtils.validateJwtToken(jwtString)) {
			String[] chunks = jwtString.split("\\.");
			String jwtHeaderStr =  new String(decoder.decode(chunks[0]));
			String jwtPayloadStr = new String(decoder.decode(chunks[1]));

			JSONObject jo = (JSONObject) new JSONParser().parse(jwtPayloadStr);
			String username = (String) jo.get("sub");

//			System.out.println("Username: " + username);

			if (userRepository.existsByUsername(username)) {
				Optional<User> currentUser = userRepository.findByUsername(username);
				return ResponseEntity.ok(currentUser);
			}

			return ResponseEntity.status(404).body("User not found");
		}

		return ResponseEntity.ok("Unauthorized please log in");
	}
}
