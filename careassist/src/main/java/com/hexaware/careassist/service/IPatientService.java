package com.hexaware.careassist.service;

import com.hexaware.careassist.dto.PatientDto;

import com.hexaware.careassist.entity.InsurancePlan;
import com.hexaware.careassist.entity.Patient;
import com.hexaware.careassist.exception.NoSuchPatientInsuranceFoundException;
import com.hexaware.careassist.exception.ProfileUpdationFailedException;
import com.hexaware.careassist.exception.ResourceNotFoundException;
import com.hexaware.careassist.exception.UserAlreadyExistsException;


import java.util.List;
import java.util.Optional;

public interface IPatientService {
	PatientDto registerPatient(PatientDto patientDto) throws UserAlreadyExistsException;

	List<PatientDto> getAllPatients();

	PatientDto getPatientById(Long id) throws ResourceNotFoundException;

	PatientDto updatePatient(Long id, PatientDto updatedPatientDto) throws ProfileUpdationFailedException;

	void deletePatient(Long id);

	void selectInsurancePlanForPatient(Long patientId, Long insurancePlanId)
			throws ResourceNotFoundException;

	List<InsurancePlan> findInsurancePlansDetailsByPatientId(Long patientId)
			throws NoSuchPatientInsuranceFoundException;

	List<Long> findInsurancePlanIdsByPatientId(Long patientId)
			throws NoSuchPatientInsuranceFoundException;
	
	Patient getByUserId(Integer userId);

	PatientDto updatePatientByUserID(Integer userId, PatientDto updatedPatientDto) throws ProfileUpdationFailedException;


}