package com.hexaware.careassist.dto;

import com.hexaware.careassist.entity.InsurancePlan.ValidityPeriod;
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
public class InsurancePlanDto {
    private Long planId;
    private String planName;
    private String planDescription;
    private Long companyId;
    private Long coverageAmount;
    private Long premium; 
    private String planHighlights;
    private ValidityPeriod validityPeriod;
    private String companyName;
}