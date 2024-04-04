package com.hexaware.careassist.entity;

import java.util.HashSet;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;
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
@Table(name = "insurance_plans")
public class InsurancePlan {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "plan_id", nullable = false)
    private Long planId;

    @Column(name = "plan_name", nullable = false)
    private String planName;
    @Column(name = "plan_Description", nullable = false)
    private String planDescription;


    @Column(name = "coverage_amount", nullable = false)
    private Long coverageAmount;

    @Column(name = "premium", nullable = false)
    private Long premium;

    @Column(name = "plan_highlights", nullable = false)
    private String planHighlights;

    @Column(name = "validity_period", nullable = false)
    @Enumerated(EnumType.STRING)
    private ValidityPeriod validityPeriod;

    @ManyToOne
    @JoinColumn(name = "insurance_company_id")
    private InsuranceCompany insuranceCompany;

    @ManyToMany(mappedBy = "insurancePlans")
    @JsonBackReference
    private Set<Patient> patients = new HashSet<>();
    
  
    public enum ValidityPeriod {
        ONE_YEAR,
        TWO_YEARS,
        THREE_YEARS
    }
}