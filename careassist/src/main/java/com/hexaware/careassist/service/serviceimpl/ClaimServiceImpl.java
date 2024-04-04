package com.hexaware.careassist.service.serviceimpl;

import com.hexaware.careassist.mapper.HealthcareProviderMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import com.hexaware.careassist.entity.Claim;
import com.hexaware.careassist.entity.Claim.ClaimStatus;
import com.hexaware.careassist.entity.InsuranceCompany;
import com.hexaware.careassist.entity.Patient;
import com.hexaware.careassist.repository.IClaimRepository;
import com.hexaware.careassist.repository.IInsuranceCompanyRepository;
import com.hexaware.careassist.repository.IPatientRepository;
import com.hexaware.careassist.service.IClaimService;
import com.hexaware.careassist.service.IEmailService;
import com.hexaware.careassist.exception.NoSuchClaimAvailableException;
import com.hexaware.careassist.payload.ClaimResponse;
import com.hexaware.careassist.dto.ClaimDto;
import com.hexaware.careassist.mapper.ClaimMapper;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ClaimServiceImpl implements IClaimService {

	private static final Logger logger = LoggerFactory.getLogger(ClaimServiceImpl.class);

	private IClaimRepository claimRepository;
	private IInsuranceCompanyRepository insuranceCompanyRepository;
	private IPatientRepository patientRepository;
	private IEmailService emailService;


	@Autowired
	public void setInsuranceCompanyRepository(IInsuranceCompanyRepository insuranceCompanyRepository) {
		this.insuranceCompanyRepository = insuranceCompanyRepository;
	}

	@Autowired
	public void setPatientRepository(IPatientRepository patientRepository) {
		this.patientRepository = patientRepository;
	}

	@Autowired
	public void setClaimRepository(IClaimRepository claimRepository) {
		this.claimRepository = claimRepository;
	}
	
	@Autowired
	public void setEmailService(IEmailService emailService) {
		this.emailService = emailService;
	}


	@Value("${project.claimPdf}")
	private String claimPdfPath;

	@Override
	public void updateClaimStatus(Long id, ClaimStatus status, String approvalDate) throws NoSuchClaimAvailableException {
	    Claim claim = claimRepository.findById(id)
	            .orElseThrow(() -> new NoSuchClaimAvailableException("Claim not found with ID: " + id));

	    // Update claim status
	    claim.setStatus(status);
	    claim.setClaimApprovalDate(approvalDate);
	    claimRepository.save(claim);

	    // Retrieve patient's email address
	    Patient patient = claim.getPatient();
	    String patientEmail = patient.getEmail();

	    // Compose email content
	    String subject = "Claim Status Updated";
	    String body = "Dear " + patient.getFirstName() + ",\n\nYour claim with ID " + id + " has been updated to: " + status;

	    // Send email to the patient
	    emailService.sendEmail(patientEmail, subject, body);
	}

	
	@Override
	public ClaimResponse submitClaim(String companyName, Long patientId, Long providerId, double amount,
									 ClaimStatus status, MultipartFile pdf) throws IOException, NoSuchClaimAvailableException {
		InsuranceCompany company = insuranceCompanyRepository.findByCompanyName(companyName);

		if (company == null) {
			throw new NoSuchClaimAvailableException("Insurance company not found with name: " + companyName);
		}

		Optional<Patient> optionalPatient = patientRepository.findById(patientId);
		if (optionalPatient.isEmpty()) {
			throw new NoSuchClaimAvailableException("Patient not found with ID: " + patientId);
		}

		Patient patient = optionalPatient.get(); // Extract Patient from Optional

		Claim claim = new Claim();
		claim.setClaimAmount(amount);
		claim.setClaimDate(LocalDate.now());
		claim.setStatus(status);
		claim.setPatient(patient); // Set the patient object

		claim.setInsuranceCompany(company);

		claim = claimRepository.save(claim);

		String fileName = uploadPatientClaimPDF(patientId, pdf);
		claim.setPdfFileName(fileName);
		claimRepository.save(claim);
		
		String emailSubject = "New Claim Submitted";
        String emailBody = "A new claim has been submitted by patient " + patientId + " for amount $" + amount;
        emailService.sendEmail(company.getEmail(), emailSubject, emailBody);

		return new ClaimResponse(claim, fileName);
	}
	
	@Override
	public String uploadPatientClaimPDF(Long patientId, MultipartFile pdf) throws IOException {
		String name = pdf.getOriginalFilename();
		String filePath = claimPdfPath + File.separator + name;
		File file = new File(filePath);
		if (!file.getParentFile().exists()) {
			file.getParentFile().mkdirs();
		}
		Files.copy(pdf.getInputStream(), Paths.get(filePath));
		return name;
	}

	@Override
	public byte[] getPDFByPatientId(Long patientId) throws IOException, NoSuchClaimAvailableException {
		try {
			List<Claim> claims = claimRepository.findByPatientPatientId(patientId);
			if (!claims.isEmpty()) {
				String pdfFileName = claims.get(0).getPdfFileName();
				String filePath = claimPdfPath + File.separator + pdfFileName;
				File file = new File(filePath);
				if (file.exists()) {
					return Files.readAllBytes(file.toPath());
				} else {
					throw new FileNotFoundException("PDF file not found at: " + filePath);
				}
			} else {
				throw new NoSuchClaimAvailableException("No claims found for the patient with ID: " + patientId);
			}
		} catch (IOException e) {
			logger.error("Error occurred while reading PDF file for patient ID " + patientId, e);
			throw e;
		}
	}

	@Override
	public List<ClaimDto> getAllClaims() throws NoSuchClaimAvailableException {
		List<Claim> claims = claimRepository.findAll();
		if (claims.isEmpty()) {
			throw new NoSuchClaimAvailableException("No claims available.");
		}
		List<ClaimDto> claimDtos = new ArrayList<>();
		for (Claim claim : claims) {
			claimDtos.add(ClaimMapper.toDto(claim)); // Assuming there's a constructor in ClaimDto to map from Claim entity
		}
		return claimDtos;
	}


	@Override
	public byte[] getPDFByClaimId(Long claimId) throws IOException, NoSuchClaimAvailableException {
		Claim claim = claimRepository.findById(claimId)
				.orElseThrow(() -> new NoSuchClaimAvailableException("Claim not found with ID: " + claimId));

		String pdfFileName = claim.getPdfFileName();
		String filePath = claimPdfPath + File.separator + pdfFileName;
		File file = new File(filePath);
		if (file.exists()) {
			return Files.readAllBytes(file.toPath());
		} else {
			throw new NoSuchClaimAvailableException("PDF file not found for claim with ID: " + claimId);
		}
	}
	
	@Override
	public List<ClaimDto> getClaimsByPatientId(Patient patientId) {
		List<Claim> claims = claimRepository.findByPatient(patientId);
		return claims.stream()
				.map(ClaimMapper::toDto) // Using ClaimMapper class
				.collect(Collectors.toList());
	}
	
}