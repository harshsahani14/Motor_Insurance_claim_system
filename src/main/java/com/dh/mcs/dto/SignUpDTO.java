package com.dh.mcs.dto;

public class SignUpDTO {

	private String name;
	
	private String email;
	
	private String password;
	
	private String address;
	
	private String contact;

	public String getContact() {
		return contact;
	}

	public void setContact(String contact) {
		this.contact = contact;
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

	@Override
	public String toString() {
		return "UserDTO [name=" + name + ", email=" + email + ", password=" + password + ", address=" + address + "]";
	}

	
	
}
