package com.dh.mcs.services;

import java.util.List;
import java.util.Map;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;
import org.hibernate.query.Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.dh.mcs.dto.AssignLevelDTO;
import com.dh.mcs.entities.Approvers;
@Service
public class AssignLevelService {
	
	@Autowired
	private SessionFactory sessionFactory;

	public ResponseEntity<String> assignLevel(AssignLevelDTO assignLevelDTO) {
			
			try (Session session = sessionFactory.openSession()){
				
				Transaction transaction = session.beginTransaction();
				
				String hql = "FROM Approvers where email=:email";
				
				Query<Approvers> query = session.createQuery(hql,Approvers.class);
				
				query.setParameter("email", assignLevelDTO.getEmail());
				
				List<Approvers> list = query.list();
				
				if(list.size()==0) {
					return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Email provided is invalid");
				}
				
				Approvers approver = list.get(0);
				
				approver.setLevel(assignLevelDTO.getLevel());
				
				session.merge(approver);
				
				transaction.commit();
				
				return ResponseEntity.ok("Approver level assigned sucessfully");
				
			} catch (Exception e) {
				return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Server error while assigning level to approver: "+ e.getMessage());
			}
		
	}

	public ResponseEntity<Map<String, List<Approvers>>> getAllApprovers() {
		
		try (Session session = sessionFactory.openSession()){
			
			String hql = "FROM Approvers";
			
			Query<Approvers> query = session.createQuery(hql,Approvers.class);
						
			List<Approvers> list = query.list();
		
			
			return ResponseEntity.status(HttpStatus.OK).body(Map.of("users",list));
			
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of("Server error while fetching approvers",List.of()));
		}
	}

}
