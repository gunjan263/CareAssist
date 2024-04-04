package com.hexaware.careassist.service.serviceimpl;

import com.hexaware.careassist.dto.InvoiceDto;
import com.hexaware.careassist.entity.HealthcareProvider;
import com.hexaware.careassist.entity.Invoice;
import com.hexaware.careassist.entity.Patient;
import com.hexaware.careassist.exception.NoSuchFileException;

import com.hexaware.careassist.exception.ProfileUpdationFailedException;
import com.hexaware.careassist.exception.ResourceNotFoundException;
import com.hexaware.careassist.mapper.InvoiceMapper;
import com.hexaware.careassist.payload.InvoiceResponse;
import com.hexaware.careassist.repository.IHealthcareProviderRepository;
import com.hexaware.careassist.repository.IInvoiceRepository;
import com.hexaware.careassist.repository.IPatientRepository;
import com.hexaware.careassist.service.IEmailService;
import com.hexaware.careassist.service.IInvoiceService;

import jakarta.transaction.Transactional;

import com.hexaware.careassist.exception.UploadFailedException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;
import java.util.stream.Collectors;

@Service
public class InvoiceServiceImpl implements IInvoiceService {

	private IInvoiceRepository invoiceRepository;
	private IHealthcareProviderRepository healthcareProviderRepository;
	private IPatientRepository patientRepository;
	private IEmailService emailService;

    

	@Autowired
	public void setHealthcareProviderRepository(IHealthcareProviderRepository healthcareProviderRepository) {
		this.healthcareProviderRepository = healthcareProviderRepository;
	}

	@Autowired
	public void setPatientRepository(IPatientRepository patientRepository) {
		this.patientRepository = patientRepository;
	}

	@Autowired
	public void setInvoiceRepository(IInvoiceRepository invoiceRepository) {
		this.invoiceRepository = invoiceRepository;
	}
	@Autowired
    public void setEmailService(IEmailService emailService) {
        this.emailService = emailService;
    }


	@Value("${project.pdf}")
	private String path;

	private static final Logger logger = Logger.getLogger(InvoiceServiceImpl.class.getName());

//	@Override
//	public InvoiceDto updateInvoice(Long id, InvoiceDto updatedInvoiceDto) throws ProfileUpdationFailedException {
//		Invoice existingInvoice = invoiceRepository.findById(id).orElse(null);
//		if (existingInvoice != null) {
//			existingInvoice.setInvoiceStatus(updatedInvoiceDto.getInvoiceStatus());
//			existingInvoice = invoiceRepository.save(existingInvoice);
//			return InvoiceMapper.toDto(existingInvoice);
//		}
//		return null;
//	}
	
	@Override
	@Transactional
	public void updateInvoiceStatus(Long id, Invoice.InvoiceStatus status) {
		invoiceRepository.updateInvoiceStatus(id, status);
	}

	@Override
	public void deleteInvoice(Long id){
		invoiceRepository.deleteById(id);
	}

	@Override
	public String getInvoiceStatusById(Long id) {
		Invoice invoice = invoiceRepository.findById(id).orElse(null);
		if (invoice != null) {
			return invoice.getInvoiceStatus().name();
		}
		return null;
	}
	@Override
	public List<Invoice> getInvoicesByPatientId(Long patientId) {
        return invoiceRepository.findByPatientId(patientId);
	}

	@Override
	public List<String> getAllInvoiceStatus() {
		return invoiceRepository.findAllInvoiceStatus();
	}

