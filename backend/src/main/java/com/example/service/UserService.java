package com.example.service;

import com.example.model.User;
import com.example.repository.UserRepository;

import lombok.RequiredArgsConstructor;

import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;

    public User getUserById(Long id){
        return userRepository.findById(id).orElse(null);
    }
    public User getUserInfo(String email){
        return userRepository.findByEmail(email).orElse(null);
    }
}
