package com.example.exception;

import org.springframework.http.HttpStatus;

public class RefreshTokenExpiredException extends BaseException{
    public RefreshTokenExpiredException(String message){
        super(message, "UNAUTHORIZED", HttpStatus.UNAUTHORIZED);
    }
}
