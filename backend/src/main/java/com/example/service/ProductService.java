package com.example.service;

import com.example.DTOs.ProductDTO;
import com.example.model.Product;
import com.example.repository.ProductRepository;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

@Service
public class ProductService {
    @Autowired
    private ProductRepository productRepository;

    public Product saveProduct(Product product){
        return productRepository.save(product);
    }

    public ProductDTO getProduct(Long id){
        Product product = productRepository.findById(id).orElse(null);

        return new ProductDTO(
                product.getId(),
                product.getName(),
                product.getDescription(),
                product.getPrice()
        );
    }

    public byte[] getProductImage(Long id){
        Product product = productRepository.findById(id).orElse(null);

        return product.getImage();
    }

    public List<ProductDTO> getProducts(int pageNum, int limit){
        Pageable page = PageRequest.of(pageNum, limit);
        Page<Product> products = productRepository.findAll(page);

        return products.getContent()
            .stream()
            .map(
            product -> new ProductDTO(
                product.getId(),
                product.getName(),
                product.getDescription(),
                product.getPrice()
            )
        ).toList();
    }
}
