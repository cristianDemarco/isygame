package com.example.controller;

import com.example.model.Cart;
import com.example.service.CartProductService;
import com.example.service.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/cart")
public class CartController {
    @Autowired
    CartService cartService;
    @Autowired
    CartProductService cartProductService;

    @GetMapping
    public Cart getCart(Authentication authentication){
        Cart cart = cartService.getCartByEmail(authentication.getName());
        return cart;
    }

    @PostMapping("/{productId}")
    public ResponseEntity<HttpStatus> addProductToCart(@PathVariable Long productId, Authentication authentication){
        cartProductService.addProductToCart(productId, authentication.getName());

        return ResponseEntity.status(HttpStatus.CREATED).build();
    }
}
