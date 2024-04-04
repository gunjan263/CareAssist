package com.hexaware.careassist.dto;

import com.hexaware.careassist.entity.Claim.ClaimStatus;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class ClaimDto {
	private Long claimId;
    private Long patientId;
    private Long companyId;
    private double claimAmount;
    private LocalDate claimDate;
    private String claimApprovalDate;
    private ClaimStatus status;
}

