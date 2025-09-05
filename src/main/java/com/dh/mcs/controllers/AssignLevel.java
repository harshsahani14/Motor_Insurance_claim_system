package com.dh.mcs.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.dh.mcs.dto.AssignLevelDTO;
import com.dh.mcs.services.AssignLevelService;

@RestController
@RequestMapping("/admin")
public class AssignLevel {
	
	@Autowired
	private AssignLevelService assignLevelService;
	
	@PutMapping("/assign")
	public ResponseEntity<String> assignLevel(@RequestBody AssignLevelDTO assignLevelDTO){
		return assignLevelService.assignLevel(assignLevelDTO);
	}
}
