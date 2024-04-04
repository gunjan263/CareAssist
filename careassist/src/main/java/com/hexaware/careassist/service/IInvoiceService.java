package com.hexaware.careassist.service;

import com.hexaware.careassist.dto.InvoiceDto;
import com.hexaware.careassist.entity.Invoice;
import com.hexaware.careassist.exception.NoSuchFileException;

import com.hexaware.careassist.exception.ProfileUpdationFailedException;
import com.hexaware.careassist.exception.ResourceNotFoundException;
import com.hexaware.careassist.payload.InvoiceResponse;
import com.hexaware.careassist.exception.UploadFailedException;

import java.io.IOException;
import java.util.List;

import jakarta.transaction.Transactional;
import org.springframework.web.multipart.MultipartFile;

public interface IInvoiceService {

    void deleteInvoice(Long id);

	String getInvoiceStatusById(Long id);
	
	@Transactional
    void updateInvoiceStatus(Long id, Invoice.InvoiceStatus status);

	List<String> getAllInvoiceStatus();

	InvoiceResponse generateInvoiceAndUploadPDF(Long providerId, Long patientId, double amount,
			Invoice.InvoiceStatus status, MultipartFile pdf) throws UploadFailedException, NoSuchFileException;

	String uploadPDF(String path, MultipartFile pdf) throws UploadFailedException;

	byte[] getPDFByInvoiceId(Long invoiceId) throws IOException, ResourceNotFoundException;

	byte[] getPDFByPatientId(Long patientId) throws NoSuchFileException, ResourceNotFoundException;


	List<InvoiceDto> getAllInvoicesWithNames();

	List<Invoice> getInvoicesByPatientId(Long patientId);

	//List<InvoiceDto> getAllInvoices() throws NoSuchInvoiceAvailableException;

}