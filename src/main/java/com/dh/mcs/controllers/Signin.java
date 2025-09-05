package com.dh.mcs.controllers;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.dh.mcs.dto.SigninDTO;
import com.dh.mcs.services.SigninService;

@RestController
@RequestMapping("/signin")
public class Signin {
	
	@Autowired
	private SigninService signinService;
	
	@PostMapping("/user")
	public ResponseEntity<Map<String, Object>> userLogin(@RequestBody SigninDTO signinDTO){
		return signinService.userLoginService(signinDTO);
	}
	
	@PostMapping("/approver")
	public ResponseEntity<Map<String, Object>> approverLogin(@RequestBody SigninDTO signinDTO){
		return signinService.approverLoginService(signinDTO);
	}
	
	@PostMapping("/admin")
	public ResponseEntity<Map<String, Object>> adminLogin(@RequestBody SigninDTO signinDTO){
		return signinService.adminLoginService(signinDTO);
	}
	
	
	
	
}
