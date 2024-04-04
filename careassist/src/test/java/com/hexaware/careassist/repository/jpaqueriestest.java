package com.hexaware.careassist.repository;

import java.util.logging.Logger;
import java.util.logging.Level;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.hexaware.careassist.entity.Patient;

@SpringBootTest
public class jpaqueriestest {
    
	public final static Logger LOGGER=Logger.getLogger(Logger.GLOBAL_LOGGER_NAME);
    @Autowired
    IPatientRepository patientRepo;

   
    @Test
    void saveMethodTest() {
        Patient p1 = new Patient();
        p1.setPatientId((long) 100);
        p1.setFirstName("Tejaswini");
        p1.setDateOfBirth("2001-08-25");
        p1.setGender("Female");
        p1.setPhoneNumber("7032990608");
        p1.setAddress("Saleem nagar");
        p1.setLastName("Patil");
        p1.setEmail("tejaswini@example.com"); // Provide a valid email address

        Patient savedPatient = patientRepo.save(p1);
        LOGGER.log(Level.INFO, "Saved patient in db using JPA save(): " + savedPatient);
    }




}
