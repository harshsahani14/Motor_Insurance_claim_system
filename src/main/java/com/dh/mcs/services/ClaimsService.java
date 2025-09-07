package com.dh.mcs.services;

import java.util.ArrayList;
import java.util.HashMap;
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
import com.dh.mcs.dto.ForwardClaimDTO;
import com.dh.mcs.dto.RaiseClaimDTO;
import com.dh.mcs.dto.ViewClaimDTO;
import com.dh.mcs.entities.ApproversEntity;
import com.dh.mcs.entities.ClaimsEntity;
import com.dh.mcs.entities.UsersEntity;
import com.dh.mcs.enums.Level;
import com.dh.mcs.enums.Status;

@Service
public class ClaimsService {
	
	@Autowired
	private Cloudinary cloudinary;
	
	@Autowired
	private SessionFactory sessionFactory;
	
	@Autowired
	private EmailService emailService;
	
	private static Map<Level, Integer> map = new HashMap<>();
	

	public ForwardClaimDTO saveClaimService(RaiseClaimDTO raiseClaimDTO) {
		
		try(Session session = sessionFactory.openSession()){
			
			Transaction transaction = session.beginTransaction();
			
			ClaimsEntity claim = new ClaimsEntity();
			
			claim.setVehicleNo(raiseClaimDTO.getVehicleNo());
			claim.setRcNo(raiseClaimDTO.getRcNo());
			claim.setDlNo(raiseClaimDTO.getDlNo());
			claim.setPolicyNo(raiseClaimDTO.getPolicyNo());
			claim.setIncidentDate(raiseClaimDTO.getIncidentDate());
			claim.setIncidentDetails(raiseClaimDTO.getIncidentDetails());
			claim.setIncidentLocation(raiseClaimDTO.getIncidentLocation());
			claim.setAmount(raiseClaimDTO.getAmount());
			claim.setStatus(Status.PENDING);
			claim.setRequiredLevel( raiseClaimDTO.getAmount()<25000 ? Level.ONE : 
									raiseClaimDTO.getAmount()<50000 ? Level.TWO : Level.THREE);
			
			 UsersEntity user = session.get(UsersEntity.class, raiseClaimDTO.getUserId()); 
			 if (user == null) {
			     throw new RuntimeException("User not found");
			 }
			 
			 claim.setUser(user);
			
			claim.setDlImage( uploadImage(raiseClaimDTO.getDlImage()) );
			claim.setRcImage( uploadImage(raiseClaimDTO.getRcImage()) );
			claim.setVehicleImage1( uploadImage(raiseClaimDTO.getVehicleImage1()) );
			claim.setVehicleImage2( uploadImage(raiseClaimDTO.getVehicleImage2()) );
			
			ForwardClaimDTO forwardClaimDTO = toForwardClaimDTO(claim,Level.ONE);
			
			 session.persist(claim);
			 
			 emailService.sendMail(user.getEmail(), "Claim request created", "Your claim request has forwarded to approvers");
			 
			transaction.commit();
			
			return forwardClaimDTO;
			
		} catch (Exception e) {
			
			throw new RuntimeException("Error while saving claim: " + e.getMessage());
		}

	}
	
