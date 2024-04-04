package com.hexaware.careassist.service;

import com.hexaware.careassist.dto.HealthcareProviderDto;
import com.hexaware.careassist.exception.ProfileUpdationFailedException;
import com.hexaware.careassist.exception.ResourceNotFoundException;


import java.util.List;

public interface IHealthcareProviderService {

	HealthcareProviderDto registerHealthcareProvider(HealthcareProviderDto providerDto);

	List<HealthcareProviderDto> getAllHealthcareProviders() throws ResourceNotFoundException;

	HealthcareProviderDto getHealthcareProviderById(Long id) throws ResourceNotFoundException;

	HealthcareProviderDto updateHealthcareProvider(Long id, HealthcareProviderDto updatedProviderDto)
			throws ProfileUpdationFailedException, ResourceNotFoundException;

	void deleteHealthcareProvider(Long id);
}
