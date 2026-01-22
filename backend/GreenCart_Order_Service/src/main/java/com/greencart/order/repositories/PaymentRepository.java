package com.greencart.order.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.greencart.order.entities.Payment;
import com.greencart.order.entities.PaymentStatus;

@Repository
public interface PaymentRepository extends JpaRepository<Payment, Integer>{
	  // Find payment by order id
    Optional<Payment> findByOrder_OrderId(Integer orderId);

    // Find all payments by status (PENDING, SUCCESS, FAILED)
    Optional<Payment> findByPaymentStatus(PaymentStatus paymentStatus);

}
