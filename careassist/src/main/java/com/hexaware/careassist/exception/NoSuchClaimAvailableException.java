package com.hexaware.careassist.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value=HttpStatus.BAD_REQUEST)
public class NoSuchClaimAvailableException extends RuntimeException {
	public NoSuchClaimAvailableException(String message) {
		super(message);
	}


}
