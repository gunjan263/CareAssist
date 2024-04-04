package com.hexaware.careassist.controller;

import com.hexaware.careassist.dto.InsurancePlanDto;

import com.hexaware.careassist.exception.ProfileUpdationFailedException;
import com.hexaware.careassist.exception.ResourceNotFoundException;
import com.hexaware.careassist.service.IInsurancePlanService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/careassist/api/insurance-plans")
@CrossOrigin("http://localhost:5173")
public class InsurancePlanController {

    @Autowired
    private IInsurancePlanService insurancePlanService;

    @PostMapping("/add/plan")
    @PreAuthorize("hasAuthority('INSURANCE_COMPANY')")
    public ResponseEntity<InsurancePlanDto> registerInsurancePlan(@RequestBody InsurancePlanDto insurancePlanDto) {
        InsurancePlanDto createdInsurancePlan = insurancePlanService.addInsurancePlan(insurancePlanDto);
        return new ResponseEntity<>(createdInsurancePlan, HttpStatus.CREATED);
    }

    @GetMapping("/get/all")
    public ResponseEntity<List<InsurancePlanDto>> getAllInsurancePlans() {
        List<InsurancePlanDto> insurancePlans = insurancePlanService.getAllInsurancePlans();
        return new ResponseEntity<>(insurancePlans, HttpStatus.OK);
    }

    @GetMapping("/get/byID/{id}")
    @PreAuthorize("hasAuthority('INSURANCE_COMPANY') OR hasAuthority('ADMIN')")
    public ResponseEntity<InsurancePlanDto> getInsurancePlanById(@PathVariable Long id) throws ResourceNotFoundException {
        InsurancePlanDto insurancePlan = insurancePlanService.getInsurancePlanById(id);
        return new ResponseEntity<>(insurancePlan, HttpStatus.OK);
    }

    @PutMapping("/update/{id}")
    @PreAuthorize("hasAuthority('INSURANCE_COMPANY') OR hasAuthority('ADMIN')")
    public ResponseEntity<InsurancePlanDto> updateInsurancePlan(@PathVariable Long id, @RequestBody InsurancePlanDto updatedPlanDto) throws ProfileUpdationFailedException, ResourceNotFoundException {
        InsurancePlanDto updatedInsurancePlan = insurancePlanService.updateInsurancePlan(id, updatedPlanDto);
        return new ResponseEntity<>(updatedInsurancePlan, HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    @PreAuthorize("hasAuthority('INSURANCE_COMPANY') OR hasAuthority('ADMIN')")
    public ResponseEntity<Void> deleteInsurancePlan(@PathVariable Long id) {
        insurancePlanService.deleteInsurancePlan(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}