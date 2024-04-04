package com.hexaware.careassist.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value=HttpStatus.BAD_REQUEST)
public class FileAlreadyExistsException extends Exception{
	
	public FileAlreadyExistsException(String message) {
		super(message);
	}

}
