package com.example.service;

import java.util.UUID;
import java.time.Instant;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.example.model.RefreshToken;
import com.example.repository.RefreshTokenRepository;
import com.example.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class RefreshTokenService {
    private final RefreshTokenRepository refreshTokenRepository;

    private final UserRepository userRepository;

    public RefreshToken generateRefreshToken(String email){
        RefreshToken refreshToken = new RefreshToken();
                
        refreshToken.setToken(UUID.randomUUID().toString());
        refreshToken.setExpiryDate(Instant.now().plusMillis(1000*60*60*24*7));
        refreshToken.setUser(userRepository.findByEmail(email).orElseThrow());
   
        return refreshTokenRepository.save(refreshToken);
    }

    public Optional<RefreshToken> getRefreshTokenByTokenString(String refreshTokenString){
        return refreshTokenRepository.findByToken(refreshTokenString);
    }

    public Optional<RefreshToken> getRefreshTokenByUserEmail(String email){
        return refreshTokenRepository.findByUser(email);
    }

    public RefreshToken updateRefreshToken(RefreshToken refreshToken){
        refreshToken.setToken(UUID.randomUUID().toString());
        refreshToken.setExpiryDate(Instant.now());

        return refreshTokenRepository.save(refreshToken);
    }

    public void deleteRefreshToken(RefreshToken refreshToken){
        refreshTokenRepository.delete(refreshToken);
    }
}
