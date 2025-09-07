package com.dh.mcs.dto;

import org.springframework.web.multipart.MultipartFile;

public class RaiseClaimDTO {

	private Long userId;
	
	private String vehicleNo;
	
	private String rcNo;
	
	private String dlNo;
	
	private String policyNo;
	
	private String incidentDate;

	private String incidentDetails;
	
	private String incidentLocation;
	
	private int amount;
	
	private MultipartFile dlImage;
	
	private MultipartFile rcImage;
	
	private MultipartFile vehicleImage1;
	
	private MultipartFile vehicleImage2;
	
	
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

	public MultipartFile getDlImage() {
		return dlImage;
	}

	public void setDlImage(MultipartFile dlImage) {
		this.dlImage = dlImage;
	}

	public MultipartFile getRcImage() {
		return rcImage;
	}

	public void setRcImage(MultipartFile rcImage) {
		this.rcImage = rcImage;
	}

	public MultipartFile getVehicleImage1() {
		return vehicleImage1;
	}

	public void setVehicleImage1(MultipartFile vehicleImage1) {
		this.vehicleImage1 = vehicleImage1;
	}

	public MultipartFile getVehicleImage2() {
		return vehicleImage2;
	}

	public void setVehicleImage2(MultipartFile vehicleImage2) {
		this.vehicleImage2 = vehicleImage2;
	}

	public Long getUserId() {
		return userId;
	}

	public void setUserId(Long userId) {
		this.userId = userId;
	}

	@Override
	public String toString() {
		return "RaiseClaimDTO [userId=" + userId + ", vehicleNo=" + vehicleNo + ", rcNo=" + rcNo + ", dlNo=" + dlNo
				+ ", policyNo=" + policyNo + ", incidentDate=" + incidentDate + ", incidentDetails=" + incidentDetails
				+ ", incidentLocation=" + incidentLocation + ", amount=" + amount + ", dlImage=" + dlImage
				+ ", rcImage=" + rcImage + ", vehicleImage1=" + vehicleImage1 + ", vehicleImage2=" + vehicleImage2
				+ "]";
	}

	
}
