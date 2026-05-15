package com.example.service;

import com.example.DTOs.response.UserDTO;
import com.example.model.User;
import com.example.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    public User getUserById(Long id){
        return userRepository.findById(id).orElse(null);
    }
    public User getUserInfo(String email){
        return userRepository.findByEmail(email).orElse(null);
    }
}
