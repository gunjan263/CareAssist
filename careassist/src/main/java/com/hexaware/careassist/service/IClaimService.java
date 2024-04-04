package com.hexaware.careassist.service;

import java.io.IOException;
import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.hexaware.careassist.dto.ClaimDto;
import com.hexaware.careassist.entity.Claim.ClaimStatus;
import com.hexaware.careassist.entity.Patient;
import com.hexaware.careassist.exception.ClaimSubmissionFailedException;
import com.hexaware.careassist.exception.NoSuchClaimAvailableException;
import com.hexaware.careassist.exception.ProfileUpdationFailedException;
import com.hexaware.careassist.exception.ResourceNotFoundException;
import com.hexaware.careassist.payload.ClaimResponse;

public interface IClaimService {

	String uploadPatientClaimPDF(Long patientId, MultipartFile pdf) throws IOException;

	byte[] getPDFByPatientId(Long patientId) throws IOException, ResourceNotFoundException;

	ClaimResponse submitClaim(String companyName, Long patientId, Long providerId, double amount, ClaimStatus status,
            MultipartFile pdf) throws IOException, NoSuchClaimAvailableException;

	void updateClaimStatus(Long id, ClaimStatus status, String approvalDate) throws NoSuchClaimAvailableException;
	
	List<ClaimDto> getAllClaims() throws NoSuchClaimAvailableException;

	byte[] getPDFByClaimId(Long claimId) throws IOException, NoSuchClaimAvailableException;

	List<ClaimDto> getClaimsByPatientId(Patient patientId);

}