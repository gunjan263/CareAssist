package com.hexaware.careassist.service;

import com.hexaware.careassist.dto.InsurancePlanDto;
import com.hexaware.careassist.exception.NoSuchPlanAvailableException;
import com.hexaware.careassist.exception.ProfileUpdationFailedException;
import com.hexaware.careassist.exception.ResourceNotFoundException;

import java.util.List;

public interface IInsurancePlanService {
	InsurancePlanDto addInsurancePlan(InsurancePlanDto insurancePlanDto);

	List<InsurancePlanDto> getAllInsurancePlans();

	InsurancePlanDto getInsurancePlanById(Long id) throws ResourceNotFoundException;

	InsurancePlanDto updateInsurancePlan(Long id, InsurancePlanDto updatedPlanDto)
			throws ResourceNotFoundException, ProfileUpdationFailedException;

	void deleteInsurancePlan(Long id);

	InsurancePlanDto getPlanByName(String planName) throws NoSuchPlanAvailableException;
}
