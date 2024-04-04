package com.hexaware.careassist.controller;

import com.hexaware.careassist.dto.InsuranceCompanyDto;


import com.hexaware.careassist.exception.ProfileUpdationFailedException;
import com.hexaware.careassist.exception.ResourceNotFoundException;
import com.hexaware.careassist.exception.UserAlreadyExistsException;

import com.hexaware.careassist.service.IInsuranceCompanyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
//import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/careassist/api/insurance-companies")
@CrossOrigin("http://localhost:5173")
public class InsuranceCompanyController {

    @Autowired
    private IInsuranceCompanyService insuranceCompanyService;

    @PostMapping("/add/company")
    @PreAuthorize("hasAuthority('INSURANCE_COMPANY')")
    public ResponseEntity<InsuranceCompanyDto> registerInsuranceCompany(@RequestBody InsuranceCompanyDto insuranceCompanyDto) throws UserAlreadyExistsException {
        InsuranceCompanyDto registeredCompany = insuranceCompanyService.registerInsuranceCompany(insuranceCompanyDto);
        return new ResponseEntity<>(registeredCompany, HttpStatus.CREATED);
    }

    @GetMapping("/get/all")
    public ResponseEntity<List<InsuranceCompanyDto>> getAllInsuranceCompanies() {
        List<InsuranceCompanyDto> companies = insuranceCompanyService.getAllInsuranceCompanies();
        return new ResponseEntity<>(companies, HttpStatus.OK);
    }

    @GetMapping("/get/byID/{id}")
    @PreAuthorize("hasAuthority('INSURANCE_COMPANY') OR hasAuthority('ADMIN')")
    public ResponseEntity<InsuranceCompanyDto> getInsuranceCompanyById(@PathVariable Long id) throws ResourceNotFoundException {
        InsuranceCompanyDto company = insuranceCompanyService.getInsuranceCompanyById(id);
        return new ResponseEntity<>(company, HttpStatus.OK);
    }

    @PutMapping("/update/{id}")
    @PreAuthorize("hasAuthority('INSURANCE_COMPANY') OR hasAuthority('ADMIN')")
    public ResponseEntity<InsuranceCompanyDto> updateInsuranceCompany(@PathVariable Long id, @RequestBody InsuranceCompanyDto updatedCompanyDto) throws ProfileUpdationFailedException, ResourceNotFoundException {
        InsuranceCompanyDto updatedCompany = insuranceCompanyService.updateInsuranceCompany(id, updatedCompanyDto);
        return new ResponseEntity<>(updatedCompany, HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<Void> deleteInsuranceCompany(@PathVariable Long id)  {
        insuranceCompanyService.deleteInsuranceCompany(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}