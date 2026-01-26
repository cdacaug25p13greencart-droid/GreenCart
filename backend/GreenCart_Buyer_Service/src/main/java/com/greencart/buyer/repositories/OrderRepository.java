package com.greencart.buyer.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.greencart.buyer.entities.Order;

@Repository
public interface OrderRepository extends JpaRepository<Order, Integer> {

    /**
     * Find all orders by buyer ID, ordered by date descending
     */
    List<Order> findByBuyerIdOrderByOrderDateDesc(Integer buyerId);

    /**
     * Find orders by buyer ID
     */
    List<Order> findByBuyerId(Integer buyerId);
}
