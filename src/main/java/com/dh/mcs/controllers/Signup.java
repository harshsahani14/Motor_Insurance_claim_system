package com.dh.mcs.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.dh.mcs.dto.SignUpDTO;
import com.dh.mcs.services.SignupService;

@RestController
@RequestMapping("/signup")
public class Signup {

	@Autowired
	private SignupService signupService;
	
	@PostMapping("/user")
	public ResponseEntity<String> userSignUp(@RequestBody SignUpDTO userDTO){
		return signupService.userSignUpService(userDTO);
	}
	
	@PostMapping("/approver")
	public ResponseEntity<String> approverSignUp(@RequestBody SignUpDTO approverDTO){
		return signupService.approverSignUpService(approverDTO);
	}
	
	@PostMapping("/admin")
	public ResponseEntity<String> adminSignUp(@RequestBody SignUpDTO adminDTO){
		return signupService.adminSignUpService(adminDTO);
	}
	
}