	@Override
	public InvoiceResponse generateInvoiceAndUploadPDF(Long providerId, Long patientId, double amount,
			Invoice.InvoiceStatus status, MultipartFile pdf) throws UploadFailedException, NoSuchFileException {

		HealthcareProvider provider = healthcareProviderRepository.findById(providerId).orElse(null);
		Patient patient = patientRepository.findById(patientId).orElse(null);

		if (provider != null && patient != null) {
			Invoice invoice = provider.generateInvoice(patient, amount, status);

			invoice.setPatientId(patientId);
			invoice.setProviderId(providerId);

			invoiceRepository.save(invoice);

			String fileName = uploadPDF(path, pdf);

			invoice.setPdfFileName(fileName);
			invoiceRepository.save(invoice);
			
			String emailSubject = "Invoice Generated";
	        String emailBody = "Dear " + patient.getFirstName() + ",\n\n"
	                + "Your invoice for amount $" + amount + " has been generated successfully.";

	        try {
	            // Send email to patient
	            emailService.sendEmail(patient.getEmail(), emailSubject, emailBody);
	        } catch (Exception e) {
	            // Handle email sending failure
	            logger.log(Level.SEVERE, "Error occurred while sending email for generated invoice", e);
	            // You can choose to throw an exception or handle it according to your requirement
	        }


			return new InvoiceResponse(invoice, fileName);
		} else {
			return new InvoiceResponse(null, "Provider or patient not found");
		}
	}

	@Override
	public String uploadPDF(String path, MultipartFile pdf) throws UploadFailedException {
		String name = pdf.getOriginalFilename();
		String filePath = path + File.separator + name;
		try {
			File file = new File(path);
			if (!file.exists()) {
				file.mkdir();
			}
			Files.copy(pdf.getInputStream(), Paths.get(filePath));
			return name;
		} catch (IOException e) {
			logger.log(Level.SEVERE, "Error occurred while uploading PDF file", e);
			throw new UploadFailedException("Failed to upload PDF file: " + e.getMessage());
		}
	}

	@Override
	public byte[] getPDFByInvoiceId(Long invoiceId) throws IOException, ResourceNotFoundException {
		Invoice invoice = invoiceRepository.findById(invoiceId)
				.orElseThrow(() -> new ResourceNotFoundException("Invoice","id" , invoiceId));

		String pdfFileName = invoice.getPdfFileName();
		String filePath = path + File.separator + pdfFileName;
		File file = new File(filePath);
		if (file.exists()) {
			return Files.readAllBytes(file.toPath());
		} else {
			throw new ResourceNotFoundException("PDF file","id" , invoiceId);
		}
	}

	@Override
	public byte[] getPDFByPatientId(Long patientId) throws NoSuchFileException, ResourceNotFoundException {
		try {
			List<Invoice> invoices = invoiceRepository.findByPatientId(patientId);
			if (!invoices.isEmpty()) {
				String pdfFileName = invoices.get(0).getPdfFileName();
				String filePath = path + File.separator + pdfFileName;
				File file = new File(filePath);
				if (file.exists()) {
					return Files.readAllBytes(file.toPath());
				} else {
					throw new NoSuchFileException("PDF file not found at: " + filePath);
				}
			} else {
				throw new ResourceNotFoundException("invoice","id" , patientId);
			}
		} catch (IOException e) {
			logger.log(Level.SEVERE, "Error occurred while reading PDF file", e);
			throw new NoSuchFileException("Error occurred while reading PDF file: " + e.getMessage());
		}
	}

	// Assuming you have a method to retrieve invoices in your service or repository
	@Override
	public List<InvoiceDto> getAllInvoicesWithNames() {
		List<Invoice> invoices = invoiceRepository.findAll(); // Retrieve invoices

		// Transform invoices to DTOs and populate patient and provider names
		List<InvoiceDto> invoiceDtos = invoices.stream().map(invoice -> {
			InvoiceDto dto = new InvoiceDto();
			dto.setInvoiceId(invoice.getInvoiceId());
			dto.setPatientId(invoice.getPatientId());
			dto.setPatientName(invoice.getPatient().getFirstName() + " " + invoice.getPatient().getLastName());
			dto.setProviderId(invoice.getProviderId());
			dto.setProviderName(invoice.getHealthcareProvider().getProviderName()); // Assuming HealthcareProvider has a name field
			dto.setInvoiceDate(invoice.getInvoiceDate());
			dto.setAmount(invoice.getAmount());
			dto.setInvoiceStatus(invoice.getInvoiceStatus());
			return dto;
		}).collect(Collectors.toList());

		return invoiceDtos;
	}



}