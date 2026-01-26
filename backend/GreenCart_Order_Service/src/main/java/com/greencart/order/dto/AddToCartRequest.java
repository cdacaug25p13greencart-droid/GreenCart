package com.greencart.order.dto;

public class AddToCartRequest {

    private Integer buyerId;
    private Integer stockId;
    private Double quantity;

    // Constructors
    public AddToCartRequest() {
    }

    public AddToCartRequest(Integer buyerId, Integer stockId, Double quantity) {
        this.buyerId = buyerId;
        this.stockId = stockId;
        this.quantity = quantity;
    }

    // Getters and Setters
    public Integer getBuyerId() {
        return buyerId;
    }

    public void setBuyerId(Integer buyerId) {
        this.buyerId = buyerId;
    }

    public Integer getStockId() {
        return stockId;
    }

    public void setStockId(Integer stockId) {
        this.stockId = stockId;
    }

    public Double getQuantity() {
        return quantity;
    }

    public void setQuantity(Double quantity) {
        this.quantity = quantity;
    }
}
