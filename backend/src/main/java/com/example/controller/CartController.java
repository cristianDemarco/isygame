package com.example.controller;

import com.example.DTOs.response.ProductDTO;
import com.example.model.Cart;
import com.example.service.CartProductService;
import com.example.service.CartService;

import lombok.RequiredArgsConstructor;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.time.Instant;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RequiredArgsConstructor
@RestController
@RequestMapping("/cart")
public class CartController {
    private final CartService cartService;
    private final CartProductService cartProductService;

    @GetMapping
    public Cart getCart(Authentication authentication){
        return cartService.getCartByEmail(authentication.getName());
    }

    @PostMapping("/{productId}")
    public ResponseEntity<HttpStatus> addProductToCart(@PathVariable Long productId, Authentication authentication){
        cartProductService.addProductToCart(productId, authentication.getName());

        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @DeleteMapping("/{productId}")
    public ResponseEntity<HttpStatus> deleteProductFromCart(@PathVariable Long productId, Authentication authentication){
        cartProductService.deleteProductFromCart(productId, authentication.getName());

        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }

    @DeleteMapping("/all")
    public ResponseEntity<HttpStatus> deleteAllProductsFromCart(Authentication authentication){
        cartProductService.deleteAllProductsFromCart(authentication.getName());

        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }

    @GetMapping("/products")
    public List<ProductDTO> getAllProductsFromCart(Authentication authentication){
        return cartProductService.getAllProductsFromCart(authentication.getName());
    }

    @GetMapping("/lastupdate")
    public ResponseEntity<?> getLastUpdate(Authentication authentication){
        Instant lastUpdate = cartService.getCartByEmail(authentication.getName()).getLastUpdate();

        if(lastUpdate == null){
            return ResponseEntity.ok("");
        }

        Map<String, Instant> response = new HashMap<>();
        response.put("lastUpdate", lastUpdate);

        return ResponseEntity.ok(response);
    }
        
}
