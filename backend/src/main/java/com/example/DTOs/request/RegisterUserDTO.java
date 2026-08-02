package com.example.DTOs.request;

import lombok.Data;

@Data
public class RegisterUserDTO {
    private String email;
    private String nickname;
    private String password;
}
