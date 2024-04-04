package com.hexaware.careassist.dto;

import com.hexaware.careassist.entity.Invoice.InvoiceStatus;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class InvoiceDto {
    private Long invoiceId;
    private Long patientId;
    private String patientName;
    private Long providerId;
    private String providerName;
    private LocalDate invoiceDate;
    private double amount;
    private InvoiceStatus invoiceStatus;
}