package com.hexaware.careassist.service.serviceimpl;

import com.hexaware.careassist.dto.InsuranceCompanyDto;
import com.hexaware.careassist.entity.InsuranceCompany;

import com.hexaware.careassist.exception.ProfileUpdationFailedException;
import com.hexaware.careassist.exception.ResourceNotFoundException;
import com.hexaware.careassist.exception.UserAlreadyExistsException;

import com.hexaware.careassist.mapper.InsuranceCompanyMapper;
import com.hexaware.careassist.repository.IInsuranceCompanyRepository;
import com.hexaware.careassist.service.IInsuranceCompanyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class InsuranceCompanyServiceImpl implements IInsuranceCompanyService {

	@Autowired
	private IInsuranceCompanyRepository insuranceCompanyRepository;

	@Override
	public InsuranceCompanyDto registerInsuranceCompany(InsuranceCompanyDto insuranceCompanyDto)
			throws UserAlreadyExistsException {
		InsuranceCompany insuranceCompany = InsuranceCompanyMapper.toEntity(insuranceCompanyDto);
		insuranceCompany = insuranceCompanyRepository.save(insuranceCompany);
		return InsuranceCompanyMapper.toDto(insuranceCompany);
	}

	@Override
	public List<InsuranceCompanyDto> getAllInsuranceCompanies() {
		List<InsuranceCompany> insuranceCompanies = insuranceCompanyRepository.findAll();
		return insuranceCompanies.stream().map(InsuranceCompanyMapper::toDto).collect(Collectors.toList());
	}

	@Override
	public InsuranceCompanyDto getInsuranceCompanyById(Long id) throws ResourceNotFoundException {
		InsuranceCompany insuranceCompany = insuranceCompanyRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Insurance Company","id", id));
		return InsuranceCompanyMapper.toDto(insuranceCompany);
	}

	@Override
	public InsuranceCompanyDto updateInsuranceCompany(Long id, InsuranceCompanyDto updatedInsuranceCompanyDto)
			throws ProfileUpdationFailedException, ResourceNotFoundException {
		try {
			InsuranceCompany existingInsuranceCompany = insuranceCompanyRepository.findById(id)
					.orElseThrow(() -> new ResourceNotFoundException("Insurance Company","id" , id));

			existingInsuranceCompany.setCompanyName(updatedInsuranceCompanyDto.getCompanyName());
			existingInsuranceCompany.setEmail(updatedInsuranceCompanyDto.getEmail());

			existingInsuranceCompany = insuranceCompanyRepository.save(existingInsuranceCompany);
			return InsuranceCompanyMapper.toDto(existingInsuranceCompany);
		} catch (Exception ex) {
			throw new ProfileUpdationFailedException("Failed to update insurance company with id: " + id);
		}
	}

	@Override
	public void deleteInsuranceCompany(Long id){
		insuranceCompanyRepository.deleteById(id);
	}

	public InsuranceCompany findCompanyById(Long companyId) throws ResourceNotFoundException {
		Optional<InsuranceCompany> optionalCompany = insuranceCompanyRepository.findById(companyId);
		return optionalCompany.orElseThrow(() -> new ResourceNotFoundException("Company","id",  companyId));
	}
}