package com.example.DTOs.request;

import lombok.Data;

@Data
public class LoginUserDTO {
    private String email;
    private String password;
}
