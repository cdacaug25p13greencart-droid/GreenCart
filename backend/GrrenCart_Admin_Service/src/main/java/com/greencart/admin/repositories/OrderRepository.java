package com.greencart.admin.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.greencart.admin.entities.Order;

@Repository
public interface OrderRepository extends JpaRepository<Order, Integer> {
}
