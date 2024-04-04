package com.hexaware.careassist.repository;

import com.hexaware.careassist.entity.Invoice;

import jakarta.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IInvoiceRepository extends JpaRepository<Invoice, Long> {
    List<Invoice> findByPatientId(Long patientId);
    List<Invoice> findByProviderId(Long providerId);
   
    
    @Query("SELECT i.invoiceStatus FROM Invoice i WHERE i.id = :id")
    String getInvoiceStatusById(@Param("id") Long id);

    @Query("SELECT DISTINCT i.invoiceStatus FROM Invoice i")
    List<String> findAllInvoiceStatus();
    
    @Modifying
    @Transactional
    @Query("UPDATE Invoice i SET i.invoiceStatus = :status WHERE i.invoiceId = :id")
    void updateInvoiceStatus(@Param("id") Long id, @Param("status") Invoice.InvoiceStatus status);
   
}
