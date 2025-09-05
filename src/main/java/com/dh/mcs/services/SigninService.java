package com.dh.mcs.services;

import java.awt.desktop.UserSessionEvent;
import java.util.List;
import java.util.Map;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.dh.mcs.dto.SigninDTO;
import com.dh.mcs.entities.Admin;
import com.dh.mcs.entities.Approvers;
import com.dh.mcs.entities.Users;
import com.dh.mcs.enums.Role;

import org.hibernate.query.Query;

@Service
public class SigninService {

	@Autowired
	private SessionFactory sessionFactory;
	
	@Autowired
	private PasswordEncoder passwordEncoder;
	
	public ResponseEntity<Map<String,Object>> userLoginService(SigninDTO signinDTO) {
		
		try (Session session = sessionFactory.openSession()){
			
			String hql = "FROM Users where email=:email";
			
			
			if(signinDTO.getEmail().equals("") || signinDTO.getPassword().equals("")) {
				return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("message","Email and password are required"));
			}
			
			Query<Users> query = session.createQuery(hql,Users.class);
			
			query.setParameter("email", signinDTO.getEmail());
			
			List<Users> list = query.list();
			
			if(list.size()==0) {
				return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("message","Email is invalid"));
			}
			
			if(!passwordEncoder.matches( signinDTO.getPassword(),list.get(0).getPassword()  )) {
				return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("message","Password is invalid"));
			}
			
			
			return ResponseEntity.ok(Map.of("message","Login Sucessful",
											"userId",list.get(0).getUserId(),
											"role",Role.USER));
			
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of("message","Server error in user login: "+e.getMessage()));
		}
	}

	public ResponseEntity<Map<String, Object>> approverLoginService(SigninDTO signinDTO) {
		
		try (Session session = sessionFactory.openSession()){
			
				String hql = "FROM Approvers where email=:email";
				

				if(signinDTO.getEmail().equals("") || signinDTO.getPassword().equals("")) {
					return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("message","Email and password are required"));
				}
				
				Query<Approvers> query = session.createQuery(hql,Approvers.class);
				
				query.setParameter("email", signinDTO.getEmail());
				
				List<Approvers> list = query.list();
				
				if(list.size()==0) {
					return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("message","Email is invalid"));
				}
				
				if(!passwordEncoder.matches( signinDTO.getPassword(),list.get(0).getPassword()  )) {
					return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("message","Password is invalid"));
				}
				
				
				return ResponseEntity.ok(Map.of("message","Login Sucessful",
												"userId",list.get(0).getApproverId(),
												"role",Role.APPROVER));
			
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of("message","Server error in approver login: "+e.getMessage()));
		}
	}
	
	public ResponseEntity<Map<String, Object>> adminLoginService(SigninDTO signinDTO) {
		
		try (Session session = sessionFactory.openSession()){
			
				String hql = "FROM Admin where email=:email";
				

				if(signinDTO.getEmail().equals("") || signinDTO.getPassword().equals("")) {
					return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("message","Email and password are required"));
				}
				
				Query<Admin> query = session.createQuery(hql,Admin.class);
				
				query.setParameter("email", signinDTO.getEmail());
				
				List<Admin> list = query.list();
				
				if(list.size()==0) {
					return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("message","Email is invalid"));
				}
				
				if(!passwordEncoder.matches( signinDTO.getPassword(),list.get(0).getPassword()  )) {
					return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("message","Password is invalid"));
				}
				
				
				return ResponseEntity.ok(Map.of("message","Login Sucessful",
												"userId",list.get(0).getAdminId(),
												"role",Role.ADMIN));
			
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of("message","Server error in admin login: "+e.getMessage()));
		}
	}

}
