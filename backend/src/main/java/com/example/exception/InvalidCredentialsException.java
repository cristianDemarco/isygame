package com.example.exception;

import org.springframework.http.HttpStatus;

public class InvalidCredentialsException extends BaseException{
    public InvalidCredentialsException(String message){
        super(message, "INVALID_CREDENTIALS", HttpStatus.UNAUTHORIZED);
    }
}
