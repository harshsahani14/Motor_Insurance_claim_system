package coniguration;

import org.hibernate.SessionFactory;
import org.hibernate.cfg.Configuration;

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
	
	public SessionFactory getSessionFactory() {
		return sessionFactory;
	}
}
