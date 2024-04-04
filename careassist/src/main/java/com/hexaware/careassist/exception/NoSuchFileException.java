package com.hexaware.careassist.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value=HttpStatus.BAD_REQUEST)
public class NoSuchFileException extends Exception {
	
	public NoSuchFileException(String file) {
        super("PDF file not found at: " + file);
    }

}
