package com.example.service;

import com.example.model.Cart;
import com.example.repository.CartRepository;

import lombok.RequiredArgsConstructor;

import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CartService {
    private final CartRepository cartRepository;

    public Cart saveCart(Cart cart){
        return cartRepository.save(cart);
    }

    public Cart getCartByEmail(String email){
        return cartRepository.findByUser_Email(email);
    }
}
