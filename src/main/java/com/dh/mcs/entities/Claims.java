package com.dh.mcs.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Lob;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;

@Entity
public class Claims {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "claim_id")
	private long claimId;
	
	@Column(name = "vehicle_no")
	private String vehicleNo;
	
	private String rcNo;
	
	@ManyToOne
	@JoinColumn(name = "user_id" , nullable = false)
	private Users user;
	
	private String dlNo;
	
	private String policyNo;
	
	private String incidentDate;
	
	@Lob
	private String incidentDetails;
	
	@Lob
	private String incidentLocation;
	
	private int amount;
	
	private String documents;
	
	public Claims(long claimId, String vehicleNo, String rcNo, Users user, String dlNo, String policyNo,
			String incidentDate, String incidentDetails, String incidentLocation, int amount, String documents) {
		this.claimId = claimId;
		this.vehicleNo = vehicleNo;
		this.rcNo = rcNo;
		this.user = user;
		this.dlNo = dlNo;
		this.policyNo = policyNo;
		this.incidentDate = incidentDate;
		this.incidentDetails = incidentDetails;
		this.incidentLocation = incidentLocation;
		this.amount = amount;
		this.documents = documents;
	}

	@Override
	public String toString() {
		return "Claims [claimId=" + claimId + ", vehicleNo=" + vehicleNo + ", rcNo=" + rcNo + ", user=" + user
				+ ", dlNo=" + dlNo + ", policyNo=" + policyNo + ", incidentDate=" + incidentDate + ", incidentDetails="
				+ incidentDetails + ", incidentLocation=" + incidentLocation + ", amount=" + amount + ", documents="
				+ documents + "]";
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

	public Users getUser() {
		return user;
	}

	public void setUser(Users user) {
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

	public String getDocuments() {
		return documents;
	}

	public void setDocuments(String documents) {
		this.documents = documents;
	}

	
	
	
}
