package com.greencart.order.services;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.greencart.order.dto.AddToCartRequest;
import com.greencart.order.dto.CartDTO;
import com.greencart.order.dto.CartItemDTO;
import com.greencart.order.dto.UpdateCartItemRequest;
import com.greencart.order.entities.Cart;
import com.greencart.order.entities.CartItem;
import com.greencart.order.entities.Order;
import com.greencart.order.entities.OrderItem;
import com.greencart.order.entities.ProductStock;
import com.greencart.order.entities.User;
import com.greencart.order.repositories.CartItemRepository;
import com.greencart.order.repositories.CartRepository;
import com.greencart.order.repositories.OrderRepository;
import com.greencart.order.repositories.ProductStockRepository;

@Service
public class CartService {

    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private CartItemRepository cartItemRepository;

    @Autowired
    private ProductStockRepository productStockRepository;

    @Autowired
    private OrderRepository orderRepository;

    /**
     * Add item to cart or update quantity if already exists
     */
    @Transactional
    public CartDTO addToCart(AddToCartRequest request) {
        // Validate stock exists
        ProductStock stock = productStockRepository.findById(request.getStockId())
                .orElseThrow(() -> new RuntimeException("Product stock not found"));

        // Check if quantity is available
        if (stock.getQuantity() < request.getQuantity()) {
            throw new RuntimeException("Insufficient stock available");
        }

        // Get or create cart for buyer
        Cart cart = cartRepository.findByBuyer_UserId(request.getBuyerId())
                .orElseGet(() -> {
                    Cart newCart = new Cart();
                    User buyer = new User();
                    buyer.setUserId(request.getBuyerId());
                    newCart.setBuyer(buyer);
                    return cartRepository.save(newCart);
                });

        // Check if item already exists in cart
        Optional<CartItem> existingItem = cartItemRepository
                .findByCart_CartIdAndProductStock_StockId(cart.getCartId(), request.getStockId());

        if (existingItem.isPresent()) {
            // Update quantity
            CartItem item = existingItem.get();
            Double newQuantity = item.getQuantity() + request.getQuantity();

            if (stock.getQuantity() < newQuantity) {
                throw new RuntimeException("Insufficient stock available");
            }

            item.setQuantity(newQuantity);
            cartItemRepository.save(item);
        } else {
            // Add new item
            CartItem newItem = new CartItem();
            newItem.setCart(cart);
            newItem.setProduct(stock.getProduct());
            newItem.setProductStock(stock);
            newItem.setQuantity(request.getQuantity());
            newItem.setUnitPrice(stock.getPrice());
            cartItemRepository.save(newItem);
        }

        return getCartByBuyerId(request.getBuyerId());
    }

    /**
     * Get cart for a buyer
     */
    @Transactional(readOnly = true)
    public CartDTO getCartByBuyerId(Integer buyerId) {
        Optional<Cart> cartOpt = cartRepository.findByBuyer_UserId(buyerId);

        if (cartOpt.isEmpty()) {
            // Return empty cart
            CartDTO emptyCart = new CartDTO();
            emptyCart.setBuyerId(buyerId);
            emptyCart.setTotalAmount(0.0);
            emptyCart.setItemCount(0);
            return emptyCart;
        }

        Cart cart = cartOpt.get();
        List<CartItem> items = cartItemRepository.findByCart_CartId(cart.getCartId());

        CartDTO cartDTO = new CartDTO();
        cartDTO.setCartId(cart.getCartId());
        cartDTO.setBuyerId(buyerId);

        List<CartItemDTO> itemDTOs = items.stream().map(this::convertToDTO).collect(Collectors.toList());
        cartDTO.setItems(itemDTOs);
        cartDTO.setItemCount(itemDTOs.size());
        cartDTO.setTotalAmount(itemDTOs.stream().mapToDouble(CartItemDTO::getTotalPrice).sum());

        return cartDTO;
    }

    /**
     * Update cart item quantity
     */
    @Transactional
    public CartItemDTO updateCartItem(Integer cartItemId, UpdateCartItemRequest request) {
        CartItem item = cartItemRepository.findById(cartItemId)
                .orElseThrow(() -> new RuntimeException("Cart item not found"));

        // Check stock availability
        if (item.getProductStock().getQuantity() < request.getQuantity()) {
            throw new RuntimeException("Insufficient stock available");
        }

        item.setQuantity(request.getQuantity());
        CartItem updated = cartItemRepository.save(item);

        return convertToDTO(updated);
    }

    /**
     * Remove item from cart
     */
    @Transactional
    public void removeCartItem(Integer cartItemId) {
        if (!cartItemRepository.existsById(cartItemId)) {
            throw new RuntimeException("Cart item not found");
        }
        cartItemRepository.deleteById(cartItemId);
    }

    /**
     * Clear all items from cart
     */
    @Transactional
    public void clearCart(Integer buyerId) {
        Optional<Cart> cartOpt = cartRepository.findByBuyer_UserId(buyerId);
        if (cartOpt.isPresent()) {
            cartItemRepository.deleteByCart_CartId(cartOpt.get().getCartId());
        }
    }

    /**
     * Create order from cart (checkout)
     */
    @Transactional
    public Order createOrderFromCart(Integer buyerId) {
        Cart cart = cartRepository.findByBuyer_UserId(buyerId)
                .orElseThrow(() -> new RuntimeException("Cart not found"));

        List<CartItem> cartItems = cartItemRepository.findByCart_CartId(cart.getCartId());

        if (cartItems.isEmpty()) {
            throw new RuntimeException("Cart is empty");
        }

        // Create order
        Order order = new Order();
        order.setBuyer(cart.getBuyer());

        // Calculate total
        double total = 0.0;
        for (CartItem cartItem : cartItems) {
            total += cartItem.getTotalPrice();
        }
        order.setTotalAmount(total);

        // Save order first to get ID
        order = orderRepository.save(order);

        // Create order items
        for (CartItem cartItem : cartItems) {
            OrderItem orderItem = new OrderItem();
            orderItem.setOrder(order);
            orderItem.setProduct(cartItem.getProduct());
            orderItem.setProductName(cartItem.getProduct().getPname());
            orderItem.setUnitPrice(cartItem.getUnitPrice());
            orderItem.setQuantity(cartItem.getQuantity().intValue());
            orderItem.setTotalPrice(cartItem.getTotalPrice());

            // Update stock quantity
            ProductStock stock = cartItem.getProductStock();
            stock.setQuantity(stock.getQuantity() - cartItem.getQuantity().intValue());
            productStockRepository.save(stock);
        }

        // Clear cart after order creation
        cartItemRepository.deleteByCart_CartId(cart.getCartId());

        return order;
    }

    /**
     * Convert CartItem entity to DTO
     */
    private CartItemDTO convertToDTO(CartItem item) {
        CartItemDTO dto = new CartItemDTO();
        dto.setCartItemId(item.getCartItemId());
        dto.setProductId(item.getProduct().getPid());
        dto.setProductName(item.getProduct().getPname());
        dto.setStockId(item.getProductStock().getStockId());
        dto.setQuantity(item.getQuantity());
        dto.setUnitPrice(item.getUnitPrice());
        dto.setTotalPrice(item.getTotalPrice());
        dto.setImagePath(item.getProductStock().getImagePath());

        if (item.getProduct().getSubCategory() != null) {
            dto.setSubCategoryName(item.getProduct().getSubCategory().getSubCategoryName());
            if (item.getProduct().getSubCategory().getCategory() != null) {
                dto.setCategoryName(item.getProduct().getSubCategory().getCategory().getCategoryName());
            }
        }

        return dto;
    }
}
