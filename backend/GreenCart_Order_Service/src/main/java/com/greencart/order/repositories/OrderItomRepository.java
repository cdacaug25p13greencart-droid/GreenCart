package com.greencart.order.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.greencart.order.entities.OrderItem;

public interface OrderItomRepository extends JpaRepository<OrderItem, Integer> {
	 List<OrderItem> findByOrder_OrderId(Integer orderId);

	 
	 
}
