package com.example.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name="cart_product")
public class CartProduct {
    @EmbeddedId
    private CartProductId id;

    @ManyToOne()
    @MapsId("productId")
    @JoinColumn(name="product_id")
    private Product product;

    @ManyToOne()
    @MapsId("cartId")
    @JoinColumn(name="cart_id")
    private Cart cart;

    public CartProduct(Product product, Cart cart){
        if(product == null || cart == null || cart.getId() == null){
            throw new IllegalArgumentException("Cart and Product with ID cannot be null");
        }
        this.product = product;
        this.cart = cart;

        this.id = new CartProductId(product.getId(), cart.getId());
    }
}
