package com.example.service;

import com.example.DTOs.response.ProductDTO;
import com.example.model.Cart;
import com.example.model.CartProduct;
import com.example.model.Product;
import com.example.repository.CartProductRepository;

import lombok.RequiredArgsConstructor;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CartProductService {
    private final CartProductRepository cartProductRepository;
    private final UserService userService;
    private final ProductService productService;

    public CartProduct getCartProduct(Long productId, String email){
        Cart cart = userService.getUserInfo(email).getCart();
        Product product = productService.getProduct(productId);
        return new CartProduct(product, cart);
    }

    public void addProductToCart(Long productId, String email){
        cartProductRepository.save(getCartProduct(productId, email));
    }

    public void deleteProductFromCart(Long productId, String email){
        cartProductRepository.delete(getCartProduct(productId, email));
    }

    public void deleteAllProductsFromCart(String email){
        Cart cart = userService.getUserInfo(email).getCart();
        cartProductRepository.deleteAll(cart.getCartProducts());
    }

    public List<ProductDTO> getAllProductsFromCart(String email){
        Cart cart = userService.getUserInfo(email).getCart();
        List<CartProduct> cartProducts = cart.getCartProducts();
        return cartProducts.stream().map(CartProduct::getProduct).map(product -> new ProductDTO(
                product.getId(), product.getName(), product.getDescription(), product.getPrice()
        )).toList();
    }
}
