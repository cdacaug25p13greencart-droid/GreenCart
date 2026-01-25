package com.greencart.product.service;



import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.greencart.product.entities.SubCategory;
import com.greencart.product.repository.SubCategoryRepository;

import java.util.List;

@Service
public class SubCategoryService {

	@Autowired
    private final SubCategoryRepository subCategoryRepository;

    public SubCategoryService(SubCategoryRepository subCategoryRepository) {
        this.subCategoryRepository = subCategoryRepository;
    }

    public SubCategory addSubCategory(SubCategory subCategory) {
        return subCategoryRepository.save(subCategory);
    }

    public List<SubCategory> getAllSubCategories() {
        return subCategoryRepository.findAll();
    }

    public List<SubCategory> getSubCategoriesByCategoryId(int categoryId) {
        return subCategoryRepository.findByCategory_CategoryId(categoryId);
    }

    public SubCategory getSubCategoryById(int id) {
        return subCategoryRepository.findById(id).orElse(null);
    }
}
