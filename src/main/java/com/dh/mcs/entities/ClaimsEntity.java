package com.dh.mcs.entities;

import com.dh.mcs.enums.Status;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Lob;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "claims")
public class ClaimsEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "claim_id")
	private long claimId;
	
	@Column(name = "vehicle_no")
	private String vehicleNo;
	
	private String rcNo;
	
	@ManyToOne
	@JoinColumn(name = "user_id" , nullable = false)
	private UsersEntity user;
	
	private String dlNo;
	
	private String policyNo;
	
	private String incidentDate;
	
	@Lob
	private String incidentDetails;
	
	@Lob
	private String incidentLocation;
	
	private int amount;
	
	private int currLevel = 0;
	
	private int requiredLevel;
	
	@Lob
	private String remarks;
	
	private String dlImage;
	
	private String rcImage;
	
	private String vehicleImage1;
	
	private String vehicleImage2;
	
	@Enumerated(EnumType.STRING)
	private Status status;
	
	
	public String getRemarks() {
		return remarks;
	}

	public void setRemarks(String remarks) {
		this.remarks = remarks;
	}

	public int getCurrLevel() {
		return currLevel;
	}

	public void setCurrLevel(int currLevel) {
		this.currLevel = currLevel;
	}

	public int getRequiredLevel() {
		return requiredLevel;
	}

	public void setRequiredLevel(int requiredLevel) {
		this.requiredLevel = requiredLevel;
	}


	public Status getStatus() {
		return status;
	}

	public void setStatus(Status status) {
		this.status = status;
	}

	public String getDlImage() {
		return dlImage;
	}

	public void setDlImage(String dlImage) {
		this.dlImage = dlImage;
	}

	public String getRcImage() {
		return rcImage;
	}

	public void setRcImage(String rcImage) {
		this.rcImage = rcImage;
	}

	public String getVehicleImage1() {
		return vehicleImage1;
	}

	public void setVehicleImage1(String vehicleImage1) {
		this.vehicleImage1 = vehicleImage1;
	}

	public String getVehicleImage2() {
		return vehicleImage2;
	}

	public void setVehicleImage2(String vehicleImage2) {
		this.vehicleImage2 = vehicleImage2;
	}

	public long getClaimId() {
		return claimId;
	}

	public void setClaimId(long claimId) {
		this.claimId = claimId;
	}

	public String getVehicleNo() {
		return vehicleNo;
	}

	public void setVehicleNo(String vehicleNo) {
		this.vehicleNo = vehicleNo;
	}

	public String getRcNo() {
		return rcNo;
	}

	public void setRcNo(String rcNo) {
		this.rcNo = rcNo;
	}

	public UsersEntity getUser() {
		return user;
	}

	public void setUser(UsersEntity user) {
		this.user = user;
	}

	public String getDlNo() {
		return dlNo;
	}

	public void setDlNo(String dlNo) {
		this.dlNo = dlNo;
	}

	public String getPolicyNo() {
		return policyNo;
	}

	public void setPolicyNo(String policyNo) {
		this.policyNo = policyNo;
	}

	public String getIncidentDate() {
		return incidentDate;
	}

	public void setIncidentDate(String incidentDate) {
		this.incidentDate = incidentDate;
	}

	public String getIncidentDetails() {
		return incidentDetails;
	}

	public void setIncidentDetails(String incidentDetails) {
		this.incidentDetails = incidentDetails;
	}

	public String getIncidentLocation() {
		return incidentLocation;
	}

	public void setIncidentLocation(String incidentLocation) {
		this.incidentLocation = incidentLocation;
	}

	public int getAmount() {
		return amount;
	}

	public void setAmount(int amount) {
		this.amount = amount;
	}

}
