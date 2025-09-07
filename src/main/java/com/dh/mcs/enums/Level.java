package com.dh.mcs.enums;

public enum Level {
	ZERO,
	ONE,
	TWO,
	THREE;
	
	public Level next() {
        int ord = this.ordinal(); // current index
        Level[] levels = Level.values();

        if (ord < levels.length - 1) {
            return levels[ord + 1]; // next level
        } else {
            return null; // or return this if you don’t want null
        }
    }
}
