package com.greencart.admin.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.greencart.admin.entities.ProductStock;

@Repository
public interface ProductStockRepository extends JpaRepository<ProductStock, Integer> {
}
