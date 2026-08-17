package com.example.DTOs.response;

import java.util.List;

public record UserDTO(String email, String nickname, List<String> roles) {}
