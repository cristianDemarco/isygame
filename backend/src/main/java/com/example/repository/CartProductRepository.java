package com.example.repository;

import com.example.model.CartProduct;
import com.example.model.CartProductId;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CartProductRepository extends JpaRepository<CartProduct, CartProductId> {
}
