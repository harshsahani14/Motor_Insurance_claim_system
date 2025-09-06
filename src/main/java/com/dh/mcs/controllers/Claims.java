package com.dh.mcs.controllers;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.dh.mcs.dto.RaiseClaimDTO;
import com.dh.mcs.dto.ViewClaimDTO;
import com.dh.mcs.services.ClaimsService;

@RestController
@RequestMapping("/claims")
public class Claims {
	
	@Autowired
	private ClaimsService claimsService;
	
	@PostMapping("/raiseClaim")
	public ResponseEntity<String> raiseClaim(@ModelAttribute RaiseClaimDTO raiseClaimDTO){
		
		try {
			claimsService.saveClaimService(raiseClaimDTO);
			
			return ResponseEntity.ok("Claim raised sucessfully");
		}
		catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Server Error while raising claim: " +e.getMessage());
		}
	}
	
	@GetMapping("/getUserClaims")
	public ResponseEntity<Map<String, List<ViewClaimDTO>>> getUserClaims(@RequestParam int userId){
		return claimsService.getUserClaimsService(userId);
	}
	
}
