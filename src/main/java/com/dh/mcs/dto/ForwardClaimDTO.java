package com.dh.mcs.dto;

import com.dh.mcs.enums.Level;

import com.dh.mcs.entities.ClaimsEntity;

public class ForwardClaimDTO {

	private ClaimsEntity claim;
	
	private Level level;
	

	public ForwardClaimDTO(ClaimsEntity claim, Level level) {
		super();
		this.claim = claim;
		this.level = level;
	}

	public ClaimsEntity getClaim() {
		return claim;
	}

	public void setClaim(ClaimsEntity claim) {
		this.claim = claim;
	}

	public Level getLevel() {
		return level;
	}

	public void setLevel(Level level) {
		this.level = level;
	}

	@Override
	public String toString() {
		return "ForwardClaimDTO [claim=" + claim + ", level=" + level + "]";
	}
	
	
}
