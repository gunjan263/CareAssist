package com.hexaware.careassist.controller;

import com.hexaware.careassist.dto.PatientDto;


import com.hexaware.careassist.entity.InsurancePlan;
import com.hexaware.careassist.entity.Patient;
import com.hexaware.careassist.exception.NoSuchPatientInsuranceFoundException;
import com.hexaware.careassist.exception.ProfileUpdationFailedException;
import com.hexaware.careassist.exception.ResourceNotFoundException;
import com.hexaware.careassist.exception.UserAlreadyExistsException;

import com.hexaware.careassist.service.IPatientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
//import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/careassist/api/patients")
@CrossOrigin("http://localhost:5173")
public class PatientController {

    @Autowired
    private IPatientService patientService;

    @PostMapping("/add/patient")
    //@PreAuthorize("hasAuthority('PATIENT')")
    public ResponseEntity<PatientDto> registerPatient(@RequestBody PatientDto patientDto) throws UserAlreadyExistsException {
        PatientDto registeredPatient = patientService.registerPatient(patientDto);
        return new ResponseEntity<>(registeredPatient, HttpStatus.CREATED);
    }

    @GetMapping("/get/all")
   // @PreAuthorize("hasAuthority('PATIENT')")
    public ResponseEntity<List<PatientDto>> getAllPatients() {
        List<PatientDto> patients = patientService.getAllPatients();
        return new ResponseEntity<>(patients, HttpStatus.OK);
    }

    @GetMapping("/get/byID/{id}")
    //@PreAuthorize("hasAuthority('PATIENT') OR hasAuthority('ADMIN')")
    public ResponseEntity<PatientDto> getPatientById(@PathVariable Long id) throws ResourceNotFoundException{
        PatientDto patient = patientService.getPatientById(id);
        return new ResponseEntity<>(patient, HttpStatus.OK);
    }

    @PutMapping("/update/{id}")
    //@PreAuthorize("hasAuthority('PATIENT') OR hasAuthority('ADMIN')")
    public ResponseEntity<PatientDto> updatePatient(@PathVariable Long id, @RequestBody PatientDto updatedPatientDto) throws ProfileUpdationFailedException{
        PatientDto updatedPatient = patientService.updatePatient(id, updatedPatientDto);
        return new ResponseEntity<>(updatedPatient, HttpStatus.OK);
    }
    @DeleteMapping("/delete/{id}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<Void> deletePatient(@PathVariable Long id){
        patientService.deletePatient(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
    
    @PostMapping("/{patientId}/insurance-plans/select")
    //@PreAuthorize("hasAuthority('PATIENT')")
    //http://localhost:8080/careassist/api/patients/1/insurance-plans/select?insurancePlanId=1
    public ResponseEntity<String> selectInsurancePlanForPatient (
            @PathVariable Long patientId,
            @RequestParam Long insurancePlanId) throws NoSuchPatientInsuranceFoundException, ResourceNotFoundException {
        patientService.selectInsurancePlanForPatient(patientId, insurancePlanId);
        return new ResponseEntity<>("Insurance plan selected successfully for patient.", HttpStatus.OK);
    }

    @GetMapping("/find-insurance-plan-ids")
    //@PreAuthorize("hasAuthority('PATIENT') OR hasAuthority('INSURANCE_COMPANY')")
    //http://localhost:8080/careassist/api/patients/find-insurance-plan-ids?patientId={patientId}
    public ResponseEntity<List<Long>> findInsurancePlanIdsByPatientId(@RequestParam Long patientId) throws NoSuchPatientInsuranceFoundException{
        List<Long> insurancePlanIds = patientService.findInsurancePlanIdsByPatientId(patientId);
        return ResponseEntity.ok(insurancePlanIds);
    }
    
    @GetMapping("/find-insurance-plans")
    //@PreAuthorize("hasAuthority('PATIENT') OR hasAuthority('INSURANCE_COMPANY') OR hasAuthority('ADMIN')")
    //http://localhost:8080/careassist/api/patients/find-insurance-plans?patientId={patientId}
    public ResponseEntity<List<InsurancePlan>> findInsurancePlansByPatientId(@RequestParam Long patientId) throws NoSuchPatientInsuranceFoundException{
        List<InsurancePlan> insurancePlans = patientService.findInsurancePlansDetailsByPatientId(patientId);
        return ResponseEntity.ok(insurancePlans);
    }
    
    
    @GetMapping("/byUserId/{userId}")
    public Patient getPatientByUserId(@PathVariable Integer userId) {
        return patientService.getByUserId(userId);
    }
    
    
    @PutMapping("/update/byUserID/{userId}")
    public ResponseEntity<PatientDto> updatePatientByUserId(@PathVariable Integer userId,
                                                            @RequestBody PatientDto updatedPatientDto) {
        try {
            PatientDto updatedPatient = patientService.updatePatientByUserID(userId, updatedPatientDto);
            return ResponseEntity.ok(updatedPatient);
        } catch (ProfileUpdationFailedException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
        
    }



}