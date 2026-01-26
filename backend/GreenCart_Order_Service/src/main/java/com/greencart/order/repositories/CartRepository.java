package com.greencart.order.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.greencart.order.entities.Cart;

@Repository
public interface CartRepository extends JpaRepository<Cart, Integer> {

    /**
     * Find cart by buyer's user ID
     */
    Optional<Cart> findByBuyer_UserId(Integer buyerId);

    /**
     * Check if cart exists for a buyer
     */
    boolean existsByBuyer_UserId(Integer buyerId);
}
