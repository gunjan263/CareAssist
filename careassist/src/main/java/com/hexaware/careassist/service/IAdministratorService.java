package com.hexaware.careassist.service;

import java.util.List;



import org.springframework.stereotype.Service;


import com.hexaware.careassist.dto.AdministratorDto;
import com.hexaware.careassist.entity.Administrator;
import com.hexaware.careassist.exception.ProfileUpdationFailedException;
import com.hexaware.careassist.exception.ResourceNotFoundException;


import jakarta.validation.Valid;

@Service
public interface IAdministratorService {

	List<Administrator> getAllAdministrators() throws ResourceNotFoundException;

	Administrator getAdministratorById(Long id) throws ResourceNotFoundException;

	Administrator addAdministrator(Administrator administrator);

	Administrator updateAdministrator(Long id, Administrator updatedAdministrator)
			throws ProfileUpdationFailedException, ResourceNotFoundException;

	void deleteAdministrator(Long id) throws ResourceNotFoundException, ProfileUpdationFailedException;
}
