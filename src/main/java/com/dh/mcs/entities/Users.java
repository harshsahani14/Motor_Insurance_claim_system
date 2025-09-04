package com.dh.mcs.entities;

import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;
import jakarta.persistence.OneToMany;

@Entity
public class Users {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "user_id")
	private long userId;
	
	private String name;
	
	@Column( unique = true )
	private String email;
	
	private String contact;
	
	private String password;
	
	@Lob
	private String address;
	
	@OneToMany( mappedBy = "user" , cascade = CascadeType.ALL, orphanRemoval = true)
	private List<Claims> claims;

	public long getUserId() {
		return userId;
	}

	public Users(long userId, String name, String email, String contact, String password, String address) {
		this.userId = userId;
		this.name = name;
		this.email = email;
		this.contact = contact;
		this.password = password;
		this.address = address;
		this.claims = new ArrayList<>();
	}

	public List<Claims> getClaims() {
		return claims;
	}

	public void setClaims(List<Claims> claims) {
		this.claims = claims;
	}

	@Override
	public String toString() {
		return "Users [userId=" + userId + ", name=" + name + ", email=" + email + ", contact=" + contact
				+ ", password=" + password + ", address=" + address + "]";
	}

	public void setUserId(long userId) {
		this.userId = userId;
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

	
}
