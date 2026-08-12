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
        return ResponseEntity.ok(authenticationService.login(loginUserDTO));
    }

    @PostMapping("/refresh")
    public ResponseEntity<?> refreshToken(@RequestBody RefreshTokenDTO refreshTokenDTO) {
        RefreshToken refreshToken = refreshTokenService.processRefreshToken(refreshTokenDTO);
        return ResponseEntity.ok(authenticationService.createAuthResponse(refreshToken));
    }
}
