package com.hexaware.careassist.service.serviceimpl;

import com.hexaware.careassist.entity.*;
import com.hexaware.careassist.repository.*;
import com.hexaware.careassist.security.AuthenticationResponse;
import com.hexaware.careassist.service.IEmailService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthenticationService {
    private final UserRepository userRepository;
    private final IPatientRepository patientRepository;
    private final IHealthcareProviderRepository healthcareProviderRepository;
    private final IInsuranceCompanyRepository insuranceCompanyRepository;
    private final IAdministratorRepository administratorRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    private IEmailService emailService;
    
    @Autowired
    public void setEmailService(IEmailService emailService) {
        this.emailService = emailService;
    }
    
    @Autowired
    public AuthenticationService(UserRepository userRepository,
                                 IPatientRepository patientRepository,
                                 IHealthcareProviderRepository healthcareProviderRepository,
                                 IInsuranceCompanyRepository insuranceCompanyRepository,
                                 IAdministratorRepository administratorRepository,
                                 PasswordEncoder passwordEncoder,
                                 JwtService jwtService,
                                 AuthenticationManager authenticationManager) {
        this.userRepository = userRepository;
        this.patientRepository = patientRepository;
        this.healthcareProviderRepository = healthcareProviderRepository;
        this.insuranceCompanyRepository = insuranceCompanyRepository;
        this.administratorRepository = administratorRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
        this.authenticationManager = authenticationManager;
    }

    public String register(User request) {
        // Check if user already exists. If exists, then authenticate the user
        if (userRepository.findByUsername(request.getUsername()).isPresent()) {
            return "User already exists";
        }

        User user = new User();
        user.setUsername(request.getUsername());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setEmail(request.getEmail());
        user.setRole(request.getRole());

        user = userRepository.save(user);


        switch (user.getRole()) {
            case PATIENT:
                createPatient(user.getId(), request.getEmail());
                break;
        }

        String subject = "Registration Successful";
        String body = "Dear " + request.getUsername() + ",\n\nThank you for registering with CareAssist.";
        emailService.sendEmail(request.getEmail(), subject, body);
        

        return "User registration was successful";
    }

    private void createPatient(Integer id, String email) {
        // Create a new Patient entity and associate it with the user
        Patient patient = new Patient();
        patient.setUserId(id);
        // Set other patient details as needed

        // Save the new patient entity
        patientRepository.save(patient);
    }

    

    public AuthenticationResponse authenticate(User request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getUsername(),
                        request.getPassword()
                )
        );

        User user = userRepository.findByUsername(request.getUsername())
                .orElseThrow(() -> new UsernameNotFoundException("User not found with username: " + request.getUsername()));

        String jwt = jwtService.generateToken(user);

        return new AuthenticationResponse(jwt, "User login was successful", user.getUsername(), user.getRole(), user.getId());
    }

}