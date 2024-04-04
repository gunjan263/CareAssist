package com.hexaware.careassist.service;

import com.hexaware.careassist.dto.InsuranceCompanyDto;

import com.hexaware.careassist.exception.ProfileUpdationFailedException;
import com.hexaware.careassist.exception.ResourceNotFoundException;
import com.hexaware.careassist.exception.UserAlreadyExistsException;


import java.util.List;

public interface IInsuranceCompanyService {

	InsuranceCompanyDto registerInsuranceCompany(InsuranceCompanyDto insuranceCompanyDto)
			throws UserAlreadyExistsException;

	List<InsuranceCompanyDto> getAllInsuranceCompanies();

	InsuranceCompanyDto getInsuranceCompanyById(Long id) throws ResourceNotFoundException;

	InsuranceCompanyDto updateInsuranceCompany(Long id, InsuranceCompanyDto updatedInsuranceCompanyDto)
			throws ProfileUpdationFailedException, ResourceNotFoundException;

	void deleteInsuranceCompany(Long id) ;
}