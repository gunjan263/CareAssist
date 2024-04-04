package com.hexaware.careassist.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value=HttpStatus.BAD_REQUEST)
public class NoSuchPatientInsuranceFoundException extends RuntimeException {
	
	public NoSuchPatientInsuranceFoundException(String message) {
		super(message);
	}

}
