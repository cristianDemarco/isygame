package com.example.controller;

import com.example.DTOs.response.ProductDTO;
import com.example.model.Cart;
import com.example.service.CartProductService;
import com.example.service.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/cart")
public class CartController {
    @Autowired
    CartService cartService;
    @Autowired
    CartProductService cartProductService;

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

    @GetMapping("/products")
    public List<ProductDTO> getAllProductsFromCart(Authentication authentication){
        return cartProductService.getAllProductsFromCart(authentication.getName());
    }
}
