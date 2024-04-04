//package com.hexaware.careassist.Controller;
//
//import com.hexaware.careassist.entity.InsurancePlan;
//import com.hexaware.careassist.entity.Invoice;
//import com.hexaware.careassist.entity.Patient;
//import com.hexaware.careassist.entity.UserAccount;
//import com.hexaware.careassist.controller.PatientController;
//import com.hexaware.careassist.entity.Claim;
//import com.hexaware.careassist.repository.IPatientRepository;
//import com.hexaware.careassist.repository.IUserRepository;
//import com.hexaware.careassist.repository.IInsurancePlanRepository;
//import com.hexaware.careassist.repository.IInvoiceRepository;
//import com.hexaware.careassist.repository.IClaimRepository;
//
//import org.junit.jupiter.api.Test;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.context.SpringBootTest;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
//
//import java.math.BigDecimal;
//import java.time.LocalDateTime;
//import java.util.List;
//import java.util.Optional;
//
//import static org.junit.jupiter.api.Assertions.*;
//
//@SpringBootTest
//public class PatientControllerTest {
//
//    @Autowired
//    private PatientController patientController;
//
//    @Autowired
//    private IPatientRepository patientRepository;
//
//    @Autowired
//    private IUserRepository userRepository;
//
//    @Autowired
//    private IInsurancePlanRepository insurancePlanRepository;
//
//    @Autowired
//    private IInvoiceRepository invoiceRepository;
//
//    @Autowired
//    private IClaimRepository claimRepository;
//
//    @Test
//    void registerPatientTest() {
//        // Create a sample patient object
//        Patient patient = new Patient();
//        patient.setFirstName("John");
//        patient.setLastName("Doe");
//        patient.setAddress("Delhi ");
//        patient.setGender("M");
//        patient.setPhoneNumber("24923234");
//        patient.setEmail("john.doe@example.com");
//
//        // Call the registerPatient method
//        ResponseEntity<Patient> responseEntity = patientController.registerPatient(patient);
//
//        // Assert that the response status is CREATED
//        assertEquals(HttpStatus.CREATED, responseEntity.getStatusCode());
//
//        // Assert that the returned patient object is not null
//        assertNotNull(responseEntity.getBody());
//
//        // Assert that the patient is saved in the repository
//        Optional<Patient> savedPatientOptional = patientRepository.findById(responseEntity.getBody().getPatientId());
//        assertTrue(savedPatientOptional.isPresent());
//        assertEquals(patient.getFirstName(), savedPatientOptional.get().getFirstName());
//        assertEquals(patient.getLastName(), savedPatientOptional.get().getLastName());
//        assertEquals(patient.getEmail(), savedPatientOptional.get().getEmail());
//    }
//
//    @Test
//    void loginPatientTest() {
//        // Create a sample user object
//        UserAccount user = new UserAccount();
//        user.setUsername("john.doe");
//        user.setPassword("password");
//
//        // Save the user to the repository
//        UserAccount savedUser = userRepository.save(user);
//
//        // Create a sample patient associated with the user
//        Patient patient = new Patient();
//        patient.setUserId(savedUser.getUserId());
//
//        // Save the patient to the repository
//        Patient savedPatient = patientRepository.save(patient);
//
//        // Call the loginPatient method
//        ResponseEntity<?> responseEntity = patientController.loginPatient(savedUser);
//
//        // Assert that the response status is OK
//        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
//
//        // Assert that the returned patient object matches the saved patient
//        assertEquals(savedPatient, responseEntity.getBody());
//    }
//
//    // Add similar test methods for other controller methods
//}
