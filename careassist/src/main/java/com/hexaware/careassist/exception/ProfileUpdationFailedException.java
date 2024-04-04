package com.hexaware.careassist.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value=HttpStatus.NOT_MODIFIED)
public class ProfileUpdationFailedException extends Exception{
	
	private static final long serialVersionUID = 1L;

	public ProfileUpdationFailedException(String message) {
        super(message);
    }

}
