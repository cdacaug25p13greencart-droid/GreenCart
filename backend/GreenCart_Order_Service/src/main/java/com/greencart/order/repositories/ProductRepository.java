package com.greencart.order.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.greencart.order.entities.Product;

@Repository
public interface ProductRepository extends JpaRepository<Product, Integer> {

    // Find all products
    List<Product> findAll();

    // Find product by ID
    Product findByPid(int pid);
}
