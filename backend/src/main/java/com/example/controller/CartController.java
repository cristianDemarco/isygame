package com.example.controller;

import com.example.DTOs.response.ProductDTO;
import com.example.model.Cart;
import com.example.service.CartProductService;
import com.example.service.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
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
    public Page<ProductDTO> getAllProductsFromCart(@RequestParam int page, @RequestParam int limit, Authentication authentication){
        return cartProductService.getAllProductsFromCart(authentication.getName(), page, limit);
    }
}
