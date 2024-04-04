package com.hexaware.careassist.controller;
import com.hexaware.careassist.entity.Administrator;


import com.hexaware.careassist.service.IAdministratorService;
import com.hexaware.careassist.exception.ProfileUpdationFailedException;
import com.hexaware.careassist.exception.ResourceNotFoundException;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
//import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/careassist/api/administrators")
@CrossOrigin("http://localhost:5173")
public class AdminController {

	@Autowired
    private IAdministratorService administratorService;

    @GetMapping("/get/all")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<List<Administrator>> getAllAdministrators() throws ResourceNotFoundException {
        List<Administrator> administrators = administratorService.getAllAdministrators();
        return new ResponseEntity<>(administrators, HttpStatus.OK);
    }

    @GetMapping("/get/{id}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<Administrator> getAdministratorById(@PathVariable Long id) throws ResourceNotFoundException {
        Administrator administrator = administratorService.getAdministratorById(id);
        return new ResponseEntity<>(administrator, HttpStatus.OK);
    }

    @PostMapping("/add/admin")
   @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<Administrator> addAdministrator(@RequestBody Administrator administrator) {
        Administrator newAdministrator = administratorService.addAdministrator(administrator);
        return new ResponseEntity<>(newAdministrator, HttpStatus.CREATED);
    }

    @PutMapping("/update/{id}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<Administrator> updateAdministrator(@PathVariable Long id, @RequestBody Administrator updatedAdministrator) throws ProfileUpdationFailedException, ResourceNotFoundException {
        Administrator administrator;
        try {
            administrator = administratorService.updateAdministrator(id, updatedAdministrator);
        } catch (ProfileUpdationFailedException ex) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return new ResponseEntity<>(administrator, HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<Void> deleteAdministrator(@PathVariable Long id) throws ProfileUpdationFailedException, ResourceNotFoundException {
        try {
            administratorService.deleteAdministrator(id);
        } catch (ProfileUpdationFailedException ex) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
