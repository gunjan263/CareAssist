package com.hexaware.careassist;

import org.modelmapper.ModelMapper;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class CareassistApplication {

	public static void main(String[] args) {
		SpringApplication.run(CareassistApplication.class, args);
	}
	
	@Bean
    public ModelMapper getModelMapper() { 
        return new ModelMapper(); 
    } 

}
