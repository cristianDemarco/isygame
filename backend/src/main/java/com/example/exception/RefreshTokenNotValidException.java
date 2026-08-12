package com.example.exception;

import org.springframework.http.HttpStatus;

public class RefreshTokenNotValidException extends BaseException{
    public RefreshTokenNotValidException(String message){
        super(message, "UNAUTHORIZED", HttpStatus.UNAUTHORIZED);
    }
}
