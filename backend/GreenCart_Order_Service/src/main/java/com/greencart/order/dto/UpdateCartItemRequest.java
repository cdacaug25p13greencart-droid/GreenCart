package com.greencart.order.dto;

public class UpdateCartItemRequest {

    private Double quantity;

    // Constructors
    public UpdateCartItemRequest() {
    }

    public UpdateCartItemRequest(Double quantity) {
        this.quantity = quantity;
    }

    // Getters and Setters
    public Double getQuantity() {
        return quantity;
    }

    public void setQuantity(Double quantity) {
        this.quantity = quantity;
    }
}
