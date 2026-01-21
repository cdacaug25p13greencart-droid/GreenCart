package com.greencart.controllers;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.greencart.entities.ForgotPasswordRequest;
import com.greencart.entities.ResetPasswordRequest;
import com.greencart.entities.User;
import com.greencart.services.UserServices;




@RestController
@RequestMapping("/seller")
public class UserController {
	
	@Autowired
	UserServices uesrservices;
	
	@GetMapping("/getall")
	public List<User> getAll()
	{
		return uesrservices.getAll();
	}
	
    @PostMapping("/register")
    public User registerUser(@RequestBody User user) {
        return uesrservices.registerUser(user);
    }
    
    @PostMapping("/forgot-password/verify")
    public ResponseEntity<String> verifyAnswer(
            @RequestBody ForgotPasswordRequest request) {

        try {
        	uesrservices.verifySecurityAnswer(request);
            return ResponseEntity.ok("Answer verified");
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
    
    @PostMapping("/forgot-password/reset")
    public ResponseEntity<String> resetPassword(
            @RequestBody ResetPasswordRequest request) {

        try {
        	uesrservices.resetPassword(request);
            return ResponseEntity.ok("Password reset successful");
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }


	

}


