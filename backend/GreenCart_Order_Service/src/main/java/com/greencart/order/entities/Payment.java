package com.greencart.order.entities;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "payments")
public class Payment {

	 @Id
	    @GeneratedValue(strategy = GenerationType.IDENTITY)
	    @Column(name = "payment_id")
	    private Integer paymentId;

	    // FK → orders(order_id)
	    @OneToOne
	    @JoinColumn(name = "order_id", nullable = false)
	    private Order order;

	    @Column(name = "bill_number", unique = true, length = 50)
	    private String billNumber;

	    @Column(name = "payment_date")
	    private LocalDateTime paymentDate;

	    @Enumerated(EnumType.STRING)
	    @Column(name = "payment_method", length = 50)
	    private PaymentMethod paymentMethod;


	    @Column(name = "payable_amount")
	    private Double payableAmount;

	    @Enumerated(EnumType.STRING)
	    @Column(name = "payment_status")
	    private PaymentStatus paymentStatus;

	   
	    public Payment() {
	        this.paymentDate = LocalDateTime.now();
	    }

	    // -------- Getters & Setters --------

	    public Integer getPaymentId() {
	        return paymentId;
	    }

	    public void setPaymentId(Integer paymentId) {
	        this.paymentId = paymentId;
	    }

	    public Order getOrder() {
	        return order;
	    }

	    public void setOrder(Order order) {
	        this.order = order;
	    }

	    public String getBillNumber() {
	        return billNumber;
	    }

	    public void setBillNumber(String billNumber) {
	        this.billNumber = billNumber;
	    }

	    public LocalDateTime getPaymentDate() {
	        return paymentDate;
	    }

	    public void setPaymentDate(LocalDateTime paymentDate) {
	        this.paymentDate = paymentDate;
	    }

	    public  PaymentMethod getPaymentMethod() {
	        return paymentMethod;
	    }

	    public void setPaymentMethod(PaymentMethod paymentMethod) {
	        this.paymentMethod = paymentMethod;
	    }

	    public Double getPayableAmount() {
	        return payableAmount;
	    }

	    public void setPayableAmount(Double payableAmount) {
	        this.payableAmount = payableAmount;
	    }

	    public PaymentStatus getPaymentStatus() {
	        return paymentStatus;
	    }

	    public void setPaymentStatus(PaymentStatus paymentStatus) {
	        this.paymentStatus = paymentStatus;
	    }

}
