package com.greencart.order.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Getter;

@Entity
@Table(name = "order_items")


public class OrderItem {

	 @Id
	    @GeneratedValue(strategy = GenerationType.IDENTITY)
	    @Column(name = "order_item_id")
	    private Integer orderItemId;

	    // FK → orders(order_id)
	    @ManyToOne(fetch = FetchType.LAZY)
	    @JoinColumn(name = "order_id", nullable = false)
	    private Order order;

	    // FK → products(pid)
	    @ManyToOne(fetch = FetchType.LAZY)
	    @JoinColumn(name = "product_id", nullable = false)
	    private Product product;

	    @Column(name = "product_name", length = 100)
	    private String productName;

	    @Column(name = "unit_price")
	    private Double unitPrice;

	    private Integer quantity;

	    @Column(name = "total_price")
	    private Double totalPrice;
	

}
