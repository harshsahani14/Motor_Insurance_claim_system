package com.dh.mcs.configuration;

import org.hibernate.SessionFactory;
import org.hibernate.cfg.Configuration;
import org.springframework.context.annotation.Bean;

public class HibernateConfig {

	private static SessionFactory sessionFactory;
	
	static {
		
		try {
			if(sessionFactory != null) {
				sessionFactory = new Configuration().configure("hibernate.cfg.xml").buildSessionFactory();
			}
		} catch (Exception e) {
			System.out.println("Error while creating session factory object: "+ e.getMessage());
		}
	}
	
	@Bean
	public static SessionFactory getSessionFactory() {
		return sessionFactory;
	}
}
