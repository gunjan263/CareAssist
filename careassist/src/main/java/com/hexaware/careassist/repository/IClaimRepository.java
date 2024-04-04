package com.hexaware.careassist.repository;

import com.hexaware.careassist.entity.Claim;
import com.hexaware.careassist.entity.Claim.ClaimStatus;
import com.hexaware.careassist.entity.Patient;

import jakarta.transaction.Transactional;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface IClaimRepository extends JpaRepository<Claim, Long> {
	List<Claim> findByPatientPatientId(Long patientId);
	
	@Transactional
	@Modifying
	@Query("UPDATE Claim c SET c.status = :status, c.claimApprovalDate = :approvalDate WHERE c.claimId = :id")
	void updateClaimStatus(@Param("id") Long id, @Param("status") ClaimStatus status,
			@Param("approvalDate") String approvalDate);

	@Query(value = "SELECT * FROM Claims c WHERE c.claim_status = :claimStatus AND c.patient_id = :patientId", nativeQuery = true)
	public List<Claim> getClaimByStatus(@Param("claimStatus") String claimStatus, @Param("patientId") Long patientId);
	
	
	List<Claim> findByPatient(Patient patient);
}
