package com.example.exception;

import org.springframework.http.HttpStatus;

public class UserNotFoundException extends BaseException{
    public UserNotFoundException(String message){
        super(message, "USER_NOT_FOUND", HttpStatus.NOT_FOUND);
    }
}
