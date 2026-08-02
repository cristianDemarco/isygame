package com.example.service;

import com.example.DTOs.request.LoginUserDTO;
import com.example.exception.BadUserInputException;
import com.example.exception.InvalidCredentialsException;
import com.example.model.Cart;
import com.example.model.RefreshToken;
import com.example.model.User;
import com.example.DTOs.request.RegisterUserDTO;
import com.example.DTOs.response.AuthResponseDTO;
import com.example.repository.UserRepository;

import lombok.RequiredArgsConstructor;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDate;

@Service
@RequiredArgsConstructor
public class AuthenticationService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;
    private final RefreshTokenService refreshTokenService;

    public User signup(RegisterUserDTO input){
        if(userRepository.existsByEmail(input.getEmail())){
            throw new BadUserInputException("This email address is already associated with an account");
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
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            input.getEmail(),
                            input.getPassword()
                    )
            );
        } catch (BadCredentialsException e){
            throw new InvalidCredentialsException("Invalid credentials");
        }

        return userRepository.findByEmail(input.getEmail()).orElseThrow();
    }

    public AuthResponseDTO createAuthResponse(RefreshToken refreshToken){
        
        RefreshToken newRefreshToken = refreshTokenService.getRefreshTokenByTokenString(refreshToken.getToken()).get();
        User user = userRepository.findByEmail(newRefreshToken.getUser().getEmail()).get();
        String jwtToken = jwtService.generateToken(user);

        AuthResponseDTO loginResponse = new AuthResponseDTO();
        loginResponse.setToken(jwtToken);
        loginResponse.setExpiresIn(jwtService.getExpirationTime());
        loginResponse.setRefreshToken(refreshToken.getToken());

        return loginResponse;
    }
}
