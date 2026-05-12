package com.example.service;

import com.example.DTOs.response.ProductDTO;
import com.example.model.Product;
import com.example.repository.ProductRepository;

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

    public Page<ProductDTO> getProducts(int pageNum, int limit){
        Pageable page = PageRequest.of(pageNum, limit);
        Page<ProductDTO> products = productRepository.findAll(page).map(product -> new ProductDTO(
                product.getId(), product.getName(), product.getDescription(), product.getPrice()
        ));
        return products;
    }
}
