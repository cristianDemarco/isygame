package com.example.controller;

import com.example.DTOs.response.AuthResponseDTO;
import com.example.DTOs.request.LoginUserDTO;
import com.example.DTOs.request.RefreshTokenDTO;
import com.example.DTOs.request.RegisterUserDTO;
import com.example.model.RefreshToken;
import com.example.model.User;
import com.example.service.AuthenticationService;
import com.example.service.RefreshTokenService;

import lombok.RequiredArgsConstructor;

import java.time.Instant;
import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequestMapping("/auth")
@RestController
@RequiredArgsConstructor
public class AuthenticationController {
    private final AuthenticationService authenticationService;
    private final RefreshTokenService refreshTokenService;

    @PostMapping("/signup")
    public ResponseEntity<User> register(@RequestBody RegisterUserDTO registerUserDTO) {
        User registeredUser = authenticationService.signup(registerUserDTO);

        return ResponseEntity.ok(registeredUser);
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponseDTO> login(@RequestBody LoginUserDTO loginUserDTO) {
        User authenticatedUser = authenticationService.authenticate(loginUserDTO);
        RefreshToken newRefreshToken;
        Optional<RefreshToken> refreshToken = refreshTokenService.getRefreshTokenByUser(authenticatedUser);

        if(refreshToken.isPresent()){
            newRefreshToken = refreshTokenService.updateRefreshToken(refreshToken.get());
        } else {
            newRefreshToken = refreshTokenService.generateRefreshToken(authenticatedUser);
        }
        AuthResponseDTO loginResponse = authenticationService.createAuthResponse(newRefreshToken);

        return ResponseEntity.ok(loginResponse);
    }

    @PostMapping("/refreshtoken")
    public ResponseEntity<?> refreshToken(@RequestBody RefreshTokenDTO refreshTokenDTO) {
        Optional<RefreshToken> optionalToken = refreshTokenService.getRefreshTokenByTokenString(refreshTokenDTO.getRefreshToken());
        
        if(optionalToken.isEmpty()){
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Refresh token not valid or doesn't exist.");
        }

        RefreshToken refreshToken = optionalToken.get();

        if(refreshToken.getExpiryDate().isBefore(Instant.now())){
            refreshTokenService.deleteRefreshToken(refreshToken);
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Refresh token expired. Log in again.");
        }
        refreshTokenService.updateRefreshToken(refreshToken);

        AuthResponseDTO loginResponse = authenticationService.createAuthResponse(refreshToken);

        return ResponseEntity.ok(loginResponse);
    }
}
