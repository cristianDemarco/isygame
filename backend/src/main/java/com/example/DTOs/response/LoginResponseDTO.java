package com.example.DTOs.response;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.Data;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class LoginResponseDTO {
    private String token;
    private long expiresIn;
    private String refreshToken;
}
