package com.greencart.buyer.services;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.greencart.buyer.dto.OrderDTO;
import com.greencart.buyer.dto.OrderItemDTO;
import com.greencart.buyer.dto.PaymentDTO;
import com.greencart.buyer.entities.Cart;
import com.greencart.buyer.entities.CartItem;
import com.greencart.buyer.entities.Order;
import com.greencart.buyer.entities.OrderItem;
import com.greencart.buyer.entities.Payment;
import com.greencart.buyer.entities.PaymentMethod;
import com.greencart.buyer.entities.PaymentStatus;
import com.greencart.buyer.entities.ProductStock;
import com.greencart.buyer.repositories.CartItemRepository;
import com.greencart.buyer.repositories.CartRepository;
import com.greencart.buyer.repositories.OrderItemRepository;
import com.greencart.buyer.repositories.OrderRepository;
import com.greencart.buyer.repositories.PaymentRepository;
import com.greencart.buyer.repositories.ProductStockRepository;

@Service
public class OrderService {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private OrderItemRepository orderItemRepository;

    @Autowired
    private PaymentRepository paymentRepository;

    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private CartItemRepository cartItemRepository;

    @Autowired
    private ProductStockRepository productStockRepository;

    @Transactional
    public OrderDTO placeOrderFromCart(Integer buyerId, PaymentMethod paymentMethod) {
        // 1. Get cart
        Optional<Cart> cartOpt = cartRepository.findByBuyerId(buyerId);
        if (cartOpt.isEmpty()) {
            throw new RuntimeException("Cart not found for buyer");
        }

        Cart cart = cartOpt.get();
        List<CartItem> cartItems = cartItemRepository.findByCart_CartId(cart.getCartId());

        if (cartItems.isEmpty()) {
            throw new RuntimeException("Cart is empty. Cannot place order.");
        }

        // 2. Calculate total amount
        Double totalAmount = cartItems.stream()
                .mapToDouble(CartItem::getTotalPrice)
                .sum();

        // 3. Create Order
        Order order = new Order(buyerId, totalAmount);
        order = orderRepository.save(order);

        // 4. Create Order Items and deduct stock
        for (CartItem cartItem : cartItems) {
            // Validate and deduct stock
            ProductStock stock = cartItem.getProductStock();
            int requiredQuantity = cartItem.getQuantity().intValue();

            if (stock.getQuantity() < requiredQuantity) {
                throw new RuntimeException("Insufficient stock for product: " + cartItem.getProduct().getPname());
            }

            // Deduct stock
            stock.setQuantity(stock.getQuantity() - requiredQuantity);
            productStockRepository.save(stock);

            // Create order item
            OrderItem orderItem = new OrderItem(
                    order,
                    cartItem.getProduct(),
                    cartItem.getProduct().getPname(),
                    cartItem.getUnitPrice(),
                    cartItem.getQuantity());
            orderItemRepository.save(orderItem);
        }

        // 5. Generate bill number
        String billNumber = generateBillNumber(order.getOrderId());

        // 6. Create Payment record
        PaymentStatus paymentStatus = (paymentMethod == PaymentMethod.COD)
                ? PaymentStatus.PENDING
                : PaymentStatus.PENDING;

        Payment payment = new Payment(order, billNumber, paymentMethod, totalAmount, paymentStatus);
        payment = paymentRepository.save(payment);

        // 7. Clear cart
        cartItemRepository.deleteByCart_CartId(cart.getCartId());

        // 8. Return OrderDTO
        return getOrderById(order.getOrderId());
    }

    @Transactional(readOnly = true)
    public List<OrderDTO> getOrdersByBuyer(Integer buyerId) {
        List<Order> orders = orderRepository.findByBuyerIdOrderByOrderDateDesc(buyerId);
        return orders.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public OrderDTO getOrderById(Integer orderId) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found"));
        return convertToDTO(order);
    }

    private String generateBillNumber(Integer orderId) {
        LocalDateTime now = LocalDateTime.now();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyyMMddHHmmss");
        String timestamp = now.format(formatter);
        return "BILL-" + timestamp + "-" + orderId;
    }

    private OrderDTO convertToDTO(Order order) {
        OrderDTO dto = new OrderDTO();
        dto.setOrderId(order.getOrderId());
        dto.setBuyerId(order.getBuyerId());
        dto.setOrderDate(order.getOrderDate());
        dto.setTotalAmount(order.getTotalAmount());

        // Get order items
        List<OrderItem> orderItems = orderItemRepository.findByOrder_OrderId(order.getOrderId());
        List<OrderItemDTO> itemDTOs = orderItems.stream()
                .map(this::convertOrderItemToDTO)
                .collect(Collectors.toList());
        dto.setItems(itemDTOs);

        // Get payment
        Optional<Payment> paymentOpt = paymentRepository.findByOrder_OrderId(order.getOrderId());
        if (paymentOpt.isPresent()) {
            dto.setPayment(convertPaymentToDTO(paymentOpt.get()));
        }

        return dto;
    }

    private OrderItemDTO convertOrderItemToDTO(OrderItem item) {
        OrderItemDTO dto = new OrderItemDTO();
        dto.setOrderItemId(item.getOrderItemId());
        dto.setProductId(item.getProduct().getPid());
        dto.setProductName(item.getProductName());
        dto.setUnitPrice(item.getUnitPrice());
        dto.setQuantity(item.getQuantity());
        dto.setTotalPrice(item.getTotalPrice());

        // Get product stock for image
        List<ProductStock> stocks = productStockRepository.findByProduct_Pid(item.getProduct().getPid());
        if (!stocks.isEmpty()) {
            dto.setImagePath(stocks.get(0).getImagePath());
        }

        if (item.getProduct().getSubCategory() != null) {
            dto.setSubCategoryName(item.getProduct().getSubCategory().getSubCategoryName());
            if (item.getProduct().getSubCategory().getCategory() != null) {
                dto.setCategoryName(item.getProduct().getSubCategory().getCategory().getCategoryName());
            }
        }

        return dto;
    }

    private PaymentDTO convertPaymentToDTO(Payment payment) {
        PaymentDTO dto = new PaymentDTO();
        dto.setPaymentId(payment.getPaymentId());
        dto.setBillNumber(payment.getBillNumber());
        dto.setPaymentDate(payment.getPaymentDate());
        dto.setPaymentMethod(payment.getPaymentMethod());
        dto.setPayableAmount(payment.getPayableAmount());
        dto.setPaymentStatus(payment.getPaymentStatus());
        return dto;
    }
}
