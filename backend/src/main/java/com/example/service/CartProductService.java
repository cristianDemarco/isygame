package com.example.service;

import com.example.DTOs.response.ProductDTO;
import com.example.model.Cart;
import com.example.model.CartProduct;
import com.example.model.Product;
import com.example.repository.CartProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

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

    public void deleteProductFromCart(Long productId, String email){
        cartProductRepository.delete(getCartProduct(productId, email));
    }

    public Page<ProductDTO> getAllProductsFromCart(String email, int pageNum, int limit){
        Pageable page = PageRequest.of(pageNum, limit);
        Cart cart = userService.getUserInfo(email).getCart();
        List<CartProduct> cartProducts = cart.getCartProducts();
        List<ProductDTO> products = cartProducts.stream().map(CartProduct::getProduct).map(product -> new ProductDTO(
                product.getId(), product.getName(), product.getDescription(), product.getPrice()
        )).toList();
        return new PageImpl<ProductDTO>(products, page, products.size());
    }
}
