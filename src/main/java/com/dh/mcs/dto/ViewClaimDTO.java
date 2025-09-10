package com.dh.mcs.dto;

import com.dh.mcs.enums.Status;

public class ViewClaimDTO {

	private String vehicleNo;
	
	private String incidentDate;
	
	private int amount;
	
	private Status status;
	
	private String remarks;


	public ViewClaimDTO(String vehicleNo, String incidentDate, int amount, Status status, String remarks) {
		super();
		this.vehicleNo = vehicleNo;
		this.incidentDate = incidentDate;
		this.amount = amount;
		this.status = status;
		this.remarks = remarks;
	}

	public String getRemarks() {
		return remarks;
	}

	public void setRemarks(String remarks) {
		this.remarks = remarks;
	}

	@Override
	public String toString() {
		return "ViewClaimDTO [vehicleNo=" + vehicleNo + ", incidentDate=" + incidentDate + ", amount=" + amount
				+ ", status=" + status + ", remarks=" + remarks + "]";
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
