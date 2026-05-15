package com.example.model;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;

@Getter
@Setter
@Embeddable
@NoArgsConstructor
@AllArgsConstructor
public class CartProductId implements Serializable {
    @Column(name="product_id")
    private Long productId;

    @Column(name="cart_id")
    private Long cartId;
}
