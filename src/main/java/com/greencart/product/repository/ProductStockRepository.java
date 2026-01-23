package com.greencart.product.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.greencart.product.entities.ProductStock;

import java.util.List;

public interface ProductStockRepository extends JpaRepository<ProductStock, Integer> {

    List<ProductStock> findBySellerId(int sellerId);
}
