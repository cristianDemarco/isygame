package com.example.controller;

import com.example.DTOs.response.UserDTO;
import com.example.model.User;
import com.example.service.UserService;

import lombok.RequiredArgsConstructor;

import java.util.List;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
@RequestMapping("/users")
public class UserController {
    private final UserService userService;

    @GetMapping("/{id}")
    public User getuser(@PathVariable Long id){
        return userService.getUserById(id);
    }

    @GetMapping("/me")
    public UserDTO me(Authentication authentication){
        User user = userService.getUserInfo(authentication.getName());
        List<String> roles = user.getAuthorities().stream().map(GrantedAuthority::getAuthority).toList();

        return new UserDTO(
                user.getEmail(),
                user.getNickname(),
                roles
        );
    }
}
