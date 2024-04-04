package com.hexaware.careassist.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value=HttpStatus.BAD_REQUEST)
public class UploadFailedException extends RuntimeException {
    private static final long serialVersionUID = 1L;

	public UploadFailedException(String message) {
        super(message);
    }
}
