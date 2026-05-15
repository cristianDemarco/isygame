package com.example.service;

import com.example.model.Cart;
import com.example.model.CartProduct;
import com.example.model.Product;
import com.example.repository.CartProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

@Service
public class CartProductService {
    @Autowired
    private CartProductRepository cartProductRepository;
    @Autowired
    private UserService userService;
    @Autowired
    private ProductService productService;

    public CartProduct getCartProduct(Long productId, String email){
        Cart cart = userService.getUserInfo(email).getCart();
        Product product = productService.getProduct(productId);
        return new CartProduct(product, cart);
    }

    public void addProductToCart(Long productId, String email){
        cartProductRepository.save(getCartProduct(productId, email));
    }
}
