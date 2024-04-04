package com.hexaware.careassist.entity;

import java.time.LocalDate;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
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
@Entity
@Table(name = "healthcare_providers")
public class HealthcareProvider {
	
	  @Column(name = "user_id")
	    private Integer userId;
	  
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "provider_id", nullable = false)
    private Long providerId;

    @Column(name = "provider_name", nullable = false)
    @NotEmpty
    private String providerName;

    @Column(name = "address", nullable = false)
    @NotBlank
    private String address;

    @Column(name = "email")
    @Email
    @NotBlank
    private String email;

    @OneToMany(mappedBy = "healthcareProvider", cascade = CascadeType.ALL)
    @JsonBackReference
    private List<Invoice> invoices;
    
  
    
    //@OneToOne
    //@JsonBackReference
    //@JoinColumn(name = "user_id") 
    //private User userAccount;
    
    
    public Invoice generateInvoice(Patient patient, double amount, Invoice.InvoiceStatus status) {
        Invoice invoice = new Invoice();
        invoice.setPatient(patient);
        invoice.setProviderId(this.getProviderId());
        invoice.setInvoiceDate(LocalDate.now());
        invoice.setAmount(amount);
        invoice.setInvoiceStatus(status);
        return invoice;
    }

    

    
}
