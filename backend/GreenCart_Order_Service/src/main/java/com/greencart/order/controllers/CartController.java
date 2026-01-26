package com.greencart.order.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.greencart.order.dto.AddToCartRequest;
import com.greencart.order.dto.CartDTO;
import com.greencart.order.dto.CartItemDTO;
import com.greencart.order.dto.UpdateCartItemRequest;
import com.greencart.order.entities.Order;
import com.greencart.order.services.CartService;

@RestController
@RequestMapping("/api/cart")
@CrossOrigin(origins = "*")
public class CartController {

    @Autowired
    private CartService cartService;

    /**
     * Add item to cart
     * POST /api/cart/add
     */
    @PostMapping("/add")
    public ResponseEntity<?> addToCart(@RequestBody AddToCartRequest request) {
        try {
            CartDTO cart = cartService.addToCart(request);
            return ResponseEntity.ok(cart);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new ErrorResponse(e.getMessage()));
        }
    }

    /**
     * Get buyer's cart
     * GET /api/cart/{buyerId}
     */
    @GetMapping("/{buyerId}")
    public ResponseEntity<?> getCart(@PathVariable Integer buyerId) {
        try {
            CartDTO cart = cartService.getCartByBuyerId(buyerId);
            return ResponseEntity.ok(cart);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new ErrorResponse(e.getMessage()));
        }
    }

    /**
     * Update cart item quantity
     * PUT /api/cart/item/{cartItemId}
     */
    @PutMapping("/item/{cartItemId}")
    public ResponseEntity<?> updateCartItem(
            @PathVariable Integer cartItemId,
            @RequestBody UpdateCartItemRequest request) {
        try {
            CartItemDTO item = cartService.updateCartItem(cartItemId, request);
            return ResponseEntity.ok(item);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new ErrorResponse(e.getMessage()));
        }
    }

    /**
     * Remove item from cart
     * DELETE /api/cart/item/{cartItemId}
     */
    @DeleteMapping("/item/{cartItemId}")
    public ResponseEntity<?> removeCartItem(@PathVariable Integer cartItemId) {
        try {
            cartService.removeCartItem(cartItemId);
            return ResponseEntity.ok(new SuccessResponse("Item removed from cart"));
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new ErrorResponse(e.getMessage()));
        }
    }

    /**
     * Clear all items from cart
     * DELETE /api/cart/{buyerId}/clear
     */
    @DeleteMapping("/{buyerId}/clear")
    public ResponseEntity<?> clearCart(@PathVariable Integer buyerId) {
        try {
            cartService.clearCart(buyerId);
            return ResponseEntity.ok(new SuccessResponse("Cart cleared"));
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new ErrorResponse(e.getMessage()));
        }
    }

    /**
     * Checkout - Create order from cart
     * POST /api/cart/{buyerId}/checkout
     */
    @PostMapping("/{buyerId}/checkout")
    public ResponseEntity<?> checkout(@PathVariable Integer buyerId) {
        try {
            Order order = cartService.createOrderFromCart(buyerId);
            return ResponseEntity.ok(order);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new ErrorResponse(e.getMessage()));
        }
    }

    // Helper classes for responses
    static class ErrorResponse {
        private String error;

        public ErrorResponse(String error) {
            this.error = error;
        }

        public String getError() {
            return error;
        }

        public void setError(String error) {
            this.error = error;
        }
    }

    static class SuccessResponse {
        private String message;

        public SuccessResponse(String message) {
            this.message = message;
        }

        public String getMessage() {
            return message;
        }

        public void setMessage(String message) {
            this.message = message;
        }
    }
}
