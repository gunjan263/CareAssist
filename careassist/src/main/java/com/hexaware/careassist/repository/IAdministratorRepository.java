package com.hexaware.careassist.repository;

import org.springframework.data.jpa.repository.JpaRepository;


import com.hexaware.careassist.entity.Administrator;


public interface IAdministratorRepository extends JpaRepository<Administrator, Long>{

}
