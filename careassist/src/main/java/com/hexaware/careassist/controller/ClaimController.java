package com.hexaware.careassist.controller;

import org.springframework.http.HttpHeaders;



import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
//import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.hexaware.careassist.dto.ClaimDto;
import com.hexaware.careassist.entity.Claim;
import com.hexaware.careassist.entity.Claim.ClaimStatus;
import com.hexaware.careassist.entity.Patient;
import com.hexaware.careassist.payload.ClaimResponse;
import com.hexaware.careassist.payload.ClaimStatusUpdateDTO;
import com.hexaware.careassist.service.IClaimService;
import com.hexaware.careassist.exception.*;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/careassist/api/claims")
@CrossOrigin("http://localhost:5173")
public class ClaimController {

    private final IClaimService claimService;

    public ClaimController(IClaimService claimService) {
        this.claimService = claimService;
    }
    
    @GetMapping("/get/all")
    public ResponseEntity<?> getAllClaims() {
        try {
            List<ClaimDto> allClaims = claimService.getAllClaims();
            return ResponseEntity.ok(allClaims);
        } catch (NoSuchClaimAvailableException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

        @GetMapping("/get/pdf/{claimId}")
        public ResponseEntity<?> getPDFByClaimId(@PathVariable Long claimId) {
            try {
                byte[] pdfContent = claimService.getPDFByClaimId(claimId);
                HttpHeaders headers = new HttpHeaders();
                headers.setContentType(MediaType.APPLICATION_PDF);
                headers.setContentDispositionFormData("filename", "claim.pdf");
                headers.setCacheControl("must-revalidate, post-check=0, pre-check=0");
                return ResponseEntity.ok().headers(headers).body(pdfContent);
            } catch (NoSuchClaimAvailableException | IOException e) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
            }
        }
    


        @PutMapping("/update/status/{id}")
        @PreAuthorize("hasAuthority('INSURANCE_COMPANY') OR hasAuthority('ADMIN')")
        public ResponseEntity<String> updateClaimStatus(@PathVariable Long id, @RequestBody ClaimStatusUpdateDTO claimStatusUpdateDTO) {
            try {
                // Parse status string to ClaimStatus enum
                Claim.ClaimStatus status = Claim.ClaimStatus.valueOf(claimStatusUpdateDTO.getStatus().toUpperCase());

                claimService.updateClaimStatus(id, status, claimStatusUpdateDTO.getClaimApprovalDate());
                return ResponseEntity.ok("Claim status updated successfully");
            } catch (NoSuchClaimAvailableException e) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
            } catch (IllegalArgumentException e) {
                // Handle invalid status string
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid claim status");
            }
        }


        @PostMapping("/submit")
        public ResponseEntity<?> submitClaim(@RequestParam Long providerId,
                                             @RequestParam Long patientId,
                                             @RequestParam String companyName,
                                             @RequestParam double amount,
                                             @RequestParam ClaimStatus status,
                                             @RequestParam("pdf") MultipartFile pdf) throws ClaimSubmissionFailedException {
            try {
                ClaimResponse response = claimService.submitClaim(companyName, patientId, providerId, amount, status, pdf);
                return ResponseEntity.ok(response);
            } catch (NoSuchClaimAvailableException | IOException e) {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
            }
        }

	    @GetMapping("/get/claim/{patientId}")
	    public ResponseEntity<?> getPDFByPatientId(@PathVariable Long patientId) throws ResourceNotFoundException{
	        try {
	            byte[] pdfContent = claimService.getPDFByPatientId(patientId);
	            HttpHeaders headers = new HttpHeaders();
	            headers.setContentType(MediaType.APPLICATION_PDF);
	            headers.setContentDispositionFormData("filename", "claim.pdf");
	            headers.setCacheControl("must-revalidate, post-check=0, pre-check=0");
	            return ResponseEntity.ok().headers(headers).body(pdfContent);
	        } catch (ResourceNotFoundException | IOException e) {
	            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
	        }
	        
	        
	    }
	    @GetMapping("/patient/claim/{patientId}")
	    public ResponseEntity<List<ClaimDto>> getClaimsByPatientId(@PathVariable Patient patientId) {
	        List<ClaimDto> claims = claimService.getClaimsByPatientId(patientId);
	        return new ResponseEntity<>(claims, HttpStatus.OK);
	    }
	   }

