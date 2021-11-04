package com.crdl.resume.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_FOUND)   //throw 404 error
public class NotFoundException extends RuntimeException{
    public NotFoundException(String message){
        super(message);
    }
}
