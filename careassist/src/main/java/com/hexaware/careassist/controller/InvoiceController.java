package com.hexaware.careassist.controller;

import com.hexaware.careassist.dto.InvoiceDto;
import com.hexaware.careassist.entity.Invoice;
import com.hexaware.careassist.exception.NoSuchFileException;

import com.hexaware.careassist.exception.ProfileUpdationFailedException;
import com.hexaware.careassist.exception.ResourceNotFoundException;
import com.hexaware.careassist.exception.UploadFailedException;
import com.hexaware.careassist.payload.InvoiceResponse;
import com.hexaware.careassist.service.IInvoiceService;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.List;
import java.util.NoSuchElementException;

@RestController
@CrossOrigin("http://localhost:5173")
@RequestMapping("/careassist/api/invoices")
public class InvoiceController {

	private final IInvoiceService invoiceService;

	public InvoiceController(IInvoiceService invoiceService) {
		this.invoiceService = invoiceService;
	}

	@Value("${project.pdf}")
	private String path;

	@PutMapping("/update/{id}")
	@PreAuthorize("hasAuthority('HEALTHCARE_PROVIDER') OR hasAuthority('ADMIN')")
	public ResponseEntity<String> updateInvoice(@PathVariable Long id, @RequestBody InvoiceDto invoiceDto) {
		try {
			invoiceService.updateInvoiceStatus(id, invoiceDto.getInvoiceStatus());
			return ResponseEntity.ok("Invoice status updated successfully");
		} catch (IllegalArgumentException e) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred");
		}
	}

//    @DeleteMapping("/delete/{id}")
//    @PreAuthorize("hasAuthority('ROLE_HEALTHCARE_PROVIDER') OR hasAuthority('ROLE_ADMIN')")
//    public ResponseEntity<Void> deleteInvoice(@PathVariable Long id) {
//        invoiceService.deleteInvoice(id);
//        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
//    }

	@GetMapping("/{id}/status")
	@PreAuthorize("hasAuthority('HEALTHCARE_PROVIDER') OR hasAuthority('ADMIN')")
	public ResponseEntity<String> getInvoiceStatusById(@PathVariable Long id) {
		String status = invoiceService.getInvoiceStatusById(id);
		if (status != null) {
			return new ResponseEntity<>(status, HttpStatus.OK);
		}
		return new ResponseEntity<>(HttpStatus.NOT_FOUND);
	}

	@GetMapping("/all/status")
	@PreAuthorize("hasAuthority('HEALTHCARE_PROVIDER') OR hasAuthority('ADMIN')")
	public ResponseEntity<List<String>> getAllInvoiceStatus() {
		List<String> statuses = invoiceService.getAllInvoiceStatus();
		return new ResponseEntity<>(statuses, HttpStatus.OK);
	}

	@PostMapping("/generate-invoice")
	//@PreAuthorize("hasAuthority('HEALTHCARE_PROVIDER')")
	public ResponseEntity<InvoiceResponse> generateInvoiceAndUploadPDF(@RequestParam Long providerId,
			@RequestParam Long patientId, @RequestParam double amount, @RequestParam Invoice.InvoiceStatus status,
			@RequestParam("pdf") MultipartFile pdf)
			throws IOException, UploadFailedException, ResourceNotFoundException, NoSuchFileException {

		InvoiceResponse response = invoiceService.generateInvoiceAndUploadPDF(providerId, patientId, amount, status,
				pdf);
		return ResponseEntity.ok(response);
	}

	@GetMapping("/get/{patientId}")
	@PreAuthorize("hasAuthority('HEALTHCARE_PROVIDER') OR hasAuthority('ADMIN')")
	public ResponseEntity<byte[]> getPatientInvoices(@PathVariable Long patientId)
			throws FileNotFoundException, IOException, ResourceNotFoundException, NoSuchFileException {
		try {
			byte[] pdfContent = invoiceService.getPDFByPatientId(patientId);
			HttpHeaders headers = new HttpHeaders();
			headers.setContentType(MediaType.APPLICATION_PDF);
			headers.setContentDispositionFormData("filename", "invoice.pdf");
			headers.setCacheControl("must-revalidate, post-check=0, pre-check=0");
			ResponseEntity<byte[]> responseEntity = new ResponseEntity<>(pdfContent, headers, HttpStatus.OK);
			return responseEntity;
		} catch (NoSuchElementException e) {
			return ResponseEntity.status(HttpStatus.NO_CONTENT).body(null);
		}
	}

	@GetMapping("/get/pdf/{invoiceId}")
	// @PreAuthorize("hasAuthority('HEALTHCARE_PROVIDER') OR hasAuthority('ADMIN')
	// OR hasAuthority('PATIENT')")
	public ResponseEntity<?> getPDFByInvoiceId(@PathVariable Long invoiceId) {
		try {
			byte[] pdfContent = invoiceService.getPDFByInvoiceId(invoiceId);
			HttpHeaders headers = new HttpHeaders();
			headers.setContentType(MediaType.APPLICATION_PDF);
			headers.setContentDispositionFormData("filename", "invoice.pdf");
			headers.setCacheControl("must-revalidate, post-check=0, pre-check=0");
			return ResponseEntity.ok().headers(headers).body(pdfContent);
		} catch (ResourceNotFoundException | IOException e) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
		}

	}

	@GetMapping("/patient/{patientId}")
	public ResponseEntity<List<Invoice>> getInvoicesByPatientId(@PathVariable Long patientId) {
		List<Invoice> invoices = invoiceService.getInvoicesByPatientId(patientId);
		return new ResponseEntity<>(invoices, HttpStatus.OK);
	}

	@GetMapping("/get/all/invoice")
//@PreAuthorize("hasAuthority('ROLE_HEALTHCARE_PROVIDER') OR hasAuthority('ROLE_ADMIN')")
	public ResponseEntity<List<InvoiceDto>> getAllInvoices() {
		List<InvoiceDto> invoicesWithNames = invoiceService.getAllInvoicesWithNames();
		return ResponseEntity.ok(invoicesWithNames);
	}

}