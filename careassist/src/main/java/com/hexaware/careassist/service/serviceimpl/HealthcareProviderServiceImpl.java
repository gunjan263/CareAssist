package com.hexaware.careassist.service.serviceimpl;

import com.hexaware.careassist.dto.HealthcareProviderDto;

import com.hexaware.careassist.entity.HealthcareProvider;
import com.hexaware.careassist.exception.ProfileUpdationFailedException;
import com.hexaware.careassist.exception.ResourceNotFoundException;
import com.hexaware.careassist.mapper.HealthcareProviderMapper;
import com.hexaware.careassist.repository.IHealthcareProviderRepository;
import com.hexaware.careassist.service.IHealthcareProviderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class HealthcareProviderServiceImpl implements IHealthcareProviderService {

	@Autowired
	private IHealthcareProviderRepository healthcareProviderRepository;

	@Override
	public HealthcareProviderDto registerHealthcareProvider(HealthcareProviderDto providerDto) {
		HealthcareProvider provider = HealthcareProviderMapper.toEntity(providerDto);
		provider = healthcareProviderRepository.save(provider);
		return HealthcareProviderMapper.toDto(provider);
	}

	@Override
	public List<HealthcareProviderDto> getAllHealthcareProviders() throws ResourceNotFoundException {
		List<HealthcareProvider> healthcareProviders = healthcareProviderRepository.findAll();
		List<HealthcareProviderDto> healthcareProviderDto = new ArrayList<>();
		for (HealthcareProvider healthcareProvider : healthcareProviders) {
			healthcareProviderDto.add(HealthcareProviderMapper.toDto(healthcareProvider));
		}
		return healthcareProviderDto;
	}

	@Override
	public HealthcareProviderDto getHealthcareProviderById(Long id) throws ResourceNotFoundException {
		HealthcareProvider provider = healthcareProviderRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Healthcare Provider","id", id));
		return HealthcareProviderMapper.toDto(provider);
	}

	@Override
	public HealthcareProviderDto updateHealthcareProvider(Long id, HealthcareProviderDto updatedProviderDto)
			throws ResourceNotFoundException, ProfileUpdationFailedException {
		try {
			HealthcareProvider existingProvider = healthcareProviderRepository.findById(id)
					.orElseThrow(() -> new ResourceNotFoundException("Healthcare Provider","id" , id));

			existingProvider.setProviderName(updatedProviderDto.getProviderName());
			existingProvider.setAddress(updatedProviderDto.getAddress());
			existingProvider.setEmail(updatedProviderDto.getEmail());

			existingProvider = healthcareProviderRepository.save(existingProvider);
			return HealthcareProviderMapper.toDto(existingProvider);
		} catch (Exception ex) {
			throw new ProfileUpdationFailedException("Failed to update healthcare provider with id: " + id);
		}
	}

	@Override
	public void deleteHealthcareProvider(Long id) {
		healthcareProviderRepository.deleteById(id);
	}

}
