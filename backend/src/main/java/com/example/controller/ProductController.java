package com.example.controller;

import com.example.DTOs.ProductDTO;
import com.example.model.Product;
import com.example.service.ProductService;

import jakarta.servlet.ServletOutputStream;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/products")
public class ProductController {
    @Autowired
    ProductService productService;

    @PostMapping
    public Product createProduct(@RequestPart("product") Product product, @RequestPart("image") MultipartFile image){
        try{
            product.setImage(image.getBytes());
        }catch(Exception e){
            System.out.println(e);
        };
        return productService.saveProduct(product);
    }

    @GetMapping("/{id}")
    public ProductDTO getProduct(@PathVariable Long id){
        Product product = productService.getProductById(id);
        return new ProductDTO(
                product.getId(),
                product.getName(),
                product.getDescription(),
                product.getPrice()
        );
    }

    @GetMapping("/{id}/image")
    public void getProductImage(HttpServletResponse response, @PathVariable Long id) {
        byte[] image = productService.getProductById(id).getImage();
        response.setContentType("image/jpeg");
        response.setHeader("Content-disposition", "attachment; filename=\"product_image\"");

        try (ServletOutputStream outputStream = response.getOutputStream()){
                outputStream.write(image);
                response.setStatus(HttpStatus.OK.value());
                response.flushBuffer();
        } catch(IOException e){
            response.setStatus(HttpStatus.INTERNAL_SERVER_ERROR.value());
        }
    }
}
