package com.dh.mcs.services;

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
import com.dh.mcs.entities.AdminEntity;
import com.dh.mcs.entities.ApproversEntity;
import com.dh.mcs.entities.UsersEntity;
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
			
			String hql = "FROM UsersEntity where email=:email";
			
			
			if(signinDTO.getEmail().equals("") || signinDTO.getPassword().equals("")) {
				return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("message","Email and password are required"));
			}
			
			Query<UsersEntity> query = session.createQuery(hql,UsersEntity.class);
			
			query.setParameter("email", signinDTO.getEmail());
			
			List<UsersEntity> list = query.list();
			
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
			
				String hql = "FROM ApproversEntity where email=:email";
				

				if(signinDTO.getEmail().equals("") || signinDTO.getPassword().equals("")) {
					return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("message","Email and password are required"));
				}
				
				Query<ApproversEntity> query = session.createQuery(hql,ApproversEntity.class);
				
				query.setParameter("email", signinDTO.getEmail());
				
				List<ApproversEntity> list = query.list();
				
				if(list.size()==0) {
					return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("message","Email is invalid"));
				}
				
				if(!passwordEncoder.matches( signinDTO.getPassword(),list.get(0).getPassword()  )) {
					return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("message","Password is invalid"));
				}
				
				
				return ResponseEntity.ok(Map.of("message","Login Sucessful",
												"approverId",list.get(0).getApproverId(),
												"role",Role.APPROVER));
			
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of("message","Server error in approver login: "+e.getMessage()));
		}
	}
	
	public ResponseEntity<Map<String, Object>> adminLoginService(SigninDTO signinDTO) {
		
		try (Session session = sessionFactory.openSession()){
			
				String hql = "FROM AdminEntity where email=:email";
				

				if(signinDTO.getEmail().equals("") || signinDTO.getPassword().equals("")) {
					return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("message","Email and password are required"));
				}
				
				Query<AdminEntity> query = session.createQuery(hql,AdminEntity.class);
				
				query.setParameter("email", signinDTO.getEmail());
				
				List<AdminEntity> list = query.list();
				
				if(list.size()==0) {
					return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("message","Email is invalid"));
				}
				
				if(!passwordEncoder.matches( signinDTO.getPassword(),list.get(0).getPassword()  )) {
					return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("message","Password is invalid"));
				}
				
				
				return ResponseEntity.ok(Map.of("message","Login Sucessful",
												"adminId",list.get(0).getAdminId(),
												"role",Role.ADMIN));
			
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of("message","Server error in admin login: "+e.getMessage()));
		}
	}

}