	private ForwardClaimDTO toForwardClaimDTO(ClaimsEntity claim, Level level) {
		return new ForwardClaimDTO(claim, level);
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
			
			String hql = " FROM ClaimsEntity c Where c.user.userId=:userId";
			
			List<ViewClaimDTO> res = new ArrayList<>();
			
			Query<ClaimsEntity> query = session.createQuery(hql,ClaimsEntity.class);
			
			query.setParameter("userId", userId);
			
			List<ClaimsEntity> list = query.list();
			
			for(ClaimsEntity claim:list) {
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


	public void forwardClaim(ClaimsEntity claim, Level level) {
		
		try(Session session = sessionFactory.openSession()){
			
			Transaction transaction = session.beginTransaction();
			
			String hql = "FROM ApproversEntity where level=:level";
			
			Query<ApproversEntity> query = session.createQuery(hql,ApproversEntity.class); 
			
			query.setParameter("level", level);
			
			List<ApproversEntity> approvers = query.list();
			
			if(approvers.isEmpty()) {
				throw new RuntimeException("No approvers found for the current claim level");
			}
			
			int idx = map.getOrDefault(level,0);
			
			ApproversEntity approver = approvers.get(idx);
			
			approver.getPendingClaims().add(claim);
			
			session.merge(approver);
			
			map.put(level, ( idx+1 )%approvers.size());
			
			transaction.commit();
			
		} catch (Exception e) {
			throw new RuntimeException("Server error while forwarding claim: "+e.getMessage());
		}
		
	}

	public ResponseEntity<String> rejectClaim(String remark, int claimId, int approverId) {
		
		try(Session session = sessionFactory.openSession()) {
			
			Transaction transaction = session.beginTransaction();
			
			ApproversEntity approver = session.find(ApproversEntity.class, claimId);
			ClaimsEntity claim = session.find(ClaimsEntity.class, claimId);
			
			approver.getPendingClaims().remove(claim);
			claim.setStatus(Status.REJECTED);
			claim.setRemarks(remark);
			
			session.merge(approver);
			session.merge(claim);
			
			emailService.sendMail(claim.getUser().getEmail(), "Claim rejection email", "Your claim has been rejected");
			
			transaction.commit();
			
			return ResponseEntity.ok("Claim reject sucessfully");
		}
		catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Server error while rejecting claim: "+e.getMessage());
		}
	}

	public ResponseEntity<Map<String, List<ClaimsEntity>>> getApproverClaimsService(int approverId) {
		
		try(Session session = sessionFactory.openSession()) {
			
			 ApproversEntity approver = session.find(ApproversEntity.class, approverId);
			 
			 List<ClaimsEntity> list = approver.getPendingClaims();
			 
			 return ResponseEntity.status(HttpStatus.OK).body(Map.of("claims",list));
			
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of("Server error while fetching approver claims: "+ e.getMessage(),List.of()));
		}
	}

	public boolean needsOneMoreApproval(int claimId) {
		
		try(Session session = sessionFactory.openSession()) {
			
			ClaimsEntity claim = session.find(ClaimsEntity.class, claimId);
			
			return claim.getCurrLevel().next() == claim.getRequiredLevel();
			
		} catch (Exception e) {
			throw new RuntimeException("Error while checking if claim needs more approvals: "+e.getMessage());
		}
	}

	public ForwardClaimDTO promoteClaimLevel(int claimId, int approverId) {
		
		try(Session session = sessionFactory.openSession()) {
			
			Transaction transaction = session.beginTransaction();
			
			ClaimsEntity claim = session.find(ClaimsEntity.class, claimId);
			ApproversEntity approver = session.find(ApproversEntity.class,approverId);
			
			approver.getPendingClaims().remove(claim);
			claim.setCurrLevel( claim.getCurrLevel().next() );
			
			ForwardClaimDTO forwardClaimDTO = toForwardClaimDTO(claim, claim.getCurrLevel());
			
			System.out.println(claim.getCurrLevel());
			
			session.persist(claim);
			
			transaction.commit();
			
			return forwardClaimDTO;
		} catch (Exception e) {
			throw new RuntimeException("Error while promoting claim: "+e.getMessage());
		}
		
	}

	public ResponseEntity<String> approveClaimService(String remark, int claimId) {
		
		try(Session session = sessionFactory.openSession()) {
		
			Transaction transaction = session.beginTransaction();
			
			ApproversEntity approver = session.find(ApproversEntity.class, claimId);
			ClaimsEntity claim = session.find(ClaimsEntity.class, claimId);
			
			approver.getPendingClaims().remove(claim);
			claim.setStatus(Status.APPROVED);
			claim.setRemarks(remark);
			
			session.merge(approver);
			session.merge(claim);
			
			emailService.sendMail(claim.getUser().getEmail(), "Claim approved", "Your claim has been approved");
			
			transaction.commit();

			
		} catch (Exception e) {
			throw new RuntimeException("Server error while approving claim: "+e.getMessage());
		}
		
		return null;
		
	}
	
}
