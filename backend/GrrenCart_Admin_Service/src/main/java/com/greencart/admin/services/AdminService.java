package com.greencart.admin.services;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.greencart.admin.entities.*;
import com.greencart.admin.repositories.*;
import com.greencart.admin.enums.UserStatus;
import org.springframework.transaction.annotation.Transactional;

@Service
public class AdminService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ProductStockRepository productStockRepository;

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private SubCategoryRepository subCategoryRepository;

    public List<User> getFarmers() {
        return userRepository.findByRoleId(2); // 2 is FARMER
    }

    public List<User> getBuyers() {
        return userRepository.findByRoleId(3); // 3 is BUYER
    }

    public User approveFarmer(Integer id) {
        User user = userRepository.findById(id).orElseThrow(() -> new RuntimeException("User not found"));
        user.setStatus(UserStatus.ACTIVE.getCode());
        return userRepository.save(user);
    }

    public User suspendUser(Integer id) {
        User user = userRepository.findById(id).orElseThrow(() -> new RuntimeException("User not found"));
        user.setStatus(UserStatus.SUSPENDED.getCode());
        return userRepository.save(user);
    }

    public List<ProductStock> getAllProducts() {
        return productStockRepository.findAll();
    }

    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    // --- Product Stock Management ---

    public ProductStock toggleStockVisibility(Integer stockId) {
        ProductStock stock = productStockRepository.findById(stockId)
                .orElseThrow(() -> new RuntimeException("Stock item not found"));

        String currentStatus = stock.getStatus();
        if (currentStatus == null || currentStatus.isEmpty() || currentStatus.equalsIgnoreCase("ACTIVE")) {
            stock.setStatus("HIDDEN");
        } else {
            stock.setStatus("ACTIVE");
        }
        return productStockRepository.save(stock);
    }

    @Transactional
    public void deleteStockItem(Integer stockId) {
        productStockRepository.deleteById(stockId);
    }

    // --- Category & SubCategory Management ---

    public List<Category> getAllCategories() {
        return categoryRepository.findAll();
    }

    public Category saveCategory(Category category) {
        return categoryRepository.save(category);
    }

    public void deleteCategory(Integer id) {
        categoryRepository.deleteById(id);
    }

    public List<SubCategory> getAllSubCategories() {
        return subCategoryRepository.findAll();
    }

    public SubCategory saveSubCategory(SubCategory subCategory) {
        return subCategoryRepository.save(subCategory);
    }

    public void deleteSubCategory(Integer id) {
        subCategoryRepository.deleteById(id);
    }
}
