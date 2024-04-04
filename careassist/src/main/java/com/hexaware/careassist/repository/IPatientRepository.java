package com.hexaware.careassist.repository;

import com.hexaware.careassist.dto.PatientDto;

import com.hexaware.careassist.entity.Patient;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface IPatientRepository extends JpaRepository<Patient, Long> {
    Optional<Patient> findByEmail(String email);
    Optional<Patient> findByPatientId(Long patientId);
    Patient findByUserId(Integer userId);
    
    
    @Modifying
    @Transactional
    @Query(value = "INSERT INTO patient_insurance_plan (patient_id, insurance_plan_id) VALUES (:patientId, :insurancePlanId)", nativeQuery = true)
    void selectInsurancePlanForPatient(@Param("patientId") Long patientId, @Param("insurancePlanId") Long insurancePlanId);
    
    @Query(value = "SELECT insurance_plan_id FROM patient_insurance_plan WHERE patient_id = :patientId", nativeQuery = true)
    List<Long> findInsurancePlanIdsByPatientId(@Param("patientId") Long patientId);

    @Query(value = "SELECT ip.insurance_plan_id FROM patient_insurance_plan ip JOIN insurance_plans i ON ip.insurance_plan_id = i.plan_id WHERE ip.patient_id = :patientId", nativeQuery = true)
    List<Long> findInsurancePlanDetailsIdsByPatientId(@Param("patientId") Long patientId);
    
    

}