package com.dh.mcs.dto;

import com.dh.mcs.enums.Level;

public class AssignLevelDTO {

	private String email;
	
	private Level level;

	@Override
	public String toString() {
		return "AssignLevelDTO [email=" + email + ", level=" + level + "]";
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public Level getLevel() {
		return level;
	}

	public void setLevel(Level level) {
		this.level = level;
	}
}
