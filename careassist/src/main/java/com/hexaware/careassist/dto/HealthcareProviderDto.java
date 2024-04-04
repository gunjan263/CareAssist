package com.hexaware.careassist.dto;


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
public class HealthcareProviderDto {
    private Long providerId;
    private String providerName;
    private String address;
    private String email;
}

