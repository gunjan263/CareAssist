package com.hexaware.careassist.repository;

import com.hexaware.careassist.entity.InsurancePlan;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IInsurancePlanRepository extends JpaRepository<InsurancePlan, Long> {
    InsurancePlan findByPlanName(String planName);
}