package com.hexaware.careassist.service.serviceimpl;

import com.hexaware.careassist.dto.PatientDto;

import com.hexaware.careassist.entity.InsurancePlan;
import com.hexaware.careassist.entity.Patient;

import com.hexaware.careassist.exception.NoSuchPatientInsuranceFoundException;
import com.hexaware.careassist.exception.ProfileUpdationFailedException;
import com.hexaware.careassist.exception.ResourceNotFoundException;
import com.hexaware.careassist.exception.UserAlreadyExistsException;

import com.hexaware.careassist.mapper.PatientMapper;
import com.hexaware.careassist.repository.IInsurancePlanRepository;
import com.hexaware.careassist.repository.IPatientRepository;
import com.hexaware.careassist.service.IPatientService;

import jakarta.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class PatientServiceImpl implements IPatientService {

	@Autowired
	private IPatientRepository patientRepository;

	@Autowired
	private IInsurancePlanRepository insurancePlanRepository;

	@Override
	public PatientDto registerPatient(PatientDto patientDto) throws UserAlreadyExistsException {
		Patient patient = PatientMapper.toEntity(patientDto);
		patient = patientRepository.save(patient);
		return PatientMapper.toDto(patient);
	}

	@Override
	public List<PatientDto> getAllPatients() {
		List<Patient> patients = patientRepository.findAll();
		return patients.stream().map(PatientMapper::toDto).collect(Collectors.toList());
	}

	@Override
	public PatientDto getPatientById(Long id) throws ResourceNotFoundException {
		Patient patient = patientRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Patient","id" , id));
		return PatientMapper.toDto(patient);
	}

	@Override
	public PatientDto updatePatient(Long id, PatientDto updatedPatientDto) throws ProfileUpdationFailedException {
		Patient existingPatient = patientRepository.findById(id)
				.orElseThrow(() -> new ProfileUpdationFailedException("Patient not found with id: " + id));

		existingPatient.setFirstName(updatedPatientDto.getFirstName());
		existingPatient.setLastName(updatedPatientDto.getLastName());
		existingPatient.setEmail(updatedPatientDto.getEmail());
		existingPatient.setPhoneNumber(updatedPatientDto.getPhoneNumber());
		existingPatient.setAddress(updatedPatientDto.getAddress());
		existingPatient.setDateOfBirth(updatedPatientDto.getDateOfBirth());
		existingPatient.setGender(updatedPatientDto.getGender());
		existingPatient.setSymptoms(updatedPatientDto.getSymptoms());

		existingPatient = patientRepository.save(existingPatient);
		return PatientMapper.toDto(existingPatient);
	}
	
	@Override
	public PatientDto updatePatientByUserID(Integer userId, PatientDto updatedPatientDto) throws ProfileUpdationFailedException {
		Patient existingPatient = patientRepository.findByUserId(userId);

		existingPatient.setFirstName(updatedPatientDto.getFirstName());
		existingPatient.setLastName(updatedPatientDto.getLastName());
		existingPatient.setEmail(updatedPatientDto.getEmail());
		existingPatient.setPhoneNumber(updatedPatientDto.getPhoneNumber());
		existingPatient.setAddress(updatedPatientDto.getAddress());
		existingPatient.setDateOfBirth(updatedPatientDto.getDateOfBirth());
		existingPatient.setGender(updatedPatientDto.getGender());
		existingPatient.setSymptoms(updatedPatientDto.getSymptoms());

		existingPatient = patientRepository.save(existingPatient);
		return PatientMapper.toDto(existingPatient);
	}

	@Override
	public void deletePatient(Long id){
		patientRepository.deleteById(id);
	}

	@Override
	@Transactional
	public void selectInsurancePlanForPatient(Long patientId, Long insurancePlanId)
			throws ResourceNotFoundException {
		patientRepository.selectInsurancePlanForPatient(patientId, insurancePlanId);
	}

	@Override
	public List<Long> findInsurancePlanIdsByPatientId(Long patientId)
			throws NoSuchPatientInsuranceFoundException {
		List<Long> insurancePlanIds = patientRepository.findInsurancePlanIdsByPatientId(patientId);

		if (insurancePlanIds.isEmpty()) {
			throw new NoSuchPatientInsuranceFoundException("No insurance plans found for patient with ID: " + patientId);
		}

		return insurancePlanIds;
	}

	@Override
	public List<InsurancePlan> findInsurancePlansDetailsByPatientId(Long patientId)
			throws NoSuchPatientInsuranceFoundException{
		List<Long> insurancePlanIds = patientRepository.findInsurancePlanIdsByPatientId(patientId);

		if (insurancePlanIds.isEmpty()) {
			throw new NoSuchPatientInsuranceFoundException("No insurance plans found for patient with ID: " + patientId);
		}

		List<InsurancePlan> insurancePlans = insurancePlanRepository.findAllById(insurancePlanIds);

		return insurancePlans;
	}

	
	@Override
    public Patient getByUserId(Integer userId) {
        return patientRepository.findByUserId(userId);
    }

}