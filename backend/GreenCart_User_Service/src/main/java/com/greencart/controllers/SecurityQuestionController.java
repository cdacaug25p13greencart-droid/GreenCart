package com.greencart.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.greencart.repositories.SecurityQuestionRepo;
import com.greencart.entities.*;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/security")
public class SecurityQuestionController {
	
    @Autowired
    private SecurityQuestionRepo repo;

    @GetMapping("/questions")
    public List<SecurityQuestion> getAllQuestions() {
        return repo.findAll();
    }
    
}
