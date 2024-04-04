package com.hexaware.careassist.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;

import java.time.LocalDate;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Entity
@Table(name = "patients")
public class Patient {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "patient_id")
    private Long patientId;
    
    // Add userId field
    @Column(name = "user_id")
    private Integer userId;
    
    @Column(name = "first_name")
    
    private String firstName;

    @Column(name = "last_name")
    
    private String lastName;

    @Column(name = "email")
    
    @Email
    private String email;

    @Column(name = "phone_number")
    @Pattern(regexp="[\\d]{10}",message="Please enter a 10 digit mobile number")
    private String phoneNumber;

    @Column(name = "address")
    
    private String address;

    @Column(name = "date_of_birth")
    
    private String dateOfBirth;

    @Column(name = "gender")
    @Pattern(regexp = "MALE|FEMALE|OTHER" , message="Gender Provided can only be MALE|FEMALE|OTHER")
    
    private String gender;
    
    @Column(name = "symptoms")
    
    private String symptoms;
    
    
    @ManyToMany
    @JsonBackReference
    @JoinTable(
        name = "patient_insurance_plan",
        joinColumns = @JoinColumn(name = "patient_id"),
        inverseJoinColumns = @JoinColumn(name = "insurance_plan_id")
    )
    private Set<InsurancePlan> insurancePlans = new HashSet<>();
    
    @OneToMany(mappedBy = "patient")
    private List<Claim> claims;

    public Claim generateClaim(Patient patient, double claimAmount, Claim.ClaimStatus status) {
        Claim claim = new Claim();
        claim.setPatient(patient);
        claim.setClaimDate(LocalDate.now());
        claim.setClaimAmount(claimAmount);
        claim.setStatus(status);
        return claim;
    }
}