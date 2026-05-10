package com.example.controller;

import com.example.DTOs.UserDTO;
import com.example.model.User;
import com.example.service.AuthenticationService;
import com.example.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/users")
public class UserController {
    @Autowired
    UserService userService;

    @GetMapping("/{id}")
    public User getuser(@PathVariable Long id){
        return userService.getUserById(id);
    }

    @GetMapping("/me")
    public UserDTO me(Authentication authentication){
        String email = authentication.getName();

        return userService.getUserInfo(email);
    }
}
