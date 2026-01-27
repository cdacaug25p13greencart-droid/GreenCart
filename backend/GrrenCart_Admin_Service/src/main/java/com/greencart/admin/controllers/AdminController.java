package com.greencart.admin.controllers;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.greencart.admin.entities.*;
import com.greencart.admin.services.AdminService;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "http://localhost:3000")
public class AdminController {

    @Autowired
    private AdminService adminService;

    @GetMapping("/farmers")
    public List<User> getFarmers() {
        return adminService.getFarmers();
    }

    @GetMapping("/buyers")
    public List<User> getBuyers() {
        return adminService.getBuyers();
    }

    @PostMapping("/farmers/{id}/approve")
    public User approveFarmer(@PathVariable("id") Integer id) {
        return adminService.approveFarmer(id);
    }

    @PostMapping("/users/{id}/suspend")
    public User suspendUser(@PathVariable("id") Integer id) {
        return adminService.suspendUser(id);
    }

    @GetMapping("/products")
    public List<ProductStock> getAllProducts() {
        return adminService.getAllProducts();
    }

    @PostMapping("/products/stock/{id}/toggle-visibility")
    public ProductStock toggleStockVisibility(@PathVariable("id") Integer id) {
        return adminService.toggleStockVisibility(id);
    }

    @DeleteMapping("/products/stock/{id}")
    public void deleteStockItem(@PathVariable("id") Integer id) {
        adminService.deleteStockItem(id);
    }

    @GetMapping("/orders")
    public List<Order> getAllOrders() {
        return adminService.getAllOrders();
    }

    // --- Category Management Endpoints ---

    @GetMapping("/categories")
    public List<Category> getCategories() {
        return adminService.getAllCategories();
    }

    @PostMapping("/categories")
    public Category saveCategory(@RequestBody Category category) {
        return adminService.saveCategory(category);
    }

    @DeleteMapping("/categories/{id}")
    public void deleteCategory(@PathVariable("id") Integer id) {
        adminService.deleteCategory(id);
    }

    // --- SubCategory Management Endpoints ---

    @GetMapping("/subcategories")
    public List<SubCategory> getSubCategories() {
        return adminService.getAllSubCategories();
    }

    @PostMapping("/subcategories")
    public SubCategory saveSubCategory(@RequestBody SubCategory subCategory) {
        return adminService.saveSubCategory(subCategory);
    }

    @DeleteMapping("/subcategories/{id}")
    public void deleteSubCategory(@PathVariable("id") Integer id) {
        adminService.deleteSubCategory(id);
    }
}
