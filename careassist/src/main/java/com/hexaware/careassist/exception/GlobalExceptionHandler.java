package com.hexaware.careassist.exception;

import java.time.LocalDateTime;




import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;




@ControllerAdvice
public class GlobalExceptionHandler extends ResponseEntityExceptionHandler{

	@ExceptionHandler(ResourceNotFoundException.class)
	public ResponseEntity<ErrorDetails> handleResourceNotFoundException(ResourceNotFoundException ex, WebRequest w) {
	    ErrorDetails e = new ErrorDetails(LocalDateTime.now(), ex.getMessage(), w.getDescription(false), "Resource Not Found");
	    return new ResponseEntity<>(e, HttpStatus.NOT_FOUND);
	}


    @ExceptionHandler(ClaimSubmissionFailedException.class)
    public ResponseEntity<ErrorDetails> handleClaimSubmissionFailedException(ClaimSubmissionFailedException ex, WebRequest w) {
    	ErrorDetails e=new ErrorDetails(LocalDateTime.now(),ex.getMessage(),w.getDescription(false),"Claim Submission has Failed");
        return new ResponseEntity<>(e,HttpStatus.INTERNAL_SERVER_ERROR);
        
    }

    @ExceptionHandler(UserAlreadyExistsException.class)
    public ResponseEntity<ErrorDetails> handleUserAlreadyExistsException(UserAlreadyExistsException ex, WebRequest w) {
    	ErrorDetails e=new ErrorDetails(LocalDateTime.now(),ex.getMessage(),w.getDescription(false),"User Already Exists");
    	return new ResponseEntity<>(e,HttpStatus.FOUND);
    }

   
    @ExceptionHandler(InvalidUsernameOrPasswordException.class)
    public ResponseEntity<ErrorDetails> handleInvalidUsernameOrPasswordException(InvalidUsernameOrPasswordException ex, WebRequest w) {
    	ErrorDetails e=new ErrorDetails(LocalDateTime.now(),ex.getMessage(),w.getDescription(false),"Invalid Username or Password");
    	return new ResponseEntity<>(e,HttpStatus.NOT_ACCEPTABLE);
    }

    @ExceptionHandler(ProfileUpdationFailedException.class)
    public ResponseEntity<ErrorDetails> handleProfileUpdationFailedException(ProfileUpdationFailedException ex, WebRequest w) {
    	ErrorDetails e=new ErrorDetails(LocalDateTime.now(),ex.getMessage(),w.getDescription(false),"Updation has Failed");
    	return new ResponseEntity<>(e,HttpStatus.NOT_MODIFIED);
    }

  

    @ExceptionHandler(UploadFailedException.class)
    public ResponseEntity<ErrorDetails> handleUploadFailedException(UploadFailedException ex, WebRequest w) {
    	ErrorDetails e=new ErrorDetails(LocalDateTime.now(),ex.getMessage(),w.getDescription(false),"Uploading pdf has failed");
    	return new ResponseEntity<>(e,HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(NoSuchPatientInsuranceFoundException.class)
    public ResponseEntity<ErrorDetails> handleNoSuchPatientInsuranceFoundException(NoSuchPatientInsuranceFoundException ex, WebRequest w) {
    	ErrorDetails e=new ErrorDetails(LocalDateTime.now(),ex.getMessage(),w.getDescription(false),"No such insurance plan is found for the patient");
    	return new ResponseEntity<>(e,HttpStatus.BAD_REQUEST);
    }
    
    @ExceptionHandler(NoSuchClaimAvailableException.class)
    public ResponseEntity<ErrorDetails> handleNoSuchClaimAvailableException(NoSuchClaimAvailableException ex, WebRequest w) {
    	ErrorDetails e=new ErrorDetails(LocalDateTime.now(),ex.getMessage(),w.getDescription(false),"No such Claim is available");
    	return new ResponseEntity<>(e,HttpStatus.BAD_REQUEST);
    }
    
    @ExceptionHandler(InvoiceGenerationFailedException.class)
    public ResponseEntity<ErrorDetails> handleInvoiceGenerationFailedException(InvoiceGenerationFailedException ex, WebRequest w) {
    	ErrorDetails e=new ErrorDetails(LocalDateTime.now(),ex.getMessage(),w.getDescription(false),"Generating Invoice is not performed");
    	return new ResponseEntity<>(e,HttpStatus.BAD_REQUEST);
    }
    
    @ExceptionHandler(FileAlreadyExistsException.class)
    public ResponseEntity<ErrorDetails> handleFileAlreadyExistsException(FileAlreadyExistsException ex, WebRequest w) {
    	ErrorDetails e=new ErrorDetails(LocalDateTime.now(),ex.getMessage(),w.getDescription(false),"File already exists");
    	return new ResponseEntity<>(e,HttpStatus.BAD_REQUEST);
    }
    
    @ExceptionHandler(NoSuchFileException.class)
    public ResponseEntity<ErrorDetails> handleNoSuchFileException(NoSuchFileException ex, WebRequest w) {
    	ErrorDetails e=new ErrorDetails(LocalDateTime.now(),ex.getMessage(),w.getDescription(false),"No such file found at specified path");
    	return new ResponseEntity<>(e,HttpStatus.BAD_REQUEST);
    }
    
    @ExceptionHandler(NoSuchPlanAvailableException.class)
    public ResponseEntity<ErrorDetails> handleNoSuchPlanAvailableException(NoSuchPlanAvailableException ex, WebRequest w) {
    	ErrorDetails e=new ErrorDetails(LocalDateTime.now(),ex.getMessage(),w.getDescription(false),"No such Plan is available");
    	return new ResponseEntity<>(e,HttpStatus.BAD_REQUEST);
    }
   

}
