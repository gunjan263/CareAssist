package com.hexaware.careassist.service.serviceimpl;

import com.hexaware.careassist.dto.InsurancePlanDto;
import com.hexaware.careassist.entity.InsurancePlan;
import com.hexaware.careassist.exception.NoSuchPlanAvailableException;
import com.hexaware.careassist.exception.ProfileUpdationFailedException;
import com.hexaware.careassist.exception.ResourceNotFoundException;
import com.hexaware.careassist.mapper.InsurancePlanMapper;
import com.hexaware.careassist.repository.IInsurancePlanRepository;
import com.hexaware.careassist.service.IInsurancePlanService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class InsurancePlanServiceImpl implements IInsurancePlanService {

	@Autowired
	private IInsurancePlanRepository insurancePlanRepository;

	@Override
	public InsurancePlanDto addInsurancePlan(InsurancePlanDto insurancePlanDto) {
		InsurancePlan insurancePlan = InsurancePlanMapper.toEntity(insurancePlanDto);
		insurancePlan = insurancePlanRepository.save(insurancePlan);
		return InsurancePlanMapper.toDto(insurancePlan);
	}

	@Override
	public List<InsurancePlanDto> getAllInsurancePlans() {
		List<InsurancePlan> insurancePlans = insurancePlanRepository.findAll();
		return insurancePlans.stream().map(InsurancePlanMapper::toDto).collect(Collectors.toList());
	}

	// Get insurance plan by name
	@Override
	public InsurancePlanDto getPlanByName(String planName) throws NoSuchPlanAvailableException {
		InsurancePlan insurancePlan = insurancePlanRepository.findByPlanName(planName);
		return InsurancePlanMapper.toDto(insurancePlan);
	}

	@Override
	public InsurancePlanDto getInsurancePlanById(Long id) throws ResourceNotFoundException {
		InsurancePlan insurancePlan = insurancePlanRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Insurance plan","id", id));
		return InsurancePlanMapper.toDto(insurancePlan);
	}

	@Override
	public InsurancePlanDto updateInsurancePlan(Long id, InsurancePlanDto updatedPlanDto)
			throws ProfileUpdationFailedException, ResourceNotFoundException {
		InsurancePlan existingPlan = insurancePlanRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Insurance plan","id" , id));

		existingPlan.setPlanName(updatedPlanDto.getPlanName());
        existingPlan.setPlanDescription(updatedPlanDto.getPlanDescription());
        existingPlan.setCoverageAmount(updatedPlanDto.getCoverageAmount());
        existingPlan.setPremium(updatedPlanDto.getPremium());
        existingPlan.setPlanHighlights(updatedPlanDto.getPlanHighlights());
        existingPlan.setValidityPeriod(updatedPlanDto.getValidityPeriod());


		existingPlan = insurancePlanRepository.save(existingPlan);
		return InsurancePlanMapper.toDto(existingPlan);
	}

	@Override
	public void deleteInsurancePlan(Long id) {
		insurancePlanRepository.deleteById(id);
	}


}