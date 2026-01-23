package com.greencart.order.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.greencart.order.entities.Order;

public interface OrderRepository extends JpaRepository<Order, Integer> {

	 // Find all orders for a given buyer (buyer_id)
    List<Order> findByBuyer_UserId(Integer buyerId);

    // Optional: find orders by date
    List<Order> findByOrderDateBetween(
            java.time.LocalDateTime start,
            java.time.LocalDateTime end
    );
	
}
