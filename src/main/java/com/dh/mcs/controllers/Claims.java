package com.dh.mcs.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.dh.mcs.dto.RaiseClaimDTO;
import com.dh.mcs.services.ClaimsService;

@RestController
@RequestMapping("/claims")
public class Claims {
	
	@Autowired
	private ClaimsService claimsService;
	
	@PostMapping("/raiseClaim")
	public ResponseEntity<String> raiseClaim(@ModelAttribute RaiseClaimDTO raiseClaimDTO){
		
		System.out.println(raiseClaimDTO.toString());
		
		return null;
	}
	
}
