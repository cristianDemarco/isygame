package com.example.DTOs.response;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.Data;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class AuthResponseDTO {
    private String token;
    private long expiresIn;
    private String refreshToken;
}
