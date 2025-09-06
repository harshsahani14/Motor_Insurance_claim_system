package com.dh.mcs.services;

import java.util.ArrayList;
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
import org.springframework.web.multipart.MultipartFile;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.dh.mcs.dto.RaiseClaimDTO;
import com.dh.mcs.dto.ViewClaimDTO;
import com.dh.mcs.entities.Approvers;
import com.dh.mcs.entities.Claims;
import com.dh.mcs.entities.Users;
import com.dh.mcs.enums.Status;

@Service
public class ClaimsService {
	
	@Autowired
	private Cloudinary cloudinary;
	
	@Autowired
	private SessionFactory sessionFactory;

	public void saveClaimService(RaiseClaimDTO raiseClaimDTO) {
		
		try(Session session = sessionFactory.openSession()){
			
			Transaction transaction = session.beginTransaction();
			
			Claims claim = new Claims();
			
			claim.setVehicleNo(raiseClaimDTO.getVehicleNo());
			claim.setRcNo(raiseClaimDTO.getRcNo());
			claim.setDlNo(raiseClaimDTO.getDlNo());
			claim.setPolicyNo(raiseClaimDTO.getPolicyNo());
			claim.setIncidentDate(raiseClaimDTO.getIncidentDate());
			claim.setIncidentDetails(raiseClaimDTO.getIncidentDetails());
			claim.setIncidentLocation(raiseClaimDTO.getIncidentLocation());
			claim.setAmount(raiseClaimDTO.getAmount());
			claim.setStatus(Status.PENDING);
			
			 Users user = session.get(Users.class, raiseClaimDTO.getUserId()); 
			 if (user == null) {
			     throw new RuntimeException("User not found");
			 }
			 
			 claim.setUser(user);
			
			claim.setDlImage( uploadImage(raiseClaimDTO.getDlImage()) );
			claim.setRcImage( uploadImage(raiseClaimDTO.getRcImage()) );
			claim.setVehicleImage1( uploadImage(raiseClaimDTO.getVehicleImage1()) );
			claim.setVehicleImage2( uploadImage(raiseClaimDTO.getVehicleImage2()) );
			
			session.persist(claim);
			
			transaction.commit();
			
			
		} catch (Exception e) {
			
			throw new RuntimeException("Error while saving claim: " + e.getMessage());
		}
		
	}
	
	public String uploadImage(MultipartFile file) {
		
		try {
			
			 Map<?,?> uploadResult = cloudinary.uploader().upload(file.getBytes(),
		                ObjectUtils.asMap("resource_type", "auto"));
		     return uploadResult.get("secure_url").toString();
			
		} catch (Exception e) {
			throw new RuntimeException("Error while uploading images: " + e.getMessage());
		}
	}

	public ResponseEntity<Map<String, List<ViewClaimDTO>>> getUserClaimsService(int userId) {
		
		try(Session session = sessionFactory.openSession()) {
			
			String hql = " FROM Claims c Where c.user.userId=:userId";
			
			List<ViewClaimDTO> res = new ArrayList<>();
			
			Query<Claims> query = session.createQuery(hql,Claims.class);
			
			query.setParameter("userId", userId);
			
			List<Claims> list = query.list();
			
			for(Claims claim:list) {
				ViewClaimDTO claimDTO = toViewClaimDTO( claim.getVehicleNo(), claim.getIncidentDate(), claim.getAmount() , claim.getStatus());
				res.add(claimDTO);
			}
			
			return ResponseEntity.ok(Map.of("claims",res));
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of("Server error while fetching user claims: "+ e.getMessage(),List.of()));
		}
	}

	private ViewClaimDTO toViewClaimDTO(String vehicleNo, String incidentDate, int amount, Status status) {
		
		return new ViewClaimDTO(vehicleNo,incidentDate,amount,status);
	}
	
	

}
