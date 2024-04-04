package com.hexaware.careassist.payload;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ClaimStatusUpdateDTO {
	 private String status;
	    private String claimApprovalDate;

}
