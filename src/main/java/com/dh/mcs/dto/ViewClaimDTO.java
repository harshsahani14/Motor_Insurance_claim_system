package com.dh.mcs.dto;

import com.dh.mcs.enums.Status;

public class ViewClaimDTO {

	private String vehicleNo;
	
	private String incidentDate;
	
	private int amount;
	
	private Status status;

	public ViewClaimDTO(String vehicleNo, String incidentDate, int amount, Status status) {
		super();
		this.vehicleNo = vehicleNo;
		this.incidentDate = incidentDate;
		this.amount = amount;
		this.status = status;
	}

	@Override
	public String toString() {
		return "ViewClaimDTO [vehicleNo=" + vehicleNo + ", incidentDate=" + incidentDate + ", amount=" + amount
				+ ", status=" + status + "]";
	}

	public String getVehicleNo() {
		return vehicleNo;
	}

	public void setVehicleNo(String vehicleNo) {
		this.vehicleNo = vehicleNo;
	}

	public String getIncidentDate() {
		return incidentDate;
	}

	public void setIncidentDate(String incidentDate) {
		this.incidentDate = incidentDate;
	}

	public int getAmount() {
		return amount;
	}

	public void setAmount(int amount) {
		this.amount = amount;
	}

	public Status getStatus() {
		return status;
	}

	public void setStatus(Status status) {
		this.status = status;
	}
}
