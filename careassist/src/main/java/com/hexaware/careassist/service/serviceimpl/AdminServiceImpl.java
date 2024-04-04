package com.hexaware.careassist.service.serviceimpl;

import java.util.List;


import java.util.Optional;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import com.hexaware.careassist.dto.AdministratorDto;
import com.hexaware.careassist.dto.HealthcareProviderDto;
import com.hexaware.careassist.entity.Administrator;
import com.hexaware.careassist.entity.HealthcareProvider;
import com.hexaware.careassist.repository.IAdministratorRepository;
import com.hexaware.careassist.service.IAdministratorService;

import com.hexaware.careassist.exception.ProfileUpdationFailedException;

import com.hexaware.careassist.mapper.AdministratorMapper;
import com.hexaware.careassist.mapper.HealthcareProviderMapper;
import com.hexaware.careassist.exception.ResourceNotFoundException;


@Service
public class AdminServiceImpl implements IAdministratorService {

	@Autowired
    private IAdministratorRepository administratorRepository;

    @Override
    public Administrator getAdministratorById(Long id) throws ResourceNotFoundException {
        return administratorRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Administrator","id: ",id));
    }

    @Override
    public Administrator addAdministrator(Administrator administrator) {
        return administratorRepository.save(administrator);
    }

    @Override
    public Administrator updateAdministrator(Long id, Administrator updatedAdministrator) throws ProfileUpdationFailedException, ResourceNotFoundException {
        Administrator existingAdministrator = getAdministratorById(id);
        existingAdministrator.setEmail(updatedAdministrator.getEmail());
        existingAdministrator.setPhoneNumber(updatedAdministrator.getPhoneNumber());
        try {
            return administratorRepository.save(existingAdministrator);
        } catch (Exception ex) {
            throw new ProfileUpdationFailedException("Profile updation failed for Administrator with id: " + id);
        }
    }

    @Override
    public void deleteAdministrator(Long id) throws ProfileUpdationFailedException, ResourceNotFoundException {
        Administrator existingAdministrator = getAdministratorById(id);
        try {
            administratorRepository.delete(existingAdministrator);
        } catch (Exception ex) {
            throw new ProfileUpdationFailedException("Deletion failed for Administrator with id: " + id);
        }
    }

    @Override
    public List<Administrator> getAllAdministrators() {
        return administratorRepository.findAll();
    }
}
