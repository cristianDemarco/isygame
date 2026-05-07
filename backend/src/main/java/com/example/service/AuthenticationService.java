package com.example.service;

import com.example.DTOs.LoginUserDTO;
import com.example.model.Cart;
import com.example.model.User;
import com.example.DTOs.RegisterUserDTO;
import com.example.repository.UserRepository;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDate;

@Service
public class AuthenticationService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    private final AuthenticationManager authenticationManager;

    public AuthenticationService(
            UserRepository userRepository,
            AuthenticationManager authenticationManager,
            PasswordEncoder passwordEncoder
    ){
        this.authenticationManager = authenticationManager;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public User signup(RegisterUserDTO input){
        if(userRepository.existsByEmail(input.getEmail())){
            throw new RuntimeException("User with this email already exists");
        }

        User user = new User();
        user.setEmail(input.getEmail());
        user.setNickname(input.getNickname());
        user.setPassword(passwordEncoder.encode((input.getPassword())));
        user.setCreatedAt(LocalDate.now());

        Cart cart = new Cart();
        cart.setUser(user);
        user.setCart(cart);
        
        return userRepository.save(user);
    }

    public User authenticate(LoginUserDTO input){
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        input.getEmail(),
                        input.getPassword()
                )
        );

        return userRepository.findByEmail(input.getEmail()).orElseThrow();
    }
}
