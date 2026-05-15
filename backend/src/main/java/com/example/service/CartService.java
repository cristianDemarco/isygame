package com.example.service;

import com.example.model.Cart;
import com.example.repository.CartRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CartService {
    @Autowired
    private CartRepository cartRepository;

    public Cart saveCart(Cart cart){
        return cartRepository.save(cart);
    }

    public Cart getCartByEmail(String email){
        return cartRepository.findByUser_Email(email);
    }
}
