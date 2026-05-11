package com.example.exception;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

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
}
