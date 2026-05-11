package com.example.exception;

import org.springframework.http.HttpStatus;

public class BadUserInputException extends BaseException{
    public BadUserInputException(String message){
        super(message, "BAD_USER_INPUT", HttpStatus.BAD_REQUEST);
    }
}
