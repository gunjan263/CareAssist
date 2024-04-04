package com.hexaware.careassist.payload;

import com.hexaware.careassist.entity.Invoice;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class InvoiceResponse {
    private Invoice invoice;
    private String pdfFileName;
}

