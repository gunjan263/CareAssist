package com.hexaware.careassist.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hexaware.careassist.entity.HealthcareProvider;

public interface IHealthcareProviderRepository extends JpaRepository<HealthcareProvider, Long>{

}
