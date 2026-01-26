package com.greencart.buyer.controllers;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.greencart.buyer.services.ProductService;

@CrossOrigin(origins = "http://localhost:3000", methods = { org.springframework.web.bind.annotation.RequestMethod.GET,
        org.springframework.web.bind.annotation.RequestMethod.POST,
        org.springframework.web.bind.annotation.RequestMethod.PUT,
        org.springframework.web.bind.annotation.RequestMethod.DELETE,
        org.springframework.web.bind.annotation.RequestMethod.OPTIONS }, allowedHeaders = "*", allowCredentials = "true")
@RestController
@RequestMapping("/api/products")
public class ProductController {

    @Autowired
    private ProductService productService;

    /**
     * Get all available products with stock information
     * Endpoint: GET /api/products/available
     */
    @GetMapping("/available")
    public ResponseEntity<List<Map<String, Object>>> getAvailableProducts() {
        try {
            List<Map<String, Object>> products = productService.getAllAvailableProducts();
            return ResponseEntity.ok(products);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }
}
