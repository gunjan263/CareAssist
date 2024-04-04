package com.hexaware.careassist.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hexaware.careassist.entity.InsuranceCompany;

public interface IInsuranceCompanyRepository extends JpaRepository<InsuranceCompany, Long>{
	InsuranceCompany findByCompanyName(String companyName);

}
