package com.example.exception;

import jakarta.servlet.http.HttpServletRequest;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.JwtException;

import java.time.Instant;

@RestControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler(BaseException.class)
    public ResponseEntity<ApiErrorResponse> handleBaseException(BaseException ex, HttpServletRequest request) {
        ApiErrorResponse error = new ApiErrorResponse();
        error.setErrorCode(ex.getErrorCode());
        error.setMessage((ex.getMessage()));
        error.setStatus(ex.getStatus().value());
        error.setTimestamp(Instant.now());
        error.setPath((request.getRequestURI()));
        return new ResponseEntity<>(error, ex.getStatus());
    }

    @ExceptionHandler({ExpiredJwtException.class, JwtException.class})
    public ResponseEntity<ApiErrorResponse> handleJwtException(Exception ex, HttpServletRequest request) {
        ApiErrorResponse error = new ApiErrorResponse();
        
        if (ex instanceof ExpiredJwtException) {
            error.setErrorCode("TOKEN_EXPIRED");
            error.setMessage("Il token JWT è scaduto");
        } else {
            error.setErrorCode("INVALID_TOKEN");
            error.setMessage("Token JWT non valido");
        }
        
        error.setStatus(HttpStatus.UNAUTHORIZED.value());
        error.setTimestamp(Instant.now());
        error.setPath(request.getRequestURI());

        return new ResponseEntity<>(error, HttpStatus.UNAUTHORIZED);
    }
}
