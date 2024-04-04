package com.hexaware.careassist.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value=HttpStatus.BAD_REQUEST)
public class NoSuchPlanAvailableException extends Exception {
	public NoSuchPlanAvailableException(String message) {
		super(message);
	}

}
