package com.dh.mcs.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

import java.util.ArrayList;
import java.util.List;

import com.dh.mcs.enums.Level;

@Entity
@Table(name = "approvers")
public class ApproversEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="approver_id")
	private long approverId;
	
	private String name;
	
	@Column( unique = true )
	private String email;
	
	private String contact;
	
	private String password;
	
	@Lob
	private String address;
	
	@Enumerated(EnumType.STRING)
	private Level level;
	
	@OneToMany
	List<ClaimsEntity> pendingClaims = new ArrayList<>(); 


	@Override
	public String toString() {
		return "Approvers [approverId=" + approverId + ", name=" + name + ", email=" + email + ", contact=" + contact
				+ ", password=" + password + ", address=" + address + ", level=" + level + "]";
	}

	public long getApproverId() {
		return approverId;
	}

	public void setApproverId(long approverId) {
		this.approverId = approverId;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getContact() {
		return contact;
	}

	public void setContact(String contact) {
		this.contact = contact;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public Level getLevel() {
		return level;
	}

	public void setLevel(Level level) {
		this.level = level;
	}
	
	public List<ClaimsEntity> getPendingClaims() {
		return pendingClaims;
	}

	public void setPendingClaims(List<ClaimsEntity> pendingClaims) {
		this.pendingClaims = pendingClaims;
	}

	
	
}
