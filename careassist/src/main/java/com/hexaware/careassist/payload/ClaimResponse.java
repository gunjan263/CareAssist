package com.hexaware.careassist.payload;

import com.hexaware.careassist.entity.Claim;
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
public class ClaimResponse {
    private Claim claim;
    private String pdfFileName;
}
