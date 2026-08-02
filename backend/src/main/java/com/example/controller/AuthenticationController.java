package com.example.controller;

import com.example.DTOs.response.LoginResponseDTO;
import com.example.DTOs.request.LoginUserDTO;
import com.example.DTOs.request.RefreshTokenDTO;
import com.example.DTOs.request.RegisterUserDTO;
import com.example.model.RefreshToken;
import com.example.model.User;
import com.example.service.AuthenticationService;
import org.springframework.security.core.Authentication;
import com.example.service.JwtService;
import com.example.service.RefreshTokenService;

import java.net.http.HttpResponse;
import java.time.Instant;
import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequestMapping("/auth")
@RestController
public class AuthenticationController {
    private final JwtService jwtService;
    private final AuthenticationService authenticationService;
    private final RefreshTokenService refreshTokenService;

    public AuthenticationController(JwtService jwtService, AuthenticationService authenticationService, RefreshTokenService refreshTokenService) {
        this.jwtService = jwtService;
        this.authenticationService = authenticationService;
        this.refreshTokenService = refreshTokenService;
    }

    @PostMapping("/signup")
    public ResponseEntity<User> register(@RequestBody RegisterUserDTO registerUserDTO) {
        User registeredUser = authenticationService.signup(registerUserDTO);

        return ResponseEntity.ok(registeredUser);
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponseDTO> login(@RequestBody LoginUserDTO loginUserDTO) {
        User authenticatedUser = authenticationService.authenticate(loginUserDTO);
        RefreshToken refreshToken = refreshTokenService.generateRefreshToken(authenticatedUser.getEmail());

        LoginResponseDTO loginResponse = authenticationService.createAuthResponse(refreshToken);

        return ResponseEntity.ok(loginResponse);
    }

    @PostMapping("/refreshtoken")
    public ResponseEntity<?> refreshToken(@RequestBody RefreshTokenDTO refreshTokenDTO) {
        Optional<RefreshToken> optionalToken = refreshTokenService.getRefreshTokenByTokenString(refreshTokenDTO.getToken());
        
        if(optionalToken.isEmpty()){
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Refresh token not valid or doesn't exist.");
        }

        RefreshToken refreshToken = optionalToken.get();

        if(refreshToken.getExpiryDate().isBefore(Instant.now())){
            refreshTokenService.deleteRefreshToken(refreshToken);
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Refresh token expired. Log in again.");
        }
        refreshTokenService.updateRefreshToken(refreshToken);

        LoginResponseDTO loginResponse = authenticationService.createAuthResponse(refreshToken);

        return ResponseEntity.ok(loginResponse);
    }
}
