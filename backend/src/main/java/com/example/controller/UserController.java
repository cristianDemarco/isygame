package com.example.controller;

import com.example.DTOs.response.UserDTO;
import com.example.model.User;
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
        User user = userService.getUserInfo(authentication.getName());

        return new UserDTO(
                user.getEmail(),
                user.getNickname()
        );
    }
}
