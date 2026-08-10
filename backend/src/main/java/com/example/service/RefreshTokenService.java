package com.example.service;

import java.util.UUID;
import java.time.Instant;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.example.model.RefreshToken;
import com.example.model.User;
import com.example.repository.RefreshTokenRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class RefreshTokenService {
    private final RefreshTokenRepository refreshTokenRepository;
    private int expiryTime = 1000*60*60*24*7;


    public RefreshToken generateRefreshToken(User user){
        RefreshToken refreshToken = new RefreshToken();
                
        refreshToken.setToken(UUID.randomUUID().toString());
        refreshToken.setExpiryDate(Instant.now().plusMillis(expiryTime));
        refreshToken.setUser(user);
   
        return refreshTokenRepository.save(refreshToken);
    }

    public Optional<RefreshToken> getRefreshTokenByTokenString(String refreshTokenString){
        return refreshTokenRepository.findByToken(refreshTokenString);
    }

    public Optional<RefreshToken> getRefreshTokenByUser(User user){
        return refreshTokenRepository.findByUser(user);
    }

    public RefreshToken updateRefreshToken(RefreshToken refreshToken){
        refreshToken.setToken(UUID.randomUUID().toString());
        refreshToken.setExpiryDate(Instant.now().plusMillis(expiryTime));

        return refreshTokenRepository.save(refreshToken);
    }

    public void deleteRefreshToken(RefreshToken refreshToken){
        refreshTokenRepository.delete(refreshToken);
    }
}
