package com.dh.mcs.services;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.dh.mcs.dto.SignUpDTO;
import com.dh.mcs.entities.Admin;
import com.dh.mcs.entities.Approvers;
import com.dh.mcs.entities.Users;



@Service
public class SignupService {

	@Autowired
	private SessionFactory sessionFactory;
	
	@Autowired
	private PasswordEncoder passwordEncoder;
	
	//Ask suggestion here	
	public ResponseEntity<String> userSignUpService(SignUpDTO userDTO){
		
		try(Session session = sessionFactory.openSession()) {
				
			Transaction transaction = session.beginTransaction();
			
			Users user = new Users();
			
			user.setName(userDTO.getName());
			user.setAddress(userDTO.getAddress());
			user.setContact(userDTO.getContact());
			user.setEmail(userDTO.getEmail());
			user.setPassword(passwordEncoder.encode(userDTO.getPassword()));
			
			session.persist(user);
			
			transaction.commit();
			
			return ResponseEntity.ok("User registered sucessfully");
			
		} catch (Exception e) {
			
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error while registering user: "+e.getMessage());
		}
	}
	
	public ResponseEntity<String> approverSignUpService(SignUpDTO approverDTO){
		
		try(Session session = sessionFactory.openSession()) {
				
			Transaction transaction = session.beginTransaction();
			
			Approvers approver = new Approvers();
			
			approver.setName(approverDTO.getName());
			approver.setAddress(approverDTO.getAddress());
			approver.setContact(approverDTO.getContact());
			approver.setEmail(approverDTO.getEmail());
			approver.setPassword(passwordEncoder.encode(approverDTO.getPassword()));
			
			session.persist(approver);
			
			transaction.commit();
			
			return ResponseEntity.ok("Approver registered sucessfully");
			
		} catch (Exception e) {
			
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error while registering approver: "+e.getMessage());
		}
	}
	
	public ResponseEntity<String> adminSignUpService(SignUpDTO adminDTO){
		
		try(Session session = sessionFactory.openSession()) {
				
			Transaction transaction = session.beginTransaction();
			
			Admin admin = new Admin();
			
			admin.setName(adminDTO.getName());
			admin.setContact(adminDTO.getContact());
			admin.setEmail(adminDTO.getEmail());
			admin.setPassword(passwordEncoder.encode(adminDTO.getPassword()));
			
			session.persist(admin);
			
			transaction.commit();
			
			return ResponseEntity.ok("Admin registered sucessfully");
			
		} catch (Exception e) {
			
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error while registering admin: "+e.getMessage());
		}
	}
	
	
}
