package com.hexaware.careassist.controller;

import com.hexaware.careassist.dto.HealthcareProviderDto;


import com.hexaware.careassist.exception.ProfileUpdationFailedException;
import com.hexaware.careassist.exception.ResourceNotFoundException;

import com.hexaware.careassist.service.IHealthcareProviderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
//import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/careassist/api/healthcare-providers")
@CrossOrigin("http://localhost:5173")
public class HealthcareProviderController {

    @Autowired
    private IHealthcareProviderService healthcareProviderService;

    @PostMapping("/add")
    @PreAuthorize("hasAuthority('HEALTHCARE_PROVIDER')")
    public ResponseEntity<HealthcareProviderDto> registerHealthcareProvider(@RequestBody HealthcareProviderDto providerDto) {
        HealthcareProviderDto registeredProvider = healthcareProviderService.registerHealthcareProvider(providerDto);
        return new ResponseEntity<>(registeredProvider, HttpStatus.CREATED);
    }

    @GetMapping("/get/byID/{id}")
    @PreAuthorize("hasAuthority('HEALTHCARE_PROVIDER') OR hasAuthority('ADMIN')")
    public ResponseEntity<HealthcareProviderDto> getHealthcareProviderById(@PathVariable Long id) throws ResourceNotFoundException {
        HealthcareProviderDto providerDto = healthcareProviderService.getHealthcareProviderById(id);
        return new ResponseEntity<>(providerDto, HttpStatus.OK);
    }


    @GetMapping("/get/all")
    public ResponseEntity<List<HealthcareProviderDto>> getAllHealthcareProviders() throws ResourceNotFoundException {
        List<HealthcareProviderDto> providerDtos = healthcareProviderService.getAllHealthcareProviders() ;
        return new ResponseEntity<>(providerDtos, HttpStatus.OK);
    }

    @PutMapping("/update/{id}")
    @PreAuthorize("hasAuthority('HEALTHCARE_PROVIDER') OR hasAuthority('ADMIN')")
    public ResponseEntity<HealthcareProviderDto> updateHealthcareProvider(@PathVariable Long id, @RequestBody HealthcareProviderDto updatedProviderDto) throws ResourceNotFoundException, ProfileUpdationFailedException {
        HealthcareProviderDto updatedProvider = healthcareProviderService.updateHealthcareProvider(id, updatedProviderDto);
        return new ResponseEntity<>(updatedProvider, HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<Void> deleteHealthcareProvider(@PathVariable Long id) {
        healthcareProviderService.deleteHealthcareProvider(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
